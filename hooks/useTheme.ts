import { useCallback, useEffect, useState } from 'react';
import { getInitialTheme, setTheme as applyTheme, toggleTheme as flipTheme, ThemeMode } from '../services/theme';

export const useTheme = () => {
  const [theme, setThemeState] = useState<ThemeMode>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((nextTheme: ThemeMode) => {
    setThemeState(nextTheme);
    applyTheme(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = flipTheme();
    setThemeState(next);
  }, []);

  return {
    theme,
    setTheme,
    toggleTheme
  };
};
