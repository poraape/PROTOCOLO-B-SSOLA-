import React from 'react';
import { designTokens } from '../../styles/design-tokens';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, label = 'Progresso' }) => {
  const safeTotal = total > 0 ? total : 1;
  const clampedCurrent = Math.min(Math.max(current, 0), safeTotal);
  const percentage = (clampedCurrent / safeTotal) * 100;

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          fontSize: designTokens.typography.help.size,
          fontWeight: designTokens.typography.help.weight,
          lineHeight: designTokens.typography.help.lineHeight,
          color: designTokens.colors.info,
          marginBottom: designTokens.spacing.sm
        }}
      >
        {label} {clampedCurrent}/{safeTotal}
      </div>
      <div
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: designTokens.colors.background.tertiary,
          borderRadius: designTokens.borderRadius.full,
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: designTokens.colors.routine,
            borderRadius: designTokens.borderRadius.full,
            transition: 'width 0.3s ease'
          }}
        />
      </div>
    </div>
  );
};
