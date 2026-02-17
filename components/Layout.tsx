import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Início', path: '/' },
  { label: 'Decisor', path: '/decisor' },
  { label: 'Rede', path: '/rede' },
  { label: 'Recursos', path: '/recursos' },
  { label: 'Versão', path: '/versao' }
];

const navPillClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3 py-2 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-brand-500 ${
    isActive ? 'bg-brand-50 text-brand-800' : 'text-muted hover:bg-slate-100 hover:text-text'
  }`;

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
              <div className="text-slate-900 font-semibold">Protocolo Bússola</div>
              <div className="text-xs text-slate-500">EE Ermelino Matarazzo</div>
            </div>
          </div>

          <nav className="hidden md:flex gap-2">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={navPillClass}>
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
              <NavLink to={item.path} className={navPillClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <footer className="mt-12 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 text-xs text-slate-500 text-center">
          Ferramenta interna de apoio à decisão.
          Baseada no Protocolo Oficial (Fev/2026).
          Uso institucional — EE Ermelino Matarazzo.
        </div>
      </footer>
    </div>
  );
};
