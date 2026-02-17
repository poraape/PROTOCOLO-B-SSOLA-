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
  tint: string;
};

export const CATEGORY_TOKENS: Record<CategoryId, CategoryToken> = {
  emocional: {
    emoji: '🧠',
    label: 'Saúde emocional / comportamento',
    short: 'Sofrimento emocional, mudanças de humor, comportamento persistente.',
    tint: 'bg-blue-50 border-blue-200 text-blue-900'
  },

  violencia: {
    emoji: '🛡️',
    label: 'Violação de direitos / violência',
    short: 'Agressão, ameaça, suspeita de abuso ou violação de direitos.',
    tint: 'bg-red-50 border-red-200 text-red-900'
  },

  vulnerabilidade: {
    emoji: '🏠',
    label: 'Vulnerabilidade social / familiar',
    short: 'Fragilidade familiar, negligência, ausência de suporte.',
    tint: 'bg-green-50 border-green-200 text-green-900'
  },

  conflito: {
    emoji: '🤝',
    label: 'Convivência escolar / conflito',
    short: 'Brigas, bullying, conflitos recorrentes em sala.',
    tint: 'bg-amber-50 border-amber-200 text-amber-900'
  },

  pedagogica: {
    emoji: '📚',
    label: 'Dificuldade pedagógica persistente',
    short: 'Queda de desempenho, evasão, barreiras de aprendizagem.',
    tint: 'bg-violet-50 border-violet-200 text-violet-900'
  },

  fisica: {
    emoji: '🩺',
    label: 'Saúde física / queixa clínica',
    short: 'Sintomas físicos, dor, mal-estar ou necessidade de avaliação.',
    tint: 'bg-cyan-50 border-cyan-200 text-cyan-900'
  },

  duvida: {
    emoji: '❓',
    label: 'Não sei / preciso de apoio',
    short: 'Em dúvida, escolha esta opção para orientação segura.',
    tint: 'bg-slate-100 border-slate-300 text-slate-800'
  }
};
