
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SchoolShield } from '../components/SchoolShield';

type Role = 'professor' | 'gestor' | 'visitante';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('gestor');

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Banner Principal - Status da Unidade */}
      <section className="bg-slate-900 dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
           <svg width="120" height="120" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="16" stroke="white" strokeWidth="1"/>
              <path d="M18 6L21 18L18 22L15 18L18 6Z" fill="white"/>
           </svg>
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="bg-white/10 p-1.5 rounded-xl border border-white/20">
                  <SchoolShield className="w-8 h-8" />
               </div>
               <span className="text-yellow-400 font-black text-[9px] uppercase tracking-[0.3em]">Protocolo Bússola 4.5</span>
            </div>
            <div className="flex bg-white/10 p-1 rounded-xl">
               {(['professor', 'gestor'] as const).map(r => (
                 <button 
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${
                    role === r ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'
                  }`}
                 >
                   {r === 'professor' ? 'Docente' : 'Gestão'}
                 </button>
               ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-white tracking-tighter leading-none">
              O que fazer <span className="text-yellow-400">agora?</span>
            </h2>
            <p className="text-slate-400 font-bold text-xs max-w-xs leading-snug">
              Guia interativo para acolhimento e proteção de crianças e adolescentes.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => navigate('/decisor')}
              className="bg-white text-slate-900 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all"
            >
              Iniciar Triagem 🧭
            </button>
            <button 
              onClick={() => navigate('/fluxos')}
              className="bg-slate-800 text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/10 active:scale-95 transition-all"
            >
              Biblioteca 📚
            </button>
          </div>
        </div>
      </section>

      {/* Grid de Acesso Direto */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => navigate('/fluxos/fluxo-suicidio')}
          className="ios-card p-6 shadow-ios flex flex-col items-center text-center gap-4 border border-red-50 dark:border-red-900/20 group bg-white dark:bg-slate-900"
        >
          <div className="w-16 h-16 bg-[#FF3B30] rounded-[1.5rem] flex items-center justify-center text-3xl shadow-xl shadow-red-500/20 group-hover:scale-110 transition-transform">🚨</div>
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none">Suicídio</h3>
            <p className="text-[10px] text-red-500 font-black uppercase tracking-tighter">Urgência Total</p>
          </div>
        </button>

        <button 
          onClick={() => navigate('/fluxos/fluxo-violencia-sexual')}
          className="ios-card p-6 shadow-ios flex flex-col items-center text-center gap-4 border border-orange-50 dark:border-orange-900/20 group bg-white dark:bg-slate-900"
        >
          <div className="w-16 h-16 bg-orange-500 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-xl shadow-orange-500/20 group-hover:scale-110 transition-transform">⚠️</div>
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none">V. Sexual</h3>
            <p className="text-[10px] text-orange-600 font-black uppercase tracking-tighter">Protocolo K</p>
          </div>
        </button>

        <button 
          onClick={() => navigate('/fluxos/fluxo-automutilacao')}
          className="ios-card p-6 flex flex-col items-center text-center gap-4 border border-slate-50 dark:border-slate-800 shadow-ios bg-white dark:bg-slate-900"
        >
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-[1.5rem] flex items-center justify-center text-3xl">🩹</div>
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none">Autolesão</h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Protocolo C</p>
          </div>
        </button>

        <button 
          onClick={() => navigate('/rede')}
          className="ios-card p-6 flex flex-col items-center text-center gap-4 border border-slate-50 dark:border-slate-800 shadow-ios bg-white dark:bg-slate-900"
        >
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-[1.5rem] flex items-center justify-center text-3xl">📞</div>
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none">Rede de Apoio</h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">UBS / CT / CAPS</p>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button 
          onClick={() => navigate('/recursos')}
          className="ios-card p-4 flex items-center gap-4 border border-slate-50 dark:border-slate-800 shadow-ios bg-white dark:bg-slate-900"
        >
          <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-xl flex items-center justify-center text-xl">📄</div>
          <span className="font-black text-slate-900 dark:text-slate-200 text-[10px] uppercase tracking-widest">Documentos</span>
        </button>
        <button 
          onClick={() => navigate('/editor')}
          className="ios-card p-4 flex items-center gap-4 border border-purple-50 dark:border-purple-900/30 shadow-ios bg-white dark:bg-slate-900"
        >
          <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center text-xl">🎭</div>
          <span className="font-black text-slate-900 dark:text-slate-200 text-[10px] uppercase tracking-widest">Anonimizar</span>
        </button>
      </div>

      {/* Info RACI para Professores */}
      {role === 'professor' && (
        <div className="ios-card bg-blue-600 p-8 border border-blue-700 flex flex-col md:flex-row items-center gap-6 shadow-xl animate-in zoom-in-95">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl">👨‍🏫</div>
          <div>
            <h4 className="font-black text-white mb-1">Dica para Docentes</h4>
            <p className="text-blue-100 text-sm font-bold leading-relaxed">
              O seu papel é de <span className="underline">Acolhimento e Comunicação</span> à gestão escolar. Não é sua responsabilidade investigar o crime ou realizar encaminhamentos à rede externa.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
