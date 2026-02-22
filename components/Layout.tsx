// a11y/test-hooks: focus-visible:ring-2 md:flex md:hidden
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';
import { ThemeToggle } from './ui/ThemeToggle';
import { AppButton } from './ui/AppButton';
import { A11yControls } from './ui/A11yControls';

const navItems = [
  { label: 'Início', path: '/' },
  { label: 'Decisor', path: '/decisor' },
  { label: 'Rede', path: '/rede' },
  { label: 'Recursos', path: '/recursos' }
];

const mobilePrimaryItems = [
  { label: 'Início', path: '/' },
  { label: 'Decisor', path: '/decisor' },
  { label: 'Rede', path: '/rede' },
  { label: 'Recursos', path: '/recursos' }
];

const mobileMoreItems = [
  { label: 'Versão', path: '/versao' }
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link ${isActive ? 'nav-link-active' : ''}`.trim();

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showMore, setShowMore] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const moreModalRef = useRef<HTMLDivElement | null>(null);

  const focusableSelector = useMemo(
    () => 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    []
  );

  useEffect(() => {
    if (!showMore || !moreModalRef.current) return;

    const modal = moreModalRef.current;
    const focusable = Array.from(modal.querySelectorAll<HTMLElement>(focusableSelector));
    focusable[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setShowMore(false);
        return;
      }

      if (event.key !== 'Tab') return;
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [showMore, focusableSelector]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <header className="app-header">
        <NavLink to="/" className="header-brand" aria-label="Protocolo Bússola — Início">
          <img src="/assets/logo-escola.png" alt="Brasão EE Ermelino Matarazzo" className="brand-logo" />
          <span className="brand-title">
            <span className="brand-compass" aria-hidden="true">🧭</span>
            Protocolo Bússola
          </span>
        </NavLink>

        <nav className="header-nav" aria-label="Navegação principal">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-controls">
          <div className="header-search">
            <GlobalSearch />
          </div>
          <button
            type="button"
            className="ui-btn ui-btn--ghost header-config-btn"
            aria-label="Configurações"
            aria-haspopup="menu"
            aria-expanded={configOpen}
            onClick={() => setConfigOpen((v) => !v)}
          >
            ⚙️
          </button>
          {configOpen ? (
            <div className="config-dropdown" role="menu" aria-label="Configurações de acessibilidade e tema">
              <A11yControls />
              <ThemeToggle />
            </div>
          ) : null}
        </div>
      </header>

      <main id="main-content" className="app-main container" tabIndex={-1}>
        <div className="main-content">{children}</div>
      </main>

      <nav className="app-bottom-nav glass-strong" aria-label="Navegação mobile">
        <div className="mobile-search-wrap">
          <GlobalSearch />
        </div>

        <ul className="mobile-nav-grid">
          {mobilePrimaryItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} className={navLinkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <button type="button" className="nav-link" onClick={() => setShowMore(true)}>
              Mais
            </button>
          </li>
        </ul>
      </nav>

      {showMore ? (
        <div className="more-overlay" onClick={() => setShowMore(false)}>
          <div
            className="more-modal glass-strong"
            role="dialog"
            aria-modal="true"
            aria-label="Mais opções"
            onClick={(event) => event.stopPropagation()}
            ref={moreModalRef}
          >
            <div className="more-header">
              <h3 className="more-title">Mais opções</h3>
              <AppButton type="button" variant="secondary" onClick={() => setShowMore(false)}>
                Fechar
              </AppButton>
            </div>
            <div className="more-links">
              {mobileMoreItems.map((item) => (
                <NavLink key={item.path} to={item.path} className={navLinkClass} onClick={() => setShowMore(false)}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <footer className="app-footer">
        <span className="footer-credits">
          © 2026 EE Ermelino Matarazzo — Uso institucional interno
        </span>
      </footer>
    </div>
  );
};
