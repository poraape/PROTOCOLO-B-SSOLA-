import React from 'react';
import { SimulatorFeedbackProps } from '../../types/simulator';
import { useDecisionMeta, useSimulator } from './SimulatorProvider';

export const SimulatorFeedback: React.FC = () => {
  const { scenario, currentStep, trainingMode, trainingOptions, selectedOptionId } = useSimulator();
  const { selectedOption, protocolAlignmentText, probableImpactText, legalReferences, isRiskDecision, meta, selectedAlert } = useDecisionMeta(
    scenario?.id,
    selectedOptionId,
    trainingOptions,
    currentStep
  );

  if (!trainingMode || !selectedOption) return null;

  const feedback: SimulatorFeedbackProps = {
    protocolAlignmentText,
    probableImpactText,
    legalReferences,
    isRiskDecision,
    whatToDoDifferently: selectedAlert?.doInstead || meta?.whatToDoDifferently
  };

  return (
    <article className="card p-4 space-y-2">
      <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Feedback</h3>
      <p className="text-sm">{selectedOption.isCorrect ? '✅ Resposta correta.' : '❌ Resposta incorreta.'}</p>
      <p className="text-xs">{feedback.protocolAlignmentText}</p>
      <p className="text-xs">{feedback.probableImpactText}</p>
      {feedback.legalReferences.length > 0 ? <ul className="list-disc pl-5 text-xs">{feedback.legalReferences.map((reference) => <li key={reference}>{reference}</li>)}</ul> : null}
      {feedback.isRiskDecision ? <p className="rounded bg-rose-50 p-2 text-xs text-rose-700">{feedback.whatToDoDifferently || 'Retome o protocolo e priorize proteção imediata.'}</p> : null}
    </article>
  );
};
