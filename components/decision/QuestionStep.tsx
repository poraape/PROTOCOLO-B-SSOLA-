import React from 'react';
import { FlowNode } from '../../types';
import { IndicatorsAccordion } from '../IndicatorsAccordion';
import { CategoryOptionCard } from '../CategoryOptionCard';
import { CATEGORY_TOKENS, CategoryId } from '../../ui/categoryTokens';
import { AlertPanel } from './AlertPanel';

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


const categoryKeyFromNode = (nodeId: string): 'mental_health' | 'violence' | 'physical_health' | 'pedagogical' | 'registration' | 'emergency' => {
  if (nodeId.includes('mental') || nodeId.includes('drogas')) return 'mental_health';
  if (nodeId.includes('direitos') || nodeId.includes('convivencia') || nodeId.includes('discriminacao') || nodeId.includes('violencia')) return 'violence';
  if (nodeId.includes('fisico') || nodeId.includes('gravidez')) return 'physical_health';
  return 'pedagogical';
};

export const QuestionStep: React.FC<QuestionStepProps> = ({ node, onSelect }) => {
  const hasUncertaintyOption = node.options.some((option) =>
    option.label.toLowerCase().includes('não sei') || option.label.toLowerCase().includes('nao sei')
  );

  const isCategoryStep = node.id === 'n_categoria_situacao';


  const quickSignalEntries = [
    {
      key: 'P',
      title: 'P - Pedagógicos',
      examples: 'Aluno não está aprendendo; faltas recorrentes.',
      nextNodeId: 'n_pedagogico_triagem',
      label: 'Entrada rápida P'
    },
    {
      key: 'S',
      title: 'S - Saúde Mental',
      examples: 'Chorando muito; fala de se machucar/morrer.',
      nextNodeId: 'n_mental_triagem',
      label: 'Entrada rápida S'
    },
    {
      key: 'F',
      title: 'F - Saúde Física',
      examples: 'Desmaio; convulsão; febre alta.',
      nextNodeId: 'n_fisico_triagem',
      label: 'Entrada rápida F'
    },
    {
      key: 'V',
      title: 'V - Violências/Proteção',
      examples: 'Briga; bullying; objeto perigoso; suspeita de abuso.',
      nextNodeId: 'n_direitos_triagem',
      label: 'Entrada rápida V'
    }
  ];

  return (
    <section className="card">
      <h2 className="text-2xl font-extrabold leading-tight text-text">{node.question}</h2>
      <p className="mt-2 text-sm text-muted">Escolha a opção mais próxima do que você vê agora.</p>

      <AlertPanel context="inline" ruleId={node.id.toUpperCase().startsWith('R') ? node.id.toUpperCase() : undefined} categoryKey={categoryKeyFromNode(node.id)} />


      {node.id === 'root' ? (
        <div className="mt-4 rounded-xl border border-brand-100 bg-white p-4">
          <h3 className="text-sm font-bold text-brand-900">O que você está vendo agora?</h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {quickSignalEntries.map((entry) => (
              <button
                key={entry.key}
                type="button"
                onClick={() => onSelect(entry.nextNodeId, entry.label)}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-left focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <p className="text-sm font-semibold text-text">{entry.title}</p>
                <p className="mt-1 text-xs text-muted">{entry.examples}</p>
              </button>
            ))}
          </div>
        </div>
      ) : null}

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
              type="button"
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
            type="button"
            onClick={() => onSelect(node.fallbackNextNodeId || 'leaf_duvida_padrao', 'Não tenho certeza — acionar apoio da gestão')}
            className="w-full rounded-xl border border-accent-200 bg-accent-50 px-5 py-4 text-left text-base font-semibold text-accent-800 focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Não tenho certeza — acionar apoio da gestão
          </button>
        )}
      </div>
    </section>
  );
};
