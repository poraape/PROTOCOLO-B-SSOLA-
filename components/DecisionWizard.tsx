import React, { useMemo, useState } from 'react';
import { ActionCard } from './ActionCard';
import { PROTOCOL_DATA } from '../content/protocolData';
import { FlowNode } from '../types';
import { QuestionStep } from './decision/QuestionStep';
import { FlowBreadcrumb } from './decision/FlowBreadcrumb';
import { DecisionSummary } from './decision/DecisionSummary';
import { EmergencyCTA } from './decision/EmergencyCTA';
import { DecisionHistoryPanel } from './decision/DecisionHistoryPanel';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { validateTreeDepth } from '../services/validateTreeDepth';

interface DecisionStep { nodeId: string; selectedOptionLabel?: string; }

export const DecisionWizard: React.FC = () => {
  const [history, setHistory] = useState<DecisionStep[]>([{ nodeId: 'root' }]);
  const [showMobileHistory, setShowMobileHistory] = useState(false);
  const { isMobile, isDesktop } = useBreakpoint();

  const nodeMap = useMemo(() => new Map(PROTOCOL_DATA.decisionTree.map((node) => [node.id, node])), []);
  const currentStep = history[history.length - 1];
  const currentNode = nodeMap.get(currentStep.nodeId);

  const breadcrumb = history.slice(0, -1).map((step, idx) => ({ idx, node: nodeMap.get(step.nodeId), answer: history[idx + 1]?.selectedOptionLabel }));

  const goToNext = (nextNodeId: string, selectedOptionLabel: string) => {
    const safeNextNodeId = nodeMap.has(nextNodeId) ? nextNodeId : 'leaf_duvida_padrao';
    setHistory((prev) => [...prev, { nodeId: safeNextNodeId, selectedOptionLabel }]);
  };
  const goBack = () => history.length > 1 && setHistory((prev) => prev.slice(0, -1));
  const resetWizard = () => setHistory([{ nodeId: 'root' }]);

  if (!currentNode) return <div className="card border-danger-200 bg-danger-50 text-danger-700">Erro: fluxo não encontrado.</div>;

  const leafServices = PROTOCOL_DATA.services;
  const treeDepth = useMemo(() => validateTreeDepth(PROTOCOL_DATA.decisionTree, 12).maxDepth, []);

  return (
    <section className="relative" aria-live="polite">
      <div className="card mb-4">
        <h1 className="text-2xl font-extrabold text-text">Decisor Escolar</h1>
        <p className="mt-1 text-sm text-muted">Responda às perguntas para receber orientação imediata. Duração média: 30 segundos.</p>
      </div>

      <DecisionSummary
        stepNumber={history.length}
        totalSteps={Math.max(treeDepth - 1, history.length)}
        canGoBack={history.length > 1}
        onGoBack={goBack}
        onReset={resetWizard}
      />

      <div className="mt-4 grid gap-4 lg:grid-cols-3 lg:items-start">
        <div className="space-y-4 lg:col-span-2">
          {!isMobile && <EmergencyCTA node={currentNode} isMobile={false} />}
          {!isDesktop && <FlowBreadcrumb items={breadcrumb as Array<{ idx: number; node?: FlowNode; answer?: string }>} />}
          {!currentNode.isLeaf ? <QuestionStep node={currentNode} onSelect={goToNext} /> : <ActionCard leafNode={currentNode} services={leafServices} />}

          {isMobile ? (
            <div className="card">
              <button className="w-full text-left text-sm font-semibold text-brand-800" onClick={() => setShowMobileHistory((v) => !v)}>
                {showMobileHistory ? 'Ocultar histórico' : 'Mostrar histórico'}
              </button>
              {showMobileHistory && (
                <div className="mt-3">
                  <DecisionHistoryPanel items={breadcrumb as Array<{ idx: number; node?: FlowNode; answer?: string }>} currentQuestion={currentNode.question} stepNumber={history.length} />
                </div>
              )}
            </div>
          ) : null}
        </div>

        {isDesktop ? (
          <div className="sticky top-20">
            <DecisionHistoryPanel items={breadcrumb as Array<{ idx: number; node?: FlowNode; answer?: string }>} currentQuestion={currentNode.question} stepNumber={history.length} />
          </div>
        ) : null}
      </div>

      {isMobile && <EmergencyCTA node={currentNode} isMobile />}
    </section>
  );
};
