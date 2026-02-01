
import { Contato, Fluxo, Recurso } from './types';

export const CONTATOS: Contato[] = [
  {
    id: 'escola',
    nome: 'E.E. Ermelino Matarazzo (Sede)',
    categoria: 'protecao',
    telefone: '(11) 2943-7188',
    endereco: 'Rua Abel Tavares, s/n – Jardim Belém',
    horario: '07h às 23h',
    lat: -23.4947,
    lng: -46.4719
  },
  {
    id: 'ct',
    nome: 'Conselho Tutelar Ermelino Matarazzo',
    categoria: 'protecao',
    telefone: '(11) 2545-5159',
    whatsapp: '(11) 97283-6705',
    endereco: 'Avenida Milene Elias, 417',
    horario: '08h às 18h (Plantão 24h)',
    urgencia: true,
    lat: -23.4883,
    lng: -46.4842
  },
  {
    id: 'pm',
    nome: 'Polícia Militar (Emergência)',
    categoria: 'protecao',
    telefone: '190',
    urgencia: true,
    lat: -23.4900,
    lng: -46.4800
  },
  {
    id: 'delegacia',
    nome: '4ª Delegacia de Defesa da Mulher (DDM)',
    categoria: 'justica',
    telefone: '(11) 2041-3535',
    endereco: 'Rua Dr. Corinto Baldoíno Costa, 400',
    horario: '24h',
    lat: -23.5188,
    lng: -46.5414
  },
  {
    id: 'creas',
    nome: 'CREAS Ermelino Matarazzo',
    categoria: 'assistencia',
    telefone: '(11) 2545-3211',
    endereco: 'Avenida Paranaguá, 1492',
    horario: '08h às 18h',
    lat: -23.4934,
    lng: -46.4812
  },
  {
    id: 'cras',
    nome: 'CRAS Ermelino Matarazzo',
    categoria: 'assistencia',
    telefone: '(11) 2545-3211',
    endereco: 'Avenida Paranaguá, 1492',
    lat: -23.4934,
    lng: -46.4812
  },
  {
    id: 'ong-acolher',
    nome: 'ONG Semente da Esperança',
    categoria: 'assistencia',
    telefone: '(11) 2546-1020',
    endereco: 'Entorno da Escola',
    horario: '09h às 17h',
    lat: -23.4950,
    lng: -46.4730
  },
  {
    id: 'samu',
    nome: 'SAMU',
    categoria: 'saude',
    telefone: '192',
    urgencia: true,
    lat: -23.4910,
    lng: -46.4780
  },
  {
    id: 'caps',
    nome: 'CAPS IJ (Saúde Mental Juvenil)',
    categoria: 'saude',
    telefone: '(11) 3294-3828',
    endereco: 'Rua Antonio Bonici, 18',
    horario: '07h às 19h',
    lat: -23.4855,
    lng: -46.4788
  },
  {
    id: 'ubs',
    nome: 'UBS Jardim Belém',
    categoria: 'saude',
    telefone: '(11) 2545-8235',
    endereco: 'Rua Antônio de Freitas Toledo, 185',
    lat: -23.4975,
    lng: -46.4745
  }
];

export const FLUXOS: Record<string, Fluxo> = {
  'violencia': {
    id: 'violencia',
    titulo: 'Violência e Abuso',
    descricao: 'Abuso físico, sexual, negligência grave ou exploração.',
    risco: 'urgencia',
    icon: '⚠️',
    checklist: [
      'Isolamento seguro do aluno (afastar do agressor)',
      'Escuta inicial qualificada (usar Anexo I)',
      'Comunicação IMEDIATA à direção',
      'Preencher Anexo V (ECA Art. 13) em até 24h',
      'Acionamento da Polícia Militar (190) se houver risco iminente'
    ],
    alertas: [
      'AÇÃO OBRIGATÓRIA EM 24H (ECA Art. 13)',
      'A escola relata indícios; a DPCA/Justiça investiga.',
      'Garantir sigilo absoluto dos dados sensíveis.',
      'VEDAÇÃO: Nunca confronte o suposto agressor sozinho.'
    ],
    contatosUteis: ['ct', 'delegacia', 'pm', 'creas'],
    cenarios: [
      { 
        id: 'v1', 
        titulo: 'Violência Física Recente', 
        descricao: 'Hematomas, lesões visíveis ou fraturas. Aluno apresenta comportamento alterado e marcas físicas.', 
        recomendacaoImediata: 'Isolamento seguro. Comunicar direção e acionar Conselho Tutelar em até 24h.',
        acionar: 'Conselho Tutelar + UBS/UPA',
        documento: 'Anexo V (ECA Art. 13)'
      },
      { 
        id: 'v2', 
        titulo: 'Abuso Sexual (Suspeita)', 
        descricao: 'Relato de toque inadequado ou comportamento sexualizado. Revelação feita no mesmo dia.', 
        recomendacaoImediata: 'Comunicação IMEDIATA (< 15 min). Não investigar detalhes. Proteger a criança.',
        acionar: 'CT (Imediato) + DDM + SAMU (se grave)',
        documento: 'Anexo I (Escuta) + Anexo V (CT)'
      },
      { 
        id: 'v5', 
        titulo: 'Violência Doméstica Iminente', 
        descricao: 'Estudante relata medo de voltar para casa ou ameaças graves de morte por parte de familiares.', 
        recomendacaoImediata: 'NÃO liberar o aluno. Permanecer na escola sob supervisão até orientação do CT ou Polícia.',
        acionar: 'Polícia Militar (190) + Conselho Tutelar',
        documento: 'Anexo V (Comunicação Urgente)'
      },
      { 
        id: 'v6', 
        titulo: 'Trabalho Infantil', 
        descricao: 'Aluno exerce atividade remunerada prejudicial à saúde ou frequência escolar (ex: semáforos, carga).', 
        recomendacaoImediata: 'Diagnosticar a rede de exploração. Comunicar o CT e CREAS para proteção da família.',
        acionar: 'CREAS + Conselho Tutelar (24h)',
        documento: 'Anexo III (Encaminhamento Especializado)'
      },
      { 
        id: 'v4', 
        titulo: 'Bullying / Violência Psicológica', 
        descricao: 'Perseguição sistemática, exclusão ou agressões verbais que impedem o convívio escolar.', 
        recomendacaoImediata: 'Ação pedagógica imediata. Se houver danos à saúde mental, encaminhar para rede.',
        acionar: 'Direção + CAPS IJ (se grave) + CT',
        documento: 'Anexo IV (Registro de Acompanhamento)'
      }
    ]
  },
  'saude-mental': {
    id: 'saude-mental',
    titulo: 'Saúde Mental e Crise',
    descricao: 'Mudanças bruscas, ideação suicida ou sofrimento intenso.',
    risco: 'alto',
    icon: '🧠',
    checklist: [
      'Utilizar Anexo VI para guiar a conversa (Escuta Qualificada)',
      'NUNCA deixar o estudante sozinho se houver falas de morte',
      'Acolher em local reservado e tranquilo',
      'Contatar responsáveis para acompanhamento'
    ],
    alertas: [
      'A ESCOLA NÃO DIAGNOSTICA: Apenas observa e encaminha.',
      'RISCO VERMELHO: Ideação ativa com plano exige ação imediata (< 15 min).',
      'SIGILO: Informações de saúde mental são protegidas pela LGPD.'
    ],
    contatosUteis: ['caps', 'ubs', 'samu'],
    cenarios: [
      { 
        id: 's3', 
        titulo: 'Ideação Suicida Ativa (Risco Vermelho)', 
        descricao: 'Estudante com plano estruturado, acesso a meios letais e desespero total. Tentativa recente.', 
        recomendacaoImediata: 'URGENTE: Não deixar sozinho. Acionar Direção e SAMU imediatamente.',
        acionar: 'CVV 188 + SAMU 192 + CAPS IJ (Urgente)',
        documento: 'Anexo VI (Ficha de Risco Suicida)'
      },
      { 
        id: 's2', 
        titulo: 'Automutilação Frequente', 
        descricao: 'Cortes nos braços/pernas, queimaduras ou marcas de agressão auto-infligida constantes.', 
        recomendacaoImediata: 'Acolhimento empático. Comunicar responsáveis imediatamente para encaminhamento ao CAPS.',
        acionar: 'CAPS IJ (Prioritário) + Orientação Família',
        documento: 'Anexo VI (Risco Amarelo/Moderado)'
      },
      { 
        id: 's5', 
        titulo: 'Uso de Substâncias (Álcool/Drogas)', 
        descricao: 'Estudante sob efeito de substâncias ou com padrão de uso que prejudica a saúde e aprendizagem.', 
        recomendacaoImediata: 'Acolhimento de redução de danos. Orientar família. Não punir sem acolher.',
        acionar: 'CAPS AD (Dependência) + Conselho Tutelar',
        documento: 'Anexo III (Encaminhamento à Rede)'
      },
      { 
        id: 's6', 
        titulo: 'Queda Brusca no Desempenho / Isolamento', 
        descricao: 'Estudante parou de interagir, apresenta tristeza persistente por semanas e notas caíram drasticamente.', 
        recomendacaoImediata: 'Escuta qualificada pela coordenação. Avaliar indicadores de depressão ou ansiedade.',
        acionar: 'UBS Jardim Belém + Acompanhamento Interno',
        documento: 'Anexo VI (Risco Verde/Leve)'
      }
    ]
  },
  'vulnerabilidade-social': {
    id: 'vulnerabilidade-social',
    titulo: 'Vulnerabilidade Social',
    descricao: 'Insegurança alimentar, situação de rua ou precariedade.',
    risco: 'moderado',
    icon: '🏠',
    checklist: [
      'Diagnóstico socioeconômico (Anexo I)',
      'Encaminhamento ao CRAS para CadÚnico',
      'Preencher Anexo III para Assistência Social'
    ],
    alertas: [
      'Negligência por falta de recursos (pobreza) exige apoio, não punição.',
      'Parceria com a ONG Semente da Esperança para auxílio alimentar imediato.'
    ],
    contatosUteis: ['cras', 'ong-acolher', 'creas'],
    cenarios: [
      { 
        id: 'u1', 
        titulo: 'Fome e Insegurança Alimentar', 
        descricao: 'Estudante relata não ter o que comer. Falta de cuidados básicos e abandono em horários escolares.', 
        recomendacaoImediata: 'Garantir alimentação escolar imediata. Acionar rede socioassistencial.',
        acionar: 'CRAS (Prioritário) + ONG Acolher',
        documento: 'Anexo III (Assistência Social)'
      },
      { 
        id: 'u3', 
        titulo: 'Negligência por Pobreza Extrema', 
        descricao: 'Falta de higiene crônica, roupas inadequadas ao clima e sinais de desnutrição.', 
        recomendacaoImediata: 'Identificar se é violação deliberada de direitos ou falta de recursos financeiros.',
        acionar: 'CRAS (Família) + Conselho Tutelar (24h)',
        documento: 'Anexo III + Anexo V (se houver maus-tratos)'
      },
      { 
        id: 'u2', 
        titulo: 'Situação de Rua ou Insegurança Habitacional', 
        descricao: 'Família sem teto, vivendo em abrigo ou sob ameaça de despejo imediato.', 
        recomendacaoImediata: 'Acionamento emergencial da assistência social para proteção da integridade da família.',
        acionar: 'CRAS + Conselho Tutelar (Informar)',
        documento: 'Anexo III (Encaminhamento Emergencial)'
      }
    ]
  },
  'pedagogica': {
    id: 'pedagogica',
    titulo: 'Questões Pedagógicas',
    descricao: 'Aprendizagem, evasão ou conflitos disciplinares.',
    risco: 'baixo',
    icon: '🎓',
    checklist: [
      'Preencher Ficha de Encaminhamento Interno (Anexo II)',
      'Preencher FICAI se houver evasão persistente'
    ],
    alertas: [
      'Evasão persistente (> 30% faltas injustificadas) exige comunicação ao CT.',
      'Sempre tente a busca ativa interna antes de oficializar a evasão.'
    ],
    contatosUteis: ['escola', 'ct'],
    cenarios: [
      { 
        id: 'p1', 
        titulo: 'Evasão Escolar (Busca Ativa Esgotada)', 
        descricao: 'Faltas consecutivas sem justificativa. Contato com família sem sucesso.', 
        recomendacaoImediata: 'Formalizar a evasão via FICAI. Comunicar o Conselho Tutelar.',
        acionar: 'Conselho Tutelar (via FICAI)',
        documento: 'Formulário FICAI Oficial'
      },
      { 
        id: 'p4', 
        titulo: 'Conflito / Agressividade entre Pares', 
        descricao: 'Brigas frequentes, comportamento disruptivo ou agressividade física pontual com colegas.', 
        recomendacaoImediata: 'Mediação de conflitos imediata. Convocação de responsáveis para alinhamento.',
        acionar: 'Direção Escolar + Mediação Escolar',
        documento: 'Anexo II (Registro de Conflito)'
      },
      { 
        id: 'p3', 
        titulo: 'Dificuldade Severa de Aprendizagem', 
        descricao: 'Estudante com defasagem profunda, sugerindo transtorno (TDAH, TEA) não diagnosticado.', 
        recomendacaoImediata: 'Avaliação psicopedagógica interna e encaminhamento para diagnóstico médico.',
        acionar: 'UBS (Avaliação) + Acompanhamento Especializado',
        documento: 'Anexo III (Solicitação de Avaliação)'
      }
    ]
  }
};

export const RECURSOS: Recurso[] = [
  {
    id: 'anexo-1',
    titulo: 'Anexo I - Ficha de Acolhimento',
    descricao: 'Registro confidencial da identificação da demanda, indicadores físicos/comportamentais e relato do estudante.',
    formato: 'pdf',
    obrigatorio: true
  },
  {
    id: 'anexo-2',
    titulo: 'Anexo II - Encaminhamento Interno',
    descricao: 'Comunicação oficial entre setores (Professor, Coordenação, Direção) sobre situações preocupantes.',
    formato: 'pdf'
  },
  {
    id: 'anexo-3',
    titulo: 'Anexo III - Encaminhamento Externo',
    descricao: 'Guia para envio a serviços como CAPS, UBS, CRAS ou Conselho Tutelar com descrição objetiva do caso.',
    formato: 'docx',
    obrigatorio: true
  },
  {
    id: 'anexo-4',
    titulo: 'Anexo IV - Acompanhamento',
    descricao: 'Ficha para monitoramento continuado da evolução do caso e registros de contatos com a rede.',
    formato: 'pdf'
  },
  {
    id: 'anexo-5',
    titulo: 'Anexo V - Registro ECA Art. 13',
    descricao: 'Ofício de comunicação obrigatória de suspeita de violência ao Conselho Tutelar. Documento legal crítico.',
    formato: 'docx',
    obrigatorio: true
  },
  {
    id: 'anexo-6',
    titulo: 'Anexo VI - Saúde Mental e Risco',
    descricao: 'Escuta qualificada específica para avaliação de ideação suicida e classificação de risco (Verde/Amarelo/Vermelho).',
    formato: 'pdf',
    obrigatorio: true
  }
];
