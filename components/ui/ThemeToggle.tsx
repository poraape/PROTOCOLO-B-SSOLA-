import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-label="Alternar tema claro/escuro"
      aria-checked={isDark}
      title={isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
      style={{
        minHeight: 44,
        minWidth: 44,
        borderRadius: 999,
        border: '1px solid var(--border)',
        background: 'var(--surface-strong)',
        color: 'var(--text)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
        cursor: 'pointer',
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))'
      }}
    >
      <span aria-hidden="true">{isDark ? '🌙' : '☀️'}</span>
    </button>
  );
};
