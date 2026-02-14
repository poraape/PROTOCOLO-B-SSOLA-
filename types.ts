
export type TipoDemanda = 'pedagogica' | 'saude-mental' | 'violencia' | 'vulnerabilidade-social' | 'situacao-especial';
export type NivelRisco = 'baixo' | 'moderado' | 'alto' | 'urgencia';
export type Governabilidade = 'direta' | 'compartilhada' | 'externa';
export type PapelUsuario = 'professor' | 'gestor' | 'admin';

export interface ChecklistItem {
  texto: string;
  detalhes?: string;
  links?: { titulo: string; idRecurso?: string; url?: string }[];
}

export interface FaseCiclo {
  ordem: number;
  titulo: string;
  descricao: string;
  checklist: ChecklistItem[];
  responsavel: PapelUsuario;
}

export interface Cenario {
  id: string;
  titulo: string;
  descricao: string;
  recomendacaoImediata: string;
  acionar: string[]; // IDs de contatos
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
  governabilidade: Governabilidade;
  alertas: string[];
  vedacoes: string[];
  fases: FaseCiclo[];
  contatosUteis: string[];
  cenarios: Cenario[];
  convivaFields: string[];
}

export interface Contato {
  id: string;
  categoria: 'saude' | 'assistencia' | 'protecao' | 'justica' | 'educacao' | 'emergencia';
  nome: string;
  telefone: string;
  whatsapp?: string;
  endereco?: string;
  horario?: string;
  urgencia?: boolean;
  lat?: number;
  lng?: number;
}

export interface Recurso {
  id: string;
  titulo: string;
  descricao: string;
  formato: 'pdf' | 'docx';
  obrigatorio?: boolean;
  camposObrigatorios: string[];
}

// Persistência de Casos
export interface CasoAtivo {
  id: string;
  fluxoId: string;
  cenarioId?: string;
  faseAtual: number;
  dataCriacao: string;
  ultimaAtualizacao: string;
  status: 'aberto' | 'encerrado';
}
