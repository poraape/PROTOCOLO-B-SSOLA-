/**
 * Tokens de design para interface de decisão crítica escolar.
 *
 * Objetivo: padronizar sinais visuais de urgência, legibilidade e foco de ação.
 */

/**
 * Configuração visual por nível de urgência operacional.
 */
export interface UrgencyVisualConfig {
  color: string;
  icon: string;
  label: string;
}

/**
 * Mapa de ícones por categoria principal de demanda.
 */
export interface CategoryIconsMap {
  emocional: string;
  violencia: string;
  vulnerabilidade: string;
  convivencia: string;
  pedagogico: string;
  saude_fisica: string;
  substancias: string;
  gravidez: string;
  nao_sei: string;
}

/**
 * Tokens centrais de cor, tipografia, espaçamento e elevação.
 */
export const designTokens = {
  colors: {
    emergency: '#DC2626',
    urgent: '#F97316',
    attention: '#FBBF24',
    routine: '#3B82F6',
    info: '#6B7280',
    success: '#10B981',
    background: {
      primary: '#FFFFFF',
      secondary: '#F9FAFB',
      tertiary: '#F3F4F6'
    }
  },
  typography: {
    question: { size: '28px', weight: '700', lineHeight: '1.3' },
    actionTitle: { size: '22px', weight: '700', lineHeight: '1.4' },
    actionItem: { size: '18px', weight: '400', lineHeight: '1.5' },
    secondary: { size: '16px', weight: '400', lineHeight: '1.6' },
    help: { size: '14px', weight: '400', lineHeight: '1.5' }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    emergency: '0 0 0 4px rgba(220, 38, 38, 0.2)'
  }
} as const;

/**
 * Configuração de urgência para badges, cabeçalhos e chamadas de ação.
 */
export const urgencyConfig: Record<'IMMEDIATE' | 'URGENT' | 'SCHEDULED', UrgencyVisualConfig> = {
  IMMEDIATE: {
    color: designTokens.colors.emergency,
    icon: '🚨',
    label: 'AÇÃO IMEDIATA'
  },
  URGENT: {
    color: designTokens.colors.urgent,
    icon: '⚠️',
    label: 'URGENTE'
  },
  SCHEDULED: {
    color: designTokens.colors.routine,
    icon: '📋',
    label: 'PROGRAMADO'
  }
};

/**
 * Ícones por categoria para reforço de reconhecimento rápido.
 */
export const categoryIcons: CategoryIconsMap = {
  emocional: '🧠',
  violencia: '🛡️',
  vulnerabilidade: '🏠',
  convivencia: '🤝',
  pedagogico: '📚',
  saude_fisica: '🩺',
  substancias: '💊',
  gravidez: '🤰',
  nao_sei: '❓'
};
