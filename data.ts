
import { Contato, Fluxo, Recurso, FaseCiclo } from './types';

const FASES_PADRAO: FaseCiclo[] = [
  { 
    ordem: 1, 
    titulo: 'Identificação', 
    responsavel: 'professor', 
    descricao: 'Observação de sinais e acolhimento inicial.', 
    checklist: [
      { 
        texto: 'Observar sinais físicos/comportamentais', 
        detalhes: 'Fique atento a mudanças bruscas de humor, isolamento, marcas no corpo ou queda súbita de rendimento escolar. Verifique se o estudante apresenta sinais de cansaço extremo ou higiene precária.',
        links: [{ titulo: 'Guia de Sinais de Alerta', idRecurso: 'anexo-1' }]
      },
      { 
        texto: 'Garantir ambiente seguro para escuta', 
        detalhes: 'O acolhimento deve ser feito em local privado, sem interrupções e onde o estudante se sinta confortável. Evite salas de diretoria se o estudante estiver intimidado.' 
      }
    ] 
  },
  { 
    ordem: 2, 
    titulo: 'Acolhimento', 
    responsavel: 'professor', 
    descricao: 'Escuta qualificada sem julgamento.', 
    checklist: [
      { 
        texto: 'Aplicar Escuta Qualificada (Anexo II)', 
        detalhes: 'Utilize o roteiro de escuta qualificada para registrar o relato espontâneo sem induzir respostas. Lembre-se: não é um interrogatório.',
        links: [{ titulo: 'Protocolo de Escuta', idRecurso: 'anexo-2' }]
      },
      { 
        texto: 'Validar sentimentos do estudante', 
        detalhes: 'Demonstre empatia. Frases como "Eu acredito em você", "Você está seguro aqui" e "Você não tem culpa" são fundamentais neste momento.' 
      }
    ] 
  },
  { 
    ordem: 3, 
    titulo: 'Avaliação', 
    responsavel: 'gestor', 
    descricao: 'Classificação de risco e gravidade.', 
    checklist: [
      { 
        texto: 'Realizar Triagem de Risco (Anexo VI)', 
        detalhes: 'Em casos de saúde mental ou ideação suicida, aplique as perguntas de gravidade do manual SEDUC.',
        links: [{ titulo: 'Ficha de Avaliação de Risco', idRecurso: 'anexo-6' }]
      },
      { 
        texto: 'Definir Governabilidade do Caso', 
        detalhes: 'Determine se a situação é de governabilidade Direta (Escola resolve), Compartilhada (Escola + Rede) ou Externa (Apenas Rede).' 
      }
    ] 
  },
  { 
    ordem: 4, 
    titulo: 'Encaminhamento', 
    responsavel: 'gestor', 
    descricao: 'Acionamento da rede externa.', 
    checklist: [
      { 
        texto: 'Notificar Conselho Tutelar', 
        detalhes: 'Obrigatório em casos de violência doméstica, abuso ou negligência. Deve ser feito via ofício assinado pela direção.',
        links: [{ titulo: 'Gerar Ofício CT', idRecurso: 'modelo-ct' }]
      },
      { 
        texto: 'Encaminhar para Unidade de Saúde', 
        detalhes: 'Em casos de violência física ou sexual em menos de 72h, o encaminhamento para hospital com profilaxia é prioridade absoluta.' 
      }
    ] 
  },
  { 
    ordem: 5, 
    titulo: 'Monitoramento', 
    responsavel: 'gestor', 
    descricao: 'Acompanhamento do retorno da rede e bem-estar do estudante.', 
    checklist: [
      { 
        texto: 'Monitoramento da Frequência Escolar', 
        detalhes: 'O acompanhamento diário da presença é o principal indicador de eficácia. Alerte a gestão em caso de falta não justificada após o início do protocolo.',
        links: [{ titulo: 'Ficha de Registro de Providências', idRecurso: 'anexo-4' }]
      },
      { 
        texto: 'Diálogo com a Rede Externa (Feedback)', 
        detalhes: 'Estabeleça contato semanal com o CAPS, CRAS ou UBS para entender se o estudante está aderindo ao tratamento ou acompanhamento fora da escola.' 
      },
      { 
        texto: 'Acompanhamento do Prontuário Escolar', 
        detalhes: 'Certifique-se de que todas as intervenções feitas em sala de aula (adaptações curriculares, acolhimentos extras) estão devidamente documentadas.',
        links: [{ titulo: 'Modelo de Registro Interno', idRecurso: 'anexo-4' }]
      }
    ] 
  },
  { 
    ordem: 6, 
    titulo: 'Reavaliação', 
    responsavel: 'gestor', 
    descricao: 'Análise de melhora ou agravamento.', 
    checklist: [
      { 
        texto: 'Reunião de Equipe (Conselho de Classe)', 
        detalhes: 'Avalie se as medidas pedagógicas tomadas surtiram efeito no comportamento e aprendizagem do estudante.' 
      },
      { 
        texto: 'Revisão do Plano de Proteção', 
        detalhes: 'Se os riscos persistirem, o plano deve ser endurecido, possivelmente acionando instâncias superiores da rede.' 
      }
    ] 
  },
  { 
    ordem: 7, 
    titulo: 'Encerramento', 
    responsavel: 'gestor', 
    descricao: 'Finalização do ciclo de proteção.', 
    checklist: [
      { 
        texto: 'Arquivamento Seguro da Documentação', 
        detalhes: 'O dossiê deve ser guardado em pasta lacrada no prontuário do aluno, com acesso restrito à gestão conforme LGPD.' 
      },
      { 
        texto: 'Termo de Encerramento do Ciclo', 
        detalhes: 'Formalize que a situação de risco cessou ou foi estabilizada pela rede de proteção.' 
      }
    ] 
  },
];

export const CONTATOS: Contato[] = [
  { id: 'ubs-ermelino', nome: 'UBS Ermelino Matarazzo', categoria: 'saude', telefone: '(11) 2545-8235', endereco: 'Rua Antônio de Freitas Toledo, 185', horario: 'Seg-Sex 7h-19h', lat: -23.4922, lng: -46.4789 },
  { id: 'caps-ij', nome: 'CAPS IJ Ermelino', categoria: 'saude', telefone: '(11) 3294-3828', endereco: 'Rua Antônio Bonici, 18', horario: 'Seg-Sex 7h-19h', lat: -23.4855, lng: -46.4788 },
  { id: 'upa-ermelino', nome: 'UPA Ermelino Matarazzo', categoria: 'emergencia', telefone: '(11) 2574-3258', endereco: 'Rua Miguel Novais, 113', horario: '24 HORAS', urgencia: true, lat: -23.4820, lng: -46.4850 },
  { id: 'ct-ermelino', nome: 'Conselho Tutelar Ermelino', categoria: 'protecao', telefone: '(11) 2214-9050', endereco: 'Rua Chesira Maltauro, 342', horario: 'Plantão 24h', urgencia: true, lat: -23.4883, lng: -46.4842 },
  { id: 'cras-ermelino', nome: 'CRAS Ermelino Matarazzo', categoria: 'assistencia', telefone: '(11) 2545-3211', endereco: 'Av. Paranaguá, 2045', lat: -23.4934, lng: -46.4812 },
  { id: 'samu', nome: 'SAMU', categoria: 'emergencia', telefone: '192', urgencia: true },
  { id: 'pm', nome: 'Polícia Militar', categoria: 'emergencia', telefone: '190', urgencia: true },
  { id: 'disque-100', nome: 'Disque 100', categoria: 'protecao', telefone: '100', urgencia: true }
];

export const FLUXOS: Record<string, Fluxo> = {
  'fluxo-a': {
    id: 'fluxo-a', codigo: 'A', titulo: 'Baixo Desempenho e Infrequência', icon: '🎓', risco: 'baixo', governabilidade: 'direta',
    descricao: 'Dificuldades de aprendizagem persistentes e evasão escolar (> 20% de faltas).',
    fases: FASES_PADRAO, alertas: ['Priorizar o vínculo afetivo.'], vedacoes: ['Não punir sem investigar causas sociais.'],
    contatosUteis: [], convivaFields: ['Baixo desempenho', 'Infrequência'],
    cenarios: [
      { id: 'a1', titulo: 'Dificuldade de Aprendizagem', descricao: 'Estudante não acompanha a turma.', recomendacaoImediata: 'Reunião pedagógica e plano de reforço.', acionar: [], documento: 'Ata de Reunião', prazoNotificacao: 'No mês' }
    ]
  },
  'fluxo-b': {
    id: 'fluxo-b', codigo: 'B', titulo: 'Agressividade e Conflitos', icon: '⚔️', risco: 'moderado', governabilidade: 'direta',
    descricao: 'Comportamentos disruptivos, brigas ou ameaças entre estudantes.',
    fases: FASES_PADRAO, alertas: ['Mediação de conflitos imediata.'], vedacoes: ['Não expulsar sem processo administrativo.'],
    contatosUteis: [], convivaFields: ['Conflito Escolar', 'Agressividade'], cenarios: []
  },
  'fluxo-c': {
    id: 'fluxo-c', codigo: 'C', titulo: 'Automutilação e Autolesão', icon: '🩹', risco: 'alto', governabilidade: 'compartilhada',
    descricao: 'Cortes, queimaduras ou marcas de autolesão sem intenção suicida clara.',
    fases: FASES_PADRAO, alertas: ['Acolher sem julgar as marcas.', 'Notificar a família com cautela.'],
    vedacoes: ['Não pedir para ver as marcas em público.'],
    contatosUteis: ['caps-ij', 'ubs-ermelino'], convivaFields: ['Autolesão', 'Saúde Mental'], cenarios: []
  },
  'fluxo-d': {
    id: 'fluxo-d', codigo: 'D', titulo: 'Ideação e Tentativa de Suicídio', icon: '🔴', risco: 'urgencia', governabilidade: 'externa',
    descricao: 'Risco iminente à vida: falas de morte ou tentativa recente.',
    fases: FASES_PADRAO, alertas: ['Risco de morte anula o sigilo.', 'Nunca deixar sozinho.'],
    vedacoes: ['Não minimizar o sofrimento.', 'Não permitir saída desacompanhada.'],
    contatosUteis: ['samu', 'upa-ermelino', 'caps-ij'],
    convivaFields: ['Ideação Suicida', 'Tentativa de Suicídio'],
    cenarios: [
      { id: 'd1', titulo: 'Tentativa em Curso', descricao: 'Lesão autoinfligida recente ou ato na escola.', recomendacaoImediata: 'Ligar SAMU 192 e isolar área.', acionar: ['samu', 'upa-ermelino'], documento: 'Anexo II + Anexo IV', prazoNotificacao: 'Imediato' },
      { id: 'd2', titulo: 'Ideação Suicida', descricao: 'Falas de desespere ou plano estruturado.', recomendacaoImediata: 'Acolhimento e encaminhamento urgente ao CAPS.', acionar: ['caps-ij'], documento: 'Anexo VI', prazoNotificacao: '24h' }
    ]
  },
  'fluxo-k': {
    id: 'fluxo-k', codigo: 'K', titulo: 'Violência Sexual', icon: '⚠️', risco: 'urgencia', governabilidade: 'externa',
    descricao: 'Suspeita ou confirmação de abuso, assédio ou exploração sexual.',
    fases: FASES_PADRAO, alertas: ['Se agressor for da família, NÃO avisar família antes do CT.'],
    vedacoes: ['Não interrogar.', 'Não confrontar suspeitos.', 'Não inspecionar o corpo.'],
    contatosUteis: ['ct-ermelino', 'upa-ermelino', 'disque-100'],
    convivaFields: ['Abuso Sexual', 'Exploração Sexual'],
    cenarios: [
      { id: 'k1', titulo: 'Violência < 72h', descricao: 'Exige profilaxia médica urgente.', recomendacaoImediata: 'Hospital Alípio Corrêa Imediato + CT.', acionar: ['upa-ermelino', 'ct-ermelino'], documento: 'Anexo II + Ofício CT', prazoNotificacao: '24h' },
      { id: 'k2', titulo: 'Revelação Espontânea', descricao: 'Estudante relata fato ocorrido no passado.', recomendacaoImediata: 'Escuta qualificada e notificação ao CT.', acionar: ['ct-ermelino'], documento: 'Relatório Escrito', prazoNotificacao: '24h' }
    ]
  },
  'fluxo-l': {
    id: 'fluxo-l', codigo: 'L', titulo: 'Trabalho Infantil', icon: '🧱', risco: 'moderado', governabilidade: 'externa',
    descricao: 'Estudante envolvido em atividades laborais prejudiciais ao desenvolvimento.',
    fases: FASES_PADRAO, alertas: ['Verificar evasão associada.'], vedacoes: [],
    contatosUteis: ['ct-ermelino', 'cras-ermelino'], convivaFields: ['Trabalho Infantil'], cenarios: []
  },
  'fluxo-m': {
    id: 'fluxo-m', codigo: 'M', titulo: 'Uso de Substâncias', icon: '🧪', risco: 'alto', governabilidade: 'externa',
    descricao: 'Uso de álcool ou drogas que impactam a vida escolar.',
    fases: FASES_PADRAO, alertas: ['Abordagem de redução de danos.'], vedacoes: ['Não tratar como caso de polícia apenas.'],
    contatosUteis: ['caps-ij', 'ubs-ermelino'], convivaFields: ['Uso de Drogas'], cenarios: []
  },
  'fluxo-p': {
    id: 'fluxo-p', codigo: 'P', titulo: 'Gravidez na Adolescência', icon: '🤰', risco: 'baixo', governabilidade: 'compartilhada',
    descricao: 'Apoio à gestante e garantia de permanência escolar.',
    fases: FASES_PADRAO, alertas: ['Garantir licença-maternidade escolar.'], vedacoes: ['Não discriminar.'],
    contatosUteis: ['ubs-ermelino'], convivaFields: ['Gravidez'], cenarios: []
  }
};

export const RECURSOS: Recurso[] = [
  { id: 'anexo-1', titulo: 'Anexo I - Ficha de Acolhimento', descricao: 'Registro inicial de identificação e escuta.', formato: 'pdf', obrigatorio: true, camposObrigatorios: ['Nome', 'Data', 'Relato'] },
  { id: 'anexo-2', titulo: 'Anexo II - Escuta Qualificada', descricao: 'Guia para registro do relato espontâneo.', formato: 'pdf', obrigatorio: true, camposObrigatorios: ['Escuta Qualificada', 'Observações'] },
  { id: 'anexo-4', titulo: 'Anexo IV - Registro de Providências', descricao: 'Diário de bordo das ações realizadas pela escola.', formato: 'pdf', obrigatorio: true, camposObrigatorios: ['Ação', 'Responsável'] },
  { id: 'anexo-6', titulo: 'Anexo VI - Avaliação de Risco Suicida', descricao: 'Triagem de gravidade para saúde mental.', formato: 'pdf', obrigatorio: true, camposObrigatorios: ['Meio letal', 'Plano'] },
  { id: 'modelo-ct', titulo: 'Modelo de Ofício ao Conselho Tutelar', descricao: 'Documento padrão para notificação oficial.', formato: 'docx', obrigatorio: true, camposObrigatorios: ['Relato', 'Assinatura Direção'] }
];
