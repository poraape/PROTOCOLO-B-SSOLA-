import { decisionTreeV2 } from '../data/decision-tree-migration.ts';
import { validateDecisionTreeDepth } from '../services/validateTreeDepth.ts';
import type { DecisionNode, LeafNode } from '../types/decision-tree-v2.ts';

type ValidationIssue = {
  code: string;
  nodeId?: string;
  detail: string;
};

const hasLevel = (node: DecisionNode): node is DecisionNode & { level: string } => 'level' in node;
const isLeaf = (node: DecisionNode): node is LeafNode => hasLevel(node) && node.level === 'LEAF';
const hasOptions = (node: DecisionNode): node is DecisionNode & { options: Array<{ nextNodeId: string }> } =>
  'options' in node && Array.isArray((node as { options?: unknown }).options);
const hasCategories = (node: DecisionNode): node is DecisionNode & { categories: Array<{ nextNodeId: string }> } =>
  'categories' in node && Array.isArray((node as { categories?: unknown }).categories);

const nodes = decisionTreeV2.nodes;
const nodeIds = new Set(Object.keys(nodes));
const protocolDataSource = await import('node:fs/promises').then((fs) =>
  fs.readFile(new URL('../content/protocolData.ts', import.meta.url), 'utf8')
);
const serviceIds = new Set(Array.from(protocolDataSource.matchAll(/id:\s*'([^']+)'/g)).map((match) => match[1]));

const issues: ValidationIssue[] = [];

const collectTransitions = (node: DecisionNode): string[] => {
  const transitions: string[] = [];
  if (hasOptions(node)) node.options.forEach((option) => transitions.push(option.nextNodeId));
  if (hasCategories(node)) node.categories.forEach((category) => transitions.push(category.nextNodeId));
  if (!hasLevel(node) && 'redirectTo' in node) transitions.push(node.redirectTo);
  return transitions;
};

Object.entries(nodes).forEach(([nodeId, node]) => {
  collectTransitions(node).forEach((nextNodeId) => {
    if (!nodeIds.has(nextNodeId)) {
      issues.push({
        code: 'INVALID_TRANSITION_TARGET',
        nodeId,
        detail: `Transição aponta para nó inexistente: ${nextNodeId}`
      });
    }
  });

  if (!isLeaf(node)) return;

  if (!Array.isArray(node.instruments) || node.instruments.length < 1) {
    issues.push({
      code: 'LEAF_MISSING_INSTRUMENTS',
      nodeId,
      detail: 'Leaf deve ter instruments com ao menos 1 item.'
    });
  }

  const management = node.managementNotification;
  if (!management) {
    issues.push({
      code: 'LEAF_MISSING_MANAGEMENT_NOTIFICATION',
      nodeId,
      detail: 'Leaf sem managementNotification definido.'
    });
  } else if (management.required) {
    if (!management.timing) {
      issues.push({
        code: 'LEAF_MISSING_MANAGEMENT_TIMING',
        nodeId,
        detail: 'managementNotification.required=true exige timing definido.'
      });
    }

    if (!Array.isArray(management.roles) || management.roles.length < 1) {
      issues.push({
        code: 'LEAF_MISSING_MANAGEMENT_ROLES',
        nodeId,
        detail: 'managementNotification.required=true exige roles com ao menos 1 papel.'
      });
    }
  }

  const services = node.contactTargets?.services;
  if (!Array.isArray(services) || services.length < 1) {
    issues.push({
      code: 'LEAF_MISSING_CONTACT_TARGETS',
      nodeId,
      detail: 'Leaf deve ter contactTargets.services com ao menos 1 serviceId.'
    });
  } else {
    services.forEach((serviceRef, index) => {
      if (!serviceRef.serviceId) {
        issues.push({
          code: 'LEAF_MISSING_SERVICE_ID',
          nodeId,
          detail: `contactTargets.services[${index}] sem serviceId.`
        });
        return;
      }

      if (!serviceIds.has(serviceRef.serviceId)) {
        issues.push({
          code: 'LEAF_UNKNOWN_SERVICE_ID',
          nodeId,
          detail: `serviceId não encontrado no catálogo: ${serviceRef.serviceId}`
        });
      }
    });
  }
});

const referencedNodes = new Set<string>([decisionTreeV2.rootNodeId]);
Object.values(nodes).forEach((node) => {
  collectTransitions(node).forEach((nextNodeId) => referencedNodes.add(nextNodeId));
});
Object.keys(nodes).forEach((nodeId) => {
  if (!referencedNodes.has(nodeId) && nodeId !== decisionTreeV2.rootNodeId) {
    issues.push({
      code: 'ORPHAN_NODE',
      nodeId,
      detail: 'Nó órfão sem referências de transição.'
    });
  }
});

const depth = validateDecisionTreeDepth(decisionTreeV2, 8);
if (depth.exceedsLimit) {
  issues.push({
    code: 'TREE_DEPTH_EXCEEDED',
    detail: `Profundidade máxima ${depth.maxDepth} excede limite 8.`
  });
}

if (issues.length > 0) {
  console.error('❌ Validação da árvore falhou com os seguintes erros:');
  issues.forEach((issue) => {
    console.error(`- [${issue.code}]${issue.nodeId ? ` [${issue.nodeId}]` : ''} ${issue.detail}`);
  });

  // Exemplo esperado de erro do validador:
  // [LEAF_UNKNOWN_SERVICE_ID] [LEAF_EVASAO_PREVENCAO] serviceId não encontrado no catálogo: servico-inexistente
  process.exit(1);
}

console.log('✅ Validação da árvore V3 concluída com sucesso.');
console.log(`ℹ️ Profundidade máxima: ${depth.maxDepth}`);
