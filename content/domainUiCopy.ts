export type DomainUiCopy = {
  summary: string;
  examples: string[];
  whenToUse: string;
  colorVar: string;
  icon: string;
};

export const DOMAIN_UI_COPY: Record<string, DomainUiCopy> = {
  DOM_PEDAGOGICO_Q1: {
    summary: 'Dificuldades de aprendizagem, rotina escolar e vínculo pedagógico.',
    examples: ['Queda brusca de rendimento', 'Recusa escolar', 'Desorganização acadêmica persistente'],
    whenToUse: 'Use quando o sinal principal estiver ligado ao processo de ensino-aprendizagem.',
    colorVar: '--domain-pedagogico',
    icon: '📚'
  },
  DOM_SAUDE_MENTAL_Q1: {
    summary: 'Sofrimento emocional com impacto no funcionamento diário.',
    examples: ['Crises de ansiedade', 'Humor deprimido recorrente', 'Autolesão sem risco imediato'],
    whenToUse: 'Use quando o sofrimento psíquico for o eixo predominante da demanda.',
    colorVar: '--domain-saude-mental',
    icon: '🧠'
  },
  DOM_CONFLITOS_Q1: {
    summary: 'Conflitos interpessoais e convivência escolar deteriorada.',
    examples: ['Brigas recorrentes', 'Ameaças entre pares', 'Escalada de tensão em sala'],
    whenToUse: 'Use quando a questão central for relacional e de convivência.',
    colorVar: '--domain-conflitos',
    icon: '🤝'
  },
  DOM_DISCRIMINACAO_Q1: {
    summary: 'Situações de discriminação, preconceito ou exclusão.',
    examples: ['Racismo', 'Capacitismo', 'Bullying discriminatório'],
    whenToUse: 'Use quando há marcador de discriminação como fato principal.',
    colorVar: '--domain-discriminacao',
    icon: '⚖️'
  },
  DOM_COMPORTAMENTO_Q1: {
    summary: 'Comportamento com potencial de dano relevante ou ato infracional.',
    examples: ['Agressão grave', 'Porte de objeto perigoso', 'Dano intencional importante'],
    whenToUse: 'Use quando o risco comportamental exige resposta disciplinar-protetiva.',
    colorVar: '--domain-comportamento-grave',
    icon: '🚨'
  },
  DOM_VULNERABILIDADE_Q1: {
    summary: 'Condições familiares/sociais que ampliam risco e desproteção.',
    examples: ['Negligência recorrente', 'Insegurança alimentar', 'Ausência de rede de cuidado'],
    whenToUse: 'Use quando a vulnerabilidade social for o núcleo do caso.',
    colorVar: '--domain-vulnerabilidade',
    icon: '🏠'
  },
  DOM_DIREITOS_Q1: {
    summary: 'Suspeita de violação de direitos com necessidade de proteção formal.',
    examples: ['Violência doméstica', 'Exploração', 'Violação de direitos básicos'],
    whenToUse: 'Use quando houver necessidade de rede de proteção intersetorial.',
    colorVar: '--domain-violacao-direitos',
    icon: '🛡️'
  },
  DOM_SUBSTANCIAS_Q1: {
    summary: 'Uso de substâncias com impacto escolar e risco de dano.',
    examples: ['Uso recorrente em contexto escolar', 'Intoxicação prévia', 'Risco associado a uso'],
    whenToUse: 'Use quando o uso de álcool/drogas for fator predominante.',
    colorVar: '--domain-substancias',
    icon: '💊'
  },
  DOM_SAUDE_FISICA_Q1: {
    summary: 'Sinais clínicos e necessidades de cuidado em saúde física.',
    examples: ['Sintoma persistente relevante', 'Condição crônica descompensada', 'Dor/incapacidade funcional'],
    whenToUse: 'Use quando a principal demanda for médica/física.',
    colorVar: '--domain-saude-fisica',
    icon: '🏥'
  },
  DOM_GRAVIDEZ_Q1: {
    summary: 'Demandas de gravidez e saúde sexual com suporte psicossocial.',
    examples: ['Suspeita/confirmação de gravidez', 'Acesso a cuidado', 'Risco social associado'],
    whenToUse: 'Use quando a temática de saúde sexual/reprodutiva for central.',
    colorVar: '--domain-gravidez',
    icon: '🤰'
  },
  DOM_INCLUSAO_Q1: {
    summary: 'Acessibilidade e inclusão de estudante com deficiência.',
    examples: ['Barreira de acesso', 'Ausência de adaptação razoável', 'Exclusão de participação'],
    whenToUse: 'Use quando a barreira de inclusão for o fator principal.',
    colorVar: '--domain-inclusao',
    icon: '♿'
  },
  DOM_EVASAO_Q1: {
    summary: 'Risco de evasão e rompimento do vínculo com a escola.',
    examples: ['Faltas persistentes', 'Desengajamento intenso', 'Histórico de abandono'],
    whenToUse: 'Use quando o maior risco for afastamento da vida escolar.',
    colorVar: '--domain-evasao',
    icon: '🎒'
  },
  EMERGENCY_LEAF: {
    summary: 'Situação crítica com necessidade de proteção imediata.',
    examples: ['Risco de vida', 'Violência em curso', 'Urgência médica'],
    whenToUse: 'Use nos cartões de risco imediato para acionar resposta emergencial.',
    colorVar: '--domain-protecao',
    icon: '🆘'
  }
};
