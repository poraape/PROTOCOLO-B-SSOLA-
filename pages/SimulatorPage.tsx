import React from 'react';
import { ScenarioPlayer } from '../components/scenario/ScenarioPlayer';

export const SimulatorPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-20">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-black uppercase tracking-widest text-[#007AFF]">Cenários</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Treinamento de travessia da árvore</h1>
        <p className="mt-2 text-sm text-slate-600">
          Selecione um cenário realista e acompanhe a travessia passo a passo. Ative o modo treinamento para comparar suas decisões com o fluxo recomendado.
        </p>
      </header>

      <ScenarioPlayer />
    </div>
  );
};
