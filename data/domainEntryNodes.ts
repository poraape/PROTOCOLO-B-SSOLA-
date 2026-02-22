// data/domainEntryNodes.ts
// Mapeia cada DomainId (do Dashboard) para o nodeId de entrada
// no PROTOCOL_DATA.decisionTree.
//
// Como encontrar o nodeId correto:
//   1. Abra content/protocolData.ts (ou o arquivo onde PROTOCOL_DATA está definido)
//   2. Localize o nó que inicia o fluxo para cada domínio
//   3. Copie o valor do campo "id" desse nó para cá
//
// Enquanto o nodeId real não for mapeado, o Decisor cai no nó padrão "root_risk_check"

import { DomainId } from './domainGroups';

export const DOMAIN_ENTRY_NODES: Record<DomainId, string | null> = {
  // GRUPO 1 — Proteção e Segurança
  'protecao':             null, // TODO: ex. 'cat_protecao_inicio'
  'violacao-direitos':    null, // TODO: ex. 'cat_violacao_inicio'
  'comportamento-grave':  null, // TODO: ex. 'cat_comportamento_inicio'

  // GRUPO 2 — Saúde e Bem-Estar
  'saude-mental':         null, // TODO: ex. 'cat_saude_mental_inicio'
  'saude-fisica':         null, // TODO: ex. 'cat_saude_fisica_inicio'
  'substancias':          null, // TODO: ex. 'cat_substancias_inicio'
  'gravidez':             null, // TODO: ex. 'cat_gravidez_inicio'

  // GRUPO 3 — Vulnerabilidade e Convivência
  'vulnerabilidade':      null, // TODO: ex. 'cat_vulnerabilidade_inicio'
  'discriminacao':        null, // TODO: ex. 'cat_discriminacao_inicio'
  'conflitos':            null, // TODO: ex. 'cat_conflitos_inicio'

  // GRUPO 4 — Trajetória Escolar
  'pedagogico':           null, // TODO: ex. 'cat_pedagogico_inicio'
  'evasao':               null, // TODO: ex. 'cat_evasao_inicio'
  'inclusao':             null, // TODO: ex. 'cat_inclusao_inicio'
};

/**
 * Retorna o nodeId de entrada para o domínio, ou o nó raiz padrão.
 */
export function resolveEntryNode(domainId: string | undefined): string {
  if (!domainId) return 'root_risk_check';
  const mapped = DOMAIN_ENTRY_NODES[domainId as DomainId];
  return mapped ?? 'root_risk_check';
}
