// components/Layout.tsx — v2 (Patch 3)
// a11y: skip-link, aria-labels, focus-trap em overlay, keyboard nav
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';
import { DISCLAIMER_TEXT, SCHOOL_CONFIG } from '../content/schoolConfig';
import { ThemeToggle } from './ui/ThemeToggle';
import { A11yControls } from './ui/A11yControls';

// ─── Ícones inline (Lucide-style, stroke 1.5px) ──────────────────────────────
// Serão substituídos por imports do Lucide React no Patch 5 (instalação da lib).
// Por ora: SVGs puros, sem dependência externa.

const IconHome: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
);

const IconCompass: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" />
  </svg>
);

const IconMap: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <polygon points="3,6 9,3 15,6 21,3 21,18 15,21 9,18 3,21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);

const IconBook: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const IconSearch: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const IconClose: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

// ─── Tipos e constantes de navegação ─────────────────────────────────────────

interface NavItem {
  readonly label: string;
  readonly path: string;
  readonly ariaLabel: string;
  readonly Icon: React.ComponentType;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Início',
    path: '/',
    ariaLabel: 'Início — Mapa de domínios e acesso rápido',
    Icon: IconHome,
  },
  {
    label: 'Decisor',
    path: '/decisor',
    ariaLabel: 'Decisor — Fluxo guiado de encaminhamento',
    Icon: IconCompass,
  },
  {
    label: 'Rede',
    path: '/rede',
    ariaLabel: 'Rede — Mapa intersetorial de serviços',
    Icon: IconMap,
  },
  {
    label: 'Recursos',
    path: '/recursos',
    ariaLabel: 'Recursos — FAQ, Glossário, Modelos e Simulador',
    Icon: IconBook,
  },
];

// end=true para "/" evita que Início fique ativo em todas as rotas filhas
const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
  `nav-link${isActive ? ' nav-link-active' : ''}`;

// ─── Seletor reutilizável para focus trap ─────────────────────────────────────
const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

// ─── Layout ───────────────────────────────────────────────────────────────────

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);

  // Fechar overlay de busca com Escape
  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [searchOpen]);

  // Focar no primeiro elemento ao abrir overlay
  useEffect(() => {
    if (!searchOpen || !searchBoxRef.current) return;
    const el = searchBoxRef.current.querySelector<HTMLElement>(FOCUSABLE);
    el?.focus();
  }, [searchOpen]);

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <div className="app-shell">

      {/* Pular conteúdo para leitores de tela / navegação por teclado */}
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>

      {/* ── Header ───────────────────────────────────────────────── */}
      <header className="app-header">
        <div className="container header-inner">

          {/* Marca: logo + nome (link para Dashboard) */}
          <Link
            to="/"
            className="brand-link"
            aria-label="Protocolo Bússola — Voltar ao início"
          >
            <img
              src="/assets/logo-escola.png"
              alt="Logo da E.E. Ermelino Matarazzo"
              className="brand-logo"
            />
            <div className="brand-copy">
              {/* Emoji removido — identidade via logomarca e nome */}
              <strong className="brand-title">Protocolo Bússola</strong>
              <span className="brand-subtitle">E.E. Ermelino Matarazzo</span>
            </div>
          </Link>

          {/* Ações do header */}
          <div className="header-actions">

            {/* Busca mobile: ícone visível apenas em telas pequenas */}
            <button
              type="button"
              className="mobile-search-trigger"
              aria-label="Abrir busca"
              aria-expanded={searchOpen}
              aria-controls="mobile-search-overlay"
              onClick={() => setSearchOpen(true)}
            >
              <IconSearch />
            </button>

            {/* Desktop: busca full + navegação (ocultos no mobile via CSS) */}
            <div className="desktop-tools">
              <GlobalSearch />
              <nav className="desktop-nav" aria-label="Navegação principal">
                {NAV_ITEMS.map(({ path, label, ariaLabel, Icon }) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={path === '/'}
                    className={navLinkClass}
                    aria-label={ariaLabel}
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Configurações: acessibilidade + tema (visíveis em ambos os breakpoints) */}
            <div className="header-settings" aria-label="Configurações">
              <A11yControls />
              <ThemeToggle />
            </div>

          </div>
        </div>
      </header>

      {/* ── Overlay de busca mobile ───────────────────────────────── */}
      {searchOpen && (
        <div
          id="mobile-search-overlay"
          className="mobile-search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Busca no Bússola"
          onClick={closeSearch}
        >
          <div
            className="mobile-search-box"
            ref={searchBoxRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-search-header">
              <span className="mobile-search-title">Buscar no Bússola</span>
              <button
                type="button"
                className="mobile-search-close"
                aria-label="Fechar busca"
                onClick={closeSearch}
              >
                <IconClose />
              </button>
            </div>
            {/* GlobalSearch renderizado dentro do overlay — sem props extras */}
            <GlobalSearch />
          </div>
        </div>
      )}

      {/* ── Conteúdo principal ────────────────────────────────────── */}
      <main id="main-content" className="app-main container" tabIndex={-1}>
        <div className="main-content">{children}</div>
      </main>

      {/* ── Bottom nav (mobile only — oculto no desktop via CSS) ───── */}
      <nav className="app-bottom-nav" aria-label="Navegação mobile">
        <ul className="mobile-nav-grid">
          {NAV_ITEMS.map(({ path, label, ariaLabel, Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                className={navLinkClass}
                aria-label={ariaLabel}
              >
                <span className="mobile-nav-icon">
                  <Icon />
                </span>
                <span className="mobile-nav-label">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Footer (desktop only — oculto no mobile via CSS) ─────── */}
      <footer className="app-footer">
        <div className="container footer-copy">
          <p className="footer-disclaimer">{DISCLAIMER_TEXT}</p>
          <p className="footer-meta">
            Sistema institucional de apoio à decisão — E.E. Ermelino Matarazzo
            {SCHOOL_CONFIG.diretoria ? `, ${SCHOOL_CONFIG.diretoria}` : ''}
            {' '}— Versão piloto para uso interno.
          </p>
        </div>
      </footer>

    </div>
  );
};
