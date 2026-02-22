import { ArrowLeft, ChevronRight } from 'lucide-react';
import { DecisionButton } from './DecisionButton';
import { InstitutionalBreadcrumb } from './InstitutionalBreadcrumb';
import { ProgressBar } from './ProgressBar';
import type { DecisionNode, DecisionOption } from '../../types/decision-tree-v2';

interface DecisionScreenProps {
  node: DecisionNode;
  onSelect: (option: DecisionOption) => void;
  onBack: () => void;
  progress: number;
  history: string[];
}

export const DecisionScreen = ({
  node,
  onSelect,
  onBack,
  progress,
  history,
}: DecisionScreenProps) => {
  return (
    <div className="decision-screen">
      <header className="decision-header">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={18} />
          Voltar
        </button>
        <InstitutionalBreadcrumb schoolName="Escola de Exemplo" />
      </header>

      <div className="decision-content">
        <ProgressBar progress={progress} />
        <h1 className="decision-title">{node.label}</h1>
        {node.description && (
          <p className="decision-description">{node.description}</p>
        )}

        <div className="decision-options">
          {node.options.map((option) => (
            <DecisionButton
              key={option.id}
              label={option.label}
              onClick={() => onSelect(option)}
              isActive={history.includes(option.id)}
            />
          ))}
        </div>
      </div>

      <footer className="decision-footer">
        {/* Placeholder for future elements like contextual help */}
      </footer>
    </div>
  );
};
