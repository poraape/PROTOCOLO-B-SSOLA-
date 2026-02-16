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
    <aside
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      aria-label="Histórico de decisões"
    >
      <h2 className="text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">Histórico</h2>
      <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">Etapa atual: {stepNumber}</p>

      {items.length ? (
        <ol className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
          {items.map(({ idx, node, answer }) => (
            <li key={`history-${idx}`} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/70">
              <p className="font-semibold">{node?.question}</p>
              {answer ? <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Resposta: {answer}</p> : null}
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-500 dark:bg-slate-800/70 dark:text-slate-300">
          Nenhuma decisão anterior registrada ainda.
        </p>
      )}

      {currentQuestion ? (
        <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50 p-3 dark:border-sky-900 dark:bg-sky-950/30">
          <p className="text-xs font-bold uppercase tracking-wide text-sky-700 dark:text-sky-300">Pergunta atual</p>
          <p className="mt-1 text-sm text-sky-900 dark:text-sky-100">{currentQuestion}</p>
        </div>
      ) : null}
    </aside>
  );
};
