import { Contato, DocumentTemplate, FlowNode, Fluxo, ProtocolData, Recurso, Service } from '../types';

const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'anexo-i-registro',
    title: 'Anexo I — Registro Inicial de Ocorrência',
    annex: 'Anexo I',
    purpose: 'Documentar fatos observados e encaminhamentos imediatos com linguagem objetiva.',
    requiredFields: ['Data/hora', 'Local', 'Envolvidos', 'Descrição factual', 'Ações realizadas'],
    confidentialityLevel: 'RESTRITO'
  },
  {
    id: 'anexo-ii-encaminhamento',
    title: 'Anexo II — Encaminhamento para Rede',
    annex: 'Anexo II',
    purpose: 'Formalizar envio para serviço externo e registrar retorno esperado.',
    requiredFields: ['Serviço acionado', 'Responsável pelo contato', 'Protocolo/número', 'Prazo de retorno'],
    confidentialityLevel: 'SIGILOSO'
  }
];

const decisionTree: FlowNode[] = [
  {
    id: 'root',
    question: 'Qual situação descreve melhor o caso atual?',
    fallbackNextNodeId: 'leaf_duvida_padrao',
    indicators: ['Risco imediato', 'Evento em andamento', 'Violência contra criança/adolescente'],
    options: [
      { label: 'Emergência imediata', nextNodeId: 'EMERGENCIA_IMEDIATA' },
      { label: 'Arma na escola', nextNodeId: 'ARMA_ESCOLA' },
      { label: 'Tiros na região', nextNodeId: 'TIROTEIO_EXTERNO' },
      { label: 'Risco de suicídio', nextNodeId: 'RISCO_SUICIDIO' },
      { label: 'Autolesão', nextNodeId: 'AUTOLESAO' },
      { label: 'Violência doméstica', nextNodeId: 'VIOLENCIA_DOMESTICA' },
      { label: 'Abuso sexual', nextNodeId: 'ABUSO_SEXUAL' },
      { label: 'Surto mental', nextNodeId: 'SURTO_MENTAL' },
      { label: 'Briga com lesão', nextNodeId: 'BRIGA_COM_LESAO' },
      { label: 'Sofrimento psíquico', nextNodeId: 'SOFRIMENTO_PSIQUICO' },
      { label: 'Uso de substâncias', nextNodeId: 'USO_SUBSTANCIAS' },
      { label: 'Gravidez na adolescência', nextNodeId: 'GRAVIDEZ_ADOLESCENCIA' },
      { label: 'Evasão escolar', nextNodeId: 'EVASAO_RISCO' },
      { label: 'Bullying', nextNodeId: 'BULLYING' },
      { label: 'Discriminação', nextNodeId: 'DISCRIMINACAO' },
      { label: 'Dificuldade pedagógica', nextNodeId: 'DIFICULDADE_PEDAGOGICA' },
      { label: 'Inclusão PcD', nextNodeId: 'INCLUSAO_PCD' },
      { label: 'Conflito interpessoal', nextNodeId: 'CONFLITO_INTERPESSOAL' },
      { label: 'Saúde física leve', nextNodeId: 'SAUDE_FISICA_LEVE' },
      { label: 'Não sei / dúvida', nextNodeId: 'leaf_duvida_padrao' }
    ]
  },

  {
    id: 'n_mental_triagem',
    question: 'Triagem rápida de saúde mental',
    options: [{ label: 'Seguir para sofrimento psíquico', nextNodeId: 'SOFRIMENTO_PSIQUICO' }],
    indicators: ['Tristeza persistente', 'Isolamento', 'Alteração abrupta de comportamento']
  },
  {
    id: 'n_fisico_triagem',
    question: 'Triagem rápida de saúde física',
    options: [{ label: 'Seguir para saúde física leve', nextNodeId: 'SAUDE_FISICA_LEVE' }],
    indicators: ['Febre', 'Dor persistente', 'Mal-estar sem risco imediato']
  },
  {
    id: 'EMERGENCIA_IMEDIATA',
    question: 'Situação de risco IMEDIATO de vida ou lesão grave em curso',
    isLeaf: true,
    options: [],
    riskLevel: 'EMERGENCIAL',
    doNow: [
      'Garantir segurança: afastar, não confrontar, não mover se trauma',
      'SAMU 192 (lesão/inconsciente) | PM 190 (arma/invasão) | Bombeiros 193 (incêndio)',
      'Localização: EE Ermelino Matarazzo, Jardim Belém, Zona Leste SP',
      'Acionar Direção imediatamente',
      'Não deixar o aluno sozinho',
      'Registrar: hora, sequência, providências'
    ],
    forbiddenActions: ['Intervir fisicamente sozinho', 'Deixar o local sem acionar emergência'],
    contactTargets: ['EMERGENCIA_192_193'],
    deadline: 'AGORA — minutos',
    recordRequired: [{ system: 'CONVIVA', due: '2h', notes: 'Registro imediato de crise crítica.' }]
  },
  {
    id: 'ARMA_ESCOLA',
    question: 'Aluno com objeto perigoso ou arma',
    isLeaf: true,
    options: [],
    riskLevel: 'EMERGENCIAL',
    doNow: [
      'NÃO abordar sozinho, NÃO tentar tomar o objeto',
      'PM 190 imediatamente — porte de arma de fogo é crime',
      'Afastar outros alunos discretamente',
      'Comunicar Direção'
    ],
    forbiddenActions: ['Abordar sozinho', 'Tentar tomar o objeto'],
    contactTargets: ['EMERGENCIA_192_193', 'GESTAO_ESCOLAR'],
    recordRequired: [{ system: 'CONVIVA', due: '2h', notes: 'Sigilo reforçado e cadeia de comunicação.' }]
  },
  {
    id: 'TIROTEIO_EXTERNO',
    question: 'Tiros ouvidos / conflito armado externo',
    isLeaf: true,
    options: [],
    riskLevel: 'EMERGENCIAL',
    doNow: [
      'PM 190 IMEDIATAMENTE',
      'Protocolo de lockdown: trancar salas, afastar de janelas e muros',
      'NINGUÉM SAI até autorização da PM',
      "Comunicar famílias: 'Todos estão bem, aguardando normalização'",
      'Após: registro + apoio psicossocial à equipe e alunos'
    ],
    contactTargets: ['EMERGENCIA_192_193', 'GESTAO_ESCOLAR'],
    recordRequired: [{ system: 'CONVIVA', due: '2h', notes: 'Notificar gestão e incidente coletivo.' }]
  },
  {
    id: 'RISCO_SUICIDIO',
    question: 'Aluno disse querer se matar ou morrer, distribuiu pertences, escreveu despedida',
    isLeaf: true,
    options: [],
    riskLevel: 'ALTO',
    guidance: [
      'NÃO DEIXAR O ALUNO SOZINHO EM NENHUM MOMENTO',
      'Retirar para espaço seguro, retirar objetos de risco',
      'Acionar Direção AGORA',
      "Perguntar diretamente: 'Você tem um plano de como faria isso?'",
      'Se tiver plano definido: SAMU 192 imediatamente',
      'Se sem plano: contatar família HOJE, encaminhar CAPS IJ II',
      'Não prometer guardar segredo',
      'Não deixar sair da escola sozinho'
    ],
    forbiddenActions: ['Minimizar (\'é fase\', \'quer atenção\')', 'Prometer sigilo', 'Deixar ir embora sozinho', 'Contar para a turma'],
    contactTargets: ['CAPS_IJ', 'EMERGENCIA_192_193', 'CONSELHO_TUTELAR'],
    deadline: 'HOJE — horas',
    recordRequired: [{ system: 'CONVIVA', due: '24h', notes: 'Ficha restrita, acesso limitado à gestão' }]
  },
  {
    id: 'AUTOLESAO',
    question: 'Marcas de cortes, queimaduras ou relato de se machucar propositalmente',
    isLeaf: true,
    options: [],
    riskLevel: 'ALTO',
    guidance: [
      'Autolesão NEM SEMPRE indica intenção de morrer — é estratégia de enfrentamento',
      "Convidar com calma: 'Percebi algumas marcas. Você pode me contar como se sente?'",
      'Verificar se há intenção de morrer → se sim, goto RISCO_SUICIDIO',
      'Verificar se lesões precisam de cuidado médico agora → se sim, UPA',
      'Comunicar família HOJE',
      'Encaminhar CAPS IJ II com carta urgente',
      'NÃO enviar o aluno sozinho para casa'
    ],
    forbiddenActions: ['Pedir que mostre ferimentos para outros', 'Expor publicamente', 'Enviar sozinho para casa', 'Punir ou envergonhar'],
    contactTargets: ['CAPS_IJ', 'UPA_HOSPITAL'],
    deadline: 'HOJE',
    recordRequired: [{ system: 'CONVIVA', due: '24h', notes: 'Ficha restrita' }]
  },
  {
    id: 'VIOLENCIA_DOMESTICA',
    question: 'Hematomas inexplicáveis, marcas, ou relato de violência em casa',
    isLeaf: true,
    options: [],
    riskLevel: 'ALTO',
    guidance: [
      'NOTIFICAÇÃO OBRIGATÓRIA — Lei 13.431/2017 + ECA art. 13',
      'Qualquer SUSPEITA já obriga notificação — não é preciso ter certeza',
      'Escuta protegida: perguntas abertas, anotar as palavras EXATAS da criança',
      "NÃO: 'Seu pai te bateu?' — SIM: 'Como você está? Quer me contar?'",
      'Notificar Conselho Tutelar HOJE via 156 ou presencialmente',
      'NÃO comunicar o agressor suspeito antes de combinar com o CT',
      'Se lesão visível: UBS ou UPA para registro médico'
    ],
    forbiddenActions: ['Comunicar o agressor suspeito antes do CT', 'Confrontar a família', 'Prometer sigilo à vítima', 'Investigar sozinho sem acionar o CT'],
    contactTargets: ['CONSELHO_TUTELAR', 'UBS'],
    deadline: 'HOJE',
    recordRequired: [{ system: 'CONVIVA', due: '24h', notes: 'Ficha restrita, anonimato da equipe notificante' }]
  },
  {
    id: 'ABUSO_SEXUAL',
    question: 'Relato ou suspeita de abuso ou exploração sexual',
    isLeaf: true,
    options: [],
    riskLevel: 'ALTO',
    guidance: [
      'MÁXIMA PRIORIDADE — Notificação imediata',
      'NÃO reinquirir, NÃO pedir detalhes, NÃO buscar provas físicas',
      'Escuta protegida única — depoimento especial é papel do sistema de justiça',
      'CT + UBS/UPA imediatamente',
      'SE abuso nas últimas 72h: UPA IMEDIATAMENTE (profilaxia HIV, IST, gravidez)',
      'NÃO comunicar agressor ou família do agressor antes do CT'
    ],
    forbiddenActions: ['Reinquirir ou pedir detalhes', 'Confrontar o suposto agressor', 'Comunicar família do agressor antes do CT', 'Minimizar o relato'],
    contactTargets: ['CONSELHO_TUTELAR', 'UPA_HOSPITAL', 'UBS'],
    deadline: 'HOJE — ou AGORA se nas últimas 72h',
    recordRequired: [{ system: 'CONVIVA', due: '2h', notes: 'Sigiloso' }]
  },
  {
    id: 'SURTO_MENTAL',
    question: 'Comportamento muito desorganizado, fala desconectada da realidade, agitação intensa',
    isLeaf: true,
    options: [],
    riskLevel: 'ALTO',
    guidance: [
      'NÃO confrontar, NÃO gritar, NÃO conter fisicamente sem necessidade',
      'Afastar demais alunos com calma',
      "Falar devagar, voz baixa: 'Estou aqui. Você está seguro.'",
      'SAMU 192 — surto psicótico requer avaliação médica',
      '1 adulto fica ao lado com calma enquanto aguarda'
    ],
    contactTargets: ['EMERGENCIA_192_193', 'CAPS_IJ'],
    recordRequired: [{ system: 'CONVIVA', due: '24h', notes: 'Registro clínico-escolar essencial.' }]
  },
  {
    id: 'BRIGA_COM_LESAO',
    question: 'Briga física com lesão visível ou arma',
    isLeaf: true,
    options: [],
    riskLevel: 'ALTO',
    guidance: [
      'NUNCA se interpor fisicamente sozinho — chamar outros adultos',
      'Dispersar plateia imediatamente',
      'Primeiros socorros se lesão leve',
      'SAMU se lesão grave',
      'PM se houver arma',
      'Ouvir as partes SEPARADAMENTE depois'
    ],
    forbiddenActions: ['Interpor fisicamente sozinho', 'Chamar polícia para briga sem lesão grave', 'Tomar partido publicamente'],
    contactTargets: ['EMERGENCIA_192_193', 'GESTAO_ESCOLAR'],
    recordRequired: [{ system: 'CONVIVA', due: '24h', notes: 'Com participação da gestão.' }]
  },
  {
    id: 'SOFRIMENTO_PSIQUICO',
    question: 'Aluno muito triste, ansioso, retraído, choro frequente por semanas',
    isLeaf: true,
    options: [],
    riskLevel: 'MÉDIO',
    guidance: [
      'Verificar se há autolesão ou ideação suicida → se sim, escalar',
      'Escuta empática reservada',
      'Adaptações pedagógicas temporárias',
      'Encaminhar UBS com carta de referência',
      'Se 2+ semanas sem melhora: CAPS IJ II',
      'Monitoramento quinzenal'
    ],
    forbiddenActions: ['Ignorar como \'adolescência\'', 'Pressionar para \'reagir\'', 'Expor na turma'],
    contactTargets: ['UBS', 'CAPS_IJ', 'CRAS'],
    deadline: '3-5 dias úteis'
  },
  {
    id: 'USO_SUBSTANCIAS',
    question: 'Sinais de uso de substância ou aluno flagrado usando',
    isLeaf: true,
    options: [],
    riskLevel: 'MÉDIO',
    guidance: [
      'Se comprometimento grave de consciência: SAMU 192 imediatamente',
      'Se cooperativo: retirar com discrição, espaço reservado, escuta sem punição',
      'NÃO chamar polícia apenas por uso — uso é questão de saúde',
      'Se suspeita de tráfico: isso é crime — BO + Direção',
      'Comunicar família + encaminhar CAPS AD'
    ],
    forbiddenActions: ['Chamar polícia só por uso de substância', 'Expor publicamente', 'Punir sem acolher'],
    contactTargets: ['CAPS_ADULTO', 'UBS', 'CONSELHO_TUTELAR'],
    deadline: 'Hoje'
  },
  {
    id: 'GRAVIDEZ_ADOLESCENCIA',
    question: 'Aluna grávida ou suspeita de gravidez',
    isLeaf: true,
    options: [],
    riskLevel: 'MÉDIO',
    guidance: [
      'Se gravidez por violência sexual: escalar para ABUSO_SEXUAL',
      'Acolhimento sigiloso, sem julgamento',
      'Garantir permanência na escola — ECA + LDB garantem o direito',
      'Encaminhar UBS para pré-natal imediatamente',
      'Comunicar família COM CONSENTIMENTO da aluna',
      'Adaptações pedagógicas imediatas',
      'CRAS se vulnerabilidade socioeconômica'
    ],
    forbiddenActions: ['Expor, transferir ou constranger a aluna', 'Comunicar família sem consentimento da aluna primeiro'],
    contactTargets: ['UBS', 'CRAS'],
    deadline: 'Semana atual'
  },
  {
    id: 'EVASAO_RISCO',
    question: 'Aluno com 25%+ de faltas ou sumiu sem justificativa',
    isLeaf: true,
    options: [],
    riskLevel: 'MÉDIO',
    guidance: [
      'Contato imediato com família (telefone, bilhete, visita)',
      'Se suspeita de trabalho infantil, violência ou conflito grave: CT obrigatório (ECA art. 56)',
      'Verificar se sofre bullying na escola',
      'Plano de retorno + adaptações se necessário'
    ],
    contactTargets: ['CONSELHO_TUTELAR', 'CRAS'],
    deadline: '24-48h para primeiro contato'
  },
  {
    id: 'BULLYING',
    question: 'Exclusão sistemática, apelidos, ameaças repetidas, humilhação',
    isLeaf: true,
    options: [],
    riskLevel: 'MÉDIO',
    guidance: [
      'Ouvir vítima em espaço privado primeiro',
      'NÃO chamar agressor imediatamente',
      'Registrar data, hora, o que aconteceu, impacto',
      'Comunicar Coordenação e famílias hoje',
      'Plano: conversa com agressor + turma (sem expor vítima)',
      'Cyberbullying: preservar prints, orientar família sobre BO se crime'
    ],
    forbiddenActions: ['Minimizar como \'brincadeira\'', 'Expor a vítima na frente da turma', 'Confrontar agressor sem preparo'],
    contactTargets: ['GESTAO_ESCOLAR', 'CONSELHO_TUTELAR'],
    deadline: 'Hoje + monitoramento 30 dias'
  },
  {
    id: 'DISCRIMINACAO',
    question: 'Racismo, LGBTfobia, capacitismo ou assédio',
    isLeaf: true,
    options: [],
    riskLevel: 'MÉDIO',
    guidance: [
      'Acolher vítima imediatamente em espaço reservado',
      'Registrar com precisão (data, hora, o que foi dito/feito, testemunhas)',
      'Comunicar Direção — tratamento institucional obrigatório',
      'Ação pedagógica na turma sobre direitos (sem expor vítima)',
      'Racismo é crime inafiançável (Lei 7.716/89)',
      'Se reincidente: CT + DE Leste 1 + Defensoria'
    ],
    contactTargets: ['GESTAO_ESCOLAR', 'CONSELHO_TUTELAR'],
    deadline: 'Hoje'
  },
  {
    id: 'DIFICULDADE_PEDAGOGICA',
    question: 'Aluno não acompanha, reprova repetidamente, defasagem crônica',
    isLeaf: true,
    options: [],
    riskLevel: 'MÉDIO',
    guidance: [
      'Verificar se surgiu recentemente (possível causa situacional)',
      'Verificar se há diagnóstico de deficiência ou transtorno → PEI/AEE',
      'Verificar outros sinais (saúde, faltas, bullying) antes de concluir',
      'Plano de apoio pedagógico + reforço + coordenação',
      'Se suspeita de TDAH, dislexia, déficit sensorial: encaminhar UBS'
    ],
    forbiddenActions: ['Tratar como preguiça sem investigar', 'Punir com reprovação como única resposta'],
    contactTargets: ['UBS', 'GESTAO_ESCOLAR'],
    deadline: 'Semana atual + reavaliação 30 dias'
  },
  {
    id: 'INCLUSAO_PCD',
    question: 'Aluno com deficiência sem atendimento adequado ou excluído',
    isLeaf: true,
    options: [],
    riskLevel: 'MÉDIO',
    guidance: [
      'Verificar se há PEI ativo — se não: elaborar imediatamente',
      'Verificar barreiras físicas, comunicacionais e pedagógicas',
      'Revisar AEE e ensino colaborativo',
      'Se discriminação: goto DISCRIMINACAO',
      'Se família precisa de suporte: CRAS + UBS (encaminha ao CER)'
    ],
    forbiddenActions: ['Recusar matrícula ou segregar', 'Ignorar barreiras atitudinais'],
    contactTargets: ['GESTAO_ESCOLAR', 'CRAS', 'UBS']
  },
  {
    id: 'CONFLITO_INTERPESSOAL',
    question: 'Desentendimento entre alunos ou professor-aluno sem gravidade física',
    isLeaf: true,
    options: [],
    riskLevel: 'BAIXO',
    guidance: [
      'Separar as partes, não resolver em público',
      'Ouvir cada parte separadamente',
      'Mediação pela Coordenação Pedagógica',
      'Práticas restaurativas se disponíveis',
      'Comunicar famílias se persistir'
    ],
    forbiddenActions: ['Forçar reconciliação imediata', 'Expor publicamente'],
    contactTargets: ['GESTAO_ESCOLAR']
  },
  {
    id: 'SAUDE_FISICA_LEVE',
    question: 'Mal-estar, febre, vômito, dor — sem risco imediato',
    isLeaf: true,
    options: [],
    riskLevel: 'BAIXO',
    guidance: [
      'Manter em local arejado e confortável',
      'Comunicar família para buscar o aluno',
      'NÃO medicar sem prescrição e autorização dos responsáveis',
      'Febre > 40°C com confusão ou convulsão: SAMU 192',
      'Crise de asma grave sem resposta à bombinha: SAMU 192'
    ],
    contactTargets: ['UBS']
  },
  { id: 'leaf_duvida_padrao', question: 'Em caso de dúvida, escale para gestão.', options: [], isLeaf: true, riskLevel: 'MÉDIO', guidance: ['Acionar coordenação e direção para avaliação conjunta.'], contactTargets: ['GESTAO_ESCOLAR'] }
];

const services: Service[] = [
  {
    id: 'UBS_ERMELINO',
    name: 'UBS Ermelino Matarazzo',
    category: 'SAÚDE',
    type: 'APOIO_SOCIAL',
    networkType: 'saude',
    address: 'Rua Antônio de Freitas Toledo, 185 — Jardim Belém',
    phone: '(11) 2545-8235',
    hours: 'Segunda a Sexta, 7h–19h',
    description: 'Atenção básica, pré-natal, PSE, avaliação para PcD, IST, encaminhamentos especializados',
    notes: 'Não atende urgências. Para urgências: UPA ou SAMU.',
    coordinates: { lat: -23.5256, lng: -46.4742 }
  },
  {
    id: 'CAPS_IJ',
    name: 'CAPS Infantojuvenil II Ermelino Matarazzo',
    category: 'SAÚDE',
    type: 'SAUDE',
    networkType: 'saude',
    address: 'Rua Ahmad El Hind, 107 — Jardim Matarazzo',
    phone: '(11) 3294-3828',
    hours: 'Segunda a Sexta, 7h–19h',
    description: 'Saúde mental especializada para crianças e adolescentes. Autolesão, risco de suicídio, surto, dependência química em jovens.',
    notes: 'Para urgências agudas: UPA/SAMU primeiro, depois encaminhar ao CAPS.',
    coordinates: { lat: -23.5148, lng: -46.4689 }
  },
  {
    id: 'CAPS_AD',
    name: 'CAPS AD II Ermelino Matarazzo',
    category: 'SAÚDE',
    type: 'SAUDE',
    networkType: 'saude',
    address: 'Subprefeitura Ermelino Matarazzo — verificar endereço atual via 156',
    phone: '156',
    hours: 'Segunda a Sexta, horário comercial',
    description: 'Uso problemático de álcool e drogas. Adolescentes 16+ e adultos.'
  },
  {
    id: 'UPA_ERMELINO',
    name: 'UPA Ermelino Matarazzo',
    category: 'EMERGÊNCIA',
    type: 'EMERGENCIAL',
    networkType: 'emergencia',
    address: 'Rua Miguel Novais, 113 — Vila Paranaguá',
    phone: '(11) 2574-3258',
    hours: '24 horas, 7 dias',
    description: 'Urgências, abuso sexual recente (até 72h — profilaxia), crises psiquiátricas moderadas.',
    coordinates: { lat: -23.5094, lng: -46.4755 }
  },
  {
    id: 'SAMU',
    name: 'SAMU 192',
    category: 'EMERGÊNCIA',
    type: 'EMERGENCIAL',
    networkType: 'emergencia',
    address: 'Atendimento móvel',
    phone: '192',
    hours: '24 horas',
    description: 'Risco imediato de vida: tentativa de suicídio, convulsão, inconsciência, intoxicação grave, agressão física grave.',
    howToCall: "Dizer: 'EE Ermelino Matarazzo, Jardim Belém, Zona Leste. [Descreva a situação]'"
  },
  {
    id: 'CRAS_ERMELINO',
    name: 'CRAS Ermelino Matarazzo',
    category: 'SOCIAL',
    type: 'APOIO_SOCIAL',
    networkType: 'social',
    address: 'Avenida Paranaguá, 1492 — Ermelino Matarazzo',
    phone: '(11) 2545-3211',
    hours: 'Segunda a Sexta, 8h–17h',
    description: 'Proteção básica: CadÚnico, Bolsa Família, BPC, SCFV, orientação social. Para famílias em vulnerabilidade sem violação grave.',
    notes: 'NÃO atende violação grave de direitos — para isso: CREAS'
  },
  {
    id: 'CREAS',
    name: 'CREAS — Proteção Especial',
    category: 'SOCIAL',
    type: 'PROTECAO',
    networkType: 'social',
    address: 'Verificar via 156 ou Subprefeitura Ermelino Matarazzo',
    phone: '156',
    description: 'Violência intrafamiliar, negligência grave, trabalho infantil, exploração sexual, situação de rua.'
  },
  {
    id: 'CONSELHO_TUTELAR',
    name: 'Conselho Tutelar Ermelino Matarazzo',
    category: 'DIREITOS_SGD',
    type: 'PROTECAO',
    networkType: 'direitos',
    address: 'Avenida Milene Elias — Ermelino Matarazzo',
    phone: '156',
    hours: 'Plantão 24h para urgências; horário comercial para demandas gerais',
    description: 'Zelar pelos direitos de crianças e adolescentes. Notificação obrigatória em qualquer suspeita de violência ou negligência.',
    notes: 'A escola não precisa esgotar tentativas internas antes de notificar em casos graves. Notificação é dever legal.'
  },
  {
    id: 'PM_190',
    name: 'Polícia Militar — 190',
    category: 'EMERGÊNCIA',
    type: 'EMERGENCIAL',
    networkType: 'emergencia',
    address: 'Atendimento territorial',
    phone: '190',
    hours: '24 horas',
    description: 'Arma de fogo, invasão armada, conflito armado externo, ameaça de morte iminente, agressão física grave em curso.',
    notes: 'NÃO acionar para: indisciplina, uso de substância, brigas sem lesão grave.'
  },
  {
    id: 'GESTAO_ESCOLAR',
    name: 'Gestão Escolar — EE Ermelino Matarazzo',
    category: 'EDUCAÇÃO',
    type: 'GESTAO',
    networkType: 'educacao',
    address: 'Rua Abel Tavares s/n — Jardim Belém',
    phone: '(11) 0000-0000',
    hours: 'Segunda a Sexta, horário escolar',
    description: 'Direção e coordenação para gestão de crise, proteção e documentação interna.'
  }
];

export const PROTOCOL_DATA: ProtocolData = {
  institution: {
    name: 'EE Ermelino Matarazzo',
    cie: '000000',
    diretoriaEnsino: 'Diretoria de Ensino Leste 1'
  },
  metadata: {
    protocolVersion: '2026.02',
    effectiveDate: '2026-02-01',
    lastReviewedAt: '2026-02-19',
    reviewedBy: 'Comissão de Proteção Escolar'
  },
  decisionTree,
  services,
  documentTemplates: DOCUMENT_TEMPLATES,
  instruments: {
    anexoI: { requiredFields: DOCUMENT_TEMPLATES[0].requiredFields },
    anexoII: { requiredFields: DOCUMENT_TEMPLATES[1].requiredFields }
  }
};

export const CONTATOS: Contato[] = PROTOCOL_DATA.services.map((service) => ({
  id: service.id,
  categoria:
    service.networkType === 'saude'
      ? 'saude'
      : service.networkType === 'social'
        ? 'assistencia'
        : service.networkType === 'direitos'
          ? 'protecao'
          : service.networkType === 'educacao'
            ? 'educacao'
            : 'emergencia',
  nome: service.name,
  telefone: service.phone,
  endereco: service.address,
  horario: service.hours
}));

const flowMap: Record<string, { codigo: string; titulo: string; descricao: string; risco: 'baixo' | 'moderado' | 'alto' | 'urgencia'; icon: string; nodeIds: string[]; contatosUteis: string[] }> = {
  pedagógico: {
    codigo: 'A',
    titulo: 'Pedagógico e permanência',
    descricao: 'Dificuldade de aprendizagem, evasão, inclusão e conflitos escolares.',
    risco: 'moderado',
    icon: '🎓',
    nodeIds: ['DIFICULDADE_PEDAGOGICA', 'EVASAO_RISCO', 'INCLUSAO_PCD', 'CONFLITO_INTERPESSOAL'],
    contatosUteis: ['UBS_ERMELINO', 'CRAS_ERMELINO', 'GESTAO_ESCOLAR']
  },
  saúdeMental: {
    codigo: 'B',
    titulo: 'Saúde mental e comportamento',
    descricao: 'Sofrimento psíquico, autolesão, risco de suicídio, uso de substâncias e surtos.',
    risco: 'alto',
    icon: '🧠',
    nodeIds: ['SOFRIMENTO_PSIQUICO', 'AUTOLESAO', 'RISCO_SUICIDIO', 'USO_SUBSTANCIAS', 'SURTO_MENTAL'],
    contatosUteis: ['CAPS_IJ', 'CAPS_AD', 'SAMU']
  },
  violência: {
    codigo: 'C',
    titulo: 'Violências e proteção integral',
    descricao: 'Violência doméstica, abuso sexual, discriminação, arma e eventos críticos.',
    risco: 'urgencia',
    icon: '🛡️',
    nodeIds: ['VIOLENCIA_DOMESTICA', 'ABUSO_SEXUAL', 'DISCRIMINACAO', 'ARMA_ESCOLA', 'TIROTEIO_EXTERNO', 'EMERGENCIA_IMEDIATA'],
    contatosUteis: ['CONSELHO_TUTELAR', 'PM_190', 'UPA_ERMELINO']
  }
};

export const FLUXOS: Record<string, Fluxo> = Object.fromEntries(
  Object.entries(flowMap).map(([id, flow]) => {
    const cenarios = flow.nodeIds.map((nodeId) => {
      const node = PROTOCOL_DATA.decisionTree.find((item) => item.id === nodeId);
      return {
        id: `${id}-${nodeId}`,
        titulo: node?.question || nodeId,
        descricao: node?.guidance?.[0] || node?.doNow?.[0] || 'Consultar protocolo institucional.',
        recomendacaoImediata: node?.doNow?.[0] || node?.guidance?.[0] || 'Acionar coordenação.',
        acionar: node?.contactTargets?.map((target) => (typeof target === 'string' ? target : target.serviceId)) || ['GESTAO_ESCOLAR'],
        documento: 'Anexo I',
        prazoNotificacao: node?.deadline || '24h'
      };
    });

    return [
      id,
      {
        id,
        codigo: flow.codigo,
        titulo: flow.titulo,
        descricao: flow.descricao,
        risco: flow.risco,
        icon: flow.icon,
        cenarios,
        contatosUteis: flow.contatosUteis
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
  contentOrigin: 'DERIVADA',
  sourceRef: 'Protocolo Bússola — EE Ermelino Matarazzo'
}));

export const GLOSSARY_SEED = [
  { term: 'Acolhimento', definition: 'Receber o aluno sem julgamento e sem pressa. Primeiro passo de qualquer fluxo.' },
  { term: 'Escuta qualificada', definition: 'Ouvir ativamente, sem interrupções, sem julgamentos, anotando as palavras exatas da pessoa.' },
  { term: 'Notificação obrigatória', definition: 'Comunicação formal ao CT em qualquer suspeita de violência. Não precisa ter certeza.' },
  { term: 'Escuta protegida', definition: 'Ouvir a vítima sem perguntas sugestivas. Anotar o que foi dito com as palavras exatas. NÃO reinquirir.' },
  { term: 'Depoimento especial', definition: 'Oitiva de vítima conduzida por especialista — papel do sistema de justiça, não da escola.' },
  { term: 'Autolesão', definition: 'Machucar-se propositalmente. NEM SEMPRE indica intenção de morrer. Requer acolhimento, não punição.' },
  { term: 'Ideação suicida', definition: 'Pensamentos sobre querer morrer. Qualquer relato deve ser levado a sério. Nunca minimizar.' },
  { term: 'PEI', definition: 'Plano Educacional Individualizado — adaptações, estratégias e metas para estudantes com deficiência.' },
  { term: 'AEE', definition: 'Atendimento Educacional Especializado — sala de recursos. Complementa, não substitui o ensino comum.' },
  { term: 'PSE', definition: 'Programa Saúde na Escola — parceria UBS-escola para ações coletivas de promoção de saúde.' },
  { term: 'CRAS', definition: 'Proteção social básica: benefícios, SCFV, orientação social para famílias vulneráveis.' },
  { term: 'CREAS', definition: 'Proteção especial: violência, negligência grave, trabalho infantil, exploração sexual.' },
  { term: 'Rede intersetorial', definition: 'Conjunto de serviços de diferentes áreas que atuam juntos. A escola é parte, não o único responsável.' },
  { term: 'ECA', definition: 'Estatuto da Criança e do Adolescente — define direitos e obrigações de toda a sociedade, incluindo a escola.' },
  { term: 'Lei 13.431/2017', definition: 'Lei de proteção de crianças vítimas de violência. Define escuta protegida e obrigações de notificação.' }
];

export const ROLEPLAY_SCENARIOS = [
  {
    id: 'CEN001',
    title: 'Lucas, 14 anos, tristeza + queda de rendimento',
    riskLevel: 'MÉDIO',
    tags: ['pedagógico', 'saúde mental', 'CRAS', 'UBS'],
    context: 'Mãe desempregada, mora no Jardim Belém, distorção idade-série.',
    entryNodeId: 'DIFICULDADE_PEDAGOGICA',
    expectedNodeId: 'SOFRIMENTO_PSIQUICO',
    expectedContacts: ['CRAS', 'UBS'],
    idealPath: ['Professor', 'Coordenação', 'Escuta', 'Sem autolesão', 'Adaptações', 'CRAS', 'UBS'],
    outcome: 'Interno + CRAS + UBS'
  },
  {
    id: 'CEN002',
    title: 'Mariana, 16 anos, marcas de cortes no braço',
    riskLevel: 'ALTO',
    tags: ['autolesão', 'família', 'CAPS IJ'],
    context: 'Conflito familiar intenso, pais separados, cobre com pulseiras.',
    entryNodeId: 'AUTOLESAO',
    expectedNodeId: 'AUTOLESAO',
    expectedContacts: ['CAPS_IJ', 'UPA_HOSPITAL'],
    idealPath: ['Prof EF', 'Espaço privado', 'Confirma autolesão', 'Sem ideação de morte', 'Mãe acionada', 'CAPS IJ II'],
    outcome: 'Escola + família + CAPS IJ'
  },
  {
    id: 'CEN003',
    title: 'João, 13 anos, “vou me matar” no WhatsApp',
    riskLevel: 'ALTO',
    tags: ['ideação suicida', 'print', 'família'],
    context: 'Conflito com pai na véspera, print enviado por colegas.',
    entryNodeId: 'RISCO_SUICIDIO',
    expectedNodeId: 'RISCO_SUICIDIO',
    expectedContacts: ['CAPS_IJ', 'EMERGENCIA_192_193'],
    idealPath: ['Professor', 'Coordenação', 'Sala reservada', 'Sem plano', 'Mãe convocada', 'CAPS IJ ou UPA'],
    outcome: 'Escola + família + CAPS IJ'
  },
  {
    id: 'CEN004',
    title: 'Ana Paula, 12 anos, hematomas inexplicáveis',
    riskLevel: 'ALTO',
    tags: ['violência doméstica', 'notificação', 'CT'],
    context: 'Mora com padrasto, comportamento retraído, choro ao ser perguntada.',
    entryNodeId: 'VIOLENCIA_DOMESTICA',
    expectedNodeId: 'VIOLENCIA_DOMESTICA',
    expectedContacts: ['CONSELHO_TUTELAR', 'UBS'],
    idealPath: ['Professora', 'Coordenação', 'Escuta protegida', 'Choro sem relato verbal', 'Notificação CT', 'UBS'],
    outcome: 'CT + UBS + monitoramento escolar'
  },
  {
    id: 'CEN005',
    title: 'Rafael, 17 anos, maconha no banheiro',
    riskLevel: 'MÉDIO',
    tags: ['substâncias', 'PSE', 'primeira ocorrência'],
    context: '3º EM, uso recreativo, sem sinais de dependência.',
    entryNodeId: 'USO_SUBSTANCIAS',
    expectedNodeId: 'USO_SUBSTANCIAS',
    expectedContacts: ['CAPS_ADULTO', 'UBS'],
    idealPath: ['Agente', 'Coordenação', 'Escuta', 'Sem tráfico', 'Família', 'UBS', 'PSE'],
    outcome: 'Acolhimento + família + UBS'
  },
  {
    id: 'CEN006',
    title: 'Beatriz, 15 anos, grávida, família não sabe',
    riskLevel: 'MÉDIO',
    tags: ['gravidez', 'permanência', 'pré-natal'],
    context: 'Gestação em contexto consensual e sigiloso.',
    entryNodeId: 'GRAVIDEZ_ADOLESCENCIA',
    expectedNodeId: 'GRAVIDEZ_ADOLESCENCIA',
    expectedContacts: ['UBS', 'CRAS'],
    idealPath: ['Secretária', 'Coordenação', 'Sem violência sexual', 'Permanência garantida', 'UBS pré-natal'],
    outcome: 'Escola + família (com consentimento) + UBS + CRAS se necessário'
  },
  {
    id: 'CEN007',
    title: 'Tiros próximos durante o recreio',
    riskLevel: 'EMERGENCIAL',
    tags: ['lockdown', 'PM 190', 'crise coletiva'],
    context: 'Conflito armado externo em horário de circulação de alunos.',
    entryNodeId: 'TIROTEIO_EXTERNO',
    expectedNodeId: 'TIROTEIO_EXTERNO',
    expectedContacts: ['EMERGENCIA_192_193', 'GESTAO_ESCOLAR'],
    idealPath: ['Funcionário', 'Lockdown', 'PM 190', 'Famílias comunicadas', 'Apoio psicossocial pós-crise'],
    outcome: 'Lockdown + PM + suporte coletivo'
  }
];

export const FAQ_CONTENT_META = {
  version: '2026.02',
  source: 'Protocolo Bússola EE Ermelino Matarazzo',
  updatedAt: '2026-02-19'
};
