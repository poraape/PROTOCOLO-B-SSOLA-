import React, { useMemo, useState } from 'react';
import { ActionCard } from './ActionCard';
import { PROTOCOL_DATA } from '../data';
import { FlowNode } from '../types';

interface DecisionStep {
  nodeId: string;
  selectedOptionLabel?: string;
}

const getPanicLink = (node?: FlowNode) => {
  if (!node || node.category === 'EMERGÊNCIA' || node.riskLevel === 'EMERGENCIAL') {
    return 'tel:190';
  }
  return 'tel:192';
};

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
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Passo {history.length}
        </p>
        {history.length > 1 && (
          <button
            onClick={goBack}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100"
          >
            ← Voltar
          </button>
        )}
      </div>

      {!!breadcrumb.length && (
        <nav className="mb-6 rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-500">Histórico</h3>
          <ol className="space-y-1 text-sm text-slate-700">
            {breadcrumb.map(({ idx, node, answer }) => (
              <li key={`crumb-${idx}`}>
                <span className="font-semibold">{node?.question}</span>
                {answer ? <span className="text-slate-500"> → {answer}</span> : null}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {!currentNode.isLeaf ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-extrabold leading-tight text-slate-900">{currentNode.question}</h2>
          <p className="mt-2 text-sm text-slate-600">Escolha uma opção para continuar o protocolo.</p>

          <div className="mt-6 grid gap-3">
            {currentNode.options.map((option) => (
              <button
                key={option.nextNodeId}
                onClick={() => goToNext(option.nextNodeId, option.label)}
                className="rounded-2xl border border-slate-300 bg-white px-5 py-4 text-left text-base font-semibold text-slate-900 transition hover:border-[#007AFF] hover:bg-blue-50"
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>
      ) : (
        <ActionCard leafNode={currentNode} services={leafServices} />
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={resetWizard}
          className="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
        >
          Reiniciar fluxo
        </button>
      </div>

      <a
        href={getPanicLink(currentNode)}
        className="fixed bottom-24 right-6 z-40 rounded-full bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-red-700"
      >
        EMERGÊNCIA 190/192
      </a>
    </div>
  );
};
