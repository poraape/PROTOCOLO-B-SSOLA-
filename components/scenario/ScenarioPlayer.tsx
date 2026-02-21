import React, { useEffect, useMemo, useState } from 'react';
import { ALERTS_DATA } from '../../data/alerts';
import { SCENARIOS_DATA, SCENARIO_DECISION_META, Scenario, ScenarioStep, Category, Complexity, RiskLevel } from '../../data/scenarios';

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

const STORAGE_KEY = 'scenario-player-training-v2';

interface TrainingOption {
  id: string;
  label: string;
  isCorrect: boolean;
  alertId?: string;
}

export const ScenarioPlayer: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [trainingMode, setTrainingMode] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showRationale, setShowRationale] = useState(true);
  const [guidedOrder, setGuidedOrder] = useState(true);
  const [completedScenarioIds, setCompletedScenarioIds] = useState<string[]>([]);

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
        stepIndex: number;
        score: number;
        trainingMode: boolean;
        guidedOrder?: boolean;
        completedScenarioIds?: string[];
      };
      setSelectedScenarioId(parsed.selectedScenarioId);
      setStepIndex(parsed.stepIndex || 0);
      setScore(parsed.score || 0);
      setTrainingMode(Boolean(parsed.trainingMode));
      setGuidedOrder(parsed.guidedOrder ?? true);
      setCompletedScenarioIds(parsed.completedScenarioIds || []);
    } catch {
      // noop
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedScenarioId, stepIndex, score, trainingMode, guidedOrder, completedScenarioIds }));
  }, [selectedScenarioId, stepIndex, score, trainingMode, guidedOrder, completedScenarioIds]);

  const getPendingPrerequisites = (item: Scenario) => item.prerequisites.filter((id) => !completedScenarioIds.includes(id));

  const filteredScenarios = useMemo(() => {
    return SCENARIOS_DATA
      .filter((s) => (filters.complexity ? s.complexity === filters.complexity : true))
      .filter((s) => (filters.riskLevel ? s.riskLevel === filters.riskLevel : true))
      .filter((s) => (filters.category ? s.category.includes(filters.category) : true))
      .filter((s) => (filters.episodic ? (filters.episodic === 'episodico' ? s.isEpisodic : !s.isEpisodic) : true))
      .filter((s) => (filters.collective ? (filters.collective === 'coletivo' ? s.isCollective : !s.isCollective) : true))
      .sort((a, b) => {
        if (guidedOrder) {
          return a.recommendedOrder - b.recommendedOrder || riskWeight[b.riskLevel] - riskWeight[a.riskLevel];
        }
        return riskWeight[b.riskLevel] - riskWeight[a.riskLevel];
      });
  }, [filters, guidedOrder]);

  const scenario: Scenario | undefined = useMemo(
    () => SCENARIOS_DATA.find((item) => item.id === selectedScenarioId) || filteredScenarios[0],
    [selectedScenarioId, filteredScenarios]
  );

  useEffect(() => {
    if (!selectedScenarioId && filteredScenarios[0]) setSelectedScenarioId(filteredScenarios[0].id);
  }, [selectedScenarioId, filteredScenarios]);

  const pendingPrerequisites = scenario ? getPendingPrerequisites(scenario) : [];

  const suggestedNext = useMemo(
    () => filteredScenarios.find((item) => !completedScenarioIds.includes(item.id) && getPendingPrerequisites(item).length === 0),
    [completedScenarioIds, filteredScenarios]
  );

  const currentStep = scenario?.treeTraversal[stepIndex];

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
  const scenarioDecisionMeta = SCENARIO_DECISION_META[scenario?.id || ''];
  const isRiskDecision = Boolean(selectedOption && (!selectedOption.isCorrect || selectedAlert?.severity === 'critical'));

  const protocolAlignmentText = selectedOption
    ? selectedOption.isCorrect
      ? `${scenarioDecisionMeta?.protocolAlignment || 'Decisão alinhada ao fluxo institucional.'} (${currentStep.rationale})`
      : `Decisão desalinhada ao protocolo. ${selectedAlert?.reason || 'Há risco de conduta inadequada para proteção do estudante.'}`
    : '';

  const probableImpactText = selectedOption
    ? selectedOption.isCorrect
      ? scenarioDecisionMeta?.probableImpact || 'Tende a fortalecer proteção e continuidade do cuidado.'
      : `Impacto provável negativo: ${selectedAlert?.reason || 'pode aumentar risco e romper vínculo de cuidado.'}`
    : '';

  const legalReferences = selectedOption
    ? selectedOption.isCorrect
      ? scenarioDecisionMeta?.legalInstitutionalReference || []
      : selectedAlert?.legalInstitutionalReference || scenarioDecisionMeta?.legalInstitutionalReference || []
    : [];

  const goToStep = (next: number) => {
    if (!scenario) return;
    const bounded = Math.max(0, Math.min(next, scenario.treeTraversal.length - 1));
    const hasStepChanged = bounded !== stepIndex;
    setStepIndex(bounded);
    setSelectedOptionId(null);
    if (hasStepChanged) {
      setShowRationale(!trainingMode && next > stepIndex);
    }
  };

  const resetScenarioProgress = () => {
    setStepIndex(0);
    setSelectedOptionId(null);
    setScore(0);
  };

  const handleExitTrainingMode = () => {
    resetScenarioProgress();
    setTrainingMode(false);
  };

  const answerTraining = (option: TrainingOption) => {
    if (selectedOptionId) return;
    setSelectedOptionId(option.id);
    setShowRationale(true);
    if (option.isCorrect) setScore((prev) => prev + 1);
  };

  const markScenarioCompleted = () => {
    if (!scenario) return;
    setCompletedScenarioIds((prev) => (prev.includes(scenario.id) ? prev : [...prev, scenario.id]));
  };

  if (!scenario || !currentStep) return null;

  return (
    <div className="space-y-4">
      <section className="card p-4">
        <div className="sticky top-0 z-10 -mx-4 -mt-4 mb-3 flex flex-wrap items-center justify-between gap-2 border-b bg-white/95 px-4 py-3 backdrop-blur">
          <div>
            <h2 className="text-xl font-extrabold">ScenarioPlayer</h2>
            <p className="text-sm text-muted">Treinamento de travessia com cenários locais (offline), filtros e modo prática.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="btn-secondary text-xs" onClick={resetScenarioProgress}>Reiniciar cenário atual</button>
            <button className="btn-secondary text-xs" onClick={handleExitTrainingMode} disabled={!trainingMode}>Sair do modo treinamento</button>
          </div>
        </div>

        <label className="mt-3 flex items-center gap-2 text-xs text-muted">
          <input type="checkbox" checked={guidedOrder} onChange={(e) => setGuidedOrder(e.target.checked)} />
          Ordenação guiada por trilha (simples → complexo)
        </label>
        {guidedOrder && suggestedNext ? (
          <p className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
            Próxima sugestão: <strong>{suggestedNext.id}</strong> ({suggestedNext.title})
          </p>
        ) : null}

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
                resetScenarioProgress();
              }}
              className={`rounded-xl border p-3 text-left ${item.id === scenario.id ? 'border-brand-400 bg-brand-50' : 'border-slate-200 bg-white'}`}
            >
              <p className="font-semibold">{item.title}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                <span className="badge">trilha: nível {item.level}</span>
                <span className="badge">ordem: {item.recommendedOrder}</span>
                <span>{complexityIcon[item.complexity]} {item.complexity}</span>
                <span className="badge">risco: {item.riskLevel}</span>
                <span className="badge">{item.isEpisodic ? 'episódico' : 'crônico'}</span>
                <span className="badge">{item.isCollective ? 'coletivo' : 'individual'}</span>
                {getPendingPrerequisites(item).length > 0 ? <span className="badge">pré-req pendente</span> : null}
                {completedScenarioIds.includes(item.id) ? <span className="badge">concluído</span> : null}
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
            {scenario.treeTraversal.map((step, idx) => (
              <div key={`${scenario.id}-${step.step}`} className={`rounded-lg border p-2 text-sm ${idx === stepIndex ? 'border-brand-400 bg-brand-50' : 'border-slate-200'}`}>
                <p className="font-semibold">#{step.step} · {step.label}</p>
                <p className="text-xs text-muted">{step.actor}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="card p-4">
          {pendingPrerequisites.length > 0 ? (
            <div className="mb-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
              ⚠️ Progressão sugerida: este cenário recomenda concluir antes {pendingPrerequisites.join(', ')}. Você pode continuar mesmo assim.
            </div>
          ) : null}
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Passo atual</h3>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${actorClass[actorTone(currentStep.actor)]}`}>{currentStep.actor}</span>
          </div>

          <p className="mt-2 text-xs text-muted">Etapa {currentStep.step} de {scenario.treeTraversal.length}</p>

          {trainingMode ? (
            <>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-muted">1. Decidir</p>
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
                <div className="mt-3 space-y-2">
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">
                    <p>{selectedOption.isCorrect ? '✅ Resposta correta.' : '❌ Resposta incorreta.'}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
                    <p className="font-semibold">1) Alinhamento ao protocolo</p>
                    <p className="mt-1 text-xs">{protocolAlignmentText}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
                    <p className="font-semibold">2) Impacto provável da decisão</p>
                    <p className="mt-1 text-xs">{probableImpactText}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
                    <p className="font-semibold">3) Referência legal/institucional</p>
                    {legalReferences.length > 0 ? (
                      <ul className="mt-1 list-disc pl-5 text-xs">
                        {legalReferences.map((reference) => (
                          <li key={`${selectedOption.id}-${reference}`}>{reference}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1 text-xs">Referência institucional não informada para esta alternativa.</p>
                    )}
                  </div>
                  {isRiskDecision ? (
                    <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm">
                      <p className="font-semibold">O que fazer diferente</p>
                      <p className="mt-1 text-xs">{selectedAlert?.doInstead || scenarioDecisionMeta?.whatToDoDifferently || 'Retome o protocolo e priorize proteção imediata com registro formal.'}</p>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted">2. Aprender</p>
              {showRationale ? (
                <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-muted">
                  {currentStep.rationale}
                </div>
              ) : (
                <p className="mt-2 text-xs text-muted">Confirme sua decisão para liberar o rationale.</p>
              )}

              <p className="mt-2 text-sm font-semibold">Score: {score}/{scenario.treeTraversal.length}</p>
            </>
          ) : (
            <>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-muted">1. Decidir</p>
              <p className="mt-2 text-sm">{currentStep.action}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted">2. Aprender</p>
              {showRationale ? (
                <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-muted">
                  {currentStep.rationale}
                </div>
              ) : (
                <p className="mt-2 text-xs text-muted">Avance para a próxima etapa para liberar o rationale.</p>
              )}
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
            <button className="btn-secondary text-xs" onClick={markScenarioCompleted}>Marcar cenário como concluído</button>
          </div>
        </article>
      </section>
    </div>
  );
};
