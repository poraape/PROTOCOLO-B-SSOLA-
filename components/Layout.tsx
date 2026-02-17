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
      <header className="border-b border-gray-100 bg-white">
        <div className="section-container flex items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-3" aria-label="Ir para início">
            <SchoolShield className="h-10 w-10" />
            <div>
              <h1 className="text-sm font-semibold text-gray-900">Protocolo Bússola</h1>
              <p className="text-xs text-gray-500">EE Ermelino Matarazzo</p>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-pill focus-visible:ring-2 focus-visible:ring-brand-500 ${isActive ? 'nav-pill-active' : 'nav-pill-idle'}`
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
