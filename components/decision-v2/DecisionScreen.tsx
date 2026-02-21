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
    <section className="decision-layout-container decision-section">
      <InstitutionalBreadcrumb history={history} nodes={nodes} currentNodeId={currentNodeId} />

      <div className="decision-screen-grid">
        <div className="decision-screen-main">
          <AppCard strong>
            <div className="ui-section">
              <h2 className="ui-section-title">Decisão principal</h2>
              <p className="ui-section-subtitle">Selecione a opção que melhor descreve o caso neste momento.</p>
            </div>
            {progress ? (
              <div className="decision-progress-wrap">
                <ProgressBar current={progress.current} total={progress.total} label="Etapa da triagem" />
              </div>
            ) : null}

            <div className="decision-question-row">
              <h2 className="decision-question-title">{question}</h2>
              {helpText ? <HelpTooltip text={helpText} /> : null}
            </div>

            <div className="decision-options-grid">
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
            className="decision-guidance-trigger xl:hidden"
            onClick={() => setShowGuidance(true)}
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
