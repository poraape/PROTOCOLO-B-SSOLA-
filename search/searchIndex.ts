export interface SearchItem {
  id: string;
  title: string;
  content: string;
  route: string;
  type: 'protocolo' | 'anexo' | 'rede' | 'decisor';
}

export const searchIndex: SearchItem[] = [];
