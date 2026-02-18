export type CategoryId =
  | 'emocional'
  | 'violencia'
  | 'vulnerabilidade'
  | 'conflito'
  | 'pedagogica'
  | 'fisica'
  | 'duvida';

export type CategoryToken = {
  emoji: string;
  label: string;
  short: string;
  description: string;
  examples: string[];
  whenToUse: string;
  tint: string;
};

export const CATEGORY_TOKENS: Record<CategoryId, CategoryToken> = {
  emocional: {
    emoji: '🧠',
    label: 'Saúde emocional / comportamento',
    short: 'Sofrimento emocional, mudanças de humor, comportamento persistente.',
    description: 'Situações de sofrimento psíquico e comportamento que impactam o cotidiano escolar.',
    examples: ['Isolamento frequente', 'Crises de choro recorrentes', 'Autolesão', 'Ideação suicida'],
    whenToUse: 'Quando houver alteração emocional recorrente, com ou sem risco imediato.',
    tint: 'bg-blue-50 border-blue-200 text-blue-900'
  },

  violencia: {
    emoji: '🛡️',
    label: 'Violação de direitos / violência',
    short: 'Agressão, ameaça, suspeita de abuso ou violação de direitos.',
    description: 'Cenários com suspeita ou confirmação de violência e necessidade de proteção legal.',
    examples: ['Relato de abuso', 'Violência sexual', 'Ameaça grave', 'Violência doméstica'],
    whenToUse: 'Quando houver risco à integridade ou possível violação de direitos.',
    tint: 'bg-red-50 border-red-200 text-red-900'
  },

  vulnerabilidade: {
    emoji: '🏠',
    label: 'Vulnerabilidade social / familiar',
    short: 'Fragilidade familiar, negligência, ausência de suporte.',
    description: 'Demandas sociais e familiares que prejudicam permanência e proteção escolar.',
    examples: ['Insegurança alimentar', 'Negligência', 'Falta de cuidado básico', 'Ausências frequentes'],
    whenToUse: 'Quando a barreira principal for social/familiar e exigir rede socioassistencial.',
    tint: 'bg-green-50 border-green-200 text-green-900'
  },

  conflito: {
    emoji: '🤝',
    label: 'Convivência escolar / conflito',
    short: 'Brigas, bullying, conflitos recorrentes em sala.',
    description: 'Problemas de convivência que podem ser mediados com ações pedagógicas e protetivas.',
    examples: ['Bullying', 'Brigas repetidas', 'Cyberbullying', 'Ameaças entre pares'],
    whenToUse: 'Quando o foco for restaurar convivência e prevenir escalada de violência.',
    tint: 'bg-amber-50 border-amber-200 text-amber-900'
  },

  pedagogica: {
    emoji: '📚',
    label: 'Dificuldade pedagógica persistente',
    short: 'Queda de desempenho, evasão, barreiras de aprendizagem.',
    description: 'Dificuldades acadêmicas persistentes com necessidade de intervenção pedagógica.',
    examples: ['Queda brusca de notas', 'Defasagem', 'Risco de evasão'],
    whenToUse: 'Quando a principal demanda for de aprendizagem e acompanhamento escolar.',
    tint: 'bg-violet-50 border-violet-200 text-violet-900'
  },

  fisica: {
    emoji: '🩺',
    label: 'Saúde física / queixa clínica',
    short: 'Sintomas físicos, dor, mal-estar ou necessidade de avaliação.',
    description: 'Queixas clínicas e sinais físicos que exigem triagem de saúde.',
    examples: ['Dor intensa', 'Desmaio', 'Mal-estar persistente'],
    whenToUse: 'Quando houver sintomas físicos que demandem avaliação clínica.',
    tint: 'bg-cyan-50 border-cyan-200 text-cyan-900'
  },

  duvida: {
    emoji: '❓',
    label: 'Não sei / preciso de apoio',
    short: 'Em dúvida, escolha esta opção para orientação segura.',
    description: 'Opção de segurança para situações sem classificação clara no primeiro momento.',
    examples: ['Informação incompleta', 'Sinais mistos', 'Insegurança no enquadramento'],
    whenToUse: 'Quando não for possível definir categoria sem apoio da gestão.',
    tint: 'bg-slate-100 border-slate-300 text-slate-800'
  }
};
