import React from 'react';
import { FlowNode } from '../../types';
import { IndicatorsAccordion } from '../IndicatorsAccordion';

interface QuestionStepProps {
  node: FlowNode;
  onSelect: (nextNodeId: string, label: string) => void;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({ node, onSelect }) => {
  const twoColumns = node.options.length > 4 || node.id === 'n_categoria_situacao';

  return (
    <section className="card">
      <h2 className="text-2xl font-extrabold leading-tight text-text">{node.question}</h2>
      <p className="mt-2 text-sm text-muted">Escolha uma opção para continuar o protocolo.</p>

      <IndicatorsAccordion
        items={node.indicators || node.severityCriteria}
        title="Sinais e indicadores observáveis"
        microcopy="Use os sinais como apoio. Em caso de dúvida, registre e escale para a gestão escolar."
      />

      <div className={`mt-5 grid gap-3 ${twoColumns ? 'md:grid-cols-2' : ''}`} aria-label="Ações de resposta">
        {node.options.map((option) => (
          <button
            key={`${option.nextNodeId}-${option.label}`}
            onClick={() => onSelect(option.nextNodeId, option.label)}
            className="btn-secondary w-full py-4 text-left text-base focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            {option.label}
          </button>
        ))}

        {(node.fallbackNextNodeId || node.id !== 'leaf_duvida_padrao') && (
          <button
            onClick={() => onSelect(node.fallbackNextNodeId || 'leaf_duvida_padrao', 'Não sei / preciso de apoio')}
            className="w-full rounded-xl border border-accent-200 bg-accent-50 px-5 py-4 text-left text-base font-semibold text-accent-800 focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Não sei / preciso de apoio
          </button>
        )}
      </div>
    </section>
  );
};
