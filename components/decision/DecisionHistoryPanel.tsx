import React from 'react';
import { FlowNode } from '../../types';

interface HistoryItem {
  idx: number;
  node?: FlowNode;
  answer?: string;
}

interface DecisionHistoryPanelProps {
  items: HistoryItem[];
  currentQuestion?: string;
  stepNumber: number;
}

export const DecisionHistoryPanel: React.FC<DecisionHistoryPanelProps> = ({ items, currentQuestion, stepNumber }) => {
  return (
    <aside className="card-soft" aria-label="Histórico de decisões">
      <h2 className="text-sm font-bold uppercase tracking-wide text-muted">Histórico</h2>
      <p className="mt-1 text-xs font-semibold text-muted">Etapa atual: {stepNumber}</p>
      {items.length ? (
        <ol className="mt-3 space-y-2 text-sm text-text">
          {items.map(({ idx, node, answer }) => (
            <li key={`history-${idx}`} className="panel p-3">
              <p className="font-semibold">{node?.question}</p>
              {answer ? <p className="mt-1 text-xs text-muted">Resposta: {answer}</p> : null}
            </li>
          ))}
        </ol>
      ) : (
        <p className="panel mt-3 p-3 text-sm text-muted">Nenhuma decisão anterior registrada ainda.</p>
      )}
      {currentQuestion ? (
        <div className="mt-3 rounded-xl border border-brand-100 bg-brand-50 p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-800">Pergunta atual</p>
          <p className="mt-1 text-sm text-brand-900">{currentQuestion}</p>
        </div>
      ) : null}
    </aside>
  );
};
