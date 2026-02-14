
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FLUXOS } from '../data';
import { TipoDemanda } from '../types';

export const DecisorPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedTipo, setSelectedTipo] = useState<string | null>(null);
  const [selectedCenario, setSelectedCenario] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelectTipo = (id: string) => {
    setSelectedTipo(id);
    setStep(2);
  };

  const handleSelectCenario = (id: string) => {
    setSelectedCenario(id);
    setStep(3);
  };

  const currentFluxo = selectedTipo ? FLUXOS[selectedTipo] : null;
  const cenarioDetalhe = currentFluxo?.cenarios.find(c => c.id === selectedCenario);
  
  const steps = [
    { id: 1, label: 'Identificação', desc: 'O que ocorreu?' },
    { id: 2, label: 'Cenário', desc: 'Detalhes' },
    { id: 3, label: 'Protocolo', desc: 'Ação Imediata' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Stepper Superior */}
      <div className="flex items-center justify-between px-4 bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
        {steps.map((s, idx) => (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                step >= s.id ? 'bg-[#007AFF] text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                {s.id}
              </div>
              <p className={`text-[9px] font-black uppercase tracking-tighter ${step >= s.id ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                {s.label}
              </p>
            </div>
            {idx < steps.length - 1 && <div className={`h-[1px] flex-1 mx-2 ${step > s.id ? 'bg-[#007AFF]' : 'bg-slate-100'}`} />}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4">
          <header className="px-2">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-none">Qual a situação?</h2>
            <p className="text-slate-500 mt-2 font-medium">Classifique a natureza da demanda.</p>
          </header>
          <div className="grid grid-cols-1 gap-3 px-2">
            {Object.values(FLUXOS).map((f) => (
              <button
                key={f.id}
                onClick={() => handleSelectTipo(f.id)}
                className="ios-card p-6 border-b-4 border-slate-100 dark:border-slate-800 hover:border-[#007AFF] flex items-center gap-4 text-left group transition-all bg-white dark:bg-slate-900"
              >
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 dark:text-white">{f.titulo}</span>
                    <span className="bg-slate-100 dark:bg-slate-800 text-[8px] font-black px-1.5 py-0.5 rounded text-slate-400">FLUXO {f.codigo}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{f.descricao}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && currentFluxo && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
          <header className="px-2 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">{currentFluxo.titulo}</h2>
              <p className="text-slate-500 mt-1">Selecione o cenário específico.</p>
            </div>
            <button onClick={() => setStep(1)} className="text-[#007AFF] font-bold text-sm">Voltar</button>
          </header>
          <div className="space-y-3 px-2">
            {currentFluxo.cenarios.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectCenario(c.id)}
                className="ios-card w-full p-6 text-left border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:ring-2 hover:ring-[#007AFF]"
              >
                <h3 className="font-black text-slate-900 dark:text-white mb-1">{c.titulo}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{c.descricao}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && cenarioDetalhe && currentFluxo && (
        <div className="px-2 animate-in zoom-in-95">
          <div className="ios-card p-8 bg-white dark:bg-slate-900 shadow-2xl relative overflow-hidden border border-slate-100 dark:border-slate-800">
             <div className={`absolute top-0 left-0 right-0 h-2 ${currentFluxo.risco === 'urgencia' ? 'bg-red-500' : 'bg-[#007AFF]'}`} />
             
             <div className="flex justify-between items-center mb-8">
                <span className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Ação Imediata</span>
                <button onClick={() => setStep(2)} className="text-slate-400 font-bold text-xs uppercase tracking-widest">Alterar</button>
             </div>

             <div className="mb-8">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-tight mb-2">{cenarioDetalhe.titulo}</h3>
                <p className="text-slate-500 font-bold text-sm">{cenarioDetalhe.recomendacaoImediata}</p>
             </div>

             {/* Vedações Expressas */}
             {currentFluxo.vedacoes.length > 0 && (
               <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/30">
                  <h4 className="text-red-600 dark:text-red-400 font-black text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span>🚫</span> Vedações (O que NÃO fazer)
                  </h4>
                  <ul className="space-y-2">
                    {currentFluxo.vedacoes.map((v, i) => (
                      <li key={i} className="text-red-800 dark:text-red-300 text-xs font-bold flex items-start gap-2">
                        <span className="opacity-40">•</span> {v}
                      </li>
                    ))}
                  </ul>
               </div>
             )}

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-3xl">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Prazos Legais</p>
                   {/* Propriedade corrigida para cenarioDetalhe.prazoNotificacao */}
                   <p className="text-slate-900 dark:text-slate-100 text-xs font-black">Notificação: {cenarioDetalhe.prazoNotificacao}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-3xl">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Conviva SEDUC</p>
                   <p className="text-slate-900 dark:text-slate-100 text-[10px] font-black line-clamp-1">{currentFluxo.convivaFields.join(', ')}</p>
                </div>
             </div>

             <button
              onClick={() => navigate(`/fluxos/${currentFluxo.id}`)}
              className="w-full bg-[#007AFF] text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-500/30 active:scale-95 transition-all"
             >
               Ver Fluxo Completo e Contatos
             </button>
          </div>
        </div>
      )}
    </div>
  );
};
