/**
 * GLOSSÁRIO TÉCNICO-OPERACIONAL
 * EE Ermelino Matarazzo - Protocolo Bússola
 *
 * Termos essenciais para uso do webapp: rede intersetorial,
 * fluxos, siglas, papéis escolares, situações críticas.
 *
 * Base: Diagnóstico territorial Ermelino Matarazzo (Zona Leste SP)
 * e mapeamento da rede de proteção (UBS, CAPS, CRAS, CREAS, CT).
 */

export interface GlossaryTerm {
  id: string;
  termo: string;
  definicao: string;
  exemplo?: string;
  sinonimos?: string[];
  relacionados?: string[];
  observacoes?: string;
  categoria:
    | 'Rede Externa - Saúde Mental'
    | 'Rede Externa - Saúde Física'
    | 'Rede Externa - Assistência Social'
    | 'Rede Externa - Proteção/Justiça'
    | 'Fluxos e Protocolos'
    | 'Papéis Escolares'
    | 'Situações Críticas'
    | 'Pedagógico'
    | 'Documentos'
    | 'Tecnologia/App';
}

export const TECHNICAL_GLOSSARY: GlossaryTerm[] = [
  {
    id: 'caps-ij',
    termo: 'CAPS IJ II Ermelino Matarazzo',
    definicao: 'Centro de Atenção Psicossocial Infantojuvenil que atende crianças e adolescentes com sofrimento psíquico intenso ou em crise.',
    exemplo: 'Encaminhe estudante com cortes frequentes e ideação suicida persistente. Use o formulário "Encaminhamento Externo" e selecione "CAPS IJ".',
    sinonimos: ['CAPS Infantojuvenil', 'CAPS IJ Ermelino', 'CAPSij'],
    relacionados: ['Risco Iminente', 'Autolesão', 'Ideação Suicida', 'UPA Ermelino'],
    observacoes: 'R. Antônio Bonici, 18. Acolhimento sem agendamento prévio em crises. Fone: (11) 2546-xxxx.',
    categoria: 'Rede Externa - Saúde Mental'
  },
  {
    id: 'caps-ad',
    termo: 'CAPS AD II Ermelino Matarazzo',
    definicao: 'Centro de Atenção Psicossocial Álcool e Drogas para adolescentes (geralmente 16+ anos) com uso problemático de substâncias.',
    exemplo: 'Acione se estudante apresenta faltas frequentes, alterações de comportamento e relato de uso intenso de álcool ou outras drogas.',
    sinonimos: ['CAPS AD', 'CAPS Álcool e Drogas'],
    relacionados: ['Uso Problemático de Substâncias', 'CRAS', 'Conselho Tutelar'],
    observacoes: 'R. João Antônio Andrade, 804. Atendimento multiprofissional.',
    categoria: 'Rede Externa - Saúde Mental'
  },
  {
    id: 'pse',
    termo: 'PSE - Programa Saúde na Escola',
    definicao: 'Parceria entre UBS e escola para triagem de saúde (vacinas, IMC, saúde bucal, sexual e mental).',
    exemplo: 'Solicite à UBS parceira agenda de visita do PSE para avaliação de casos leves de ansiedade ou tristeza persistente.',
    sinonimos: ['Programa Saúde Escolar'],
    relacionados: ['UBS Ermelino', 'Classificação de Risco Baixo'],
    categoria: 'Rede Externa - Saúde Mental'
  },
  {
    id: 'ideacao-suicida',
    termo: 'Ideação Suicida',
    definicao: 'Pensamentos persistentes sobre morte autoinfligida, com ou sem plano concreto.',
    exemplo: 'Se estudante verbaliza "quero morrer" repetidamente ou escreve bilhetes de despedida, classifique como risco alto e acione CAPS IJ imediatamente.',
    sinonimos: ['Pensamento suicida', 'Vontade de morrer'],
    relacionados: ['Autolesão', 'Risco Iminente', 'SAMU 192', 'UPA'],
    observacoes: 'NUNCA manejo exclusivo da escola. Sempre articule rede de saúde e avise família.',
    categoria: 'Situações Críticas'
  },
  {
    id: 'autolesao',
    termo: 'Autolesão',
    definicao: 'Comportamento de causar dano físico a si mesmo (cortes, queimaduras, arranhões), geralmente sem intenção de morte.',
    exemplo: 'Acolha sem julgamento, registre data/local/descrição, classifique risco e encaminhe para CAPS IJ se recorrente.',
    sinonimos: ['Automutilação', 'Cortes', 'Self-harm'],
    relacionados: ['Ideação Suicida', 'Bullying', 'Violência Doméstica'],
    observacoes: 'Episódio isolado: PSE/UBS. Repetição >2x/mês: CAPS IJ urgente.',
    categoria: 'Situações Críticas'
  },
  {
    id: 'sofrimento-psiquico',
    termo: 'Sofrimento Psíquico Leve a Moderado',
    definicao: 'Ansiedade, tristeza persistente, irritabilidade, insônia que impactam o desempenho escolar mas sem risco imediato.',
    exemplo: 'Ofereça escuta qualificada, professor referência, rodas de conversa e encaminhe para UBS/PSE para avaliação.',
    sinonimos: ['Ansiedade escolar', 'Tristeza prolongada'],
    relacionados: ['PSE', 'UBS Ermelino', 'Professor Referência'],
    categoria: 'Rede Externa - Saúde Mental'
  },
  {
    id: 'crise-aguda',
    termo: 'Crise Aguda de Saúde Mental',
    definicao: 'Situação de descontrole emocional intenso com risco imediato (agressividade extrema, pânico severo, tentativa de suicídio em curso).',
    exemplo: 'Ligue 192 (SAMU) ou leve imediatamente à UPA/Hospital. Não deixe estudante sozinho.',
    sinonimos: ['Emergência psiquiátrica', 'Surto'],
    relacionados: ['SAMU 192', 'UPA Ermelino', 'CAPS IJ'],
    categoria: 'Situações Críticas'
  },
  {
    id: 'ubs-ermelino',
    termo: 'UBS Ermelino Matarazzo',
    definicao: 'Unidade Básica de Saúde municipal, porta de entrada para atendimento primário (consultas, vacinas, pré-natal, saúde mental leve).',
    exemplo: 'Encaminhe estudante com queixas somáticas recorrentes (dor de cabeça, dor de barriga sem causa aparente) ou tristeza prolongada.',
    sinonimos: ['Posto de Saúde Ermelino', 'UBS'],
    observacoes: 'R. Antônio de Freitas Toledo, 185. Horário: 7h-19h.',
    relacionados: ['PSE', 'CAPS IJ', 'Pré-natal Adolescente'],
    categoria: 'Rede Externa - Saúde Física'
  },
  {
    id: 'upa-ermelino',
    termo: 'UPA Ermelino Matarazzo',
    definicao: 'Unidade de Pronto Atendimento 24h para urgências e emergências médicas.',
    exemplo: 'Acione em tentativa de suicídio recente, intoxicação grave, convulsões, traumas físicos severos.',
    sinonimos: ['Pronto Atendimento', 'UPA 24h'],
    observacoes: 'R. Miguel Novais, 113. Aberto 24h.',
    relacionados: ['SAMU 192', 'Hospital Municipal', 'Risco Iminente'],
    categoria: 'Rede Externa - Saúde Física'
  },
  {
    id: 'samu',
    termo: 'SAMU 192',
    definicao: 'Serviço de Atendimento Móvel de Urgência para remoção em emergências médicas graves.',
    exemplo: 'Ligue 192 se estudante está inconsciente, sangrando muito, teve convulsão ou tentou suicídio.',
    sinonimos: ['Ambulância', 'Emergência Médica'],
    relacionados: ['UPA', 'Hospital', 'Risco Iminente'],
    categoria: 'Rede Externa - Saúde Física'
  },
  {
    id: 'cras-ermelino',
    termo: 'CRAS Ermelino Matarazzo',
    definicao: 'Centro de Referência de Assistência Social para famílias em vulnerabilidade social (pobreza, conflitos leves, risco de evasão).',
    exemplo: 'Acione quando família não consegue garantir material escolar, uniforme ou alimentação do estudante.',
    sinonimos: ['CRAS', 'Centro de Assistência'],
    observacoes: 'Av. Paranaguá, 1492. Atendimento por demanda espontânea ou referenciada.',
    relacionados: ['CREAS', 'Bolsa Família', 'Vulnerabilidade Social', 'Evasão Escolar'],
    categoria: 'Rede Externa - Assistência Social'
  },
  {
    id: 'creas',
    termo: 'CREAS - Centro de Referência Especializado de Assistência Social',
    definicao: 'Atende famílias com violação grave de direitos (violência doméstica, trabalho infantil, exploração sexual, negligência severa).',
    exemplo: 'Encaminhe se identificar trabalho infantil, violência física recorrente ou criança sozinha por longos períodos.',
    sinonimos: ['CREAS', 'Proteção Especial'],
    relacionados: ['Conselho Tutelar', 'Violência Doméstica', 'Negligência Grave', 'CRAS'],
    categoria: 'Rede Externa - Assistência Social'
  },
  {
    id: 'bolsa-familia',
    termo: 'Bolsa Família / BPC',
    definicao: 'Benefícios federais de transferência de renda para famílias em pobreza extrema ou pessoas com deficiência.',
    exemplo: 'Oriente família a procurar CRAS para cadastro/recadastramento se perder benefício e estudante faltar por falta de transporte/material.',
    sinonimos: ['BPC', 'Benefício de Prestação Continuada', 'Auxílio'],
    relacionados: ['CRAS', 'Vulnerabilidade Social', 'Evasão'],
    categoria: 'Rede Externa - Assistência Social'
  },
  {
    id: 'scfv',
    termo: 'SCFV - Serviço de Convivência e Fortalecimento de Vínculos',
    definicao: 'Oficinas e atividades socioeducativas para crianças e adolescentes em contraturno escolar.',
    exemplo: 'Sugira à família inscrição no SCFV via CRAS para estudantes em risco de evasão ou uso de drogas.',
    sinonimos: ['Serviço de Convivência'],
    relacionados: ['CRAS', 'Evasão', 'CEU Ermelino'],
    categoria: 'Rede Externa - Assistência Social'
  },
  {
    id: 'vulnerabilidade-social',
    termo: 'Vulnerabilidade Social',
    definicao: 'Situação de pobreza, insegurança alimentar, moradia precária, desemprego familiar que aumenta risco de evasão e violências.',
    exemplo: 'Identifique: estudante sem uniforme/material por meses, faltas por falta de transporte, relatos de fome.',
    relacionados: ['CRAS', 'Bolsa Família', 'Evasão Escolar'],
    categoria: 'Fluxos e Protocolos'
  },
  {
    id: 'trabalho-infantil',
    termo: 'Trabalho Infantil',
    definicao: 'Exploração de trabalho de crianças/adolescentes abaixo da idade legal ou em condições prejudiciais à escolarização.',
    exemplo: 'Se estudante relata trabalhar em feira, lava-jato ou vendas (e falta aulas), notifique Conselho Tutelar e CREAS.',
    sinonimos: ['Exploração infantil'],
    relacionados: ['Conselho Tutelar', 'CREAS', 'Evasão'],
    observacoes: 'Proibido <16 anos; 16-18 anos apenas como aprendiz legal.',
    categoria: 'Situações Críticas'
  },
  {
    id: 'negligencia-grave',
    termo: 'Negligência Grave',
    definicao: 'Ausência prolongada de cuidados básicos (higiene, alimentação, supervisão, saúde, escola) que põe criança em risco.',
    exemplo: 'Criança falta >50% das aulas sem justificativa, chega suja/com piolhos por meses, relata ficar sozinha em casa sempre.',
    sinonimos: ['Abandono parcial', 'Falta de cuidado'],
    relacionados: ['Conselho Tutelar', 'CREAS', 'Violência Doméstica'],
    observacoes: 'Notificação obrigatória ao CT. Não confundir pobreza com negligência.',
    categoria: 'Situações Críticas'
  },
  {
    id: 'exploracao-sexual',
    termo: 'Exploração Sexual de Crianças e Adolescentes',
    definicao: 'Uso de criança/adolescente em atividade sexual em troca de dinheiro, favores, presentes ou coerção.',
    exemplo: 'Se estudante relata "namorado" mais velho que dá presentes caros, ou fala de "programas", acione CT, CREAS e Disque 100 urgente.',
    sinonimos: ['Prostituição infantil', 'Turismo sexual'],
    relacionados: ['Conselho Tutelar', 'Disque 100', 'Ministério Público', 'Delegacia'],
    observacoes: 'CRIME GRAVÍSSIMO. Proteja estudante, notifique múltiplos órgãos.',
    categoria: 'Situações Críticas'
  },
  {
    id: 'conselho-tutelar',
    termo: 'Conselho Tutelar Ermelino Matarazzo',
    definicao: 'Órgão municipal que zela pelo cumprimento de direitos de crianças e adolescentes. Atua mediante ameaça ou violação de direitos.',
    exemplo: 'Notifique em casos de violência física/sexual, negligência grave, evasão reiterada, trabalho infantil, uso de drogas pelos pais.',
    sinonimos: ['CT', 'Conselho Tutelar'],
    observacoes: 'Av. Milene Elias, 417. Fone: (11) xxxx-xxxx. Horário comercial.',
    relacionados: ['CREAS', 'Ministério Público', 'Delegacia', 'Notificação Obrigatória'],
    categoria: 'Rede Externa - Proteção/Justiça'
  },
  {
    id: 'mp-infancia',
    termo: 'Ministério Público da Infância e Juventude',
    definicao: 'Instituição que fiscaliza direitos e pode acionar Justiça quando violações persistem mesmo após atuação do CT.',
    exemplo: 'Se CT foi acionado mas família continua em situação de risco grave (ex: abuso sexual sem intervenção), escola pode oficiar MP.',
    sinonimos: ['MP', 'Promotoria'],
    relacionados: ['Conselho Tutelar', 'Defensoria Pública', 'Vara da Infância'],
    categoria: 'Rede Externa - Proteção/Justiça'
  },
  {
    id: 'defensoria-publica',
    termo: 'Defensoria Pública',
    definicao: 'Oferece assistência jurídica gratuita a famílias de baixa renda em questões de guarda, medidas protetivas, direitos sociais.',
    exemplo: 'Oriente família em situação de violência doméstica ou disputa de guarda a procurar Defensoria.',
    sinonimos: ['Defensoria'],
    relacionados: ['Ministério Público', 'Vara da Infância'],
    categoria: 'Rede Externa - Proteção/Justiça'
  },
  {
    id: 'disque-100',
    termo: 'Disque 100',
    definicao: 'Canal federal de denúncia de violações de direitos humanos (violência, abuso, exploração), 24h, anônimo.',
    exemplo: 'Se não conseguir contato com CT ou em caso gravíssimo fora do horário, disque 100 para registro de denúncia.',
    sinonimos: ['Disque Direitos Humanos'],
    relacionados: ['Conselho Tutelar', 'Disque 180 (Mulher)'],
    categoria: 'Rede Externa - Proteção/Justiça'
  },
  {
    id: 'vara-infancia',
    termo: 'Vara da Infância e Juventude',
    definicao: 'Instância judicial que julga casos de destituição de poder familiar, adoção, medidas socioeducativas para adolescentes infratores.',
    exemplo: 'Casos complexos com múltiplas violações e inação dos órgãos administrativos chegam à Vara via MP ou CT.',
    sinonimos: ['Juizado da Infância'],
    relacionados: ['Ministério Público', 'Conselho Tutelar', 'Acolhimento Institucional'],
    categoria: 'Rede Externa - Proteção/Justiça'
  },
  {
    id: 'policia-militar',
    termo: 'Polícia Militar 190',
    definicao: 'Força de segurança pública. Acionar em crimes em flagrante, ameaça de morte, porte de arma, violência grave no ambiente escolar.',
    exemplo: 'Se há briga com arma branca ou de fogo, ameaça terrorista, invasão armada: ligue 190 imediatamente.',
    sinonimos: ['PM', 'Polícia'],
    observacoes: 'NÃO criminalizar conflitos pedagógicos. Usar apenas em situações de CRIME CONCRETO.',
    relacionados: ['Delegacia', 'BO', 'Risco Iminente'],
    categoria: 'Rede Externa - Proteção/Justiça'
  },
  {
    id: 'delegacia',
    termo: 'Delegacia de Polícia (DP Ermelino)',
    definicao: 'Registra ocorrências criminais (furtos, agressões, tráfico, abuso sexual) para investigação e responsabilização.',
    exemplo: 'Após acionar PM ou em crimes descobertos após o fato, vá à DP para registrar BO formal.',
    sinonimos: ['DP', 'Delegacia'],
    observacoes: 'R. Ruy Pirozzelli, 250.',
    relacionados: ['BO', 'Polícia Militar', 'Conselho Tutelar'],
    categoria: 'Rede Externa - Proteção/Justiça'
  },
  {
    id: 'bo',
    termo: 'BO - Boletim de Ocorrência',
    definicao: 'Documento oficial que registra crime na Delegacia. Necessário para investigação policial e judicial.',
    exemplo: 'Furto de celular na escola, agressão física grave, ameaça de morte: registre BO na DP.',
    sinonimos: ['Boletim de Ocorrência'],
    relacionados: ['Delegacia', 'Polícia Militar'],
    categoria: 'Documentos'
  },
  {
    id: 'trafico-drogas',
    termo: 'Tráfico de Drogas na Escola',
    definicao: 'Venda organizada de substâncias ilícitas dentro ou no entorno escolar.',
    exemplo: 'Se identificar venda repetida, porte de grande quantidade ou envolvimento de facção: acione PM, Delegacia e CT. Proteja denunciante.',
    sinonimos: ['Venda de drogas', 'Boca de fumo'],
    relacionados: ['Uso Problemático de Substâncias', 'Polícia Militar', 'Conselho Tutelar'],
    observacoes: 'CRIME GRAVE. Diferenciar de uso pessoal (saúde) vs tráfico (segurança).',
    categoria: 'Situações Críticas'
  },
  {
    id: 'violencia-sexual',
    termo: 'Violência Sexual / Abuso Sexual',
    definicao: 'Qualquer ato sexual (com ou sem penetração) contra criança/adolescente, com ou sem violência física, inclusive dentro de relações familiares.',
    exemplo: 'Se estudante relata ser "tocado" por familiar, mostra desenhos sexuais explícitos ou tem comportamento sexual inadequado para idade: notifique CT, CREAS, UBS (laudo) e Delegacia imediatamente.',
    sinonimos: ['Estupro de vulnerável', 'Abuso intrafamiliar'],
    relacionados: ['Conselho Tutelar', 'CREAS', 'Disque 100', 'UPA (perícia)', 'Delegacia'],
    observacoes: 'NOTIFICAÇÃO OBRIGATÓRIA. Nunca confronte suspeito. Proteja criança.',
    categoria: 'Situações Críticas'
  },
  {
    id: 'acolhimento-inicial',
    termo: 'Acolhimento Inicial',
    definicao: 'Primeira escuta qualificada da situação, em local reservado, sem julgamento, feita por professor, coordenador ou direção.',
    exemplo: 'Estudante chega chorando relatando briga em casa. Leve para sala reservada, ouça, pergunte se há risco imediato, registre.',
    relacionados: ['Classificação de Risco', 'Escuta Qualificada', 'Professor Referência'],
    categoria: 'Fluxos e Protocolos'
  },
  {
    id: 'classificacao-risco',
    termo: 'Classificação de Risco (Baixo/Médio/Alto)',
    definicao: 'Avaliação do grau de urgência da situação para definir próximas ações.',
    exemplo: 'BAIXO: tristeza pontual, conflito leve. MÉDIO: repetição de problemas, sofrimento relevante. ALTO: risco à vida, violência severa.',
    relacionados: ['Acolhimento Inicial', 'Risco Iminente', 'Encaminhamento Externo'],
    observacoes: 'Se em dúvida, trate como mais grave.',
    categoria: 'Fluxos e Protocolos'
  },
  {
    id: 'risco-iminente',
    termo: 'Risco Iminente',
    definicao: 'Situação com perigo imediato à vida ou integridade física/psíquica (tentativa de suicídio em curso, agressão severa, ameaça de morte).',
    exemplo: 'Acione SAMU 192 ou leve à UPA/Hospital imediatamente. Não deixe estudante sozinho. Avise gestão e família.',
    sinonimos: ['Emergência', 'Risco de vida'],
    relacionados: ['SAMU', 'UPA', 'Crise Aguda', 'Polícia Militar'],
    categoria: 'Fluxos e Protocolos'
  },
  {
    id: 'encaminhamento-externo',
    termo: 'Encaminhamento Externo',
    definicao: 'Articulação formal da escola com serviços da rede (saúde, assistência, proteção) via ofício, telefone ou sistema.',
    exemplo: 'Use formulário do app para gerar ofício de encaminhamento para CAPS IJ, CRAS ou Conselho Tutelar com resumo do caso.',
    relacionados: ['Registro Formal', 'Ofício de Encaminhamento', 'CAPS IJ', 'CRAS', 'Conselho Tutelar'],
    categoria: 'Fluxos e Protocolos'
  },
  {
    id: 'notificacao-obrigatoria',
    termo: 'Notificação Obrigatória',
    definicao: 'Dever legal de comunicar ao Conselho Tutelar situações de violação de direitos de crianças e adolescentes (violência, negligência, exploração).',
    exemplo: 'Violência física, sexual, psicológica, negligência grave, trabalho infantil: notifique CT por escrito em até 24h.',
    sinonimos: ['Comunicação obrigatória'],
    relacionados: ['Conselho Tutelar', 'Violência Doméstica', 'Abuso Sexual', 'Negligência'],
    observacoes: 'ECA Art. 13 e 245. Omissão pode configurar crime.',
    categoria: 'Fluxos e Protocolos'
  },
  {
    id: 'registro-formal',
    termo: 'Registro Formal',
    definicao: 'Documentação escrita e datada de ocorrências, acolhimentos, encaminhamentos e acompanhamentos em sistema/ficha da escola.',
    exemplo: 'Após acolhimento, preencha ficha com data, horário, relato objetivo, classificação de risco e ações tomadas.',
    relacionados: ['Ficha de Acompanhamento', 'Ofício de Encaminhamento', 'Registro Interno'],
    categoria: 'Fluxos e Protocolos'
  },
  {
    id: 'registro-interno',
    termo: 'Registro Interno',
    definicao: 'Anotação de situações pedagógicas ou conflitos leves que não exigem encaminhamento externo, mas precisam ser monitorados.',
    exemplo: 'Estudante brigou verbalmente com colega, foi mediado, sem lesão. Registre em caderno da coordenação para acompanhar.',
    sinonimos: ['Anotação pedagógica'],
    relacionados: ['Mediação de Conflitos', 'Registro Formal'],
    categoria: 'Fluxos e Protocolos'
  },
  {
    id: 'devolutiva-familia',
    termo: 'Devolutiva à Família',
    definicao: 'Comunicação formal ou reunião com responsáveis para informar situação do estudante, ações tomadas e orientações.',
    exemplo: 'Após encaminhar para CAPS IJ, convide família para reunião, explique o encaminhamento, entregue cópia do ofício e oriente sobre agendamento.',
    sinonimos: ['Retorno para família', 'Comunicado aos pais'],
    relacionados: ['Acompanhamento de Caso', 'Reunião com Responsáveis'],
    categoria: 'Fluxos e Protocolos'
  },
  {
    id: 'acompanhamento-caso',
    termo: 'Acompanhamento de Caso',
    definicao: 'Monitoramento contínuo da evolução do estudante após encaminhamento ou intervenção, com reavaliações periódicas.',
    exemplo: 'Defina professor referência, agende revisões quinzenais, registre frequência, mudanças de comportamento e adesão aos serviços externos.',
    relacionados: ['Professor Referência', 'Ficha de Acompanhamento', 'Devolutiva'],
    categoria: 'Fluxos e Protocolos'
  },
  {
    id: 'mediacao-conflitos',
    termo: 'Mediação de Conflitos',
    definicao: 'Estratégia pedagógica para resolver brigas, desentendimentos ou bullying leve através de diálogo facilitado.',
    exemplo: 'Reúna estudantes envolvidos, gremistas ou professores. Facilite escuta mútua, acordos de convivência e acompanhamento.',
    sinonimos: ['Práticas Restaurativas', 'Círculo de Paz'],
    relacionados: ['Bullying', 'Registro Interno', 'Gremio Estudantil'],
    categoria: 'Fluxos e Protocolos'
  },
  {
    id: 'plano-apoio-pedagogico',
    termo: 'Plano de Apoio Pedagógico',
    definicao: 'Estratégias personalizadas para recuperação de aprendizagem de estudantes com defasagem, incluindo reforço, tutoria, adaptações.',
    exemplo: 'Estudante com defasagem idade-série: ofereça recuperação paralela, tutoria por pares, acompanhamento semanal.',
    relacionados: ['Defasagem Idade-Série', 'AEE', 'Professor Referência'],
    categoria: 'Pedagógico'
  },
  {
    id: 'reavaliacao',
    termo: 'Reavaliação de Caso',
    definicao: 'Reunião periódica da equipe para avaliar evolução do caso, ajustar plano de ação, intensificar ou encerrar acompanhamento.',
    exemplo: 'A cada 30 dias, coordenação + professor referência revisam: frequência melhorou? Serviço externo atendeu? Família aderiu?',
    relacionados: ['Acompanhamento de Caso', 'Ficha de Acompanhamento'],
    categoria: 'Fluxos e Protocolos'
  },
  {
    id: 'professor-referencia',
    termo: 'Professor Referência',
    definicao: 'Docente designado para acompanhar de perto um estudante em situação de vulnerabilidade, sendo ponte com família e rede.',
    exemplo: 'Coordenação indica professor com boa relação com estudante para fazer check-ins semanais, monitorar frequência e apoiar emocionalmente.',
    sinonimos: ['Professor tutor', 'Professor responsável'],
    relacionados: ['Acompanhamento de Caso', 'Coordenador Pedagógico'],
    categoria: 'Papéis Escolares'
  },
  {
    id: 'coordenador-pedagogico',
    termo: 'Coordenador Pedagógico',
    definicao: 'Profissional que lidera formação de professores, gestão curricular e articulação de casos pedagógicos e socioemocionais.',
    exemplo: 'Coordenador centraliza registros de casos, orienta professores em acolhimento e articula encaminhamentos com direção.',
    sinonimos: ['CP', 'Coordenação'],
    relacionados: ['Diretor', 'Professor Referência', 'AEE'],
    categoria: 'Papéis Escolares'
  },
  {
    id: 'diretor',
    termo: 'Diretor / Vice-Diretor',
    definicao: 'Gestores máximos da unidade escolar, responsáveis por decisões estratégicas, articulação com Diretoria de Ensino e rede externa.',
    exemplo: 'Em casos graves (violência com arma, abuso sexual, ameaça terrorista), direção decide acionamento de PM, CT e oficializa comunicações.',
    sinonimos: ['Direção', 'Gestão Escolar'],
    relacionados: ['Coordenador Pedagógico', 'Diretoria de Ensino'],
    categoria: 'Papéis Escolares'
  },
  {
    id: 'aee-professor',
    termo: 'Professor do AEE',
    definicao: 'Atendimento Educacional Especializado para estudantes com deficiência, transtornos globais do desenvolvimento ou altas habilidades.',
    exemplo: 'Articula adaptações curriculares, tecnologias assistivas, orientação a professores e famílias de estudantes com deficiência.',
    sinonimos: ['Professor de Educação Especial', 'AEE'],
    relacionados: ['Inclusão Escolar', 'Plano de Apoio Pedagógico'],
    categoria: 'Papéis Escolares'
  },
  {
    id: 'inspetor-alunos',
    termo: 'Inspetor de Alunos / Agente de Organização Escolar',
    definicao: 'Profissional que monitora pátio, portões, corredores e apoia na organização da rotina, muitas vezes sendo primeiro a identificar conflitos.',
    exemplo: 'Inspetor vê estudante chorando isolado no pátio e avisa coordenação para acolhimento.',
    sinonimos: ['Agente de Organização', 'Inspetor'],
    relacionados: ['Acolhimento Inicial', 'Mediação de Conflitos'],
    categoria: 'Papéis Escolares'
  },
  {
    id: 'gremio-estudantil',
    termo: 'Grêmio Estudantil',
    definicao: 'Organização autônoma de estudantes para representação, projetos culturais, esportivos e apoio a colegas.',
    exemplo: 'Envolva grêmio em mediação de conflitos entre pares, campanhas de prevenção a violência e acolhimento de novatos.',
    sinonimos: ['Grêmio'],
    relacionados: ['Mediação de Conflitos', 'CEU Ermelino'],
    categoria: 'Papéis Escolares'
  },
  {
    id: 'secretaria-escolar',
    termo: 'Secretaria Escolar',
    definicao: 'Setor administrativo responsável por matrículas, históricos, documentação, comunicação com famílias e registro oficial de transferências/evasão.',
    exemplo: 'Se estudante para de frequentar, secretaria registra abandono no sistema após esgotadas buscas ativas.',
    sinonimos: ['Secretaria'],
    relacionados: ['Busca Ativa', 'Evasão Escolar'],
    categoria: 'Papéis Escolares'
  },
  {
    id: 'diretoria-ensino',
    termo: 'Diretoria de Ensino Leste 1',
    definicao: 'Órgão regional da SEDUC-SP que coordena supervisão pedagógica, formação, programas estaduais e apoio a escolas da região.',
    exemplo: 'Escola pode acionar DE para formação em saúde mental, apoio em casos complexos ou conflitos graves internos.',
    sinonimos: ['DE', 'Diretoria Regional'],
    relacionados: ['Diretor', 'Programa Conviva SP'],
    categoria: 'Papéis Escolares'
  },
  {
    id: 'bullying',
    termo: 'Bullying',
    definicao: 'Agressões físicas, verbais ou psicológicas repetidas e intencionais contra estudante em situação de desvantagem de poder.',
    exemplo: 'Estudante é xingado diariamente por apelido pejorativo, excluído propositalmente ou agredido fisicamente. Registre, medie e acompanhe.',
    sinonimos: ['Assédio escolar', 'Intimidação'],
    relacionados: ['Cyberbullying', 'Mediação de Conflitos', 'Autolesão'],
    observacoes: 'Lei 13.185/2015. Diferenciar de conflito pontual.',
    categoria: 'Situações Críticas'
  },
  {
    id: 'cyberbullying',
    termo: 'Cyberbullying',
    definicao: 'Bullying via redes sociais, mensagens, grupos online (humilhação, exposição de fotos/vídeos íntimos, fake news).',
    exemplo: 'Estudante tem fotos íntimas vazadas em grupo de WhatsApp da turma. Acolha, registre, oriente família a preservar provas e acione CT + Delegacia.',
    sinonimos: ['Violência digital', 'Assédio online'],
    relacionados: ['Bullying', 'Violência Sexual', 'Delegacia'],
    categoria: 'Situações Críticas'
  },
  {
    id: 'evasao-escolar',
    termo: 'Evasão Escolar / Abandono',
    definicao: 'Ausência prolongada sem justificativa (>15 dias consecutivos ou >30% das aulas no bimestre) que pode levar à perda do vínculo escolar.',
    exemplo: 'Após 5 faltas injustificadas, inicie busca ativa: contato telefônico, visita domiciliar (se possível), ofício para CT se não localizar.',
    sinonimos: ['Abandono escolar', 'Infrequência crônica'],
    relacionados: ['Busca Ativa', 'Vulnerabilidade Social', 'Trabalho Infantil', 'Gravidez na Adolescência'],
    categoria: 'Situações Críticas'
  },
  {
    id: 'gravidez-adolescencia',
    termo: 'Gravidez na Adolescência',
    definicao: 'Gestação em estudantes <19 anos, exigindo adaptações escolares, pré-natal e apoio psicossocial.',
    exemplo: 'Ofereça flexibilização de horário, material pedagógico adaptado, encaminhe para UBS (pré-natal) e CRAS (benefícios). Evite constrangimento.',
    sinonimos: ['Gestação adolescente'],
    relacionados: ['UBS Ermelino', 'Pré-natal', 'CRAS', 'Evasão'],
    categoria: 'Situações Críticas'
  },
  {
    id: 'uso-problematico-substancias',
    termo: 'Uso Problemático de Substâncias',
    definicao: 'Consumo frequente de álcool, maconha, crack ou outras drogas que prejudica desempenho escolar, saúde e relações.',
    exemplo: 'Estudante chega alcoolizado, falta repetidamente, relata uso diário de maconha. Encaminhe CAPS AD, envolva família, evite punição isolada.',
    sinonimos: ['Dependência química', 'Uso de drogas'],
    relacionados: ['CAPS AD', 'Tráfico de Drogas', 'Vulnerabilidade Social'],
    categoria: 'Situações Críticas'
  },
  {
    id: 'violencia-domestica',
    termo: 'Violência Doméstica / Intrafamiliar',
    definicao: 'Agressões físicas, psicológicas, sexuais ou negligência praticadas por familiares ou pessoas do convívio doméstico.',
    exemplo: 'Estudante relata apanhar com cinto do pai, mostra hematomas, tem medo de ir para casa. Notifique CT, CREAS, oriente UBS para laudo.',
    sinonimos: ['Violência familiar'],
    relacionados: ['Conselho Tutelar', 'CREAS', 'Disque 100', 'Violência Sexual'],
    categoria: 'Situações Críticas'
  },
  {
    id: 'defasagem-idade-serie',
    termo: 'Defasagem Idade-Série',
    definicao: 'Distorção entre idade do estudante e ano escolar esperado (ex: 16 anos no 8º ano EF).',
    exemplo: 'Ofereça programas de aceleração, recuperação intensiva, acompanhamento pedagógico individualizado para evitar nova reprovação.',
    sinonimos: ['Distorção idade-série'],
    relacionados: ['Plano de Apoio Pedagógico', 'Evasão', 'Vulnerabilidade Social'],
    categoria: 'Pedagógico'
  },
  {
    id: 'aee-atendimento',
    termo: 'AEE - Atendimento Educacional Especializado',
    definicao: 'Serviço pedagógico complementar para estudantes com deficiência, transtornos globais ou altas habilidades, realizado em sala de recursos.',
    exemplo: 'Estudante com deficiência visual recebe AEE para aprender Braille, uso de lupa eletrônica e orientação de mobilidade.',
    sinonimos: ['Educação Especial', 'Sala de Recursos'],
    relacionados: ['Professor do AEE', 'Inclusão Escolar', 'Plano de Apoio'],
    categoria: 'Pedagógico'
  },
  {
    id: 'inclusao-escolar',
    termo: 'Inclusão Escolar',
    definicao: 'Garantia de acesso, permanência e aprendizagem de estudantes com deficiência, eliminando barreiras físicas, pedagógicas e atitudinais.',
    exemplo: 'Adapte provas, materiais, garanta acessibilidade arquitetônica e capacite equipe para eliminar preconceito (capacitismo).',
    relacionados: ['AEE', 'Professor do AEE', 'Acessibilidade'],
    categoria: 'Pedagógico'
  },
  {
    id: 'recuperacao-intensiva',
    termo: 'Recuperação Intensiva / Reforço Escolar',
    definicao: 'Aulas ou atividades extras para estudantes com dificuldades de aprendizagem ou defasagem.',
    exemplo: 'Ofereça contraturno, tutoria por pares, material de apoio, parcerias com voluntários ou programas da DE.',
    sinonimos: ['Reforço', 'Apoio pedagógico'],
    relacionados: ['Defasagem Idade-Série', 'Plano de Apoio Pedagógico'],
    categoria: 'Pedagógico'
  },
  {
    id: 'busca-ativa',
    termo: 'Busca Ativa',
    definicao: 'Estratégia de localizar e reengajar estudantes que pararam de frequentar, através de contato telefônico, visita domiciliar, parceria com ACS/CRAS.',
    exemplo: 'Após 10 faltas consecutivas, secretaria liga, coordenação agenda visita, envolve CT se não localizar ou houver resistência familiar.',
    relacionados: ['Evasão Escolar', 'Secretaria', 'Conselho Tutelar'],
    categoria: 'Pedagógico'
  },
  {
    id: 'programa-conviva-sp',
    termo: 'Programa Conviva SP',
    definicao: 'Iniciativa da SEDUC-SP para melhoria de clima escolar, prevenção de violência e formação socioemocional.',
    exemplo: 'Escola pode requisitar formações, materiais e apoio da equipe Conviva via Diretoria de Ensino.',
    relacionados: ['Diretoria de Ensino', 'Mediação de Conflitos', 'Bullying'],
    categoria: 'Pedagógico'
  },
  {
    id: 'ficha-acompanhamento',
    termo: 'Ficha de Acompanhamento',
    definicao: 'Documento interno (físico ou digital) para registrar evolução de casos ao longo do tempo.',
    exemplo: 'Registre datas de contatos, mudanças de comportamento, presença de responsáveis, adesão a encaminhamentos.',
    relacionados: ['Registro Formal', 'Acompanhamento de Caso'],
    categoria: 'Documentos'
  },
  {
    id: 'oficio-encaminhamento',
    termo: 'Ofício de Encaminhamento',
    definicao: 'Documento oficial da escola para rede externa, com cabeçalho, resumo do caso, solicitação e assinatura da direção.',
    exemplo: 'Gere via app ou Word: "A EE Ermelino Matarazzo encaminha estudante X para CAPS IJ em razão de cortes recorrentes e ideação suicida..."',
    relacionados: ['Encaminhamento Externo', 'Registro Formal'],
    categoria: 'Documentos'
  },
  {
    id: 'relatorio-caso',
    termo: 'Relatório de Caso',
    definicao: 'Documento detalhado sobre situação de estudante, incluindo histórico, ações tomadas, evolução e recomendações.',
    exemplo: 'Solicitado por CT, MP ou Vara da Infância. Coordenação consolida registros de professores, encaminhamentos e devolutivas da rede.',
    relacionados: ['Ficha de Acompanhamento', 'Ofício'],
    categoria: 'Documentos'
  },
  {
    id: 'termo-ciencia',
    termo: 'Termo de Ciência',
    definicao: 'Documento assinado por responsável atestando que foi informado sobre situação do estudante ou orientações da escola.',
    exemplo: 'Após reunião informando encaminhamento para CAPS IJ, responsável assina termo de ciência (2 vias: 1 escola, 1 família).',
    relacionados: ['Devolutiva à Família', 'Registro Formal'],
    categoria: 'Documentos'
  },
  {
    id: 'ata-reuniao',
    termo: 'Ata de Reunião',
    definicao: 'Registro formal de reuniões (conselhos, encontros com famílias, articulação com rede), com participantes, pauta e deliberações.',
    exemplo: 'Secretaria ou coordenação lavra ata de Conselho de Classe onde se decidiu plano de apoio para estudante X.',
    relacionados: ['Registro Formal', 'Conselho de Classe'],
    categoria: 'Documentos'
  },
  {
    id: 'salvar-rascunho',
    termo: 'Salvar Rascunho',
    definicao: 'Função do app para salvar registro incompleto e continuar depois, útil em situações de interrupção.',
    exemplo: 'Começou registro mas precisou atender urgência? Clique "Salvar Rascunho" e retome depois na aba "Rascunhos".',
    relacionados: ['Finalizar Registro', 'Dashboard'],
    categoria: 'Tecnologia/App'
  },
  {
    id: 'finalizar-registro',
    termo: 'Finalizar Registro',
    definicao: 'Concluir preenchimento de todos os campos obrigatórios e enviar registro para sistema, gerando número de protocolo.',
    exemplo: 'Após preencher situação, classificação, ações e encaminhamentos, clique "Finalizar". Não é possível editar após finalizar.',
    relacionados: ['Salvar Rascunho', 'Número de Protocolo'],
    categoria: 'Tecnologia/App'
  },
  {
    id: 'buscar-termo',
    termo: 'Buscar Termo (no Glossário)',
    definicao: 'Campo de busca para localizar rapidamente definições de termos, siglas e protocolos.',
    exemplo: 'Digite "CAPS" ou "notificar" para ver todos os termos relacionados.',
    relacionados: ['Filtrar por Categoria'],
    categoria: 'Tecnologia/App'
  },
  {
    id: 'arvore-decisoria',
    termo: 'Árvore Decisória',
    definicao: 'Fluxograma interativo do app que guia usuário passo a passo sobre o que fazer em cada tipo de situação.',
    exemplo: 'Clique "Iniciar Triagem", responda perguntas (há risco à vida? é violência? etc.) e receba orientação automática de encaminhamento.',
    relacionados: ['Classificação de Risco', 'Encaminhamento Externo'],
    categoria: 'Tecnologia/App'
  },
  {
    id: 'dashboard',
    termo: 'Dashboard / Painel de Controle',
    definicao: 'Tela inicial do app com visão geral de casos registrados, pendências, alertas e atalhos principais.',
    exemplo: 'Veja quantos casos abertos, quantos encaminhamentos pendentes, lembretes de reavaliação.',
    relacionados: ['Filtrar Casos', 'Relatórios'],
    categoria: 'Tecnologia/App'
  },
  {
    id: 'ceu-ermelino',
    termo: 'CEU Ermelino Matarazzo',
    definicao: 'Centro Educacional Unificado municipal com atividades culturais, esportivas e de lazer para comunidade.',
    exemplo: 'Indique estudantes em risco de evasão para oficinas e esportes no CEU como estratégia de vínculo e proteção.',
    relacionados: ['SCFV', 'Gremio Estudantil', 'Prevenção'],
    categoria: 'Rede Externa - Assistência Social'
  },
  {
    id: 'hospital-municipal',
    termo: 'Hospital Municipal Prof. Alpio Corrêa Netto',
    definicao: 'Hospital de alta complexidade 24h para internações, cirurgias e emergências graves.',
    exemplo: 'Casos que ultrapassam UPA (cirurgias, UTI, parto de risco) são atendidos no Hospital Municipal.',
    observacoes: 'Alameda R. de Brum, 1989.',
    relacionados: ['UPA', 'SAMU', 'Gestação Adolescente'],
    categoria: 'Rede Externa - Saúde Física'
  },
  {
    id: 'pre-natal-adolescente',
    termo: 'Pré-natal Adolescente',
    definicao: 'Acompanhamento médico gestacional para estudantes grávidas, realizado em UBS ou hospital.',
    exemplo: 'Encaminhe gestante para UBS para iniciar pré-natal. Coordene com professores flexibilização de atividades físicas.',
    relacionados: ['Gravidez na Adolescência', 'UBS Ermelino', 'Hospital Municipal'],
    categoria: 'Rede Externa - Saúde Física'
  },
  {
    id: 'acolhimento-institucional',
    termo: 'Acolhimento Institucional',
    definicao: 'Medida protetiva temporária de retirada de criança/adolescente da família e abrigamento em instituição, decidida judicialmente.',
    exemplo: 'Em situações extremas (risco de morte, família desaparecida), CT + Vara da Infância determinam acolhimento até resolução.',
    relacionados: ['Conselho Tutelar', 'Vara da Infância', 'Negligência Grave'],
    categoria: 'Rede Externa - Proteção/Justiça'
  },
  {
    id: 'medida-protetiva',
    termo: 'Medida Protetiva',
    definicao: 'Ações determinadas por CT ou Justiça para proteger criança/adolescente (afastamento do agressor, tratamento obrigatório, matrícula compulsória).',
    exemplo: 'Se pai agride mãe e filho presencia, CT pode determinar afastamento do agressor e acompanhamento familiar obrigatório.',
    relacionados: ['Conselho Tutelar', 'Violência Doméstica', 'Defensoria'],
    categoria: 'Rede Externa - Proteção/Justiça'
  },
  {
    id: 'conselho-classe',
    termo: 'Conselho de Classe',
    definicao: 'Reunião periódica de professores + gestão para avaliação coletiva de desempenho e situação de cada estudante.',
    exemplo: 'Use Conselho de Classe para identificar casos de defasagem, sofrimento psíquico ou risco de evasão e definir ações coletivas.',
    relacionados: ['Coordenador Pedagógico', 'Plano de Apoio', 'Professor Referência'],
    categoria: 'Pedagógico'
  },
  {
    id: 'reuniao-responsaveis',
    termo: 'Reunião com Responsáveis',
    definicao: 'Encontro entre escola e família para tratar de desempenho, comportamento ou situações específicas do estudante.',
    exemplo: 'Convoque responsáveis sempre que houver mudança significativa (piora súbita, encaminhamento externo, plano de apoio).',
    relacionados: ['Devolutiva à Família', 'Termo de Ciência'],
    categoria: 'Fluxos e Protocolos'
  },
  {
    id: 'escuta-qualificada',
    termo: 'Escuta Qualificada',
    definicao: 'Técnica de acolhimento que prioriza ouvir sem interromper, julgar ou dar soluções precipitadas, criando ambiente seguro.',
    exemplo: 'Faça perguntas abertas ("Como você está se sentindo?"), valide emoções ("Entendo que está difícil"), evite minimizar ("Não é nada").',
    relacionados: ['Acolhimento Inicial', 'Professor Referência'],
    categoria: 'Fluxos e Protocolos'
  },
  {
    id: 'numero-protocolo',
    termo: 'Número de Protocolo',
    definicao: 'Código único gerado pelo app ao finalizar registro, usado para rastreamento e referência em comunicações oficiais.',
    exemplo: 'Ao finalizar registro, anote número de protocolo e informe à família e serviços externos para facilitar acompanhamento.',
    relacionados: ['Finalizar Registro', 'Ofício de Encaminhamento'],
    categoria: 'Tecnologia/App'
  },
  {
    id: 'acessibilidade',
    termo: 'Acessibilidade',
    definicao: 'Conjunto de condições para garantir acesso e participação de pessoas com deficiência (rampas, intérprete de Libras, material adaptado).',
    exemplo: 'Escola deve ter rampas, banheiros adaptados, sinalização tátil, intérpretes de Libras e materiais em Braille quando necessário.',
    relacionados: ['Inclusão Escolar', 'AEE'],
    categoria: 'Pedagógico'
  }
];

export const searchGlossary = (query: string, terms: GlossaryTerm[]): GlossaryTerm[] => {
  const q = query.toLowerCase().trim();
  if (!q) return terms;

  const tokens = q.split(/\s+/).filter(Boolean);

  return terms.filter((item) => {
    const haystack = [
      item.termo,
      item.definicao,
      item.exemplo ?? '',
      item.observacoes ?? '',
      item.categoria,
      ...(item.sinonimos ?? []),
      ...(item.relacionados ?? [])
    ].join(' ').toLowerCase();

    return tokens.every(token => haystack.includes(token));
  });
};

export const filterByCategory = (category: string, terms: GlossaryTerm[]): GlossaryTerm[] => {
  if (category === 'Todas') return terms;
  return terms.filter(item => item.categoria === category);
};

export const GLOSSARY_CATEGORIES = Array.from(new Set(TECHNICAL_GLOSSARY.map(t => t.categoria)));
