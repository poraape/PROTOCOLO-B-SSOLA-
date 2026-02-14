
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FLUXOS, CONTATOS } from '../data';
import { CasoAtivo, ChecklistItem } from '../types';

export const FlowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fluxo = FLUXOS[id || ''];
  
  const [activePhase, setActivePhase] = useState(1);
  const [completedChecklist, setCompletedChecklist] = useState<Record<string, boolean>>({});
  const [expandedItemIndex, setExpandedItemIndex] = useState<number | null>(null);

  // Persistência Experimental de Estado do Caso
  useEffect(() => {
    const saved = localStorage.getItem(`case_${id}`);
    if (saved) {
      const data = JSON.parse(saved);
      setActivePhase(data.faseAtual);
      setCompletedChecklist(data.checklist || {});
    }
  }, [id]);

  const saveState = (fase: number, checklist: Record<string, boolean>) => {
    const caseData: CasoAtivo = {
      id: `case_${id}_${Date.now()}`,
      fluxoId: id || '',
      faseAtual: fase,
      dataCriacao: new Date().toISOString(),
      ultimaAtualizacao: new Date().toISOString(),
      status: fase === 7 ? 'encerrado' : 'aberto',
    };
    localStorage.setItem(`case_${id}`, JSON.stringify({ ...caseData, checklist }));
  };

  if (!fluxo) return <div className="p-10 text-center text-slate-400">Fluxo inexistente.</div>;

  const currentFase = fluxo.fases.find(f => f.ordem === activePhase) || fluxo.fases[0];
  const contatosRelacionados = CONTATOS.filter(c => fluxo.contatosUteis.includes(c.id));

  const toggleCheck = (e: React.MouseEvent, itemTexto: string) => {
    e.stopPropagation(); // Evita expandir ao apenas clicar no checkbox
    const newChecklist = { ...completedChecklist, [itemTexto]: !completedChecklist[itemTexto] };
    setCompletedChecklist(newChecklist);
    saveState(activePhase, newChecklist);
  };

  const toggleExpand = (index: number) => {
    setExpandedItemIndex(expandedItemIndex === index ? null : index);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      {/* Header e Barra de Progresso */}
      <div className="px-2 space-y-4">
        <div className="flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="text-[#007AFF] font-bold text-sm">← Voltar</button>
          <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${fluxo.risco === 'urgencia' ? 'bg-red-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
            Protocolo {fluxo.codigo} • Risco {fluxo.risco}
          </span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">{fluxo.titulo}</h2>
        
        <div className="flex gap-1">
          {fluxo.fases.map(f => (
            <div 
              key={f.ordem} 
              className={`h-2 flex-1 rounded-full transition-all duration-500 ${f.ordem <= activePhase ? (fluxo.risco === 'urgencia' ? 'bg-red-500' : 'bg-[#007AFF]') : 'bg-slate-100 dark:bg-slate-800'}`} 
            />
          ))}
        </div>
      </div>

      {/* Navegação de Fases */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-2">
        {fluxo.fases.map(f => (
          <button
            key={f.ordem}
            onClick={() => {
              setActivePhase(f.ordem);
              setExpandedItemIndex(null);
            }}
            className={`min-w-[120px] p-4 rounded-3xl border transition-all ${
              activePhase === f.ordem 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xl translate-y-[-2px]' 
                : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-100 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            <p className="text-[8px] font-black uppercase tracking-widest mb-1 opacity-60">Fase {f.ordem}</p>
            <p className="text-[10px] font-bold truncate">{f.titulo}</p>
          </button>
        ))}
      </div>

      <div className="px-2 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Conteúdo da Fase */}
        <div className="lg:col-span-2 space-y-6">
          <div className="ios-card p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-ios relative overflow-hidden">
             {/* Subtle indicator for the current active phase type */}
             <div className={`absolute left-0 top-0 bottom-0 w-1 ${fluxo.risco === 'urgencia' ? 'bg-red-500' : 'bg-[#007AFF]'}`} />

             <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${fluxo.risco === 'urgencia' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-blue-50 dark:bg-blue-900/20'}`}>
                  {activePhase === 1 ? '👀' : activePhase === 2 ? '🤝' : activePhase === 3 ? '⚖️' : activePhase === 4 ? '🚀' : activePhase === 5 ? '📈' : activePhase === 6 ? '🔄' : '🏁'}
                </div>
                <div>
                   <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Fase {currentFase.ordem}: {currentFase.titulo}</h3>
                   <p className="text-slate-400 text-[10px] font-bold uppercase mt-1 tracking-widest">Responsabilidade: {currentFase.responsavel}</p>
                </div>
             </div>
             
             <p className="text-slate-600 dark:text-slate-400 font-medium mb-8 leading-relaxed italic border-l-4 border-slate-100 dark:border-slate-800 pl-4">
               {currentFase.descricao}
             </p>

             <div className="space-y-3">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <span>📋</span> Checklist de Ações Sugeridas
               </h4>
               {currentFase.checklist.map((item, i) => {
                 const isExpanded = expandedItemIndex === i;
                 const isCompleted = completedChecklist[item.texto];

                 return (
                   <div 
                    key={i}
                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-60' 
                        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-[#007AFF] shadow-sm'
                    }`}
                   >
                     <button 
                       onClick={() => toggleExpand(i)}
                       className="w-full p-5 text-left flex items-center gap-4 transition-all group"
                     >
                       <div 
                        onClick={(e) => toggleCheck(e, item.texto)}
                        className={`w-7 h-7 shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${
                          isCompleted ? 'bg-[#34C759] border-[#34C759]' : 'border-slate-200 dark:border-slate-700 group-hover:border-[#007AFF]'
                        }`}
                       >
                         {isCompleted && <span className="text-white text-xs">✓</span>}
                       </div>
                       <div className="flex-1">
                         <span className={`text-sm font-bold block ${isCompleted ? 'line-through text-slate-400 italic' : 'text-slate-700 dark:text-slate-200'}`}>
                           {item.texto}
                         </span>
                         {!isExpanded && item.detalhes && (
                           <span className="text-[10px] text-[#007AFF] font-bold uppercase tracking-tighter">Clique para ver detalhes</span>
                         )}
                       </div>
                       <span className={`text-xs text-slate-300 transition-transform duration-500 ${isExpanded ? 'rotate-180 text-[#007AFF]' : ''}`}>
                         ▼
                       </span>
                     </button>
                     
                     <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[500px]' : 'max-h-0'}`}>
                        <div className="px-5 pb-6 pt-2 border-t border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30">
                           <div className="space-y-4">
                             <div className="flex gap-3">
                                <span className="text-slate-300 text-lg">💡</span>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                   {item.detalhes || 'Siga as orientações padrão do protocolo para esta etapa.'}
                                </p>
                             </div>
                             
                             {item.links && item.links.length > 0 && (
                               <div className="flex flex-col gap-2 pt-2">
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Recursos Relacionados:</p>
                                 <div className="flex flex-wrap gap-2">
                                   {item.links.map((link, lIdx) => (
                                     <button
                                       key={lIdx}
                                       onClick={(e) => {
                                          e.stopPropagation();
                                          if (link.idRecurso) navigate('/recursos');
                                          else if (link.url) window.open(link.url, '_blank');
                                       }}
                                       className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-[#007AFF] hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-slate-200 dark:border-slate-700 shadow-sm active:scale-90"
                                     >
                                       🔗 {link.titulo}
                                     </button>
                                   ))}
                                 </div>
                               </div>
                             )}
                           </div>
                        </div>
                     </div>
                   </div>
                 );
               })}
             </div>
          </div>

          {/* Botão Próxima Fase */}
          <div className="flex gap-4">
            {activePhase > 1 && (
              <button 
                onClick={() => {
                  setActivePhase(prev => prev - 1);
                  setExpandedItemIndex(null);
                }}
                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-500 py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
              >
                ← Fase Anterior
              </button>
            )}
            <button 
              onClick={() => {
                if (activePhase < 7) {
                  setActivePhase(prev => prev + 1);
                  setExpandedItemIndex(null);
                  saveState(activePhase + 1, completedChecklist);
                }
              }}
              className={`flex-[2] py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all ${
                activePhase === 7 
                ? 'bg-emerald-500 text-white cursor-default' 
                : 'bg-[#007AFF] text-white shadow-blue-500/20'
              }`}
            >
              {activePhase === 7 ? 'Ciclo Concluído 🏁' : 'Avançar para Próxima Fase →'}
            </button>
          </div>
        </div>

        {/* Sidebar de Apoio */}
        <div className="space-y-6">
           {/* Vedações */}
           {fluxo.vedacoes.length > 0 && (
             <div className="ios-card bg-red-50 dark:bg-red-900/10 p-6 border border-red-100 dark:border-red-900/30 animate-in slide-in-from-right-4">
                <h4 className="text-red-600 dark:text-red-400 font-black text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span>🚫</span> Vedações Cruciais
                </h4>
                <ul className="space-y-3">
                  {fluxo.vedacoes.map((v, i) => (
                    <li key={i} className="text-red-800 dark:text-red-300 text-xs font-bold leading-tight flex items-start gap-3">
                      <span className="opacity-40 text-lg">•</span> 
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
             </div>
           )}

           {/* Rede de Apoio Direta */}
           <div className="ios-card p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-ios animate-in slide-in-from-right-8">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span>📞</span> Rede de Apoio Direta
              </h4>
              <div className="space-y-3">
                {contatosRelacionados.length > 0 ? contatosRelacionados.map(c => (
                  <div key={c.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-[#007AFF]/20 transition-all">
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="text-[10px] font-black text-slate-900 dark:text-white truncate uppercase tracking-tighter">{c.nome}</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{c.categoria}</p>
                    </div>
                    <a href={`tel:${c.telefone}`} className="w-10 h-10 rounded-full bg-[#007AFF] flex items-center justify-center text-white text-lg shadow-lg shadow-blue-500/20 active:scale-90 transition-transform">📞</a>
                  </div>
                )) : (
                  <p className="text-[10px] text-slate-400 italic font-medium">Use a aba 'Rede' para contatos gerais.</p>
                )}
              </div>
           </div>

           {/* Dica de Segurança */}
           <div className="p-6 rounded-[2rem] bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30 flex gap-4">
              <span className="text-xl">💡</span>
              <p className="text-[11px] font-bold text-amber-800 dark:text-amber-400 leading-relaxed">
                Lembre-se: O registro de cada fase no Anexo IV é sua maior segurança legal. Não deixe para preencher depois.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
