import React from 'react';
import { decisionTreeV2 } from '../../data/decision-tree-migration';
import { useDecisionTreeV2 } from '../../hooks/useDecisionTreeV2';
import { DecisionScreen } from './DecisionScreen';
import { ResultScreen } from './ResultScreen';
import { CategoryGrid } from './CategoryGrid';
import { ContextualControls } from './ContextualControls';
import { designTokens } from '../../styles/design-tokens';

const EmergencyButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      backgroundColor: designTokens.colors.emergency,
      color: '#FFFFFF',
      padding: '16px 24px',
      borderRadius: '50px',
      border: 'none',
      fontWeight: '700',
      cursor: 'pointer',
      zIndex: 1000,
      boxShadow: designTokens.shadows.emergency
    }}
  >
    🚨 EMERGÊNCIA
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
    if (!('level' in currentNode)) return <div>Nó desconhecido</div>;

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
          />
        );

      default:
        return <div>Nó desconhecido</div>;
    }
  };

  const currentLevel = 'level' in currentNode ? currentNode.level : 'CATEGORY';

  return (
    <>
      <div style={{ paddingBottom: '88px' }}>
        {canGoBack ? (
          <div style={{ maxWidth: '1000px', margin: '0 auto', padding: `${designTokens.spacing.md} ${designTokens.spacing.xl}` }}>
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
              ← Voltar
            </button>
          </div>
        ) : null}

        {renderContent()}
      </div>

      {currentLevel !== 'CRITICAL_TRIAGE' ? <EmergencyButton onClick={() => navigate('EMERGENCY_LEAF')} /> : null}

      <ContextualControls
        currentLevel={currentLevel}
        canGoBackToCategories={state.history.includes('CATEGORY_SELECT')}
        onBackToCategories={handleBackToCategories}
        onContactManagement={handleContactManagement}
        showReclassify={currentLevel === 'LEAF'}
        onReclassify={reset}
      />

      {showManagementModal ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200
          }}
          onClick={() => setShowManagementModal(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: designTokens.borderRadius.lg,
              padding: designTokens.spacing.lg,
              width: 'min(90vw, 420px)'
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <h3 style={{ marginTop: 0 }}>Contato da gestão</h3>
            <p style={{ marginBottom: designTokens.spacing.md }}>
              Acione Direção/Coordenação imediatamente para validação conjunta e registro oficial.
            </p>
            <button
              type="button"
              onClick={() => setShowManagementModal(false)}
              style={{
                border: 'none',
                backgroundColor: designTokens.colors.routine,
                color: '#FFFFFF',
                padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
                borderRadius: designTokens.borderRadius.md,
                cursor: 'pointer'
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DecisionTreeNavigator;
