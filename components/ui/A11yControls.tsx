import React from 'react';
import { A11yPrefs, ContrastPref, FontSizePref, getInitialA11yPrefs, setContrastPref, setFontPref } from '../../services/a11yPrefs';

export const A11yControls: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [prefs, setPrefs] = React.useState<A11yPrefs>(() => getInitialA11yPrefs());
  const wrapRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(event.target as Node)) setIsOpen(false);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const handleFont = (font: FontSizePref) => {
    setFontPref(font);
    setPrefs((prev) => ({ ...prev, font }));
  };

  const handleContrast = (contrast: ContrastPref) => {
    setContrastPref(contrast);
    setPrefs((prev) => ({ ...prev, contrast }));
  };

  return (
    <div className="a11y-wrap" ref={wrapRef}>
      <button
        type="button"
        className="a11y-trigger"
        aria-label="Abrir preferências de acessibilidade"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
      >
        ♿
      </button>

      {isOpen ? (
        <div className="a11y-popover glass-strong" role="dialog" aria-label="Preferências de acessibilidade">
          <div className="a11y-group">
            <p className="a11y-label">Fonte</p>
            <div className="a11y-row">
              <button type="button" className={`a11y-option ${prefs.font === 'sm' ? 'a11y-option--active' : ''}`} onClick={() => handleFont('sm')}>Pequena</button>
              <button type="button" className={`a11y-option ${prefs.font === 'md' ? 'a11y-option--active' : ''}`} onClick={() => handleFont('md')}>Padrão</button>
              <button type="button" className={`a11y-option ${prefs.font === 'lg' ? 'a11y-option--active' : ''}`} onClick={() => handleFont('lg')}>Grande</button>
            </div>
          </div>

          <div className="a11y-group">
            <p className="a11y-label">Contraste</p>
            <div className="a11y-row">
              <button type="button" className={`a11y-option ${prefs.contrast === 'normal' ? 'a11y-option--active' : ''}`} onClick={() => handleContrast('normal')}>Normal</button>
              <button type="button" className={`a11y-option ${prefs.contrast === 'high' ? 'a11y-option--active' : ''}`} onClick={() => handleContrast('high')}>Alto</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
