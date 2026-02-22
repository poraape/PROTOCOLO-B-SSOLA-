import React, { useMemo } from 'react';
import { ProgressBar } from './ProgressBar';
import { HelpTooltip } from './HelpTooltip';
import { InstitutionalBreadcrumb } from './InstitutionalBreadcrumb';
import { DecisionNode } from '../../types/decision-tree-v2';
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
          <div className="card-elevated">
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
                  <button key={option.value} type="button" onClick={() => onSelect(option.value)} className={`ui-btn ui-btn--${variant}`} aria-label={ariaLabel}>
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

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
