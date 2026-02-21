import React, { useMemo } from 'react';
import { ProgressBar } from './ProgressBar';
import { HelpTooltip } from './HelpTooltip';
import { InstitutionalBreadcrumb } from './InstitutionalBreadcrumb';
import { DecisionNode } from '../../types/decision-tree-v2';
import { AppCard } from '../ui/AppCard';
import { AppButton } from '../ui/AppButton';
import { SidePanelOrientacoes } from '../ui/SidePanelOrientacoes';
import { BottomSheetOrientacoes } from '../ui/BottomSheetOrientacoes';

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
  history,
  nodes,
  currentNodeId
}) => {
  const [showGuidance, setShowGuidance] = React.useState(false);
  const memoizedOptions = useMemo(() => options, [options]);

  return (
    <section style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 16px 24px' }}>
      <InstitutionalBreadcrumb history={history} nodes={nodes} currentNodeId={currentNodeId} />

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, maxWidth: 820, margin: '0 auto' }}>
          <AppCard strong>
            <div className="ui-section">
              <h2 className="ui-section-title">Decisão principal</h2>
              <p className="ui-section-subtitle">Selecione a opção que melhor descreve o caso neste momento.</p>
            </div>
            {progress ? (
              <div style={{ marginBottom: 16 }}>
                <ProgressBar current={progress.current} total={progress.total} label="Etapa da triagem" />
              </div>
            ) : null}

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)", lineHeight: 1.3, color: "var(--text)" }}>{question}</h2>
              {helpText ? <HelpTooltip text={helpText} /> : null}
            </div>

            <div style={{ display: 'grid', gap: 12 }}>
              {memoizedOptions.map((option) => {
                const normalizedLabel = option.label.toUpperCase();
                const variant = normalizedLabel === 'SIM' ? 'danger' : normalizedLabel === 'NÃO' ? 'secondary' : 'primary';
                const ariaLabel =
                  normalizedLabel === 'SIM'
                    ? 'Sim, há risco neste momento'
                    : normalizedLabel === 'NÃO'
                      ? 'Não há risco neste momento'
                      : option.label;

                return (
                  <AppButton key={option.value} onClick={() => onSelect(option.value)} variant={variant} ariaLabel={ariaLabel}>
                    {option.label}
                  </AppButton>
                );
              })}
            </div>
          </AppCard>

          <button
            type="button"
            className="xl:hidden"
            onClick={() => setShowGuidance(true)}
            style={{ marginTop: 12, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--surface-strong)', padding: '10px 14px', color: 'var(--text)' }}
          >
            Abrir orientações
          </button>
        </div>

        <SidePanelOrientacoes />
      </div>

      <BottomSheetOrientacoes open={showGuidance} onClose={() => setShowGuidance(false)} />
    </section>
  );
};

export const DecisionScreen = React.memo(DecisionScreenBase);
