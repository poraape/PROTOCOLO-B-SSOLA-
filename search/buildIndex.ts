import { PROTOCOL_DATA, RECURSOS } from '../content/protocolData';
import { TECHNICAL_GLOSSARY } from '../content/glossaryData';
import { searchIndex } from './searchIndex';

const normalizeText = (value: string) => value.toLowerCase();

export function buildStaticIndex(protocolo: string, anexos: Record<string, string>) {
  searchIndex.length = 0;

  searchIndex.push({
    id: 'protocolo',
    title: 'Protocolo Completo',
    content: normalizeText(protocolo),
    route: '/protocolo',
    type: 'protocolo'
  });

  Object.entries(anexos).forEach(([key, value]) => {
    searchIndex.push({
      id: key,
      title: key,
      content: normalizeText(value),
      route: '/modelos',
      type: 'anexo'
    });
  });

  PROTOCOL_DATA.services.forEach((service) => {
    searchIndex.push({
      id: service.id,
      title: service.name,
      content: normalizeText(
        [
          service.strategicDescription,
          service.notes,
          service.address,
          service.phone,
          service.category,
          service.type
        ]
          .filter(Boolean)
          .join(' ')
      ),
      route: '/rede',
      type: 'rede'
    });
  });

  PROTOCOL_DATA.decisionTree.forEach((node) => {
    searchIndex.push({
      id: node.id,
      title: node.question,
      content: normalizeText(JSON.stringify(node)),
      route: '/decisor',
      type: 'decisor'
    });
  });

  RECURSOS.forEach((item) => {
    searchIndex.push({
      id: `recurso-${item.id}`,
      title: item.titulo,
      content: normalizeText(`${item.titulo} ${item.descricao || ''} ${item.tipo || ''}`),
      route: '/modelos',
      type: 'anexo'
    });
  });

  TECHNICAL_GLOSSARY.forEach((term) => {
    searchIndex.push({
      id: `glossario-${term.id}`,
      title: term.termo,
      content: normalizeText(
        [
          term.termo,
          term.definicao,
          term.exemplo || '',
          term.observacoes || '',
          term.categoria,
          ...(term.sinonimos || []),
          ...(term.relacionados || [])
        ].join(' ')
      ),
      route: `/glossary?q=${encodeURIComponent(term.termo)}`,
      type: 'glossario'
    });
  });
}
