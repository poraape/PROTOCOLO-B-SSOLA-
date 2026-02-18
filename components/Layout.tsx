import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';
import { DISCLAIMER_TEXT, SCHOOL_CONFIG } from '../content/schoolConfig';

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
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo-escola.png"
              alt="Logo EE Ermelino Matarazzo"
              className="h-10 w-auto object-contain"
            />

            <div>
              <div className="text-slate-900 font-semibold">{SCHOOL_CONFIG.appName}</div>
              <div className="text-xs text-slate-500">{SCHOOL_CONFIG.schoolName}</div>
            </div>
          </div>

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
      </header>

      <main className="container-page space-y-4 pb-24 md:pb-8">
        <div className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-900" role="note">
          {DISCLAIMER_TEXT}
        </div>
        {children}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white px-2 py-2 md:hidden">
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

      <footer className="mt-12 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 text-xs text-slate-500 text-center">
          Sistema institucional de apoio à decisão da E.E. Ermelino Matarazzo — Versão piloto validada para uso interno.
        </div>
      </footer>
    </div>
  );
};
