
export type TipoDemanda = 'pedagogica' | 'saude-mental' | 'violencia' | 'vulnerabilidade-social';
export type NivelRisco = 'baixo' | 'moderado' | 'alto' | 'urgencia';

export interface Cenario {
  id: string;
  titulo: string;
  descricao: string;
  recomendacaoImediata: string;
  acionar: string;
  documento: string;
}

export interface Contato {
  id: string;
  categoria: 'saude' | 'assistencia' | 'protecao' | 'justica';
  nome: string;
  telefone: string;
  whatsapp?: string;
  endereco?: string;
  horario?: string;
  urgencia?: boolean;
  lat?: number;
  lng?: number;
}

export interface Fluxo {
  id: TipoDemanda;
  titulo: string;
  descricao: string;
  risco: NivelRisco;
  icon: string;
  checklist: string[];
  alertas: string[];
  contatosUteis: string[];
  cenarios: Cenario[];
}

export interface Recurso {
  id: string;
  titulo: string;
  descricao: string;
  formato: 'pdf' | 'docx';
  obrigatorio?: boolean;
}
