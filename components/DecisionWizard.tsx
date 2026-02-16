import React, { useMemo, useState } from 'react';
import { ActionCard } from './ActionCard';
import { PROTOCOL_DATA } from '../content/protocolData';
import { FlowNode } from '../types';
import { FlowBreadcrumb } from './decision/FlowBreadcrumb';
import { QuestionStep } from './decision/QuestionStep';
import { DecisionSummary } from './decision/DecisionSummary';
import { EmergencyCTA } from './decision/EmergencyCTA';
import { DecisionHistoryPanel } from './decision/DecisionHistoryPanel';
import { useBreakpoint } from '../hooks/useBreakpoint';

interface DecisionStep {
  nodeId: string;
  selectedOptionLabel?: string;
}

export const DecisionWizard: React.FC = () => {
  const [history, setHistory] = useState<DecisionStep[]>([{ nodeId: 'root' }]);
  const { isMobile, isDesktop } = useBreakpoint();

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
    <section className="relative pb-24" aria-live="polite">
      <DecisionSummary
        stepNumber={history.length}
        canGoBack={history.length > 1}
        onGoBack={goBack}
        onReset={resetWizard}
      />

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="space-y-4">
          {!isDesktop ? <FlowBreadcrumb items={breadcrumb as Array<{ idx: number; node?: FlowNode; answer?: string }>} /> : null}

          {!currentNode.isLeaf ? (
            <QuestionStep node={currentNode} onSelect={goToNext} />
          ) : (
            <ActionCard leafNode={currentNode} services={leafServices} />
          )}

          <EmergencyCTA node={currentNode} />

          {isMobile ? (
            <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              Fluxo mobile ativo: uma etapa por vez para manter foco sequencial.
            </div>
          ) : null}
        </div>

        {isDesktop ? (
          <div className="sticky top-20">
            <DecisionHistoryPanel
              items={breadcrumb as Array<{ idx: number; node?: FlowNode; answer?: string }>}
              currentQuestion={currentNode.question}
              stepNumber={history.length}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
};
