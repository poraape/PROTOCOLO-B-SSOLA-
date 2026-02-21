import React from 'react';
import { designTokens } from '../../styles/design-tokens';
import { DecisionLevel } from '../../types/decision-tree-v2';
import { getManagementNotificationLabel } from './managementNotificationLabel';

interface ContextualControlsProps {
  currentLevel: DecisionLevel;
  canGoBackToCategories: boolean;
  onBackToCategories: () => void;
  onContactManagement: () => void;
  showReclassify?: boolean;
  onReclassify?: () => void;
}

export const ContextualControls: React.FC<ContextualControlsProps> = ({
  currentLevel,
  canGoBackToCategories,
  onBackToCategories,
  onContactManagement,
  showReclassify = false,
  onReclassify
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: designTokens.colors.background.secondary,
        borderTop: '1px solid #E5E7EB',
        padding: designTokens.spacing.md,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: designTokens.spacing.sm,
        zIndex: 100
      }}
    >
      {canGoBackToCategories && currentLevel !== 'CATEGORY' ? (
        <button
          type="button"
          onClick={onBackToCategories}
          style={{
            fontSize: '14px',
            color: designTokens.colors.routine,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          ← Voltar à seleção de domínio
        </button>
      ) : (
        <div />
      )}

      <button
        type="button"
        onClick={onContactManagement}
        style={{
          fontSize: '14px',
          color: designTokens.colors.info,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          marginLeft: 'auto'
        }}
      >
        💬 Comunicar a gestão agora
      </button>

      {showReclassify && currentLevel === 'LEAF' ? (
        <button
          type="button"
          onClick={onReclassify}
          style={{
            fontSize: '14px',
            color: designTokens.colors.attention,
            background: 'transparent',
            border: 'none',
            cursor: onReclassify ? 'pointer' : 'not-allowed',
            opacity: onReclassify ? 1 : 0.6
          }}
          disabled={!onReclassify}
        >
          🔄 Iniciar nova classificação
        </button>
      ) : null}
    </div>
  );
};
