// data/domainGroups.ts
export type DomainId =
  | 'protecao'
  | 'violacao-direitos'
  | 'comportamento-grave'
  | 'saude-mental'
  | 'saude-fisica'
  | 'substancias'
  | 'gravidez'
  | 'vulnerabilidade'
  | 'discriminacao'
  | 'conflitos'
  | 'pedagogico'
  | 'evasao'
  | 'inclusao';

export type DomainGroupId = 'protecao-seguranca' | 'saude-bemestar' | 'vulnerabilidade-convivencia' | 'trajetoria-escolar';

export type IconKey =
  | 'shield'
  | 'scale'
  | 'alert'
  | 'heart'
  | 'brain'
  | 'stethoscope'
  | 'flask'
  | 'baby'
  | 'home'
  | 'userx'
  | 'messages'
  | 'book'
  | 'door'
  | 'accessibility';

export interface DomainItem {
  id: DomainId;
  title: string;
  icon: IconKey;
  summary: string;
  when: string;
}

export interface DomainGroup {
  id: DomainGroupId;
  title: string;
  subtitle: string;
  icon: IconKey;
  colorVar: '--group-protecao' | '--group-saude' | '--group-vulnerab' | '--group-trajetoria';
  domains: DomainItem[];
}

export const DOMAIN_GROUPS: DomainGroup[] = [
  {
    id: 'protecao-seguranca',
    title: 'Proteção e segurança',
    subtitle: 'Situações com risco, violação de direitos ou necessidade de proteção imediata.',
    icon: 'shield',
    colorVar: '--group-protecao',
    domains: [
      {
        id: 'protecao',
        title: 'Proteção',
        icon: 'shield',
        summary: 'Ameaça, violência, suspeita de abuso, risco direto ao estudante.',
        when: 'Quando há risco atual ou iminente e necessidade de proteção.',
      },
      {
        id: 'violacao-direitos',
        title: 'Violação de direitos',
        icon: 'scale',
        summary: 'Suspeita/confirmação de violação (negligência, abuso, exploração, etc.).',
        when: 'Quando o caso exige registro, rede de proteção e encaminhamento responsável.',
      },
      {
        id: 'comportamento-grave',
        title: 'Comportamento grave',
        icon: 'alert',
        summary: 'Ameaça séria, agressividade intensa, ruptura grave de segurança/convivência.',
        when: 'Quando há risco coletivo, necessidade de contenção institucional e encaminhamento.',
      },
    ],
  },
  {
    id: 'saude-bemestar',
    title: 'Saúde e bem-estar',
    subtitle: 'Demandas de saúde mental, saúde física e situações de cuidado.',
    icon: 'heart',
    colorVar: '--group-saude',
    domains: [
      {
        id: 'saude-mental',
        title: 'Saúde mental',
        icon: 'brain',
        summary: 'Sofrimento psíquico, ideação, crises, autolesão, ansiedade intensa.',
        when: 'Quando há sinais de sofrimento mental e necessidade de acolhimento e encaminhamento.',
      },
      {
        id: 'saude-fisica',
        title: 'Saúde física',
        icon: 'stethoscope',
        summary: 'Sintomas relevantes, mal-estar, necessidade de avaliação de saúde.',
        when: 'Quando há queixa clínica ou limitação física com impacto no cotidiano escolar.',
      },
      {
        id: 'substancias',
        title: 'Uso de substâncias',
        icon: 'flask',
        summary: 'Suspeita/uso de álcool e outras drogas, intoxicação, risco associado.',
        when: 'Quando há sinais de uso, risco ou necessidade de orientação e rede de cuidado.',
      },
      {
        id: 'gravidez',
        title: 'Gravidez / cuidado reprodutivo',
        icon: 'baby',
        summary: 'Suspeita/confirmação de gravidez, cuidados e proteção integral.',
        when: 'Quando há necessidade de acolhimento, orientação e articulação de rede.',
      },
    ],
  },
  {
    id: 'vulnerabilidade-convivencia',
    title: 'Vulnerabilidade e convivência',
    subtitle: 'Condições sociais, discriminação e conflitos que afetam permanência e proteção.',
    icon: 'home',
    colorVar: '--group-vulnerab',
    domains: [
      {
        id: 'vulnerabilidade',
        title: 'Vulnerabilidade social',
        icon: 'home',
        summary: 'Fome, precariedade, instabilidade familiar, desproteção e dificuldades materiais.',
        when: 'Quando o contexto social ameaça bem-estar, frequência ou segurança.',
      },
      {
        id: 'discriminacao',
        title: 'Discriminação',
        icon: 'userx',
        summary: 'Racismo, LGBTfobia, capacitismo e outras formas de discriminação.',
        when: 'Quando há relato, indícios ou impacto na segurança emocional e permanência.',
      },
      {
        id: 'conflitos',
        title: 'Conflitos',
        icon: 'messages',
        summary: 'Conflitos recorrentes, violência relacional, escalada de tensão.',
        when: 'Quando é preciso mediação, proteção, registro e rede de apoio.',
      },
    ],
  },
  {
    id: 'trajetoria-escolar',
    title: 'Trajetória escolar',
    subtitle: 'Demandas pedagógicas, inclusão e risco de evasão.',
    icon: 'book',
    colorVar: '--group-trajetoria',
    domains: [
      {
        id: 'pedagogico',
        title: 'Pedagógico',
        icon: 'book',
        summary: 'Dificuldades de aprendizagem, desempenho, organização pedagógica.',
        when: 'Quando a demanda é principalmente pedagógica e exige estratégia interna.',
      },
      {
        id: 'evasao',
        title: 'Evasão / frequência',
        icon: 'door',
        summary: 'Faltas, abandono, risco de evasão, baixa permanência.',
        when: 'Quando há risco de rompimento do vínculo com a escola.',
      },
      {
        id: 'inclusao',
        title: 'Inclusão',
        icon: 'accessibility',
        summary: 'Necessidades específicas, acessibilidade, adaptação e apoio.',
        when: 'Quando o estudante precisa de suporte para acesso e permanência com equidade.',
      },
    ],
  },
];
