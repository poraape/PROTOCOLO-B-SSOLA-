export const SCHOOL_CONFIG = {
  schoolName: 'E.E. Ermelino Matarazzo',
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
  'Este sistema foi desenvolvido para apoiar a aplicação do Protocolo Institucional de Acolhimento e Encaminhamento de Demandas Estudantis da E.E. Ermelino Matarazzo. Ferramenta de apoio à decisão — não substitui avaliação profissional, protocolos legais e acionamento imediato da gestão em situações críticas.';
