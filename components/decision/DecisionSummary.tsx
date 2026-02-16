import React from 'react';

interface DecisionSummaryProps {
  stepNumber: number;
  canGoBack: boolean;
  onGoBack: () => void;
  onReset: () => void;
}

export const DecisionSummary: React.FC<DecisionSummaryProps> = ({
  stepNumber,
  canGoBack,
  onGoBack,
  onReset
}) => {
  return (
    <>
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Passo {stepNumber}</p>
        {canGoBack && (
          <button
            onClick={onGoBack}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            ← Voltar
          </button>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onReset}
          className="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          Reiniciar fluxo
        </button>
      </div>
    </>
  );
};
