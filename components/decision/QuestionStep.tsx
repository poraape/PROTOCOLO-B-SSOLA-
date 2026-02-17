import React from 'react';
import { FlowNode } from '../../types';
import { IndicatorsAccordion } from '../IndicatorsAccordion';
import { CategoryOptionCard } from '../CategoryOptionCard';

interface QuestionStepProps {
  node: FlowNode;
  onSelect: (nextNodeId: string, label: string) => void;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({ node, onSelect }) => {
  const hasCategoryOptions = node.options.some((option) => option.categoryId);
  const twoColumns = hasCategoryOptions || node.options.length > 4 || node.id === 'n_categoria_situacao';
  const hasUncertaintyOption = node.options.some((option) => option.label.toLowerCase().includes('não sei'));

  return (
    <section className="card-elevated">
      <h2 className="section-title mb-2">{node.question}</h2>
      <p className="section-subtitle mb-6">Escolha uma opção para continuar.</p>

      <IndicatorsAccordion
        items={node.indicators || node.severityCriteria}
        title="Sinais e indicadores observáveis"
        microcopy="Use os sinais como apoio. Em caso de dúvida, registre e escale para a gestão escolar."
      />

      <div className={`mt-5 grid gap-4 ${twoColumns ? 'md:grid-cols-2' : ''}`} aria-label="Ações de resposta">
        {node.options.map((option) => {
          if (option.categoryId) {
            return (
              <CategoryOptionCard
                key={`${option.nextNodeId}-${option.label}`}
                categoryId={option.categoryId}
                onClick={() => onSelect(option.nextNodeId, option.label)}
              />
            );
          }

          return (
            <button
              key={`${option.nextNodeId}-${option.label}`}
              onClick={() => onSelect(option.nextNodeId, option.label)}
              className="btn-secondary w-full py-4 text-left text-base focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              {option.label}
            </button>
          );
        })}

        {!hasUncertaintyOption && (node.fallbackNextNodeId || node.id !== 'leaf_duvida_padrao') && (
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
