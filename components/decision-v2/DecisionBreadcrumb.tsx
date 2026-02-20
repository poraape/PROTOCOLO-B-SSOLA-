import React from 'react';
import { designTokens } from '../../styles/design-tokens';
import { DecisionNode } from '../../types/decision-tree-v2';

interface DecisionBreadcrumbProps {
  history: string[];
  nodes: Record<string, DecisionNode>;
  currentNodeId: string;
}

export const DecisionBreadcrumb: React.FC<DecisionBreadcrumbProps> = ({
  history,
  nodes,
  currentNodeId
}) => {
  const keyMilestones = history.filter((nodeId) => {
    const node = nodes[nodeId];
    if (!node || !('level' in node)) return false;

    return (
      node.level === 'CRITICAL_TRIAGE' ||
      node.level === 'CATEGORY' ||
      node.level === 'LEAF'
    );
  });

  return (
    <div
      style={{
        fontSize: '12px',
        color: designTokens.colors.info,
        marginBottom: designTokens.spacing.sm,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap'
      }}
    >
      {keyMilestones.map((nodeId, idx) => {
        const node = nodes[nodeId];
        if (!node || !('level' in node)) return null;

        const isCurrent = nodeId === currentNodeId;

        const label =
          node.level === 'CRITICAL_TRIAGE'
            ? '1. Triagem crítica'
            : node.level === 'CATEGORY'
              ? '2. Categoria'
              : node.level === 'LEAF'
                ? '3. Ação'
                : null;

        if (!label) return null;

        return (
          <React.Fragment key={`${nodeId}-${idx}`}>
            <span
              style={{
                fontWeight: isCurrent ? '700' : '400',
                color: isCurrent ? '#000000' : designTokens.colors.info
              }}
            >
              {label}
            </span>
            {idx < keyMilestones.length - 1 ? <span>→</span> : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};
