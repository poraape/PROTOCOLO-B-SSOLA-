import React, { useEffect, useMemo, useState } from 'react';
import { ALERTS_DATA } from '../../data/alerts';
import { SCENARIOS_DATA, Scenario, Category, Complexity, RiskLevel } from '../../data/scenarios';

type SimulatorMode = 'guided' | 'challenge';

const STORAGE_KEY = 'scenario-player-training-v3';
const riskWeight: Record<RiskLevel, number> = { imminent: 4, high: 3, moderate: 2, low: 1 };

const riskMeta: Record<RiskLevel, { icon: string; label: string; short: string }> = {
  low: { icon: '🟢', label: 'Baixo', short: 'B' },
  moderate: { icon: '🟡', label: 'Moderado', short: 'M' },
  high: { icon: '🟠', label: 'Alto', short: 'A' },
  imminent: { icon: '🔴', label: 'Iminente', short: 'I' }
};

const categoryShort: Record<Category, string> = {
  pedagogical: 'P',
  mental_health: 'S',
  physical_health: 'C',
  violence: 'V',
  substances: 'D',
  family_conflict: 'F',
  neglect: 'N',
  inclusion: 'I',
  sexual_health: 'SX'
};

interface TrainingOption {
  id: string;
  label: string;
  isRecommended: boolean;
  alertId?: string;
  impact: string;
}

const urgencyLabelByRiskLevel: Record<RiskLevel, string> = {
  imminent: 'Alta Urgência — Providenciar hoje',
  high: 'Alta Urgência — Providenciar nos próximos 2 dias',
  moderate: 'Atenção — Providenciar esta semana (7 dias)',
  low: 'Acompanhamento — Monitorar no mês'
};

const categoryTeacherLabel: Record<string, string> = {
  pedagogical: 'Pedagógico',
  mental_health: 'Saúde Mental',
  social: 'Vulnerabilidade Social',
  conflict: 'Conflitos',
  rights: 'Violação de Direitos',
  behavior: 'Comportamento Grave',
  substance: 'Uso de Substâncias',
  physical_health: 'Saúde Física',
  violence: 'Violências',
  substances: 'Substâncias',
  family_conflict: 'Conflitos',
  neglect: 'Negligência',
  inclusion: 'Inclusão',
  sexual_health: 'Saúde Sexual'
};

const chipVariantByRiskLevel: Record<RiskLevel, 'emergency' | 'urgent' | 'support' | 'neutral'> = {
  imminent: 'emergency',
  high: 'urgent',
  moderate: 'support',
  low: 'neutral'
};

export const ScenarioPlayer: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [mode, setMode] = useState<SimulatorMode>('guided');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [showHistory, setShowHistory] = useState(false);

  const [filters, setFilters] = useState<{
    complexity: '' | Complexity;
    riskLevel: '' | RiskLevel;
    category: '' | Category;
  }>({ complexity: '', riskLevel: '', category: '' });

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as {
        selectedScenarioId: string | null;
        stepIndex: number;
        mode: SimulatorMode;
        score: number;
      };
      setSelectedScenarioId(parsed.selectedScenarioId);
      setStepIndex(parsed.stepIndex || 0);
      setMode(parsed.mode || 'guided');
      setScore(parsed.score || 0);
    } catch {
      // noop
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedScenarioId, stepIndex, mode, score }));
  }, [selectedScenarioId, stepIndex, mode, score]);

  const filteredScenarios = useMemo(() => {
    return SCENARIOS_DATA
      .filter((s) => (filters.complexity ? s.complexity === filters.complexity : true))
      .filter((s) => (filters.riskLevel ? s.riskLevel === filters.riskLevel : true))
      .filter((s) => (filters.category ? s.category.includes(filters.category) : true))
      .sort((a, b) => riskWeight[b.riskLevel] - riskWeight[a.riskLevel]);
  }, [filters]);

  useEffect(() => {
    if (!selectedScenarioId && filteredScenarios[0]) setSelectedScenarioId(filteredScenarios[0].id);
    if (selectedScenarioId && !filteredScenarios.find((item) => item.id === selectedScenarioId)) {
      setSelectedScenarioId(filteredScenarios[0]?.id ?? null);
      setStepIndex(0);
      setSelectedOptionId(null);
      setShowFeedback(false);
    }
  }, [filteredScenarios, selectedScenarioId]);

  const scenario = useMemo(
    () => SCENARIOS_DATA.find((item) => item.id === selectedScenarioId) || filteredScenarios[0],
    [selectedScenarioId, filteredScenarios]
  );

  const currentStep = scenario?.treeTraversal[stepIndex];

  const options = useMemo<TrainingOption[]>(() => {
    if (!currentStep) return [];

    const recommended: TrainingOption = {
      id: `recommended-${currentStep.step}`,
      label: currentStep.action,
      isRecommended: true,
      alertId: currentStep.alertTriggered,
      impact: 'Protege o estudante e mantém aderência ao protocolo institucional.'
    };

    const alternatives = ALERTS_DATA.filter((alert) => alert.id !== currentStep.alertTriggered)
      .slice(0, 2)
      .map((alert) => ({
        id: `distractor-${alert.id}-${currentStep.step}`,
        label: alert.doNot,
        isRecommended: false,
        alertId: alert.id,
        impact: 'A decisão pode elevar risco e atrasar a rede de proteção.'
      }));

    return [recommended, ...alternatives].sort((a, b) => a.id.localeCompare(b.id));
  }, [currentStep]);

  const selectedOption = options.find((option) => option.id === selectedOptionId);
  const selectedAlert = selectedOption?.alertId ? ALERTS_DATA.find((item) => item.id === selectedOption.alertId) : undefined;

  const resetSession = () => {
    setStepIndex(0);
    setSelectedOptionId(null);
    setShowFeedback(false);
    setScore(0);
  };

  const goToStep = (nextIndex: number) => {
    if (!scenario) return;
    const bounded = Math.max(0, Math.min(nextIndex, scenario.treeTraversal.length - 1));
    setStepIndex(bounded);
    setSelectedOptionId(null);
    setShowFeedback(false);
  };

  const answer = (option: TrainingOption) => {
    if (selectedOptionId) return;
    setSelectedOptionId(option.id);
    if (option.isRecommended) setScore((prev) => prev + 1);
    if (mode === 'guided') setShowFeedback(true);
  };

  if (!scenario || !currentStep) return null;

  const progress = Math.round(((stepIndex + 1) / scenario.treeTraversal.length) * 100);
  const risk = riskMeta[scenario.riskLevel];

  return (
    <div className="space-y-4">
      <section className="card-surface p-4" aria-label="Cabeçalho do simulador">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold">Simulador institucional Bússola</h2>
            <p className="text-sm text-muted">Treinamento seguro: sem registro real, com foco em decisão rápida e aprendizagem ativa.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="ui-btn ui-btn--secondary text-xs" onClick={() => setMode((m) => (m === 'guided' ? 'challenge' : 'guided'))} aria-label="Alternar modo de simulação">
              {mode === 'guided' ? 'Modo: Guiado' : 'Modo: Desafio'}
            </button>
            <button className="ui-btn ui-btn--secondary text-xs" onClick={resetSession}>Resetar</button>
          </div>
        </div>

        <div className="mt-3 grid gap-2 md:grid-cols-4">
          <select className="rounded-lg border px-2 py-1 text-sm" value={filters.complexity} onChange={(e) => setFilters((f) => ({ ...f, complexity: e.target.value as '' | Complexity }))}>
            <option value="">Complexidade</option><option value="low">Baixa</option><option value="medium">Média</option><option value="high">Alta</option>
          </select>
          <select className="rounded-lg border px-2 py-1 text-sm" value={filters.riskLevel} onChange={(e) => setFilters((f) => ({ ...f, riskLevel: e.target.value as '' | RiskLevel }))}>
            <option value="">Risco</option><option value="imminent">Iminente</option><option value="high">Alto</option><option value="moderate">Moderado</option><option value="low">Baixo</option>
          </select>
          <select className="rounded-lg border px-2 py-1 text-sm" value={filters.category} onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value as '' | Category }))}>
            <option value="">Categoria</option><option value="pedagogical">{categoryTeacherLabel.pedagogical}</option><option value="mental_health">{categoryTeacherLabel.mental_health}</option><option value="physical_health">{categoryTeacherLabel.physical_health}</option><option value="violence">{categoryTeacherLabel.violence}</option><option value="substances">{categoryTeacherLabel.substances}</option><option value="family_conflict">{categoryTeacherLabel.family_conflict}</option><option value="neglect">{categoryTeacherLabel.neglect}</option><option value="inclusion">{categoryTeacherLabel.inclusion}</option><option value="sexual_health">{categoryTeacherLabel.sexual_health}</option>
          </select>
          <select className="rounded-lg border px-2 py-1 text-sm" value={scenario.id} onChange={(e) => { setSelectedScenarioId(e.target.value); resetSession(); }} aria-label="Selecionar cenário">
            {filteredScenarios.map((item) => <option key={item.id} value={item.id}>{item.id} · {item.title}</option>)}
          </select>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100" aria-label="Progresso do cenário">
          <div className="h-full rounded-full bg-brand-600" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-1 text-xs text-muted">Etapa {stepIndex + 1}/{scenario.treeTraversal.length} • Score {score}/{scenario.treeTraversal.length}</p>
      </section>

      <section className="card-surface p-4" aria-label="Zona 1 contexto">
        <h3 className="text-xs font-bold uppercase tracking-wide text-muted">Zona 1 · Contexto do cenário</h3>
        <p className="mt-1 text-lg font-bold">{scenario.id}: {scenario.title}</p>
        <span className={`chip chip--${chipVariantByRiskLevel[scenario.riskLevel]}`} title="Urgência em linguagem simples para professoras(es)">
          {urgencyLabelByRiskLevel[scenario.riskLevel]}
        </span>
        <p className="mt-2 text-xs text-muted">
          Categoria principal: {categoryTeacherLabel[scenario.category[0]] ?? categoryShort[scenario.category[0]]} · Prazo de acompanhamento: {scenario.followUpDays} dias.
        </p>
        <p className="mt-2 text-sm">{scenario.trigger}</p>
        <details className="mt-2 text-sm text-muted">
          <summary className="cursor-pointer font-semibold">Ver detalhes territoriais e perfil</summary>
          <p className="mt-1">{scenario.territorialContext}</p>
          <p className="mt-1">{scenario.studentProfile}</p>
        </details>
      </section>

      <section className="card-surface p-4" aria-label="Zona 2 decisão">
        <h3 className="text-xs font-bold uppercase tracking-wide text-muted">Zona 2 · Decisão atual</h3>
        <p className="mt-2 text-xl font-black">O QUE FAZER AGORA?</p>
        <p className="text-sm text-muted">Responsável da etapa: <strong>{currentStep.actor}</strong></p>

        <div className="mt-3 space-y-2" role="radiogroup" aria-label="Opções de decisão">
          {options.map((option) => (
            <button
              key={option.id}
              className={`w-full rounded-lg border px-3 py-2 text-left text-sm ${selectedOptionId === option.id ? 'border-brand-400 bg-brand-50' : 'border-slate-300 bg-white'}`}
              onClick={() => answer(option)}
              aria-pressed={selectedOptionId === option.id}
            >
              {selectedOptionId === option.id ? '●' : '○'} {option.label}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <button className="ui-btn ui-btn--secondary text-xs" onClick={() => goToStep(stepIndex - 1)} disabled={stepIndex === 0}>← Etapa anterior</button>
          <button className="ui-btn ui-btn--secondary text-xs" onClick={() => goToStep(stepIndex + 1)} disabled={stepIndex === scenario.treeTraversal.length - 1}>Próxima etapa →</button>
          {mode === 'challenge' && selectedOptionId && !showFeedback ? <button className="ui-btn ui-btn--secondary text-xs" onClick={() => setShowFeedback(true)}>Confirmar decisão</button> : null}
        </div>
      </section>

      <section className="card-surface p-4" aria-label="Zona 3 feedback">
        <h3 className="text-xs font-bold uppercase tracking-wide text-muted">Zona 3 · Feedback pedagógico</h3>
        {!showFeedback ? (
          <p className="mt-2 text-sm text-muted">O feedback aparece após a confirmação da decisão.</p>
        ) : (
          <div className="mt-2 space-y-2 text-sm">
            <p className="font-semibold">{selectedOption?.isRecommended ? '✅ Alinhada ao protocolo institucional.' : '⚠️ Decisão com risco de exposição/omissão.'}</p>
            <p><strong>Impacto simulado:</strong> {selectedOption?.impact}</p>
            <details>
              <summary className="cursor-pointer text-xs font-semibold text-muted">Por que esta decisão?</summary>
              <p className="mt-1 text-xs text-muted">{currentStep.rationale}</p>
            </details>
            {selectedAlert ? (
              <details>
                <summary className="cursor-pointer text-xs font-semibold text-muted">Legislação e alerta institucional</summary>
                <div className="mt-1 rounded-lg border border-amber-200 bg-amber-50 p-2 text-xs">
                  <p className="font-semibold">📢 {selectedAlert.id}</p>
                  <p><em>{selectedAlert.doInstead}</em></p>
                  <p className="mt-1">{selectedAlert.reason}</p>
                </div>
              </details>
            ) : null}
          </div>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="card-surface p-4" aria-label="Zona 4 histórico">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wide text-muted">Zona 4 · Histórico</h3>
            <button className="ui-btn ui-btn--secondary text-xs" onClick={() => setShowHistory((v) => !v)}>{showHistory ? 'Recolher' : 'Expandir'}</button>
          </div>
          <ol className="mt-2 space-y-2">
            {(showHistory ? scenario.treeTraversal : scenario.treeTraversal.slice(0, Math.max(stepIndex + 1, 2))).map((step, index) => (
              <li key={`${scenario.id}-${step.step}`} className={`rounded-lg border p-2 text-sm ${index === stepIndex ? 'border-brand-400 bg-brand-50' : 'border-slate-200'}`}>
                <p className="font-semibold">{index + 1}. {step.action}</p>
                <p className="text-xs text-muted">{step.actor}</p>
              </li>
            ))}
          </ol>
        </article>

        <article className="card-surface p-4" aria-label="Zona 5 aprendizado">
          <h3 className="text-xs font-bold uppercase tracking-wide text-muted">Zona 5 · Aprendizado acumulado</h3>
          <p className="mt-2 text-sm font-semibold">Badges ativos</p>
          <div className="mt-1 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-slate-300 px-2 py-1">Escuta protegida</span>
            <span className="rounded-full border border-slate-300 px-2 py-1">Notificação obrigatória</span>
            <span className="rounded-full border border-slate-300 px-2 py-1">Registro objetivo</span>
          </div>
          <p className="mt-3 text-sm text-muted">Cenários treinados: {Math.max(1, Math.round((score / Math.max(1, scenario.treeTraversal.length)) * 5))}/28</p>
          <p className="text-sm text-muted">Evolução simulada: +{Math.max(5, Math.round((score / Math.max(1, scenario.treeTraversal.length)) * 25))}%</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="ui-btn ui-btn--secondary text-xs" onClick={resetSession}>Reset</button>
            <button className="ui-btn ui-btn--secondary text-xs" onClick={() => setSelectedScenarioId(filteredScenarios[0]?.id || scenario.id)}>Sair do cenário</button>
          </div>
        </article>
      </section>
    </div>
  );
};
