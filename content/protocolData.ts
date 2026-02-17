import { Contato, DocumentTemplate, Fluxo, ProtocolData, Recurso, Service } from '../types';

const BASE_SERVICES: Service[] = [
  {
    id: 'ubs-ermelino',
    name: 'UBS Ermelino Matarazzo',
    category: 'SAÚDE',
    address: 'Rua Antônio de Freitas Toledo, 185 - Ermelino Matarazzo - São Paulo/SP - CEP 03812-050',
    phone: '(11) 2545-8235 / (11) 2542-0945',
    hours: 'Seg a Sex, 7h às 19h',
    notes: 'Porta de entrada SUS para saúde geral e cuidado longitudinal.'
  },
  {
    id: 'caps-ij',
    name: 'CAPS Infantojuvenil II Ermelino Matarazzo',
    category: 'SAÚDE',
    address: 'Rua Antônio Bonici, 18 - Ermelino Matarazzo - São Paulo/SP - CEP 03811-060',
    phone: '(11) 3294-3828 / (11) 2544-1490',
    hours: 'Seg a Sex, 7h às 19h',
    notes: 'Sofrimento psíquico infantojuvenil com necessidade de cuidado especializado.'
  },
  {
    id: 'caps-adulto',
    name: 'CAPS Adulto II Ermelino Matarazzo',
    category: 'SAÚDE',
    address: 'Avenida Boturussu, 168 - Parque Boturussu - São Paulo/SP - CEP 03804-000',
    phone: '(11) 2546-6787 / (11) 2544-0406',
    hours: 'Seg a Sex, 7h às 19h'
  },
  {
    id: 'caps-ad',
    name: 'CAPS AD II Ermelino Matarazzo',
    category: 'SAÚDE',
    address: 'Rua João Antônio de Andrade, 804 - Parque Boturussu - São Paulo/SP - CEP 03804-000',
    phone: '(11) 2943-9276 / (11) 2546-2597',
    hours: 'Seg a Sex, 7h às 19h'
  },
  {
    id: 'upa-ermelino',
    name: 'UPA Ermelino Matarazzo',
    category: 'SAÚDE',
    address: 'Rua Miguel Novais, 113 - Vila Paranaguá - São Paulo/SP - CEP 03807-370',
    phone: '(11) 2574-3258',
    hours: '24 horas'
  },
  {
    id: 'cras-ermelino',
    name: 'CRAS Ermelino',
    category: 'SOCIAL',
    address: 'Avenida Paranaguá, 2045 - Ermelino Matarazzo - São Paulo/SP - CEP 03806-010',
    phone: '(11) 2545-3211 / (11) 2545-3222',
    hours: 'Seg a Sex, 8h às 18h'
  },
  {
    id: 'creas-ermelino',
    name: 'CREAS Ermelino',
    category: 'SOCIAL',
    address: 'Avenida Boturussu, 131 - Ermelino Matarazzo - São Paulo/SP - CEP 03804-000',
    phone: '(11) 2541-7882',
    hours: 'Seg a Sex, 8h às 18h'
  },
  {
    id: 'conselho-tutelar',
    name: 'Conselho Tutelar Ermelino Matarazzo',
    category: 'DIREITOS_SGD',
    address: 'Rua Chesira Maltauro, 342 - Ermelino Matarazzo - São Paulo/SP - CEP 03811-100',
    phone: '(11) 2214-9050 / (11) 2546-0657 / (11) 2546-3257',
    notes: 'Acionamento obrigatório em ameaça/violação de direitos de criança e adolescente.'
  },
  {
    id: 'ddm-sao-miguel',
    name: 'DDM São Miguel Paulista',
    category: 'DIREITOS_SGD',
    address: 'Rua Dríades, 50 - 2º andar - São Miguel Paulista - São Paulo/SP - CEP 08010-190',
    phone: '(11) 6154-1362 / (11) 6153-7666'
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

const SERVICE_TYPE_BY_ID: Record<string, Service['type']> = {
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

const SERVICES: Service[] = BASE_SERVICES.map((service) => ({
  sourceOfficial: 'Fonte oficial institucional (validação interna)',
  officialSource: 'Fonte oficial institucional (validação interna)',
  verifiedAt: '2026-02-10',
  verifiedBy: 'Coordenação Escolar',
  type: SERVICE_TYPE_BY_ID[service.id] || 'OUTROS',
  phones: service.phone.split('/').map((item) => item.trim()),
  howToCall: 'Use telefone institucional listado na rede oficial.',
  ...service
}));


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
        { label: 'Sim (risco imediato)', nextNodeId: 'leaf_emergencia_imediata' },
        { label: 'Não', nextNodeId: 'n_categoria_situacao' }
      ],
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },
    {
      id: 'n_categoria_situacao',
      question: 'Qual destas opções mais descreve a situação?',
      options: [
        { label: 'Saúde emocional / comportamento', nextNodeId: 'n_mental_triagem' },
        { label: 'Violação de direitos / violência', nextNodeId: 'n_direitos_triagem' },
        { label: 'Vulnerabilidade social / familiar', nextNodeId: 'n_social_triagem' },
        { label: 'Convivência escolar / conflito', nextNodeId: 'n_convivencia_triagem' },
        { label: 'Dificuldade pedagógica persistente', nextNodeId: 'n_pedagogico_triagem' },
        { label: 'Saúde física / queixa clínica', nextNodeId: 'n_fisico_triagem' },
        { label: 'Não sei / dúvida', nextNodeId: 'leaf_duvida_padrao' }
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

const serviceIdsByTarget = (target?: Service['type']) =>
  PROTOCOL_DATA.services.filter((service) => service.type === target).map((service) => service.id);

export const FLUXOS: Record<string, Fluxo> = Object.fromEntries(
  Object.keys(categoryToFluxo).map((category) => {
    const leaves = PROTOCOL_DATA.decisionTree.filter((node) => node.isLeaf && node.category === category);
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
            leaves.flatMap((leaf) => (leaf.contactTargets || []).flatMap((target) => serviceIdsByTarget(target)))
          )
        ),
        cenarios: leaves.map((leaf) => ({
          id: leaf.id,
          titulo: leaf.question,
          descricao: (leaf.doNow || []).join(' '),
          recomendacaoImediata: leaf.doNow?.[0] || 'Seguir protocolo institucional.',
          acionar: (leaf.contactTargets || []).flatMap((target) => serviceIdsByTarget(target)),
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
