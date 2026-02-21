import React from 'react';
import { useSimulator } from './SimulatorProvider';
import { SimulatorExplorationProps } from '../../types/simulator';

export const SimulatorExploration: React.FC<SimulatorExplorationProps> = ({ categoryIcon, complexityIcon, riskVisual }) => {
  const {
    filters,
    setFilters,
    guidedOrder,
    setGuidedOrder,
    filteredScenarios,
    scenario,
    selectScenario,
    suggestedNext
  } = useSimulator();

  if (!scenario) return null;

  return (
    <section className="card p-4">
      <label className="mt-3 flex items-center gap-2 text-xs text-muted">
        <input type="checkbox" checked={guidedOrder} onChange={(event) => setGuidedOrder(event.target.checked)} />
        Ordenação guiada por trilha (simples → complexo)
      </label>
      {guidedOrder && suggestedNext ? (
        <p className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
          Próxima sugestão: <strong>{suggestedNext.id}</strong> ({suggestedNext.title})
        </p>
      ) : null}

      <div className="mt-3 grid gap-2 md:grid-cols-5">
        <select className="rounded-lg border px-2 py-1 text-sm" value={filters.complexity} onChange={(event) => setFilters((prev) => ({ ...prev, complexity: event.target.value as typeof prev.complexity }))}><option value="">Complexidade</option><option value="low">Baixa</option><option value="medium">Média</option><option value="high">Alta</option></select>
        <select className="rounded-lg border px-2 py-1 text-sm" value={filters.riskLevel} onChange={(event) => setFilters((prev) => ({ ...prev, riskLevel: event.target.value as typeof prev.riskLevel }))}><option value="">Risco</option><option value="low">Baixo</option><option value="moderate">Moderado</option><option value="high">Alto</option><option value="imminent">Iminente</option></select>
        <select className="rounded-lg border px-2 py-1 text-sm" value={filters.category} onChange={(event) => setFilters((prev) => ({ ...prev, category: event.target.value as typeof prev.category }))}><option value="">Categoria</option>{Object.keys(categoryIcon).map((category) => <option key={category} value={category}>{category}</option>)}</select>
        <select className="rounded-lg border px-2 py-1 text-sm" value={filters.episodic} onChange={(event) => setFilters((prev) => ({ ...prev, episodic: event.target.value as typeof prev.episodic }))}><option value="">Temporalidade</option><option value="episodico">Episódico</option><option value="cronico">Crônico</option></select>
        <select className="rounded-lg border px-2 py-1 text-sm" value={filters.collective} onChange={(event) => setFilters((prev) => ({ ...prev, collective: event.target.value as typeof prev.collective }))}><option value="">Abrangência</option><option value="coletivo">Coletivo</option><option value="individual">Individual</option></select>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {filteredScenarios.map((item) => (
          <button key={item.id} onClick={() => selectScenario(item.id)} className={`rounded-xl border p-3 text-left ${item.id === scenario.id ? 'border-brand-400 bg-brand-50' : 'border-slate-200 bg-white'}`}>
            <p className="font-semibold">{item.title}</p>
            <span className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold ${riskVisual[item.riskLevel].className}`}>Risco visual: {riskVisual[item.riskLevel].label}</span>
            <div className="mt-2 text-sm">Categoria principal: {categoryIcon[item.category[0]]} {item.category[0]}</div>
            <div className="mt-2 text-xs text-slate-700">{complexityIcon[item.complexity]} {item.complexity} · {item.isEpisodic ? 'episódico' : 'crônico'}</div>
          </button>
        ))}
      </div>
    </section>
  );
};
