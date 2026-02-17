export type RiskLevel = 'BAIXO' | 'MÉDIO' | 'ALTO' | 'EMERGENCIAL';
export type RiskLevelV2 = 'BAIXO' | 'MEDIO' | 'ALTO';

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
}

export interface FlowNode {
  id: string;
  question: string;
  options: FlowOption[];
  isLeaf?: boolean;
  riskLevel?: RiskLevel;
  category?: 'SAÚDE' | 'SOCIAL' | 'DIREITOS_SGD' | 'EDUCAÇÃO' | 'EMERGÊNCIA' | DecisionCategory;
  tags?: string[];
  guidance?: string[];
  severityCriteria?: string[];
  serviceIds?: string[];
  forbiddenActions?: string[];
  fallbackNextNodeId?: string;
  indicators?: string[];
  doNow?: string[];
  contactTargets?: ServiceTarget[];
  deadline?: string;
  recordRequired?: RecordRequirement[];
  sourceRef?: SourceRef;
  notes?: string;
  escalationRule?: 'SE_DUVIDA_ESCALE';
  serviceCharacterization?: string[];
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
  type?: ServiceTarget;
  phones?: string[];
  howToCall?: string;
  sourceOfficial?: string;
  coordinates?: { lat: number; lng: number };
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
