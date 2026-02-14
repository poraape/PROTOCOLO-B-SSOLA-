
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FLUXOS, CONTATOS, RECURSOS } from '../data';

export const BuscaPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const allResults = useMemo(() => {
    if (query.length < 2) return [];
    
    const fluxos = Object.values(FLUXOS).filter(f => 
      f.titulo.toLowerCase().includes(query.toLowerCase()) || 
      f.descricao.toLowerCase().includes(query.toLowerCase()) ||
      f.codigo.toLowerCase() === query.toLowerCase()
    ).map(f => ({ ...f, type: 'Fluxo' }));

    const contatos = CONTATOS.filter(c => 
      c.nome.toLowerCase().includes(query.toLowerCase()) || 
      c.categoria.toLowerCase().includes(query.toLowerCase())
    ).map(c => ({ ...c, type: 'Contato' }));

    const recursos = RECURSOS.filter(r => 
      r.titulo.toLowerCase().includes(query.toLowerCase())
    ).map(r => ({ ...r, type: 'Recurso' }));

    return [...fluxos, ...contatos, ...recursos];
  }, [query]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <header className="px-2">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">Busca Global</h2>
        <p className="text-slate-500 font-medium">Encontre protocolos, contatos e documentos.</p>
      </header>

      <div className="px-2 sticky top-20 z-10">
        <div className="relative">
          <input 
            autoFocus
            type="text"
            placeholder="O que você está procurando?"
            className="w-full p-5 pl-14 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-ios focus:ring-4 focus:ring-[#007AFF]/20 outline-none transition-all font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4 px-2">
        {allResults.length > 0 ? (
          allResults.map((res: any, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (res.type === 'Fluxo') navigate(`/fluxos/${res.id}`);
                if (res.type === 'Contato') navigate('/rede');
                if (res.type === 'Recurso') navigate('/recursos');
              }}
              className="w-full ios-card p-6 border border-slate-100 dark:border-slate-800 flex items-center gap-4 text-left hover:border-[#007AFF] transition-all bg-white dark:bg-slate-900"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl">
                {res.type === 'Fluxo' ? (res.icon || '📋') : res.type === 'Contato' ? '📞' : '📄'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-[#007AFF] tracking-widest">{res.type}</span>
                  {res.codigo && <span className="text-[8px] font-black bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">P-{res.codigo}</span>}
                </div>
                <h4 className="font-black text-slate-900 dark:text-white line-clamp-1">{res.titulo || res.nome}</h4>
                <p className="text-[11px] text-slate-400 font-bold line-clamp-1">{res.descricao}</p>
              </div>
              <span className="ml-auto text-slate-300">→</span>
            </button>
          ))
        ) : query.length >= 2 ? (
          <div className="py-20 text-center opacity-40">
            <span className="text-5xl block mb-4">🏜️</span>
            <p className="font-black uppercase tracking-widest text-xs">Nenhum resultado para "{query}"</p>
          </div>
        ) : (
          <div className="py-10 text-center text-slate-300">
            <p className="text-xs font-bold uppercase tracking-widest">Digite pelo menos 2 letras para buscar</p>
          </div>
        )}
      </div>
    </div>
  );
};
