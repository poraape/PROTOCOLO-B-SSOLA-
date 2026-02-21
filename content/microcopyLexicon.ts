export type LanguageIntent =
  | 'avisar_gestao'
  | 'acionar_emergencia'
  | 'encaminhar_rede'
  | 'registrar_formalmente'
  | 'notificar_obrigatorio';

/**
 * Regra de linguagem: usar um verbo padrão por intenção.
 * Exceções explícitas devem ser justificadas abaixo (termo legal/técnico obrigatório).
 */
export const MICROCOPY_LEXICON: Record<LanguageIntent, string> = {
  avisar_gestao: 'avisar',
  acionar_emergencia: 'acionar',
  encaminhar_rede: 'encaminhar',
  registrar_formalmente: 'registrar',
  notificar_obrigatorio: 'notificar'
};

export const MICROCOPY_EXPLICIT_EXCEPTIONS: Array<{ context: string; reason: string }> = [
  {
    context: '"escalar para gestão" / "escala"',
    reason: 'Termo técnico de governança interna já consolidado no protocolo.'
  },
  {
    context: '"comunicar" em citações legais/históricas existentes',
    reason: 'Mantido quando reproduz texto normativo ou referência documental literal.'
  }
];

export const verbByIntent = (intent: LanguageIntent): string => MICROCOPY_LEXICON[intent];

export const verbByIntentCapitalized = (intent: LanguageIntent): string => {
  const verb = verbByIntent(intent);
  return `${verb.charAt(0).toUpperCase()}${verb.slice(1)}`;
};

type ActionTemplateParams = {
  action: string;
  deadline: string;
  responsible: string;
};

/**
 * Template único para instruções operacionais no app.
 * Exemplo: "Faça X agora | até Y | responsável Z".
 */
export const formatActionTemplate = ({ action, deadline, responsible }: ActionTemplateParams): string => {
  const normalizedDeadline = deadline.replace(/^até\s+/i, '');
  return `Faça ${action} agora | até ${normalizedDeadline} | responsável ${responsible}`;
};

export const SCENARIO_PLAYER_COPY = {
  title: 'ScenarioPlayer',
  subtitle: 'Treinamento de travessia com cenários locais (offline), filtros e modo prática.',
  resetScenario: 'Reiniciar cenário atual',
  previousStep: '← Anterior',
  trainingModeOff: 'Modo treinamento',
  trainingModeOn: 'Sair do treinamento',
  resetTraining: 'Reset treino',
  markCompleted: 'Marcar cenário como concluído',
  pendingPrerequisites: {
    riskImpact: '⚠️ Risco de decisões com lacunas de contexto e maior impacto operacional neste cenário.',
    nextActionPrefix: 'Próxima ação recomendada: conclua antes'
  }
} as const;
