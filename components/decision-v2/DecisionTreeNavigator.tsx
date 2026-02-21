import React from 'react';
import { decisionTreeV2 } from '../../data/decision-tree-migration';
import { useDecisionTreeV2 } from '../../hooks/useDecisionTreeV2';
import { DecisionScreen } from './DecisionScreen';
import { ResultScreen } from './ResultScreen';
import { CategoryGrid } from './CategoryGrid';
import { ContextualControls } from './ContextualControls';
import { designTokens } from '../../styles/design-tokens';
import { ManagementContactModal } from './ManagementContactModal';
import { SchoolShield } from '../SchoolShield';
import { verbByIntentCapitalized } from '../../content/microcopyLexicon';

const EmergencyButton: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      position: 'fixed',
      bottom: 'calc(16px + 88px + env(safe-area-inset-bottom, 0px))',
      right: '16px',
      backgroundColor: designTokens.colors.emergency,
      color: '#FFFFFF',
      padding: '14px 20px',
      borderRadius: '50px',
      border: 'none',
      fontWeight: '700',
      fontSize: '14px',
      lineHeight: 1.2,
      maxWidth: 'calc(100vw - 32px)',
      cursor: 'pointer',
      zIndex: 1000,
      boxShadow: designTokens.shadows.emergency
    }}
  >
    🚨 {label}
  </button>
);


const ManagementButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      position: 'fixed',
      bottom: 'calc(16px + 88px + env(safe-area-inset-bottom, 0px))',
      left: '16px',
      backgroundColor: designTokens.colors.info,
      color: '#FFFFFF',
      padding: '12px 18px',
      borderRadius: '999px',
      border: 'none',
      fontWeight: '700',
      cursor: 'pointer',
      zIndex: 1000,
      boxShadow: designTokens.shadows.md
    }}
  >
    🏫 Comunicar a gestão agora
  </button>
);

export const DecisionTreeNavigator: React.FC = () => {
  const { currentNode, navigate, goBack, reset, canGoBack, state } = useDecisionTreeV2(decisionTreeV2);
  const [showManagementModal, setShowManagementModal] = React.useState(false);

  const handleBackToCategories = React.useCallback(() => {
    navigate('CATEGORY_SELECT');
  }, [navigate]);

  const handleContactManagement = React.useCallback(() => {
    setShowManagementModal(true);
  }, []);

  const renderContent = () => {
    if (!('level' in currentNode)) return <div>Não foi possível carregar esta etapa do decisor. Reinicie a triagem.</div>;

    switch (currentNode.level) {
      case 'CRITICAL_TRIAGE':
      case 'RISK_ASSESSMENT':
      case 'SUBFLOW': {
        const options = 'options' in currentNode ? currentNode.options : [];
        const progress =
          currentNode.level === 'RISK_ASSESSMENT' || currentNode.level === 'SUBFLOW'
            ? {
                current: currentNode.questionNumber || 1,
                total: currentNode.totalQuestions || 1
              }
            : undefined;

        return (
          <DecisionScreen
            question={currentNode.question}
            options={options.map((option) => ({ label: option.label, value: option.nextNodeId }))}
            onSelect={(nextNodeId) => {
              const selected = options.find((option) => option.nextNodeId === nextNodeId);
              const riskWeight =
                selected && 'riskWeight' in selected && typeof selected.riskWeight === 'number'
                  ? selected.riskWeight
                  : undefined;
              navigate(nextNodeId, selected?.label, riskWeight);
            }}
            helpText={'helpText' in currentNode ? currentNode.helpText : undefined}
            progress={progress}
            emergencyMode={currentNode.level === 'CRITICAL_TRIAGE'}
            history={state.history}
            nodes={decisionTreeV2.nodes}
            currentNodeId={state.currentNodeId}
          />
        );
      }

      case 'CATEGORY': {
        return (
          <CategoryGrid
            categories={currentNode.categories}
            onSelect={(categoryId) => {
              const selected = currentNode.categories.find((category) => category.id === categoryId);
              if (selected) navigate(selected.nextNodeId, selected.label);
            }}
          />
        );
      }

      case 'LEAF':
        return (
          <ResultScreen
            leaf={currentNode}
            onBack={reset}
            onPrint={() => window.print()}
            history={state.history}
            nodes={decisionTreeV2.nodes}
            currentNodeId={state.currentNodeId}
            onContactManagement={handleContactManagement}
          />
        );

      default:
        return <div>Não foi possível carregar esta etapa do decisor. Reinicie a triagem.</div>;
    }
  };

  const currentLevel = 'level' in currentNode ? currentNode.level : 'CATEGORY';
  const emergencyButtonLabel =
    currentLevel === 'CRITICAL_TRIAGE'
      ? 'Já é emergência? Acionar 192/190/193'
      : 'Acionar emergência agora (192/190/193)';

  return (
    <>
      <div style={{ paddingBottom: '88px', background: 'transparent' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: `${designTokens.spacing.md} 16px` }}>
          <SchoolShield variant="full" />
        </div>

        {canGoBack ? (
          <div style={{ maxWidth: '1180px', margin: '0 auto', padding: `0 16px ${designTokens.spacing.md}` }}>
            <button
              type="button"
              onClick={goBack}
              style={{
                background: 'transparent',
                border: 'none',
                color: designTokens.colors.routine,
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ← Voltar para a pergunta anterior
            </button>
          </div>
        ) : null}

        {renderContent()}
      </div>

      <EmergencyButton onClick={() => navigate('EMERGENCY_LEAF')} label={emergencyButtonLabel} />
      <ContextualControls
        currentLevel={currentLevel}
        canGoBackToCategories={state.history.includes('CATEGORY_SELECT')}
        onBackToCategories={handleBackToCategories}
        onContactManagement={handleContactManagement}
        showReclassify={currentLevel === 'LEAF'}
        onReclassify={reset}
      />

      <ManagementButton onClick={handleContactManagement} />
      <ManagementContactModal isOpen={showManagementModal} onClose={() => setShowManagementModal(false)} />

    </>
  );
};

export default DecisionTreeNavigator;
