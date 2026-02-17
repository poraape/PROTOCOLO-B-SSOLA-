import React from 'react';
import { FlowNode } from '../../types';
import { IndicatorsAccordion } from '../IndicatorsAccordion';

interface QuestionStepProps {
  node: FlowNode;
  onSelect: (nextNodeId: string, label: string) => void;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({ node, onSelect }) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h2 className="text-3xl font-extrabold leading-tight text-slate-900 dark:text-slate-100">{node.question}</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Pergunta objetiva: escolha uma opção para continuar o protocolo.</p>

      <IndicatorsAccordion
        items={node.indicators || node.severityCriteria}
        title="Sinais e indicadores observáveis"
        microcopy="Use os sinais como apoio descritivo. Em caso de dúvida, registre e escale para a gestão escolar."
      />

      <div className={`mt-6 grid gap-3 ${node.id === 'n_categoria_situacao' ? 'sm:grid-cols-2' : ''}`} aria-label="Ações de resposta">
        {node.options.map((option) => (
          <button
            key={option.nextNodeId}
            onClick={() => onSelect(option.nextNodeId, option.label)}
            className="rounded-2xl border border-slate-300 bg-white px-5 py-4 text-left text-base font-semibold text-slate-900 transition hover:border-[#007AFF] hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            {option.label}
          </button>
        ))}

        {(node.fallbackNextNodeId || node.id !== 'leaf_duvida_padrao') && (
          <button
            onClick={() => onSelect(node.fallbackNextNodeId || 'leaf_duvida_padrao', 'Não sei / dúvida')}
            className="rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-left text-base font-bold text-amber-900 transition hover:border-amber-400 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            ❔ Não sei / dúvida
          </button>
        )}
      </div>
    </section>
  );
};
