import type { DecisionTreeV2, LeafInstrumentId, ManagementNotificationTiming, ManagementRole, RiskClassification, UrgencyLevel } from '../types/decision-tree-v2';

type LeafConfig = {
  id: string;
  riskClassification: RiskClassification;
  title: string;
  actions: string[];
  urgencyLevel: UrgencyLevel;
  services: Array<{ serviceId: string; urgency: UrgencyLevel; note?: string }>;
  recordingTitle: string;
  recordingInstructions: string[];
  followUpTitle: string;
  followUpDeadline: string;
  followUpFrequency: string;
  followUpResponsible: string;
  managementTiming: ManagementNotificationTiming;
  managementRoles: ManagementRole[];
  managementMessage: string;
  instruments: LeafInstrumentId[];
};

const makeLeaf = ({
  id,
  riskClassification,
  title,
  actions,
  urgencyLevel,
  services,
  recordingTitle,
  recordingInstructions,
  followUpTitle,
  followUpDeadline,
  followUpFrequency,
  followUpResponsible,
  managementTiming,
  managementRoles,
  managementMessage,
  instruments
}: LeafConfig) => ({
  id,
  level: 'LEAF' as const,
  riskClassification,
  primaryActions: {
    title,
    actions,
    urgencyLevel
  },
  contactTargets: {
    title: 'Rede de acionamento',
    services
  },
  managementNotification: {
    required: true,
    timing: managementTiming,
    roles: managementRoles,
    message: managementMessage
  },
  instruments,
  recordingRequirement: {
    title: recordingTitle,
    instructions: recordingInstructions,
    system: 'CONVIVA' as const
  },
  followUp: {
    title: followUpTitle,
    frequency: followUpFrequency,
    deadline: followUpDeadline,
    responsible: followUpResponsible
  }
});

const DOMAIN_CATEGORIES = [
  { id: 'pedagogico', label: 'Pedagógico', icon: '📚', nextNodeId: 'DOM_PEDAGOGICO_Q1' },
  { id: 'saude-mental', label: 'Saúde mental', icon: '🧠', nextNodeId: 'DOM_SAUDE_MENTAL_Q1' },
  { id: 'conflitos', label: 'Conflitos', icon: '🤝', nextNodeId: 'DOM_CONFLITOS_Q1' },
  { id: 'discriminacao', label: 'Discriminação', icon: '⚖️', nextNodeId: 'DOM_DISCRIMINACAO_Q1' },
  { id: 'comportamento-grave', label: 'Comportamento grave / ato infracional', icon: '🚨', nextNodeId: 'DOM_COMPORTAMENTO_Q1' },
  { id: 'vulnerabilidade-familiar', label: 'Vulnerabilidade familiar', icon: '🏠', nextNodeId: 'DOM_VULNERABILIDADE_Q1' },
  { id: 'violacao-direitos', label: 'Violação de direitos', icon: '🛡️', nextNodeId: 'DOM_DIREITOS_Q1' },
  { id: 'uso-substancias', label: 'Uso de substâncias', icon: '💊', nextNodeId: 'DOM_SUBSTANCIAS_Q1' },
  { id: 'saude-fisica', label: 'Saúde física', icon: '🏥', nextNodeId: 'DOM_SAUDE_FISICA_Q1' },
  { id: 'gravidez-saude-sexual', label: 'Gravidez e saúde sexual', icon: '🤰', nextNodeId: 'DOM_GRAVIDEZ_Q1' },
  { id: 'inclusao-deficiencia', label: 'Inclusão / deficiência', icon: '♿', nextNodeId: 'DOM_INCLUSAO_Q1' },
  { id: 'evasao', label: 'Evasão', icon: '🎒', nextNodeId: 'DOM_EVASAO_Q1' }
] as const;

const IMMEDIATE_RISK_CARDS = [
  { id: 'suicidio-ativo', label: 'Tentativa de suicídio / plano ativo', icon: '🆘', nextNodeId: 'EMERGENCY_LEAF' },
  { id: 'lesao-grave', label: 'Lesão grave / sangramento', icon: '🩸', nextNodeId: 'EMERGENCY_LEAF' },
  { id: 'violencia-curso', label: 'Violência em curso', icon: '🚔', nextNodeId: 'EMERGENCY_LEAF' },
  { id: 'intoxicacao-desmaio', label: 'Intoxicação / desmaio', icon: '💉', nextNodeId: 'EMERGENCY_LEAF' },
  { id: 'abandono-imediato', label: 'Abandono imediato', icon: '🚸', nextNodeId: 'EMERGENCY_LEAF' },
  { id: 'violencia-sexual-recente', label: 'Violência sexual recente', icon: '❗', nextNodeId: 'EMERGENCY_LEAF' }
] as const;

export const decisionTreeV2: DecisionTreeV2 = {
  version: '3.0.0',
  rootNodeId: 'CRITICAL_TRIAGE_ROOT',
  nodes: {
    CRITICAL_TRIAGE_ROOT: {
      id: 'CRITICAL_TRIAGE_ROOT',
      level: 'CRITICAL_TRIAGE',
      question: 'Há risco imediato de vida ou integridade física neste momento?',
      options: [
        { label: 'SIM', nextNodeId: 'IMMEDIATE_RISK_SELECT', isEmergency: true },
        { label: 'NÃO', nextNodeId: 'DOMAIN_SELECT' }
      ]
    },

    IMMEDIATE_RISK_SELECT: {
      id: 'IMMEDIATE_RISK_SELECT',
      level: 'CATEGORY',
      question: 'Qual situação de risco imediato melhor descreve o caso?',
      categories: IMMEDIATE_RISK_CARDS.map((card) => ({ ...card, examples: ['Acionar proteção imediata'], skipIntermediateNode: true }))
    },

    DOMAIN_SELECT: {
      id: 'DOMAIN_SELECT',
      level: 'CATEGORY',
      question: 'Selecione o domínio principal da situação observada.',
      categories: DOMAIN_CATEGORIES.map((domain) => ({ ...domain, examples: ['Escolha o domínio predominante'], skipIntermediateNode: true }))
    },

    DOM_PEDAGOGICO_Q1: {
      id: 'DOM_PEDAGOGICO_Q1',
      level: 'SUBFLOW',
      categoryId: 'pedagogico',
      question: 'Há impacto pedagógico grave com risco de ruptura do vínculo escolar?',
      options: [
        { label: 'SIM', nextNodeId: 'LEAF_PEDAGOGICO_INTENSIVO' },
        { label: 'NÃO', nextNodeId: 'LEAF_PEDAGOGICO_APOIO' }
      ]
    },
    DOM_SAUDE_MENTAL_Q1: {
      id: 'DOM_SAUDE_MENTAL_Q1',
      level: 'SUBFLOW',
      categoryId: 'saude-mental',
      question: 'Há sinais persistentes de sofrimento emocional com prejuízo funcional?',
      options: [
        { label: 'SIM', nextNodeId: 'LEAF_SAUDE_MENTAL_PRIORITARIO' },
        { label: 'NÃO', nextNodeId: 'LEAF_SAUDE_MENTAL_MONITORADO' }
      ]
    },
    DOM_CONFLITOS_Q1: {
      id: 'DOM_CONFLITOS_Q1',
      level: 'SUBFLOW',
      categoryId: 'conflitos',
      question: 'O conflito é recorrente e envolve ameaça/intimidação continuada?',
      options: [
        { label: 'SIM', nextNodeId: 'LEAF_CONFLITO_RECORRENTE' },
        { label: 'NÃO', nextNodeId: 'LEAF_CONFLITO_PONTUAL' }
      ]
    },
    DOM_DISCRIMINACAO_Q1: {
      id: 'DOM_DISCRIMINACAO_Q1',
      level: 'SUBFLOW',
      categoryId: 'discriminacao',
      question: 'A discriminação tem gravidade moderada/grave ou repetição sistemática?',
      options: [
        { label: 'SIM', nextNodeId: 'LEAF_DISCRIMINACAO_GRAVE' },
        { label: 'NÃO', nextNodeId: 'LEAF_DISCRIMINACAO_ORIENTATIVA' }
      ]
    },
    DOM_COMPORTAMENTO_Q1: {
      id: 'DOM_COMPORTAMENTO_Q1',
      level: 'SUBFLOW',
      categoryId: 'comportamento-grave',
      question: 'Houve ato infracional ou comportamento com potencial de dano relevante?',
      options: [
        { label: 'SIM', nextNodeId: 'LEAF_COMPORTAMENTO_GRAVE' },
        { label: 'NÃO', nextNodeId: 'LEAF_COMPORTAMENTO_PREVENTIVO' }
      ]
    },
    DOM_VULNERABILIDADE_Q1: {
      id: 'DOM_VULNERABILIDADE_Q1',
      level: 'SUBFLOW',
      categoryId: 'vulnerabilidade-familiar',
      question: 'Há vulnerabilidade familiar intensa (fome, negligência ou desproteção recorrente)?',
      options: [
        { label: 'SIM', nextNodeId: 'LEAF_VULNERABILIDADE_INTENSA' },
        { label: 'NÃO', nextNodeId: 'LEAF_VULNERABILIDADE_ACOMPANHADA' }
      ]
    },
    DOM_DIREITOS_Q1: {
      id: 'DOM_DIREITOS_Q1',
      level: 'SUBFLOW',
      categoryId: 'violacao-direitos',
      question: 'Existe suspeita consistente de violação de direitos com necessidade de proteção formal?',
      options: [
        { label: 'SIM', nextNodeId: 'LEAF_DIREITOS_PROTECAO' },
        { label: 'NÃO', nextNodeId: 'LEAF_DIREITOS_ORIENTACAO' }
      ]
    },
    DOM_SUBSTANCIAS_Q1: {
      id: 'DOM_SUBSTANCIAS_Q1',
      level: 'SUBFLOW',
      categoryId: 'uso-substancias',
      question: 'O uso de substâncias está associado a risco de dano recorrente?',
      options: [
        { label: 'SIM', nextNodeId: 'LEAF_SUBSTANCIAS_PRIORITARIO' },
        { label: 'NÃO', nextNodeId: 'LEAF_SUBSTANCIAS_ORIENTATIVO' }
      ]
    },
    DOM_SAUDE_FISICA_Q1: {
      id: 'DOM_SAUDE_FISICA_Q1',
      level: 'SUBFLOW',
      categoryId: 'saude-fisica',
      question: 'Há necessidade de avaliação clínica no mesmo dia por sintomas relevantes?',
      options: [
        { label: 'SIM', nextNodeId: 'LEAF_SAUDE_FISICA_URGENTE' },
        { label: 'NÃO', nextNodeId: 'LEAF_SAUDE_FISICA_ROTINA' }
      ]
    },
    DOM_GRAVIDEZ_Q1: {
      id: 'DOM_GRAVIDEZ_Q1',
      level: 'SUBFLOW',
      categoryId: 'gravidez-saude-sexual',
      question: 'Existe situação de risco psicossocial associada à gravidez/saúde sexual?',
      options: [
        { label: 'SIM', nextNodeId: 'LEAF_GRAVIDEZ_PROTECAO' },
        { label: 'NÃO', nextNodeId: 'LEAF_GRAVIDEZ_ACOMPANHAMENTO' }
      ]
    },
    DOM_INCLUSAO_Q1: {
      id: 'DOM_INCLUSAO_Q1',
      level: 'SUBFLOW',
      categoryId: 'inclusao-deficiencia',
      question: 'Há barreira grave de acesso/participação que exige intervenção imediata da gestão?',
      options: [
        { label: 'SIM', nextNodeId: 'LEAF_INCLUSAO_PRIORITARIA' },
        { label: 'NÃO', nextNodeId: 'LEAF_INCLUSAO_PLANO' }
      ]
    },
    DOM_EVASAO_Q1: {
      id: 'DOM_EVASAO_Q1',
      level: 'SUBFLOW',
      categoryId: 'evasao',
      question: 'Há risco iminente de evasão (faltas persistentes e rompimento de vínculo)?',
      options: [
        { label: 'SIM', nextNodeId: 'LEAF_EVASAO_BUSCA_ATIVA' },
        { label: 'NÃO', nextNodeId: 'LEAF_EVASAO_PREVENCAO' }
      ]
    },

    EMERGENCY_LEAF: makeLeaf({
      id: 'EMERGENCY_LEAF',
      riskClassification: 'EMERGENCIAL',
      title: '🆘 Acionar proteção imediata e ajuda emergencial',
      actions: [
        'Interrompa a exposição ao risco e mantenha o estudante acompanhado.',
        'Acione imediatamente o serviço principal e informe a gestão escolar.',
        'Após estabilização, registre os fatos objetivos e encaminhamentos.'
      ],
      urgencyLevel: 'IMMEDIATE',
      services: [
        { serviceId: 'samu', urgency: 'IMMEDIATE' },
        { serviceId: 'policia-militar', urgency: 'IMMEDIATE' },
        { serviceId: 'conselho-tutelar', urgency: 'URGENT' }
      ],
      recordingTitle: 'Registro emergencial',
      recordingInstructions: ['Registrar horário, conduta adotada e serviço acionado.', 'Anotar responsáveis comunicados e medidas de proteção imediata.'],
      followUpTitle: 'Revisão pós-crise',
      followUpDeadline: 'até 24h',
      followUpFrequency: 'Diária na primeira semana',
      followUpResponsible: 'Direção e coordenação',
      managementTiming: 'IMEDIATO',
      managementRoles: ['DIRECAO', 'VICE_DIRECAO', 'COORDENACAO'],
      managementMessage: 'Situação de risco imediato: gestão deve ser acionada agora para proteção e registro.',
      instruments: ['anexo-i', 'anexo-ii']
    }),

    LEAF_PEDAGOGICO_INTENSIVO: makeLeaf({
      id: 'LEAF_PEDAGOGICO_INTENSIVO',
      riskClassification: 'MODERADO',
      title: 'Plano pedagógico intensivo de permanência',
      actions: ['Organizar plano pedagógico de recuperação com metas curtas.', 'Alinhar família e gestão para suporte diário de frequência.', 'Definir tutor de referência para o estudante.'],
      urgencyLevel: 'URGENT',
      services: [
        { serviceId: 'de-leste1', urgency: 'URGENT' },
        { serviceId: 'gestao-coordenacao', urgency: 'URGENT' }
      ],
      recordingTitle: 'Registro pedagógico prioritário',
      recordingInstructions: ['Registrar barreiras de aprendizagem e plano de intervenção.', 'Registrar reunião com família e responsáveis escolares.'],
      followUpTitle: 'Monitoramento de permanência',
      followUpDeadline: 'até 7 dias',
      followUpFrequency: 'Semanal',
      followUpResponsible: 'Coordenação pedagógica',
      managementTiming: 'MESMO_DIA',
      managementRoles: ['COORDENACAO', 'DIRECAO'],
      managementMessage: 'Necessário validar plano intensivo de permanência escolar com a gestão.',
      instruments: ['anexo-i']
    }),
    LEAF_PEDAGOGICO_APOIO: makeLeaf({
      id: 'LEAF_PEDAGOGICO_APOIO',
      riskClassification: 'BAIXO',
      title: 'Apoio pedagógico com acompanhamento de rotina',
      actions: ['Planejar apoio em sala e reforço pedagógico.', 'Informar família sobre ações de apoio.', 'Avaliar evolução em ciclo curto.'],
      urgencyLevel: 'SCHEDULED',
      services: [{ serviceId: 'gestao-coordenacao', urgency: 'SCHEDULED' }],
      recordingTitle: 'Registro de acompanhamento pedagógico',
      recordingInstructions: ['Registrar estratégia aplicada e evidências de progresso.', 'Revisar adequações em conselho de classe.'],
      followUpTitle: 'Acompanhamento pedagógico',
      followUpDeadline: 'até 15 dias',
      followUpFrequency: 'Quinzenal',
      followUpResponsible: 'Professor referência e coordenação',
      managementTiming: 'CIENCIA',
      managementRoles: ['COORDENACAO'],
      managementMessage: 'Caso pedagógico em acompanhamento de rotina para ciência da gestão.',
      instruments: ['anexo-i']
    }),

    LEAF_SAUDE_MENTAL_PRIORITARIO: makeLeaf({
      id: 'LEAF_SAUDE_MENTAL_PRIORITARIO',
      riskClassification: 'ALTO',
      title: 'Cuidado prioritário em saúde mental',
      actions: ['Garantir escuta protegida e acolhimento imediato.', 'Acionar família e encaminhar para avaliação especializada.', 'Definir plano escolar de proteção emocional.'],
      urgencyLevel: 'URGENT',
      services: [
        { serviceId: 'caps-ij', urgency: 'URGENT' },
        { serviceId: 'ubs-ermelino', urgency: 'SCHEDULED' }
      ],
      recordingTitle: 'Registro de saúde mental',
      recordingInstructions: ['Registrar sinais, relato e condutas de acolhimento.', 'Registrar encaminhamentos e responsáveis acionados.'],
      followUpTitle: 'Plano de cuidado escolar',
      followUpDeadline: 'até 5 dias',
      followUpFrequency: 'Semanal',
      followUpResponsible: 'Coordenação e professor referência',
      managementTiming: 'MESMO_DIA',
      managementRoles: ['COORDENACAO', 'DIRECAO'],
      managementMessage: 'Saúde mental prioritária: alinhar rede de cuidado com gestão no mesmo dia.',
      instruments: ['anexo-i', 'anexo-ii']
    }),
    LEAF_SAUDE_MENTAL_MONITORADO: makeLeaf({
      id: 'LEAF_SAUDE_MENTAL_MONITORADO',
      riskClassification: 'MODERADO',
      title: 'Monitoramento de saúde mental com apoio escolar',
      actions: ['Oferecer escuta inicial e orientar busca de cuidado na rede.', 'Manter observação ativa em sala.', 'Reavaliar sinais de piora em curto prazo.'],
      urgencyLevel: 'SCHEDULED',
      services: [{ serviceId: 'ubs-ermelino', urgency: 'SCHEDULED' }],
      recordingTitle: 'Registro de observação',
      recordingInstructions: ['Registrar sinais observados de forma objetiva.', 'Marcar data de reavaliação com equipe.'],
      followUpTitle: 'Revisão de sinais',
      followUpDeadline: 'até 10 dias',
      followUpFrequency: 'Semanal',
      followUpResponsible: 'Professor referência',
      managementTiming: 'CIENCIA',
      managementRoles: ['COORDENACAO'],
      managementMessage: 'Monitoramento de saúde mental em curso para ciência da coordenação.',
      instruments: ['anexo-i']
    }),

    LEAF_CONFLITO_RECORRENTE: makeLeaf({
      id: 'LEAF_CONFLITO_RECORRENTE',
      riskClassification: 'MODERADO',
      title: 'Intervenção estruturada para conflito recorrente',
      actions: ['Aplicar plano restaurativo com mediação acompanhada.', 'Envolver família e gestão na pactuação de convivência.', 'Monitorar reincidência com registro objetivo.'],
      urgencyLevel: 'URGENT',
      services: [
        { serviceId: 'gestao-vice', urgency: 'URGENT' },
        { serviceId: 'conselho-tutelar', urgency: 'SCHEDULED', note: 'Acionar se houver ameaça a direitos.' }
      ],
      recordingTitle: 'Registro de convivência',
      recordingInstructions: ['Registrar episódios, participantes e medidas restaurativas.', 'Registrar pactos e responsáveis pelo acompanhamento.'],
      followUpTitle: 'Monitoramento de convivência',
      followUpDeadline: 'até 7 dias',
      followUpFrequency: 'Semanal',
      followUpResponsible: 'Vice-direção e coordenação',
      managementTiming: 'MESMO_DIA',
      managementRoles: ['VICE_DIRECAO', 'COORDENACAO'],
      managementMessage: 'Conflito recorrente exige pactuação imediata com gestão escolar.',
      instruments: ['anexo-i']
    }),
    LEAF_CONFLITO_PONTUAL: makeLeaf({
      id: 'LEAF_CONFLITO_PONTUAL',
      riskClassification: 'BAIXO',
      title: 'Manejo educativo para conflito pontual',
      actions: ['Realizar mediação breve com foco pedagógico.', 'Ajustar combinados de convivência com os envolvidos.', 'Acompanhar retorno em sala.'],
      urgencyLevel: 'SCHEDULED',
      services: [{ serviceId: 'gestao-coordenacao', urgency: 'SCHEDULED' }],
      recordingTitle: 'Registro de mediação',
      recordingInstructions: ['Registrar medidas educativas aplicadas.', 'Registrar devolutiva aos responsáveis, quando necessário.'],
      followUpTitle: 'Revisão de convivência',
      followUpDeadline: 'até 14 dias',
      followUpFrequency: 'Quinzenal',
      followUpResponsible: 'Coordenação',
      managementTiming: 'CIENCIA',
      managementRoles: ['COORDENACAO'],
      managementMessage: 'Conflito pontual em acompanhamento pedagógico.',
      instruments: ['anexo-i']
    }),

    LEAF_DISCRIMINACAO_GRAVE: makeLeaf({
      id: 'LEAF_DISCRIMINACAO_GRAVE',
      riskClassification: 'ALTO',
      title: 'Resposta institucional para discriminação grave',
      actions: ['Garantir proteção da vítima e interromper exposição discriminatória.', 'Acionar gestão e responsáveis com plano de responsabilização pedagógica.', 'Encaminhar rede de proteção quando houver violação de direitos.'],
      urgencyLevel: 'URGENT',
      services: [
        { serviceId: 'conselho-tutelar', urgency: 'URGENT' },
        { serviceId: 'de-leste1', urgency: 'SCHEDULED' }
      ],
      recordingTitle: 'Registro de discriminação',
      recordingInstructions: ['Registrar falas/fatos objetivos e medidas de proteção adotadas.', 'Registrar comunicação institucional e encaminhamentos.'],
      followUpTitle: 'Acompanhamento protetivo',
      followUpDeadline: 'até 5 dias',
      followUpFrequency: 'Semanal',
      followUpResponsible: 'Direção e coordenação',
      managementTiming: 'IMEDIATO',
      managementRoles: ['DIRECAO', 'VICE_DIRECAO', 'COORDENACAO'],
      managementMessage: 'Caso de discriminação moderada/grave exige resposta institucional imediata.',
      instruments: ['anexo-iii', 'anexo-i']
    }),
    LEAF_DISCRIMINACAO_ORIENTATIVA: makeLeaf({
      id: 'LEAF_DISCRIMINACAO_ORIENTATIVA',
      riskClassification: 'MODERADO',
      title: 'Intervenção educativa em discriminação inicial',
      actions: ['Realizar intervenção pedagógica imediata com foco restaurativo.', 'Orientar turma e responsáveis sobre convivência respeitosa.', 'Monitorar reincidência com registro.'],
      urgencyLevel: 'SCHEDULED',
      services: [{ serviceId: 'gestao-vice', urgency: 'SCHEDULED' }],
      recordingTitle: 'Registro de convivência antidiscriminatória',
      recordingInstructions: ['Registrar contexto do episódio e ação educativa.', 'Registrar combinado de prevenção de recorrência.'],
      followUpTitle: 'Monitoramento antidiscriminação',
      followUpDeadline: 'até 10 dias',
      followUpFrequency: 'Quinzenal',
      followUpResponsible: 'Vice-direção e professores',
      managementTiming: 'MESMO_DIA',
      managementRoles: ['VICE_DIRECAO', 'COORDENACAO'],
      managementMessage: 'Discriminação em acompanhamento com ação pedagógica e monitoramento.',
      instruments: ['anexo-iii']
    }),

    LEAF_COMPORTAMENTO_GRAVE: makeLeaf({
      id: 'LEAF_COMPORTAMENTO_GRAVE',
      riskClassification: 'ALTO',
      title: 'Resposta para comportamento grave / ato infracional',
      actions: ['Assegurar proteção dos envolvidos e separar partes com segurança.', 'Acionar gestão e responsáveis para encaminhamento formal.', 'Articular rede de proteção conforme gravidade do fato.'],
      urgencyLevel: 'URGENT',
      services: [
        { serviceId: 'conselho-tutelar', urgency: 'URGENT' },
        { serviceId: 'delegacia-civil-197', urgency: 'SCHEDULED' }
      ],
      recordingTitle: 'Registro de ocorrência grave',
      recordingInstructions: ['Registrar fatos objetivos, envolvidos e testemunhas.', 'Registrar acionamento de rede externa e responsáveis.'],
      followUpTitle: 'Acompanhamento de responsabilização',
      followUpDeadline: 'até 72h',
      followUpFrequency: 'Semanal',
      followUpResponsible: 'Direção e vice-direção',
      managementTiming: 'IMEDIATO',
      managementRoles: ['DIRECAO', 'VICE_DIRECAO'],
      managementMessage: 'Ato grave requer validação imediata da gestão e encaminhamento formal.',
      instruments: ['anexo-i', 'anexo-iii']
    }),
    LEAF_COMPORTAMENTO_PREVENTIVO: makeLeaf({
      id: 'LEAF_COMPORTAMENTO_PREVENTIVO',
      riskClassification: 'MODERADO',
      title: 'Plano preventivo para comportamento de risco',
      actions: ['Definir plano de comportamento com metas claras.', 'Acompanhar família e responsáveis.', 'Reavaliar sinais de escalada do risco.'],
      urgencyLevel: 'SCHEDULED',
      services: [{ serviceId: 'gestao-coordenacao', urgency: 'SCHEDULED' }],
      recordingTitle: 'Registro preventivo de conduta',
      recordingInstructions: ['Registrar combinados e estratégias de apoio.', 'Registrar indicadores de evolução comportamental.'],
      followUpTitle: 'Monitoramento preventivo',
      followUpDeadline: 'até 14 dias',
      followUpFrequency: 'Quinzenal',
      followUpResponsible: 'Coordenação e professor referência',
      managementTiming: 'CIENCIA',
      managementRoles: ['COORDENACAO'],
      managementMessage: 'Plano preventivo em acompanhamento pedagógico.',
      instruments: ['anexo-i']
    }),

    LEAF_VULNERABILIDADE_INTENSA: makeLeaf({
      id: 'LEAF_VULNERABILIDADE_INTENSA',
      riskClassification: 'ALTO',
      title: 'Proteção social intensiva',
      actions: ['Acionar rede socioassistencial para proteção imediata.', 'Notificar gestão e família/responsáveis conforme protocolo.', 'Assegurar plano de permanência escolar com suporte social.'],
      urgencyLevel: 'URGENT',
      services: [
        { serviceId: 'cras-ermelino', urgency: 'URGENT' },
        { serviceId: 'creas-ermelino', urgency: 'SCHEDULED' }
      ],
      recordingTitle: 'Registro de vulnerabilidade social',
      recordingInstructions: ['Registrar fatores de desproteção e necessidades urgentes.', 'Registrar encaminhamentos para assistência social.'],
      followUpTitle: 'Acompanhamento social',
      followUpDeadline: 'até 7 dias',
      followUpFrequency: 'Semanal',
      followUpResponsible: 'Coordenação e gestão',
      managementTiming: 'MESMO_DIA',
      managementRoles: ['DIRECAO', 'COORDENACAO'],
      managementMessage: 'Vulnerabilidade intensa requer articulação imediata da rede social.',
      instruments: ['anexo-i', 'anexo-ii']
    }),
    LEAF_VULNERABILIDADE_ACOMPANHADA: makeLeaf({
      id: 'LEAF_VULNERABILIDADE_ACOMPANHADA',
      riskClassification: 'MODERADO',
      title: 'Acompanhamento social orientado',
      actions: ['Mapear necessidades da família com escuta qualificada.', 'Orientar acesso aos serviços sociais do território.', 'Monitorar adesão ao plano de apoio.'],
      urgencyLevel: 'SCHEDULED',
      services: [{ serviceId: 'cras-ermelino', urgency: 'SCHEDULED' }],
      recordingTitle: 'Registro social de acompanhamento',
      recordingInstructions: ['Registrar necessidades identificadas e orientações dadas.', 'Registrar retorno da família sobre acesso à rede.'],
      followUpTitle: 'Revisão de suporte social',
      followUpDeadline: 'até 15 dias',
      followUpFrequency: 'Quinzenal',
      followUpResponsible: 'Coordenação',
      managementTiming: 'CIENCIA',
      managementRoles: ['COORDENACAO'],
      managementMessage: 'Acompanhamento social em andamento com foco preventivo.',
      instruments: ['anexo-i']
    }),

    LEAF_DIREITOS_PROTECAO: makeLeaf({
      id: 'LEAF_DIREITOS_PROTECAO',
      riskClassification: 'ALTO',
      title: 'Proteção formal por violação de direitos',
      actions: ['Acionar proteção especializada para garantia de direitos.', 'Realizar escuta protegida e notificação institucional.', 'Acompanhar cumprimento dos encaminhamentos.'],
      urgencyLevel: 'URGENT',
      services: [
        { serviceId: 'conselho-tutelar', urgency: 'URGENT' },
        { serviceId: 'creas-ermelino', urgency: 'SCHEDULED' }
      ],
      recordingTitle: 'Registro de violação de direitos',
      recordingInstructions: ['Registrar relato e evidências observáveis sem julgamento.', 'Registrar órgãos acionados e respostas recebidas.'],
      followUpTitle: 'Monitoramento protetivo',
      followUpDeadline: 'até 5 dias',
      followUpFrequency: 'Semanal',
      followUpResponsible: 'Direção e coordenação',
      managementTiming: 'IMEDIATO',
      managementRoles: ['DIRECAO', 'COORDENACAO'],
      managementMessage: 'Violação de direitos exige comunicação imediata à gestão e rede de proteção.',
      instruments: ['anexo-i', 'anexo-ii']
    }),
    LEAF_DIREITOS_ORIENTACAO: makeLeaf({
      id: 'LEAF_DIREITOS_ORIENTACAO',
      riskClassification: 'MODERADO',
      title: 'Orientação e proteção de direitos com monitoramento',
      actions: ['Orientar família e estudante sobre direitos e canais de proteção.', 'Acompanhar evolução do caso no contexto escolar.', 'Escalonar para proteção formal se houver agravamento.'],
      urgencyLevel: 'SCHEDULED',
      services: [{ serviceId: 'conselho-tutelar', urgency: 'SCHEDULED' }],
      recordingTitle: 'Registro orientativo de direitos',
      recordingInstructions: ['Registrar orientação prestada e devolutiva da família.', 'Registrar sinais de agravamento para reclassificação.'],
      followUpTitle: 'Revisão protetiva',
      followUpDeadline: 'até 10 dias',
      followUpFrequency: 'Semanal',
      followUpResponsible: 'Coordenação',
      managementTiming: 'MESMO_DIA',
      managementRoles: ['COORDENACAO'],
      managementMessage: 'Caso de direitos em observação com possibilidade de escalonamento.',
      instruments: ['anexo-i', 'anexo-ii']
    }),

    LEAF_SUBSTANCIAS_PRIORITARIO: makeLeaf({
      id: 'LEAF_SUBSTANCIAS_PRIORITARIO',
      riskClassification: 'ALTO',
      title: 'Encaminhamento prioritário por uso de substâncias',
      actions: ['Acolher sem julgamento e remover exposição a riscos imediatos.', 'Acionar família e rede de saúde especializada.', 'Definir plano escolar de proteção e frequência.'],
      urgencyLevel: 'URGENT',
      services: [
        { serviceId: 'caps-ad', urgency: 'URGENT' },
        { serviceId: 'caps-ij', urgency: 'SCHEDULED' }
      ],
      recordingTitle: 'Registro de uso de substâncias',
      recordingInstructions: ['Registrar sinais observados e condutas de proteção.', 'Registrar encaminhamento e aceite da família.'],
      followUpTitle: 'Acompanhamento de redução de danos',
      followUpDeadline: 'até 7 dias',
      followUpFrequency: 'Semanal',
      followUpResponsible: 'Coordenação e equipe de referência',
      managementTiming: 'MESMO_DIA',
      managementRoles: ['DIRECAO', 'COORDENACAO'],
      managementMessage: 'Uso de substâncias com risco de dano requer alinhamento imediato com gestão.',
      instruments: ['anexo-i', 'anexo-ii']
    }),
    LEAF_SUBSTANCIAS_ORIENTATIVO: makeLeaf({
      id: 'LEAF_SUBSTANCIAS_ORIENTATIVO',
      riskClassification: 'MODERADO',
      title: 'Orientação preventiva para uso de substâncias',
      actions: ['Realizar orientação breve de prevenção e redução de danos.', 'Envolver família e reforçar fatores de proteção.', 'Reavaliar sinais de agravamento periodicamente.'],
      urgencyLevel: 'SCHEDULED',
      services: [{ serviceId: 'ubs-ermelino', urgency: 'SCHEDULED' }],
      recordingTitle: 'Registro preventivo de substâncias',
      recordingInstructions: ['Registrar orientação realizada e combinados.', 'Registrar data de retorno para avaliação.'],
      followUpTitle: 'Revisão preventiva',
      followUpDeadline: 'até 15 dias',
      followUpFrequency: 'Quinzenal',
      followUpResponsible: 'Professor referência e coordenação',
      managementTiming: 'CIENCIA',
      managementRoles: ['COORDENACAO'],
      managementMessage: 'Acompanhamento preventivo de substâncias para ciência da gestão.',
      instruments: ['anexo-i']
    }),

    LEAF_SAUDE_FISICA_URGENTE: makeLeaf({
      id: 'LEAF_SAUDE_FISICA_URGENTE',
      riskClassification: 'ALTO',
      title: 'Avaliação clínica no mesmo dia',
      actions: ['Garantir avaliação de saúde no mesmo turno.', 'Comunicar família e gestão sobre encaminhamento.', 'Monitorar retorno e recomendações médicas.'],
      urgencyLevel: 'URGENT',
      services: [
        { serviceId: 'upa-ermelino', urgency: 'URGENT' },
        { serviceId: 'ubs-ermelino', urgency: 'SCHEDULED' }
      ],
      recordingTitle: 'Registro de saúde física urgente',
      recordingInstructions: ['Registrar sinais clínicos e horário do encaminhamento.', 'Registrar orientações médicas recebidas pela escola.'],
      followUpTitle: 'Acompanhamento clínico escolar',
      followUpDeadline: 'até 48h',
      followUpFrequency: 'Semanal',
      followUpResponsible: 'Direção e coordenação',
      managementTiming: 'MESMO_DIA',
      managementRoles: ['DIRECAO', 'COORDENACAO'],
      managementMessage: 'Encaminhamento clínico urgente deve ser informado à gestão no mesmo dia.',
      instruments: ['anexo-i']
    }),
    LEAF_SAUDE_FISICA_ROTINA: makeLeaf({
      id: 'LEAF_SAUDE_FISICA_ROTINA',
      riskClassification: 'BAIXO',
      title: 'Encaminhamento clínico de rotina',
      actions: ['Orientar atendimento na atenção básica.', 'Registrar queixa e orientação para família.', 'Acompanhar evolução com equipe escolar.'],
      urgencyLevel: 'SCHEDULED',
      services: [{ serviceId: 'ubs-ermelino', urgency: 'SCHEDULED' }],
      recordingTitle: 'Registro de orientação clínica',
      recordingInstructions: ['Registrar orientação dada e data prevista de retorno.', 'Registrar intercorrências escolares, se houver.'],
      followUpTitle: 'Revisão de bem-estar físico',
      followUpDeadline: 'até 15 dias',
      followUpFrequency: 'Quinzenal',
      followUpResponsible: 'Professor referência',
      managementTiming: 'CIENCIA',
      managementRoles: ['COORDENACAO'],
      managementMessage: 'Caso clínico sem urgência em acompanhamento escolar.',
      instruments: ['anexo-i']
    }),

    LEAF_GRAVIDEZ_PROTECAO: makeLeaf({
      id: 'LEAF_GRAVIDEZ_PROTECAO',
      riskClassification: 'MODERADO',
      title: 'Proteção e cuidado em gravidez/saúde sexual',
      actions: ['Assegurar acolhimento sigiloso e orientação qualificada.', 'Encaminhar para rede de saúde e proteção social quando necessário.', 'Pactuar plano de permanência escolar com gestão.'],
      urgencyLevel: 'URGENT',
      services: [
        { serviceId: 'ubs-ermelino', urgency: 'URGENT' },
        { serviceId: 'cras-ermelino', urgency: 'SCHEDULED' }
      ],
      recordingTitle: 'Registro de cuidado em saúde sexual',
      recordingInstructions: ['Registrar orientação e encaminhamentos realizados.', 'Registrar plano de apoio para permanência escolar.'],
      followUpTitle: 'Acompanhamento de permanência',
      followUpDeadline: 'até 7 dias',
      followUpFrequency: 'Semanal',
      followUpResponsible: 'Coordenação e gestão',
      managementTiming: 'MESMO_DIA',
      managementRoles: ['COORDENACAO', 'DIRECAO'],
      managementMessage: 'Necessário alinhar proteção e permanência escolar com gestão.',
      instruments: ['anexo-i', 'anexo-ii']
    }),
    LEAF_GRAVIDEZ_ACOMPANHAMENTO: makeLeaf({
      id: 'LEAF_GRAVIDEZ_ACOMPANHAMENTO',
      riskClassification: 'BAIXO',
      title: 'Acompanhamento de rotina em gravidez/saúde sexual',
      actions: ['Orientar continuidade do cuidado em saúde.', 'Ajustar rotina escolar para garantir permanência.', 'Monitorar frequência e bem-estar.'],
      urgencyLevel: 'SCHEDULED',
      services: [{ serviceId: 'ubs-ermelino', urgency: 'SCHEDULED' }],
      recordingTitle: 'Registro de acompanhamento em saúde sexual',
      recordingInstructions: ['Registrar orientações e retornos combinados.', 'Registrar medidas de apoio escolar implementadas.'],
      followUpTitle: 'Revisão de suporte escolar',
      followUpDeadline: 'até 15 dias',
      followUpFrequency: 'Quinzenal',
      followUpResponsible: 'Coordenação',
      managementTiming: 'CIENCIA',
      managementRoles: ['COORDENACAO'],
      managementMessage: 'Acompanhamento de rotina em saúde sexual para ciência da gestão.',
      instruments: ['anexo-i']
    }),

    LEAF_INCLUSAO_PRIORITARIA: makeLeaf({
      id: 'LEAF_INCLUSAO_PRIORITARIA',
      riskClassification: 'MODERADO',
      title: 'Intervenção prioritária de inclusão e acessibilidade',
      actions: ['Remover barreiras imediatas de acesso e participação.', 'Acionar gestão para adequações e apoios especializados.', 'Registrar plano de acessibilidade com responsabilidades.'],
      urgencyLevel: 'URGENT',
      services: [
        { serviceId: 'de-leste1', urgency: 'URGENT' },
        { serviceId: 'gestao-coordenacao', urgency: 'URGENT' }
      ],
      recordingTitle: 'Registro de acessibilidade prioritária',
      recordingInstructions: ['Registrar barreiras identificadas e ajustes imediatos.', 'Registrar plano de adequações pedagógicas e estruturais.'],
      followUpTitle: 'Monitoramento de inclusão',
      followUpDeadline: 'até 7 dias',
      followUpFrequency: 'Semanal',
      followUpResponsible: 'Coordenação e direção',
      managementTiming: 'MESMO_DIA',
      managementRoles: ['DIRECAO', 'COORDENACAO'],
      managementMessage: 'Barreira de inclusão grave exige validação imediata da gestão.',
      instruments: ['anexo-i']
    }),
    LEAF_INCLUSAO_PLANO: makeLeaf({
      id: 'LEAF_INCLUSAO_PLANO',
      riskClassification: 'BAIXO',
      title: 'Plano de inclusão com ajustes progressivos',
      actions: ['Mapear necessidades educacionais específicas.', 'Definir adaptações pedagógicas com equipe.', 'Acompanhar implementação e resultados.'],
      urgencyLevel: 'SCHEDULED',
      services: [{ serviceId: 'gestao-coordenacao', urgency: 'SCHEDULED' }],
      recordingTitle: 'Registro de plano inclusivo',
      recordingInstructions: ['Registrar adequações definidas e responsáveis.', 'Registrar evidências de evolução da participação.'],
      followUpTitle: 'Revisão de ajustes inclusivos',
      followUpDeadline: 'até 20 dias',
      followUpFrequency: 'Mensal',
      followUpResponsible: 'Coordenação pedagógica',
      managementTiming: 'CIENCIA',
      managementRoles: ['COORDENACAO'],
      managementMessage: 'Plano inclusivo em andamento para ciência da gestão.',
      instruments: ['anexo-i']
    }),

    LEAF_EVASAO_BUSCA_ATIVA: makeLeaf({
      id: 'LEAF_EVASAO_BUSCA_ATIVA',
      riskClassification: 'ALTO',
      title: 'Busca ativa para risco de evasão',
      actions: ['Acionar família e rede de proteção para restabelecer vínculo.', 'Definir plano emergencial de retorno escolar.', 'Acompanhar presença diária no período inicial.'],
      urgencyLevel: 'URGENT',
      services: [
        { serviceId: 'cras-ermelino', urgency: 'URGENT' },
        { serviceId: 'conselho-tutelar', urgency: 'SCHEDULED' }
      ],
      recordingTitle: 'Registro de risco de evasão',
      recordingInstructions: ['Registrar faltas e tentativas de contato realizadas.', 'Registrar pactuação de retorno e apoios ofertados.'],
      followUpTitle: 'Monitoramento de frequência',
      followUpDeadline: 'até 5 dias',
      followUpFrequency: 'Semanal',
      followUpResponsible: 'Gestão e professor referência',
      managementTiming: 'MESMO_DIA',
      managementRoles: ['DIRECAO', 'VICE_DIRECAO', 'COORDENACAO'],
      managementMessage: 'Risco de evasão exige busca ativa com gestão no mesmo dia.',
      instruments: ['anexo-i', 'anexo-ii']
    }),
    LEAF_EVASAO_PREVENCAO: makeLeaf({
      id: 'LEAF_EVASAO_PREVENCAO',
      riskClassification: 'MODERADO',
      title: 'Prevenção de evasão com plano de permanência',
      actions: ['Fortalecer vínculo escolar com plano personalizado.', 'Acompanhar frequência e participação.', 'Promover diálogo contínuo com responsáveis.'],
      urgencyLevel: 'SCHEDULED',
      services: [{ serviceId: 'gestao-vice', urgency: 'SCHEDULED' }],
      recordingTitle: 'Registro preventivo de evasão',
      recordingInstructions: ['Registrar estratégia de permanência e responsáveis.', 'Registrar indicadores de presença e engajamento.'],
      followUpTitle: 'Revisão de permanência',
      followUpDeadline: 'até 15 dias',
      followUpFrequency: 'Quinzenal',
      followUpResponsible: 'Vice-direção e coordenação',
      managementTiming: 'CIENCIA',
      managementRoles: ['VICE_DIRECAO', 'COORDENACAO'],
      managementMessage: 'Plano preventivo de evasão em monitoramento.',
      instruments: ['anexo-i']
    })
  }
};
