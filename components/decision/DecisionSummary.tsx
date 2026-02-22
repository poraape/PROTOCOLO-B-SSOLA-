import React from 'react';

interface DecisionSummaryProps {
  stepNumber: number;
  totalSteps: number;
  canGoBack: boolean;
  onGoBack: () => void;
  onReset: () => void;
}

export const DecisionSummary: React.FC<DecisionSummaryProps> = ({
  stepNumber,
  totalSteps,
  canGoBack,
  onGoBack,
  onReset
}) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex flex-col">
        <span className="badge">Passo {stepNumber}</span>
        <span className="mt-1 text-xs text-muted">Pergunta {stepNumber} de {totalSteps}</span>
      </div>
      <div className="flex gap-2">
        {canGoBack && (
          <button onClick={onGoBack} className="ui-btn ui-btn--secondary text-sm focus-visible:ring-2 focus-visible:ring-brand-500">← Voltar para pergunta anterior</button>
        )}
        <button onClick={onReset} className="ui-btn ui-btn--secondary text-sm focus-visible:ring-2 focus-visible:ring-brand-500">Iniciar nova triagem</button>
      </div>
    </div>
  );
};
