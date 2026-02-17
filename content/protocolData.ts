import { Contato, DocumentTemplate, FlowNode, Fluxo, ProtocolData, Recurso, Service, ServiceTarget } from '../types';

const BASE_SERVICES: Service[] = [
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


const SERVICE_VALID_UNTIL: Record<string, string> = {
  'conselho-tutelar': '2026-01-31'
};

const SERVICES: Service[] = BASE_SERVICES.map((service) => ({
  officialSource: 'Fonte oficial institucional (validação interna)',
  verifiedAt: '2026-02-10',
  verifiedBy: 'Coordenação Escolar',
  validUntil: SERVICE_VALID_UNTIL[service.id] || '2026-12-31',
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


const UNIVERSAL_FALLBACK_OPTION = {
  label: 'Não sei / dúvida',
  nextNodeId: 'DUVIDA_PADRAO'
};

const hasUniversalFallbackOption = (node: FlowNode) =>
  node.options.some((option) => option.nextNodeId === UNIVERSAL_FALLBACK_OPTION.nextNodeId);

const applyUniversalFallback = (node: FlowNode): FlowNode => {
  if (node.isLeaf) return node;

  const options = hasUniversalFallbackOption(node)
    ? node.options
    : [...node.options, UNIVERSAL_FALLBACK_OPTION];

  return {
    ...node,
    options,
    fallbackNextNodeId: node.fallbackNextNodeId || UNIVERSAL_FALLBACK_OPTION.nextNodeId
  };
};


const toImperative = (text: string) => {
  const rules: Array<[RegExp, string]> = [
    [/^Realizar\b/i, 'Realize'],
    [/^Aplicar\b/i, 'Aplique'],
    [/^Executar\b/i, 'Execute'],
    [/^Garantir\b/i, 'Garanta'],
    [/^Registrar\b/i, 'Registre'],
    [/^Encaminhar\b/i, 'Encaminhe'],
    [/^Notificar\b/i, 'Notifique'],
    [/^Tratar\b/i, 'Trate'],
    [/^Interromper\b/i, 'Interrompa'],
    [/^Separar\b/i, 'Separe'],
    [/^Coletar\b/i, 'Colete'],
    [/^Planejar\b/i, 'Planeje'],
    [/^Investigar\b/i, 'Investigue'],
    [/^Manter\b/i, 'Mantenha'],
    [/^Solicitar\b/i, 'Solicite'],
    [/^Acionar\b/i, 'Acione'],
    [/^Orientar\b/i, 'Oriente']
  ];

  const trimmed = text.trim().replace(/\s+/g, ' ');

  for (const [pattern, replacement] of rules) {
    if (pattern.test(trimmed)) return trimmed.replace(pattern, replacement);
  }

  return /^([A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+)\b/.test(trimmed) ? trimmed : `Acione ${trimmed.charAt(0).toLowerCase()}${trimmed.slice(1)}`;
};

const simplifyActionText = (text: string) => {
  const normalized = text
    .replace(/conforme avaliação da direção\.?/gi, 'com validação da direção.')
    .replace(/devidamente registrada\.?/gi, 'registrada.')
    .replace(/quando necessário\.?/gi, 'se necessário.')
    .replace(/de forma imediata, especialmente em ocorrência recente\.?/gi, 'de imediato.')
    .replace(/\s+/g, ' ')
    .trim();

  return normalized;
};

const normalizeLeafActions = (actions: string[]) => {
  if (!actions.length) return actions;

  const limited = actions.slice(0, 3).map((action) => simplifyActionText(action));
  limited[0] = toImperative(limited[0]);

  return limited;
};

const standardizeLeafNode = (node: FlowNode): FlowNode => {
  const isLeafNode = node.isLeaf || node.id.startsWith('leaf_') || node.id.endsWith('_folha');
  if (!isLeafNode) return node;

  const riskLevel = inferLeafRisk(node);
  const baseActions = node.doNow || node.guidance || [];
  const rawActions = baseActions.length ? baseActions : ['Registre a situação no Anexo I.', 'Acione o serviço responsável.', 'Acompanhe a devolutiva com a gestão.'];
  const doNow = normalizeLeafActions(rawActions);
  const contactTargets: ServiceTarget[] = (node.contactTargets || (node.serviceIds || []).map((serviceId) => ({ serviceId })));

  return {
    ...node,
    isLeaf: true,
    options: node.options || [],
    category: inferLeafCategory(node),
    riskLevel,
    doNow,
    guidance: doNow,
    contactTargets,
    serviceIds: node.serviceIds || contactTargets.map((target) => target.serviceId),
    deadline: node.deadline || DEFAULT_DEADLINE_BY_RISK[riskLevel || 'MÉDIO'],
    recordRequired: node.recordRequired || normalizeRecordRequired(doNow),
    sourceRef: node.sourceRef || {
      label: `Protocolo ${PROTOCOL_DATA.metadata.protocolVersion}`,
      filePath: 'public/protocolo',
      section: node.id
    },
    notes: STANDARD_LEAF_NOTE
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
      question: 'O que melhor descreve a situação agora?',
      options: [
        { label: '🚨 Risco imediato (violência em curso / risco de vida)', nextNodeId: 'leaf_emergencia_imediata' },
        { label: '🧠 Sinais emocionais ou comportamentais persistentes', nextNodeId: 'n_saude_mental' },
        { label: '⚖️ Suspeita de violação de direitos', nextNodeId: 'n_violacoes' },
        { label: '🤝 Vulnerabilidade social e permanência escolar', nextNodeId: 'n_social' },
        { label: '❔ Não sei classificar / preciso de apoio', nextNodeId: 'leaf_ambiguo' }
      ],
      fallbackNextNodeId: 'leaf_ambiguo'
    },
    {
      id: 'n_comportamento',
      question: 'O que predomina na mudança observada?',
      indicators: [
        'Mudanças persistentes por dias/semanas com prejuízo em sala',
        'Alterações de sono, alimentação ou energia relatadas na escola',
        'Relatos de pares/profissionais confirmando mudança de padrão'
      ],
      options: [
        { label: 'Isolamento / apatia / tristeza persistente', nextNodeId: 'leaf_comportamento_internalizante' },
        { label: 'Agressividade / impulsividade / explosões', nextNodeId: 'leaf_comportamento_externalizante' },
        { label: 'Queda brusca de rendimento e motivação', nextNodeId: 'leaf_queda_rendimento' }
      ]
    },
    {
      id: 'n_saude_mental',
      question: 'Há risco atual para integridade do estudante?',
      indicators: ['Fala de morte ou autolesão', 'Desorganização intensa', 'Mudança brusca de humor com prejuízo funcional'],
      options: [
        { label: 'Sim, risco atual / tentativa / autolesão em curso', nextNodeId: 'leaf_emergencia_imediata' },
        { label: 'Sem risco imediato, mas há sofrimento importante', nextNodeId: 'leaf_saude_mental_alta' },
        { label: 'Sem risco imediato e sinais leves/moderados', nextNodeId: 'leaf_saude_mental_moderada' }
      ]
    },
    {
      id: 'n_convivencia',
      question: 'Qual cenário de convivência melhor descreve a situação?',
      options: [
        { label: 'Conflito pontual entre estudantes', nextNodeId: 'leaf_conflito_pontual' },
        { label: 'Bullying sistemático / exclusão social', nextNodeId: 'leaf_bullying_sistematico' },
        { label: 'Conflito entre grupos com risco de violência física', nextNodeId: 'leaf_conflito_grupos' }
      ]
    },
    {
      id: 'n_violacoes',
      question: 'Qual suspeita principal de violação de direitos?',
      indicators: ['Lesões recorrentes sem explicação consistente', 'Relato de medo de retornar para casa', 'Sinais de negligência grave'],
      options: [
        { label: 'Violência física / negligência grave', nextNodeId: 'leaf_violencia_fisica_negligencia' },
        { label: 'Violência sexual / exploração sexual', nextNodeId: 'leaf_violencia_sexual' },
        { label: 'Abandono / conflito familiar intenso', nextNodeId: 'leaf_conflito_familiar' }
      ]
    },
    {
      id: 'n_social',
      question: 'Qual fator social é mais evidente?',
      indicators: [
        'Faltas frequentes associadas a transporte, alimentação ou trabalho',
        'Relato de ausência de itens básicos para permanência na escola',
        'Dificuldade da família em acessar documentação e benefícios'
      ],
      options: [
        { label: 'Insegurança alimentar / pobreza extrema', nextNodeId: 'leaf_social_fome_pobreza' },
        { label: 'Trabalho infantil', nextNodeId: 'leaf_trabalho_infantil' },
        { label: 'Falta de documentação / acesso a benefícios', nextNodeId: 'leaf_social_documentacao' }
      ]
    },

    {
      id: 'leaf_emergencia_imediata',
      question: 'Emergência imediata: agir agora para preservar vidas.',
      options: [],
      isLeaf: true,
      category: 'EMERGÊNCIA',
      riskLevel: 'EMERGENCIAL',
      tags: ['risco de morte', 'violência em curso'],
      severityCriteria: [
        'Violência em curso',
        'Tentativa de suicídio em curso',
        'Perda de consciência, trauma grave ou risco de morte'
      ],
      guidance: [
        'Acionar imediatamente 190, 192 ou 193 conforme a natureza da emergência.',
        'Não deixar o estudante sozinho e acionar a direção em paralelo.',
        'Após estabilização, registrar Anexo I e documentar protocolos/BO.'
      ],
      serviceIds: ['policia-militar', 'samu', 'bombeiros', 'upa-ermelino'],
      forbiddenActions: ['Não adiar acionamento por tentativa de resolver internamente.']
    },
    {
      id: 'leaf_comportamento_internalizante',
      question: 'Mudança internalizante (isolamento, apatia, tristeza).',
      options: [],
      isLeaf: true,
      category: 'SAÚDE',
      riskLevel: 'MÉDIO',
      tags: ['isolamento', 'apatia', 'queda de interação'],
      severityCriteria: ['Persistência > 2 semanas', 'Prejuízo acadêmico/social progressivo'],
      guidance: [
        'Realizar acolhimento e registro no Anexo I no mesmo dia.',
        'Solicitar escuta qualificada (Anexo II) com coordenação/POC em até 72h.',
        'Encaminhar para UBS e, se houver agravamento, CAPS IJ.'
      ],
      serviceIds: ['ubs-ermelino', 'caps-ij']
    },
    {
      id: 'leaf_comportamento_externalizante',
      question: 'Mudança externalizante (agressividade e explosões).',
      options: [],
      isLeaf: true,
      category: 'EDUCAÇÃO',
      riskLevel: 'MÉDIO',
      guidance: [
        'Intervenção pedagógica imediata com foco em segurança da turma.',
        'Registrar Anexo I e avaliar fatores de saúde mental/social associados.',
        'Se houver recorrência grave, acionar UBS/CAPS IJ e Conselho Tutelar conforme avaliação da direção.'
      ],
      serviceIds: ['de-leste1', 'ubs-ermelino', 'caps-ij', 'conselho-tutelar']
    },
    {
      id: 'leaf_queda_rendimento',
      question: 'Queda brusca de rendimento com sinais de sofrimento.',
      options: [],
      isLeaf: true,
      category: 'EDUCAÇÃO',
      riskLevel: 'MÉDIO',
      guidance: [
        'Executar busca ativa e plano pedagógico individualizado.',
        'Investigar dimensões familiar, social e emocional sem culpabilização.',
        'Se persistir com faltas e isolamento, escalar para fluxo multifatorial e rede social.'
      ],
      serviceIds: ['de-leste1', 'cras-ermelino', 'ubs-ermelino'],
      forbiddenActions: ['Não acionar Conselho Tutelar antes da busca ativa devidamente registrada.']
    },
    {
      id: 'leaf_saude_mental_alta',
      question: 'Sofrimento mental importante sem risco imediato confirmado.',
      options: [],
      isLeaf: true,
      category: 'SAÚDE',
      riskLevel: 'ALTO',
      guidance: [
        'Garantir acolhimento protegido e escuta qualificada (Anexo II).',
        'Encaminhar com prioridade para CAPS IJ e comunicar família.',
        'Manter monitoramento intensivo de frequência e sinais de agravamento.'
      ],
      serviceIds: ['caps-ij', 'ubs-ermelino', 'cvv']
    },
    {
      id: 'leaf_saude_mental_moderada',
      question: 'Sofrimento emocional leve/moderado.',
      options: [],
      isLeaf: true,
      category: 'SAÚDE',
      riskLevel: 'MÉDIO',
      guidance: [
        'Registrar Anexo I e orientar família sobre UBS como porta de entrada.',
        'Avaliar necessidade de CAPS IJ conforme evolução clínica e escolar.',
        'Reavaliar em até 15 dias com equipe gestora.'
      ],
      serviceIds: ['ubs-ermelino', 'caps-ij', 'cvv']
    },
    {
      id: 'leaf_conflito_pontual',
      question: 'Conflito pontual entre estudantes (sem violência grave).',
      options: [],
      isLeaf: true,
      category: 'EDUCAÇÃO',
      riskLevel: 'BAIXO',
      guidance: [
        'Aplicar mediação pedagógica e combinados de convivência.',
        'Registrar ocorrência interna (Anexo I/III conforme impacto).',
        'Se houver repetição, reclassificar para bullying sistemático.'
      ],
      serviceIds: ['de-leste1']
    },
    {
      id: 'leaf_bullying_sistematico',
      question: 'Bullying sistemático / exclusão social recorrente.',
      options: [],
      isLeaf: true,
      category: 'DIREITOS_SGD',
      riskLevel: 'ALTO',
      guidance: [
        'Interromper imediatamente as agressões e proteger a vítima.',
        'Escuta qualificada e comunicação com famílias da vítima e autores.',
        'Em caso grave/reiterado, acionar Conselho Tutelar e Polícia Civil (197).'
      ],
      serviceIds: ['conselho-tutelar', 'delegacia-civil-197', 'de-leste1', 'conviva']
    },
    {
      id: 'leaf_conflito_grupos',
      question: 'Conflito entre grupos com risco de escalada para violência.',
      options: [],
      isLeaf: true,
      category: 'EMERGÊNCIA',
      riskLevel: 'ALTO',
      guidance: [
        'Separar grupos com segurança e preservar integridade física.',
        'Acionar direção imediatamente e avaliar necessidade de 190.',
        'Registrar protocolos e plano de prevenção de recorrência.'
      ],
      serviceIds: ['policia-militar', 'de-leste1', 'conviva']
    },
    {
      id: 'leaf_violencia_fisica_negligencia',
      question: 'Suspeita de violência física ou negligência grave.',
      guidance: ['Orientar responsável para CAPS Adulto e UBS.', 'Registrar impactos na proteção do estudante.'],
      serviceIds: ['caps-adulto', 'ubs-ermelino']
    },
    {
      id: 'social_pobreza_folha',
      question: 'Família em vulnerabilidade socioeconômica grave.',
      options: [],
      isLeaf: true,
      category: 'SOCIAL',
      riskLevel: 'MÉDIO',
      guidance: ['Abrir encaminhamento CRAS e mapear benefícios sociais.', 'Articular ações de permanência escolar.'],
      serviceIds: ['cras-ermelino']
    },
    {
      id: 'social_fome_folha',
      question: 'Insegurança alimentar identificada.',
      options: [],
      isLeaf: true,
      category: 'SOCIAL',
      riskLevel: 'ALTO',
      guidance: ['Acionar CRAS para proteção social imediata.', 'Registrar providências e garantir alimentação emergencial na escola.'],
      serviceIds: ['cras-ermelino']
    },
    {
      id: 'social_documentos_folha',
      question: 'Ausência de documentação civil prejudica acesso a direitos.',
      options: [],
      isLeaf: true,
      category: 'SOCIAL',
      riskLevel: 'BAIXO',
      guidance: ['Encaminhar via CRAS para regularização documental.', 'Acompanhar atualização de cadastro escolar.'],
      serviceIds: ['cras-ermelino']
    },
    {
      id: 'direitos_fisica_folha',
      question: 'Suspeita/confirmada violência física contra estudante.',
      options: [],
      isLeaf: true,
      category: 'DIREITOS_SGD',
      riskLevel: 'ALTO',
      guidance: [
        'Acolher estudante e registrar relato espontâneo sem indução.',
        'Notificar Conselho Tutelar em até 24h e encaminhar para avaliação em UBS/UPA conforme necessidade.',
        'Acionar Polícia Civil (197) ou 190 se violência em curso.'
      ],
      serviceIds: ['conselho-tutelar', 'ubs-ermelino', 'upa-ermelino', 'delegacia-civil-197']
    },
    {
      id: 'leaf_violencia_sexual',
      question: 'Suspeita ou confirmação de violência sexual.',
      guidance: ['Registrar relato no Anexo II.', 'Notificar Conselho Tutelar e, em caso de flagrante, acionar 190.'],
      serviceIds: ['conselho-tutelar', 'policia-militar', 'ubs-ermelino']
    },
    {
      id: 'direitos_sexual_folha',
      question: 'Suspeita/confirmada violência sexual.',
      options: [],
      isLeaf: true,
      category: 'DIREITOS_SGD',
      riskLevel: 'EMERGENCIAL',
      guidance: [
        'Realizar somente escuta qualificada essencial para proteção imediata.',
        'Notificar imediatamente Conselho Tutelar e autoridade policial especializada (197 / DDM).',
        'Encaminhar para UBS/UPA de forma imediata, especialmente em ocorrência recente.'
      ],
      serviceIds: ['conselho-tutelar', 'ddm-sao-miguel', 'delegacia-civil-197', 'upa-ermelino', 'ubs-ermelino'],
      forbiddenActions: [
        'NÃO revitimizar com repetição desnecessária de relato.',
        'NÃO confrontar suspeito nem investigar por conta própria.',
        'NÃO orientar contato imediato com família quando houver suspeita intrafamiliar antes da avaliação protetiva.'
      ]
    },
    {
      id: 'leaf_conflito_familiar',
      question: 'Conflitos familiares com impacto escolar e protetivo.',
      options: [],
      isLeaf: true,
      category: 'SOCIAL',
      riskLevel: 'MÉDIO',
      guidance: [
        'Registrar sinais e impactos na frequência/aprendizagem.',
        'Encaminhar família para CRAS; em violação de direitos, CREAS e Conselho Tutelar.',
        'Acionar Defensoria para orientação jurídica quando necessário.'
      ],
      serviceIds: ['cras-ermelino', 'creas-ermelino', 'conselho-tutelar', 'defensoria']
    },
    {
      id: 'leaf_social_fome_pobreza',
      question: 'Vulnerabilidade socioeconômica e insegurança alimentar.',
      options: [],
      isLeaf: true,
      category: 'SOCIAL',
      riskLevel: 'MÉDIO',
      guidance: [
        'Acionar CRAS para benefícios e acompanhamento familiar.',
        'Planejar apoio de permanência escolar e monitoramento de frequência.',
        'Escalar para Conselho Tutelar se houver negligência grave associada.'
      ],
      serviceIds: ['cras-ermelino', 'conselho-tutelar']
    },
    {
      id: 'leaf_trabalho_infantil',
      question: 'Indícios de trabalho infantil.',
      options: [],
      isLeaf: true,
      category: 'DIREITOS_SGD',
      riskLevel: 'ALTO',
      guidance: [
        'Registrar evidências observacionais e relato espontâneo.',
        'Notificar Conselho Tutelar em até 24h e articular CRAS/CREAS.',
        'Monitorar frequência e proteção integral do estudante.'
      ],
      serviceIds: ['conselho-tutelar', 'cras-ermelino', 'creas-ermelino']
    },
    {
      id: 'leaf_social_documentacao',
      question: 'Barreiras de documentação e acesso a direitos sociais.',
      options: [],
      isLeaf: true,
      category: 'SOCIAL',
      riskLevel: 'BAIXO',
      guidance: [
        'Encaminhar via CRAS para regularização cadastral/documental.',
        'Registrar plano de acompanhamento escolar e social.'
      ],
      serviceIds: ['cras-ermelino']
    },
    {
      id: 'leaf_cyberbullying',
      question: 'Uso indevido de tecnologia, cyberbullying ou exposição em redes.',
      options: [],
      isLeaf: true,
      category: 'DIREITOS_SGD',
      riskLevel: 'ALTO',
      guidance: [
        'Interromper disseminação no ambiente escolar e proteger a vítima.',
        'Registrar evidências disponíveis sem expor o estudante.',
        'Acionar família, direção e, em caso de crime, Polícia Civil (197) e Conselho Tutelar.'
      ],
      serviceIds: ['delegacia-civil-197', 'conselho-tutelar', 'de-leste1', 'conviva']
    },
    {
      id: 'leaf_indisciplina',
      question: 'Indisciplina recorrente com diferentes intensidades.',
      options: [],
      isLeaf: true,
      category: 'EDUCAÇÃO',
      riskLevel: 'MÉDIO',
      guidance: [
        'Aplicar medidas pedagógicas progressivas e restaurativas.',
        'Registrar reincidência e fatores associados (social, emocional, familiar).',
        'Escalar para rede externa se houver violação de direitos ou risco social relevante.'
      ],
      serviceIds: ['de-leste1', 'cras-ermelino', 'caps-ij']
    },
    {
      id: 'leaf_multifatorial',
      question: 'Caso multifatorial (faltas + rendimento + isolamento).',
      options: [],
      isLeaf: true,
      category: 'EDUCAÇÃO',
      riskLevel: 'ALTO',
      tags: ['multifatorial', 'alta complexidade'],
      guidance: [
        'Tratar como caso de alta complexidade: abrir plano integrado escola-rede.',
        'Executar busca ativa documentada, escuta qualificada e reunião de gestão no mesmo ciclo semanal.',
        'Encaminhar simultaneamente para saúde (UBS/CAPS), social (CRAS/CREAS) e direitos (CT) conforme achados.'
      ],
      serviceIds: ['ubs-ermelino', 'caps-ij', 'cras-ermelino', 'creas-ermelino', 'conselho-tutelar', 'de-leste1'],
      forbiddenActions: ['Não esperar definição perfeita do caso para iniciar proteção.']
    },
    {
      id: 'leaf_ambiguo',
      indicators: ['Dúvida persistente sobre classificação', 'Múltiplos sinais simultâneos', 'Insegurança sobre risco imediato'],
      question: 'Caso ambíguo: “algo não está bem”, sem classificação fechada.',
      options: [],
      isLeaf: true,
      category: 'EDUCAÇÃO',
      riskLevel: 'MÉDIO',
      fallbackNextNodeId: 'leaf_multifatorial',
      guidance: [
        'Aplicar princípio protetivo: registrar observação no Anexo I e comunicar coordenação no mesmo dia.',
        'Coletar informações adicionais por observação pedagógica e escuta qualificada (Anexo II).',
        'Se persistir incerteza, escalar para fluxo multifatorial e reunião de equipe gestora.'
      ],
      serviceIds: ['de-leste1', 'ubs-ermelino', 'cras-ermelino'],
      forbiddenActions: ['Não acionar Conselho Tutelar antes do registro formal da Busca Ativa.']
    },
    {
      id: 'DUVIDA_PADRAO',
      question: 'Dúvida operacional: classifique como caso ambíguo e escale para gestão escolar.',
      options: [],
      isLeaf: true,
      category: 'EDUCAÇÃO',
      riskLevel: 'MÉDIO',
      guidance: [
        'Registrar dúvida no Anexo I com evidências observadas.',
        'Acionar coordenação/direção para definição conjunta do encaminhamento.',
        'Se necessário, migrar para fluxo multifatorial e rede de proteção.'
      ],
      serviceIds: ['de-leste1', 'ubs-ermelino', 'cras-ermelino']
    },
    {
      id: 'educacao_pedagogico_folha',
      question: 'Demanda pedagógica sem violação de direitos imediata.',
      options: [],
      isLeaf: true,
      category: 'EDUCAÇÃO',
      riskLevel: 'BAIXO',
      guidance: ['Realizar plano pedagógico individualizado.', 'Monitorar evolução por conselho de classe e equipe gestora.'],
      serviceIds: ['nre-leste1']
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

PROTOCOL_DATA.decisionTree = PROTOCOL_DATA.decisionTree.map(standardizeLeafNode).map(applyUniversalFallback);

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
  SAÚDE: { codigo: 'S', icon: '🏥', risco: 'alto' },
  SOCIAL: { codigo: 'O', icon: '🤝', risco: 'moderado' },
  DIREITOS_SGD: { codigo: 'D', icon: '⚖️', risco: 'urgencia' },
  EDUCAÇÃO: { codigo: 'E', icon: '🏫', risco: 'moderado' },
  EMERGÊNCIA: { codigo: 'X', icon: '🚨', risco: 'urgencia' }
};

export const FLUXOS: Record<string, Fluxo> = Object.fromEntries(
  ['SAÚDE', 'SOCIAL', 'DIREITOS_SGD', 'EDUCAÇÃO', 'EMERGÊNCIA'].map((category) => {
    const leaves = PROTOCOL_DATA.decisionTree.filter((node) => node.isLeaf && node.category === category);
    const meta = categoryToFluxo[category];
    const id = category.toLowerCase().replace(/[^a-z0-9]/gi, '-');

    return [
      id,
      {
        id,
        codigo: meta.codigo,
        titulo: category.replace('_', '/'),
        descricao: `Fluxos ${category.replace('_', '/')} organizados por sintomas observáveis e gravidade.`,
        risco: meta.risco,
        icon: meta.icon,
        contatosUteis: Array.from(new Set(leaves.flatMap((leaf) => leaf.serviceIds || []))),
        cenarios: leaves.map((leaf) => ({
          id: leaf.id,
          titulo: leaf.question,
          descricao: (leaf.guidance || []).join(' '),
          recomendacaoImediata: leaf.guidance?.[0] || 'Seguir protocolo institucional.',
          acionar: leaf.serviceIds || [],
          documento: leaf.category === 'DIREITOS_SGD' ? 'Anexo II + Anexo I' : 'Anexo I',
          prazoNotificacao: leaf.riskLevel === 'EMERGENCIAL' ? 'Imediato' : leaf.riskLevel === 'ALTO' ? 'Até 24h' : 'Até 72h'
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
    term: 'talarico',
    meaning: 'Conflito relacional envolvendo ciúmes entre colegas.',
    context: 'Pode aparecer em conflitos que escalam para bullying ou agressão verbal.',
    riskFlag: 'atenção',
    createdAt: new Date().toISOString()
  },
  {
    id: 'g2',
    term: 'cancelar',
    meaning: 'Excluir publicamente alguém do grupo, muitas vezes em redes sociais.',
    context: 'Relacionar com exclusão social/cyberbullying se recorrente.',
    riskFlag: 'alerta',
    createdAt: new Date().toISOString()
  }
];

export const ROLEPLAY_SCENARIOS = [
  {
    id: 's1',
    title: 'Isolamento + queda de rendimento',
    situation: 'Estudante que participava bem ficou isolado, faltando mais e com queda brusca nas notas.',
    protocolHint: 'Aplicar registro inicial, escuta qualificada e acionar fluxo multifatorial quando necessário.',
    options: [
      {
        id: 'a',
        text: 'Aguardar mais um mês para ver se melhora sozinho.',
        isBest: false,
        feedback: 'Conduta inadequada: posterga proteção e pode agravar o caso.'
      },
      {
        id: 'b',
        text: 'Registrar Anexo I no mesmo dia, comunicar coordenação e iniciar busca ativa.',
        isBest: true,
        feedback: 'Correto: ação precoce, registro e escalonamento estruturado.'
      },
      {
        id: 'c',
        text: 'Conversar em público com o aluno para pressionar presença.',
        isBest: false,
        feedback: 'Conduta inadequada: pode expor e revitimizar.'
      }
    ]
  },
  {
    id: 's2',
    title: 'Relato de possível violência sexual',
    situation: 'Estudante relata situação de abuso, com medo de represália familiar.',
    protocolHint: 'Escuta qualificada mínima, proteção imediata, CT/autoridades e não revitimização.',
    options: [
      {
        id: 'a',
        text: 'Pedir detalhes repetidamente para confirmar história.',
        isBest: false,
        feedback: 'Conduta inadequada: risco de revitimização.'
      },
      {
        id: 'b',
        text: 'Fazer escuta qualificada essencial e acionar direção/CT imediatamente.',
        isBest: true,
        feedback: 'Correto: preserva proteção e segue competência institucional.'
      },
      {
        id: 'c',
        text: 'Ligar primeiro para o suposto agressor para esclarecimentos.',
        isBest: false,
        feedback: 'Conduta inadequada: expõe a vítima e compromete proteção.'
      }
    ]
  },
  {
    id: 's3',
    title: 'Cyberbullying com exposição de imagem',
    situation: 'Turma compartilha foto de colega com ofensas em grupo digital.',
    protocolHint: 'Interrupção da exposição, proteção da vítima, registro e escalonamento jurídico quando necessário.',
    options: [
      {
        id: 'a',
        text: 'Tratar como “brincadeira” e encerrar sem registro.',
        isBest: false,
        feedback: 'Conduta inadequada: invisibiliza violência e recorrência.'
      },
      {
        id: 'b',
        text: 'Proteger vítima, registrar ocorrência e acionar família/gestão.',
        isBest: true,
        feedback: 'Correto: responde à violação com medidas educativas e protetivas.'
      },
      {
        id: 'c',
        text: 'Punir imediatamente sem escuta de envolvidos.',
        isBest: false,
        feedback: 'Inadequado: sem investigação pedagógica e registro correto.'
      }
    ]
  }
];


export const FAQ_CONTENT_META = {
  contentOrigin: 'DERIVADA' as const,
  sourceRef: `Orientação operacional da unidade baseada no protocolo ${PROTOCOL_DATA.metadata.protocolVersion}`
};
