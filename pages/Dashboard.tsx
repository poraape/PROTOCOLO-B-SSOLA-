
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SchoolShield } from '../components/SchoolShield';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <section className="bg-slate-900 dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
           <svg width="120" height="120" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="16" stroke="white" strokeWidth="1"/>
              <path d="M18 6L21 18L18 22L15 18L18 6Z" fill="white"/>
           </svg>
        </div>
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
             <div className="bg-white/10 p-1.5 rounded-xl border border-white/20">
                <SchoolShield className="w-8 h-8" />
             </div>
             <span className="text-yellow-400 font-black text-[10px] uppercase tracking-[0.3em]">Protocolo Institucional</span>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter leading-none">
            BÚSSOLA
          </h2>
          <p className="text-slate-400 font-medium max-w-xs leading-snug">
            Sistema Inteligente de Orientação e Acolhimento para a Comunidade Escolar.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={() => navigate('/decisor')}
          className="ios-card p-8 shadow-ios flex flex-col items-start text-left gap-6 border border-slate-50 dark:border-slate-800 group bg-white dark:bg-slate-900"
        >
          <div className="w-16 h-16 bg-slate-900 dark:bg-slate-800 rounded-[1.5rem] flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform shadow-lg">🧭</div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none mb-2">Decisor de Risco</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-snug">Ajuda interativa para classificar a demanda e definir a urgência.</p>
          </div>
        </button>

        <button 
          onClick={() => navigate('/fluxos/violencia')}
          className="ios-card p-8 shadow-ios flex flex-col items-start text-left gap-6 border border-red-50 dark:border-red-900/20 group bg-white dark:bg-slate-900"
        >
          <div className="w-16 h-16 bg-[#FF3B30] rounded-[1.5rem] flex items-center justify-center text-3xl shadow-xl shadow-red-500/20 group-hover:scale-110 transition-transform">⚠️</div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none">Alerta Vermelho</h3>
              <span className="bg-red-500 text-white text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">Prioridade</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-snug">Fluxo direto para casos de violência, abuso ou risco de vida.</p>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          onClick={() => navigate('/fluxos')}
          className="ios-card p-6 flex flex-col items-center gap-3 border border-slate-50 dark:border-slate-800 shadow-ios bg-white dark:bg-slate-900"
        >
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-2xl">📋</div>
          <span className="font-black text-slate-900 dark:text-slate-200 text-[10px] uppercase tracking-widest">Fluxogramas</span>
        </button>
        <button 
          onClick={() => navigate('/rede')}
          className="ios-card p-6 flex flex-col items-center gap-3 border border-slate-50 dark:border-slate-800 shadow-ios bg-white dark:bg-slate-900"
        >
          <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center text-2xl">📞</div>
          <span className="font-black text-slate-900 dark:text-slate-200 text-[10px] uppercase tracking-widest">Rede Apoio</span>
        </button>
        <button 
          onClick={() => navigate('/recursos')}
          className="ios-card p-6 flex flex-col items-center gap-3 border border-slate-50 dark:border-slate-800 shadow-ios bg-white dark:bg-slate-900"
        >
          <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center text-2xl">📄</div>
          <span className="font-black text-slate-900 dark:text-slate-200 text-[10px] uppercase tracking-widest">Documentos</span>
        </button>
        <button 
          onClick={() => navigate('/editor')}
          className="ios-card p-6 flex flex-col items-center gap-3 border border-purple-50 dark:border-purple-900/30 shadow-ios bg-white dark:bg-slate-900 ring-2 ring-purple-100 dark:ring-purple-900/20"
        >
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center text-2xl">🎭</div>
          <span className="font-black text-slate-900 dark:text-slate-200 text-[10px] uppercase tracking-widest">Privacidade</span>
        </button>
      </div>

      <div className="ios-card bg-yellow-400 p-8 border border-yellow-500 flex flex-col md:flex-row items-center gap-6 shadow-xl">
        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shrink-0 overflow-hidden p-2">
           <SchoolShield className="w-full h-full" />
        </div>
        <div>
          <h4 className="font-black text-slate-900 mb-1">Proteção e Sigilo</h4>
          <p className="text-slate-800 text-sm font-semibold leading-relaxed">
            Este sistema é exclusivo para uso interno da equipe escolar da E.E. Ermelino Matarazzo. O compartilhamento de dados de alunos por vias não oficiais é proibido.
          </p>
        </div>
      </div>
    </div>
  );
};
