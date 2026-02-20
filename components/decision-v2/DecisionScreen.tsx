import React, { useMemo } from 'react';
import { designTokens } from '../../styles/design-tokens';
import { ProgressBar } from './ProgressBar';
import { HelpTooltip } from './HelpTooltip';
import { DecisionButton } from './DecisionButton';
import { DecisionBreadcrumb } from './DecisionBreadcrumb';
import { DecisionNode } from '../../types/decision-tree-v2';

interface DecisionScreenProps {
  question: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  helpText?: string;
  progress?: { current: number; total: number };
  emergencyMode?: boolean;
  history?: string[];
  nodes?: Record<string, DecisionNode>;
  currentNodeId?: string;
}

const DecisionScreenBase: React.FC<DecisionScreenProps> = ({
  question,
  options,
  onSelect,
  helpText,
  progress,
  emergencyMode = false,
  history,
  nodes,
  currentNodeId
}) => {
  const memoizedOptions = useMemo(() => options, [options]);

  return (
    <section
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: designTokens.spacing.xl,
        backgroundColor: emergencyMode ? '#FEF2F2' : '#FFFFFF',
        borderRadius: designTokens.borderRadius.lg,
        boxShadow: emergencyMode ? designTokens.shadows.emergency : designTokens.shadows.md
      }}
    >
      {history && nodes && currentNodeId ? (
        <DecisionBreadcrumb history={history} nodes={nodes} currentNodeId={currentNodeId} />
      ) : null}

      {progress ? (
        <div style={{ marginBottom: designTokens.spacing.lg }}>
          <ProgressBar current={progress.current} total={progress.total} label="Triagem" />
        </div>
      ) : null}

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: designTokens.spacing.md,
          marginBottom: designTokens.spacing.md
        }}
      >
        <h1
          style={{
            fontSize: designTokens.typography.question.size,
            fontWeight: designTokens.typography.question.weight,
            lineHeight: designTokens.typography.question.lineHeight,
            color: emergencyMode ? designTokens.colors.emergency : '#111827',
            margin: 0,
            flex: 1
          }}
        >
          {question}
        </h1>

        {helpText ? <HelpTooltip text={helpText} /> : null}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: designTokens.spacing.md }}>
        {memoizedOptions.map((option) => (
          <DecisionButton
            key={option.value}
            label={option.label}
            onClick={() => onSelect(option.value)}
            variant={emergencyMode ? 'emergency' : 'default'}
          />
        ))}
      </div>
    </section>
  );
};

export const DecisionScreen = React.memo(DecisionScreenBase);
