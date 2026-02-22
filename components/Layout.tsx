import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BussolaLogo } from './BussolaLogo';
import { SchoolShield } from './SchoolShield';
import '../styles/layout.css';

const NAV_ITEMS = [
  { label: 'Início', path: '/', icon: '🏠' },
  { label: 'Decisor', path: '/decisor', icon: '🧭' },
  { label: 'Rede', path: '/rede', icon: '📞' },
  { label: 'Recursos', path: '/recursos', icon: '📋' },
  { label: 'Busca', path: '/busca', icon: '🔍' }
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });
  const [a11yOpen, setA11yOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'md' | 'lg' | 'xl'>('md');
  const [highContrast, setHighContrast] = useState(false);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  const applyA11ySettings = (size: 'md' | 'lg' | 'xl', contrast: boolean) => {
    setFontSize(size);
    setHighContrast(contrast);
    document.documentElement.setAttribute('data-font', size);
    document.documentElement.setAttribute('data-contrast', contrast ? 'high' : 'normal');
    localStorage.setItem('font-size', size);
    localStorage.setItem('high-contrast', contrast ? 'true' : 'false');
  };

  // Restaura preferências ao montar
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    const savedFont = ((localStorage.getItem('font-size') as 'md' | 'lg' | 'xl') || 'md');
    const savedContrast = localStorage.getItem('high-contrast') === 'true';
    applyA11ySettings(savedFont, savedContrast);
  }, []);

  return (
    <div
      className="app-shell"
      data-theme={theme}
      data-font={fontSize}
      data-contrast={highContrast ? 'high' : 'normal'}
    >
      {/* ── HEADER ──────────────────────────────────── */}
      <header className="app-header glass">
        <div className="header-inner">
          {/* Esquerda: logo + nome */}
          <button className="brand-btn" onClick={() => navigate('/')} aria-label="Ir para o início" type="button">
            <BussolaLogo size={34} />
            <div className="brand-text">
              <span className="brand-name">Bússola</span>
              <span className="brand-sub">Guia de Acolhimento</span>
            </div>
          </button>

          {/* Centro: nav desktop */}
          <nav className="header-nav" aria-label="Navegação principal">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`nav-pill ${location.pathname === item.path ? 'nav-pill--active' : ''}`}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Direita: escola + controles */}
          <div className="header-right">
            <div className="school-info">
              <span className="school-label">UNIDADE ESCOLAR</span>
              <span className="school-name">E.E. Ermelino Matarazzo</span>
            </div>
            <SchoolShield className="school-shield" variant="compact" />

            {/* Controles de tema e acessibilidade */}
            <div className="header-controls">
              <button
                onClick={toggleTheme}
                className="control-btn"
                aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
                type="button"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <button
                onClick={() => setA11yOpen(!a11yOpen)}
                className="control-btn"
                aria-label="Opções de acessibilidade"
                aria-expanded={a11yOpen}
                type="button"
              >
                ⚙️
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── PAINEL DE ACESSIBILIDADE ───────────────── */}
      {a11yOpen ? (
        <div className="a11y-panel glass" role="dialog" aria-label="Configurações de acessibilidade">
          <div className="a11y-panel-header">
            <h3 className="a11y-panel-title">Acessibilidade</h3>
            <button
              onClick={() => setA11yOpen(false)}
              className="a11y-panel-close"
              aria-label="Fechar painel"
              type="button"
            >
              ✕
            </button>
          </div>

          <div className="a11y-section">
            <span className="a11y-label">Tamanho do texto</span>
            <div className="a11y-buttons">
              {(['md', 'lg', 'xl'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => applyA11ySettings(size, highContrast)}
                  className={`a11y-btn ${fontSize === size ? 'a11y-btn--active' : ''}`}
                  type="button"
                >
                  A{size === 'md' ? '' : size === 'lg' ? '+' : '++'}
                </button>
              ))}
            </div>
          </div>

          <div className="a11y-section">
            <label className="a11y-checkbox">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(event) => applyA11ySettings(fontSize, event.target.checked)}
              />
              <span>Alto contraste</span>
            </label>
          </div>
        </div>
      ) : null}

      {/* ── CONTEÚDO ─────────────────────────────────── */}
      <main className="app-main">
        {children}
      </main>

      {/* ── BOTTOM NAV (pílula flutuante — mobile) ───── */}
      <div className="bottom-nav-wrapper" role="navigation" aria-label="Navegação mobile">
        <nav className="bottom-nav-pill glass">
          {NAV_ITEMS.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path));

            return (
              <button
                key={item.path}
                className={`bnav-item ${isActive ? 'bnav-item--active' : ''}`}
                onClick={() => navigate(item.path)}
                aria-current={isActive ? 'page' : undefined}
                type="button"
              >
                <span className="bnav-icon">{item.icon}</span>
                {isActive ? (
                  <>
                    <span className="bnav-label">{item.label}</span>
                    <span className="bnav-dot" aria-hidden="true" />
                  </>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer discreto — apenas desktop */}
      <footer className="app-footer">
        © 2026 EE Ermelino Matarazzo — Uso institucional interno
      </footer>
    </div>
  );
};
