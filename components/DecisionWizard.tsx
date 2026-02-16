import React, { useMemo, useState } from 'react';
import { ActionCard } from './ActionCard';
import { PROTOCOL_DATA } from '../content/protocolData';
import { FlowNode } from '../types';
import { FlowBreadcrumb } from './decision/FlowBreadcrumb';
import { QuestionStep } from './decision/QuestionStep';
import { DecisionSummary } from './decision/DecisionSummary';
import { EmergencyCTA } from './decision/EmergencyCTA';

interface DecisionStep {
  nodeId: string;
  selectedOptionLabel?: string;
}

export const DecisionWizard: React.FC = () => {
  const [history, setHistory] = useState<DecisionStep[]>([{ nodeId: 'root' }]);

  const nodeMap = useMemo(
    () => new Map(PROTOCOL_DATA.decisionTree.map((node) => [node.id, node])),
    []
  );

  const currentStep = history[history.length - 1];
  const currentNode = nodeMap.get(currentStep.nodeId);

  const breadcrumb = history
    .slice(0, -1)
    .map((step, idx) => ({ idx, node: nodeMap.get(step.nodeId), answer: history[idx + 1]?.selectedOptionLabel }));

  const goToNext = (nextNodeId: string, selectedOptionLabel: string) => {
    setHistory((prev) => [...prev, { nodeId: nextNodeId, selectedOptionLabel }]);
  };

  const goBack = () => {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  const resetWizard = () => setHistory([{ nodeId: 'root' }]);

  if (!currentNode) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        Erro: fluxo não encontrado. Reinicie o assistente.
      </div>
    );
  }

  const leafServices = (currentNode.serviceIds || [])
    .map((serviceId) => PROTOCOL_DATA.services.find((service) => service.id === serviceId))
    .filter((service): service is NonNullable<typeof service> => !!service);

  return (
    <div className="relative pb-24">
      <DecisionSummary
        stepNumber={history.length}
        canGoBack={history.length > 1}
        onGoBack={goBack}
        onReset={resetWizard}
      />

      <FlowBreadcrumb items={breadcrumb as Array<{ idx: number; node?: FlowNode; answer?: string }>} />

      {!currentNode.isLeaf ? (
        <QuestionStep node={currentNode} onSelect={goToNext} />
      ) : (
        <ActionCard leafNode={currentNode} services={leafServices} />
      )}

      <EmergencyCTA node={currentNode} />
    </div>
  );
};
