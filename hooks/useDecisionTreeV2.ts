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

const STORAGE_KEY = 'decisionTreeState';

const createInitialState = (rootNodeId: string): NavigationState => ({
  currentNodeId: rootNodeId,
  history: [rootNodeId],
  riskScore: 0,
  answers: {}
});

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
      if (!saved) return createInitialState(tree.rootNodeId);

      const parsed = JSON.parse(saved) as NavigationState;
      if (!parsed?.currentNodeId || !Array.isArray(parsed.history)) return createInitialState(tree.rootNodeId);

      return {
        currentNodeId: parsed.currentNodeId,
        history: parsed.history.length ? parsed.history : [tree.rootNodeId],
        riskScore: typeof parsed.riskScore === 'number' ? parsed.riskScore : 0,
        answers: parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {}
      };
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
      setState((prev) => {
        const nextHistory = [...prev.history, nextNodeId];
        const currentId = prev.currentNodeId;

        return {
          currentNodeId: nextNodeId,
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
    []
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
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const reset = useCallback(() => {
    clearTriageTracking();
    startTriageTracking({ nodeId: tree.rootNodeId, riskClassification: 'BAIXO' });
    setState(createInitialState(tree.rootNodeId));
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
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
