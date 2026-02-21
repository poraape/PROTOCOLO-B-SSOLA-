import React from 'react';
import { Category, Complexity, RiskLevel } from '../../data/scenarios';
import { SimulatorDecision } from './SimulatorDecision';
import { SimulatorExploration } from './SimulatorExploration';
import { SimulatorFeedback } from './SimulatorFeedback';
import { SimulatorHistory } from './SimulatorHistory';
import { SimulatorProvider, useSimulator } from './SimulatorProvider';

const complexityIcon: Record<Complexity, string> = { low: '🟢', medium: '🟡', high: '🔴' };
const riskVisual: Record<RiskLevel, { label: string; className: string }> = {
  imminent: { label: '🔴 iminente', className: 'bg-rose-100 text-rose-800 border-rose-200' },
  high: { label: '🟠 alto', className: 'bg-orange-100 text-orange-800 border-orange-200' },
  moderate: { label: '🟡 moderado', className: 'bg-amber-100 text-amber-800 border-amber-200' },
  low: { label: '🟢 baixo', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' }
};
const categoryIcon: Record<Category, string> = {
  pedagogical: '🏫',
  mental_health: '🧠',
  physical_health: '🩺',
  violence: '🛡️',
  substances: '🧪',
  family_conflict: '🏠',
  neglect: '⚠️',
  inclusion: '♿',
  sexual_health: '🫶'
};

const actorTone = (actor: string): 'brand' | 'emerald' | 'violet' | 'amber' | 'slate' => {
  if (actor.includes('direção')) return 'violet';
  if (actor.includes('coordenação')) return 'brand';
  if (actor.includes('professor')) return 'emerald';
  if (actor.includes('SAMU') || actor.includes('PM')) return 'amber';
  return 'slate';
};

const actorClass = {
  brand: 'bg-brand-100 text-brand-800',
  emerald: 'bg-emerald-100 text-emerald-800',
  violet: 'bg-violet-100 text-violet-800',
  amber: 'bg-amber-100 text-amber-800',
  slate: 'bg-slate-100 text-slate-800'
};

const ScenarioPlayerContent: React.FC = () => {
  const { scenario, pendingPrerequisites, goBackInHistory, visitedStepIds, trainingMode, setTrainingMode, resetTraining, markScenarioCompleted } = useSimulator();

  if (!scenario) return null;

  return (
    <div className="space-y-4">
      <section className="card p-4">
        <div className="sticky top-0 z-10 -mx-4 -mt-4 mb-3 flex flex-wrap items-center justify-between gap-2 border-b bg-white/95 px-4 py-3 backdrop-blur">
          <div>
            <h2 className="text-xl font-extrabold">ScenarioPlayer</h2>
            <p className="text-sm text-muted">Treinamento de travessia com cenários locais (offline), filtros e modo prática.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="btn-secondary text-xs" onClick={resetTraining}>Reiniciar cenário atual</button>
          </div>
        </div>
        <SimulatorExploration categoryIcon={categoryIcon} complexityIcon={complexityIcon} riskVisual={riskVisual} />
      </section>

      {pendingPrerequisites.length > 0 ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
          ⚠️ Progressão sugerida: este cenário recomenda concluir antes {pendingPrerequisites.join(', ')}.
        </div>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-2">
        <SimulatorHistory actorClass={actorClass} actorTone={actorTone} />
        <div className="space-y-4">
          <SimulatorDecision actorClass={actorClass} actorTone={actorTone} />
          <SimulatorFeedback />
          <div className="card p-4">
            <div className="flex flex-wrap gap-2">
              <button className="btn-secondary text-xs" onClick={goBackInHistory} disabled={visitedStepIds.length <= 1}>← Anterior</button>
              <button className="btn-secondary text-xs" onClick={() => setTrainingMode((value) => !value)}>{trainingMode ? 'Sair do treinamento' : 'Modo treinamento'}</button>
              <button className="btn-secondary text-xs" onClick={resetTraining}>Reset treino</button>
              <button className="btn-secondary text-xs" onClick={markScenarioCompleted}>Marcar cenário como concluído</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const ScenarioPlayer: React.FC = () => (
  <SimulatorProvider>
    <ScenarioPlayerContent />
  </SimulatorProvider>
);
