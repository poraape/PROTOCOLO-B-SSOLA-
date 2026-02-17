import React from 'react';
import { FlowNode } from '../../types';
import { IndicatorsAccordion } from '../IndicatorsAccordion';
import { CategoryOptionCard } from '../CategoryOptionCard';
import { CATEGORY_TOKENS, CategoryId } from '../../ui/categoryTokens';

interface QuestionStepProps {
  node: FlowNode;
  onSelect: (nextNodeId: string, label: string) => void;
}

const normalizeCategoryId = (categoryId?: string): CategoryId | null => {
  if (!categoryId) return null;

  const legacyMap: Record<string, CategoryId> = {
    convivencia: 'conflito',
    pedagogico: 'pedagogica',
    saude_fisica: 'fisica'
  };

  return (legacyMap[categoryId] || categoryId) as CategoryId;
};

export const QuestionStep: React.FC<QuestionStepProps> = ({ node, onSelect }) => {
  const hasUncertaintyOption = node.options.some((option) =>
    option.label.toLowerCase().includes('não sei') || option.label.toLowerCase().includes('nao sei')
  );

  const isCategoryStep = node.id === 'n_categoria_situacao';

  return (
    <section className="card">
      <h2 className="text-2xl font-extrabold leading-tight text-text">{node.question}</h2>
      <p className="mt-2 text-sm text-muted">Escolha uma opção para continuar o protocolo.</p>

      <IndicatorsAccordion
        items={node.indicators || node.severityCriteria}
        title="Sinais e indicadores observáveis"
        microcopy="Use os sinais como apoio. Em caso de dúvida, registre e escale para a gestão escolar."
      />

      <div className="grid md:grid-cols-2 gap-4 mt-6" aria-label="Ações de resposta">
        {node.options.map((option) => {
          const normalizedCategoryId = normalizeCategoryId(option.categoryId);
          const category = normalizedCategoryId ? CATEGORY_TOKENS[normalizedCategoryId] : null;

          if (isCategoryStep && category) {
            return (
              <CategoryOptionCard
                key={`${option.nextNodeId}-${option.label}`}
                category={category}
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
