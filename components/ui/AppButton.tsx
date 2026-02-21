import React from 'react';

type AppButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type AppButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: AppButtonVariant;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  iconOnly?: boolean;
};

export const AppButton: React.FC<AppButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'secondary',
  className = '',
  disabled = false,
  ariaLabel,
  iconOnly = false
}) => {
  const safeAriaLabel = iconOnly ? ariaLabel : undefined;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={safeAriaLabel}
      className={`ui-btn ui-btn--${variant} ${iconOnly ? 'ui-btn--icon-only' : ''} ${className}`.trim()}
    >
      {children}
    </button>
  );
};
