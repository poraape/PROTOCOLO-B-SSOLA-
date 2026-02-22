import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DecisionNode, DecisionTreeV2, RiskClassification } from '../types/decision-tree-v2';
import { clearTriageTracking, startTriageTracking, trackDecisionEvent } from '../services/analytics';

interface NavigationState {
  currentNodeId: string;
  history: string[];
  riskScore: number;
  answers: Record<string, string>;
}

interface ProgressState {
  current: number;
  total: number;
}

interface UseDecisionTreeV2Result {
  currentNode: DecisionNode;
  navigate: (nextNodeId: string, answer?: string, riskWeight?: number) => void;
  goBack: () => void;
  reset: () => void;
  canGoBack: boolean;
  riskClassification: RiskClassification;
  progress: ProgressState;
  state: NavigationState;
}

const STORAGE_KEY = 'decisionTreeState:v2';
const STORAGE_VERSION = 2;

const NODE_ALIASES: Record<string, string> = {
  CATEGORY_SELECT: 'DOMAIN_SELECT'
};

const createInitialState = (rootNodeId: string): NavigationState => ({
  currentNodeId: rootNodeId,
  history: [rootNodeId],
  riskScore: 0,
  answers: {}
});

const normalizeNodeId = (nodeId: string): string => NODE_ALIASES[nodeId] ?? nodeId;

const sanitizePersistedState = (raw: unknown, tree: DecisionTreeV2): NavigationState => {
  if (!raw || typeof raw !== 'object') return createInitialState(tree.rootNodeId);

  const parsed = raw as {
    currentNodeId?: unknown;
    history?: unknown;
    riskScore?: unknown;
    answers?: unknown;
    storageVersion?: unknown;
  };

  const rawHistory = Array.isArray(parsed.history) ? parsed.history : [];
  const sanitizedHistory = rawHistory
    .map((entry) => (typeof entry === 'string' ? normalizeNodeId(entry) : null))
    .filter((entry): entry is string => Boolean(entry) && Boolean(tree.nodes[entry]));

  const normalizedCurrent = typeof parsed.currentNodeId === 'string' ? normalizeNodeId(parsed.currentNodeId) : tree.rootNodeId;
  const fallbackCurrent = sanitizedHistory[sanitizedHistory.length - 1] || tree.rootNodeId;
  const safeCurrentNodeId = tree.nodes[normalizedCurrent] ? normalizedCurrent : fallbackCurrent;

  const nextHistory = sanitizedHistory.length ? sanitizedHistory : [safeCurrentNodeId];
  if (nextHistory[nextHistory.length - 1] !== safeCurrentNodeId) {
    nextHistory.push(safeCurrentNodeId);
  }

  return {
    currentNodeId: safeCurrentNodeId,
    history: nextHistory,
    riskScore: typeof parsed.riskScore === 'number' ? parsed.riskScore : 0,
    answers: parsed.answers && typeof parsed.answers === 'object' ? (parsed.answers as Record<string, string>) : {}
  };
};

const hasLevel = (node: DecisionNode): node is Exclude<DecisionNode, { deprecated: true; redirectTo: string; reason: string }> => {
  return 'level' in node;
};

const hasOptions = (node: DecisionNode): node is DecisionNode & { options: Array<{ nextNodeId: string }> } => {
  return 'options' in node && Array.isArray((node as { options?: unknown }).options);
};

export const useDecisionTreeV2 = (tree: DecisionTreeV2): UseDecisionTreeV2Result => {
  const [state, setState] = useState<NavigationState>(() => {
    if (typeof window === 'undefined') return createInitialState(tree.rootNodeId);

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as NavigationState & { storageVersion?: number };
        if (parsed.storageVersion === STORAGE_VERSION) {
          return sanitizePersistedState(parsed, tree);
        }
      }

      const legacySaved = window.localStorage.getItem('decisionTreeState');
      if (legacySaved) {
        const parsedLegacy = JSON.parse(legacySaved);
        return sanitizePersistedState(parsedLegacy, tree);
      }

      return createInitialState(tree.rootNodeId);
    } catch {
      return createInitialState(tree.rootNodeId);
    }
  });

  const resolveNode = useCallback(
    (nodeId: string): DecisionNode => {
      const fallbackNode = tree.nodes[tree.rootNodeId];
      const node = tree.nodes[nodeId] || fallbackNode;

      if (node && 'deprecated' in node && node.deprecated && 'redirectTo' in node) {
        const redirected = tree.nodes[node.redirectTo];
        if (redirected) {
          console.warn(`Nó legado detectado: ${nodeId} -> redirecionando para ${node.redirectTo}`);
          return redirected;
        }
      }

      if (node && hasLevel(node) && node.isCosmeticNode && hasOptions(node)) {
        const nextNodeId = node.options[0]?.nextNodeId;
        if (nextNodeId && tree.nodes[nextNodeId]) {
          console.warn(`Nó cosmético detectado: ${nodeId} -> pulando para próximo (${nextNodeId})`);
          return tree.nodes[nextNodeId];
        }
      }

      return node;
    },
    [tree.nodes, tree.rootNodeId]
  );

  const currentNode = useMemo(() => resolveNode(state.currentNodeId), [state.currentNodeId, resolveNode]);

  const navigate = useCallback(
    (nextNodeId: string, answer?: string, riskWeight?: number) => {
      const safeNextNodeId = normalizeNodeId(nextNodeId);
      if (!tree.nodes[safeNextNodeId]) {
        trackDecisionEvent('triagem_erro_transicao', {
          nodeId: state.currentNodeId,
          nextNodeId: safeNextNodeId,
          sourceNodeId: state.currentNodeId,
          reason: 'next_node_not_found'
        });
        return;
      }

      setState((prev) => {
        const nextHistory = [...prev.history, safeNextNodeId];
        const currentId = prev.currentNodeId;

        return {
          currentNodeId: safeNextNodeId,
          history: nextHistory,
          riskScore: prev.riskScore + (riskWeight || 0),
          answers: answer
            ? {
                ...prev.answers,
                [currentId]: answer
              }
            : prev.answers
        };
      });
    },
    [state.currentNodeId, tree.nodes]
  );

  const goBack = useCallback(() => {
    setState((prev) => {
      if (prev.history.length <= 1) return prev;

      const nextHistory = prev.history.slice(0, -1);
      const previousNodeId = nextHistory[nextHistory.length - 1] || tree.rootNodeId;

      return {
        ...prev,
        currentNodeId: previousNodeId,
        history: nextHistory
      };
    });
  }, [tree.rootNodeId]);

  const getRiskClassification = useCallback((): RiskClassification => {
    if (state.riskScore >= 8) return 'ALTO';
    if (state.riskScore >= 4) return 'MODERADO';
    return 'BAIXO';
  }, [state.riskScore]);

  const riskClassification = getRiskClassification();
  const stateRef = useRef(state);
  const riskRef = useRef(riskClassification);

  useEffect(() => {
    stateRef.current = state;
    riskRef.current = riskClassification;
  }, [state, riskClassification]);

  useEffect(() => {
    startTriageTracking({ nodeId: tree.rootNodeId, riskClassification: riskRef.current });

    return () => {
      const latestState = stateRef.current;
      const activeNode = resolveNode(latestState.currentNodeId);
      if ('level' in activeNode && activeNode.level !== 'LEAF') {
        trackDecisionEvent('triagem_abandonada', {
          nodeId: latestState.currentNodeId,
          riskClassification: riskRef.current
        });
      }
    };
  }, [resolveNode, tree.rootNodeId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, storageVersion: STORAGE_VERSION }));
  }, [state]);

  const reset = useCallback(() => {
    clearTriageTracking();
    startTriageTracking({ nodeId: tree.rootNodeId, riskClassification: 'BAIXO' });
    setState(createInitialState(tree.rootNodeId));
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem('decisionTreeState');
    }
  }, [tree.rootNodeId]);

  return {
    currentNode,
    navigate,
    goBack,
    reset,
    canGoBack: state.history.length > 1,
    riskClassification,
    progress: {
      current: state.history.length,
      total: 10
    },
    state
  };
};
