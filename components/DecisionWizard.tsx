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
import { AlertPanel } from './decision/AlertPanel';
import { GlobalEmergencyButton } from './decision/GlobalEmergencyButton';
import { StateOverlay } from './decision/StateOverlay';

interface DecisionStep { nodeId: string; selectedOptionLabel?: string; }

export const DecisionWizard: React.FC = () => {
  const [history, setHistory] = useState<DecisionStep[]>([{ nodeId: 'root_risk_check' }]);
  const [showMobileHistory, setShowMobileHistory] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { isMobile, isDesktop } = useBreakpoint();

  const nodeMap = useMemo(() => new Map(PROTOCOL_DATA.decisionTree.map((node) => [node.id, node])), []);
  const currentStep = history[history.length - 1];
  const currentNode = nodeMap.get(currentStep.nodeId);

  const breadcrumb = history.slice(0, -1).map((step, idx) => ({ idx, node: nodeMap.get(step.nodeId), answer: history[idx + 1]?.selectedOptionLabel }));

  const goToNext = (nextNodeId: string, selectedOptionLabel: string) => {
    const safeNextNodeId = nodeMap.has(nextNodeId) ? nextNodeId : 'cat_nao_sei_apoio';
    setIsTransitioning(true);
    setHistory((prev) => [...prev, { nodeId: safeNextNodeId, selectedOptionLabel }]);
    window.setTimeout(() => setIsTransitioning(false), 120);
  };
  const goBack = () => history.length > 1 && setHistory((prev) => prev.slice(0, -1));
  const resetWizard = () => setHistory([{ nodeId: 'root_risk_check' }]);
  const goToCategoryHome = () => setHistory([{ nodeId: 'root_risk_check' }, { nodeId: 'category_home', selectedOptionLabel: 'Voltar para categorias' }]);
  const goToSupport = () => setHistory([{ nodeId: 'root_risk_check' }, { nodeId: 'cat_nao_sei_apoio', selectedOptionLabel: 'Falar com gestão' }, { nodeId: 'leaf_nao_sei', selectedOptionLabel: 'Apoio da gestão' }]);

  if (!currentNode) return <StateOverlay type="error" text="Falha na rota. Reinicie e chame Gestão." inline />;

  const leafServices = PROTOCOL_DATA.services;
  const treeDepth = useMemo(() => validateTreeDepth(PROTOCOL_DATA.decisionTree, 12).maxDepth, []);

  return (
    <section className="relative" aria-live="polite">
      <DecisionSummary
        stepNumber={history.length}
        totalSteps={Math.max(treeDepth - 1, history.length)}
        canGoBack={history.length > 1}
        onGoBack={goBack}
        onReset={resetWizard}
      />


      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="btn-secondary text-sm focus-visible:ring-2 focus-visible:ring-brand-500" onClick={goToCategoryHome}>
          ← Voltar para categorias
        </button>
        <button type="button" className="btn-secondary text-sm focus-visible:ring-2 focus-visible:ring-brand-500" onClick={resetWizard}>
          Reclassificar
        </button>
        <button type="button" className="btn-secondary text-sm focus-visible:ring-2 focus-visible:ring-brand-500" onClick={goToSupport}>
          Falar com gestão
        </button>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3 lg:items-start">
        <div className="space-y-4 lg:col-span-2">
          {!isMobile && currentNode.riskLevel === "EMERGENCIAL" && <EmergencyCTA node={currentNode} isMobile={false} />}
          {!isDesktop && <FlowBreadcrumb items={breadcrumb as Array<{ idx: number; node?: FlowNode; answer?: string }>} />}
          {!currentNode.isLeaf ? <QuestionStep node={currentNode} onSelect={goToNext} /> : <ActionCard leafNode={currentNode} services={leafServices} onRestart={resetWizard} variant="compact" />}
          <AlertPanel context="orientacoes" />

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

      {isMobile && currentNode.riskLevel === "EMERGENCIAL" && <EmergencyCTA node={currentNode} isMobile />}
      {currentNode.riskLevel !== "EMERGENCIAL" && <GlobalEmergencyButton />}
      {isTransitioning && <StateOverlay type="loading" text="Carregando orientação..." />}
    </section>
  );
};
