export type CategoryId =
  | 'emocional'
  | 'violencia'
  | 'vulnerabilidade'
  | 'convivencia'
  | 'pedagogico'
  | 'saude_fisica'
  | 'duvida';

export type CategoryToken = {
  id: CategoryId;
  label: string;
  short: string;
  emoji: string;
  tint: {
    bg: string;
    border: string;
    text: string;
    ring: string;
  };
};

export const CATEGORY_TOKENS: Record<CategoryId, CategoryToken> = {
  emocional: {
    id: 'emocional',
    label: 'Saúde emocional / comportamento',
    short: 'Sofrimento, mudanças de humor, comportamento persistente.',
    emoji: '🧠',
    tint: {
      bg: 'bg-brand-50',
      border: 'border-brand-200',
      text: 'text-brand-900',
      ring: 'focus-visible:ring-brand-300'
    }
  },
  violencia: {
    id: 'violencia',
    label: 'Violação de direitos / violência',
    short: 'Agressão, ameaça, suspeita de abuso, violação de direitos.',
    emoji: '🛡️',
    tint: {
      bg: 'bg-danger-50',
      border: 'border-danger-200',
      text: 'text-danger-900',
      ring: 'focus-visible:ring-danger-200'
    }
  },
  vulnerabilidade: {
    id: 'vulnerabilidade',
    label: 'Vulnerabilidade social / familiar',
    short: 'Falta de recursos, negligência, fragilidade social/familiar.',
    emoji: '🏠',
    tint: {
      bg: 'bg-success-50',
      border: 'border-success-200',
      text: 'text-success-900',
      ring: 'focus-visible:ring-success-200'
    }
  },
  convivencia: {
    id: 'convivencia',
    label: 'Convivência escolar / conflito',
    short: 'Brigas, bullying, conflitos recorrentes, clima de sala.',
    emoji: '🤝',
    tint: {
      bg: 'bg-accent-50',
      border: 'border-accent-200',
      text: 'text-accent-900',
      ring: 'focus-visible:ring-accent-200'
    }
  },
  pedagogico: {
    id: 'pedagogico',
    label: 'Dificuldade pedagógica persistente',
    short: 'Queda de desempenho, evasão, barreiras de aprendizagem.',
    emoji: '📚',
    tint: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-indigo-900',
      ring: 'focus-visible:ring-indigo-200'
    }
  },
  saude_fisica: {
    id: 'saude_fisica',
    label: 'Saúde física / queixa clínica',
    short: 'Sintomas físicos, dor, mal-estar, necessidade de avaliação.',
    emoji: '🩺',
    tint: {
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      text: 'text-sky-900',
      ring: 'focus-visible:ring-sky-200'
    }
  },
  duvida: {
    id: 'duvida',
    label: 'Não sei / preciso de apoio',
    short: 'Em dúvida, escolha aqui para escalonamento seguro.',
    emoji: '❓',
    tint: {
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      text: 'text-slate-900',
      ring: 'focus-visible:ring-slate-200'
    }
  }
};
