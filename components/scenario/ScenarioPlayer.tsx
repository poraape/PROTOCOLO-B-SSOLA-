import React, { useEffect, useMemo, useState } from 'react';
import { ALERTS_DATA } from '../../data/alerts';
import { SCENARIOS_DATA, Scenario, ScenarioStep, Category, Complexity, RiskLevel } from '../../data/scenarios';

type ActorTone = 'brand' | 'emerald' | 'violet' | 'amber' | 'slate';

const riskWeight: Record<RiskLevel, number> = { imminent: 4, high: 3, moderate: 2, low: 1 };
const complexityIcon: Record<Complexity, string> = { low: '🟢', medium: '🟡', high: '🔴' };
const categoryIcon: Record<Category, string> = {
  pedagogical: '🏫',
  mental_health: '🧠',
  physical_health: '🩺',
  violence: '🛡️',
  substances: '🧪',
  family_conflict: '🏠',
  neglect: '⚠️',
  inclusion: '♿',
  sexual_health: '🫶'
};

const actorTone = (actor: string): ActorTone => {
  if (actor.includes('direção')) return 'violet';
  if (actor.includes('coordenação')) return 'brand';
  if (actor.includes('professor')) return 'emerald';
  if (actor.includes('SAMU') || actor.includes('PM')) return 'amber';
  return 'slate';
};

const actorClass: Record<ActorTone, string> = {
  brand: 'bg-brand-100 text-brand-800',
  emerald: 'bg-emerald-100 text-emerald-800',
  violet: 'bg-violet-100 text-violet-800',
  amber: 'bg-amber-100 text-amber-800',
  slate: 'bg-slate-100 text-slate-800'
};

const STORAGE_KEY = 'scenario-player-training-v1';

interface TrainingOption {
  id: string;
  label: string;
  isCorrect: boolean;
  alertId?: string;
}

export const ScenarioPlayer: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [visitedStepIds, setVisitedStepIds] = useState<string[]>([]);
  const [trainingMode, setTrainingMode] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showRationale, setShowRationale] = useState(true);

  const [filters, setFilters] = useState<{
    complexity: '' | Complexity;
    riskLevel: '' | RiskLevel;
    category: '' | Category;
    episodic: '' | 'episodico' | 'cronico';
    collective: '' | 'coletivo' | 'individual';
  }>({ complexity: '', riskLevel: '', category: '', episodic: '', collective: '' });

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as {
        selectedScenarioId: string | null;
        currentStepId: string | null;
        visitedStepIds: string[];
        score: number;
        trainingMode: boolean;
      };
      setSelectedScenarioId(parsed.selectedScenarioId);
      setCurrentStepId(parsed.currentStepId || null);
      setVisitedStepIds(Array.isArray(parsed.visitedStepIds) ? parsed.visitedStepIds : []);
      setScore(parsed.score || 0);
      setTrainingMode(Boolean(parsed.trainingMode));
    } catch {
      // noop
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedScenarioId, currentStepId, visitedStepIds, score, trainingMode }));
  }, [selectedScenarioId, currentStepId, visitedStepIds, score, trainingMode]);

  const filteredScenarios = useMemo(() => {
    return SCENARIOS_DATA
      .filter((s) => (filters.complexity ? s.complexity === filters.complexity : true))
      .filter((s) => (filters.riskLevel ? s.riskLevel === filters.riskLevel : true))
      .filter((s) => (filters.category ? s.category.includes(filters.category) : true))
      .filter((s) => (filters.episodic ? (filters.episodic === 'episodico' ? s.isEpisodic : !s.isEpisodic) : true))
      .filter((s) => (filters.collective ? (filters.collective === 'coletivo' ? s.isCollective : !s.isCollective) : true))
      .sort((a, b) => riskWeight[b.riskLevel] - riskWeight[a.riskLevel]);
  }, [filters]);

  const scenario: Scenario | undefined = useMemo(
    () => SCENARIOS_DATA.find((item) => item.id === selectedScenarioId) || filteredScenarios[0],
    [selectedScenarioId, filteredScenarios]
  );

  useEffect(() => {
    if (!selectedScenarioId && filteredScenarios[0]) setSelectedScenarioId(filteredScenarios[0].id);
  }, [selectedScenarioId, filteredScenarios]);

  useEffect(() => {
    if (!scenario) return;
    const firstStepId = scenario.treeTraversal[0]?.nodeId ?? null;
    const stepExists = currentStepId ? scenario.treeTraversal.some((step) => step.nodeId === currentStepId) : false;

    if (!stepExists && firstStepId) {
      setCurrentStepId(firstStepId);
      setVisitedStepIds([firstStepId]);
    }
  }, [scenario, currentStepId]);

  const currentStep: ScenarioStep | undefined = useMemo(() => {
    if (!scenario || !currentStepId) return undefined;
    return scenario.treeTraversal.find((step) => step.nodeId === currentStepId);
  }, [scenario, currentStepId]);

  const currentStepIndex = useMemo(() => {
    if (!scenario || !currentStep) return -1;
    return scenario.treeTraversal.findIndex((step) => step.nodeId === currentStep.nodeId);
  }, [scenario, currentStep]);

  const goToStepById = (nextStepId: string) => {
    if (!scenario) return;
    const nextStep = scenario.treeTraversal.find((step) => step.nodeId === nextStepId);
    if (!nextStep) return;

    setCurrentStepId(nextStep.nodeId);
    setVisitedStepIds((prev) => (prev.includes(nextStep.nodeId) ? prev : [...prev, nextStep.nodeId]));
    setSelectedOptionId(null);
  };

  const goBackInHistory = () => {
    if (visitedStepIds.length <= 1) return;
    const previousStepId = visitedStepIds[visitedStepIds.length - 2];
    setVisitedStepIds((prev) => prev.slice(0, -1));
    setCurrentStepId(previousStepId);
    setSelectedOptionId(null);
  };

  const trainingOptions = useMemo<TrainingOption[]>(() => {
    if (!trainingMode || !currentStep) return [];
    const recommendedOption = currentStep.options.find((option) => option.isRecommended);
    const correct: TrainingOption = {
      id: `correct-${currentStep.nodeId}`,
      label: `${currentStep.actor}: ${currentStep.action}`,
      isCorrect: true,
      alertId: currentStep.alertTriggered
    };

    const distractorAlerts = ALERTS_DATA.filter((alert) => alert.id !== currentStep.alertTriggered).slice(0, 2);
    const distractors: TrainingOption[] = distractorAlerts.map((alert, idx) => ({
      id: `distractor-${alert.id}-${currentStep.nodeId}`,
      label: currentStep.options[idx]?.impact || alert.doNot,
      isCorrect: false,
      alertId: alert.id
    }));

    return [
      {
        ...correct,
        label: recommendedOption ? `${correct.label} (${recommendedOption.impact})` : correct.label
      },
      ...distractors
    ].sort((a, b) => a.id.localeCompare(b.id));
  }, [trainingMode, currentStep]);

  const selectedOption = trainingOptions.find((opt) => opt.id === selectedOptionId);
  const selectedAlert = selectedOption?.alertId ? ALERTS_DATA.find((a) => a.id === selectedOption.alertId) : undefined;

  const resetTraining = () => {
    if (!scenario) return;
    const firstStepId = scenario.treeTraversal[0]?.nodeId ?? null;
    setCurrentStepId(firstStepId);
    setVisitedStepIds(firstStepId ? [firstStepId] : []);
    setScore(0);
    setSelectedOptionId(null);
  };

  const answerTraining = (option: TrainingOption) => {
    if (selectedOptionId) return;
    setSelectedOptionId(option.id);
    if (option.isCorrect) setScore((prev) => prev + 1);
  };

  if (!scenario || !currentStep || currentStepIndex < 0) return null;

  return (
    <div className="space-y-4">
      <section className="card p-4">
        <h2 className="text-xl font-extrabold">ScenarioPlayer</h2>
        <p className="text-sm text-muted">Treinamento de travessia com cenários locais (offline), filtros e modo prática.</p>

        <div className="mt-3 grid gap-2 md:grid-cols-5">
          <select className="rounded-lg border px-2 py-1 text-sm" value={filters.complexity} onChange={(e) => setFilters((f) => ({ ...f, complexity: e.target.value as '' | Complexity }))}>
            <option value="">Complexidade</option><option value="low">Baixa</option><option value="medium">Média</option><option value="high">Alta</option>
          </select>
          <select className="rounded-lg border px-2 py-1 text-sm" value={filters.riskLevel} onChange={(e) => setFilters((f) => ({ ...f, riskLevel: e.target.value as '' | RiskLevel }))}>
            <option value="">Risco</option><option value="low">Baixo</option><option value="moderate">Moderado</option><option value="high">Alto</option><option value="imminent">Iminente</option>
          </select>
          <select className="rounded-lg border px-2 py-1 text-sm" value={filters.category} onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value as '' | Category }))}>
            <option value="">Categoria</option>{Object.keys(categoryIcon).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="rounded-lg border px-2 py-1 text-sm" value={filters.episodic} onChange={(e) => setFilters((f) => ({ ...f, episodic: e.target.value as '' | 'episodico' | 'cronico' }))}>
            <option value="">Temporalidade</option><option value="episodico">Episódico</option><option value="cronico">Crônico</option>
          </select>
          <select className="rounded-lg border px-2 py-1 text-sm" value={filters.collective} onChange={(e) => setFilters((f) => ({ ...f, collective: e.target.value as '' | 'coletivo' | 'individual' }))}>
            <option value="">Abrangência</option><option value="coletivo">Coletivo</option><option value="individual">Individual</option>
          </select>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {filteredScenarios.map((item) => (
            <button key={item.id} onClick={() => {
              const firstStepId = item.treeTraversal[0]?.nodeId ?? null;
              setSelectedScenarioId(item.id);
              setCurrentStepId(firstStepId);
              setVisitedStepIds(firstStepId ? [firstStepId] : []);
              setSelectedOptionId(null);
            }} className={`rounded-xl border p-3 text-left ${item.id === scenario.id ? 'border-brand-400 bg-brand-50' : 'border-slate-200 bg-white'}`}>
              <p className="font-semibold">{item.title}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                <span>{complexityIcon[item.complexity]} {item.complexity}</span>
                <span className="badge">risco: {item.riskLevel}</span>
                <span className="badge">{item.isEpisodic ? 'episódico' : 'crônico'}</span>
                <span className="badge">{item.isCollective ? 'coletivo' : 'individual'}</span>
              </div>
              <div className="mt-1 text-sm">{item.category.map((cat) => `${categoryIcon[cat]} ${cat}`).join(' · ')}</div>
              <div className="mt-2 flex flex-wrap gap-1">{item.markers.map((marker) => <span key={`${item.id}-${marker}`} className="rounded-full border border-slate-200 px-2 py-0.5 text-[11px] text-slate-700">{marker}</span>)}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="card p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Árvore percorrida</h3>
          <div className="mt-2 space-y-2">
            {scenario.treeTraversal.map((step) => {
              const isCurrent = step.nodeId === currentStep.nodeId;
              const isVisited = visitedStepIds.includes(step.nodeId);
              return (
                <div key={`${scenario.id}-${step.nodeId}`} className={`rounded-lg border p-2 text-sm ${isCurrent ? 'border-brand-400 bg-brand-50' : isVisited ? 'border-emerald-300 bg-emerald-50/30' : 'border-slate-200'}`}>
                  <p className="font-semibold">#{step.step} · {step.nodeId}</p>
                  <p className="text-xs text-muted">{step.actor}</p>
                </div>
              );
            })}
          </div>
        </article>

        <article className="card p-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Passo atual</h3>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${actorClass[actorTone(currentStep.actor)]}`}>{currentStep.actor}</span>
          </div>

          <p className="mt-2 text-xs text-muted">Etapa {currentStep.step} de {scenario.treeTraversal.length}</p>

          {trainingMode ? (
            <>
              <p className="mt-2 text-sm"><strong>Trigger:</strong> {scenario.trigger}</p>
              <p className="text-sm"><strong>Perfil:</strong> {scenario.studentProfile}</p>
              <div className="mt-3 space-y-2">
                {trainingOptions.map((option) => (
                  <button key={option.id} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-left text-sm" onClick={() => answerTraining(option)}>
                    {option.label}
                  </button>
                ))}
              </div>
              {selectedOption ? (
                <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">
                  <p>{selectedOption.isCorrect ? '✅ Resposta correta.' : '❌ Resposta incorreta.'}</p>
                  {!!selectedAlert && !selectedOption.isCorrect && <p className="mt-1 text-xs">{selectedAlert.reason}</p>}
                </div>
              ) : null}
              <p className="mt-2 text-sm font-semibold">Score: {score}/{scenario.treeTraversal.length}</p>
            </>
          ) : (
            <>
              <p className="mt-2 text-sm">{currentStep.action}</p>
              <details className="mt-2" open={showRationale} onToggle={(e) => setShowRationale((e.target as HTMLDetailsElement).open)}>
                <summary className="cursor-pointer text-xs font-semibold text-muted">Rationale</summary>
                <p className="mt-1 text-xs text-muted">{currentStep.rationale}</p>
              </details>
              {currentStep.alertTriggered ? (
                <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">
                  <p className="font-semibold">⚠️ Alerta {currentStep.alertTriggered}</p>
                  <p className="text-xs">{ALERTS_DATA.find((alert) => alert.id === currentStep.alertTriggered)?.doNot}</p>
                </div>
              ) : null}

              <div className="mt-3 space-y-2">
                {currentStep.options.map((option) => (
                  <button key={`${currentStep.nodeId}-${option.nextStepId}`} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-left text-sm" onClick={() => goToStepById(option.nextStepId)}>
                    <p className="font-semibold">Ir para: {option.nextStepId}</p>
                    <p className="text-xs text-muted">Impacto: {option.impact}</p>
                    <p className="text-xs text-muted">Base legal: {option.legalBasis}</p>
                    {option.isRecommended ? <p className="text-xs font-semibold text-emerald-700">Recomendado</p> : null}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <button className="btn-secondary text-xs" onClick={goBackInHistory} disabled={visitedStepIds.length <= 1}>← Anterior</button>
            <button className="btn-secondary text-xs" onClick={() => setTrainingMode((v) => !v)}>{trainingMode ? 'Sair do treinamento' : 'Modo treinamento'}</button>
            <button className="btn-secondary text-xs" onClick={resetTraining}>Reset treino</button>
          </div>
        </article>
      </section>
    </div>
  );
};
