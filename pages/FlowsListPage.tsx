
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FLUXOS } from '../data';

type CategoriaFluxo = 'todos' | 'saude' | 'violencia' | 'social' | 'pedagogico';

export const FlowsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [categoria, setCategoria] = useState<CategoriaFluxo>('todos');

  const fluxosArray = Object.values(FLUXOS);

  const filteredFluxos = useMemo(() => {
    return fluxosArray.filter(f => {
      const matchesSearch = f.titulo.toLowerCase().includes(search.toLowerCase()) || 
                           f.descricao.toLowerCase().includes(search.toLowerCase()) ||
                           f.convivaFields.some(field => field.toLowerCase().includes(search.toLowerCase()));
      
      const matchesCat = categoria === 'todos' || 
                        (categoria === 'saude' && (f.id.includes('saude') || f.id.includes('suicidio') || f.id.includes('automu'))) ||
                        (categoria === 'violencia' && f.id.includes('violencia')) ||
                        (categoria === 'pedagogico' && f.id.includes('pedagogico'));
      
      return matchesSearch && matchesCat;
    });
  }, [search, categoria]);

  const categorias = [
    { id: 'todos', label: 'Todos', icon: '📚' },
    { id: 'saude', label: 'Saúde Mental', icon: '🧠' },
    { id: 'violencia', label: 'Violência', icon: '⚠️' },
    { id: 'pedagogico', label: 'Pedagógico', icon: '🎓' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      <header className="px-2 space-y-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Biblioteca de Protocolos</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-bold uppercase tracking-widest text-[10px]">Referência Técnica A-P (v4.5)</p>
        </div>

        {/* Busca por Sintoma */}
        <div className="relative group">
          <input 
            type="text"
            placeholder="O que você está observando? (Ex: cortes, choro, faltas...)"
            className="w-full p-5 pl-14 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-ios focus:ring-4 focus:ring-[#007AFF]/20 outline-none transition-all font-medium text-slate-800 dark:text-slate-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-2xl">🔍</span>
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">✕</button>
          )}
        </div>

        {/* Chips de Categoria */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoria(cat.id as any)}
              className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 border transition-all whitespace-nowrap ${
                categoria === cat.id 
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xl translate-y-[-2px]' 
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* Grid de Fluxos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
        {filteredFluxos.length > 0 ? filteredFluxos.map(f => (
          <div 
            key={f.id}
            onClick={() => navigate(`/fluxos/${f.id}`)}
            className="ios-card bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-ios p-6 flex flex-col justify-between group cursor-pointer active:scale-95 transition-all overflow-hidden relative"
          >
            {/* Status do Risco Lateral */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
              f.risco === 'urgencia' ? 'bg-red-500' : f.risco === 'alto' ? 'bg-orange-500' : 'bg-green-500'
            }`} />

            <div className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 block uppercase tracking-widest">Protocolo {f.codigo}</span>
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${
                    f.risco === 'urgencia' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'
                  }`}>Risco {f.risco}</span>
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-[#007AFF] transition-colors">{f.titulo}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-relaxed">{f.descricao}</p>
            </div>

            <div className="space-y-4">
              {/* Linha do Tempo Simplificada das 7 Fases */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5, 6, 7].map(step => (
                  <div key={step} className={`h-1 flex-1 rounded-full ${step <= 3 ? (f.risco === 'urgencia' ? 'bg-red-500' : 'bg-[#007AFF]') : 'bg-slate-100 dark:bg-slate-800'}`} />
                ))}
              </div>
              <div className="flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <span>Início</span>
                <span>Fase 4: Acionamento</span>
                <span>Encerramento</span>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {f.convivaFields.slice(0, 2).map((field, i) => (
                  <span key={i} className="bg-slate-50 dark:bg-slate-800 text-slate-400 text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">
                    {field}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
             <span className="text-5xl block mb-4 opacity-20">📭</span>
             <h4 className="font-black text-slate-400 uppercase tracking-widest text-xs">Nenhum protocolo corresponde à busca</h4>
             <p className="text-slate-300 text-xs mt-2">Tente palavras mais genéricas ou navegue pelas categorias.</p>
          </div>
        )}
      </div>

      {/* Glossário e RACI Banner */}
      <div className="mx-2 p-8 bg-slate-900 dark:bg-slate-800 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <span className="text-8xl">📑</span>
        </div>
        <div className="relative z-10 space-y-4">
           <h4 className="text-yellow-400 font-black text-[10px] uppercase tracking-widest">Matriz de Responsabilidade (RACI)</h4>
           <p className="text-slate-400 text-[11px] font-bold leading-relaxed max-w-sm">
             Professores são responsáveis pela <span className="text-white">Identificação</span>. Coordenação pela <span className="text-white">Ação Pedagógica</span>. Direção pela <span className="text-white">Notificação Externa</span> e Rede de Proteção.
           </p>
           <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
             Ver Matriz Completa
           </button>
        </div>
      </div>
    </div>
  );
};
