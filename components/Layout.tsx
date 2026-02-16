import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SchoolShield } from './SchoolShield';

type ThemeMode = 'light' | 'dark';

const getInitialTheme = (): ThemeMode => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const navItems = [
  { label: 'Início', path: '/', icon: '🏠' },
  { label: 'Atendimento', path: '/decisor', icon: '🧭' },
  { label: 'Rede', path: '/rede', icon: '📞' },
  { label: 'Recursos', path: '/recursos', icon: '📄' },
  { label: 'Sobre', path: '/sobre', icon: 'ℹ️' }
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const themeLabel = useMemo(() => (theme === 'dark' ? 'Tema claro' : 'Tema escuro'), [theme]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-50 border-b border-sky-100/80 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <NavLink to="/" className="flex items-center gap-3" aria-label="Ir para início">
            <SchoolShield className="h-10 w-10" />
            <div className="leading-tight">
              <p className="text-sm font-black uppercase tracking-wide text-sky-700 dark:text-sky-300">Protocolo Bússola</p>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">E.E. Ermelino Matarazzo</p>
            </div>
          </NavLink>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              aria-label={themeLabel}
              title={themeLabel}
            >
              {theme === 'dark' ? '☀️ Claro' : '🌙 Escuro'}
            </button>
          </div>
        </div>

        <nav className="mx-auto hidden max-w-6xl items-center gap-2 px-4 pb-3 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                  isActive
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-5 pb-24 md:pb-8">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-sky-100 bg-white/95 px-2 pb-[calc(env(safe-area-inset-bottom)+0.4rem)] pt-2 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 md:hidden">
        <ul className="grid grid-cols-5 gap-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center rounded-xl px-1 py-2 text-[10px] font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                    isActive
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`
                }
              >
                <span className="text-base leading-none">{item.icon}</span>
                <span className="mt-1 leading-none">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
