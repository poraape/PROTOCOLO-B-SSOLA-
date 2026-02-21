import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';
import { DISCLAIMER_TEXT, SCHOOL_CONFIG } from '../content/schoolConfig';
import { ThemeToggle } from './ui/ThemeToggle';
import { AppCard } from './ui/AppCard';
import { AppButton } from './ui/AppButton';

const navItems = [
  { label: 'Início', path: '/' },
  { label: 'Decisor', path: '/decisor' },
  { label: 'Rede', path: '/rede' },
  { label: 'Glossário', path: '/glossario' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Simulador', path: '/simulador' },
  { label: 'Versão', path: '/versao' }
];

const mobilePrimaryItems = [
  { label: 'Início', path: '/' },
  { label: 'Decisor', path: '/decisor' },
  { label: 'Rede', path: '/rede' },
  { label: 'Versão', path: '/versao' }
];

const mobileMoreItems = [
  { label: 'Glossário', path: '/glossario' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Simulador', path: '/simulador' }
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link ${isActive ? 'nav-link-active' : ''}`.trim();

const DisclaimerBanner: React.FC = () => (
  <AppCard as="aside" className="disclaimer-banner" role="note" aria-label="Aviso institucional">
    <div className="disclaimer-icon" aria-hidden="true">⚠️</div>
    <p className="disclaimer-text">{DISCLAIMER_TEXT}</p>
  </AppCard>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showMore, setShowMore] = useState(false);
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
      <header className="app-header glass-strong">
        <div className="container header-inner">
          <Link to="/decisor" aria-label="Voltar para a tela inicial do Protocolo Bússola" className="brand-link">
            <img src="/assets/logo-escola.png" alt="Logo da E.E. Ermelino Matarazzo" className="brand-logo" />
            <div className="brand-copy">
              <strong className="brand-title">Protocolo Bússola <span aria-hidden="true">🧭</span></strong>
              <span className="brand-subtitle">E.E. Ermelino Matarazzo — {SCHOOL_CONFIG.diretoria}</span>
            </div>
          </Link>

          <div className="header-actions">
            <ThemeToggle />
            <div className="desktop-tools">
              <GlobalSearch />
              <nav className="desktop-nav" aria-label="Navegação principal">
                {navItems.map((item) => (
                  <NavLink key={item.path} to={item.path} className={navLinkClass}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main container">
        <DisclaimerBanner />
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

      <footer className="app-footer glass-strong">
        <div className="container footer-copy">
          Sistema institucional de apoio à decisão da E.E. Ermelino Matarazzo — Versão piloto validada para uso interno.
        </div>
      </footer>
    </div>
  );
};
