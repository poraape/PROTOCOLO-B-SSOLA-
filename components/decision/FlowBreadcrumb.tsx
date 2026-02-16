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
    <nav className="mb-6 rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-500">Histórico</h3>
      <ol className="space-y-1 text-sm text-slate-700">
        {items.map(({ idx, node, answer }) => (
          <li key={`crumb-${idx}`}>
            <span className="font-semibold">{node?.question}</span>
            {answer ? <span className="text-slate-500"> → {answer}</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
};
