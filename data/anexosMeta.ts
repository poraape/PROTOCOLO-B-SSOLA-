export const anexosMeta = [
  {
    id: 'anexo-i',
    title: 'Anexo I — Ficha de Observação Inicial',
    file: '/anexos/ANEXO-I.md'
  },
  {
    id: 'anexo-ii',
    title: 'Anexo II — Ficha de Escuta Qualificada',
    file: '/anexos/ANEXO-II.md'
  },
  {
    id: 'anexo-iii',
    title: 'Anexo III — Registro Interno de Ocorrência',
    file: '/anexos/ANEXO-III.md'
  },
  {
    id: 'orientacoes',
    title: 'Como utilizar os Anexos I, II e III',
    file: '/anexos/comousarI-II-III.md'
  }
] as const;

export type AnexoMeta = (typeof anexosMeta)[number];
