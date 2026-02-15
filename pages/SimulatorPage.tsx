import React, { useMemo, useState } from 'react';
import { ROLEPLAY_SCENARIOS } from '../data';

interface ScenarioOption {
  id: string;
  text: string;
  isBest: boolean;
  feedback: string;
}

interface Scenario {
  id: string;
  title: string;
  situation: string;
  options: ScenarioOption[];
  protocolHint: string;
}

export const SimulatorPage: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const scenarios = ROLEPLAY_SCENARIOS as Scenario[];
  const current = scenarios[index];

  const selectedOption = useMemo(
    () => current.options.find((opt) => opt.id === selected),
    [current.options, selected]
  );

  const handleChoose = (option: ScenarioOption) => {
    if (selected) return;
    setSelected(option.id);
    if (option.isBest) setScore((s) => s + 1);
  };

  const next = () => {
    if (index < scenarios.length - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  };

  const reset = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
  };

  const finished = index === scenarios.length - 1 && !!selected;

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-20">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-black uppercase tracking-widest text-[#007AFF]">Roleplay</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Simulador de cenários</h1>
        <p className="mt-2 text-sm text-slate-600">
          Treino rápido de tomada de decisão para fortalecer o uso do protocolo fora de crises reais.
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Cenário {index + 1} de {scenarios.length}
        </p>
        <h2 className="mt-2 text-xl font-extrabold text-slate-900">{current.title}</h2>
        <p className="mt-2 text-sm text-slate-700">{current.situation}</p>

        <div className="mt-5 space-y-2">
          {current.options.map((option) => {
            const active = selected === option.id;
            const showResult = !!selected;
            const stateClass = showResult
              ? option.isBest
                ? 'border-emerald-300 bg-emerald-50'
                : active
                  ? 'border-red-300 bg-red-50'
                  : 'border-slate-200 bg-white'
              : 'border-slate-300 bg-white hover:border-[#007AFF]';

            return (
              <button
                key={option.id}
                onClick={() => handleChoose(option)}
                className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${stateClass}`}
              >
                {option.text}
              </button>
            );
          })}
        </div>

        {selectedOption && (
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">{selectedOption.feedback}</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              Dica de protocolo: {current.protocolHint}
            </p>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {finished ? (
            <button onClick={reset} className="rounded-xl bg-[#007AFF] px-4 py-2 text-sm font-bold text-white">
              Reiniciar simulador
            </button>
          ) : (
            <button
              onClick={next}
              disabled={!selected}
              className="rounded-xl bg-[#007AFF] px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Próximo cenário
            </button>
          )}

          <div className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700">
            Pontuação: {score}/{scenarios.length}
          </div>
        </div>
      </section>
    </div>
  );
};
