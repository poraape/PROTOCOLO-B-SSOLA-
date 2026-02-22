/**
 * BÚSSOLA — GRUPOS DE DOMÍNIO
 *
 * 13 domínios organizados em 4 grupos conceituais.
 * Cada domínio carrega: id, label, ícone (nome Lucide), grupo e resumo.
 * A cor NÃO está aqui — é derivada do grupo via CSS var (--domain-color).
 * Isso garante que a cor seja controlada pelo design system,
 * não espalhada pela lógica de dados.
 */

export type UrgencyLevel = 'emergency' | 'warning' | 'info';

export interface Domain {
  id: string;
  label: string;
  icon: string;         // nome do ícone Lucide exato
  summary: string;      // 1 linha — aparece no card do Dashboard
  group: DomainGroupId;
  defaultUrgency: UrgencyLevel;
}

export type DomainGroupId =
  | 'protecao'
  | 'saude'
  | 'vulnerab'
  | 'trajetoria';

export interface DomainGroup {
  id: DomainGroupId;
  label: string;
  description: string;
  icon: string;         // ícone do grupo (usado no título da seção)
  cssVar: string;       // --group-{id} token de cor do grupo
  cssVarLight: string;  // --group-{id}-light token de fundo leve
  domains: Domain[];
}

export const DOMAIN_GROUPS: DomainGroup[] = [
  {
    id: 'protecao',
    label: 'Proteção e Segurança',
    description: 'Situações que envolvem risco à integridade física, violência ou violação de direitos.',
    icon: 'ShieldAlert',
    cssVar: '--group-protecao',
    cssVarLight: '--group-protecao-light',
    domains: [
      {
        id: 'protecao',
        label: 'Proteção',
        icon: 'ShieldAlert',
        summary: 'Violência física, ameaça, abuso ou situação de risco imediato.',
        group: 'protecao',
        defaultUrgency: 'emergency',
      },
      {
        id: 'violacao-direitos',
        label: 'Violação de Direitos',
        icon: 'Scale',
        summary: 'Descumprimento de direitos fundamentais do estudante.',
        group: 'protecao',
        defaultUrgency: 'emergency',
      },
      {
        id: 'comportamento-grave',
        label: 'Comportamento Grave',
        icon: 'TriangleAlert',
        summary: 'Conduta que representa risco à segurança da comunidade escolar.',
        group: 'protecao',
        defaultUrgency: 'warning',
      },
    ],
  },
  {
    id: 'saude',
    label: 'Saúde e Bem-Estar',
    description: 'Demandas relacionadas à saúde mental, física e ao uso de substâncias.',
    icon: 'HeartPulse',
    cssVar: '--group-saude',
    cssVarLight: '--group-saude-light',
    domains: [
      {
        id: 'saude-mental',
        label: 'Saúde Mental',
        icon: 'Brain',
        summary: 'Sinais de sofrimento psíquico, autolesão, ideação suicida ou crise emocional.',
        group: 'saude',
        defaultUrgency: 'emergency',
      },
      {
        id: 'saude-fisica',
        label: 'Saúde Física',
        icon: 'Stethoscope',
        summary: 'Condições de saúde que afetam a permanência e o aprendizado.',
        group: 'saude',
        defaultUrgency: 'warning',
      },
      {
        id: 'substancias',
        label: 'Uso de Substâncias',
        icon: 'FlaskConical',
        summary: 'Uso ou suspeita de uso de álcool, drogas ou outras substâncias.',
        group: 'saude',
        defaultUrgency: 'warning',
      },
      {
        id: 'gravidez',
        label: 'Saúde Reprodutiva',
        icon: 'Baby',
        summary: 'Gravidez na adolescência ou demandas de saúde sexual e reprodutiva.',
        group: 'saude',
        defaultUrgency: 'warning',
      },
    ],
  },
  {
    id: 'vulnerab',
    label: 'Vulnerabilidade e Convivência',
    description: 'Situações de vulnerabilidade social, discriminação e conflitos relacionais.',
    icon: 'Users',
    cssVar: '--group-vulnerab',
    cssVarLight: '--group-vulnerab-light',
    domains: [
      {
        id: 'vulnerabilidade',
        label: 'Vulnerabilidade Social',
        icon: 'House',
        summary: 'Instabilidade habitacional, insegurança alimentar ou situação de risco social.',
        group: 'vulnerab',
        defaultUrgency: 'warning',
      },
      {
        id: 'discriminacao',
        label: 'Discriminação',
        icon: 'UserX',
        summary: 'Preconceito, exclusão ou tratamento discriminatório por qualquer razão.',
        group: 'vulnerab',
        defaultUrgency: 'warning',
      },
      {
        id: 'conflitos',
        label: 'Conflitos',
        icon: 'MessageSquareWarning',
        summary: 'Conflitos interpessoais, bullying ou disputas que afetam o clima escolar.',
        group: 'vulnerab',
        defaultUrgency: 'warning',
      },
    ],
  },
  {
    id: 'trajetoria',
    label: 'Trajetória Escolar',
    description: 'Questões pedagógicas, evasão e necessidades de inclusão.',
    icon: 'BookOpen',
    cssVar: '--group-trajetoria',
    cssVarLight: '--group-trajetoria-light',
    domains: [
      {
        id: 'pedagogico',
        label: 'Pedagógico',
        icon: 'BookOpen',
        summary: 'Dificuldades de aprendizagem, reprovação ou necessidades educativas específicas.',
        group: 'trajetoria',
        defaultUrgency: 'info',
      },
      {
        id: 'evasao',
        label: 'Evasão Escolar',
        icon: 'DoorOpen',
        summary: 'Faltas recorrentes, abandono ou risco de evasão.',
        group: 'trajetoria',
        defaultUrgency: 'warning',
      },
      {
        id: 'inclusao',
        label: 'Inclusão',
        icon: 'Accessibility',
        summary: 'Necessidades de adaptação, acessibilidade ou inclusão escolar.',
        group: 'trajetoria',
        defaultUrgency: 'info',
      },
    ],
  },
];

/** Flat map de todos os domínios, indexado por id — para acesso O(1) */
export const DOMAINS_BY_ID: Record<string, Domain> = Object.fromEntries(
  DOMAIN_GROUPS.flatMap((g) => g.domains).map((d) => [d.id, d])
);

/** Todos os domínios em array plano — útil para busca e filtros */
export const ALL_DOMAINS: Domain[] = DOMAIN_GROUPS.flatMap((g) => g.domains);
