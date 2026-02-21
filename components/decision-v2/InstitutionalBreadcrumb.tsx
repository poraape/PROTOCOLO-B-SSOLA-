import React from 'react';
import { designTokens } from '../../styles/design-tokens';
import { DecisionNode } from '../../types/decision-tree-v2';

interface InstitutionalBreadcrumbProps {
  history?: string[];
  nodes?: Record<string, DecisionNode>;
  currentNodeId?: string;
}

const LEVEL_LABEL: Record<DecisionNode['level'], string> = {
  CRITICAL_TRIAGE: 'Triagem inicial',
  RISK_ASSESSMENT: 'Avaliação de risco',
  CATEGORY: 'Categoria',
  SUBFLOW: 'Análise do caso',
  LEAF: 'Encaminhamento'
};

const FALLBACK_LABEL = 'Triagem inicial';

export const InstitutionalBreadcrumb: React.FC<InstitutionalBreadcrumbProps> = ({
  history,
  nodes,
  currentNodeId
}) => {
  const trail = React.useMemo(() => {
    if (!history?.length || !nodes) return [FALLBACK_LABEL];

    const nodeIds = [...history];
    if (currentNodeId && nodeIds[nodeIds.length - 1] !== currentNodeId) {
      nodeIds.push(currentNodeId);
    }

    const levelTrail: string[] = [];

    nodeIds.forEach((nodeId) => {
      const node = nodes[nodeId];
      if (!node || !('level' in node)) return;

      const label = LEVEL_LABEL[node.level];
      const lastLabel = levelTrail[levelTrail.length - 1];
      if (label && label !== lastLabel) {
        levelTrail.push(label);
      }
    });

    return levelTrail.length ? levelTrail : [FALLBACK_LABEL];
  }, [history, nodes, currentNodeId]);

  return (
    <nav
      aria-label="Localização no fluxo"
      style={{
        fontSize: '12px',
        color: designTokens.colors.info,
        marginBottom: designTokens.spacing.sm,
        lineHeight: 1.5
      }}
    >
      <span style={{ color: 'var(--text)', fontWeight: 600 }}>Você está em: </span>
      <span>{trail.join(' → ')}</span>
    </nav>
  );
};
