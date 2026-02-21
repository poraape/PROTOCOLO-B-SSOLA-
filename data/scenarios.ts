export type RiskLevel = 'low' | 'moderate' | 'high' | 'imminent';
export type Complexity = 'low' | 'medium' | 'high';
export type Category =
  | 'pedagogical'
  | 'mental_health'
  | 'physical_health'
  | 'violence'
  | 'substances'
  | 'family_conflict'
  | 'neglect'
  | 'inclusion'
  | 'sexual_health';

export interface ScenarioStep {
  step: number;
  nodeId: string;
  label: string;
  actor: string;
  action: string;
  rationale: string;
  alertTriggered?: string;
}

export interface Scenario {
  id: string;
  title: string;
  complexity: Complexity;
  riskLevel: RiskLevel;
  category: Category[];
  isEpisodic: boolean;
  isCollective: boolean;
  territorialContext: string;
  studentProfile: string;
  trigger: string;
  markers: string[];
  treeTraversal: ScenarioStep[];
  outcome: string;
  followUpDays: number;
  lessonsLearned: string[];
}

export const SCENARIOS_DATA: Scenario[] = [
  {
    id: 'C01',
    title: 'Aluno dormindo nas aulas — trabalho informal noturno',
    complexity: 'low',
    riskLevel: 'moderate',
    category: ['pedagogical', 'family_conflict'],
    isEpisodic: true,
    isCollective: false,
    territorialContext: 'Jardim Matarazzo. Família de baixa renda e trabalho informal de adolescentes no território.',
    studentProfile: 'Aluno, 14 anos, 7º ano, com defasagem idade-série e comportamento historicamente tranquilo.',
    trigger: 'Professor identifica sonolência recorrente e queda de entrega de tarefas há duas semanas.',
    markers: ['baixa_renda', 'trabalho_informal', 'defasagem_idade_serie'],
    treeTraversal: [
      { step: 1, nodeId: 'P1_P3', label: 'Conversa discreta após a aula.', actor: 'professor', action: 'Conversa discreta após a aula.', rationale: 'Mudança de padrão exige investigação.', alertTriggered: 'A02' },
      { step: 2, nodeId: 'TRIAGEM_RAPIDA', label: 'Classifica como risco moderado, sem emergência.', actor: 'professor', action: 'Classifica como risco moderado, sem emergência.', rationale: 'Sem risco imediato, foco em causa externa.' },
      { step: 3, nodeId: 'ESCUTA_INTERNA', label: 'Aluno relata trabalho noturno.', actor: 'professor', action: 'Aluno relata trabalho noturno.', rationale: 'Escuta qualificada permitiu identificar causa externa.' },
      { step: 4, nodeId: 'R48', label: 'Aciona fluxo de trabalho infantil e família.', actor: 'coordenação', action: 'Aciona fluxo de trabalho infantil e família.', rationale: 'Violação de direitos exige escalonamento.' },
      { step: 5, nodeId: 'CRAS_REFERRAL', label: 'Encaminha CRAS para proteção social básica.', actor: 'coordenação', action: 'Encaminha CRAS para proteção social básica.', rationale: 'Vulnerabilidade econômica sem violência grave.' },
      { step: 6, nodeId: 'INTERNAL_ADAPT', label: 'Ajusta prazos pedagógicos.', actor: 'professor + coordenação', action: 'Ajusta prazos pedagógicos.', rationale: 'Preserva vínculo escolar.' },
      { step: 7, nodeId: 'REGISTRO', label: 'Registra ações e encaminhamentos.', actor: 'coordenação', action: 'Registra ações e encaminhamentos.', rationale: 'Proteção legal e histórico.', alertTriggered: 'A11' }
    ],
    outcome: 'Acompanhamento quinzenal, plano pedagógico adaptado e reavaliação em 30 dias.',
    followUpDays: 30,
    lessonsLearned: [
      'Mudança de comportamento é sinal e pede investigação.',
      'CRAS é fluxo correto para pobreza e vulnerabilidade.',
      'Adaptação pedagógica mantém vínculo escolar.'
    ]
  },
  {
    id: 'C02',
    title: 'Aluna com autolesão e fala de desesperança',
    complexity: 'high',
    riskLevel: 'high',
    category: ['mental_health'],
    isEpisodic: true,
    isCollective: false,
    territorialContext: 'Parque Boa Esperança, com sobrecarga familiar e histórico de violência doméstica indireta.',
    studentProfile: 'Aluna, 16 anos, 1º EM, com isolamento crescente e queda de desempenho.',
    trigger: 'Colega relata marcas de corte e fala “não quero mais estar aqui”.',
    markers: ['gênero_feminino', 'saúde_mental', 'violência_doméstica_indireta'],
    treeTraversal: [
      { step: 1, nodeId: 'S3', label: 'Convida para sala reservada.', actor: 'professora', action: 'Convida para sala reservada.', rationale: 'Sem exposição pública.', alertTriggered: 'A02' },
      { step: 2, nodeId: 'ESCUTA_PROTEGIDA', label: 'Faz pergunta direta sobre risco suicida.', actor: 'professora', action: 'Faz pergunta direta sobre risco suicida.', rationale: 'Pergunta direta abre canal de cuidado.', alertTriggered: 'A16' },
      { step: 3, nodeId: 'R10_TRIAGEM', label: 'Classifica como risco alto sem iminência.', actor: 'coordenação', action: 'Classifica como risco alto sem iminência.', rationale: 'Define encaminhamento prioritário.' },
      { step: 4, nodeId: 'R11_R07', label: 'Não deixa sozinha e remove objetos de risco.', actor: 'coordenação', action: 'Não deixa sozinha e remove objetos de risco.', rationale: 'Segurança imediata.', alertTriggered: 'A10' },
      { step: 5, nodeId: 'CAPS_IJ_REFERRAL', label: 'Encaminha ao CAPS IJ com carta.', actor: 'direção', action: 'Encaminha ao CAPS IJ com carta.', rationale: 'Serviço especializado para adolescente.' },
      { step: 6, nodeId: 'REGISTRO_RESTRITO', label: 'Registra em ficha restrita.', actor: 'coordenação', action: 'Registra em ficha restrita.', rationale: 'LGPD e continuidade de cuidado.', alertTriggered: 'A12' },
      { step: 7, nodeId: 'FOLLOWUP_PLAN', label: 'Define monitoramento semanal.', actor: 'coordenação', action: 'Define monitoramento semanal.', rationale: 'Evita encaminhamento sem retorno.', alertTriggered: 'A03' }
    ],
    outcome: 'Atendimento no CAPS IJ e plano psicossocial ativo na escola.',
    followUpDays: 15,
    lessonsLearned: [
      'Autolesão sempre é sinal de risco.',
      'Acolhimento + rede externa + seguimento escolar são inseparáveis.',
      'Devolutiva ao estudante é obrigatória.'
    ]
  },
  {
    id: 'C03',
    title: 'Aluno diabético com hipoglicemia grave',
    complexity: 'high',
    riskLevel: 'imminent',
    category: ['physical_health'],
    isEpisodic: true,
    isCollective: false,
    territorialContext: 'Refeitório da escola durante intervalo.',
    studentProfile: 'Aluno 12 anos, DM1 com protocolo de crise registrado.',
    trigger: 'Palidez, sudorese fria, tremores e rebaixamento de resposta.',
    markers: ['condição_crônica', 'diabetes', '6_a_12_anos'],
    treeTraversal: [
      { step: 1, nodeId: 'F7', label: 'Reconhece sinal e aciona apoio.', actor: 'merendeira', action: 'Reconhece sinal e aciona apoio.', rationale: 'Primeira resposta rápida salva tempo.' },
      { step: 2, nodeId: 'C3_GLUCOSE', label: 'Oferece açúcar apenas se consciente.', actor: 'agente de organização', action: 'Oferece açúcar apenas se consciente.', rationale: 'Segurança clínica.', alertTriggered: 'A18' },
      { step: 3, nodeId: 'FAMILY_CONTACT', label: 'Comunica família imediatamente.', actor: 'secretaria', action: 'Comunica família imediatamente.', rationale: 'Obrigatório em evento de saúde.' },
      { step: 4, nodeId: 'ESCALATE_SAMU', label: 'Aciona SAMU se sem melhora em 10 min.', actor: 'direção', action: 'Aciona SAMU se sem melhora em 10 min.', rationale: 'Sem resposta = risco iminente.' },
      { step: 5, nodeId: 'REGISTRO', label: 'Documenta cronologia completa.', actor: 'secretaria', action: 'Documenta cronologia completa.', rationale: 'Continuidade do cuidado.' }
    ],
    outcome: 'SAMU acionado, estabilização e revisão do plano de saúde escolar com UBS.',
    followUpDays: 7,
    lessonsLearned: ['Primeiros respondentes devem saber reconhecer sinais.', 'Sem melhora em 10 min: SAMU.', 'Registro cronológico é crítico.']
  },
  {
    id: 'C04',
    title: 'Hematomas recorrentes com suspeita de violência doméstica',
    complexity: 'high',
    riskLevel: 'high',
    category: ['violence', 'neglect'],
    isEpisodic: false,
    isCollective: false,
    territorialContext: 'Jardim Belém com alta incidência de violência intrafamiliar.',
    studentProfile: 'Aluna 11 anos, três episódios de hematomas em 60 dias com versões incoerentes.',
    trigger: 'Novo hematoma observado em aula de educação física.',
    markers: ['violência_intrafamiliar', 'padrão_crônico'],
    treeTraversal: [
      { step: 1, nodeId: 'V_DOMESTIC', label: 'Comunica coordenação no mesmo turno.', actor: 'professora', action: 'Comunica coordenação no mesmo turno.', rationale: 'Padrão recorrente exige ação imediata.', alertTriggered: 'A17' },
      { step: 2, nodeId: 'D5_ESCUTA_PROTEGIDA', label: 'Escuta protegida sem pergunta sugestiva.', actor: 'coordenação', action: 'Escuta protegida sem pergunta sugestiva.', rationale: 'Evita revitimização.', alertTriggered: 'A04' },
      { step: 3, nodeId: 'CT_NOTIFICACAO', label: 'Notifica o Conselho Tutelar (CT) no mesmo dia.', actor: 'direção', action: 'Notifica o Conselho Tutelar (CT) no mesmo dia.', rationale: 'Suspeita já obriga notificação.', alertTriggered: 'A07' },
      { step: 4, nodeId: 'UBS_REFERRAL', label: 'Encaminha UBS para registro médico formal.', actor: 'coordenação', action: 'Encaminha UBS para registro médico formal.', rationale: 'Formaliza evidência clínica.', alertTriggered: 'A13' },
      { step: 5, nodeId: 'FAMILIA_PROTOCOL', label: 'Aguarda orientação do Conselho Tutelar (CT) para contato familiar.', actor: 'direção + Conselho Tutelar (CT)', action: 'Aguarda orientação do Conselho Tutelar (CT) para contato familiar.', rationale: 'Proteção da vítima vem antes.' , alertTriggered: 'A08'},
      { step: 6, nodeId: 'REGISTRO_RESTRITO', label: 'Registra histórico e protocolo do Conselho Tutelar (CT).', actor: 'coordenação', action: 'Registra histórico e protocolo do Conselho Tutelar (CT).', rationale: 'Base para rede de proteção.', alertTriggered: 'A11' }
    ],
    outcome: 'Conselho Tutelar (CT) e CREAS acionados, com acompanhamento semanal escolar.',
    followUpDays: 30,
    lessonsLearned: ['Escola notifica, não investiga.', 'Suspeita basta para acionar o Conselho Tutelar (CT).', 'Não confrontar suspeito agressor.']
  },
  {
    id: 'C05',
    title: 'Cyberbullying racista em grupo de WhatsApp',
    complexity: 'medium',
    riskLevel: 'moderate',
    category: ['violence', 'mental_health'],
    isEpisodic: false,
    isCollective: true,
    territorialContext: 'Turma do 8º ano em grupo digital de estudantes.',
    studentProfile: 'Aluna 13 anos, negra, faltas crescentes por exposição e humilhação.',
    trigger: 'Família entrega prints com conteúdo racista e ofensivo.',
    markers: ['raça_negra', 'cyberbullying', 'discriminação'],
    treeTraversal: [
      { step: 1, nodeId: 'D1_D7', label: 'Preserva evidências e aciona coordenação.', actor: 'direção', action: 'Preserva evidências e aciona coordenação.', rationale: 'Prints são evidência de possível crime.' },
      { step: 2, nodeId: 'VITIMA_FIRST', label: 'Acolhe vítima em privado.', actor: 'coordenação', action: 'Acolhe vítima em privado.', rationale: 'Vítima primeiro.', alertTriggered: 'A06' },
      { step: 3, nodeId: 'RISK_ASSESS', label: 'Avalia sofrimento psíquico associado.', actor: 'coordenação', action: 'Avalia sofrimento psíquico associado.', rationale: 'Risco mental pode coexistir.' },
      { step: 4, nodeId: 'AUTORES_INDIVIDUAL', label: 'Responsabiliza autores separadamente.', actor: 'coordenação', action: 'Responsabiliza autores separadamente.', rationale: 'Evita revitimização coletiva.', alertTriggered: 'A09' },
      { step: 5, nodeId: 'FAMILIAS', label: 'Convoca famílias individualmente.', actor: 'direção', action: 'Convoca famílias individualmente.', rationale: 'Corresponsabilização familiar.' },
      { step: 6, nodeId: 'CT_BO', label: 'Orienta registro de BO e avalia acionamento do Conselho Tutelar (CT).', actor: 'direção', action: 'Orienta registro de BO e avalia acionamento do Conselho Tutelar (CT).', rationale: 'Injúria racial é crime.' },
      { step: 7, nodeId: 'ACAO_COLETIVA', label: 'Roda formativa sem expor vítima.', actor: 'professores + coordenação', action: 'Roda formativa sem expor vítima.', rationale: 'Prevenção na turma.', alertTriggered: 'A12' }
    ],
    outcome: 'Plano de acompanhamento da vítima e medidas pedagógicas com autores/famílias.',
    followUpDays: 30,
    lessonsLearned: ['Racismo é crime.', 'Acolhimento da vítima vem antes de qualquer mediação.', 'Ação coletiva deve preservar sigilo.']
  },
  {
    id: 'C06',
    title: 'Tiros nas proximidades durante o intervalo',
    complexity: 'high',
    riskLevel: 'imminent',
    category: ['violence'],
    isEpisodic: true,
    isCollective: true,
    territorialContext: 'Entorno da escola com recorrência de conflito armado.',
    studentProfile: 'Comunidade escolar em situação coletiva de risco.',
    trigger: 'Disparos ouvidos a ~200m, com alunos em circulação.',
    markers: ['violência_territorial', 'coletivo'],
    treeTraversal: [
      { step: 1, nodeId: 'D9_LOCKDOWN', label: 'Fecha portão e alerta direção.', actor: 'porteiro', action: 'Fecha portão e alerta direção.', rationale: 'Primeira resposta de contenção.' },
      { step: 2, nodeId: 'PM_190', label: 'Aciona PM 190 imediatamente.', actor: 'direção', action: 'Aciona PM 190 imediatamente.', rationale: 'Segurança pública em curso.' },
      { step: 3, nodeId: 'LOCKDOWN_INTERNO', label: 'Comanda lockdown interno.', actor: 'direção', action: 'Comanda lockdown interno.', rationale: 'Reduz exposição ao risco.' },
      { step: 4, nodeId: 'COMMUNICATION_CONTROL', label: 'Centraliza comunicação e evita ruído.', actor: 'direção', action: 'Centraliza comunicação e evita ruído.', rationale: 'Prevenção de pânico.' },
      { step: 5, nodeId: 'POST_CESSATION', label: 'Comunica famílias após cessação.', actor: 'direção', action: 'Comunica famílias após cessação.', rationale: 'Transparência segura.' },
      { step: 6, nodeId: 'TRAUMA_FOLLOWUP', label: 'Monitora sinais de trauma nas semanas seguintes.', actor: 'coordenação + professores', action: 'Monitora sinais de trauma nas semanas seguintes.', rationale: 'Violência armada pode gerar TEPT.' },
      { step: 7, nodeId: 'REGISTRO_DE_LESTE', label: 'Registra e comunica DE Leste 1.', actor: 'direção', action: 'Registra e comunica DE Leste 1.', rationale: 'Governança institucional.' }
    ],
    outcome: 'Sem feridos; retorno gradual com monitoramento psicossocial.',
    followUpDays: 28,
    lessonsLearned: ['Lockdown exige treino prévio.', 'Comunicação centralizada evita caos.', 'Seguimento pós-evento é obrigatório.']
  },
  {
    id: 'C07',
    title: 'Aluna com TEA em crise por discriminação',
    complexity: 'medium',
    riskLevel: 'moderate',
    category: ['inclusion', 'violence', 'mental_health'],
    isEpisodic: false,
    isCollective: false,
    territorialContext: 'Corredor do 1º EM em período regular.',
    studentProfile: 'Aluna 15 anos com TEA e PEI ativo.',
    trigger: 'Colegas imitam estereotipias e desencadeiam crise emocional/sensorial.',
    markers: ['deficiência_TEA', 'discriminação_capacitismo'],
    treeTraversal: [
      { step: 1, nodeId: 'V7_S5', label: 'Interrompe discriminação e chama AEE.', actor: 'funcionária', action: 'Interrompe discriminação e chama AEE.', rationale: 'Proteção imediata e suporte especializado.' },
      { step: 2, nodeId: 'CRISE_REGULACAO', label: 'Aplica estratégia de regulação conhecida.', actor: 'professor AEE', action: 'Aplica estratégia de regulação conhecida.', rationale: 'Evita escalada da crise.' },
      { step: 3, nodeId: 'REGISTRO_DISCRIMINACAO', label: 'Registra formalmente o episódio.', actor: 'coordenação', action: 'Registra formalmente o episódio.', rationale: 'Capacitismo é violência.', alertTriggered: 'A11' },
      { step: 4, nodeId: 'RESPONSABILIZACAO', label: 'Chama autores separadamente e comunica famílias.', actor: 'coordenação', action: 'Chama autores separadamente e comunica famílias.', rationale: 'Responsabilização proporcional.', alertTriggered: 'A09' },
      { step: 5, nodeId: 'ACAO_FORMATIVA', label: 'Trabalha diversidade sem expor vítima.', actor: 'professores', action: 'Trabalha diversidade sem expor vítima.', rationale: 'Prevenção coletiva.', alertTriggered: 'A12' },
      { step: 6, nodeId: 'PEI_REVISION', label: 'Revisa PEI com medidas de proteção social.', actor: 'coordenação + AEE', action: 'Revisa PEI com medidas de proteção social.', rationale: 'Inclusão integral.' },
      { step: 7, nodeId: 'CT_IF_PATTERN', label: 'Escala ao Conselho Tutelar (CT) se o padrão persistir.', actor: 'direção', action: 'Escala ao Conselho Tutelar (CT) se o padrão persistir.', rationale: 'Violação crônica de direitos.' }
    ],
    outcome: 'Aluna estabilizada, PEI revisado e turma com intervenção formativa.',
    followUpDays: 15,
    lessonsLearned: ['Crise TEA não é indisciplina.', 'Capacitismo requer responsabilização.', 'PEI deve incluir proteção social.']
  },
  {
    id: 'C08',
    title: 'Uso frequente de maconha com faltas crescentes',
    complexity: 'medium',
    riskLevel: 'moderate',
    category: ['substances', 'pedagogical'],
    isEpisodic: false,
    isCollective: false,
    territorialContext: 'Entorno com vulnerabilidade territorial e oferta de drogas.',
    studentProfile: 'Aluno 17 anos do 3º EM com queda de frequência e irritabilidade.',
    trigger: 'Padrão de três semanas com sinais físicos de uso e faltas recorrentes.',
    markers: ['vulnerabilidade_territorial', 'drogas', 'evasão_iminente'],
    treeTraversal: [
      { step: 1, nodeId: 'S6_P2', label: 'Abordagem reservada e acionamento da coordenação.', actor: 'professor', action: 'Abordagem reservada e acionamento da coordenação.', rationale: 'Evita exposição e ruptura de vínculo.', alertTriggered: 'A02' },
      { step: 2, nodeId: 'ESCUTA_COORDENACAO', label: 'Escuta não punitiva com aluno.', actor: 'coordenação', action: 'Escuta não punitiva com aluno.', rationale: 'Favorece adesão.', alertTriggered: 'A16' },
      { step: 3, nodeId: 'TRIAGEM_SUBSTANCIAS', label: 'Distingue uso ocasional vs problemático.', actor: 'coordenação', action: 'Distingue uso ocasional vs problemático.', rationale: 'Define fluxo correto.' },
      { step: 4, nodeId: 'CAPS_AD_REFERRAL', label: 'Encaminha CAPS AD com carta escolar.', actor: 'coordenação', action: 'Encaminha CAPS AD com carta escolar.', rationale: 'Dependência é caso de saúde.' },
      { step: 5, nodeId: 'FAMILIA_CONTACT', label: 'Engaja família com consentimento do adolescente.', actor: 'coordenação', action: 'Engaja família com consentimento do adolescente.', rationale: 'Aliança terapêutica.' },
      { step: 6, nodeId: 'CRAS_SOCIAL', label: 'Aciona CRAS se vulnerabilidade econômica.', actor: 'coordenação', action: 'Aciona CRAS se vulnerabilidade econômica.', rationale: 'Determinantes sociais importam.' },
      { step: 7, nodeId: 'PEDAGOGICAL_PLAN', label: 'Plano pedagógico de manutenção do vínculo.', actor: 'coordenação + professor', action: 'Plano pedagógico de manutenção do vínculo.', rationale: 'Reduz risco de evasão.' }
    ],
    outcome: 'CAPS AD ativo, frequência monitorada e reavaliação em 30 dias.',
    followUpDays: 30,
    lessonsLearned: ['Substância: fluxo de saúde, não punição.', 'Vínculo escolar é fator protetivo.', 'Rede social + pedagógica deve caminhar junta.']
  }
];
