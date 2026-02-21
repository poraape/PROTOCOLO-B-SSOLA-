export type FontSizePref = 'sm' | 'md' | 'lg';
export type ContrastPref = 'normal' | 'high';

export type A11yPrefs = {
  font: FontSizePref;
  contrast: ContrastPref;
};

const FONT_KEY = 'bussola-a11y-font';
const CONTRAST_KEY = 'bussola-a11y-contrast';

const isFont = (value: string | null): value is FontSizePref => value === 'sm' || value === 'md' || value === 'lg';
const isContrast = (value: string | null): value is ContrastPref => value === 'normal' || value === 'high';

export const getInitialA11yPrefs = (): A11yPrefs => {
  const savedFont = localStorage.getItem(FONT_KEY);
  const savedContrast = localStorage.getItem(CONTRAST_KEY);

  return {
    font: isFont(savedFont) ? savedFont : 'md',
    contrast: isContrast(savedContrast) ? savedContrast : 'normal'
  };
};

export const applyA11yPrefs = (prefs: A11yPrefs): void => {
  document.documentElement.dataset.font = prefs.font;
  document.documentElement.dataset.contrast = prefs.contrast;
};

export const setFontPref = (font: FontSizePref): void => {
  localStorage.setItem(FONT_KEY, font);
  document.documentElement.dataset.font = font;
};

export const setContrastPref = (contrast: ContrastPref): void => {
  localStorage.setItem(CONTRAST_KEY, contrast);
  document.documentElement.dataset.contrast = contrast;
};
