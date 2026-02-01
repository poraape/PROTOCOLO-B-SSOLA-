
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FLUXOS } from '../data';
import { TipoDemanda } from '../types';

export const DecisorPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedTipo, setSelectedTipo] = useState<TipoDemanda | null>(null);
  const [selectedCenario, setSelectedCenario] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelectTipo = (id: string) => {
    setSelectedTipo(id as TipoDemanda);
    setStep(2);
  };

  const handleSelectCenario = (id: string) => {
    setSelectedCenario(id);
    setStep(3);
  };

  const handleFinalize = () => {
    if (selectedTipo) navigate(`/fluxos/${selectedTipo}`);
  };

  const currentFluxo = selectedTipo ? FLUXOS[selectedTipo] : null;
  const cenarioDetalhe = currentFluxo?.cenarios.find(c => c.id === selectedCenario);
  const currentCenarioIndex = currentFluxo?.cenarios.findIndex(c => c.id === selectedCenario) ?? -1;

  const navigateCenario = (direction: 'prev' | 'next') => {
    if (!currentFluxo) return;
    const total = currentFluxo.cenarios.length;
    let nextIndex = direction === 'next' ? currentCenarioIndex + 1 : currentCenarioIndex - 1;
    if (nextIndex >= total) nextIndex = 0;
    if (nextIndex < 0) nextIndex = total - 1;
    setSelectedCenario(currentFluxo.cenarios[nextIndex].id);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Steps Indicator */}
      <div className="flex justify-center gap-1.5 px-12">
        {[1, 2, 3].map(i => (
          <div 
            key={i} 
            className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${
              step >= i ? 'bg-[#007AFF]' : 'bg-slate-200 dark:bg-slate-800'
            }`} 
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-8 text-center px-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Tipo de Demanda</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">O que você observou no estudante?</p>
          </div>
          <div className="space-y-3">
            {Object.values(FLUXOS).map((f) => (
              <button
                key={f.id}
                onClick={() => handleSelectTipo(f.id)}
                className="ios-card w-full p-6 border border-slate-100 dark:border-slate-800 flex items-center gap-5 text-left shadow-sm group dark:bg-slate-900"
              >
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">
                  {f.icon}
                </div>
                <div className="flex-1">
                  <span className="font-bold text-lg text-slate-900 dark:text-white block">{f.titulo}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 leading-tight">{f.descricao}</span>
                </div>
                <span className="text-slate-300 dark:text-slate-700 text-xl font-light">→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && currentFluxo && (
        <div className="space-y-8 px-2">
          <div className="text-center">
            <button onClick={() => setStep(1)} className="text-[#007AFF] font-bold text-sm mb-4">← Voltar</button>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Cenários</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Selecione a situação específica.</p>
          </div>
          <div className="space-y-3">
            {currentFluxo.cenarios.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectCenario(c.id)}
                className="ios-card w-full p-6 border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2 text-left shadow-sm hover:border-[#007AFF]/30 transition-all"
              >
                <span className="font-bold text-slate-900 dark:text-white text-lg">{c.titulo}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400 leading-snug">{c.descricao}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && cenarioDetalhe && currentFluxo && (
        <div className="px-2">
          <div className="ios-card p-8 border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden bg-white dark:bg-slate-900">
            <div className={`absolute top-0 left-0 right-0 h-1.5 ${currentFluxo.risco === 'urgencia' ? 'bg-[#FF3B30]' : 'bg-[#007AFF]'}`} />
            
            <div className="flex justify-between items-center mb-8">
              <span className="text-xs font-black uppercase tracking-widest text-[#007AFF]">Análise Recomendada</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-[10px] font-bold text-slate-500">
                {currentCenarioIndex + 1} de {currentFluxo.cenarios.length}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 leading-tight">{cenarioDetalhe.titulo}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{cenarioDetalhe.descricao}</p>
            </div>

            {/* Structured Recommendations */}
            <div className="space-y-4 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                <div className="flex gap-4 items-start">
                  <span className="text-2xl">💡</span>
                  <div>
                    <p className="font-black text-blue-900 dark:text-blue-300 text-xs uppercase tracking-widest mb-1">Ação Imediata</p>
                    <p className="text-blue-800 dark:text-blue-100 text-[14px] font-bold leading-relaxed">{cenarioDetalhe.recomendacaoImediata}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                   <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase mb-2">Quem Acionar</p>
                   <div className="flex items-center gap-2">
                     <span className="text-lg">📞</span>
                     <p className="text-slate-900 dark:text-slate-200 text-xs font-black leading-tight">{cenarioDetalhe.acionar}</p>
                   </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                   <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase mb-2">Documento</p>
                   <div className="flex items-center gap-2">
                     <span className="text-lg">📄</span>
                     <p className="text-slate-900 dark:text-slate-200 text-xs font-black leading-tight">{cenarioDetalhe.documento}</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={() => navigateCenario('prev')}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 py-4 rounded-2xl font-bold text-sm hover:bg-slate-200"
                >
                  ← Anterior
                </button>
                <button
                  onClick={() => navigateCenario('next')}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 py-4 rounded-2xl font-bold text-sm hover:bg-slate-200"
                >
                  Próximo →
                </button>
              </div>
              <button
                onClick={handleFinalize}
                className="w-full bg-[#007AFF] text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-200 dark:shadow-blue-900/20 active:scale-95 transition-transform"
              >
                Ver Checklist Completo
              </button>
              <button
                onClick={() => setStep(2)}
                className="w-full text-slate-400 dark:text-slate-600 font-bold py-2 text-sm"
              >
                Voltar aos cenários
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
