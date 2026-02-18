export type ProtocolRiskLevel = 'BAIXO' | 'MÉDIO' | 'ALTO' | 'EMERGENCIAL';
export type ActionPriority = 'IMEDIATA' | 'URGENTE' | 'ORIENTAÇÃO';
export type ServiceType = 'EMERGENCIAL' | 'GESTAO' | 'SAUDE' | 'PROTECAO' | 'APOIO';

export type RiskLevel = 'EMERGENCIA' | 'ALTA_PRIORIDADE' | 'APOIO_INSTITUCIONAL' | 'OUTROS';
export type RiskLevelV2 = 'BAIXO' | 'MEDIO' | 'ALTO';

export type ReferralType =
  | 'EMERGENCIA'
  | 'CAPS'
  | 'UBS'
  | 'CONSELHO_TUTELAR'
  | 'GESTAO_ESCOLAR'
  | 'CRAS_CREAS'
  | 'OUTROS';

export type DecisionCategory =
  | 'EMOCIONAL_COMPORTAMENTO'
  | 'VIOLACAO_DIREITOS_VIOLENCIA'
  | 'VULNERABILIDADE_SOCIAL_FAMILIAR'
  | 'CONVIVENCIA_CONFLITOS'
  | 'DIFICULDADE_PEDAGOGICA'
  | 'SAUDE_FISICA'
  | 'NAO_SEI';

export type ServiceTarget =
  | 'EMERGENCIA_192_193'
  | 'UPA_HOSPITAL'
  | 'UBS'
  | 'CAPS_IJ'
  | 'CAPS_ADULTO'
  | 'CONSELHO_TUTELAR'
  | 'CRAS'
  | 'CREAS'
  | 'GESTAO_ESCOLAR'
  | 'OUTROS';

export interface RecordRequirement {
  system: 'CONVIVA' | 'OUTRO' | 'NENHUM';
  due: string;
  notes?: string;
}

export interface SourceRef {
  label: string;
  filePath?: string;
  section?: string;
}

export interface FlowOption {
  label: string;
  nextNodeId: string;
  categoryId?: 'emocional' | 'violencia' | 'vulnerabilidade' | 'convivencia' | 'pedagogico' | 'saude_fisica' | 'duvida';
}


export interface ContactTarget {
  serviceId: string;
  channel?: 'telefone' | 'presencial' | 'institucional';
}

export interface SourceReference {
  label: string;
  filePath?: string;
  section?: string;
}

export interface FlowNode {
  id: string;
  question: string;
  options: FlowOption[];
  isLeaf?: boolean;
  riskLevel?: ProtocolRiskLevel;
  category?: 'SAÚDE' | 'SOCIAL' | 'DIREITOS_SGD' | 'EDUCAÇÃO' | 'EMERGÊNCIA' | DecisionCategory;
  tags?: string[];
  guidance?: string[];
  severityCriteria?: string[];
  serviceIds?: string[];
  forbiddenActions?: string[];
  fallbackNextNodeId?: string;
  helperText?: string;
  indicators?: string[];
  doNow?: string[];
  contactTargets?: ServiceTarget[] | ContactTarget[];
  deadline?: string;
  recordRequired?: RecordRequirement[];
  sourceRef?: SourceRef;
  notes?: string;
  escalationRule?: 'SE_DUVIDA_ESCALE';
  serviceCharacterization?: string[];
  referralType?: ReferralType;
  actionPriority?: ActionPriority;
  primaryServiceIds?: string[];
  secondaryServiceIds?: string[];
  notifyManagement?: boolean;
  actionSummary?: string;
  whatToDoNow?: string;
  whyThisService?: string;
}

export interface Service {
  id: string;
  name: string;
  category: 'SAÚDE' | 'SOCIAL' | 'DIREITOS_SGD' | 'EDUCAÇÃO' | 'EMERGÊNCIA';
  address: string;
  phone: string;
  hours?: string;
  coverage?: string;
  notes?: string;
  officialSource?: string;
  verifiedAt?: string;
  verifiedBy?: string;
  type: ServiceType;
  targetType?: ServiceTarget;
  phones?: string[];
  howToCall?: string;
  sourceOfficial?: string;
  coordinates?: { lat: number; lng: number };
  riskLevel?: RiskLevel;
  strategicDescription?: string;
  geoStatus?: 'VERIFICADO' | 'PENDENTE';
}

export interface NetworkService {
  id: string;
  name: string;
  category: string;
  phone?: string;
  address?: string;
  riskLevel: RiskLevel;
  strategicDescription?: string;
}

export interface DocumentTemplate {
  id: string;
  title: string;
  annex: 'Anexo I' | 'Anexo II';
  purpose: string;
  requiredFields: string[];
  confidentialityLevel: 'RESTRITO' | 'SIGILOSO';
}

export interface ProtocolData {
  institution: {
    name: string;
    cie: string;
    diretoriaEnsino: string;
  };
  metadata: {
    protocolVersion: string;
    effectiveDate: string;
    lastReviewedAt: string;
    reviewedBy: string;
  };
  decisionTree: FlowNode[];
  services: Service[];
  documentTemplates: DocumentTemplate[];
  instruments: {
    anexoI: { requiredFields: string[] };
    anexoII: { requiredFields: string[] };
  };
}

// Compatibilidade com páginas já existentes
export type TipoDemanda = string;
export type NivelRisco = 'baixo' | 'moderado' | 'alto' | 'urgencia';

export interface ChecklistItem {
  texto: string;
  detalhes?: string;
}

export interface Cenario {
  id: string;
  titulo: string;
  descricao: string;
  recomendacaoImediata: string;
  acionar: string[];
  documento: string;
  prazoNotificacao: string;
}

export interface Fluxo {
  id: string;
  codigo: string;
  titulo: string;
  descricao: string;
  risco: NivelRisco;
  icon: string;
  cenarios: Cenario[];
  contatosUteis: string[];
}

export interface Contato {
  id: string;
  categoria: 'saude' | 'assistencia' | 'protecao' | 'educacao' | 'emergencia';
  nome: string;
  telefone: string;
  endereco?: string;
  horario?: string;
}

export type ContentOrigin = 'OFICIAL' | 'DERIVADA';

export interface Recurso {
  id: string;
  titulo: string;
  descricao: string;
  formato: 'pdf' | 'docx';
  obrigatorio?: boolean;
  camposObrigatorios: string[];
  contentOrigin: ContentOrigin;
  sourceRef?: string;
}

export interface CasoAtivo {
  id: string;
  fluxoId: string;
  cenarioId?: string;
  faseAtual: number;
  dataCriacao: string;
  ultimaAtualizacao: string;
  status: 'aberto' | 'encerrado';
}
