export const SCHOOL_CONFIG = {
  appTitle: 'PROTOCOLO BÚSSOLA 🧭',
  schoolName: 'E.E. ERMELINO MATARAZZO',
  diretoria: 'Diretoria Leste 1',
  shortSubtitle: 'E.E. ERMELINO MATARAZZO – Diretoria Leste 1',
  region: 'São Paulo, Zona Leste',

  // Compatibilidade com componentes legados
  appName: 'Protocolo Bússola',
  institutionalUseLabel: 'Uso institucional restrito à equipe escolar.',
  primaryColor: '#1E3A8A',
  emergency: {
    police: '190',
    samu: '192',
    firefighters: '193'
  },
  governance: {
    owner: 'Gestão escolar / comissão de proteção',
    reviewFrequency: 'Revisão trimestral (ou extraordinária quando houver mudança normativa)'
  },
  protocol: {
    version: 'Fev/2026',
    lastReview: '2026-02'
  }
} as const;

export const DISCLAIMER_TEXT =
  'Sistema de apoio à decisão vinculado ao Protocolo Institucional de Acolhimento e Encaminhamento de Demandas Estudantis da E.E. Ermelino Matarazzo. Não substitui avaliação profissional, cumprimento de protocolos legais nem acionamento imediato da gestão em situações críticas.';
