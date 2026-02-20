export type RiskTokenLevel = 'EMERGENCIAL' | 'ALTO' | 'MODERADO' | 'BAIXO';

export const riskTokens = {
  EMERGENCIAL: {
    bg: '#991B1B',
    text: '#FFFFFF',
    border: '#7F1D1D',
    icon: '⚠️',
    shadow: '0 8px 24px rgba(153, 27, 27, 0.30)'
  },
  ALTO: {
    bg: '#C2410C',
    text: '#FFFFFF',
    border: '#9A3412',
    icon: '▲',
    shadow: '0 4px 16px rgba(234, 88, 12, 0.20)'
  },
  MODERADO: {
    bg: '#475569',
    text: '#FFFFFF',
    border: '#334155',
    icon: '●',
    shadow: '0 2px 8px rgba(71, 85, 105, 0.15)'
  },
  BAIXO: {
    bg: '#15803D',
    text: '#FFFFFF',
    border: '#166534',
    icon: '✓',
    shadow: '0 1px 4px rgba(21, 128, 61, 0.10)'
  }
} as const;

export const normalizeRiskTokenLevel = (riskLevel?: string): RiskTokenLevel => {
  if (riskLevel === 'EMERGENCIAL') return 'EMERGENCIAL';
  if (riskLevel === 'ALTO') return 'ALTO';
  if (riskLevel === 'MÉDIO') return 'MODERADO';
  return 'BAIXO';
};
