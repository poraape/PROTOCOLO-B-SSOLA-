import { Contato, DocumentTemplate, Fluxo, ProtocolData, Recurso, Service } from './types';

const SERVICES: Service[] = [
  {
    id: 'ubs-ermelino',
    name: 'UBS Ermelino Matarazzo',
    category: 'SAÚDE',
    address: 'Rua Miguel Rachid, 997 - Ermelino Matarazzo, São Paulo - SP',
    phone: '(11) 2041-5311',
    hours: 'Seg a Sex, 7h às 19h'
  },
  {
    id: 'caps-ij',
    name: 'CAPS IJ Ermelino Matarazzo',
    category: 'SAÚDE',
    address: 'Rua Antônio Bonici, 18 - Ermelino Matarazzo, São Paulo - SP',
    phone: '(11) 2545-7583',
    hours: 'Seg a Sex, 7h às 19h'
  },
  {
    id: 'caps-adulto',
    name: 'CAPS Adulto Ermelino Matarazzo',
    category: 'SAÚDE',
    address: 'Avenida Paranaguá, 1492 - Ermelino Matarazzo, São Paulo - SP',
    phone: '(11) 2541-5215',
    hours: 'Seg a Sex, 7h às 19h'
  },
  {
    id: 'cras-ermelino',
    name: 'CRAS Ermelino Matarazzo',
    category: 'SOCIAL',
    address: 'Avenida Paranaguá, 1492 - Ermelino Matarazzo, São Paulo - SP',
    phone: '(11) 2545-6836',
    hours: 'Seg a Sex, 8h às 17h'
  },
  {
    id: 'conselho-tutelar',
    name: 'Conselho Tutelar Ermelino Matarazzo / Ponte Rasa',
    category: 'DIREITOS_SGD',
    address: 'Avenida Paranaguá, 1492 - Ermelino Matarazzo, São Paulo - SP',
    phone: '(11) 2541-3928',
    hours: 'Plantão 24h',
    notes: 'Acionamento obrigatório em suspeita/confirmação de violação de direitos de criança e adolescente.'
  },
  {
    id: 'delegacia-defesa-mulher',
    name: 'DDM - Delegacia de Defesa da Mulher (referência territorial)',
    category: 'DIREITOS_SGD',
    address: 'Rua Dr. Corinto Baldoíno Costa, 400 - São Miguel Paulista, São Paulo - SP',
    phone: '(11) 2297-8755'
  },
  {
    id: 'nre-leste1',
    name: 'Núcleo de Rede e Proteção Escolar - DE Leste 1',
    category: 'EDUCAÇÃO',
    address: 'Diretoria de Ensino Leste 1 - São Paulo - SP',
    phone: '(11) 0000-0000',
    notes: 'Usar contato institucional oficial da DE Leste 1.'
  },
  {
    id: 'samu',
    name: 'SAMU',
    category: 'EMERGÊNCIA',
    address: 'Acionamento telefônico',
    phone: '192',
    hours: '24h'
  },
  {
    id: 'policia-militar',
    name: 'Polícia Militar',
    category: 'EMERGÊNCIA',
    address: 'Acionamento telefônico',
    phone: '190',
    hours: '24h'
  }
];

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
  decisionTree: [
    {
      id: 'root',
      question: 'Qual é o tipo principal da demanda?',
      options: [
        { label: '🏥 SAÚDE', nextNodeId: 'saude_tipo' },
        { label: '🤝 SOCIAL', nextNodeId: 'social_tipo' },
        { label: '⚖️ DIREITOS/SGD', nextNodeId: 'direitos_tipo' },
        { label: '🏫 EDUCAÇÃO', nextNodeId: 'educacao_tipo' },
        { label: '🚨 EMERGÊNCIA', nextNodeId: 'emergencia_folha' }
      ]
    },
    {
      id: 'saude_tipo',
      question: 'Qual demanda de saúde foi identificada?',
      options: [
        { label: 'Saúde Física', nextNodeId: 'saude_fisica_folha' },
        { label: 'Saúde Mental Jovem', nextNodeId: 'saude_mental_jovem_folha' },
        { label: 'Saúde Mental Adulto (responsável)', nextNodeId: 'saude_mental_adulto_folha' }
      ]
    },
    {
      id: 'social_tipo',
      question: 'Qual vulnerabilidade social é predominante?',
      options: [
        { label: 'Pobreza extrema', nextNodeId: 'social_pobreza_folha' },
        { label: 'Fome / insegurança alimentar', nextNodeId: 'social_fome_folha' },
        { label: 'Ausência de documentos', nextNodeId: 'social_documentos_folha' }
      ]
    },
    {
      id: 'direitos_tipo',
      question: 'Qual violação de direitos está em análise?',
      options: [
        { label: 'Violência Física', nextNodeId: 'direitos_fisica_folha' },
        { label: 'Violência Sexual', nextNodeId: 'direitos_sexual_folha' },
        { label: 'Crime / ameaça grave', nextNodeId: 'direitos_crime_folha' }
      ]
    },
    {
      id: 'educacao_tipo',
      question: 'Qual situação educacional se aplica?',
      options: [
        { label: 'Infrequência', nextNodeId: 'educacao_infrequencia_folha' },
        { label: 'Questão pedagógica', nextNodeId: 'educacao_pedagogico_folha' }
      ]
    },
    {
      id: 'emergencia_folha',
      question: 'Risco de vida iminente.',
      options: [],
      isLeaf: true,
      category: 'EMERGÊNCIA',
      riskLevel: 'EMERGENCIAL',
      guidance: [
        'Acionar imediatamente SAMU (192) e/ou Polícia Militar (190).',
        'Não deixar o estudante sozinho em nenhuma hipótese.',
        'Comunicar direção e registrar providências no Anexo I.'
      ],
      serviceIds: ['samu', 'policia-militar'],
      forbiddenActions: ['Jamais atrasar acionamento por tentativa de resolver internamente.']
    },
    {
      id: 'saude_fisica_folha',
      question: 'Encaminhamento para avaliação clínica.',
      options: [],
      isLeaf: true,
      category: 'SAÚDE',
      riskLevel: 'MÉDIO',
      guidance: ['Avaliar sinais físicos e encaminhar para UBS Ermelino.', 'Registrar sinais no Anexo I e monitorar retorno escolar.'],
      serviceIds: ['ubs-ermelino']
    },
    {
      id: 'saude_mental_jovem_folha',
      question: 'Necessidade de cuidado em saúde mental infantojuvenil.',
      options: [],
      isLeaf: true,
      category: 'SAÚDE',
      riskLevel: 'ALTO',
      guidance: ['Escuta qualificada e registro no Anexo II.', 'Acionamento prioritário do CAPS IJ.'],
      serviceIds: ['caps-ij', 'ubs-ermelino']
    },
    {
      id: 'saude_mental_adulto_folha',
      question: 'Responsável necessita cuidado em saúde mental.',
      options: [],
      isLeaf: true,
      category: 'SAÚDE',
      riskLevel: 'MÉDIO',
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
        'Realizar escuta protegida, sem indução, com registro no Anexo II.',
        'Acionar imediatamente Conselho Tutelar e rede de saúde.',
        'Preservar evidências e garantir proteção integral da vítima.'
      ],
      forbiddenActions: [
        'NÃO orientar contato imediato com a família antes da avaliação da rede de proteção.',
        'NÃO realizar acareação, interrogatório ou repetição desnecessária do relato.'
      ],
      serviceIds: ['conselho-tutelar', 'delegacia-defesa-mulher', 'samu']
    },
    {
      id: 'direitos_crime_folha',
      question: 'Ameaça grave/crime com impacto no ambiente escolar.',
      options: [],
      isLeaf: true,
      category: 'DIREITOS_SGD',
      riskLevel: 'EMERGENCIAL',
      guidance: ['Acionar 190 em situação de risco atual.', 'Comunicar Conselho Tutelar quando envolver estudante.'],
      serviceIds: ['policia-militar', 'conselho-tutelar']
    },
    {
      id: 'educacao_infrequencia_folha',
      question: 'Infrequência escolar persistente.',
      options: [],
      isLeaf: true,
      category: 'EDUCAÇÃO',
      riskLevel: 'MÉDIO',
      guidance: [
        'Etapa obrigatória 1: executar Busca Ativa (contato telefônico, visita e registro).',
        'Etapa obrigatória 2: pactuar plano de retorno e acompanhamento pedagógico.',
        'Somente após esgotar Busca Ativa, acionar Conselho Tutelar.'
      ],
      forbiddenActions: ['Não acionar Conselho Tutelar antes do registro formal da Busca Ativa.'],
      serviceIds: ['nre-leste1', 'conselho-tutelar']
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

// Compatibilidade com a UI atual
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
  SAÚDE: { codigo: 'A', icon: '🏥', risco: 'alto' },
  SOCIAL: { codigo: 'B', icon: '🤝', risco: 'moderado' },
  DIREITOS_SGD: { codigo: 'C', icon: '⚖️', risco: 'urgencia' },
  EDUCAÇÃO: { codigo: 'D', icon: '🏫', risco: 'baixo' },
  EMERGÊNCIA: { codigo: 'E', icon: '🚨', risco: 'urgencia' }
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
        descricao: `Fluxo ${category.replace('_', '/')} do protocolo da E.E. Ermelino Matarazzo.`,
        risco: meta.risco,
        icon: meta.icon,
        contatosUteis: Array.from(new Set(leaves.flatMap((leaf) => leaf.serviceIds || []))),
        cenarios: leaves.map((leaf) => ({
          id: leaf.id,
          titulo: leaf.question,
          descricao: (leaf.guidance || []).join(' '),
          recomendacaoImediata: leaf.guidance?.[0] || 'Seguir protocolo institucional.',
          acionar: leaf.serviceIds || [],
          documento: leaf.category === 'DIREITOS_SGD' ? 'Anexo II' : 'Anexo I',
          prazoNotificacao: leaf.riskLevel === 'EMERGENCIAL' ? 'Imediato' : 'Até 24h'
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
  camposObrigatorios: doc.requiredFields
}));
