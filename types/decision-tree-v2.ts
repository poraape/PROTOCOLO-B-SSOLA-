/**
 * Sistema de tipos V2 para árvore decisória hierárquica do Decisor.
 *
 * Estrutura em níveis:
 * 1) CRITICAL_TRIAGE
 * 2) RISK_ASSESSMENT
 * 3) CATEGORY
 * 4) SUBFLOW
 * 5) LEAF (terminal)
 */

/**
 * Níveis oficiais da árvore decisória V2.
 */
export type DecisionLevel =
  | 'CRITICAL_TRIAGE'
  | 'RISK_ASSESSMENT'
  | 'CATEGORY'
  | 'SUBFLOW'
  | 'LEAF';

/**
 * Classificação simplificada de risco para triagem e encaminhamento.
 */
export type RiskClassification = 'BAIXO' | 'MODERADO' | 'ALTO' | 'EMERGENCIAL';

/**
 * Níveis de urgência operacional para ações e contatos.
 */
export type UrgencyLevel = 'IMMEDIATE' | 'URGENT' | 'SCHEDULED';

/**
 * Perfis de gestão escolar acionáveis no desfecho final.
 */
export type ManagementRole = 'DIRECAO' | 'VICE_DIRECAO' | 'COORDENACAO';

/**
 * Momento recomendado para comunicação à gestão escolar.
 */
export type ManagementNotificationTiming = 'IMEDIATO' | 'MESMO_DIA' | 'CIENCIA';

/**
 * Instrumentos oficiais de registro disponíveis no protocolo.
 */
export type LeafInstrumentId = 'anexo-i' | 'anexo-ii' | 'anexo-iii';

/**
 * Contrato base obrigatório para todos os nós da árvore V2.
 */
export interface BaseNode {
  /** Identificador único do nó. */
  id: string;
  /** Nível hierárquico do nó na árvore V2. */
  level: DecisionLevel;
  /** Marcação para nós obsoletos durante migração entre versões. */
  deprecated?: boolean;
  /**
   * Indica nós cosméticos (ex.: pré-passos sem valor decisório)
   * para simplificação de fluxo.
   */
  isCosmeticNode?: boolean;
}

/**
 * Opção binária da triagem crítica inicial.
 */
export interface CriticalTriageOption {
  /** Resposta padronizada da triagem crítica. */
  label: 'SIM' | 'NÃO';
  /** Próximo nó a ser acessado após seleção da opção. */
  nextNodeId: string;
  /** Indica se a opção dispara rota emergencial imediata. */
  isEmergency?: boolean;
}

/**
 * Nó inicial obrigatório de triagem crítica de risco imediato.
 */
export interface CriticalTriageNode extends BaseNode {
  level: 'CRITICAL_TRIAGE';
  /** Pergunta principal objetiva (máximo recomendado: 120 caracteres). */
  question: string;
  /** Opções binárias obrigatórias: SIM/NÃO. */
  options: CriticalTriageOption[];
}

/**
 * Opção de resposta em pergunta de avaliação de risco.
 */
export interface RiskAssessmentOption {
  /** Texto da opção de resposta. */
  label: string;
  /** Próximo nó após a seleção. */
  nextNodeId: string;
  /** Peso opcional para cálculo automático de risco agregado. */
  riskWeight?: number;
}

/**
 * Nó de avaliação estruturada de gravidade.
 *
 * Regra: deve compor sequência fixa de 5 perguntas.
 */
export interface RiskAssessmentNode extends BaseNode {
  level: 'RISK_ASSESSMENT';
  /** Pergunta objetiva de avaliação de gravidade. */
  question: string;
  /** Posição da pergunta na sequência obrigatória de 1 a 5. */
  questionNumber: 1 | 2 | 3 | 4 | 5;
  /** Total fixo de perguntas de avaliação de risco. */
  totalQuestions: 5;
  /** Opções da pergunta, com possibilidade de peso de risco. */
  options: RiskAssessmentOption[];
  /** Texto de ajuda opcional para tooltip contextual. */
  helpText?: string;
}

/**
 * Item de categoria principal apresentado ao usuário.
 */
export interface CategoryItem {
  /** Identificador da categoria (ex.: emocional, violencia). */
  id: string;
  /** Rótulo visível da categoria. */
  label: string;
  /** Ícone em emoji para reforço visual rápido. */
  icon: string;
  /** Próximo nó após escolha da categoria. */
  nextNodeId: string;
  /** Exemplos de sinais/situações para ajudar a escolha. */
  examples?: string[];
  /** Indica que deve pular nó intermediário cosmético da categoria. */
  skipIntermediateNode?: boolean;
}

/**
 * Nó de seleção de categoria principal da demanda.
 */
export interface CategoryNode extends BaseNode {
  level: 'CATEGORY';
  /** Pergunta principal de escolha da categoria. */
  question: string;
  /** Lista de categorias disponíveis para roteamento. */
  categories: CategoryItem[];
}

/**
 * Opção de resposta de subfluxo por categoria.
 */
export interface SubflowOption {
  /** Texto da opção de resposta. */
  label: string;
  /** Próximo nó após seleção da opção. */
  nextNodeId: string;
}

/**
 * Nó de pergunta específica dentro de um subfluxo categórico.
 */
export interface SubflowNode extends BaseNode {
  level: 'SUBFLOW';
  /** Categoria à qual o subfluxo pertence. */
  categoryId: string;
  /** Pergunta específica para discriminar o encaminhamento. */
  question: string;
  /** Opções de resposta do subfluxo. */
  options: SubflowOption[];
  /** Número da pergunta no subfluxo (opcional). */
  questionNumber?: number;
  /** Total de perguntas previstas no subfluxo (opcional). */
  totalQuestions?: number;
}

/**
 * Bloco obrigatório de ações primárias no leaf.
 */
export interface LeafPrimaryActions {
  /** Título do bloco de ação primária. */
  title: string;
  /** Lista de ações executáveis em ordem operacional. */
  actions: string[];
  /** Urgência do bloco de ação. */
  urgencyLevel: UrgencyLevel;
}

/**
 * Serviço de contato acionável no resultado final.
 */
export interface LeafContactServiceRef {
  /** ID do serviço no catálogo oficial (ex.: content/protocolData.ts). */
  serviceId: string;
  /** Nota opcional para contexto específico do leaf. */
  note?: string;
  /** Urgência esperada para acionar este serviço. */
  urgency: UrgencyLevel;
}

/**
 * Bloco obrigatório de contatos do leaf.
 */
export interface LeafContactTargets {
  /** Título do bloco de contatos. */
  title: string;
  /** Serviços acionáveis relacionados ao caso. */
  services: LeafContactServiceRef[];
}


/**
 * Comunicação de gestão obrigatória em todos os leafs V2.
 */
export interface LeafManagementNotification {
  /** Se a gestão deve ser comunicada para o desfecho. */
  required: boolean;
  /** Momento esperado da comunicação. */
  timing: ManagementNotificationTiming;
  /** Papéis de gestão a serem acionados. */
  roles: ManagementRole[];
  /** Mensagem curta pronta para disparo interno. */
  message?: string;
}

/**
 * Bloco obrigatório de registro institucional.
 */
export interface LeafRecordingRequirement {
  /** Título do bloco de registro. */
  title: string;
  /** Instruções objetivas de registro formal. */
  instructions: string[];
  /** Sistema de registro quando definido para o caso. */
  system?: 'CONVIVA' | 'OUTRO';
}

/**
 * Bloco obrigatório de acompanhamento pós-ação.
 */
export interface LeafFollowUp {
  /** Título do bloco de acompanhamento. */
  title: string;
  /** Frequência de monitoramento (ex.: diário, semanal). */
  frequency: string;
  /** Prazo para o próximo marco de acompanhamento. */
  deadline: string;
  /** Responsável pelo acompanhamento, quando definido. */
  responsible?: string;
}

/**
 * Conteúdo secundário opcional: ações proibidas.
 */
export interface LeafForbiddenActions {
  /** Título do bloco de ações proibidas. */
  title: string;
  /** Itens que não devem ser executados. */
  items: string[];
}

/**
 * Conteúdo secundário opcional: cenário de exemplo.
 */
export interface LeafExampleScenario {
  /** Título do bloco de exemplo. */
  title: string;
  /** Identificador de cenário catalogado. */
  scenarioId: string;
}

/**
 * Conteúdo secundário opcional: base legal resumida.
 */
export interface LeafLegalBasis {
  /** Título do bloco de base legal. */
  title: string;
  /** Referências normativas aplicáveis. */
  references: string[];
}

/**
 * Estrutura opcional de conteúdo secundário no nó terminal.
 */
export interface LeafSecondaryContent {
  forbiddenActions?: LeafForbiddenActions;
  exampleScenario?: LeafExampleScenario;
  legalBasis?: LeafLegalBasis;
}

/**
 * Nó terminal (resultado final) da árvore decisória.
 *
 * Regra: não possui nextNodeId, pois encerra o fluxo.
 */
export interface LeafNode extends BaseNode {
  level: 'LEAF';
  /** Classificação simplificada de risco do desfecho. */
  riskClassification: RiskClassification;
  /** Bloco obrigatório de ações primárias. */
  primaryActions: LeafPrimaryActions;
  /** Bloco obrigatório de contatos e encaminhamentos. */
  contactTargets: LeafContactTargets;
  /** Política obrigatória de comunicação com gestão escolar. */
  managementNotification: LeafManagementNotification;
  /** Instrumentos obrigatórios que devem ser utilizados no desfecho. */
  instruments: LeafInstrumentId[];
  /** Bloco obrigatório de registro institucional. */
  recordingRequirement: LeafRecordingRequirement;
  /** Bloco obrigatório de acompanhamento. */
  followUp: LeafFollowUp;
  /** Conteúdo secundário opcional de apoio à execução. */
  secondaryContent?: LeafSecondaryContent;
}

/**
 * Nó legado para migração assistida entre árvore antiga e V2.
 */
export interface LegacyNode {
  /** ID do nó legado. */
  id: string;
  /** Marca obrigatória de obsolescência. */
  deprecated: true;
  /** ID do nó equivalente na nova árvore. */
  redirectTo: string;
  /** Motivo da substituição/migração. */
  reason: string;
}

/**
 * União de todos os tipos de nó aceitos pela árvore V2.
 */
export type DecisionNode =
  | CriticalTriageNode
  | RiskAssessmentNode
  | CategoryNode
  | SubflowNode
  | LeafNode
  | LegacyNode;

/**
 * Estrutura completa da árvore decisória V2.
 */
export interface DecisionTreeV2 {
  /** Versão semântica da árvore (ex.: 2.0.0). */
  version: string;
  /** ID do nó raiz. Regra: deve apontar para nó CRITICAL_TRIAGE. */
  rootNodeId: string;
  /** Mapa indexado de nós por ID. */
  nodes: Record<string, DecisionNode>;
}
