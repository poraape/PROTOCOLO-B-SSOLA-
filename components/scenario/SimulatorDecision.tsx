import React from 'react';
import { ALERTS_DATA } from '../../data/alerts';
import { SimulatorDecisionProps } from '../../types/simulator';
import { useSimulator } from './SimulatorProvider';

export const SimulatorDecision: React.FC<SimulatorDecisionProps> = ({ actorClass, actorTone }) => {
  const {
    scenario,
    currentStep,
    currentStepIndex,
    trainingMode,
    trainingOptions,
    answerTraining,
    showRationale,
    goToStepById,
    score
  } = useSimulator();

  if (!scenario || !currentStep) return null;

  return (
    <article className="card-surface p-4">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Decisão</h3>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${actorClass[actorTone(currentStep.actor)]}`}>{currentStep.actor}</span>
      </div>
      <p className="mt-2 text-xs text-muted">Etapa {currentStepIndex + 1} de {scenario.treeTraversal.length}</p>

      {trainingMode ? (
        <>
          <p className="mt-2 text-sm"><strong>Trigger:</strong> {scenario.trigger}</p>
          <p className="text-sm"><strong>Perfil:</strong> {scenario.studentProfile}</p>
          <div className="mt-3 space-y-2">
            {trainingOptions.map((option) => (
              <button key={option.id} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-left text-sm" onClick={() => answerTraining(option)}>{option.label}</button>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="mt-2 text-sm">{currentStep.action}</p>
          {currentStep.alertTriggered ? <p className="mt-2 text-xs text-amber-700">⚠️ {ALERTS_DATA.find((alert) => alert.id === currentStep.alertTriggered)?.doNot}</p> : null}
          <div className="mt-3 space-y-2">
            {currentStep.options.map((option) => (
              <button key={`${currentStep.nodeId}-${option.nextStepId}`} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-left text-sm" onClick={() => goToStepById(option.nextStepId)}>
                <p className="font-semibold">Ir para: {option.nextStepId}</p>
                <p className="text-xs text-muted">Impacto: {option.impact}</p>
              </button>
            ))}
          </div>
        </>
      )}

      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted">Aprender</p>
      {showRationale ? <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-muted">{currentStep.rationale}</div> : null}
      {trainingMode ? <p className="mt-2 text-sm font-semibold">Score: {score}/{scenario.treeTraversal.length}</p> : null}
    </article>
  );
};
