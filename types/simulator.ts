import type React from 'react';
import { Category, Complexity, RiskLevel, Scenario, ScenarioStep } from '../data/scenarios';

export interface SimulatorFilters {
  complexity: '' | Complexity;
  riskLevel: '' | RiskLevel;
  category: '' | Category;
  episodic: '' | 'episodico' | 'cronico';
  collective: '' | 'coletivo' | 'individual';
}

export interface TrainingOption {
  id: string;
  label: string;
  isCorrect: boolean;
  alertId?: string;
}

export interface RealPathEntry {
  step: number;
  actor: string;
  action: string;
  nodeId: string;
  isRecommended: boolean;
  institutionalImpact: string;
  institutionalRisk: string;
}

export interface SimulatorContextValue {
  filters: SimulatorFilters;
  setFilters: React.Dispatch<React.SetStateAction<SimulatorFilters>>;
  guidedOrder: boolean;
  setGuidedOrder: React.Dispatch<React.SetStateAction<boolean>>;
  filteredScenarios: Scenario[];
  scenario?: Scenario;
  selectedScenarioId: string | null;
  selectScenario: (id: string) => void;
  pendingPrerequisites: string[];
  suggestedNext?: Scenario;
  currentStep?: ScenarioStep;
  currentStepIndex: number;
  visitedStepIds: string[];
  goToStepById: (stepId: string) => void;
  goBackInHistory: () => void;
  trainingMode: boolean;
  setTrainingMode: React.Dispatch<React.SetStateAction<boolean>>;
  trainingOptions: TrainingOption[];
  selectedOptionId: string | null;
  answerTraining: (option: TrainingOption) => void;
  showRationale: boolean;
  setShowRationale: React.Dispatch<React.SetStateAction<boolean>>;
  score: number;
  resetTraining: () => void;
  markScenarioCompleted: () => void;
  completedScenarioIds: string[];
  realPath: RealPathEntry[];
  recommendedPath: ScenarioStep[];
  divergences: RealPathEntry[];
}

export interface SimulatorExplorationProps {
  categoryIcon: Record<Category, string>;
  complexityIcon: Record<Complexity, string>;
  riskVisual: Record<RiskLevel, { label: string; className: string }>;
}

export interface SimulatorDecisionProps {
  actorClass: Record<'brand' | 'emerald' | 'violet' | 'amber' | 'slate', string>;
  actorTone: (actor: string) => 'brand' | 'emerald' | 'violet' | 'amber' | 'slate';
}

export interface SimulatorFeedbackProps {
  protocolAlignmentText: string;
  probableImpactText: string;
  legalReferences: string[];
  isRiskDecision: boolean;
  whatToDoDifferently?: string;
}

export interface SimulatorHistoryProps {
  actorClass: Record<'brand' | 'emerald' | 'violet' | 'amber' | 'slate', string>;
  actorTone: (actor: string) => 'brand' | 'emerald' | 'violet' | 'amber' | 'slate';
}
