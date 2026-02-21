import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';
import { DISCLAIMER_TEXT, SCHOOL_CONFIG } from '../content/schoolConfig';
import { ThemeToggle } from './ui/ThemeToggle';

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

const navPillClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3 py-2 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-brand-500 ${
    isActive ? 'bg-brand-50 text-brand-800' : 'text-muted hover:bg-slate-100 hover:text-text'
  }`;

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-slate-200" style={{ background: "var(--surface-strong)", backdropFilter: "blur(var(--glass-blur))" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/decisor"
            aria-label="Voltar para a tela inicial do Protocolo Bússola"
            className="inline-flex items-center gap-2 rounded-md px-1 py-1 sm:gap-3 hover:bg-slate-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <img
              src="/assets/logo-escola.png"
              alt="Logo EE Ermelino Matarazzo"
              className="h-8 w-8 object-contain sm:h-9 sm:w-9"
            />

            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold sm:text-base" style={{ color: "var(--text)" }}>{SCHOOL_CONFIG.appName}</span>
              <span className="text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>{SCHOOL_CONFIG.schoolName}</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden md:flex items-center gap-3">
              <GlobalSearch />
              <nav className="flex gap-2">
              {navItems.map((item) => (
                <NavLink key={item.path} to={item.path} className={navPillClass}>
                  {item.label}
                </NavLink>
              ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="container-page space-y-4 pb-24 md:pb-8">
        <div className="rounded-xl px-4 py-3 text-sm" style={{ border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)" }} role="note">
          {DISCLAIMER_TEXT}
        </div>
        {children}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border px-2 py-2 md:hidden" style={{ background: "var(--surface-strong)", backdropFilter: "blur(var(--glass-blur))" }}>
        <div className="mb-2 px-1">
          <GlobalSearch />
        </div>
        <ul className="grid grid-cols-5 gap-1">
          {mobilePrimaryItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} className={navPillClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <button type="button" onClick={() => setShowMore(true)} className="w-full rounded-full px-3 py-2 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-brand-500 text-muted hover:bg-slate-100 hover:text-text">
              Mais
            </button>
          </li>
        </ul>
      </nav>



      {showMore ? (
        <div className="fixed inset-0 z-[60] bg-black/40 px-4 py-10 md:hidden" onClick={() => setShowMore(false)}>
          <div className="mx-auto max-w-sm rounded-2xl border border-slate-200 bg-white p-4" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Mais opções</h3>
              <button type="button" className="btn-secondary px-3 py-1 text-xs" onClick={() => setShowMore(false)}>Fechar</button>
            </div>
            <div className="grid gap-2">
              {mobileMoreItems.map((item) => (
                <NavLink key={item.path} to={item.path} className={navPillClass} onClick={() => setShowMore(false)}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <footer className="mt-12 border-t border-slate-200" style={{ background: "var(--surface-strong)" }}>
        <div className="max-w-6xl mx-auto px-6 py-6 text-xs text-center" style={{ color: "var(--text-muted)" }}>
          Sistema institucional de apoio à decisão da E.E. Ermelino Matarazzo — Versão piloto validada para uso interno.
        </div>
      </footer>
    </div>
  );
};
