import React from 'react';
import { FlowNode } from '../../types';

interface Crumb {
  idx: number;
  node?: FlowNode;
  answer?: string;
}

interface FlowBreadcrumbProps {
  items: Crumb[];
}

export const FlowBreadcrumb: React.FC<FlowBreadcrumbProps> = ({ items }) => {
  if (!items.length) return null;

  return (
    <nav className="mb-2 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900" aria-label="Histórico resumido">
      <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-300">Histórico</h2>
      <ol className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
        {items.map(({ idx, node, answer }) => (
          <li key={`crumb-${idx}`}>
            <span className="font-semibold">{node?.question}</span>
            {answer ? <span className="text-slate-500 dark:text-slate-400"> → {answer}</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
};
