export type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'bussola-theme';

const isThemeMode = (value: string | null): value is ThemeMode => value === 'light' || value === 'dark';

export const getInitialTheme = (): ThemeMode => {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (isThemeMode(saved)) return saved;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const setTheme = (theme: ThemeMode): void => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

export const toggleTheme = (): ThemeMode => {
  const current = (document.documentElement.dataset.theme as ThemeMode | undefined) ?? getInitialTheme();
  const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
};
