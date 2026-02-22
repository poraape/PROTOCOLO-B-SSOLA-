/**
 * BÚSSOLA — Layout principal
 *
 * Mudanças desta versão:
 * - Header: brand-link → '/', sem emoji, sem subtítulo, sem glass-strong
 * - Header: A11yControls + ThemeToggle agrupados em settings-btn
 * - Mobile: SearchFAB (botão flutuante) substitui busca inline no bottom-nav
 * - Mobile: bottom-nav 4 itens diretos, sem "Mais" e sem modal
 * - Footer: estático, simples, sem glass-strong
 * - Ícones Lucide para itens de navegação
 */
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Home,
  Compass,
  MapPin,
  BookOpen,
  Search,
  Settings,
} from 'lucide-react';
import GlobalSearch from './GlobalSearch';
import { SCHOOL_CONFIG } from '../content/schoolConfig';
import { ThemeToggle } from './ui/ThemeToggle';
import { A11yControls } from './ui/A11yControls';

/* ── Itens de navegação (4 apenas) ── */
const NAV_ITEMS = [
  { label: 'Início',    path: '/',         Icon: Home    },
  { label: 'Decisor',   path: '/decisor',  Icon: Compass },
  { label: 'Rede',      path: '/rede',     Icon: MapPin  },
  { label: 'Recursos',  path: '/recursos', Icon: BookOpen },
] as const;

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link${isActive ? ' nav-link-active' : ''}`;

/* ── Componente de busca flutuante (mobile) ── */
const SearchFAB: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="search-fab"
        aria-label="Abrir busca"
        onClick={() => setOpen(true)}
      >
        <Search size={20} strokeWidth={1.75} />
      </button>

      {open && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Busca"
          onClick={() => setOpen(false)}
        >
          <div
            className="modal-dialog"
            style={{ maxWidth: 560 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Buscar no Protocolo</h2>
              <button
                type="button"
                className="modal-close"
                aria-label="Fechar busca"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <GlobalSearch autoFocus onSelect={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ── Agrupador de controles de configuração ── */
const SettingsGroup: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="a11y-wrap" style={{ position: 'relative' }}>
      <button
        type="button"
        className="btn btn--ghost btn--icon-only"
        aria-label="Configurações de acessibilidade e tema"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Settings size={18} strokeWidth={1.75} />
      </button>

      {open && (
        <div className="a11y-popover" role="region" aria-label="Configurações">
          <A11yControls />
          <div style={{ marginTop: 'var(--space-3)', display: 'flex', justifyContent: 'flex-end' }}>
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Layout principal ── */
export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="app-shell">
    {/* Skip link para acessibilidade */}
    <a className="skip-link" href="#main-content">Pular para o conteúdo</a>

    {/* ── Header ── */}
    <header className="app-header">
      <div className="container header-inner">

        {/* Marca */}
        <Link
          to="/"
          aria-label="Protocolo Bússola — página inicial"
          className="brand-link"
        >
          <img
            src="/assets/logo-escola.png"
            alt=""
            aria-hidden="true"
            className="brand-logo"
          />
          <div className="brand-copy">
            <strong className="brand-title">Protocolo Bússola</strong>
          </div>
        </Link>

        {/* Ferramentas desktop */}
        <div className="header-actions">
          <div className="desktop-tools">
            <GlobalSearch />
            <nav className="desktop-nav" aria-label="Navegação principal">
              {NAV_ITEMS.map(({ label, path }) => (
                <NavLink key={path} to={path} className={navLinkClass} end={path === '/'}>
                  {label}
                </NavLink>
              ))}
            </nav>
            <SettingsGroup />
          </div>

          {/* Configurações visíveis em mobile no header */}
          <div className="mobile-only" style={{ display: 'flex', gap: 'var(--space-1)' }}>
            <SettingsGroup />
          </div>
        </div>
      </div>
    </header>

    {/* Busca flutuante (mobile) */}
    <SearchFAB />

    {/* ── Conteúdo principal ── */}
    <main id="main-content" className="app-main container" tabIndex={-1}>
      <div className="main-content">{children}</div>
    </main>

    {/* ── Bottom nav (mobile) ── */}
    <nav className="app-bottom-nav" aria-label="Navegação mobile">
      <ul className="mobile-nav-grid" role="list">
        {NAV_ITEMS.map(({ label, path, Icon }) => (
          <li key={path} className="mobile-nav-item">
            <NavLink
              to={path}
              end={path === '/'}
              className={navLinkClass}
              aria-label={label}
            >
              <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
              <span style={{ fontSize: 'var(--text-caption)', lineHeight: 1 }}>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>

    {/* ── Footer (desktop apenas) ── */}
    <footer className="app-footer">
      <div className="container footer-copy">
        <p className="footer-line footer-school">{SCHOOL_CONFIG.name}</p>
        <p className="footer-line">Protocolo Bússola — Sistema institucional de apoio à decisão</p>
        <p className="footer-line">Versão piloto · Uso interno · {new Date().getFullYear()}</p>
      </div>
    </footer>
  </div>
);

export default Layout;
