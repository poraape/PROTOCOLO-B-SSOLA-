import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ALERTS_DATA } from '../../data/alerts';
import { SCENARIO_DECISION_META, SCENARIOS_DATA, Scenario, ScenarioStep } from '../../data/scenarios';
import { RealPathEntry, SimulatorContextValue, SimulatorFilters, TrainingOption } from '../../types/simulator';

const STORAGE_KEY = 'scenario-player-training-v3';
const riskWeight = { imminent: 4, high: 3, moderate: 2, low: 1 } as const;

const defaultFilters: SimulatorFilters = { complexity: '', riskLevel: '', category: '', episodic: '', collective: '' };

const SimulatorContext = createContext<SimulatorContextValue | null>(null);

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

export const SimulatorProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [visitedStepIds, setVisitedStepIds] = useState<string[]>([]);
  const [trainingMode, setTrainingMode] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showRationale, setShowRationale] = useState(true);
  const [guidedOrder, setGuidedOrder] = useState(true);
  const [completedScenarioIds, setCompletedScenarioIds] = useState<string[]>([]);
  const [realPath, setRealPath] = useState<RealPathEntry[]>([]);
  const [filters, setFilters] = useState<SimulatorFilters>(defaultFilters);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Partial<SimulatorContextValue> & {
        selectedScenarioId?: string | null;
        currentStepId?: string | null;
        visitedStepIds?: string[];
        selectedOptionId?: string | null;
      };
      setSelectedScenarioId(parsed.selectedScenarioId ?? null);
      setCurrentStepId(parsed.currentStepId ?? null);
      setVisitedStepIds(Array.isArray(parsed.visitedStepIds) ? parsed.visitedStepIds : []);
      setTrainingMode(Boolean(parsed.trainingMode));
      setSelectedOptionId(parsed.selectedOptionId ?? null);
      setScore(parsed.score ?? 0);
      setShowRationale(parsed.showRationale ?? true);
      setGuidedOrder(parsed.guidedOrder ?? true);
      setCompletedScenarioIds(parsed.completedScenarioIds ?? []);
      setRealPath(parsed.realPath ?? []);
      setFilters(parsed.filters ?? defaultFilters);
    } catch {
      // noop
    }
  }, []);

  const filteredScenarios = useMemo(
    () =>
      SCENARIOS_DATA.filter((s) => (filters.complexity ? s.complexity === filters.complexity : true))
        .filter((s) => (filters.riskLevel ? s.riskLevel === filters.riskLevel : true))
        .filter((s) => (filters.category ? s.category.includes(filters.category) : true))
        .filter((s) => (filters.episodic ? (filters.episodic === 'episodico' ? s.isEpisodic : !s.isEpisodic) : true))
        .filter((s) => (filters.collective ? (filters.collective === 'coletivo' ? s.isCollective : !s.isCollective) : true))
        .sort((a, b) => (guidedOrder ? a.recommendedOrder - b.recommendedOrder : 0) || riskWeight[b.riskLevel] - riskWeight[a.riskLevel]),
    [filters, guidedOrder]
  );

  const scenario: Scenario | undefined = useMemo(
    () => SCENARIOS_DATA.find((item) => item.id === selectedScenarioId) || filteredScenarios[0],
    [selectedScenarioId, filteredScenarios]
  );

  useEffect(() => {
    if (!selectedScenarioId && filteredScenarios[0]) {
      setSelectedScenarioId(filteredScenarios[0].id);
    }
  }, [filteredScenarios, selectedScenarioId]);

  useEffect(() => {
    if (!scenario) return;
    const hasCurrent = Boolean(currentStepId && scenario.treeTraversal.some((step) => step.nodeId === currentStepId));
    if (!hasCurrent) {
      const first = scenario.treeTraversal[0]?.nodeId;
      setCurrentStepId(first || null);
      setVisitedStepIds(first ? [first] : []);
    }
  }, [scenario, currentStepId]);

  const currentStepIndex = useMemo(
    () => (scenario ? Math.max(0, scenario.treeTraversal.findIndex((step) => step.nodeId === currentStepId)) : 0),
    [scenario, currentStepId]
  );

  const currentStep = scenario?.treeTraversal[currentStepIndex];

  const recommendedPath = useMemo<ScenarioStep[]>(() => {
    if (!scenario) return [];
    const explicit = scenario.treeTraversal.filter((step) => step.options.some((option) => option.isRecommended));
    return explicit.length ? explicit : scenario.treeTraversal;
  }, [scenario]);

  const divergences = useMemo(() => realPath.filter((entry) => !entry.isRecommended), [realPath]);

  const trainingOptions = useMemo<TrainingOption[]>(() => {
    if (!trainingMode || !currentStep) return [];
    const recommendedOption = currentStep.options.find((option) => option.isRecommended);
    const correct: TrainingOption = {
      id: `correct-${currentStep.nodeId}`,
      label: `${currentStep.actor}: ${currentStep.action}`,
      isCorrect: true,
      alertId: currentStep.alertTriggered
    };
    const distractors = ALERTS_DATA.filter((alert) => alert.id !== currentStep.alertTriggered)
      .slice(0, 2)
      .map((alert, index) => ({
        id: `distractor-${alert.id}-${currentStep.nodeId}`,
        label: currentStep.options[index]?.impact || alert.doNot,
        isCorrect: false,
        alertId: alert.id
      }));

    return [{ ...correct, label: recommendedOption ? `${correct.label} (${recommendedOption.impact})` : correct.label }, ...distractors];
  }, [trainingMode, currentStep]);

  const selectScenario = (id: string) => {
    const selected = SCENARIOS_DATA.find((item) => item.id === id);
    setSelectedScenarioId(id);
    setSelectedOptionId(null);
    setScore(0);
    setRealPath([]);
    const first = selected?.treeTraversal[0]?.nodeId || null;
    setCurrentStepId(first);
    setVisitedStepIds(first ? [first] : []);
    setShowRationale(true);
  };

  const goToStepById = (stepId: string) => {
    setCurrentStepId(stepId);
    setVisitedStepIds((prev) => [...prev, stepId]);
    setSelectedOptionId(null);
    setShowRationale(!trainingMode);
  };

  const goBackInHistory = () => {
    setVisitedStepIds((prev) => {
      if (prev.length <= 1) return prev;
      const next = prev.slice(0, -1);
      setCurrentStepId(next[next.length - 1] || null);
      return next;
    });
    setSelectedOptionId(null);
  };

  const resetTraining = () => {
    if (!scenario) return;
    setSelectedOptionId(null);
    setScore(0);
    setRealPath([]);
    setCurrentStepId(scenario.treeTraversal[0]?.nodeId || null);
    setVisitedStepIds(scenario.treeTraversal[0] ? [scenario.treeTraversal[0].nodeId] : []);
  };

  const answerTraining = (option: TrainingOption) => {
    if (!currentStep || selectedOptionId) return;
    setSelectedOptionId(option.id);
    setShowRationale(true);
    if (option.isCorrect) setScore((prev) => prev + 1);
    const assessment = buildRiskAssessment(option.isCorrect, option.alertId);
    const entry: RealPathEntry = {
      step: currentStep.step,
      actor: option.isCorrect ? currentStep.actor : 'Ação divergente',
      action: option.label,
      nodeId: currentStep.nodeId,
      isRecommended: option.isCorrect,
      ...assessment
    };
    setRealPath((prev) => [...prev.filter((item) => item.step !== currentStep.step), entry].sort((a, b) => a.step - b.step));
  };

  const markScenarioCompleted = () => {
    if (!scenario) return;
    setCompletedScenarioIds((prev) => (prev.includes(scenario.id) ? prev : [...prev, scenario.id]));
  };

  const getPendingPrerequisites = (item: Scenario) => item.prerequisites.filter((id) => !completedScenarioIds.includes(id));
  const pendingPrerequisites = scenario ? getPendingPrerequisites(scenario) : [];
  const suggestedNext = filteredScenarios.find((item) => !completedScenarioIds.includes(item.id) && getPendingPrerequisites(item).length === 0);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selectedScenarioId,
        currentStepId,
        visitedStepIds,
        trainingMode,
        selectedOptionId,
        score,
        showRationale,
        guidedOrder,
        completedScenarioIds,
        realPath,
        filters
      })
    );
  }, [selectedScenarioId, currentStepId, visitedStepIds, trainingMode, selectedOptionId, score, showRationale, guidedOrder, completedScenarioIds, realPath, filters]);

  const value: SimulatorContextValue = {
    filters,
    setFilters,
    guidedOrder,
    setGuidedOrder,
    filteredScenarios,
    scenario,
    selectedScenarioId,
    selectScenario,
    pendingPrerequisites,
    suggestedNext,
    currentStep,
    currentStepIndex,
    visitedStepIds,
    goToStepById,
    goBackInHistory,
    trainingMode,
    setTrainingMode,
    trainingOptions,
    selectedOptionId,
    answerTraining,
    showRationale,
    setShowRationale,
    score,
    resetTraining,
    markScenarioCompleted,
    completedScenarioIds,
    realPath,
    recommendedPath,
    divergences
  };

  return <SimulatorContext.Provider value={value}>{children}</SimulatorContext.Provider>;
};

export const useSimulator = (): SimulatorContextValue => {
  const context = useContext(SimulatorContext);
  if (!context) throw new Error('useSimulator must be used inside SimulatorProvider');
  return context;
};

export const useDecisionMeta = (scenarioId: string | undefined, selectedOptionId: string | null, trainingOptions: TrainingOption[], currentStep?: ScenarioStep) => {
  const selectedOption = trainingOptions.find((option) => option.id === selectedOptionId);
  const selectedAlert = selectedOption?.alertId ? ALERTS_DATA.find((alert) => alert.id === selectedOption.alertId) : undefined;
  const meta = SCENARIO_DECISION_META[scenarioId || ''];

  const protocolAlignmentText = selectedOption
    ? selectedOption.isCorrect
      ? `${meta?.protocolAlignment || 'Decisão alinhada ao fluxo institucional.'} (${currentStep?.rationale || ''})`
      : `Decisão desalinhada ao protocolo. ${selectedAlert?.reason || 'Há risco de conduta inadequada para proteção do estudante.'}`
    : '';

  const probableImpactText = selectedOption
    ? selectedOption.isCorrect
      ? meta?.probableImpact || 'Tende a fortalecer proteção e continuidade do cuidado.'
      : `Impacto provável negativo: ${selectedAlert?.reason || 'pode aumentar risco e romper vínculo de cuidado.'}`
    : '';

  const legalReferences = selectedOption
    ? selectedOption.isCorrect
      ? meta?.legalInstitutionalReference || []
      : selectedAlert?.legalInstitutionalReference || meta?.legalInstitutionalReference || []
    : [];

  const isRiskDecision = Boolean(selectedOption && (!selectedOption.isCorrect || selectedAlert?.severity === 'critical'));
  return { selectedOption, selectedAlert, protocolAlignmentText, probableImpactText, legalReferences, isRiskDecision, meta };
};
