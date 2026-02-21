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

interface RealPathEntry {
  step: number;
  actor: string;
  action: string;
  nodeId: string;
  isRecommended: boolean;
  institutionalImpact: string;
  institutionalRisk: string;
}

const buildRiskAssessment = (isRecommended: boolean, alertId?: string): Pick<RealPathEntry, 'institutionalImpact' | 'institutionalRisk'> => {
  if (isRecommended) {
    return {
      institutionalImpact: 'Mantém alinhamento com o protocolo e fortalece a rastreabilidade da decisão.',
      institutionalRisk: 'Baixo risco institucional por conformidade com o fluxo recomendado.'
    };
  }

  if (alertId) {
    return {
      institutionalImpact: 'Desalinhamento com o protocolo pode atrasar proteção e comprometer o cuidado.',
      institutionalRisk: `Risco institucional elevado por acionamento do alerta ${alertId}.`
    };
  }

  return {
    institutionalImpact: 'Fluxo divergente pode reduzir previsibilidade da resposta e da documentação.',
    institutionalRisk: 'Risco institucional moderado por quebra de padronização do protocolo.'
  };
};

export const ScenarioPlayer: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [trainingMode, setTrainingMode] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showRationale, setShowRationale] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [realPath, setRealPath] = useState<RealPathEntry[]>([]);

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
      const parsed = JSON.parse(raw) as { selectedScenarioId: string | null; stepIndex: number; score: number; trainingMode: boolean };
      setSelectedScenarioId(parsed.selectedScenarioId);
      setStepIndex(parsed.stepIndex || 0);
      setScore(parsed.score || 0);
      setTrainingMode(Boolean(parsed.trainingMode));
    } catch {
      // noop
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedScenarioId, stepIndex, score, trainingMode }));
  }, [selectedScenarioId, stepIndex, score, trainingMode]);

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

  const currentStep = scenario?.treeTraversal[stepIndex];

  const recommendedPath = useMemo(() => {
    if (!scenario) return [] as ScenarioStep[];
    const explicitRecommended = scenario.treeTraversal.filter((step) => step.isRecommended);
    return explicitRecommended.length > 0 ? explicitRecommended : scenario.treeTraversal;
  }, [scenario]);

  const divergences = useMemo(() => {
    return realPath.filter((entry) => !entry.isRecommended);
  }, [realPath]);

  const trainingOptions = useMemo<TrainingOption[]>(() => {
    if (!trainingMode || !currentStep) return [];
    const correct: TrainingOption = {
      id: `correct-${currentStep.step}`,
      label: `${currentStep.actor}: ${currentStep.action}`,
      isCorrect: true,
      alertId: currentStep.alertTriggered
    };

    const distractorAlerts = ALERTS_DATA.filter((alert) => alert.id !== currentStep.alertTriggered).slice(0, 2);
    const distractors: TrainingOption[] = distractorAlerts.map((alert) => ({
      id: `distractor-${alert.id}-${currentStep.step}`,
      label: alert.doNot,
      isCorrect: false,
      alertId: alert.id
    }));

    return [correct, ...distractors].sort((a, b) => a.id.localeCompare(b.id));
  }, [trainingMode, currentStep]);

  const selectedOption = trainingOptions.find((opt) => opt.id === selectedOptionId);
  const selectedAlert = selectedOption?.alertId ? ALERTS_DATA.find((a) => a.id === selectedOption.alertId) : undefined;

  const goToStep = (next: number) => {
    if (!scenario) return;
    const bounded = Math.max(0, Math.min(next, scenario.treeTraversal.length - 1));
    setStepIndex(bounded);
    setSelectedOptionId(null);
    setShowSummary(false);
  };

  const resetTraining = () => {
    setStepIndex(0);
    setScore(0);
    setSelectedOptionId(null);
    setShowSummary(false);
    setRealPath([]);
  };

  const answerTraining = (option: TrainingOption) => {
    if (selectedOptionId || !currentStep) return;
    setSelectedOptionId(option.id);
    if (option.isCorrect) setScore((prev) => prev + 1);

    const assessment = buildRiskAssessment(option.isCorrect, option.alertId);
    const newEntry: RealPathEntry = {
      step: currentStep.step,
      actor: option.isCorrect ? currentStep.actor : 'Ação divergente',
      action: option.label,
      nodeId: currentStep.nodeId,
      isRecommended: option.isCorrect,
      institutionalImpact: assessment.institutionalImpact,
      institutionalRisk: assessment.institutionalRisk
    };

    setRealPath((prev) => {
      const withoutCurrent = prev.filter((entry) => entry.step !== currentStep.step);
      return [...withoutCurrent, newEntry].sort((a, b) => a.step - b.step);
    });
  };

  const concludeScenario = () => {
    if (!scenario) return;
    if (!trainingMode) {
      const defaultRealPath: RealPathEntry[] = scenario.treeTraversal.map((step) => ({
        step: step.step,
        actor: step.actor,
        action: step.action,
        nodeId: step.nodeId,
        isRecommended: true,
        ...buildRiskAssessment(true)
      }));
      setRealPath(defaultRealPath);
    }
    setShowSummary(true);
  };

  if (!scenario || !currentStep) return null;

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
            <option value="">Risco</option><option value="imminent">Iminente</option><option value="high">Alto</option><option value="moderate">Moderado</option><option value="low">Baixo</option>
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
            <button
              key={item.id}
              onClick={() => {
                setSelectedScenarioId(item.id);
                setStepIndex(0);
                setSelectedOptionId(null);
                setShowSummary(false);
                setRealPath([]);
              }}
              className={`rounded-xl border p-3 text-left ${item.id === scenario.id ? 'border-brand-400 bg-brand-50' : 'border-slate-200 bg-white'}`}
            >
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

      {showSummary ? (
        <section className="card p-4 space-y-4">
          <div>
            <h3 className="text-base font-bold">Tela-resumo do cenário</h3>
            <p className="text-sm text-muted">Comparação entre o histórico executado e o percurso recomendado pelo protocolo.</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-xl border border-slate-200 p-3">
              <h4 className="text-sm font-bold uppercase tracking-wide text-muted">Seu percurso</h4>
              <div className="mt-2 space-y-2">
                {(realPath.length > 0 ? realPath : scenario.treeTraversal.map((step) => ({ ...step, isRecommended: true }))).map((entry) => (
                  <div key={`real-${entry.step}`} className="rounded-lg border border-slate-200 p-2 text-sm">
                    <p className="font-semibold">#{entry.step} · {entry.nodeId}</p>
                    <p className="text-xs text-muted">{entry.actor}</p>
                    <p className="mt-1">{entry.action}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3">
              <h4 className="text-sm font-bold uppercase tracking-wide text-emerald-800">Percurso recomendado</h4>
              <div className="mt-2 space-y-2">
                {recommendedPath.map((step) => (
                  <div key={`recommended-${step.step}`} className="rounded-lg border border-emerald-200 p-2 text-sm">
                    <p className="font-semibold">#{step.step} · {step.nodeId}</p>
                    <p className="text-xs text-muted">{step.actor}</p>
                    <p className="mt-1">{step.action}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <article className="rounded-xl border border-amber-200 bg-amber-50 p-3">
            <h4 className="text-sm font-bold uppercase tracking-wide text-amber-900">Divergências, impacto e risco institucional</h4>
            {divergences.length === 0 ? (
              <p className="mt-2 text-sm">✅ Não houve divergências críticas: percurso aderente ao protocolo recomendado.</p>
            ) : (
              <div className="mt-2 space-y-2">
                {divergences.map((entry) => (
                  <div key={`divergence-${entry.step}`} className="rounded-lg border border-amber-200 bg-white p-2 text-sm">
                    <p className="font-semibold">Etapa {entry.step}: {entry.action}</p>
                    <p className="text-xs mt-1"><strong>Impacto:</strong> {entry.institutionalImpact}</p>
                    <p className="text-xs"><strong>Risco institucional:</strong> {entry.institutionalRisk}</p>
                  </div>
                ))}
              </div>
            )}
          </article>

          <div className="flex flex-wrap gap-2">
            <button className="btn-secondary text-xs" onClick={() => setShowSummary(false)}>Voltar ao cenário</button>
            <button className="btn-secondary text-xs" onClick={resetTraining}>Reiniciar cenário</button>
          </div>
        </section>
      ) : (
        <section className="grid gap-4 lg:grid-cols-2">
          <article className="card p-4">
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Árvore percorrida</h3>
            <div className="mt-2 space-y-2">
              {scenario.treeTraversal.map((step, idx) => (
                <div key={`${scenario.id}-${step.step}`} className={`rounded-lg border p-2 text-sm ${idx === stepIndex ? 'border-brand-400 bg-brand-50' : 'border-slate-200'}`}>
                  <p className="font-semibold">#{step.step} · {step.nodeId}</p>
                  <p className="text-xs text-muted">{step.actor}</p>
                </div>
              ))}
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
              </>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <button className="btn-secondary text-xs" onClick={() => goToStep(stepIndex - 1)} disabled={stepIndex === 0}>← Anterior</button>
              <button className="btn-secondary text-xs" onClick={() => goToStep(stepIndex + 1)} disabled={stepIndex === scenario.treeTraversal.length - 1}>Próximo →</button>
              <button className="btn-secondary text-xs" onClick={() => setTrainingMode((v) => !v)}>{trainingMode ? 'Sair do treinamento' : 'Modo treinamento'}</button>
              <button className="btn-secondary text-xs" onClick={resetTraining}>Reset treino</button>
              <button className="btn-secondary text-xs" onClick={concludeScenario} disabled={stepIndex !== scenario.treeTraversal.length - 1}>Concluir cenário</button>
            </div>
          </article>
        </section>
      )}
    </div>
  );
};
