import React from 'react';

type ActionButtonVariant = 'danger' | 'neutral' | 'ghost' | 'info';

type ActionButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: ActionButtonVariant;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

const variantStyle: Record<ActionButtonVariant, React.CSSProperties> = {
  danger: { background: 'var(--danger)', color: '#fff', border: '1px solid var(--danger)' },
  neutral: { background: 'var(--text)', color: '#fff', border: '1px solid var(--text)' },
  ghost: { background: 'transparent', color: 'var(--text)', border: '1px solid rgba(20,32,51,0.2)' },
  info: { background: 'var(--info)', color: '#fff', border: '1px solid var(--info)' }
};

export const ActionButton: React.FC<ActionButtonProps> = ({ children, onClick, type = 'button', variant = 'neutral', className = '', disabled, ariaLabel }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={className}
    aria-label={ariaLabel}
    style={{
      ...variantStyle[variant],
      width: '100%',
      minHeight: '56px',
      borderRadius: '15px',
      padding: '14px 16px',
      fontWeight: 700,
      fontSize: '1rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: '0 6px 16px rgba(15, 23, 42, 0.18)',
      transform: 'translateY(0)',
      transition: 'all .2s ease',
      opacity: disabled ? 0.65 : 1
    }}
  >
    {children}
  </button>
);
