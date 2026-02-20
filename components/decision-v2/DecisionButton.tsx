import React from 'react';
import { designTokens } from '../../styles/design-tokens';

type DecisionButtonVariant = 'default' | 'emergency' | 'secondary';

interface DecisionButtonProps {
  label: string;
  onClick: () => void;
  variant?: DecisionButtonVariant;
  disabled?: boolean;
}

export const DecisionButton: React.FC<DecisionButtonProps> = ({
  label,
  onClick,
  variant = 'default',
  disabled = false
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const baseBackground =
    variant === 'emergency'
      ? designTokens.colors.emergency
      : variant === 'default'
        ? designTokens.colors.routine
        : 'transparent';

  const baseColor = variant === 'secondary' ? designTokens.colors.routine : '#FFFFFF';

  const border =
    variant === 'secondary'
      ? `2px solid ${designTokens.colors.routine}`
      : `1px solid ${baseBackground}`;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      style={{
        width: '100%',
        minHeight: '56px',
        padding: designTokens.spacing.lg,
        borderRadius: designTokens.borderRadius.md,
        border,
        backgroundColor: disabled
          ? designTokens.colors.background.tertiary
          : baseBackground,
        color: disabled ? designTokens.colors.info : baseColor,
        fontSize: '18px',
        fontWeight: '600',
        lineHeight: '1.4',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled
          ? 'none'
          : variant === 'emergency'
            ? designTokens.shadows.emergency
            : isHovered
              ? designTokens.shadows.md
              : designTokens.shadows.sm,
        transform: isActive ? 'translateY(1px)' : 'translateY(0)',
        opacity: disabled ? 0.7 : 1,
        transition: 'all 0.2s ease'
      }}
    >
      {label}
    </button>
  );
};
