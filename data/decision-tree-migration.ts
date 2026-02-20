import type { DecisionTreeV2, LegacyNode } from '../types/decision-tree-v2';

const legacyCategoryNodes: Record<string, LegacyNode> = {
  cat_saude_emocional: {
    id: 'cat_saude_emocional',
    deprecated: true,
    redirectTo: 'EMOCIONAL_SUBFLOW_Q1',
    reason: 'Nó cosmético eliminado (apenas botão Continuar)'
  },
  cat_violencia_direitos: {
    id: 'cat_violencia_direitos',
    deprecated: true,
    redirectTo: 'VIOLENCIA_SUBFLOW_Q1',
    reason: 'Nó cosmético eliminado'
  },
  cat_vulnerabilidade_social: {
    id: 'cat_vulnerabilidade_social',
    deprecated: true,
    redirectTo: 'VULNERABILIDADE_SUBFLOW_Q1',
    reason: 'Nó cosmético eliminado'
  },
  cat_pedagogico: {
    id: 'cat_pedagogico',
    deprecated: true,
    redirectTo: 'PEDAGOGICO_SUBFLOW_Q1',
    reason: 'Nó cosmético eliminado'
  },
  cat_saude_fisica: {
    id: 'cat_saude_fisica',
    deprecated: true,
    redirectTo: 'SAUDE_FISICA_SUBFLOW_Q1',
    reason: 'Nó cosmético eliminado'
  },
  cat_substancias: {
    id: 'cat_substancias',
    deprecated: true,
    redirectTo: 'SUBSTANCIAS_SUBFLOW_Q1',
    reason: 'Nó cosmético eliminado'
  },
  cat_gravidez: {
    id: 'cat_gravidez',
    deprecated: true,
    redirectTo: 'GRAVIDEZ_SUBFLOW_Q1',
    reason: 'Nó cosmético eliminado'
  },
  cat_inclusao: {
    id: 'cat_inclusao',
    deprecated: true,
    redirectTo: 'INCLUSAO_SUBFLOW_Q1',
    reason: 'Nó cosmético eliminado'
  },
  cat_nao_sei_apoio: {
    id: 'cat_nao_sei_apoio',
    deprecated: true,
    redirectTo: 'SOFRIMENTO_EPISODICO_LEAF',
    reason: 'Nó cosmético eliminado'
  }
};

export const decisionTreeV2: DecisionTreeV2 = {
  version: '2.0.0',
  rootNodeId: 'CRITICAL_TRIAGE_ROOT',
  nodes: {
    CRITICAL_TRIAGE_ROOT: {
      id: 'CRITICAL_TRIAGE_ROOT',
      level: 'CRITICAL_TRIAGE',
      question: 'Há risco IMEDIATO de vida ou integridade física?',
      options: [
        { label: 'SIM', nextNodeId: 'EMERGENCY_LEAF', isEmergency: true },
        { label: 'NÃO', nextNodeId: 'RISK_ASSESS_Q1' }
      ]
    },

    EMERGENCY_LEAF: {
      id: 'EMERGENCY_LEAF',
      level: 'LEAF',
      riskClassification: 'EMERGENCIAL',
      primaryActions: {
        title: '🆘 O QUE FAZER AGORA',
        actions: [
          'Afaste a pessoa do perigo imediato',
          'Acione IMEDIATAMENTE o serviço de emergência abaixo',
          'NÃO deixe a pessoa sozinha',
          'Informe a direção e a família'
        ],
        urgencyLevel: 'IMMEDIATE'
      },
      contactTargets: {
        title: 'Contatos emergenciais',
        services: [
          { name: 'SAMU', phone: '192', urgency: 'IMMEDIATE' },
          { name: 'Corpo de Bombeiros', phone: '193', urgency: 'IMMEDIATE' },
          { name: 'Polícia Militar', phone: '190', urgency: 'IMMEDIATE' }
        ]
      },
      recordingRequirement: {
        title: 'Registro mínimo obrigatório',
        instructions: ['Registrar horário, local e pessoas presentes.', 'Documentar serviço acionado e protocolo recebido.'],
        system: 'OUTRO'
      },
      followUp: {
        title: 'Acompanhamento pós-crise',
        frequency: 'Diário nos 3 primeiros dias úteis',
        deadline: 'Revisão formal em até 24h',
        responsible: 'Direção e coordenação'
      }
    },

    RISK_ASSESS_Q1: {
      id: 'RISK_ASSESS_Q1',
      level: 'RISK_ASSESSMENT',
      question: 'O evento está acontecendo AGORA (em curso)?',
      helpText: 'Situação em curso exige resposta mais rápida e priorização da segurança imediata.',
      questionNumber: 1,
      totalQuestions: 5,
      options: [
        { label: 'SIM', nextNodeId: 'RISK_ASSESS_Q2', riskWeight: 3 },
        { label: 'NÃO', nextNodeId: 'RISK_ASSESS_Q2', riskWeight: 0 },
        { label: 'NÃO SEI', nextNodeId: 'RISK_ASSESS_Q2', riskWeight: 1 }
      ]
    },
    RISK_ASSESS_Q2: {
      id: 'RISK_ASSESS_Q2',
      level: 'RISK_ASSESSMENT',
      question: 'Envolve criança/adolescente como vítima de violência?',
      questionNumber: 2,
      totalQuestions: 5,
      options: [
        { label: 'SIM', nextNodeId: 'RISK_ASSESS_Q3', riskWeight: 2 },
        { label: 'NÃO', nextNodeId: 'RISK_ASSESS_Q3', riskWeight: 0 },
        { label: 'NÃO SEI', nextNodeId: 'RISK_ASSESS_Q3', riskWeight: 1 }
      ]
    },
    RISK_ASSESS_Q3: {
      id: 'RISK_ASSESS_Q3',
      level: 'RISK_ASSESSMENT',
      question: 'Há objeto perigoso, substância ou arma envolvida?',
      questionNumber: 3,
      totalQuestions: 5,
      options: [
        { label: 'SIM', nextNodeId: 'RISK_ASSESS_Q4', riskWeight: 2 },
        { label: 'NÃO', nextNodeId: 'RISK_ASSESS_Q4', riskWeight: 0 },
        { label: 'NÃO SEI', nextNodeId: 'RISK_ASSESS_Q4', riskWeight: 1 }
      ]
    },
    RISK_ASSESS_Q4: {
      id: 'RISK_ASSESS_Q4',
      level: 'RISK_ASSESSMENT',
      question: 'A situação é recorrente (já aconteceu antes)?',
      questionNumber: 4,
      totalQuestions: 5,
      options: [
        { label: 'SIM', nextNodeId: 'RISK_ASSESS_Q5', riskWeight: 1 },
        { label: 'NÃO', nextNodeId: 'RISK_ASSESS_Q5', riskWeight: 0 },
        { label: 'NÃO SEI', nextNodeId: 'RISK_ASSESS_Q5', riskWeight: 1 }
      ]
    },
    RISK_ASSESS_Q5: {
      id: 'RISK_ASSESS_Q5',
      level: 'RISK_ASSESSMENT',
      question: 'Há sofrimento visível intenso ou impacto severo?',
      questionNumber: 5,
      totalQuestions: 5,
      options: [
        { label: 'SIM', nextNodeId: 'CATEGORY_SELECT', riskWeight: 2 },
        { label: 'NÃO', nextNodeId: 'CATEGORY_SELECT', riskWeight: 0 },
        { label: 'NÃO SEI', nextNodeId: 'CATEGORY_SELECT', riskWeight: 1 }
      ]
    },

    CATEGORY_SELECT: {
      id: 'CATEGORY_SELECT',
      level: 'CATEGORY',
      question: 'Qual categoria melhor descreve a demanda principal?',
      categories: [
        {
          id: 'emocional',
          label: 'Emocional / Saúde Mental',
          icon: '🧠',
          nextNodeId: 'EMOCIONAL_SUBFLOW_Q1',
          examples: ['Fala de morte', 'Tristeza persistente', 'Isolamento intenso'],
          skipIntermediateNode: true
        },
        { id: 'violencia', label: 'Violência e proteção', icon: '🛡️', nextNodeId: 'VIOLENCIA_SUBFLOW_Q1', examples: ['Agressão', 'Abuso', 'Ameaça'], skipIntermediateNode: true },
        { id: 'vulnerabilidade', label: 'Vulnerabilidade social', icon: '🏠', nextNodeId: 'VULNERABILIDADE_SUBFLOW_Q1', examples: ['Fome', 'Negligência', 'Moradia precária'], skipIntermediateNode: true },
        { id: 'pedagogico', label: 'Pedagógico', icon: '📚', nextNodeId: 'PEDAGOGICO_SUBFLOW_Q1', examples: ['Queda de rendimento', 'Faltas', 'Defasagem'], skipIntermediateNode: true },
        { id: 'saude_fisica', label: 'Saúde física', icon: '🏥', nextNodeId: 'SAUDE_FISICA_SUBFLOW_Q1', examples: ['Dor intensa', 'Febre alta', 'Mal-estar'], skipIntermediateNode: true },
        { id: 'substancias', label: 'Substâncias', icon: '💊', nextNodeId: 'SUBSTANCIAS_SUBFLOW_Q1', examples: ['Uso suspeito', 'Intoxicação', 'Comportamento alterado'], skipIntermediateNode: true },
        { id: 'gravidez', label: 'Gravidez', icon: '🤰', nextNodeId: 'GRAVIDEZ_SUBFLOW_Q1', examples: ['Suspeita de gestação', 'Pré-natal', 'Apoio escolar'], skipIntermediateNode: true },
        { id: 'inclusao', label: 'Inclusão e acessibilidade', icon: '♿', nextNodeId: 'INCLUSAO_SUBFLOW_Q1', examples: ['Barreira de acesso', 'Necessidade de AEE', 'Adaptação curricular'], skipIntermediateNode: true },
        { id: 'nao_sei', label: 'Não sei classificar', icon: '❓', nextNodeId: 'SOFRIMENTO_EPISODICO_LEAF', examples: ['Caso ambíguo', 'Informação incompleta'], skipIntermediateNode: true }
      ]
    },

    EMOCIONAL_SUBFLOW_Q1: {
      id: 'EMOCIONAL_SUBFLOW_Q1',
      level: 'SUBFLOW',
      categoryId: 'emocional',
      question: 'O aluno mencionou querer se machucar ou morrer?',
      questionNumber: 1,
      totalQuestions: 3,
      options: [
        { label: 'SIM', nextNodeId: 'SUICIDIO_LEAF' },
        { label: 'NÃO', nextNodeId: 'EMOCIONAL_SUBFLOW_Q2' },
        { label: 'NÃO SEI', nextNodeId: 'EMOCIONAL_SUBFLOW_Q2' }
      ]
    },
    EMOCIONAL_SUBFLOW_Q2: {
      id: 'EMOCIONAL_SUBFLOW_Q2',
      level: 'SUBFLOW',
      categoryId: 'emocional',
      question: 'Há marcas visíveis de autolesão?',
      questionNumber: 2,
      totalQuestions: 3,
      options: [
        { label: 'SIM', nextNodeId: 'AUTOLESAO_LEAF' },
        // Colapsado: opções "NÃO" e "NÃO SEI" não alteravam desfecho imediato
        { label: 'NÃO ou NÃO SEI', nextNodeId: 'EMOCIONAL_SUBFLOW_Q3' }
      ]
    },
    EMOCIONAL_SUBFLOW_Q3: {
      id: 'EMOCIONAL_SUBFLOW_Q3',
      level: 'SUBFLOW',
      categoryId: 'emocional',
      question: 'Padrão de tristeza/isolamento há mais de 2 semanas?',
      questionNumber: 3,
      totalQuestions: 3,
      options: [
        { label: 'SIM', nextNodeId: 'SOFRIMENTO_PERSISTENTE_LEAF' },
        { label: 'NÃO', nextNodeId: 'SOFRIMENTO_EPISODICO_LEAF' }
      ]
    },

    SUICIDIO_LEAF: {
      id: 'SUICIDIO_LEAF',
      level: 'LEAF',
      riskClassification: 'ALTO',
      primaryActions: {
        title: '🚨 AÇÃO IMEDIATA EM RISCO DE SUICÍDIO',
        actions: [
          'Não deixe o estudante sozinho em nenhum momento.',
          'Retire discretamente objetos cortantes, medicamentos ou cordas do alcance.',
          'Acione imediatamente direção/coordenação e responsável legal.',
          'Se houver tentativa em curso, ligue SAMU 192 agora.'
        ],
        urgencyLevel: 'IMMEDIATE'
      },
      contactTargets: {
        title: 'Rede prioritária de cuidado',
        services: [
          { name: 'SAMU', phone: '192', urgency: 'IMMEDIATE' },
          {
            name: 'CAPS IJ Ermelino Matarazzo',
            phone: '(11) 3294-3828',
            address: 'R. Ahmad El Hind, 107 - São Paulo/SP',
            hours: 'Seg a Sex, 7h às 19h',
            urgency: 'URGENT'
          }
        ]
      },
      recordingRequirement: {
        title: 'Registro restrito obrigatório',
        instructions: [
          'Preencher ficha restrita com horário, fala literal e ações adotadas.',
          'Registrar quem acionou família, gestão e serviço de saúde.'
        ],
        system: 'CONVIVA'
      },
      followUp: {
        title: 'Plano de acompanhamento',
        frequency: 'Monitoramento semanal estruturado',
        deadline: 'Reavaliação em 7 dias',
        responsible: 'Professor referência + coordenação'
      },
      secondaryContent: {
        forbiddenActions: {
          title: 'Condutas proibidas',
          items: ['NÃO prometa sigilo absoluto.', 'NÃO minimize frases de morte.', 'NÃO confronte o estudante em público.']
        },
        exampleScenario: {
          title: 'Cenário de referência',
          scenarioId: 'C02'
        },
        legalBasis: {
          title: 'Base legal',
          references: ['ECA Art. 13', 'Lei 13.819/2019']
        }
      }
    },

    AUTOLESAO_LEAF: {
      id: 'AUTOLESAO_LEAF',
      level: 'LEAF',
      riskClassification: 'ALTO',
      primaryActions: {
        title: 'Conduta para sinais de autolesão',
        actions: ['Acolher em local reservado com adulto de referência.', 'Acionar gestão e responsável legal no mesmo turno.', 'Encaminhar para avaliação em CAPS IJ.'],
        urgencyLevel: 'URGENT'
      },
      contactTargets: {
        title: 'Encaminhamento prioritário',
        services: [
          {
            name: 'CAPS IJ Ermelino Matarazzo',
            phone: '(11) 3294-3828',
            address: 'R. Ahmad El Hind, 107 - São Paulo/SP',
            urgency: 'URGENT'
          }
        ]
      },
      recordingRequirement: {
        title: 'Registro institucional',
        instructions: ['Registrar sinais observados sem julgamento.', 'Anotar encaminhamentos e responsáveis acionados.'],
        system: 'CONVIVA'
      },
      followUp: {
        title: 'Acompanhamento escolar',
        frequency: 'Semanal',
        deadline: 'Primeira devolutiva em 5 dias úteis',
        responsible: 'Coordenação pedagógica'
      }
    },

    SOFRIMENTO_PERSISTENTE_LEAF: {
      id: 'SOFRIMENTO_PERSISTENTE_LEAF',
      level: 'LEAF',
      riskClassification: 'MODERADO',
      primaryActions: {
        title: 'Sofrimento persistente com impacto funcional',
        actions: ['Realizar escuta qualificada breve.', 'Acionar família para avaliação em UBS/CAPS IJ.', 'Definir plano de apoio pedagógico e convivência.'],
        urgencyLevel: 'URGENT'
      },
      contactTargets: {
        title: 'Rede de cuidado',
        services: [
          {
            name: 'CAPS IJ Ermelino Matarazzo',
            phone: '(11) 3294-3828',
            address: 'R. Ahmad El Hind, 107 - São Paulo/SP',
            urgency: 'URGENT'
          },
          { name: 'UBS Ermelino Matarazzo', phone: '(11) 2545-8235', urgency: 'SCHEDULED' }
        ]
      },
      recordingRequirement: {
        title: 'Registro e plano',
        instructions: ['Registrar sinais observados e impacto escolar.', 'Registrar plano de acompanhamento e data de revisão.'],
        system: 'CONVIVA'
      },
      followUp: {
        title: 'Monitoramento',
        frequency: 'Quinzenal',
        deadline: 'Revisão de plano em 15 dias',
        responsible: 'Coordenação + professor referência'
      }
    },

    SOFRIMENTO_EPISODICO_LEAF: {
      id: 'SOFRIMENTO_EPISODICO_LEAF',
      level: 'LEAF',
      riskClassification: 'BAIXO',
      primaryActions: {
        title: 'Sofrimento episódico sem risco imediato',
        actions: ['Oferecer acolhimento breve e escuta ativa.', 'Combinar observação com docente de referência.', 'Orientar retorno se houver piora.'],
        urgencyLevel: 'SCHEDULED'
      },
      contactTargets: {
        title: 'Apoio de rotina',
        services: [
          { name: 'UBS Ermelino Matarazzo', phone: '(11) 2545-8235', urgency: 'SCHEDULED' }
        ]
      },
      recordingRequirement: {
        title: 'Registro básico',
        instructions: ['Registrar acolhimento realizado.', 'Marcar revisão com equipe escolar.'],
        system: 'CONVIVA'
      },
      followUp: {
        title: 'Revisão breve',
        frequency: 'Semanal',
        deadline: 'Revisão em 7 dias',
        responsible: 'Professor referência'
      }
    },

    ...legacyCategoryNodes
  }
};
