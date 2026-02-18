import { ActionPriority, ContactTarget, Contato, DecisionResult, DocumentTemplate, FlowNode, Fluxo, ProtocolData, Recurso, Service, ServiceTarget } from '../types';

type RawService = Omit<Service, 'type' | 'targetType' | 'phones' | 'howToCall' | 'riskLevel' | 'strategicDescription' | 'geoStatus' | 'sourceOfficial' | 'officialSource' | 'verifiedAt' | 'verifiedBy' | 'networkType'>;

const BASE_SERVICES: RawService[] = [
  {
    id: 'ubs-ermelino',
    name: 'UBS Ermelino Matarazzo',
    category: 'SAÚDE',
    address: 'Rua Antônio de Freitas Toledo, 185 - Ermelino Matarazzo - São Paulo/SP - CEP 03812-050',
    phone: '(11) 2545-8235 / (11) 2542-0945',
    coordinates: { lat: -23.4869, lng: -46.4793 },
    hours: 'Seg a Sex, 7h às 19h',
    notes: 'Porta de entrada SUS para saúde geral e cuidado longitudinal.'
  },
  {
    id: 'caps-ij',
    name: 'CAPS Infantojuvenil II Ermelino Matarazzo',
    category: 'SAÚDE',
    address: 'Rua Antônio Bonici, 18 - Ermelino Matarazzo - São Paulo/SP - CEP 03811-060',
    phone: '(11) 3294-3828 / (11) 2544-1490',
    coordinates: { lat: -23.4877, lng: -46.4807 },
    hours: 'Seg a Sex, 7h às 19h',
    notes: 'Sofrimento psíquico infantojuvenil com necessidade de cuidado especializado.'
  },
  {
    id: 'caps-adulto',
    name: 'CAPS Adulto II Ermelino Matarazzo',
    category: 'SAÚDE',
    address: 'Avenida Boturussu, 168 - Parque Boturussu - São Paulo/SP - CEP 03804-000',
    phone: '(11) 2546-6787 / (11) 2544-0406',
    coordinates: { lat: -23.4938, lng: -46.4749 },
    hours: 'Seg a Sex, 7h às 19h'
  },
  {
    id: 'caps-ad',
    name: 'CAPS AD II Ermelino Matarazzo',
    category: 'SAÚDE',
    address: 'Rua João Antônio de Andrade, 804 - Parque Boturussu - São Paulo/SP - CEP 03804-000',
    phone: '(11) 2943-9276 / (11) 2546-2597',
    coordinates: { lat: -23.4942, lng: -46.4743 },
    hours: 'Seg a Sex, 7h às 19h'
  },
  {
    id: 'upa-ermelino',
    name: 'UPA Ermelino Matarazzo',
    category: 'SAÚDE',
    address: 'Rua Miguel Novais, 113 - Vila Paranaguá - São Paulo/SP - CEP 03807-370',
    phone: '(11) 2574-3258',
    coordinates: { lat: -23.4912, lng: -46.4686 },
    hours: '24 horas'
  },
  {
    id: 'cras-ermelino',
    name: 'CRAS Ermelino',
    category: 'SOCIAL',
    address: 'Avenida Paranaguá, 2045 - Ermelino Matarazzo - São Paulo/SP - CEP 03806-010',
    phone: '(11) 2545-3211 / (11) 2545-3222',
    coordinates: { lat: -23.486, lng: -46.4718 },
    hours: 'Seg a Sex, 8h às 18h'
  },
  {
    id: 'creas-ermelino',
    name: 'CREAS Ermelino',
    category: 'SOCIAL',
    address: 'Avenida Boturussu, 131 - Ermelino Matarazzo - São Paulo/SP - CEP 03804-000',
    phone: '(11) 2541-7882',
    coordinates: { lat: -23.4929, lng: -46.4747 },
    hours: 'Seg a Sex, 8h às 18h'
  },
  {
    id: 'conselho-tutelar',
    name: 'Conselho Tutelar Ermelino Matarazzo',
    category: 'DIREITOS_SGD',
    address: 'Rua Chesira Maltauro, 342 - Ermelino Matarazzo - São Paulo/SP - CEP 03811-100',
    phone: '(11) 2214-9050 / (11) 2546-0657 / (11) 2546-3257',
    coordinates: { lat: -23.4885, lng: -46.4801 },
    notes: 'Acionamento obrigatório em ameaça/violação de direitos de criança e adolescente.'
  },
  {
    id: 'ddm-sao-miguel',
    name: 'DDM São Miguel Paulista',
    category: 'DIREITOS_SGD',
    address: 'Rua Dríades, 50 - 2º andar - São Miguel Paulista - São Paulo/SP - CEP 08010-190',
    phone: '(11) 6154-1362 / (11) 6153-7666',
    coordinates: { lat: -23.4996, lng: -46.4449 }
  },
  {
    id: 'delegacia-civil-197',
    name: 'Polícia Civil (orientação e acionamento)',
    category: 'DIREITOS_SGD',
    address: 'Canal remoto SSP-SP',
    phone: '197',
    notes: 'Para orientação e acionamento da Polícia Civil. Em violência em curso, usar 190.'
  },
  {
    id: 'defensoria',
    name: 'Defensoria Pública',
    category: 'DIREITOS_SGD',
    address: 'Canal estadual / foro regional',
    phone: '0800 773 4340'
  },
  {
    id: 'de-leste1',
    name: 'Diretoria de Ensino Região Leste 1',
    category: 'EDUCAÇÃO',
    address: 'Rua Caetano de Campos, 220 - Tatuapé - São Paulo/SP - CEP 03088-010',
    phone: '0800 770 0012',
    coordinates: { lat: -23.5409, lng: -46.5797 },
    notes: 'Apoio institucional, supervisão e orientação técnica.'
  },
  {
    id: 'conviva',
    name: 'Plataforma Conviva / SED',
    category: 'EDUCAÇÃO',
    address: 'Secretaria Escolar Digital',
    phone: 'Acesso institucional',
    notes: 'Registro obrigatório de ocorrências quando previsto em protocolo.'
  },
  {
    id: 'policia-militar',
    name: 'Polícia Militar',
    category: 'EMERGÊNCIA',
    address: 'Acionamento telefônico',
    phone: '190',
    hours: '24 horas'
  },
  {
    id: 'samu',
    name: 'SAMU',
    category: 'EMERGÊNCIA',
    address: 'Acionamento telefônico',
    phone: '192',
    hours: '24 horas'
  },
  {
    id: 'bombeiros',
    name: 'Corpo de Bombeiros',
    category: 'EMERGÊNCIA',
    address: 'Acionamento telefônico',
    phone: '193',
    hours: '24 horas'
  },
  {
    id: 'disque-100',
    name: 'Disque 100 - Direitos Humanos',
    category: 'EMERGÊNCIA',
    address: 'Canal remoto nacional',
    phone: '100',
    hours: '24 horas'
  },
  {
    id: 'cvv',
    name: 'CVV - Centro de Valorização da Vida',
    category: 'EMERGÊNCIA',
    address: 'Canal remoto nacional',
    phone: '188',
    hours: '24 horas'
  },
  {
    id: 'disque-denuncia',
    name: 'Disque Denúncia SSP-SP',
    category: 'EMERGÊNCIA',
    address: 'Canal remoto estadual',
    phone: '181',
    hours: '24 horas'
  }
];

const SERVICE_TARGET_BY_ID: Record<string, Service['targetType']> = {
  'ubs-ermelino': 'UBS',
  'caps-ij': 'CAPS_IJ',
  'caps-adulto': 'CAPS_ADULTO',
  'caps-ad': 'OUTROS',
  'upa-ermelino': 'UPA_HOSPITAL',
  'cras-ermelino': 'CRAS',
  'creas-ermelino': 'CREAS',
  'conselho-tutelar': 'CONSELHO_TUTELAR',
  'ddm-sao-miguel': 'OUTROS',
  'delegacia-civil-197': 'OUTROS',
  defensoria: 'OUTROS',
  'de-leste1': 'GESTAO_ESCOLAR',
  conviva: 'OUTROS',
  'policia-militar': 'OUTROS',
  samu: 'EMERGENCIA_192_193',
  bombeiros: 'EMERGENCIA_192_193',
  'disque-100': 'OUTROS',
  cvv: 'OUTROS',
  'disque-denuncia': 'OUTROS'
};

const inferServiceRiskLevel = (service: RawService): Service['riskLevel'] => {
  if (service.category === 'EMERGÊNCIA' || /\b(190|192|193)\b/.test(service.phone)) return 'EMERGENCIA';
  if (service.category === 'DIREITOS_SGD' || /conselho tutelar|ddm|delegacia/i.test(service.name)) return 'ALTA_PRIORIDADE';
  return 'APOIO_INSTITUCIONAL';
};

const inferStrategicDescription = (service: RawService): string => {
  if (service.id === 'samu') {
    return 'Acionar imediatamente em risco à vida, perda de consciência, tentativa de suicídio ou emergência clínica grave.';
  }
  if (service.id === 'conselho-tutelar') {
    return 'Acionar em suspeita ou confirmação de violação de direitos de criança/adolescente.';
  }
  if (service.id === 'ubs-ermelino') {
    return 'Encaminhar para avaliação clínica, saúde mental leve/moderada e acompanhamento longitudinal.';
  }
  if (service.category === 'EMERGÊNCIA') {
    return 'Canal de resposta imediata para cenários críticos com risco iminente.';
  }
  if (service.category === 'DIREITOS_SGD') {
    return 'Serviço de proteção e garantia de direitos para encaminhamento prioritário.';
  }
  if (service.category === 'SOCIAL') {
    return 'Apoio socioassistencial para proteção social e acompanhamento familiar.';
  }
  if (service.category === 'SAÚDE') {
    return 'Rede de cuidado em saúde para avaliação e continuidade do atendimento.';
  }
  return 'Apoio institucional para orientação, registro e continuidade do cuidado.';
};


const inferServiceType = (service: RawService): Service['type'] => {
  if (service.category === 'EMERGÊNCIA') return 'EMERGENCIAL';
  if (service.id === 'de-leste1') return 'GESTAO';
  if (service.id === 'conviva') return 'EDUCACAO';
  if (service.category === 'SAÚDE') return 'SAUDE';
  if (service.category === 'DIREITOS_SGD') return 'PROTECAO';
  if (service.category === 'SOCIAL') return 'APOIO_SOCIAL';
  return 'EDUCACAO';
};


const inferServiceNetworkType = (service: RawService): Service['networkType'] => {
  if (service.category === 'EMERGÊNCIA') return 'emergencia';
  if (service.category === 'SAÚDE') return 'saude';
  if (service.category === 'SOCIAL') return 'social';
  if (service.category === 'DIREITOS_SGD') return 'direitos';
  return 'educacao';
};


const inferServiceDescription = (service: RawService): string => {
  if (service.id === 'samu') return 'Acione imediatamente em risco à vida e emergência clínica grave.';
  if (service.id === 'policia-militar') return 'Acione imediatamente em violência em curso e risco à integridade física.';
  if (service.id === 'conselho-tutelar') return 'Notifique o Conselho Tutelar em suspeita ou violação de direitos de crianças e adolescentes.';
  if (service.id === 'cras-ermelino') return 'Oriente busca ao CRAS para proteção social básica e acompanhamento familiar.';
  if (service.id === 'creas-ermelino') return 'Acione o CREAS para violência confirmada e proteção social especial.';
  if (service.id === 'caps-ij') return 'Oriente busca ao CAPS IJ para cuidado especializado em saúde mental infantojuvenil.';
  if (service.id === 'caps-ad') return 'Oriente busca ao CAPS AD para cuidado em uso problemático de álcool e outras drogas.';
  if (service.id === 'ubs-ermelino') return 'Oriente busca à UBS como porta de entrada do SUS para avaliação clínica e acompanhamento.';
  if (service.category === 'EDUCAÇÃO') return 'Informe a gestão e siga o protocolo institucional de registro e acompanhamento.';
  return 'Serviço oficial da rede para encaminhamento conforme competência institucional.';
};

const SERVICES: Service[] = BASE_SERVICES.map((service) => ({
  sourceOfficial: 'Fonte oficial institucional (validação interna)',
  officialSource: 'Fonte oficial institucional (validação interna)',
  verifiedAt: '2026-02-10',
  verifiedBy: 'Coordenação Escolar',
  targetType: SERVICE_TARGET_BY_ID[service.id] || 'OUTROS',
  phones: service.phone.split('/').map((item) => item.trim()),
  howToCall: 'Use telefone institucional listado na rede oficial.',
  type: inferServiceType(service),
  networkType: inferServiceNetworkType(service),
  riskLevel: inferServiceRiskLevel(service),
  strategicDescription: inferStrategicDescription(service),
  description: inferServiceDescription(service),
  geoStatus: service.coordinates ? 'VERIFICADO' : 'PENDENTE',
  ...service
}));

const STANDARD_LEAF_NOTE = 'Em caso de dúvida, escale para gestão escolar.';

const DEFAULT_DEADLINE_BY_RISK: Record<string, string> = {
  EMERGENCIAL: 'Imediato',
  ALTO: 'Até 24h',
  MÉDIO: 'Até 72h',
  BAIXO: 'Até 7 dias'
};

const inferLeafCategory = (node: FlowNode): FlowNode['category'] => {
  if (node.category) return node.category;
  if (node.id.includes('sexual') || node.id.includes('violencia') || node.id.includes('direitos')) return 'DIREITOS_SGD';
  if (node.id.includes('social') || node.id.includes('fome') || node.id.includes('familiar')) return 'SOCIAL';
  return 'EDUCAÇÃO';
};

const inferLeafRisk = (node: FlowNode): FlowNode['riskLevel'] => {
  if (node.riskLevel) return node.riskLevel;
  if (node.id.includes('sexual')) return 'EMERGENCIAL';
  if (node.id.includes('violencia')) return 'ALTO';
  return 'MÉDIO';
};

const normalizeRecordRequired = (actions: string[]) => {
  const hasAnexoII = actions.some((action) => /anexo ii/i.test(action));
  return hasAnexoII ? ['Anexo I', 'Anexo II'] : ['Anexo I'];
};

const inferReferralType = (node: FlowNode): FlowNode['referralType'] => {
  const targets = (node.contactTargets || []).map((target) => (typeof target === 'string' ? target : target.serviceId));
  if (targets.includes('EMERGENCIA_192_193') || targets.includes('UPA_HOSPITAL') || node.category === 'EMERGÊNCIA') return 'EMERGENCIA';
  if (targets.includes('CAPS_IJ') || targets.includes('CAPS_ADULTO')) return 'CAPS';
  if (targets.includes('UBS')) return 'UBS';
  if (targets.includes('CONSELHO_TUTELAR')) return 'CONSELHO_TUTELAR';
  if (targets.includes('CRAS') || targets.includes('CREAS')) return 'CRAS_CREAS';
  if (targets.includes('GESTAO_ESCOLAR')) return 'GESTAO_ESCOLAR';
  return 'OUTROS';
};



const resolveServiceIdsFromTargets = (contactTargets: ContactTarget[], fallbackServiceIds?: string[]) => {
  if (fallbackServiceIds?.length) return fallbackServiceIds;

  const resolved = contactTargets.flatMap((target) => {
    const asServiceId = SERVICES.find((service) => service.id === target.serviceId);
    if (asServiceId) return [asServiceId.id];

    const byTargetType = SERVICES.filter((service) => service.targetType === target.serviceId).map((service) => service.id);
    return byTargetType;
  });

  return Array.from(new Set(resolved));
};

const DEFAULT_MAIN_SERVICE_BY_CATEGORY: Record<string, string> = {
  EMOCIONAL_COMPORTAMENTO: 'caps-ij',
  VIOLACAO_DIREITOS_VIOLENCIA: 'conselho-tutelar',
  VULNERABILIDADE_SOCIAL_FAMILIAR: 'cras-ermelino',
  CONVIVENCIA_CONFLITOS: 'de-leste1',
  DIFICULDADE_PEDAGOGICA: 'conviva',
  SAUDE_FISICA: 'ubs-ermelino',
  NAO_SEI: 'de-leste1'
};


const pickPrimaryByTypeOrder = (serviceIds: string[]): string | undefined => {
  const resolved = serviceIds
    .map((serviceId) => SERVICES.find((service) => service.id === serviceId))
    .filter((service): service is Service => !!service);

  const findByType = (type: Service['type']) => resolved.find((service) => service.type === type)?.id;

  return (
    findByType('EMERGENCIAL')
    || findByType('PROTECAO')
    || findByType('SAUDE')
    || findByType('GESTAO')
    || resolved[0]?.id
  );
};

const sanitizeActionText = (value: string): string => value
  .replace(/se necess[aá]rio/gi, 'quando houver risco identificado')
  .replace(/avaliar depois/gi, 'acione o serviço no prazo definido')
  .replace(/verificar/gi, 'confirme')
  .trim();

const resolveDecisionResult = (node: FlowNode, serviceIds: string[], riskLevel: NonNullable<FlowNode['riskLevel']>): DecisionResult => {
  const text = `${node.id} ${node.question}`.toLowerCase();

  let primaryServiceId = pickPrimaryByTypeOrder(serviceIds) || DEFAULT_MAIN_SERVICE_BY_CATEGORY[node.category || 'NAO_SEI'] || 'de-leste1';
  let secondaryServiceIds = serviceIds.filter((serviceId) => serviceId !== primaryServiceId);

  if (riskLevel === 'EMERGENCIAL' || /emerg|risco imediato/.test(text)) {
    primaryServiceId = 'samu';
    secondaryServiceIds = Array.from(new Set(['policia-militar', ...secondaryServiceIds]));
  } else if (/sexual/.test(text)) {
    primaryServiceId = 'conselho-tutelar';
    secondaryServiceIds = Array.from(new Set(['ddm-sao-miguel', 'ubs-ermelino', ...secondaryServiceIds]));
  } else if (/drog|subst/.test(text)) {
    primaryServiceId = 'caps-ad';
    secondaryServiceIds = Array.from(new Set(['ubs-ermelino', ...secondaryServiceIds]));
  } else if (/mental|autoagress|autoles|suicid/.test(text) || node.id === 'leaf_mental_agudo') {
    primaryServiceId = 'caps-ij';
    secondaryServiceIds = Array.from(new Set(['ubs-ermelino', ...secondaryServiceIds]));
  } else if (/fisic|clinic|upa/.test(text) || node.category === 'SAUDE_FISICA') {
    primaryServiceId = 'ubs-ermelino';
  } else if (/vulnerab|social|familiar|cras/.test(text) || node.category === 'VULNERABILIDADE_SOCIAL_FAMILIAR') {
    primaryServiceId = 'cras-ermelino';
  } else if (/violenc.*confirm|conselho|direitos|creas/.test(text) || node.id === 'leaf_direitos_conselho_rede') {
    primaryServiceId = 'creas-ermelino';
    secondaryServiceIds = Array.from(new Set(['conselho-tutelar', ...secondaryServiceIds]));
  } else if (/pedagog|aprendizagem|rendimento/.test(text) || node.category === 'DIFICULDADE_PEDAGOGICA') {
    primaryServiceId = 'conviva';
    secondaryServiceIds = Array.from(new Set(['de-leste1', ...secondaryServiceIds]));
  }

  if (!serviceIds.includes(primaryServiceId)) {
    secondaryServiceIds = Array.from(new Set([...serviceIds, ...secondaryServiceIds].filter((serviceId) => serviceId !== primaryServiceId)));
  }

  secondaryServiceIds = Array.from(new Set(secondaryServiceIds.filter((serviceId) => serviceId !== primaryServiceId)));

  const classification: DecisionResult['classification'] =
    riskLevel === 'EMERGENCIAL' ? 'EMERGENCIA' : riskLevel === 'ALTO' ? 'ALTA' : riskLevel === 'BAIXO' ? 'BAIXA' : 'MEDIA';
  const priority: DecisionResult['priority'] =
    classification === 'EMERGENCIA' ? 'IMEDIATO' : classification === 'ALTA' ? 'URGENTE' : 'ORIENTACAO';

  const serviceName = SERVICES.find((service) => service.id === primaryServiceId)?.name || 'serviço oficial da rede';

  return {
    classification,
    priority,
    primaryServiceId,
    secondaryServiceIds,
    deadline: node.deadline || DEFAULT_DEADLINE_BY_RISK[riskLevel || 'MÉDIO'],
    justification: node.whyThisService || `Base institucional: ${serviceName} é o serviço principal para este nível de risco e competência de atendimento.`
  };
};

const standardizeLeafNode = (node: FlowNode): FlowNode => {
  const isLeafNode = node.isLeaf || node.id.startsWith('leaf_') || node.id.endsWith('_folha');
  if (!isLeafNode) return node;

  const riskLevel = inferLeafRisk(node);
  const baseActions = (node.doNow || node.guidance || []).slice(0, 3);
  const doNowRaw = baseActions.length ? baseActions : ['Registre a situação no Anexo I.', 'Acione imediatamente o serviço responsável.', 'Informe a gestão e acompanhe a devolutiva institucional.'];
  const doNow = doNowRaw.map(sanitizeActionText);
  const rawTargets = node.contactTargets || [];
  const contactTargets: ContactTarget[] = rawTargets.length
    ? rawTargets.map((target) => (typeof target === 'string' ? { serviceId: target } : target))
    : (node.serviceIds || []).map((serviceId) => ({ serviceId }));


  const serviceIds = resolveServiceIdsFromTargets(contactTargets, node.serviceIds);
  const includesManagement = contactTargets.some((target) => target.serviceId === 'GESTAO_ESCOLAR');
  const decisionResult = resolveDecisionResult(node, serviceIds, riskLevel);
  const actionPriority: ActionPriority = decisionResult.priority === 'IMEDIATO' ? 'IMEDIATA' : decisionResult.priority === 'URGENTE' ? 'URGENTE' : 'ORIENTAÇÃO';
  const primaryServiceId = node.primaryServiceId || node.primaryServiceIds?.[0] || decisionResult.primaryServiceId;
  const primaryServiceIds = node.primaryServiceIds || [primaryServiceId];
  const secondaryServiceIds = node.secondaryServiceIds || Array.from(new Set([...(decisionResult.secondaryServiceIds || []), ...serviceIds.filter((serviceId) => !primaryServiceIds.includes(serviceId))]));

  return {
    ...node,
    isLeaf: true,
    options: node.options || [],
    category: inferLeafCategory(node),
    riskLevel,
    doNow,
    guidance: doNow,
    contactTargets,
    serviceIds,
    actionPriority: node.actionPriority || actionPriority,
    primaryServiceIds,
    secondaryServiceIds,
    notifyManagement: typeof node.notifyManagement === 'boolean' ? node.notifyManagement : includesManagement,
    actionSummary: node.actionSummary || `Encaminhar ${node.question.toLowerCase()} com prioridade ${actionPriority.toLowerCase()}.`,
    whatToDoNow: node.whatToDoNow ? sanitizeActionText(node.whatToDoNow) : doNow[0],
    whyThisService: node.whyThisService || decisionResult.justification,
    decisionResult,
    primaryServiceId,
    deadline: node.deadline || decisionResult.deadline || DEFAULT_DEADLINE_BY_RISK[riskLevel || 'MÉDIO'],
    recordRequired: node.recordRequired || normalizeRecordRequired(doNow),
    sourceRef: node.sourceRef || {
      label: `Protocolo ${PROTOCOL_DATA.metadata.protocolVersion}`,
      filePath: 'public/protocolo',
      section: node.id
    },
    notes: STANDARD_LEAF_NOTE,
    referralType: node.referralType || inferReferralType(node)
  };
};


const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'anexo-i-ficha-inicial',
    title: 'Anexo I - Ficha de Registro Inicial',
    annex: 'Anexo I',
    purpose: 'Registrar identificação do caso, sinais observados e histórico escolar relevante.',
    requiredFields: [
      'Data e hora do registro',
      'Nome completo do estudante',
      'RA / Turma / Turno',
      'Descrição objetiva dos fatos observados',
      'Ações imediatas adotadas pela escola',
      'Nome e função de quem registrou',
      'Assinatura da gestão'
    ],
    confidentialityLevel: 'RESTRITO'
  },
  {
    id: 'anexo-ii-escuta',
    title: 'Anexo II - Escuta Qualificada',
    annex: 'Anexo II',
    purpose: 'Documentar relato espontâneo da criança/adolescente com proteção contra revitimização.',
    requiredFields: [
      'Data, hora e local da escuta',
      'Profissional responsável pela escuta',
      'Relato espontâneo (texto literal, sem indução)',
      'Sinais de risco imediato',
      'Encaminhamentos realizados',
      'Órgãos notificados',
      'Assinatura e ciência da direção'
    ],
    confidentialityLevel: 'SIGILOSO'
  }
];

export const PROTOCOL_DATA: ProtocolData = {
  institution: {
    name: 'E.E. Ermelino Matarazzo',
    cie: '2835',
    diretoriaEnsino: 'DE Leste 1'
  },
  metadata: {
    protocolVersion: '2026.02',
    effectiveDate: '2026-02-01',
    lastReviewedAt: '2026-02-10',
    reviewedBy: 'Coordenação Escolar'
  },
  decisionTree: [
    {
      id: 'root',
      question: 'Existe risco imediato à vida, integridade física ou segurança agora?',
      indicators: [
        'Agressão física em curso',
        'Ameaça concreta e iminente',
        'Perda de consciência',
        'Tentativa de autoagressão em curso',
        'Risco físico imediato'
      ],
      options: [
      // legado: Não sei / dúvida
        { label: 'Sim (risco imediato)', nextNodeId: 'leaf_emergencia_imediata' },
        { label: 'Não', nextNodeId: 'n_categoria_situacao' }
      ],
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },
    {
      id: 'n_categoria_situacao',
      question: 'Qual destas opções mais descreve a situação?',
      helperText: 'Escolha o que você observa agora. Em dúvida, use “Não sei / preciso de apoio”.',
      options: [
        { label: 'Saúde emocional / comportamento', nextNodeId: 'n_mental_triagem', categoryId: 'emocional' },
        { label: 'Violação de direitos / violência', nextNodeId: 'n_direitos_triagem', categoryId: 'violencia' },
        { label: 'Vulnerabilidade social / familiar', nextNodeId: 'n_social_triagem', categoryId: 'vulnerabilidade' },
        { label: 'Convivência escolar / conflito', nextNodeId: 'n_convivencia_triagem', categoryId: 'convivencia' },
        { label: 'Dificuldade pedagógica persistente', nextNodeId: 'n_pedagogico_triagem', categoryId: 'pedagogico' },
        { label: 'Saúde física / queixa clínica', nextNodeId: 'n_fisico_triagem', categoryId: 'saude_fisica' },
        { label: 'Não sei / preciso de apoio', nextNodeId: 'leaf_duvida_padrao', categoryId: 'duvida' }
      ],
      category: 'NAO_SEI',
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },
    {
      id: 'n_mental_triagem',
      question: 'Há indicação de risco autolesivo/autoagressão OU crise intensa com risco de dano?',
      indicators: ['Verbalização de desejo de morrer', 'Automutilação', 'Crise intensa com risco de dano'],
      options: [
        { label: 'Sim', nextNodeId: 'leaf_mental_agudo' },
        { label: 'Não', nextNodeId: 'n_mental_leve_mod' }
      ],
      category: 'EMOCIONAL_COMPORTAMENTO',
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },
    {
      id: 'n_mental_leve_mod',
      question: 'A situação é persistente/recorrente e interfere no funcionamento escolar?',
      options: [
        { label: 'Sim', nextNodeId: 'leaf_mental_ubs' },
        { label: 'Não', nextNodeId: 'leaf_mental_acomp_escola' }
      ],
      category: 'EMOCIONAL_COMPORTAMENTO',
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },
    {
      id: 'n_direitos_triagem',
      question: 'Há suspeita de violência (física/sexual) ou negligência grave?',
      indicators: ['Relato de violência', 'Sinais físicos sem explicação consistente', 'Negligência grave percebida'],
      options: [
        { label: 'Sim', nextNodeId: 'n_direitos_urgencia' },
        { label: 'Não', nextNodeId: 'leaf_direitos_orientacao' }
      ],
      category: 'VIOLACAO_DIREITOS_VIOLENCIA',
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },
    {
      id: 'n_direitos_urgencia',
      question: 'A situação indica risco atual/imediato?',
      options: [
        { label: 'Sim', nextNodeId: 'leaf_direitos_emergencia' },
        { label: 'Não', nextNodeId: 'leaf_direitos_conselho_rede' }
      ],
      category: 'VIOLACAO_DIREITOS_VIOLENCIA',
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },
    {
      id: 'n_social_triagem',
      question: 'Há necessidade de apoio socioassistencial?',
      options: [
        { label: 'Sim', nextNodeId: 'leaf_social_cras' },
        { label: 'Não', nextNodeId: 'leaf_social_gestao' }
      ],
      category: 'VULNERABILIDADE_SOCIAL_FAMILIAR',
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },
    {
      id: 'n_convivencia_triagem',
      question: 'Há ameaça concreta ou risco físico?',
      options: [
        { label: 'Sim', nextNodeId: 'leaf_convivencia_risco' },
        { label: 'Não', nextNodeId: 'leaf_convivencia_mediacao' }
      ],
      category: 'CONVIVENCIA_CONFLITOS',
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },
    {
      id: 'n_pedagogico_triagem',
      question: 'É persistente e afeta rendimento/frequência?',
      options: [
        { label: 'Sim', nextNodeId: 'leaf_pedagogico_plano' },
        { label: 'Não', nextNodeId: 'leaf_pedagogico_rotina' }
      ],
      category: 'DIFICULDADE_PEDAGOGICA',
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },
    {
      id: 'n_fisico_triagem',
      question: 'Há sinais de gravidade ou o estudante está muito debilitado?',
      indicators: ['Desmaio', 'Falta de ar', 'Dor intensa ou sangramento importante'],
      options: [
        { label: 'Sim', nextNodeId: 'leaf_fisico_urgencia' },
        { label: 'Não', nextNodeId: 'leaf_fisico_ubs' }
      ],
      category: 'SAUDE_FISICA',
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },

    {
      id: 'leaf_emergencia_imediata',
      question: 'Emergência imediata',
      options: [],
      isLeaf: true,
      category: 'NAO_SEI',
      riskLevel: 'ALTO',
      doNow: [
        'Acione emergência (192/193) imediatamente.',
        'Garanta segurança do ambiente e afaste riscos.',
        'Informe a gestão escolar assim que possível.'
      ],
      contactTargets: ['EMERGENCIA_192_193', 'UPA_HOSPITAL', 'GESTAO_ESCOLAR'],
      deadline: 'Imediato',
      sourceRef: { label: 'Protocolo institucional', filePath: 'public/protocolo', section: 'Emergências e proteção imediata' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_duvida_padrao',
      question: 'Dúvida / classificação incerta',
      options: [],
      isLeaf: true,
      category: 'NAO_SEI',
      riskLevel: 'MÉDIO',
      doNow: [
        'Proteja o estudante e mantenha supervisão.',
        'Escale imediatamente para a gestão escolar.',
        'Se houver suspeita de risco à saúde/segurança, busque a porta de entrada SUS (UBS/urgência) com orientação da gestão.'
      ],
      contactTargets: ['GESTAO_ESCOLAR', 'UBS'],
      deadline: 'Hoje',
      notes: 'Em caso de dúvida, não adie escalonamento.',
      sourceRef: { label: 'Protocolo institucional', filePath: 'public/protocolo', section: 'Governança e fluxo geral' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_mental_agudo',
      question: 'Saúde emocional com sinais agudos',
      options: [],
      isLeaf: true,
      category: 'EMOCIONAL_COMPORTAMENTO',
      riskLevel: 'MÉDIO',
      doNow: [
        'Escale para gestão imediatamente.',
        'Acione serviço de saúde mental conforme rede (CAPS IJ quando aplicável).',
        'Se houver risco físico imediato, acione emergência.'
      ],
      contactTargets: ['GESTAO_ESCOLAR', 'CAPS_IJ', 'UBS'],
      deadline: 'Hoje',
      sourceRef: { label: 'Protocolo institucional', filePath: 'public/protocolo', section: 'Saúde mental e sinais de alerta' },
      serviceCharacterization: [
        'UBS: porta de entrada para saúde geral e demandas leves/moderadas.',
        'CAPS: atenção especializada em sofrimento psíquico intenso e crise.',
        'UPA/Hospital: urgência/emergência com risco imediato.',
        'Este bloco é apoio educativo; siga o protocolo oficial e a gestão em caso de dúvida.'
      ],
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_mental_ubs',
      question: 'Saúde emocional persistente com impacto escolar',
      options: [],
      isLeaf: true,
      category: 'EMOCIONAL_COMPORTAMENTO',
      riskLevel: 'MÉDIO',
      doNow: [
        'Escale para gestão e registre conforme rotina.',
        'Oriente busca de avaliação na UBS (porta de entrada).',
        'Acompanhe e monitore sinais de alerta.'
      ],
      contactTargets: ['GESTAO_ESCOLAR', 'UBS'],
      deadline: 'Em até 7 dias (ou conforme protocolo)',
      sourceRef: { label: 'Protocolo institucional', filePath: 'public/protocolo', section: 'Acolhimento e encaminhamento em saúde' },
      serviceCharacterization: [
        'UBS: porta de entrada para saúde geral e demandas leves/moderadas.',
        'CAPS: atenção especializada em sofrimento psíquico intenso e crise.',
        'UPA/Hospital: urgência/emergência com risco imediato.',
        'Este bloco é apoio educativo; siga o protocolo oficial e a gestão em caso de dúvida.'
      ],
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_mental_acomp_escola',
      question: 'Saúde emocional leve com acompanhamento escolar',
      options: [],
      isLeaf: true,
      category: 'EMOCIONAL_COMPORTAMENTO',
      riskLevel: 'BAIXO',
      doNow: [
        'Acolha e registre internamente conforme protocolo.',
        'Agende retorno/monitoramento.',
        'Escale se houver piora ou sinais de alerta.'
      ],
      contactTargets: ['GESTAO_ESCOLAR'],
      deadline: 'Hoje',
      sourceRef: { label: 'Protocolo institucional', filePath: 'public/protocolo', section: 'Acolhimento escolar' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_direitos_emergencia',
      question: 'Violação de direitos com risco imediato',
      options: [],
      isLeaf: true,
      category: 'VIOLACAO_DIREITOS_VIOLENCIA',
      riskLevel: 'ALTO',
      doNow: [
        'Garanta proteção imediata e não exponha a vítima.',
        'Acione emergência se necessário.',
        'Escale para gestão e acione rede de proteção conforme protocolo (Conselho/CREAS).'
      ],
      contactTargets: ['GESTAO_ESCOLAR', 'EMERGENCIA_192_193', 'CONSELHO_TUTELAR', 'CREAS'],
      deadline: 'Imediato',
      recordRequired: [{ system: 'CONVIVA', due: 'Hoje', notes: 'Registrar ocorrência quando aplicável.' }],
      sourceRef: { label: 'Protocolo institucional', filePath: 'public/protocolo', section: 'Violência e proteção integral' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_direitos_conselho_rede',
      question: 'Violação de direitos sem risco imediato',
      options: [],
      isLeaf: true,
      category: 'VIOLACAO_DIREITOS_VIOLENCIA',
      riskLevel: 'ALTO',
      doNow: [
        'Escale para gestão e siga o fluxo de proteção.',
        'Acione Conselho Tutelar conforme protocolo.',
        'Registre conforme exigência institucional quando aplicável.'
      ],
      contactTargets: ['GESTAO_ESCOLAR', 'CONSELHO_TUTELAR', 'CREAS'],
      deadline: 'Hoje (até 48h se protocolo exigir)',
      recordRequired: [{ system: 'CONVIVA', due: 'Hoje', notes: 'Conforme fluxo de proteção da escola.' }],
      sourceRef: { label: 'Protocolo institucional', filePath: 'public/protocolo', section: 'Notificação e rede de proteção' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_direitos_orientacao',
      question: 'Sinais inespecíficos de direitos/violência',
      options: [],
      isLeaf: true,
      category: 'VIOLACAO_DIREITOS_VIOLENCIA',
      riskLevel: 'MÉDIO',
      doNow: [
        'Escale para gestão para avaliação do caso.',
        'Registre conforme protocolo.',
        'Se surgir suspeita/risco, retorne ao fluxo de violência.'
      ],
      contactTargets: ['GESTAO_ESCOLAR'],
      deadline: 'Hoje',
      sourceRef: { label: 'Protocolo institucional', filePath: 'public/protocolo', section: 'Fluxo protetivo e governança' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_social_cras',
      question: 'Vulnerabilidade social com necessidade de apoio socioassistencial',
      options: [],
      isLeaf: true,
      category: 'VULNERABILIDADE_SOCIAL_FAMILIAR',
      riskLevel: 'MÉDIO',
      doNow: [
        'Escale para gestão/POC responsável.',
        'Acione CRAS para suporte socioassistencial conforme rede.',
        'Registre e acompanhe.'
      ],
      contactTargets: ['GESTAO_ESCOLAR', 'CRAS'],
      deadline: 'Em até 7 dias (ou conforme protocolo)',
      sourceRef: { label: 'Protocolo institucional', filePath: 'public/protocolo', section: 'Vulnerabilidade social e permanência' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_social_gestao',
      question: 'Situação social com acompanhamento pela gestão',
      options: [],
      isLeaf: true,
      category: 'VULNERABILIDADE_SOCIAL_FAMILIAR',
      riskLevel: 'BAIXO',
      doNow: ['Escale para gestão e registre conforme protocolo.', 'Acompanhe evolução.'],
      contactTargets: ['GESTAO_ESCOLAR'],
      deadline: 'Hoje',
      sourceRef: { label: 'Protocolo institucional', filePath: 'public/protocolo', section: 'Acompanhamento escolar' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_convivencia_risco',
      question: 'Convivência com ameaça concreta ou risco físico',
      options: [],
      isLeaf: true,
      category: 'CONVIVENCIA_CONFLITOS',
      riskLevel: 'ALTO',
      doNow: [
        'Interrompa a situação e garanta segurança.',
        'Escale para gestão.',
        'Se necessário, acione rede/autoridades conforme protocolo.'
      ],
      contactTargets: ['GESTAO_ESCOLAR', 'CONSELHO_TUTELAR'],
      deadline: 'Hoje',
      sourceRef: { label: 'Protocolo institucional', filePath: 'public/protocolo', section: 'Convivência e prevenção de violência' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_convivencia_mediacao',
      question: 'Convivência escolar para mediação pedagógica',
      options: [],
      isLeaf: true,
      category: 'CONVIVENCIA_CONFLITOS',
      riskLevel: 'BAIXO',
      doNow: [
        'Acolha e registre.',
        'Ative mediação/medidas educativas conforme protocolo.',
        'Monitore e escale se houver recorrência.'
      ],
      contactTargets: ['GESTAO_ESCOLAR'],
      deadline: 'Hoje',
      sourceRef: { label: 'Protocolo institucional', filePath: 'public/protocolo', section: 'Convivência e mediação' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_pedagogico_plano',
      question: 'Dificuldade pedagógica persistente',
      options: [],
      isLeaf: true,
      category: 'DIFICULDADE_PEDAGOGICA',
      riskLevel: 'MÉDIO',
      doNow: [
        'Encaminhe para coordenação pedagógica/gestão.',
        'Ajuste plano pedagógico e acione família.',
        'Se houver suspeita de questão de saúde, sugerir UBS (porta de entrada).'
      ],
      contactTargets: ['GESTAO_ESCOLAR', 'UBS'],
      deadline: 'Em até 15 dias (ou conforme protocolo)',
      sourceRef: { label: 'Protocolo institucional', filePath: 'public/protocolo', section: 'Acompanhamento pedagógico' },
      serviceCharacterization: [
        'UBS: porta de entrada para saúde geral e demandas leves/moderadas.',
        'CAPS: atenção especializada em sofrimento psíquico intenso e crise.',
        'UPA/Hospital: urgência/emergência com risco imediato.',
        'Este bloco é apoio educativo; siga o protocolo oficial e a gestão em caso de dúvida.'
      ],
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_pedagogico_rotina',
      question: 'Dificuldade pedagógica de rotina',
      options: [],
      isLeaf: true,
      category: 'DIFICULDADE_PEDAGOGICA',
      riskLevel: 'BAIXO',
      doNow: ['Oriente intervenção pedagógica de rotina.', 'Monitore e registre.', 'Escale se persistir.'],
      contactTargets: ['GESTAO_ESCOLAR'],
      deadline: 'Em até 30 dias',
      sourceRef: { label: 'Protocolo institucional', filePath: 'public/protocolo', section: 'Intervenção pedagógica' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_fisico_urgencia',
      question: 'Saúde física com sinais de gravidade',
      options: [],
      isLeaf: true,
      category: 'SAUDE_FISICA',
      riskLevel: 'ALTO',
      doNow: [
        'Escale para gestão imediatamente.',
        'Acione urgência (UPA) e/ou emergência (192) conforme gravidade.',
        'Notifique responsáveis conforme protocolo.'
      ],
      contactTargets: ['GESTAO_ESCOLAR', 'UPA_HOSPITAL', 'EMERGENCIA_192_193'],
      deadline: 'Hoje',
      sourceRef: { label: 'Protocolo institucional', filePath: 'public/protocolo', section: 'Emergências clínicas' },
      serviceCharacterization: [
        'UBS: porta de entrada para saúde geral e demandas leves/moderadas.',
        'CAPS: atenção especializada em sofrimento psíquico intenso e crise.',
        'UPA/Hospital: urgência/emergência com risco imediato.',
        'Este bloco é apoio educativo; siga o protocolo oficial e a gestão em caso de dúvida.'
      ],
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_fisico_ubs',
      question: 'Saúde física sem sinais de gravidade',
      options: [],
      isLeaf: true,
      category: 'SAUDE_FISICA',
      riskLevel: 'BAIXO',
      doNow: [
        'Oriente avaliação na UBS (porta de entrada).',
        'Registre e acompanhe.',
        'Escale se piorar.'
      ],
      contactTargets: ['GESTAO_ESCOLAR', 'UBS'],
      deadline: 'Em até 7 dias',
      sourceRef: { label: 'Protocolo institucional', filePath: 'public/protocolo', section: 'Encaminhamento em saúde' },
      serviceCharacterization: [
        'UBS: porta de entrada para saúde geral e demandas leves/moderadas.',
        'CAPS: atenção especializada em sofrimento psíquico intenso e crise.',
        'UPA/Hospital: urgência/emergência com risco imediato.',
        'Este bloco é apoio educativo; siga o protocolo oficial e a gestão em caso de dúvida.'
      ],
      escalationRule: 'SE_DUVIDA_ESCALE'
    }
  ],
  services: SERVICES,
  documentTemplates: DOCUMENT_TEMPLATES,
  instruments: {
    anexoI: {
      requiredFields: DOCUMENT_TEMPLATES.find((doc) => doc.annex === 'Anexo I')?.requiredFields || []
    },
    anexoII: {
      requiredFields: DOCUMENT_TEMPLATES.find((doc) => doc.annex === 'Anexo II')?.requiredFields || []
    }
  }
};

PROTOCOL_DATA.decisionTree = (PROTOCOL_DATA.decisionTree || []).map(standardizeLeafNode);

// Compatibilidade com UI existente
export const CONTATOS: Contato[] = PROTOCOL_DATA.services.map((service) => ({
  id: service.id,
  categoria:
    service.category === 'SAÚDE'
      ? 'saude'
      : service.category === 'SOCIAL'
        ? 'assistencia'
        : service.category === 'DIREITOS_SGD'
          ? 'protecao'
          : service.category === 'EDUCAÇÃO'
            ? 'educacao'
            : 'emergencia',
  nome: service.name,
  telefone: service.phone,
  endereco: service.address,
  horario: service.hours
}));

const categoryToFluxo: Record<string, { codigo: string; icon: string; risco: Fluxo['risco'] }> = {
  EMOCIONAL_COMPORTAMENTO: { codigo: 'E', icon: '🧠', risco: 'moderado' },
  VIOLACAO_DIREITOS_VIOLENCIA: { codigo: 'D', icon: '⚖️', risco: 'urgencia' },
  VULNERABILIDADE_SOCIAL_FAMILIAR: { codigo: 'S', icon: '🤝', risco: 'moderado' },
  CONVIVENCIA_CONFLITOS: { codigo: 'C', icon: '🏫', risco: 'moderado' },
  DIFICULDADE_PEDAGOGICA: { codigo: 'P', icon: '📚', risco: 'baixo' },
  SAUDE_FISICA: { codigo: 'F', icon: '🏥', risco: 'alto' },
  NAO_SEI: { codigo: '?', icon: '❔', risco: 'moderado' }
};

const serviceIdsByTarget = (target?: Service['targetType']) =>
  PROTOCOL_DATA.services.filter((service) => service.targetType === target).map((service) => service.id);

export const FLUXOS: Record<string, Fluxo> = Object.fromEntries(
  Object.keys(categoryToFluxo).map((category) => {
    const leaves = (PROTOCOL_DATA.decisionTree || []).filter((node) => node.isLeaf && node.category === category);
    const meta = categoryToFluxo[category];
    const id = category.toLowerCase().replace(/[^a-z0-9]/gi, '-');

    return [
      id,
      {
        id,
        codigo: meta.codigo,
        titulo: category.replace(/_/g, '/'),
        descricao: `Fluxos ${category.replace(/_/g, '/')} organizados por gravidade e proteção.`,
        risco: meta.risco,
        icon: meta.icon,
        contatosUteis: Array.from(
          new Set(
            leaves.flatMap((leaf) => (leaf.contactTargets || []).flatMap((target) => serviceIdsByTarget(typeof target === 'string' ? target : target.serviceId)))
          )
        ),
        cenarios: leaves.map((leaf) => ({
          id: leaf.id,
          titulo: leaf.question,
          descricao: (leaf.doNow || []).join(' '),
          recomendacaoImediata: leaf.doNow?.[0] || 'Seguir protocolo institucional.',
          acionar: (leaf.contactTargets || []).flatMap((target) => serviceIdsByTarget(typeof target === 'string' ? target : target.serviceId)),
          documento: leaf.recordRequired?.length ? 'Registro institucional' : 'Sem exigência explícita',
          prazoNotificacao: leaf.deadline || 'Hoje'
        }))
      }
    ];
  })
);

export const RECURSOS: Recurso[] = PROTOCOL_DATA.documentTemplates.map((doc) => ({
  id: doc.id,
  titulo: doc.title,
  descricao: doc.purpose,
  formato: 'pdf',
  obrigatorio: true,
  camposObrigatorios: doc.requiredFields,
  contentOrigin: 'OFICIAL',
  sourceRef: `Protocolo ${PROTOCOL_DATA.metadata.protocolVersion} · ${doc.annex}`
}));

export const GLOSSARY_SEED = [
  {
    id: 'g1',
    term: 'Busca Ativa',
    definition: 'Procedimento de acompanhamento quando há ausência recorrente do estudante, com tentativa de contato com família e rede.',
    context: 'Aplicável quando houver faltas reiteradas ou evasão escolar.',
    category: 'Procedimentos',
    createdAt: new Date().toISOString()
  },
  {
    id: 'g2',
    term: 'Notificação Compulsória',
    definition: 'Obrigação legal de comunicar suspeitas ou confirmações de violência contra crianças e adolescentes aos órgãos competentes.',
    context: 'Prevista no ECA e legislações correlatas.',
    category: 'Base Legal',
    createdAt: new Date().toISOString()
  },
  {
    id: 'g3',
    term: 'Violência Institucional',
    definition: 'Práticas ou omissões da instituição que possam causar dano psicológico ou moral ao estudante.',
    context: 'Exige avaliação da gestão e possível revisão de procedimento.',
    category: 'Conceitos',
    createdAt: new Date().toISOString()
  },
  {
    id: 'g4',
    term: 'Escalonamento',
    definition: 'Encaminhamento progressivo da demanda para instâncias superiores (Coordenação → Direção → Rede).',
    context: 'Quando a situação ultrapassa competência individual.',
    category: 'Fluxo Operacional',
    createdAt: new Date().toISOString()
  }
];

export const ROLEPLAY_SCENARIOS = [
  {
    id: 's1',
    title: 'Isolamento + queda de rendimento',
    description: 'Estudante que participava bem ficou isolado, faltando mais e com queda brusca nas notas.',
    protocolHint: 'Aplicar registro inicial, escuta qualificada e acionar fluxo multifatorial quando necessário.',
    options: [
      { id: 'a', text: 'Aguardar mais um mês para ver se melhora sozinho.', score: 0, feedback: 'Conduta inadequada: posterga proteção e pode agravar o caso.' },
      { id: 'b', text: 'Registrar Anexo I no mesmo dia, comunicar coordenação e iniciar busca ativa.', score: 2, feedback: 'Correto: ação precoce, registro e escalonamento estruturado.' },
      { id: 'c', text: 'Conversar em público com o aluno para pressionar presença.', score: 0, feedback: 'Conduta inadequada: pode expor e revitimizar.' }
    ]
  },
  {
    id: 's2',
    title: 'Relato de possível violência sexual',
    description: 'Estudante relata situação de abuso, com medo de represália familiar.',
    protocolHint: 'Escuta qualificada mínima, proteção imediata, CT/autoridades e não revitimização.',
    options: [
      { id: 'a', text: 'Pedir detalhes repetidamente para confirmar história.', score: 0, feedback: 'Conduta inadequada: risco de revitimização.' },
      { id: 'b', text: 'Fazer escuta qualificada essencial e acionar direção/CT imediatamente.', score: 2, feedback: 'Correto: preserva proteção e segue competência institucional.' },
      { id: 'c', text: 'Ligar primeiro para o suposto agressor para esclarecimentos.', score: 0, feedback: 'Conduta inadequada: expõe a vítima e compromete proteção.' }
    ]
  },
  {
    id: 's3',
    title: 'Cyberbullying com exposição de imagem',
    description: 'Turma compartilha foto de colega com ofensas em grupo digital.',
    protocolHint: 'Interrupção da exposição, proteção da vítima, registro e escalonamento jurídico quando necessário.',
    options: [
      { id: 'a', text: 'Tratar como “brincadeira” e encerrar sem registro.', score: 0, feedback: 'Conduta inadequada: invisibiliza violência e recorrência.' },
      { id: 'b', text: 'Proteger vítima, registrar ocorrência e acionar família/gestão.', score: 2, feedback: 'Correto: responde à violação com medidas educativas e protetivas.' },
      { id: 'c', text: 'Punir imediatamente sem escuta de envolvidos.', score: 0, feedback: 'Inadequado: sem investigação pedagógica e registro correto.' }
    ]
  },
  {
    id: 'auto-lesao',
    title: 'Suspeita de Autolesão',
    description: 'Aluno apresenta cortes superficiais no braço e evita responder perguntas.',
    protocolHint: 'Escuta qualificada, proteção imediata e comunicação à gestão.',
    options: [
      { id: 'a', text: 'Ignorar para não constranger', score: 0, feedback: 'Omissão pode agravar risco. Situações de autolesão exigem escuta e comunicação à gestão.' },
      { id: 'b', text: 'Conversar em local reservado e comunicar coordenação', score: 2, feedback: 'Conduta adequada. Escuta qualificada + acionamento institucional.' }
    ]
  },
  {
    id: 'conflito-docente',
    title: 'Conflito com Professor',
    description: 'Aluno acusa professor de tratamento humilhante em sala.',
    protocolHint: 'Escuta inicial qualificada e mediação institucional conforme fluxo interno.',
    options: [
      { id: 'a', text: 'Encaminhar diretamente à direção', score: 1, feedback: 'Pode ser adequado, mas escuta inicial qualificada é recomendada.' },
      { id: 'b', text: 'Registrar relato e acionar protocolo interno de mediação', score: 2, feedback: 'Favorece escuta institucional e evita escalonamento precipitado.' }
    ]
  },
  {
    id: 'negligencia',
    title: 'Possível Negligência Familiar',
    description: 'Estudante relata dormir sozinho e não ter alimentação regular.',
    protocolHint: 'Registro formal, avaliação de risco com gestão e eventual acionamento da rede de proteção.',
    options: [
      { id: 'a', text: 'Avisar família imediatamente', score: 1, feedback: 'Contato pode ser necessário, mas requer avaliação prévia com gestão.' },
      { id: 'b', text: 'Registrar e discutir com coordenação para avaliação de risco', score: 2, feedback: 'Conduta alinhada ao protocolo e proteção da criança.' }
    ]
  }
];

export const FAQ_CONTENT_META = {
  contentOrigin: 'DERIVADA' as const,
  sourceRef: `Orientação operacional da unidade baseada no protocolo ${PROTOCOL_DATA.metadata.protocolVersion}`
};
