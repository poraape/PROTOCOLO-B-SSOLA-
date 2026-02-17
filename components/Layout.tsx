import React from 'react';
import { NavLink } from 'react-router-dom';
import { SchoolShield } from './SchoolShield';

const navItems = [
  { label: 'Início', path: '/' },
  { label: 'Decisor', path: '/decisor' },
  { label: 'Rede', path: '/rede' },
  { label: 'Recursos', path: '/recursos' },
  { label: 'Versão', path: '/sobre' }
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="sticky top-0 z-50 border-b border-border bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
          <NavLink to="/" className="flex items-center gap-3" aria-label="Ir para início">
            <SchoolShield className="h-8 w-8" />
            <div className="leading-tight">
              <p className="text-sm font-extrabold text-brand-900">Protocolo Bússola</p>
              <p className="text-[11px] font-semibold text-muted">EE Ermelino Matarazzo</p>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-brand-500 ${
                    isActive ? 'bg-brand-50 text-brand-800' : 'text-muted hover:bg-slate-100 hover:text-text'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container-page pb-24 md:pb-8">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white px-2 py-2 md:hidden">
        <ul className="grid grid-cols-5 gap-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-center rounded-xl px-1 py-2 text-[11px] font-semibold focus-visible:ring-2 focus-visible:ring-brand-500 ${
                    isActive ? 'bg-brand-50 text-brand-800' : 'text-muted hover:bg-slate-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
