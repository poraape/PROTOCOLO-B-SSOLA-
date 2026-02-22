import React from 'react';
import { SimulatorHistoryProps } from '../../types/simulator';
import { useSimulator } from './SimulatorProvider';

export const SimulatorHistory: React.FC<SimulatorHistoryProps> = ({ actorClass, actorTone }) => {
  const { scenario, currentStepIndex, realPath, divergences, recommendedPath } = useSimulator();

  if (!scenario) return null;

  return (
    <article className="card-surface p-4">
      <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Histórico</h3>
      <div className="mt-2 space-y-2">
        {scenario.treeTraversal.map((step, index) => (
          <div key={step.nodeId} className={`rounded-lg border p-2 text-sm ${index === currentStepIndex ? 'border-brand-400 bg-brand-50' : 'border-slate-200'}`}>
            <p className="font-semibold">#{step.step} · {step.label}</p>
            <span className={`rounded-full px-2 py-0.5 text-xs ${actorClass[actorTone(step.actor)]}`}>{step.actor}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted">Trilha recomendada: {recommendedPath.length} passos · Divergências registradas: {divergences.length}</p>
      {realPath.length > 0 ? <ul className="mt-2 list-disc pl-5 text-xs">{realPath.map((entry) => <li key={`${entry.nodeId}-${entry.step}`}>{entry.step}. {entry.institutionalRisk}</li>)}</ul> : null}
    </article>
  );
};
