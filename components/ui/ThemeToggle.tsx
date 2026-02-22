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
      className="ui-btn ui-btn--ghost theme-toggle-btn"
    >
      <span aria-hidden="true">{isDark ? '🌙' : '☀️'}</span>
    </button>
  );
};
