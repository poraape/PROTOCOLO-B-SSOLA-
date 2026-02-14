
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SchoolShield } from './SchoolShield';

const BussolaLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" className="stroke-slate-800 dark:stroke-slate-200" strokeWidth="2.5"/>
    <circle cx="20" cy="20" r="14.5" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="2 2"/>
    <rect x="19.5" y="4" width="1" height="4" rx="0.5" className="fill-slate-800 dark:fill-slate-200"/>
    <rect x="19.5" y="32" width="1" height="4" rx="0.5" className="fill-slate-400 dark:fill-slate-600"/>
    <rect x="4" y="19.5" width="4" height="1" rx="0.5" className="fill-slate-400 dark:fill-slate-600"/>
    <rect x="32" y="19.5" width="4" height="1" rx="0.5" className="fill-slate-400 dark:fill-slate-600"/>
    <path d="M20 8L24 20H16L20 8Z" className="fill-slate-800 dark:fill-slate-200"/>
    <path d="M20 32L16 20H24L20 32Z" className="fill-slate-300 dark:fill-slate-700"/>
    <path 
      d="M20 23.5C20 23.5 16 21.5 16 19C16 17.5 17.2 16.5 18.5 16.5C19.2 16.5 19.7 16.8 20 17.3C20.3 16.8 20.8 16.5 21.5 16.5C22.8 16.5 24 17.5 24 19C24 21.5 20 23.5 20 23.5Z" 
      fill="#FACC15" 
      className="stroke-slate-800 dark:stroke-slate-900"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      setTheme(currentTheme);
    };

    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    // @ts-ignore - Função definida no index.html
    if (window.applyTheme) {
      // @ts-ignore
      window.applyTheme(nextTheme);
    } else {
      // Fallback
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', nextTheme);
      setTheme(nextTheme);
    }
  };

  return (
    <button 
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all hover:scale-110 active:scale-95 border border-slate-200 dark:border-slate-700"
      aria-label="Alternar tema de cores"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Início', path: '/', icon: '🏠' },
    { label: 'Busca', path: '/busca', icon: '🔍' },
    { label: 'Decisor', path: '/decisor', icon: '🧭' },
    { label: 'Fluxos', path: '/fluxos', icon: '📋' },
    { label: 'Rede', path: '/rede', icon: '📞' },
  ];

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 dark:bg-slate-950">
      <header className="fixed top-0 left-0 right-0 h-16 md:h-20 glass flex items-center px-4 md:px-12 z-[100]">
        <div className="flex items-center gap-3" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <BussolaLogo />
          <div>
            <h1 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">BÚSSOLA</h1>
            <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] leading-none mt-1">Guia de Acolhimento</p>
          </div>
        </div>
        
        <nav className="hidden md:flex ml-auto gap-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
                location.pathname === item.path 
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4 h-10">
           <ThemeToggle />
           <div className="text-right hidden sm:block">
              <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Unidade Escolar</p>
              <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200 leading-none mt-1">E.E. Ermelino Matarazzo</p>
           </div>
           <SchoolShield className="w-10 h-10 drop-shadow-sm" />
        </div>
      </header>

      <main className="flex-1 pb-32 pt-20 md:pt-32 px-4 max-w-5xl mx-auto w-full">
        {children}
      </main>

      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] z-50">
        <nav className="glass rounded-[2.5rem] h-20 flex items-center justify-around px-2 shadow-2xl border border-white/60 dark:border-slate-700/50">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center w-14 transition-all duration-300"
              >
                <span className={`text-xl transition-all duration-300 ${isActive ? 'scale-110 -translate-y-1' : 'opacity-40 grayscale'}`}>
                  {item.icon}
                </span>
                <span className={`text-[9px] font-black mt-1 uppercase tracking-tighter ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-600'}`}>
                  {isActive ? item.label : ''}
                </span>
                {isActive && (
                  <div className="absolute bottom-2 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
