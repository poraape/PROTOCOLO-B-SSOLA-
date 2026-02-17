import React from 'react';
import { FlowNode } from '../../types';
import { CategoryOptionCard } from '../CategoryOptionCard';

interface QuestionStepProps {
  node: FlowNode;
  onSelect: (nextNodeId: string, label: string) => void;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({ node, onSelect }) => {
  const hasCategoryOptions = node.options.some((option) => option.categoryId);
  const twoColumns = hasCategoryOptions || node.options.length > 4 || node.id === 'n_categoria_situacao';

  const normalizeLabel = (label: string) =>
    label
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

  const labels = node.options.map((o) => normalizeLabel(o.label));
  const isYesNo = node.options.length === 2 && labels.includes('sim') && labels.includes('nao');

  const doubtNext = node.fallbackNextNodeId ?? 'leaf_duvida_padrao';

  return (
    <section className="card-elevated">
      <h2 className="section-title mb-2">{node.question}</h2>
      <p className="section-subtitle mb-3">
        {node.helperText ?? 'Responda apenas o que você observa agora. Em dúvida, use “Não sei / preciso de apoio”.'}
      </p>

      {node.indicators?.length ? (
        <details className="mt-2 rounded-lg border border-gray-200 bg-white p-3">
          <summary className="cursor-pointer text-sm font-semibold text-gray-800">
            Como identificar? (sinais observáveis)
          </summary>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
            {node.indicators.map((it) => <li key={it}>{it}</li>)}
          </ul>
          <p className="mt-2 text-xs text-gray-500">Use como apoio. Se houver dúvida relevante, escale para a gestão.</p>
        </details>
      ) : null}

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

          const normalizedLabel = normalizeLabel(option.label);
          const isYes = normalizedLabel === 'sim';
          const isNo = normalizedLabel === 'nao';
          const yesNoClass = isYesNo
            ? isYes
              ? 'bg-blue-800 text-white border-blue-800 hover:bg-blue-900'
              : isNo
                ? 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                : ''
            : '';

          return (
            <button
              key={`${option.nextNodeId}-${option.label}`}
              onClick={() => onSelect(option.nextNodeId, option.label)}
              className={`btn-secondary w-full py-4 text-left text-base focus-visible:ring-2 focus-visible:ring-brand-500 ${yesNoClass}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {node.showDoubt !== false && (
        <div className="mt-5">
          <button
            onClick={() => onSelect(doubtNext, 'Não sei / preciso de apoio')}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Não sei / preciso de apoio
          </button>
        </div>
      )}
    </section>
  );
};
