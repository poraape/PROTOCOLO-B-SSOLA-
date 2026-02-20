import { ActionPriority, ContactTarget, Contato, DecisionResult, DocumentTemplate, FlowNode, Fluxo, ProtocolData, Recurso, Service, ServiceTarget } from '../types';

type RawService = Omit<Service, 'type' | 'targetType' | 'phones' | 'riskLevel' | 'geoStatus' | 'sourceOfficial' | 'officialSource' | 'verifiedAt' | 'verifiedBy' | 'networkType'>;

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
  },
  {
    id: 'ubs-vila-paranagua',
    name: 'UBS Vila Paranaguá',
    category: 'SAÚDE',
    address: 'Rua Miguel Novais, 375 - Vila Paranaguá - São Paulo/SP - CEP 03807-060',
    phone: '(11) 2574-4120',
    coordinates: { lat: -23.4918, lng: -46.4692 },
    hours: 'Seg a Sex, 7h às 19h',
    notes: 'Segunda referência de atenção básica no território; foco em saúde da família.'
  },
  {
    id: 'hospital-alipio',
    name: 'Hospital Municipal Alípio Corrêa Netto',
    category: 'SAÚDE',
    address: 'Rua Inácio Monteiro, 5178 - Guaianases - São Paulo/SP - CEP 08420-000',
    phone: '(11) 2518-9400',
    coordinates: { lat: -23.5309, lng: -46.3980 },
    hours: '24 horas',
    notes: 'Hospital de média/alta complexidade de referência para a zona leste. Geralmente acionado via UPA/SAMU.'
  },
  {
    id: 'dp-62',
    name: '62ª DP - Delegacia de Polícia Civil',
    category: 'DIREITOS_SGD',
    address: 'Rua Luís Gama, 460 - Jardim Belém - São Paulo/SP',
    phone: '(11) 2545-2450',
    coordinates: { lat: -23.4933, lng: -46.4778 },
    hours: '24 horas',
    notes: 'Registro de BO, investigação de crimes após o fato. Não é para ocorrência em curso (usar 190).'
  },
  {
    id: 'disque-180',
    name: 'Disque 180 - Central de Atendimento à Mulher',
    category: 'EMERGÊNCIA',
    address: 'Canal remoto nacional',
    phone: '180',
    hours: '24 horas',
    notes: 'Violência doméstica, violência de gênero contra mães/responsáveis. Gratuito e anônimo.'
  },
  {
    id: 'mp-infancia',
    name: 'Ministério Público - Promotoria da Infância e Juventude',
    category: 'DIREITOS_SGD',
    address: 'Rua da Consolação, 1921 - Consolação - São Paulo/SP (foro central; acesso remoto disponível)',
    phone: '(11) 3150-3600',
    hours: 'Seg a Sex, 9h às 17h',
    notes: 'Acionado quando Conselho Tutelar ou CREAS não resolvem; violação sistêmica de direitos; recusa de matrícula.'
  },
  {
    id: 'scfv-ermelino',
    name: 'SCFV - Serviço de Convivência Ermelino Matarazzo',
    category: 'SOCIAL',
    address: 'Vinculado ao CRAS Ermelino - Avenida Paranaguá, 2045',
    phone: '(11) 2545-3211',
    hours: 'Seg a Sex, 8h às 17h',
    notes: 'Atividades socioeducativas para crianças e adolescentes em vulnerabilidade. Contrarreferência do CRAS.'
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
  'disque-denuncia': 'OUTROS',
  'ubs-vila-paranagua': 'UBS',
  'hospital-alipio': 'UPA_HOSPITAL',
  'dp-62': 'OUTROS',
  'disque-180': 'OUTROS',
  'mp-infancia': 'OUTROS',
  'scfv-ermelino': 'OUTROS'
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


const SERVICE_ENRICHMENT: Record<string, Partial<RawService>> = {
  'ubs-ermelino': {
    description: 'Unidade Básica de Saúde: porta de entrada do SUS para cuidados de saúde geral, acompanhamento de condições crônicas, saúde mental leve/moderada, pré-natal, planejamento familiar, vacinação, laudos e Programa Saúde na Escola (PSE).',
    strategicDescription: 'Encaminhe à UBS quando o problema de saúde NÃO é emergência e pode esperar algumas horas ou dias para atendimento. É a primeira escolha para sofrimento psíquico leve, queixas físicas estáveis e acompanhamento contínuo.',
    howToCall: 'Ligue (11) 2545-8235 em horário comercial. Para PSE, contate o responsável de saúde escolar da UBS. Em casos urgentes, não aguarde — use UPA ou SAMU.',
    whenToUse: [
      'Tristeza, ansiedade ou irritabilidade que persiste há semanas mas sem risco imediato',
      'Queixas físicas recorrentes (dor de cabeça, cansaço, problemas de visão/audição)',
      'Necessidade de laudo ou avaliação para estudante com suspeita de deficiência',
      'Pré-natal, planejamento familiar, prevenção de IST',
      'Acompanhamento de condição crônica (diabetes, hipertensão, epilepsia)',
      'Encaminhamento para CAPS quando necessário (a UBS faz a referência)'
    ],
    whenNotToUse: [
      'Tentativa de suicídio em curso ou recente — use SAMU 192 ou UPA',
      'Autolesão com sangramento importante ou perda de consciência — use SAMU',
      'Crise psicótica intensa (agitação extrema, fuga da realidade) — use CAPS IJ ou UPA',
      'Abuso sexual recente (menos de 72h) — use UPA (tem protocolo específico)',
      'Qualquer emergência clínica com risco imediato — use SAMU 192'
    ],
    differentiationNote: 'UBS ≠ UPA: UBS é para casos estáveis que podem aguardar. UBS ≠ CAPS: UBS trata demandas leves/moderadas; CAPS trata sofrimento intenso e crises.'
  },
  'caps-ij': {
    description: 'Centro de Atenção Psicossocial Infantojuvenil II: serviço especializado em saúde mental para crianças e adolescentes com sofrimento psíquico intenso, crise, autolesão recorrente, ideação suicida com plano, uso problemático de substâncias e transtornos graves do desenvolvimento.',
    strategicDescription: 'Encaminhe ao CAPS IJ quando o sofrimento psíquico do estudante é INTENSO, recorrente ou representa risco: autolesão repetida, ideação suicida com plano ou meios disponíveis, sintomas psicóticos, agitação intensa com risco a si ou outros.',
    howToCall: 'Ligue (11) 3294-3828. Para encaminhamento escolar, leve ou envie carta com nome, RA, turno, descrição objetiva dos sinais e contato da família. O CAPS faz acolhimento sem necessidade de encaminhamento médico prévio.',
    whenToUse: [
      'Autolesão recorrente (cortes, queimaduras) mesmo sem intenção declarada de morte',
      'Ideação suicida com plano definido ou meios disponíveis',
      'Sintomas psicóticos: fala desorganizada, alucinações, agitação extrema',
      'Transtorno mental grave já diagnosticado sem acompanhamento ativo',
      'Uso frequente de substâncias com prejuízo escolar e social em adolescente',
      'Depressão ou ansiedade grave com comprometimento total do funcionamento'
    ],
    whenNotToUse: [
      'Tentativa de suicídio em curso ou recente — use SAMU 192 PRIMEIRO',
      'Crise com risco físico imediato — use UPA/SAMU, depois CAPS como seguimento',
      'Tristeza leve ou episódica sem prejuízo funcional — encaminhe à UBS',
      'Demandas exclusivamente pedagógicas (dificuldade de aprendizagem sem componente mental grave)'
    ],
    differentiationNote: 'CAPS IJ ≠ UBS: CAPS é para sofrimento intenso/crise; UBS é para casos leves/moderados. CAPS IJ ≠ UPA: CAPS é seguimento especializado; UPA é urgência física/aguda.'
  },
  'caps-adulto': {
    description: 'Centro de Atenção Psicossocial Adulto II: mesma lógica do CAPS IJ, mas para adultos (≥18 anos). Referência para responsáveis e funcionários da escola, além de estudantes adultos do EJA/período noturno.',
    strategicDescription: 'Acione quando um estudante adulto (EJA, EM noturno ≥18 anos) ou familiar/responsável apresentar sofrimento psíquico intenso. Para adolescentes <18 anos, o CAPS IJ é a referência.',
    howToCall: 'Ligue (11) 2546-6787.',
    whenToUse: [
      'Estudante adulto (EJA/EM noturno) com crise de saúde mental',
      'Familiar ou responsável em sofrimento intenso que impacta os cuidados do estudante',
      'Casos limítrofes de idade (17–18 anos): consultar o CAPS IJ primeiro'
    ],
    whenNotToUse: [
      'Crianças ou adolescentes <18 anos — use CAPS IJ',
      'Urgências — use SAMU/UPA'
    ],
    differentiationNote: 'CAPS Adulto ≠ CAPS IJ: a divisão é por faixa etária (<18 anos = IJ; ≥18 anos = Adulto).'
  },
  'caps-ad': {
    description: 'Centro de Atenção Psicossocial Álcool e Drogas II: tratamento de uso problemático e dependência de álcool, crack, maconha e outras substâncias. Atende adolescentes a partir de 16 anos (verificar critério local) e adultos.',
    strategicDescription: 'Encaminhe ao CAPS AD quando o estudante apresenta uso FREQUENTE ou PROBLEMÁTICO de substâncias: prejuízo escolar evidente, sintomas de dependência, recaídas repetidas. Para uso episódico ou experimental, a UBS/PSE é suficiente.',
    howToCall: 'Ligue (11) 2943-9276. O CAPS AD aceita demanda espontânea (o estudante ou familiar pode ir diretamente).',
    whenToUse: [
      'Uso diário ou quase diário de álcool, maconha, crack ou outras drogas',
      'Sintomas de abstinência quando tenta parar',
      'Uso prejudicando escola, família e saúde ao mesmo tempo',
      'Estudante ou familiar com histórico de tentativas fracassadas de parar sozinho',
      'Adolescente flagrado usando substâncias repetidamente na escola'
    ],
    whenNotToUse: [
      'Uso experimental/ocasional isolado sem prejuízo — use UBS + educação preventiva',
      'Intoxicação aguda em curso — use SAMU 192 ou UPA',
      'Tráfico de drogas organizado — acione PM 190 e depois Conselho Tutelar'
    ],
    differentiationNote: 'CAPS AD ≠ UBS: CAPS AD trata dependência estabelecida; UBS cuida de prevenção e casos leves. CAPS AD ≠ PM: PM é para segurança/crime; CAPS AD é para saúde.'
  },
  'upa-ermelino': {
    description: 'Unidade de Pronto Atendimento 24h: urgências que precisam de médico HOJE mas que, em geral, NÃO representam risco imediato de morte. Possui capacidade diagnóstica (exames, raio-X) e pode estabilizar e encaminhar para hospital se necessário.',
    strategicDescription: 'Envie à UPA quando o estudante precisa de avaliação médica imediata mas está consciente, respirando e sem risco de morte iminente. A UPA é o destino correto para abuso sexual recente (<72h) — tem protocolo específico.',
    howToCall: 'Leve o estudante pessoalmente ou chame familiar. Em situações graves, acione SAMU 192 para transporte seguro. Para abuso sexual, diga na entrada: "É caso de violência sexual" para agilizar protocolo.',
    whenToUse: [
      'Abuso sexual recente (menos de 72h) — UPA tem protocolo de emergência',
      'Convulsão que já cessou mas primeira vez ou recorrente sem diagnóstico',
      'Febre alta com mal-estar intenso que não melhora com medicação oral',
      'Trauma (queda, pancada) sem perda de consciência mas com dor intensa',
      'Corte profundo que precisa de sutura',
      'Intoxicação/ingesta de substância já estabilizada, para avaliação'
    ],
    whenNotToUse: [
      'Parada cardiorrespiratória, perda de consciência, trauma grave — use SAMU 192',
      'Doenças crônicas estáveis em consulta de rotina — use UBS',
      'Sofrimento psíquico sem componente físico — use CAPS IJ ou UBS'
    ],
    differentiationNote: 'UPA ≠ UBS: UPA é urgência hoje, sem esperar; UBS é acompanhamento e casos que podem aguardar. UPA ≠ Hospital: Hospital é para casos muito graves/cirurgias; UPA estabiliza e transfere se necessário. UPA ≠ SAMU: SAMU vai até o paciente em emergências; UPA o paciente vai até lá.'
  },
  'cras-ermelino': {
    description: 'Centro de Referência de Assistência Social: proteção social BÁSICA para famílias em vulnerabilidade social. Porta de entrada do SUAS. Oferece acompanhamento familiar (PAIF), acesso a benefícios (Bolsa Família, BPC), orientação sobre direitos e SCFV para crianças/adolescentes.',
    strategicDescription: 'Acione o CRAS quando a vulnerabilidade é SOCIAL e ECONÔMICA, mas SEM violação grave de direitos confirmada. Exemplo: família sem renda para material escolar, risco de evasão por trabalho infantil incipiente, conflito familiar sem violência, necessidade de benefícios.',
    howToCall: 'Ligue (11) 2545-3211 ou oriente a família a ir pessoalmente. A escola pode fazer encaminhamento com carta descrevendo objetivamente a situação (sem juízo de valor). Marque reunião intersetorial se necessário.',
    whenToUse: [
      'Família em extrema pobreza, sem renda suficiente para necessidades básicas do estudante',
      'Estudante sem material, fardamento, alimentação adequada — sem sinal de negligência grave',
      'Risco de evasão escolar por necessidade de trabalho para sustentar família',
      'Família em conflito interno sem histórico de violência grave',
      'Necessidade de Bolsa Família, BPC, Benefício Eventual ou SCFV para o adolescente',
      'Mãe/responsável sobrecarregada sem rede de apoio social'
    ],
    whenNotToUse: [
      'Violência doméstica, abuso sexual, negligência grave — use CREAS',
      'Trabalho infantil já confirmado com exploração — use CREAS + Conselho Tutelar',
      'Situação de rua — use CREAS + Abordagem Social'
    ],
    differentiationNote: 'CRAS ≠ CREAS: CRAS é proteção básica (vulnerabilidade sem violação); CREAS é proteção especial (violação de direitos confirmada). Regra prática: se há violência ou crime, é CREAS. Se é pobreza sem violência, é CRAS.'
  },
  'creas-ermelino': {
    description: 'Centro de Referência Especializado de Assistência Social: proteção social ESPECIAL para famílias e indivíduos com direitos violados. Atende casos de violência doméstica e intrafamiliar, abuso e exploração sexual, trabalho infantil, negligência grave, situação de rua e acolhimento institucional.',
    strategicDescription: 'Acione o CREAS quando há VIOLAÇÃO DE DIREITOS confirmada ou fortemente suspeita, geralmente em conjunto com o Conselho Tutelar. O CREAS faz o acompanhamento especializado após a notificação.',
    howToCall: 'Ligue (11) 2541-7882. Em situações graves, faça contato institucional com ofício e depois confirme por telefone. O CREAS não substitui a notificação ao Conselho Tutelar — ambos devem ser acionados simultaneamente.',
    whenToUse: [
      'Violência física, psicológica ou sexual intrafamiliar confirmada ou fortemente suspeita',
      'Negligência grave: criança sem alimentação, cuidados básicos de saúde e higiene',
      'Trabalho infantil ou exploração sexual de criança/adolescente',
      'Adolescente em situação de rua',
      'Casos já com histórico no Conselho Tutelar que precisam de acompanhamento contínuo',
      'Família com múltiplas violações sobrepostas (pobreza + violência + abandono)'
    ],
    whenNotToUse: [
      'Pobreza ou vulnerabilidade SEM violação de direitos — use CRAS',
      'Conflito familiar leve sem violência — use CRAS',
      'Emergências físicas — use SAMU/UPA primeiro'
    ],
    differentiationNote: 'CREAS ≠ CRAS: diferença fundamental é a existência de VIOLAÇÃO DE DIREITOS. CREAS ≠ Conselho Tutelar: CT notifica e cobra; CREAS acompanha e oferece serviços. Os dois trabalham juntos.'
  },
  'conselho-tutelar': {
    description: 'Órgão autônomo e permanente de defesa dos direitos de crianças e adolescentes (ECA, Art. 131). Tem poder de requisitar serviços, notificar famílias, representar ao MP e acionar o Judiciário. NÃO é órgão investigativo nem punitivo — é protetor.',
    strategicDescription: 'O Conselho Tutelar é a primeira porta do sistema de garantia de direitos. Acione SEMPRE que houver suspeita ou confirmação de violação de direitos de criança ou adolescente. A escola TEM OBRIGAÇÃO LEGAL de notificar (ECA Art. 245).',
    howToCall: 'Ligue (11) 2214-9050 / (11) 2546-0657 / (11) 2546-3257. Em casos graves fora do horário, o plantão municipal atende. Registre a notificação por escrito (Anexo II quando houver relato da criança).',
    whenToUse: [
      'Suspeita ou confirmação de qualquer forma de violência: física, psicológica, sexual, negligência',
      'Evasão escolar injustificada após tentativas da escola sem resposta da família',
      'Trabalho infantil, exploração sexual, situação de rua',
      'Família que se recusa a levar o estudante a tratamento de saúde necessário',
      'Qualquer situação em que os pais/responsáveis coloquem o filho em risco',
      'Violência grave entre estudantes (especialmente com vitimização sistemática)'
    ],
    whenNotToUse: [
      'Situações exclusivamente pedagógicas sem violação de direitos',
      'Conflitos entre pares de baixa gravidade — use mediação escolar',
      'Emergências físicas em curso — SAMU 192 PRIMEIRO, CT depois'
    ],
    differentiationNote: 'CT ≠ Polícia Civil: CT protege a criança; Delegacia investiga o crime. CT ≠ MP: CT age diretamente; MP atua quando CT não resolve. Os três podem e devem ser acionados simultaneamente em casos graves.'
  },
  'policia-militar': {
    description: 'Polícia Militar (190): força de segurança pública estadual. Responde a chamados de emergência, preserva a ordem pública, prende em flagrante e isola cenas de crime. Age no DURANTE: enquanto o crime ou risco está acontecendo.',
    strategicDescription: 'Acione a PM (190) quando há RISCO FÍSICO IMEDIATO ou crime EM CURSO na escola ou entorno. Para fatos que já ocorreram, registre BO na Delegacia (PC). NUNCA acione PM para situações de indisciplina, conflito pedagógico ou uso de drogas sem violência.',
    howToCall: 'Ligue 190. Informe: local exato, o que está acontecendo, quantas pessoas envolvidas, se há armas. Mantenha o estudante seguro enquanto aguarda.',
    whenToUse: [
      'Briga com arma de fogo ou arma branca em uso na escola',
      'Invasão armada ou ameaça de morte em curso',
      'Tiros ou conflito armado próximo à escola com risco real',
      'Sequestro ou retenção de pessoa contra a vontade',
      'Flagrante de tráfico de drogas organizado dentro da escola'
    ],
    whenNotToUse: [
      'Brigas leves ou discussões sem arma — use mediação escolar',
      'Uso de drogas sem violência — use CAPS AD + Conselho Tutelar',
      'Indisciplina, xingamentos, furtos simples — use gestão escolar + BO policial se necessário',
      'Fatos já ocorridos sem risco atual — vá à Delegacia (PC) para BO'
    ],
    differentiationNote: 'PM (190) ≠ Polícia Civil (DP/197): PM age no DURANTE, em flagrante e risco imediato. PC age NO DEPOIS: investiga, registra BO, apura autoria. Regra simples: está acontecendo agora = 190. Já aconteceu = DP.'
  },
  'delegacia-civil-197': {
    description: 'Polícia Civil (197 / Delegacia): responsável por investigações criminais, registro de Boletim de Ocorrência (BO), inquéritos policiais. Age no APÓS: quando o crime já ocorreu e precisa de registro formal e investigação.',
    strategicDescription: 'Oriente a escola ou família a ir à delegacia territorial (62ª DP) para registrar BO quando o crime já ocorreu: injúria racial, cyberbullying com crime, agressão física sem risco atual, ameaça, furto, dano. O 197 é o canal de orientação.',
    howToCall: 'Ligue 197 para orientação. Vá presencialmente à 62ª DP (Rua Luís Gama, 460 - Jardim Belém) para registrar BO. DDM São Miguel Paulista para violência contra mulher.',
    whenToUse: [
      'Registrar BO de injúria racial, racismo ou LGBTfobia com nome do autor',
      'Cyberbullying com crimes: ameaça, difamação, pornografia de vingança',
      'Agressão física com lesão já ocorrida (não em curso)',
      'Furto ou dano ao patrimônio escolar',
      'Ameaça de morte recebida por mensagem ou redes sociais',
      'Abuso sexual já ocorrido (além da notificação ao CT e UPA)'
    ],
    whenNotToUse: [
      'Crime em curso, risco imediato — use PM 190 PRIMEIRO',
      'Conflitos pedagógicos sem crime tipificado — use gestão escolar',
      'Situações de proteção infantil — Conselho Tutelar é a primeira porta, não a Delegacia'
    ],
    differentiationNote: 'PC/DP ≠ PM: PC investiga o depois; PM age no agora. DP ≠ CT: CT protege a criança; DP apura o crime do adulto agressor.'
  },
  defensoria: {
    description: 'Defensoria Pública do Estado de SP: garante assistência jurídica gratuita a pessoas que não podem pagar advogado. Atua em violações de direito à educação, inclusão de PcD, recusa de matrícula, discriminação institucional e violência institucional.',
    strategicDescription: 'Acione (ou oriente família a acionar) a Defensoria quando há VIOLAÇÃO DO DIREITO LEGAL do estudante que não foi resolvida pelos canais anteriores: recusa de matrícula, exclusão de PcD, discriminação sistemática institucional.',
    howToCall: 'Ligue 0800 773 4340 (gratuito). Pode ser acionada diretamente pela família ou pela escola via ofício.',
    whenToUse: [
      'Recusa ou dificuldade indevida de matrícula (inclusive para PcD)',
      'Discriminação racial, por deficiência ou de gênero não resolvida internamente',
      'Família sem condições de arcar com advogado em processo de proteção da criança',
      'Violação institucional persistente após acionamento do CT e MP'
    ],
    whenNotToUse: [
      'Conflitos internos com solução pedagógica possível',
      'Emergências físicas'
    ]
  },
  'ddm-sao-miguel': {
    description: 'Delegacia de Defesa da Mulher de São Miguel Paulista: delegacia especializada em crimes contra a mulher — violência doméstica, estupro, ameaça, assédio. Referência para mães/responsáveis femininas vítimas de violência que impacta a vida escolar do estudante.',
    strategicDescription: 'Encaminhe quando a MÃE ou responsável feminina do estudante for vítima de violência doméstica. O registro do BO na DDM agiliza medida protetiva e pode ser determinante para a segurança do estudante.',
    howToCall: 'Ligue (11) 6154-1362. Funciona 24h para registro de ocorrências.',
    whenToUse: [
      'Mãe ou responsável feminina relatando violência doméstica',
      'Estudante que testemunha violência doméstica em casa',
      'Casos de violência sexual contra adolescente do sexo feminino por adulto conhecido'
    ],
    whenNotToUse: [
      'Violência sexual de estudante em curso agudo — UPA primeiro',
      'Crimes não relacionados à violência de gênero — use 62ª DP'
    ]
  },
  'de-leste1': {
    description: 'Diretoria de Ensino Região Leste 1: instância administrativa e pedagógica da SEDUC-SP responsável pela supervisão, apoio e orientação técnica das escolas estaduais do território.',
    strategicDescription: 'Acione a DE quando a situação ultrapassa a capacidade de resolução da gestão escolar, há necessidade de suporte institucional formal, ou quando houver violação institucional dentro da própria escola (violência praticada por servidor, por exemplo).',
    howToCall: 'Ligue 0800 770 0012 ou contate diretamente o Supervisor de Ensino responsável pela escola.',
    whenToUse: [
      'Situação grave com necessidade de apoio institucional (violência de servidor, crise grave)',
      'Necessidade de afastamento de funcionário por conduta inadequada',
      'Dúvidas sobre procedimentos legais/protocolares que a direção não sabe resolver',
      'Apoio para revisão ou elaboração de protocolos internos'
    ],
    whenNotToUse: [
      'Situações operacionais que a direção pode resolver internamente',
      'Emergências — acione SAMU/PM/CT direto, informe DE depois'
    ]
  },
  conviva: {
    description: 'Plataforma Conviva SP / Secretaria Escolar Digital: sistema oficial da SEDUC-SP para registro digital de ocorrências escolares, acompanhamento de indicadores e comunicação institucional.',
    strategicDescription: 'Use o Conviva para REGISTRO FORMAL de ocorrências conforme protocolo. O registro no Conviva complementa (não substitui) o Anexo I físico e os encaminhamentos à rede.',
    howToCall: 'Acesso institucional via SED (Secretaria Escolar Digital). Login com credenciais da escola.',
    whenToUse: [
      'Registro obrigatório de ocorrências de violência escolar conforme política SEDUC',
      'Documentação de ações pedagógicas e encaminhamentos',
      'Monitoramento de frequência e indicadores de evasão'
    ],
    whenNotToUse: [
      'Não substitui notificação ao Conselho Tutelar',
      'Não substitui Boletim de Ocorrência policial',
      'Não é canal de emergência'
    ]
  },
  samu: {
    description: 'SAMU 192: serviço de atendimento pré-hospitalar de urgência e emergência. Equipe médica vai até o local, avalia e transporta. É para quando NÃO é seguro ou possível transportar o paciente por meios próprios.',
    strategicDescription: 'Acione IMEDIATAMENTE quando há risco de MORTE ou lesão grave EM CURSO. O SAMU vai até a escola.',
    howToCall: 'Ligue 192. Informe: local exato (nome da escola, endereço, ponto de referência), o que está acontecendo, estado do paciente (consciente? respirando?), seu nome e telefone. Não desligue até ser orientado.',
    whenToUse: [
      'Perda de consciência, parada cardiorrespiratória',
      'Tentativa de suicídio em andamento ou recente com risco físico',
      'Convulsão prolongada (mais de 5 minutos)',
      'Sangramento grave ou ferimento perfurante',
      'Crise asmática grave sem resposta a medicação',
      'Overdose ou intoxicação grave com alteração de consciência',
      'Qualquer situação em que mover o estudante sozinho pode piorar'
    ],
    whenNotToUse: [
      'Crises emocionais sem risco físico — use CAPS IJ',
      'Problemas de saúde que podem aguardar — use UBS'
    ]
  },
  bombeiros: {
    description: 'Corpo de Bombeiros 193: resposta a incêndios, desabamentos, resgate em altura, afogamentos e primeiros socorros em situações de catástrofe.',
    howToCall: 'Ligue 193. Informe o endereço e o que está acontecendo.',
    whenToUse: [
      'Incêndio ou risco de incêndio nas dependências da escola',
      'Desabamento parcial ou estrutura comprometida',
      'Estudante preso em situação de risco físico',
      'Afogamento (em caso de escola com piscina ou próxima a área de risco)'
    ]
  },
  'disque-100': {
    description: 'Disque 100 - Direitos Humanos: canal nacional gratuito e sigiloso para denúncias de violações de direitos humanos contra grupos vulneráveis, incluindo crianças, adolescentes, pessoas com deficiência e população LGBTQIA+.',
    howToCall: 'Ligue 100, gratuito, 24h. Pode ser anônimo.',
    whenToUse: [
      'Violações de direitos de crianças e adolescentes sem resposta local satisfatória',
      'Discriminação ou violência contra pessoas com deficiência',
      'Violência contra população LGBTQIA+',
      'Situações em que outros canais locais não responderam adequadamente'
    ]
  },
  cvv: {
    description: 'Centro de Valorização da Vida: apoio emocional e prevenção do suicídio. Atendimento voluntário, gratuito e sigiloso por telefone, chat e e-mail.',
    strategicDescription: 'Indique o CVV (188) como apoio COMPLEMENTAR para estudantes em sofrimento emocional que precisam de escuta imediata fora do horário escolar. NÃO substitui atendimento profissional pelo CAPS ou UBS.',
    howToCall: 'Ligue 188 (gratuito, 24h) ou acesse cvv.org.br para chat.',
    whenToUse: [
      'Estudante ou familiar que precisa de escuta emocional imediata fora do horário da escola',
      'Como suporte enquanto aguarda consulta no CAPS ou UBS',
      'Situações de crise emocional sem risco físico imediato'
    ],
    whenNotToUse: [
      'Tentativa de suicídio em curso — use SAMU 192',
      'Diagnóstico ou tratamento de transtorno mental — use CAPS IJ ou UBS'
    ]
  },
  'disque-denuncia': {
    description: 'Disque Denúncia SSP-SP (181): canal estadual para denúncias anônimas de crimes ao estado de São Paulo.',
    howToCall: 'Ligue 181, gratuito. Pode ser anônimo.',
    whenToUse: [
      'Denúncia anônima de tráfico de drogas no entorno escolar',
      'Denúncia de atividade criminosa organizada com risco para a escola',
      'Informações sobre paradeiro de suspeitos de crime'
    ]
  }
};

const SERVICES: Service[] = BASE_SERVICES.map((service) => {
  const enrichedService = SERVICE_ENRICHMENT[service.id] ? { ...service, ...SERVICE_ENRICHMENT[service.id] } : service;

  return ({
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
  ...enrichedService
  });
});

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
        { label: 'Não', nextNodeId: 'n_pretriagem_recheck_risco' }
      ],
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },

    {
      id: 'n_pretriagem_recheck_risco',
      question: 'Confirma: há risco imediato à integridade física neste momento?',
      options: [
        { label: 'Sim', nextNodeId: 'leaf_emergencia_imediata' },
        { label: 'Não', nextNodeId: 'n_pretriagem_violencia' }
      ],
      category: 'NAO_SEI',
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },
    {
      id: 'n_pretriagem_violencia',
      question: 'Há suspeita ou relato de violência ou abuso?',
      options: [
        { label: 'Sim', nextNodeId: 'n_direitos_triagem' },
        { label: 'Não', nextNodeId: 'n_pretriagem_emocional' }
      ],
      category: 'NAO_SEI',
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },
    {
      id: 'n_pretriagem_emocional',
      question: 'O principal problema é sofrimento emocional intenso?',
      options: [
        { label: 'Sim', nextNodeId: 'n_mental_triagem' },
        { label: 'Não', nextNodeId: 'n_categoria_situacao' }
      ],
      category: 'NAO_SEI',
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
        { label: 'Não sei / preciso de apoio', nextNodeId: 'leaf_duvida_padrao', categoryId: 'duvida' },
        { label: 'Uso de substâncias (álcool/drogas)', nextNodeId: 'n_drogas_triagem', categoryId: 'drogas' },
        { label: 'Gravidez / saúde sexual e reprodutiva', nextNodeId: 'n_gravidez_triagem', categoryId: 'gravidez' },
        { label: 'Falta excessiva / evasão / busca ativa', nextNodeId: 'n_evasao_triagem', categoryId: 'evasao' }
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
        { label: 'Há discriminação, racismo, LGBTfobia ou capacitismo?', nextNodeId: 'n_discriminacao_triagem' },
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
        { label: 'Não', nextNodeId: 'leaf_pedagogico_rotina' },
        { label: 'Estudante com deficiência sem suporte adequado', nextNodeId: 'n_inclusao_pcd_triagem' }
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
      id: 'n_drogas_triagem',
      question: 'Como você descreveria o envolvimento com substâncias?',
      helperText: 'Marque o que melhor descreve a situação observada.',
      options: [
        { label: 'Uso frequente/problemático com prejuízo claro', nextNodeId: 'leaf_drogas_caps_ad' },
        { label: 'Uso episódico ou suspeita sem prejuízo grave', nextNodeId: 'leaf_drogas_ubs_prevencao' },
        { label: 'Há tráfico, porte ou coação/ameaça envolvida', nextNodeId: 'leaf_drogas_seguranca' }
      ],
      category: 'EMOCIONAL_COMPORTAMENTO',
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },
    {
      id: 'n_gravidez_triagem',
      question: 'A gravidez está relacionada a alguma situação de violência sexual?',
      indicators: ['Relato de abuso', 'Gravidez em estudante muito jovem (<14 anos)', 'Negativa em revelar o pai'],
      options: [
        { label: 'Sim ou há forte suspeita', nextNodeId: 'leaf_gravidez_violencia_sexual' },
        { label: 'Não — gravidez consensual / relação consentida', nextNodeId: 'leaf_gravidez_apoio' }
      ],
      category: 'SAUDE_FISICA',
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },
    {
      id: 'n_evasao_triagem',
      question: 'Qual é o padrão de ausência do estudante?',
      options: [
        { label: '5 ou mais dias seguidos sem contato ou justificativa', nextNodeId: 'leaf_evasao_busca_ativa_urgente' },
        { label: 'Faltas frequentes mas intermitentes (não bloco corrido)', nextNodeId: 'leaf_evasao_acompanhamento' }
      ],
      category: 'DIFICULDADE_PEDAGOGICA',
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },
    {
      id: 'n_discriminacao_triagem',
      question: 'A discriminação é sistemática, reiterada ou com vítima claramente identificada?',
      indicators: ['Apelidos degradantes recorrentes', 'Exclusão organizada', 'Ameaças motivadas por raça/gênero/deficiência'],
      options: [
        { label: 'Sim — grave, reiterada ou com crime configurado', nextNodeId: 'leaf_discriminacao_grave' },
        { label: 'Não — episódio pontual abordável pedagogicamente', nextNodeId: 'leaf_discriminacao_orientacao' }
      ],
      category: 'CONVIVENCIA_CONFLITOS',
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },
    {
      id: 'n_inclusao_pcd_triagem',
      question: 'Qual é a natureza principal da situação com o estudante com deficiência?',
      options: [
        { label: 'Falta de suporte pedagógico (AEE, adaptações, diagnóstico)', nextNodeId: 'leaf_inclusao_aee' },
        { label: 'Exclusão, discriminação grave ou recusa de acesso', nextNodeId: 'leaf_inclusao_violacao_direitos' }
      ],
      category: 'DIFICULDADE_PEDAGOGICA',
      fallbackNextNodeId: 'leaf_duvida_padrao'
    },
    {
      id: 'leaf_drogas_caps_ad',
      question: 'Uso problemático de substâncias com necessidade de tratamento especializado',
      options: [],
      isLeaf: true,
      category: 'EMOCIONAL_COMPORTAMENTO',
      riskLevel: 'MÉDIO',
      doNow: [
        'Acolha sem julgamento e comunique coordenação e família.',
        'Encaminhe ao CAPS AD II Ermelino Matarazzo — aceita demanda espontânea.',
        'Registre no Anexo I e monitore frequência e comportamento nas semanas seguintes.'
      ],
      whyThisService: 'CAPS AD é o serviço especializado em tratamento de dependência química. UBS pode fazer triagem inicial, mas o acompanhamento continuado é no CAPS AD. Não acione PM: uso problemático de drogas é questão de saúde, não segurança.',
      serviceCharacterization: [
        'CAPS AD: tratamento especializado para dependência — serviço primário.',
        'UBS: pode fazer triagem inicial e encaminhar para CAPS AD.',
        'CRAS: apoio social para a família se houver vulnerabilidade econômica.',
        'NÃO é caso de PM nem Delegacia, a menos que haja tráfico organizado ou violência.'
      ],
      forbiddenActions: [
        'Não expor o estudante publicamente ou comunicar situação em sala de aula.',
        'Não acionar PM apenas por uso — criminalização agrava o quadro de saúde.',
        'Não esperar "piorar" para encaminhar — uso problemático tem tratamento eficaz.'
      ],
      contactTargets: ['CAPS_ADULTO', 'UBS', 'GESTAO_ESCOLAR'],
      notifyManagement: true,
      deadline: 'Em até 3 dias úteis',
      recordRequired: [{ system: 'CONVIVA', due: 'Até 48h', notes: 'Registro de situação de saúde do estudante.' }],
      sourceRef: { label: 'Protocolo 2026.02', filePath: 'public/protocolo', section: 'Uso de substâncias' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_drogas_ubs_prevencao',
      question: 'Suspeita ou uso episódico de substâncias sem prejuízo grave aparente',
      options: [],
      isLeaf: true,
      category: 'EMOCIONAL_COMPORTAMENTO',
      riskLevel: 'BAIXO',
      doNow: [
        'Converse em local reservado, sem julgamento.',
        'Inclua o estudante em projetos de prevenção e encaminhe à UBS para avaliação.',
        'Comunique a família e agende retorno de monitoramento.'
      ],
      whyThisService: 'Para uso experimental/episódico, a UBS (com PSE) faz avaliação e prevenção eficaz. CAPS AD é para casos com dependência estabelecida.',
      contactTargets: ['UBS', 'GESTAO_ESCOLAR'],
      notifyManagement: true,
      deadline: 'Em até 7 dias',
      sourceRef: { label: 'Protocolo 2026.02', filePath: 'public/protocolo', section: 'Uso de substâncias — prevenção' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_drogas_seguranca',
      question: 'Tráfico, porte de drogas ou coação/ameaça relacionada a substâncias',
      options: [],
      isLeaf: true,
      category: 'VIOLACAO_DIREITOS_VIOLENCIA',
      riskLevel: 'ALTO',
      doNow: [
        'Proteja o estudante imediatamente — não confronte o suposto traficante.',
        'Acione a gestão e, se houver risco físico em curso, PM 190.',
        'Notifique o Conselho Tutelar — criança/adolescente sendo cooptado é violação de direitos.'
      ],
      whyThisService: 'Tráfico é crime: PM age no flagrante. CT age na proteção do adolescente cooptado. CAPS AD age no tratamento se houver dependência associada.',
      forbiddenActions: [
        'Não confronte diretamente a situação de tráfico sem apoio policial.',
        'Não trate como problema disciplinar — é situação de segurança e proteção.'
      ],
      contactTargets: ['GESTAO_ESCOLAR', 'CONSELHO_TUTELAR'],
      notifyManagement: true,
      deadline: 'Imediato',
      sourceRef: { label: 'Protocolo 2026.02', filePath: 'public/protocolo', section: 'Segurança e tráfico' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_gravidez_violencia_sexual',
      question: 'Gravidez suspeita ou confirmada com indício ou relato de violência sexual',
      options: [],
      isLeaf: true,
      category: 'VIOLACAO_DIREITOS_VIOLENCIA',
      riskLevel: 'ALTO',
      doNow: [
        'Acolha com escuta qualificada mínima — não pressione por detalhes.',
        'Encaminhe à UPA imediatamente se a violência for recente (<72h) para protocolo de emergência.',
        'Notifique o Conselho Tutelar no mesmo dia — é obrigação legal.',
        'Acione CREAS para acompanhamento especializado da família.'
      ],
      whyThisService: 'UPA tem protocolo específico para violência sexual (<72h: contracepção de emergência, profilaxia IST/HIV). CT protege a criança. CREAS acompanha família. Se <14 anos: qualquer relação sexual é crime — notificação é obrigatória independentemente de consentimento.',
      forbiddenActions: [
        'Não comunique à família antes de avaliar se ela é a fonte do risco.',
        'Não revitimize com perguntas repetidas ou exposição pública.',
        'Não descarte a suspeita por "consentimento" em estudante < 14 anos.'
      ],
      contactTargets: ['GESTAO_ESCOLAR', 'CONSELHO_TUTELAR', 'UPA_HOSPITAL', 'CREAS'],
      notifyManagement: true,
      deadline: 'Imediato (mesmo dia)',
      recordRequired: [{ system: 'CONVIVA', due: 'Hoje', notes: 'Registro sigiloso.' }, { system: 'OUTRO', due: 'Hoje', notes: 'Anexo II — escuta qualificada quando possível.' }],
      sourceRef: { label: 'Lei 13.431/2017 + ECA', filePath: 'public/protocolo', section: 'Violência sexual — gravidez' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_gravidez_apoio',
      question: 'Gravidez na adolescência sem indício de violência — apoio e permanência escolar',
      options: [],
      isLeaf: true,
      category: 'SAUDE_FISICA',
      riskLevel: 'MÉDIO',
      doNow: [
        'Garantia imediata da permanência escolar — a lei proíbe qualquer forma de exclusão.',
        'Articule com coordenação plano pedagógico flexível (frequência, avaliações).',
        'Encaminhe para pré-natal na UBS do território.',
        'Se houver vulnerabilidade econômica, acione CRAS para benefícios e apoio social.'
      ],
      whyThisService: 'UBS faz pré-natal e acompanhamento. CRAS garante benefícios. A escola deve adaptar — não excluir. Se surgir suspeita de violência a qualquer momento, retornar ao fluxo de violência sexual.',
      forbiddenActions: [
        'Nunca sugerir ou pressionar pela saída da escola.',
        'Não expor a situação para turma ou outros funcionários sem necessidade.',
        'Não substituir encaminhamento à UBS por orientações informais.'
      ],
      contactTargets: ['GESTAO_ESCOLAR', 'UBS', 'CRAS'],
      notifyManagement: true,
      deadline: 'Em até 3 dias úteis',
      sourceRef: { label: 'ECA Art. 227 + LDB Art. 23', filePath: 'public/protocolo', section: 'Gravidez e permanência escolar' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_evasao_busca_ativa_urgente',
      question: 'Ausência consecutiva ≥5 dias sem contato ou justificativa — busca ativa urgente',
      options: [],
      isLeaf: true,
      category: 'DIFICULDADE_PEDAGOGICA',
      riskLevel: 'ALTO',
      doNow: [
        'Tente contato com TODOS os telefones da ficha do estudante no mesmo dia.',
        'Se não houver resposta em 24h, acione o Conselho Tutelar formalmente.',
        'Registre todas as tentativas de contato com data, horário e resultado.',
        'Comunique DE Leste 1 se CT não responder em 48h.'
      ],
      whyThisService: 'Ausência prolongada injustificada pode indicar violência doméstica, trabalho infantil, situação de rua ou doença grave — CT tem poder de visita domiciliar e requisição de serviços. A escola é obrigada pelo ECA (Art. 56) a comunicar o CT.',
      forbiddenActions: [
        'Não aguarde mais de 5 dias sem acionar CT.',
        'Não descarte como "problema de família" sem investigar.'
      ],
      contactTargets: ['GESTAO_ESCOLAR', 'CONSELHO_TUTELAR', 'CRAS'],
      notifyManagement: true,
      deadline: '24h para contato; 48h para CT se sem resposta',
      recordRequired: [{ system: 'CONVIVA', due: 'Hoje', notes: 'Registrar tentativas de contato e acionamento do CT.' }],
      sourceRef: { label: 'ECA Art. 56 — notificação obrigatória', filePath: 'public/protocolo', section: 'Busca ativa e evasão' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_evasao_acompanhamento',
      question: 'Faltas intermitentes frequentes com padrão de risco de evasão',
      options: [],
      isLeaf: true,
      category: 'DIFICULDADE_PEDAGOGICA',
      riskLevel: 'MÉDIO',
      doNow: [
        'Mapeie o padrão de faltas (dias da semana, correlação com eventos familiares).',
        'Converse com o estudante em escuta reservada para identificar causa real.',
        'Acione CRAS se houver vulnerabilidade econômica como causa.',
        'Ajuste plano pedagógico para reduzir barreira de retorno.'
      ],
      contactTargets: ['GESTAO_ESCOLAR', 'CRAS'],
      notifyManagement: true,
      deadline: 'Em até 7 dias',
      sourceRef: { label: 'Protocolo 2026.02', filePath: 'public/protocolo', section: 'Frequência e permanência' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_discriminacao_grave',
      question: 'Discriminação sistemática, reiterada ou com crime configurado (injúria racial, LGBTfobia)',
      options: [],
      isLeaf: true,
      category: 'CONVIVENCIA_CONFLITOS',
      riskLevel: 'ALTO',
      doNow: [
        'Proteja a vítima imediatamente — remova do ambiente de risco se necessário.',
        'Registre todos os fatos com data, testemunhas e relato da vítima.',
        'Acione Conselho Tutelar se vítima é menor de 18 anos.',
        'Oriente família a registrar BO na 62ª DP se houver crime (injúria racial, ameaça).',
        'Acione Defensoria Pública se houver recusa institucional em resolver.'
      ],
      whyThisService: 'Racismo, LGBTfobia e capacitismo são crimes tipificados. CT protege a criança. DP registra o crime. Defensoria garante direitos se a escola institucionalizar a discriminação.',
      forbiddenActions: [
        'Não trate como "brincadeira" ou "exagero".',
        'Não exponha publicamente a vítima ao relatar o caso.',
        'Não exija prova do racismo para agir — indício suficiente já obriga acolhimento.'
      ],
      contactTargets: ['GESTAO_ESCOLAR', 'CONSELHO_TUTELAR'],
      notifyManagement: true,
      deadline: 'Imediato',
      recordRequired: [{ system: 'CONVIVA', due: 'Hoje', notes: 'Registrar ocorrência de discriminação com detalhes.' }],
      sourceRef: { label: 'Lei 7.716/89 (racismo) + ECA', filePath: 'public/protocolo', section: 'Discriminação e direitos humanos' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_discriminacao_orientacao',
      question: 'Episódio pontual de discriminação com abordagem pedagógica possível',
      options: [],
      isLeaf: true,
      category: 'CONVIVENCIA_CONFLITOS',
      riskLevel: 'BAIXO',
      doNow: [
        'Acolha a vítima em local reservado e valide o que sentiu.',
        'Converse separadamente com quem discriminou — sem confronto público.',
        'Implemente intervenção pedagógica (rodas de conversa, projetos temáticos).',
        'Monitore se o episódio se repete — em reincidência, escale para fluxo grave.'
      ],
      contactTargets: ['GESTAO_ESCOLAR'],
      notifyManagement: false,
      deadline: 'Hoje',
      sourceRef: { label: 'Protocolo 2026.02', filePath: 'public/protocolo', section: 'Convivência e diversidade' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_inclusao_aee',
      question: 'Estudante com deficiência sem suporte pedagógico adequado — falta de AEE ou diagnóstico',
      options: [],
      isLeaf: true,
      category: 'DIFICULDADE_PEDAGOGICA',
      riskLevel: 'MÉDIO',
      doNow: [
        'Acione a equipe de AEE da escola para avaliação e elaboração/revisão do PEI.',
        'Se não há diagnóstico, encaminhe à UBS para avaliação neuropediátrica ou CER.',
        'Comunique a família sobre direitos: AEE, adaptações curriculares, acessibilidade.',
        'Registre as barreiras identificadas e as ações planejadas.'
      ],
      whyThisService: 'UBS encaminha para avaliação especializada (neuropediatria, fonoaudiologia, psicologia). CER (Centro de Reabilitação) oferece reabilitação multidisciplinar. A escola é responsável pelas adaptações curriculares independentemente de diagnóstico formal.',
      contactTargets: ['GESTAO_ESCOLAR', 'UBS'],
      notifyManagement: true,
      deadline: 'Em até 15 dias',
      sourceRef: { label: 'LDB Art. 58-59 + Decreto 7.611/2011', filePath: 'public/protocolo', section: 'Educação inclusiva e AEE' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },
    {
      id: 'leaf_inclusao_violacao_direitos',
      question: 'Estudante com deficiência sofrendo exclusão grave, discriminação ou acesso negado',
      options: [],
      isLeaf: true,
      category: 'VIOLACAO_DIREITOS_VIOLENCIA',
      riskLevel: 'ALTO',
      doNow: [
        'Proteja o estudante e registre detalhadamente os fatos.',
        'Acione Conselho Tutelar se for menor de 18 anos com direito violado.',
        'Oriente família a contatar a Defensoria Pública (0800 773 4340) para suporte jurídico.',
        'Informe DE Leste 1 se a violação envolver conduta de funcionário da escola.'
      ],
      whyThisService: 'Exclusão de PcD é crime (Lei Brasileira de Inclusão, Art. 8). CT protege. Defensoria garante acesso à Justiça. DE Leste 1 supervisiona a escola.',
      forbiddenActions: [
        'Não acate "orientação" de exclusão de PcD vinda de qualquer instância — é ilegal.',
        'Não ignore relatos de estudantes com deficiência sobre discriminação.'
      ],
      contactTargets: ['GESTAO_ESCOLAR', 'CONSELHO_TUTELAR'],
      notifyManagement: true,
      deadline: 'Hoje',
      sourceRef: { label: 'Lei Brasileira de Inclusão (13.146/2015)', filePath: 'public/protocolo', section: 'Inclusão e direitos da PcD' },
      escalationRule: 'SE_DUVIDA_ESCALE'
    },

    {
      id: 'leaf_emergencia_imediata',
      question: 'Emergência imediata',
      options: [],
      isLeaf: true,
      category: 'NAO_SEI',
      riskLevel: 'EMERGENCIAL',
      mandatoryTodayAction: 'comunicar a Direção imediatamente e acionar serviço de emergência adequado.',
      doNow: [
        'Acione emergência (190/192/193) imediatamente.',
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
      riskLevel: 'ALTO',
      doNow: [
        'Acionar SAMU 192 ou encaminhar para UPA se houver risco imediato.',
        'Comunicar a Direção imediatamente e manter vigilância contínua do estudante.',
        'Encaminhar para CAPS IJ após estabilização clínica inicial.'
      ],
      contactTargets: ['GESTAO_ESCOLAR', 'EMERGENCIA_192_193', 'UPA_HOSPITAL', 'CAPS_IJ', 'UBS'],
      deadline: 'Imediato',
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
      mandatoryTodayAction: 'notificar Conselho Tutelar e comunicar a Direção.',
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
      mandatoryTodayAction: 'notificar Conselho Tutelar e comunicar a Direção.',
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
      mandatoryTodayAction: 'comunicar a Direção e manter vigilância institucional do caso.',
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



const REBUILT_DECISION_TREE: FlowNode[] = [
  {
    id: 'root_risk_check',
    question: 'Existe risco imediato à vida, integridade física ou segurança agora?',
    indicators: ['Agressão em curso', 'Desmaio/convulsão', 'Objeto perigoso', 'Crise emocional com risco'],
    options: [
      { label: 'Sim', nextNodeId: 'immediate_scenario_select' },
      { label: 'Não', nextNodeId: 'category_home' }
    ],
    fallbackNextNodeId: 'cat_nao_sei_apoio'
  },
  {
    id: 'immediate_scenario_select',
    question: 'Qual cenário imediato descreve melhor a situação?',
    options: [
      { label: 'Violência em curso', nextNodeId: 'leaf_imm_violencia' },
      { label: 'Emergência de saúde física', nextNodeId: 'leaf_imm_saude_fisica' },
      { label: 'Segurança do ambiente comprometida', nextNodeId: 'leaf_imm_seguranca_ambiente' },
      { label: 'Crise emocional aguda', nextNodeId: 'leaf_imm_crise_emocional_aguda' },
      { label: 'Outro / não sei', nextNodeId: 'cat_nao_sei_apoio' }
    ],
    fallbackNextNodeId: 'cat_nao_sei_apoio'
  },
  {
    id: 'category_home',
    question: 'Qual categoria melhor descreve a demanda principal?',
    options: [
      { label: 'Saúde emocional', nextNodeId: 'cat_saude_emocional', categoryId: 'emocional' },
      { label: 'Violência e proteção de direitos', nextNodeId: 'cat_violencia_direitos', categoryId: 'violencia' },
      { label: 'Vulnerabilidade social', nextNodeId: 'cat_vulnerabilidade_social', categoryId: 'vulnerabilidade' },
      { label: 'Convivência e conflitos', nextNodeId: 'cat_convivencia_conflitos', categoryId: 'convivencia' },
      { label: 'Pedagógico', nextNodeId: 'cat_pedagogico', categoryId: 'pedagogico' },
      { label: 'Saúde física', nextNodeId: 'cat_saude_fisica', categoryId: 'saude_fisica' },
      { label: 'Substâncias', nextNodeId: 'cat_substancias', categoryId: 'drogas' },
      { label: 'Gravidez', nextNodeId: 'cat_gravidez', categoryId: 'gravidez' },
      { label: 'Não sei / preciso de apoio', nextNodeId: 'cat_nao_sei_apoio', categoryId: 'duvida' }
    ],
    fallbackNextNodeId: 'cat_nao_sei_apoio'
  },
  { id: 'cat_saude_emocional', question: 'Saúde emocional: iniciar triagem de gravidade.', options: [{ label: 'Continuar', nextNodeId: 'sub_emocional_gravidade' }], category: 'EMOCIONAL_COMPORTAMENTO', fallbackNextNodeId: 'cat_nao_sei_apoio' },
  { id: 'sub_emocional_gravidade', question: 'Qual nível de sofrimento emocional?', indicators: ['Choro persistente', 'Isolamento', 'Fala de desesperança'], options: [{ label: 'Leve', nextNodeId: 'sub_emocional_fator_protecao' }, { label: 'Moderado', nextNodeId: 'sub_emocional_fator_protecao' }, { label: 'Alto', nextNodeId: 'sub_emocional_confirma' }], category: 'EMOCIONAL_COMPORTAMENTO', fallbackNextNodeId: 'cat_nao_sei_apoio' },
  { id: 'sub_emocional_fator_protecao', question: 'Há risco de auto/heteroagressão?', options: [{ label: 'Sim', nextNodeId: 'sub_emocional_confirma' }, { label: 'Não', nextNodeId: 'sub_emocional_confirma' }], category: 'EMOCIONAL_COMPORTAMENTO', fallbackNextNodeId: 'cat_nao_sei_apoio' },
  { id: 'sub_emocional_confirma', question: 'Confirma o quadro predominante?', options: [{ label: 'Alto', nextNodeId: 'leaf_emocional_alto' }, { label: 'Moderado', nextNodeId: 'leaf_emocional_moderado' }, { label: 'Leve', nextNodeId: 'leaf_emocional_leve' }], category: 'EMOCIONAL_COMPORTAMENTO', fallbackNextNodeId: 'cat_nao_sei_apoio' },

  { id: 'cat_violencia_direitos', question: 'Violência e direitos: iniciar classificação.', options: [{ label: 'Continuar', nextNodeId: 'sub_viol_suspeita_confirmada' }], category: 'VIOLACAO_DIREITOS_VIOLENCIA', fallbackNextNodeId: 'cat_nao_sei_apoio' },
  { id: 'sub_viol_suspeita_confirmada', question: 'Situação é suspeita ou confirmada?', options: [{ label: 'Suspeita', nextNodeId: 'sub_viol_agressor' }, { label: 'Confirmada', nextNodeId: 'sub_viol_agressor' }], category: 'VIOLACAO_DIREITOS_VIOLENCIA', fallbackNextNodeId: 'cat_nao_sei_apoio' },
  { id: 'sub_viol_agressor', question: 'Agressor é intrafamiliar ou externo?', options: [{ label: 'Intrafamiliar', nextNodeId: 'sub_viol_confirma' }, { label: 'Externo', nextNodeId: 'sub_viol_confirma' }], category: 'VIOLACAO_DIREITOS_VIOLENCIA', fallbackNextNodeId: 'cat_nao_sei_apoio' },
  { id: 'sub_viol_confirma', question: 'Confirma cenário de proteção?', options: [{ label: 'Intra', nextNodeId: 'leaf_viol_intra' }, { label: 'Extra', nextNodeId: 'leaf_viol_extra' }], category: 'VIOLACAO_DIREITOS_VIOLENCIA', fallbackNextNodeId: 'cat_nao_sei_apoio' },

  { id: 'cat_vulnerabilidade_social', question: 'Vulnerabilidade social: iniciar triagem.', options: [{ label: 'Continuar', nextNodeId: 'sub_vuln_tipo' }], category: 'VULNERABILIDADE_SOCIAL_FAMILIAR', fallbackNextNodeId: 'cat_nao_sei_apoio' },
  { id: 'sub_vuln_tipo', question: 'Qual tipo predominante?', options: [{ label: 'Alimentar/negligência/moradia', nextNodeId: 'sub_vuln_urgencia' }, { label: 'Outro social', nextNodeId: 'sub_vuln_urgencia' }], category: 'VULNERABILIDADE_SOCIAL_FAMILIAR', fallbackNextNodeId: 'cat_nao_sei_apoio' },
  { id: 'sub_vuln_urgencia', question: 'Há urgência de intervenção?', options: [{ label: 'Sim', nextNodeId: 'leaf_vuln_alta' }, { label: 'Não', nextNodeId: 'leaf_vuln_moderada' }], category: 'VULNERABILIDADE_SOCIAL_FAMILIAR', fallbackNextNodeId: 'cat_nao_sei_apoio' },

  { id: 'cat_convivencia_conflitos', question: 'Convivência: iniciar triagem.', options: [{ label: 'Continuar', nextNodeId: 'sub_conv_tipo' }], category: 'CONVIVENCIA_CONFLITOS', fallbackNextNodeId: 'cat_nao_sei_apoio' },
  { id: 'sub_conv_tipo', question: 'Bullying, briga, ameaça ou outro?', options: [{ label: 'Bullying', nextNodeId: 'sub_conv_recorrencia' }, { label: 'Conflito', nextNodeId: 'sub_conv_recorrencia' }], category: 'CONVIVENCIA_CONFLITOS', fallbackNextNodeId: 'cat_nao_sei_apoio' },
  { id: 'sub_conv_recorrencia', question: 'É recorrente ou pontual?', options: [{ label: 'Recorrente', nextNodeId: 'leaf_conv_bullying' }, { label: 'Pontual', nextNodeId: 'leaf_conv_conflito_pontual' }], category: 'CONVIVENCIA_CONFLITOS', fallbackNextNodeId: 'cat_nao_sei_apoio' },

  { id: 'cat_pedagogico', question: 'Pedagógico: iniciar triagem.', options: [{ label: 'Continuar', nextNodeId: 'sub_ped_tipo' }], category: 'DIFICULDADE_PEDAGOGICA', fallbackNextNodeId: 'cat_nao_sei_apoio' },
  { id: 'sub_ped_tipo', question: 'Evasão, defasagem ou comportamento?', options: [{ label: 'Evasão', nextNodeId: 'sub_ped_frequencia' }, { label: 'Dificuldade', nextNodeId: 'sub_ped_frequencia' }], category: 'DIFICULDADE_PEDAGOGICA', fallbackNextNodeId: 'cat_nao_sei_apoio' },
  { id: 'sub_ped_frequencia', question: 'Frequência e progressão?', options: [{ label: 'Crítico', nextNodeId: 'leaf_ped_evasao' }, { label: 'Moderado', nextNodeId: 'leaf_ped_dificuldade' }], category: 'DIFICULDADE_PEDAGOGICA', fallbackNextNodeId: 'cat_nao_sei_apoio' },

  { id: 'cat_saude_fisica', question: 'Saúde física: iniciar triagem.', options: [{ label: 'Continuar', nextNodeId: 'sub_sf_urgencia' }], category: 'SAUDE_FISICA', fallbackNextNodeId: 'cat_nao_sei_apoio' },
  { id: 'sub_sf_urgencia', question: 'Sintoma agudo agora ou de rotina?', indicators: ['Dor intensa', 'Febre alta persistente', 'Sinais clínicos agudos'], options: [{ label: 'Agudo', nextNodeId: 'leaf_sf_urgente' }, { label: 'Rotina', nextNodeId: 'leaf_sf_rotina' }], category: 'SAUDE_FISICA', fallbackNextNodeId: 'cat_nao_sei_apoio' },

  { id: 'cat_substancias', question: 'Substâncias: iniciar triagem.', options: [{ label: 'Continuar', nextNodeId: 'sub_sub_tipo' }], category: 'EMOCIONAL_COMPORTAMENTO', fallbackNextNodeId: 'cat_nao_sei_apoio' },
  { id: 'sub_sub_tipo', question: 'Suspeita ou uso confirmado?', options: [{ label: 'Risco alto', nextNodeId: 'leaf_sub_risco' }, { label: 'Orientação', nextNodeId: 'leaf_sub_orientacao' }], category: 'EMOCIONAL_COMPORTAMENTO', fallbackNextNodeId: 'cat_nao_sei_apoio' },

  { id: 'cat_gravidez', question: 'Gravidez: iniciar triagem.', options: [{ label: 'Continuar', nextNodeId: 'sub_grav_situacao' }], category: 'SAUDE_FISICA', fallbackNextNodeId: 'cat_nao_sei_apoio' },
  { id: 'sub_grav_situacao', question: 'Fase e situação de risco?', options: [{ label: 'Com risco', nextNodeId: 'leaf_grav_risco' }, { label: 'Sem risco agudo', nextNodeId: 'leaf_grav_acompanhamento' }], category: 'SAUDE_FISICA', fallbackNextNodeId: 'cat_nao_sei_apoio' },

  { id: 'cat_nao_sei_apoio', question: 'Sem classificação segura no momento?', options: [{ label: 'Acionar gestão agora', nextNodeId: 'leaf_nao_sei' }], category: 'NAO_SEI', fallbackNextNodeId: 'leaf_nao_sei' },

  { id: 'leaf_imm_violencia', question: '', options: [], isLeaf: true, riskLevel: 'EMERGENCIAL', category: 'NAO_SEI', actionSummary: 'Violência em curso — proteção imediata', doNow: ['Acionar 190 imediatamente.', 'Proteger estudantes e equipe em local seguro.', 'Comunicar direção sem atraso.'], primaryServiceId: 'policia-militar', secondaryServiceIds: ['conselho-tutelar', 'de-leste1'], deadline: 'Imediato', notifyManagement: true, recordRequired: [{ system: 'CONVIVA', due: 'Hoje', description: 'Registrar ocorrência crítica.' }], guidance: ['Evite confronto direto sem apoio.', 'Preserve evidências e testemunhas com sigilo.'], whyThisService: 'Risco imediato exige resposta policial e proteção institucional.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — emergência', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_imm_saude_fisica', question: '', options: [], isLeaf: true, riskLevel: 'EMERGENCIAL', category: 'NAO_SEI', actionSummary: 'Emergência física — atendimento imediato', doNow: ['Acionar 192 agora.', 'Prestar primeiros cuidados sem medicação própria.', 'Comunicar direção e família conforme protocolo.'], primaryServiceId: 'samu', secondaryServiceIds: ['upa-ermelino', 'de-leste1'], deadline: 'Imediato', notifyManagement: true, recordRequired: [{ system: 'CONVIVA', due: 'Hoje', description: 'Registrar sinais e acionamentos.' }], guidance: ['Se houver incêndio/risco estrutural acione 193.', 'Não deixe o estudante sozinho.'], whyThisService: 'SAMU é porta prioritária para urgências clínicas.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — saúde física', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_imm_seguranca_ambiente', question: '', options: [], isLeaf: true, riskLevel: 'EMERGENCIAL', category: 'NAO_SEI', actionSummary: 'Risco ambiental imediato — evacuação e emergência', doNow: ['Acionar 193/190 conforme cenário.', 'Isolar área de risco.', 'Informar direção e seguir plano interno de segurança.'], primaryServiceId: 'bombeiros', secondaryServiceIds: ['policia-militar', 'de-leste1'], deadline: 'Imediato', notifyManagement: true, recordRequired: [{ system: 'CONVIVA', due: 'Hoje', description: 'Registrar incidente de segurança.' }], guidance: ['Evite reentrada em área insegura.', 'Priorize evacuação assistida.'], whyThisService: 'Bombeiros e PM atuam em riscos ambientais e proteção coletiva.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — segurança', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_imm_crise_emocional_aguda', question: '', options: [], isLeaf: true, riskLevel: 'EMERGENCIAL', category: 'NAO_SEI', actionSummary: 'Crise emocional aguda — acolhimento e urgência', doNow: ['Acionar 192 se houver risco de auto/heteroagressão.', 'Manter estudante acompanhado e em ambiente protegido.', 'Comunicar gestão e acionar CAPS IJ após estabilização.'], primaryServiceId: 'samu', secondaryServiceIds: ['caps-ij', 'de-leste1'], deadline: 'Imediato', notifyManagement: true, recordRequired: [{ system: 'CONVIVA', due: 'Hoje', description: 'Registrar risco e encaminhamento.' }], guidance: ['Falar com calma e sem julgamento.', 'Não prometer sigilo absoluto.'], whyThisService: 'Crise aguda exige urgência clínica e suporte especializado.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — saúde mental', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_emocional_alto', question: '', options: [], isLeaf: true, riskLevel: 'ALTO', category: 'EMOCIONAL_COMPORTAMENTO', actionSummary: 'Sofrimento emocional alto — ação rápida', doNow: ['Acolher e manter supervisão.', 'Comunicar gestão hoje.', 'Acionar CAPS IJ prioritariamente.'], primaryServiceId: 'caps-ij', secondaryServiceIds: ['ubs-ermelino', 'de-leste1'], deadline: 'Hoje', notifyManagement: true, recordRequired: [{ system: 'CONVIVA', due: 'Hoje', description: 'Registrar sinais e rede acionada.' }], guidance: ['Monitorar piora e risco agudo.', 'Retornar ao ramo de emergência se necessário.'], whyThisService: 'CAPS IJ é referência em saúde mental infantojuvenil.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — seção emocional', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_emocional_moderado', question: '', options: [], isLeaf: true, riskLevel: 'MÉDIO', category: 'EMOCIONAL_COMPORTAMENTO', actionSummary: 'Sofrimento emocional moderado — encaminhar apoio', doNow: ['Acolher sem julgamento.', 'Comunicar gestão e registrar hoje.', 'Encaminhar CAPS IJ/UBS em até 48h.'], primaryServiceId: 'caps-ij', secondaryServiceIds: ['de-leste1', 'ubs-ermelino'], deadline: 'Hoje + 48h', notifyManagement: true, recordRequired: [{ system: 'CONVIVA', due: 'Hoje', description: 'Registrar observação e encaminhamento.' }], guidance: ['Manter acompanhamento escolar.', 'Escalar se houver piora.'], whyThisService: 'Apoio especializado reduz risco de agravamento.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — seção D2', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_emocional_leve', question: '', options: [], isLeaf: true, riskLevel: 'BAIXO', category: 'EMOCIONAL_COMPORTAMENTO', actionSummary: 'Sofrimento leve — acompanhamento escolar', doNow: ['Acolher e combinar plano de acompanhamento.', 'Comunicar coordenação.', 'Reavaliar em até 7 dias.'], primaryServiceId: 'de-leste1', secondaryServiceIds: ['ubs-ermelino'], deadline: 'Até 7 dias', notifyManagement: true, guidance: ['Registrar evolução escolar.', 'Escalar se recorrente.'], whyThisService: 'Gestão escolar coordena apoio inicial com rede.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — acompanhamento', filePath: 'content/protocolData.ts' } },

  { id: 'leaf_viol_intra', question: '', options: [], isLeaf: true, riskLevel: 'ALTO', category: 'VIOLACAO_DIREITOS_VIOLENCIA', actionSummary: 'Violência intrafamiliar — proteção imediata', doNow: ['Proteger a vítima e evitar exposição.', 'Comunicar direção e Conselho Tutelar hoje.', 'Registrar fatos objetivos com hora.'], primaryServiceId: 'conselho-tutelar', secondaryServiceIds: ['creas-ermelino', 'de-leste1'], deadline: 'Hoje', notifyManagement: true, mandatoryTodayAction: 'Notificar Conselho Tutelar e gestão hoje.', recordRequired: [{ system: 'CONVIVA', due: 'Hoje', description: 'Registro obrigatório de proteção.' }], guidance: ['Não confrontar suposto agressor.', 'Manter sigilo responsável.'], whyThisService: 'CT e CREAS são rede protetiva prioritária.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — proteção', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_viol_extra', question: '', options: [], isLeaf: true, riskLevel: 'ALTO', category: 'VIOLACAO_DIREITOS_VIOLENCIA', actionSummary: 'Violência extrafamiliar — acionar proteção', doNow: ['Garantir proteção da vítima.', 'Comunicar gestão e CT.', 'Acionar PM se houver ameaça atual.'], primaryServiceId: 'conselho-tutelar', secondaryServiceIds: ['policia-militar', 'de-leste1'], deadline: 'Hoje', notifyManagement: true, mandatoryTodayAction: 'Notificar Conselho Tutelar e gestão hoje.', recordRequired: [{ system: 'CONVIVA', due: 'Hoje', description: 'Registro obrigatório de violência.' }], guidance: ['Evitar revitimização na escuta.', 'Encaminhar UBS/UPA se houver lesão.'], whyThisService: 'Rede protetiva articula resposta intersetorial.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — proteção', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_vuln_alta', question: '', options: [], isLeaf: true, riskLevel: 'ALTO', category: 'VULNERABILIDADE_SOCIAL_FAMILIAR', actionSummary: 'Vulnerabilidade alta — intervenção prioritária', doNow: ['Comunicar gestão imediatamente.', 'Acionar CRAS/CREAS no mesmo dia.', 'Registrar e acompanhar caso.'], primaryServiceId: 'creas-ermelino', secondaryServiceIds: ['cras-ermelino', 'de-leste1'], deadline: 'Hoje', notifyManagement: true, recordRequired: [{ system: 'CONVIVA', due: 'Hoje', description: 'Registro de vulnerabilidade alta.' }], guidance: ['Priorizar segurança alimentar e proteção.', 'Monitorar frequência escolar.'], whyThisService: 'CREAS/CRAS organizam proteção social especializada.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — social', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_vuln_moderada', question: '', options: [], isLeaf: true, riskLevel: 'MÉDIO', category: 'VULNERABILIDADE_SOCIAL_FAMILIAR', actionSummary: 'Vulnerabilidade moderada — acompanhamento social', doNow: ['Comunicar gestão.', 'Encaminhar CRAS.', 'Acompanhar plano com família.'], primaryServiceId: 'cras-ermelino', secondaryServiceIds: ['de-leste1'], deadline: 'Até 72h', notifyManagement: true, guidance: ['Registrar devolutivas de rede.', 'Escalar se agravar.'], whyThisService: 'CRAS é porta de entrada socioassistencial.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — social', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_conv_bullying', question: '', options: [], isLeaf: true, riskLevel: 'MÉDIO', category: 'CONVIVENCIA_CONFLITOS', actionSummary: 'Bullying/recorrência — plano restaurativo', doNow: ['Interromper ciclo de agressão.', 'Comunicar gestão e responsáveis.', 'Aplicar plano de convivência e monitoramento.'], primaryServiceId: 'de-leste1', secondaryServiceIds: ['conselho-tutelar'], deadline: 'Hoje + 7 dias', notifyManagement: true, guidance: ['Registrar episódios e medidas.', 'Escalar para proteção se houver violência grave.'], whyThisService: 'Gestão escolar coordena medidas pedagógicas e protetivas.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — convivência', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_conv_conflito_pontual', question: '', options: [], isLeaf: true, riskLevel: 'BAIXO', category: 'CONVIVENCIA_CONFLITOS', actionSummary: 'Conflito pontual — mediação escolar', doNow: ['Acolher os envolvidos.', 'Aplicar mediação orientada.', 'Monitorar recorrência.'], primaryServiceId: 'de-leste1', secondaryServiceIds: [], deadline: 'Até 7 dias', notifyManagement: true, guidance: ['Registrar acordo pedagógico.', 'Escalar se houver ameaça.'], whyThisService: 'Mediação escolar resolve conflitos de baixa gravidade.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — convivência', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_ped_evasao', question: '', options: [], isLeaf: true, riskLevel: 'MÉDIO', category: 'DIFICULDADE_PEDAGOGICA', actionSummary: 'Risco pedagógico/evasão — busca ativa', doNow: ['Comunicar gestão e coordenação.', 'Iniciar busca ativa com família.', 'Acionar rede de apoio quando necessário.'], primaryServiceId: 'de-leste1', secondaryServiceIds: ['cras-ermelino'], deadline: 'Até 72h', notifyManagement: true, guidance: ['Registrar tentativas de contato.', 'Manter plano de retorno.'], whyThisService: 'Busca ativa reduz evasão e rompe barreiras de acesso.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — pedagógico', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_ped_dificuldade', question: '', options: [], isLeaf: true, riskLevel: 'BAIXO', category: 'DIFICULDADE_PEDAGOGICA', actionSummary: 'Dificuldade pedagógica — intervenção gradual', doNow: ['Ajustar plano pedagógico.', 'Alinhar com coordenação.', 'Reavaliar evolução.'], primaryServiceId: 'de-leste1', secondaryServiceIds: [], deadline: 'Até 15 dias', notifyManagement: true, guidance: ['Monitorar indicadores de aprendizagem.', 'Escalar se persistir sem resposta.'], whyThisService: 'Coordenação pedagógica organiza intervenção acadêmica.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — pedagógico', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_sf_urgente', question: '', options: [], isLeaf: true, riskLevel: 'ALTO', category: 'SAUDE_FISICA', actionSummary: 'Saúde física urgente — atendimento prioritário', doNow: ['Avaliar risco e acionar 192 se necessário.', 'Comunicar gestão.', 'Encaminhar UPA/UBS conforme quadro.'], primaryServiceId: 'samu', secondaryServiceIds: ['upa-ermelino', 'ubs-ermelino'], deadline: 'Hoje', notifyManagement: true, guidance: ['Não medicar com fármaco não prescrito.', 'Registrar sinais e tempo de início.'], whyThisService: 'SAMU/UPA respondem a urgências com maior segurança.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — saúde física', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_sf_rotina', question: '', options: [], isLeaf: true, riskLevel: 'BAIXO', category: 'SAUDE_FISICA', actionSummary: 'Saúde física de rotina — encaminhamento UBS', doNow: ['Orientar busca de UBS.', 'Comunicar gestão conforme rotina.', 'Acompanhar retorno.'], primaryServiceId: 'ubs-ermelino', secondaryServiceIds: [], deadline: 'Até 7 dias', notifyManagement: true, guidance: ['Registrar orientação dada.', 'Escalar se surgirem sinais de alarme.'], whyThisService: 'UBS é porta de entrada do cuidado longitudinal.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — saúde física', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_sub_risco', question: '', options: [], isLeaf: true, riskLevel: 'ALTO', category: 'EMOCIONAL_COMPORTAMENTO', actionSummary: 'Uso de substâncias com risco — intervenção imediata', doNow: ['Garantir segurança e supervisão.', 'Comunicar gestão.', 'Acionar CAPS AD/UBS.'], primaryServiceId: 'caps-ad', secondaryServiceIds: ['ubs-ermelino', 'de-leste1'], deadline: 'Hoje', notifyManagement: true, guidance: ['Evitar exposição e rotulagem.', 'Registrar sinais observáveis.'], whyThisService: 'CAPS AD oferece cuidado especializado para álcool e drogas.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — substâncias', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_sub_orientacao', question: '', options: [], isLeaf: true, riskLevel: 'MÉDIO', category: 'EMOCIONAL_COMPORTAMENTO', actionSummary: 'Suspeita de substâncias — orientação e monitoramento', doNow: ['Acolher e orientar.', 'Comunicar gestão.', 'Encaminhar UBS/CAPS AD conforme avaliação.'], primaryServiceId: 'ubs-ermelino', secondaryServiceIds: ['caps-ad'], deadline: 'Até 72h', notifyManagement: true, guidance: ['Registrar sem julgamento moral.', 'Escalar se houver risco de intoxicação.'], whyThisService: 'UBS/CAPS AD estruturam cuidado progressivo.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — substâncias', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_grav_risco', question: '', options: [], isLeaf: true, riskLevel: 'ALTO', category: 'SAUDE_FISICA', actionSummary: 'Gravidez com risco — cuidado prioritário', doNow: ['Comunicar gestão com sigilo responsável.', 'Encaminhar UBS/UPA conforme risco.', 'Articular apoio psicossocial.'], primaryServiceId: 'ubs-ermelino', secondaryServiceIds: ['upa-ermelino', 'de-leste1'], deadline: 'Hoje', notifyManagement: true, guidance: ['Preservar confidencialidade e proteção.', 'Escalar urgência clínica quando necessário.'], whyThisService: 'UBS/UPA garantem linha de cuidado materno-infantil.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — gravidez', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_grav_acompanhamento', question: '', options: [], isLeaf: true, riskLevel: 'MÉDIO', category: 'SAUDE_FISICA', actionSummary: 'Gravidez sem risco agudo — acompanhamento integrado', doNow: ['Orientar UBS para pré-natal.', 'Comunicar gestão para plano de permanência escolar.', 'Monitorar continuidade do cuidado.'], primaryServiceId: 'ubs-ermelino', secondaryServiceIds: ['de-leste1'], deadline: 'Até 72h', notifyManagement: true, guidance: ['Registrar plano pactuado.', 'Acionar rede social quando necessário.'], whyThisService: 'Acompanhamento precoce reduz risco e evasão.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — gravidez', filePath: 'content/protocolData.ts' } },
  { id: 'leaf_nao_sei', question: '', options: [], isLeaf: true, riskLevel: 'MÉDIO', category: 'NAO_SEI', actionSummary: 'Classificação incerta — apoio imediato da gestão', doNow: ['Proteger o estudante e não atrasar decisão.', 'Acionar gestão imediatamente.', 'Encaminhar UBS/serviço de referência conforme orientação.'], primaryServiceId: 'de-leste1', secondaryServiceIds: ['ubs-ermelino'], deadline: 'Hoje', notifyManagement: true, mandatoryTodayAction: 'Acionar gestão escolar imediatamente.', recordRequired: [{ system: 'CONVIVA', due: 'Hoje', description: 'Registro de dúvida classificada com apoio da gestão.' }], guidance: ['Em dúvida, escale.', 'Reclassifique após avaliação da gestão.'], whyThisService: 'A governança escolar reduz risco de omissão em cenários incertos.', fallbackNextNodeId: 'cat_nao_sei_apoio', sourceRef: { label: 'Protocolo 2026.02 — fallback global', filePath: 'content/protocolData.ts' } }
];

PROTOCOL_DATA.decisionTree = REBUILT_DECISION_TREE.map(standardizeLeafNode);

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


export const TRIAGE_ALGORITHM_TEXT = `══════════════════════════════════════════════════════════════
 ALGORITMO PRINCIPAL — TRIAGEM ESCOLAR EE ERMELINO MATARAZZO
══════════════════════════════════════════════════════════════
INÍCIO DO FLUXO
SE risco imediato à vida/integridade: acionar SAMU 192 / PM 190 / Bombeiros 193, proteger e registrar.
SE saúde mental com risco suicida, autolesão grave ou surto: manejo de crise + SAMU/UPA + CAPS IJ.
SE uso de substâncias: distinguir intoxicação aguda, uso problemático (CAPS AD/CT) e uso ocasional (PSE/UBS).
SE violências e proteção: priorizar segurança, escuta protegida, notificação obrigatória ao CT e rede.
SE pedagógico: investigar causa externa, busca ativa para evasão e plano pedagógico adaptado.
SE saúde física não emergencial: UBS/UPA conforme gravidade, com comunicação familiar e registro.
FIM DO ALGORITMO.`;

export const TRANSVERSAL_RULES = [
  {
    id: 'T1',
    title: 'Risco iminente',
    condition: 'vida_ou_integridade_em_risco_imediato = verdadeiro',
    action: 'Acionar SAMU 192 / PM 190 / Bombeiros 193 conforme natureza; vida primeiro, registro depois; sem aguardar autorização.'
  },
  {
    id: 'T2',
    title: 'Notificação obrigatória',
    condition: 'suspeita_violacao_direitos_crianca = verdadeiro',
    action: 'Notificar Conselho Tutelar em até 24h (imediato se grave); suspeita já obriga.'
  },
  {
    id: 'T3',
    title: 'Nunca mandar sozinho',
    condition: 'encaminhamento_externo = verdadeiro',
    action: 'Estudante sai acompanhado de adulto/responsável; menor de 18 anos com responsável informado.'
  },
  {
    id: 'T4',
    title: 'Registro restrito',
    condition: 'qualquer_situacao_protecao = verdadeiro',
    action: 'Registrar campos mínimos em ficha restrita de gestão.'
  },
  {
    id: 'T5',
    title: 'Em caso de dúvida',
    condition: 'duvida_sobre_gravidade = verdadeiro',
    action: 'Tratar como cenário mais grave e escalar para coordenação/direção.'
  }
] as const;

export const OPERATIONAL_RULES = [
  { ruleId: 'R01', category: 'emergencia_vida', condition: 'Aluno inconsciente/não responde', triageQuestions: ['Respira?', 'Tem pulso?'], risk: 'IMINENTE', immediateAction: 'Posição lateral; desobstruir via aérea; não mover se trauma', referral: 'SAMU 192', responsible: 'Qualquer adulto presente', deadline: 'Imediato' },
  { ruleId: 'R02', category: 'emergencia_vida', condition: 'Crise convulsiva em curso', triageQuestions: ['Quanto tempo?', 'Primeira vez?'], risk: 'IMINENTE', immediateAction: 'Proteger cabeça; não segurar; não colocar nada na boca; cronometrar', referral: 'SAMU 192 se >5min ou 1ª vez', responsible: 'Qualquer adulto', deadline: 'Imediato' },
  { ruleId: 'R03', category: 'emergencia_vida', condition: 'Parada respiratória/engasgo', triageQuestions: ['Consegue respirar?', 'Ficou cianótico?'], risk: 'IMINENTE', immediateAction: 'Heimlich se engasgo; RCP se sem pulso', referral: 'SAMU 192', responsible: 'Qualquer adulto', deadline: 'Imediato' },
  { ruleId: 'R04', category: 'emergencia_vida', condition: 'Sangramento grave', triageQuestions: ['Quantidade?', 'Consegue estancar?'], risk: 'IMINENTE', immediateAction: 'Compressão com pano limpo; não retirar', referral: 'SAMU 192', responsible: 'Qualquer adulto', deadline: 'Imediato' },
  { ruleId: 'R05', category: 'emergencia_vida', condition: 'Suspeita hipoglicemia grave', triageQuestions: ['Está consciente?', 'Tem glicosímetro?'], risk: 'IMINENTE', immediateAction: 'Açúcar apenas se consciente', referral: 'SAMU 192 se inconsciente / UPA se sem melhora', responsible: 'Qualquer adulto', deadline: 'Imediato' },
  { ruleId: 'R06', category: 'emergencia_vida', condition: 'Dificuldade respiratória intensa', triageQuestions: ['Tem bombinha?', 'Melhorou?'], risk: 'ALTA', immediateAction: 'Sentar, ambiente arejado, broncodilatador próprio', referral: 'SAMU se sem melhora 10min / UPA', responsible: 'Agente de organização / direção', deadline: '< 10 min' },
  { ruleId: 'R07', category: 'emergencia_vida', condition: 'Intoxicação/suspeita overdose', triageQuestions: ['O que consumiu?', 'Está consciente?'], risk: 'IMINENTE', immediateAction: 'Não induzir vômito; posição lateral se inconsciente', referral: 'SAMU 192', responsible: 'Qualquer adulto', deadline: 'Imediato' },
  { ruleId: 'R08', category: 'emergencia_vida', condition: 'Tentativa de suicídio em curso', triageQuestions: ['Método?', 'Tempo?'], risk: 'IMINENTE', immediateAction: 'Não deixar sozinho; remover meios letais', referral: 'SAMU 192 / UPA com acompanhante', responsible: 'Coordenação / Direção', deadline: 'Imediato' },
  { ruleId: 'R09', category: 'saude_mental', condition: 'Ideação suicida com plano/meios', triageQuestions: ['Tem plano?', 'Tem acesso?', 'Tentou antes?'], risk: 'IMINENTE', immediateAction: 'Vigilância contínua e retirada de objetos de risco', referral: 'SAMU/UPA + CAPS IJ pós estabilização', responsible: 'Coordenação / Direção', deadline: 'Imediato' },
  { ruleId: 'R10', category: 'saude_mental', condition: 'Ideação suicida sem plano', triageQuestions: ['Pensou em se machucar?', 'Já tentou?'], risk: 'ALTA', immediateAction: 'Escuta qualificada privada; não minimizar', referral: 'Família hoje + CAPS IJ na semana', responsible: 'Coordenação', deadline: 'Mesmo dia' },
  { ruleId: 'R11', category: 'saude_mental', condition: 'Autolesão leve visível', triageQuestions: ['Precisa curativo?', 'Intenção de morte?'], risk: 'ALTA', immediateAction: 'Acolhimento privado e primeiros socorros', referral: 'Família hoje + CAPS IJ até 5 dias', responsible: 'Coordenação', deadline: 'Mesmo dia' },
  { ruleId: 'R12', category: 'saude_mental', condition: 'Autolesão grave', triageQuestions: ['Sangramento importante?', 'Profundidade?'], risk: 'IMINENTE', immediateAction: 'Primeiros socorros e controle de sangramento', referral: 'SAMU/UPA + CAPS IJ após estabilização', responsible: 'Qualquer adulto + Coordenação', deadline: 'Imediato' },
  { ruleId: 'R13', category: 'saude_mental', condition: 'Surto/confusão mental aguda', triageQuestions: ['Há risco para si/outros?'], risk: 'IMINENTE', immediateAction: 'Afastar plateia e manter voz calma', referral: 'SAMU 192', responsible: 'Coordenação / Direção', deadline: 'Imediato' },
  { ruleId: 'R14', category: 'saude_mental', condition: 'Crise de ansiedade/pânico', triageQuestions: ['Primeira vez?', 'Melhora?'], risk: 'MÉDIO', immediateAction: 'Local calmo e respiração guiada', referral: 'UBS se recorrente; CAPS IJ se persistente grave', responsible: 'Professor / Coordenação', deadline: '< 30 min' },
  { ruleId: 'R15', category: 'saude_mental', condition: 'Sofrimento psíquico >3 semanas', triageQuestions: ['Sono?', 'Alimentação?', 'Prejuízo funcional?'], risk: 'MÉDIO', immediateAction: 'Escuta e adaptação leve', referral: 'UBS com carta; CAPS IJ se sem melhora em 30 dias', responsible: 'Coordenação', deadline: '< 1 semana' },
  { ruleId: 'R16', category: 'saude_mental', condition: 'Luto recente com prejuízo', triageQuestions: ['Há quanto tempo?', 'Frequenta?'], risk: 'MÉDIO', immediateAction: 'Escuta e acolhimento', referral: 'UBS; grupo de apoio; CAPS IJ se luto complicado', responsible: 'Professor referência / Coordenação', deadline: '< 1 semana' },
  { ruleId: 'R17', category: 'substancias', condition: 'Intoxicação aguda por substância', triageQuestions: ['Consciente?', 'Respira?'], risk: 'IMINENTE se inconsciente', immediateAction: 'Posição lateral; não forçar ingestão', referral: 'SAMU inconsciente / UPA alteração grave', responsible: 'Qualquer adulto + Direção', deadline: 'Imediato' },
  { ruleId: 'R18', category: 'substancias', condition: 'Uso problemático crônico', triageQuestions: ['Frequência?', 'Prejuízo escolar?', 'Vulnerabilidade?'], risk: 'ALTA', immediateAction: 'Conversa sigilosa não punitiva', referral: 'CAPS AD II; CRAS; CT se <18', responsible: 'Coordenação', deadline: '< 1 semana' },
  { ruleId: 'R19', category: 'substancias', condition: 'Uso ocasional/experimental', triageQuestions: ['Primeira vez?', 'Pressão de grupo?'], risk: 'MÉDIO', immediateAction: 'Ação educativa não punitiva', referral: 'PSE/UBS e prevenção', responsible: 'Professor / Coordenação', deadline: '< 2 semanas' },
  { ruleId: 'R20', category: 'substancias', condition: 'Suspeita de tráfico na escola', triageQuestions: ['Troca de dinheiro?', 'Intimidação?'], risk: 'ALTA-CRIME', immediateAction: 'Não confrontar sozinho; proteger vítimas', referral: 'PM 190 + DE Leste 1 + BO', responsible: 'Direção', deadline: 'Imediato' },
  { ruleId: 'R21', category: 'violencia_protecao', condition: 'Briga/agressão em curso', triageQuestions: ['Há arma?', 'Há lesão grave?'], risk: 'ALTA/IMINENTE', immediateAction: 'Separar com equipe e afastar plateia', referral: 'SAMU se grave; PM se crime/arma; CT se menor com lesão', responsible: 'Coordenação + Agentes', deadline: 'Imediato' },
  { ruleId: 'R22', category: 'violencia_protecao', condition: 'Ameaça verbal/digital específica', triageQuestions: ['Data/vítima definida?', 'Meios disponíveis?'], risk: 'ALTA', immediateAction: 'Preservar evidências e proteger vítima', referral: 'PM 190 + orientar BO + família vítima', responsible: 'Direção', deadline: 'Mesmo dia' },
  { ruleId: 'R23', category: 'violencia_protecao', condition: 'Ameaça genérica leve', triageQuestions: ['Reincidente?', 'Conflito prévio?'], risk: 'MÉDIO', immediateAction: 'Registrar e ouvir separadamente', referral: 'CT se reincidente + famílias', responsible: 'Coordenação', deadline: '< 3 dias' },
  { ruleId: 'R24', category: 'violencia_protecao', condition: 'Porte de objeto perigoso', triageQuestions: ['Houve ameaça?', 'Risco imediato?'], risk: 'ALTA', immediateAction: 'Solicitar entrega voluntária sem confronto', referral: 'PM se ameaça real/arma de fogo + BO + CT se menor', responsible: 'Direção', deadline: 'Imediato' },
  { ruleId: 'R25', category: 'violencia_protecao', condition: 'Porte de arma de fogo', triageQuestions: ['—'], risk: 'IMINENTE', immediateAction: 'Lockdown e não confrontar', referral: 'PM 190 + BO + DE Leste 1 + CT', responsible: 'Direção', deadline: 'Imediato' },
  { ruleId: 'R26', category: 'violencia_protecao', condition: 'Bullying persistente (>3 episódios)', triageQuestions: ['Há lesão psicológica/física?', 'Famílias acionadas?'], risk: 'ALTA', immediateAction: 'Mediação estruturada + ação coletiva sem expor vítima', referral: 'CT se sem resposta 15 dias; CAPS IJ se lesão grave', responsible: 'Coordenação', deadline: '< 1 semana' },
  { ruleId: 'R27', category: 'violencia_protecao', condition: 'Bullying episódico', triageQuestions: ['Primeira ocorrência?', 'Há lesão?'], risk: 'BAIXO-MÉDIO', immediateAction: 'Conversa separada e prática restaurativa', referral: 'Monitorar 15 dias; CT se reincidência', responsible: 'Professor / Coordenação', deadline: '< 3 dias' },
  { ruleId: 'R28', category: 'violencia_protecao', condition: 'Discriminação (racial/LGBTfobia/capacitismo)', triageQuestions: ['Padrão recorrente?', 'Lesão grave?'], risk: 'ALTA', immediateAction: 'Acolher vítima e responsabilizar autores', referral: 'CT se grave; Defensoria/MP se institucional', responsible: 'Coordenação / Direção', deadline: '< 3 dias' },
  { ruleId: 'R29', category: 'violencia_protecao', condition: 'Suspeita violência doméstica', triageQuestions: ['Sinais recentes?', 'Aluno seguro agora?'], risk: 'ALTA', immediateAction: 'Escuta protegida e registro literal', referral: 'CT hoje + UBS se lesão', responsible: 'Coordenação / Direção', deadline: 'Mesmo dia' },
  { ruleId: 'R30', category: 'violencia_protecao', condition: 'Suspeita abuso sexual', triageQuestions: ['<72h?', 'Há lesão?'], risk: 'ALTA', immediateAction: 'Escuta protegida mínima; não reinquirir', referral: 'CT hoje + UPA <72h + DE Leste 1', responsible: 'Direção', deadline: 'Imediato / Mesmo dia' },
  { ruleId: 'R31', category: 'violencia_protecao', condition: 'Abuso sexual >72h', triageQuestions: ['—'], risk: 'ALTA', immediateAction: 'Escuta protegida e registro restrito', referral: 'CT hoje + UBS + CAPS IJ', responsible: 'Coordenação / Direção', deadline: 'Mesmo dia' },
  { ruleId: 'R32', category: 'violencia_protecao', condition: 'Exploração sexual/pornografia infantil', triageQuestions: ['—'], risk: 'IMINENTE', immediateAction: 'Não confrontar explorador; proteger vítima', referral: 'CT imediato + Delegacia + CREAS + DE Leste 1', responsible: 'Direção', deadline: 'Imediato' },
  { ruleId: 'R33', category: 'violencia_protecao', condition: 'Violência/ameaça contra funcionário', triageQuestions: ['Há lesão?', 'Crime em curso?'], risk: 'ALTA/IMINENTE', immediateAction: 'Garantir segurança do profissional', referral: 'PM se crime + BO + CT se menor agressor + DE', responsible: 'Direção', deadline: 'Imediato' },
  { ruleId: 'R34', category: 'violencia_protecao', condition: 'Invasão/conflito armado externo', triageQuestions: ['—'], risk: 'IMINENTE', immediateAction: 'Lockdown completo', referral: 'PM 190 + famílias após cessação + DE', responsible: 'Direção', deadline: 'Imediato' },
  { ruleId: 'R35', category: 'pedagogico', condition: 'Baixo desempenho persistente', triageQuestions: ['Há causa externa?', 'Necessidade específica?'], risk: 'MÉDIO', immediateAction: 'Plano de apoio pedagógico', referral: 'AEE/UBS/DE conforme caso', responsible: 'Coordenação', deadline: '< 2 semanas' },
  { ruleId: 'R36', category: 'pedagogico', condition: 'Faltas >25% / risco evasão', triageQuestions: ['Família ciente?', 'Causa conhecida?'], risk: 'ALTA', immediateAction: 'Busca ativa e convite para retorno', referral: 'CRAS/CT/fluxo gravidez conforme causa', responsible: 'Coordenação', deadline: '< 3 dias após identificação' },
  { ruleId: 'R37', category: 'pedagogico', condition: 'Aluno sem contato >5 dias', triageQuestions: ['Família contatada?', 'Paradeiro conhecido?'], risk: 'ALTA', immediateAction: 'Busca ativa urgente por múltiplos meios', referral: 'CT se paradeiro desconhecido; CRAS se vulnerabilidade', responsible: 'Coordenação / Direção', deadline: 'Imediato após identificação' },
  { ruleId: 'R38', category: 'pedagogico', condition: 'Conflito professor-aluno persistente', triageQuestions: ['Tentativas prévias?', 'Histórico?'], risk: 'MÉDIO', immediateAction: 'Mediação com coordenação', referral: 'DE Leste 1 se não resolvido internamente', responsible: 'Coordenação', deadline: '< 1 semana' },
  { ruleId: 'R39', category: 'pedagogico', condition: 'Inclusão PcD com PEI inadequado/inexistente', triageQuestions: ['Tem PEI?', 'Está sendo aplicado?'], risk: 'MÉDIO', immediateAction: 'Revisão de PEI com AEE e professor', referral: 'CER/UBS; Defensoria/MP se exclusão/discriminação', responsible: 'Coordenação + Prof. AEE', deadline: '< 2 semanas' },
  { ruleId: 'R40', category: 'pedagogico', condition: 'Distorção idade-série >2 anos', triageQuestions: ['Histórico de reprovação?', 'Trabalha?', 'Tem filhos?'], risk: 'MÉDIO', immediateAction: 'Plano pedagógico diferenciado', referral: 'EJA >18; CRAS pobreza; CT trabalho infantil', responsible: 'Coordenação', deadline: '< 1 mês' },
  { ruleId: 'R41', category: 'saude_sexual_reprodutiva', condition: 'Gravidez sem violência', triageQuestions: ['Há apoio familiar?', 'Fez pré-natal?'], risk: 'MÉDIO', immediateAction: 'Acolhimento sem julgamento e permanência escolar', referral: 'UBS pré-natal + CRAS se vulnerabilidade', responsible: 'Coordenação', deadline: '< 1 semana' },
  { ruleId: 'R42', category: 'saude_sexual_reprodutiva', condition: 'Gravidez decorrente de violência sexual', triageQuestions: ['Quando ocorreu?', 'Está segura?'], risk: 'ALTA', immediateAction: 'Escuta protegida; não confrontar agressor', referral: 'CT imediato + UPA <72h + CREAS + MP se necessário', responsible: 'Direção', deadline: 'Imediato / Mesmo dia' },
  { ruleId: 'R43', category: 'saude_sexual_reprodutiva', condition: 'Relação sexual sem consentimento', triageQuestions: ['Ocorreu recentemente?', 'Há lesão?'], risk: 'ALTA', immediateAction: 'Escuta protegida; não reinquirir', referral: 'CT hoje + UPA <72h + fluxo abuso sexual', responsible: 'Coordenação / Direção', deadline: 'Mesmo dia' },
  { ruleId: 'R44', category: 'saude_sexual_reprodutiva', condition: 'Suspeita de IST', triageQuestions: ['Sintomas físicos?', 'Em tratamento?'], risk: 'MÉDIO', immediateAction: 'Conversa sigilosa e não punitiva', referral: 'UBS para testagem e prevenção', responsible: 'Coordenação', deadline: '< 1 semana' },
  { ruleId: 'R45', category: 'vulnerabilidade_familiar', condition: 'Fome recorrente / sem alimentação', triageQuestions: ['Recorrente?', 'Família no CRAS?'], risk: 'MÉDIO', immediateAction: 'Acionar merenda e contatar família', referral: 'CRAS; CT se negligência grave', responsible: 'Direção / Coordenação', deadline: 'Mesmo dia' },
  { ruleId: 'R46', category: 'vulnerabilidade_familiar', condition: 'Negligência grave', triageQuestions: ['Quem cuida?', 'Padrão crônico?'], risk: 'ALTA', immediateAction: 'Escuta cuidadosa e registro restrito', referral: 'CT hoje; CRAS/CREAS conforme gravidade', responsible: 'Coordenação / Direção', deadline: 'Mesmo dia' },
  { ruleId: 'R47', category: 'vulnerabilidade_familiar', condition: 'Conflito familiar intenso sem violência', triageQuestions: ['Aluno está seguro?', 'Há risco de violência?'], risk: 'MÉDIO', immediateAction: 'Escuta e acolhimento com adaptação pedagógica', referral: 'CRAS e psicologia UBS', responsible: 'Coordenação', deadline: '< 1 semana' },
  { ruleId: 'R48', category: 'vulnerabilidade_familiar', condition: 'Trabalho infantil', triageQuestions: ['Quantas horas?', 'Quem sabe?', 'Remunerado?'], risk: 'ALTA', immediateAction: 'Registro e conversa sigilosa', referral: 'CT + CRAS', responsible: 'Coordenação / Direção', deadline: '< 3 dias' }
] as const;

export const QUICK_REFERRAL_TABLE = [
  { service: 'SAMU 192', whenToCall: 'Risco imediato de vida, inconsciência, parada respiratória, tentativa de suicídio em curso', contact: '192 (24h)', avoidFor: 'Situações que podem aguardar consulta' },
  { service: 'PM 190', whenToCall: 'Crime em flagrante, arma, invasão, ameaça de morte concreta', contact: '190 (24h)', avoidFor: 'Indisciplina e conflito verbal sem risco' },
  { service: 'Bombeiros 193', whenToCall: 'Incêndio, múltiplos feridos, resgate', contact: '193 (24h)', avoidFor: '—' },
  { service: 'UPA Ermelino', whenToCall: 'Urgências sem risco imediato de morte e abuso sexual <72h', contact: '(11) 2574-3258 · R. Miguel Novais, 113', avoidFor: 'Consultas de rotina' },
  { service: 'CAPS IJ II', whenToCall: 'Sofrimento psíquico grave em <18 anos', contact: '(11) 3294-3828 · R. Antônio Bonici, 18', avoidFor: 'Sofrimento leve sem comprometimento (UBS)' },
  { service: 'CAPS AD II', whenToCall: 'Uso problemático/dependência de substâncias', contact: '(11) 3294-3828', avoidFor: 'Experimentação ocasional (UBS/PSE)' },
  { service: 'UBS Ermelino', whenToCall: 'Sofrimento leve/moderado, gravidez, IST, doenças crônicas, PSE', contact: '(11) 2545-8235 · R. Antônio de Freitas Toledo, 185', avoidFor: 'Urgências (UPA/SAMU)' },
  { service: 'Conselho Tutelar', whenToCall: 'Suspeita/confirmação de violação de direitos de criança/adolescente', contact: '156', avoidFor: 'Situações sem criança/adolescente' },
  { service: 'CRAS', whenToCall: 'Vulnerabilidade social sem violação grave', contact: '(11) 2545-3211 · Av. Paranaguá, 1492', avoidFor: 'Violação grave (CREAS + CT)' },
  { service: 'CREAS', whenToCall: 'Violência, negligência grave, exploração e violação severa', contact: 'Validar endereço/contato local', avoidFor: 'Vulnerabilidade sem violação (CRAS)' },
  { service: 'Delegacia 62ª DP', whenToCall: 'Registro de BO pós-crime', contact: 'R. Ruy Pirozzelli, 250', avoidFor: 'Substituir CT em casos com menores' },
  { service: 'DE Leste 1', whenToCall: 'Conflitos institucionais graves e suporte normativo', contact: 'R. Dr. João Arruda, 271', avoidFor: 'Demandas resolvíveis internamente' },
  { service: 'Defensoria Pública', whenToCall: 'Recusa de matrícula, exclusão ilegal, violação com necessidade jurídica', contact: 'Núcleo de 1ª Instância Leste', avoidFor: '—' }
] as const;

export const CASE_RECORD_MIN_FIELDS = [
  { field: 'caseId', description: 'ID do caso', required: 'automatico' },
  { field: 'createdAt', description: 'Data e hora da observação/relato', required: 'obrigatorio' },
  { field: 'reportedBy', description: 'Nome e função de quem registrou', required: 'obrigatorio' },
  { field: 'location', description: 'Local do ocorrido', required: 'obrigatorio' },
  { field: 'involvedCodes', description: 'Código/iniciais dos envolvidos (sem nome completo em campo aberto)', required: 'obrigatorio' },
  { field: 'situationType', description: 'Código do ramo (R01-R48) + categoria', required: 'obrigatorio' },
  { field: 'objectiveReport', description: 'Relato objetivo sem julgamento', required: 'obrigatorio' },
  { field: 'identifiedSigns', description: 'Sinais físicos/comportamentais/relacionais', required: 'recomendado' },
  { field: 'actionsTaken', description: 'Ações internas executadas', required: 'obrigatorio' },
  { field: 'referrals', description: 'Serviço + data + responsável + forma', required: 'obrigatorio_se_houver' },
  { field: 'notifiedParties', description: 'Família, CT, CRAS, CAPS etc.', required: 'obrigatorio_se_houver' },
  { field: 'nextReviewAt', description: 'Data de reavaliação', required: 'obrigatorio' },
  { field: 'status', description: 'Encerrado / Em acompanhamento / Aguardando resposta externa', required: 'obrigatorio' },
  { field: 'counterReferral', description: 'Retorno do serviço externo', required: 'recomendado' },
  { field: 'attachments', description: 'Anexos restritos (prints, laudos, ofícios)', required: 'opcional' }
] as const;

export const CASE_STATUS_ALERT_POLICY = {
  staleDaysBusiness: 5,
  trigger: 'status sem atualização por mais de 5 dias úteis',
  action: 'disparar alerta automático ao responsável do caso'
} as const;

export const DO_NOT_DO_ALERTS = [
  { dont: 'Expor o caso publicamente', do: 'Tratar em espaço privado com mínimo de pessoas' },
  { dont: 'Interrogar repetidamente vítima de violência', do: 'Escuta protegida mínima e registro literal' },
  { dont: 'Prometer sigilo absoluto', do: 'Informar necessidade de acionar rede de proteção' },
  { dont: 'Culpabilizar a vítima', do: 'Acolher sem julgamento e priorizar proteção' },
  { dont: 'Mandar aluno sozinho ao serviço externo', do: 'Garantir acompanhante adulto/responsável' },
  { dont: 'Confrontar suspeito agressor antes do CT', do: 'Proteger vítima e acionar CT' },
  { dont: 'Chamar polícia para indisciplina sem risco', do: 'Mediação e medidas pedagógicas' },
  { dont: 'Minimizar autolesão', do: 'Tratar como sinal de sofrimento e acionar fluxo' },
  { dont: 'Esperar certeza para notificar CT', do: 'Notificar já na suspeita (ECA art. 13)' },
  { dont: 'Tentar resolver sozinho risco iminente', do: 'Acionar SAMU/PM e demais adultos imediatamente' }
] as const;
