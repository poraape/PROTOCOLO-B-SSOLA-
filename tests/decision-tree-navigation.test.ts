import test from 'node:test';
import assert from 'node:assert/strict';
import { decisionTreeV2 } from '../data/decision-tree-migration.ts';
import type { DecisionNode, LeafNode } from '../types/decision-tree-v2.ts';
import { validateDecisionTreeDepth } from '../services/validateTreeDepth.ts';

const hasLevel = (node: DecisionNode): node is DecisionNode & { level: string } => 'level' in node;
const isLeaf = (node: DecisionNode): node is LeafNode => hasLevel(node) && node.level === 'LEAF';
const hasOptions = (node: DecisionNode): node is DecisionNode & { options: Array<{ nextNodeId: string }> } =>
  'options' in node && Array.isArray((node as { options?: unknown }).options);
const hasCategories = (node: DecisionNode): node is DecisionNode & { categories: Array<{ nextNodeId: string }> } =>
  'categories' in node && Array.isArray((node as { categories?: unknown }).categories);

const collectTransitions = (node: DecisionNode): string[] => {
  const transitions: string[] = [];
  if (hasOptions(node)) node.options.forEach((option) => transitions.push(option.nextNodeId));
  if (hasCategories(node)) node.categories.forEach((category) => transitions.push(category.nextNodeId));
  if (!hasLevel(node) && 'redirectTo' in node) transitions.push(node.redirectTo);
  return transitions;
};

test('root node deve ser CRITICAL_TRIAGE_ROOT', () => {
  assert.equal(decisionTreeV2.rootNodeId, 'CRITICAL_TRIAGE_ROOT');
  assert.ok(decisionTreeV2.nodes.CRITICAL_TRIAGE_ROOT);
});

test('não deve haver transições para IDs inexistentes', () => {
  const nodeIds = new Set(Object.keys(decisionTreeV2.nodes));

  Object.entries(decisionTreeV2.nodes).forEach(([nodeId, node]) => {
    collectTransitions(node).forEach((nextNodeId) => {
      assert.ok(nodeIds.has(nextNodeId), `Nó ${nodeId} referencia destino inexistente: ${nextNodeId}`);
    });
  });
});

test('todos os leafs devem ter instruments, managementNotification e serviceId(s)', () => {
  Object.entries(decisionTreeV2.nodes).forEach(([nodeId, node]) => {
    if (!isLeaf(node)) return;

    assert.ok(Array.isArray(node.instruments) && node.instruments.length >= 1, `Leaf ${nodeId} sem instruments`);
    assert.ok(node.managementNotification, `Leaf ${nodeId} sem managementNotification`);

    if (node.managementNotification.required) {
      assert.ok(node.managementNotification.timing, `Leaf ${nodeId} sem timing em managementNotification.required=true`);
      assert.ok(
        Array.isArray(node.managementNotification.roles) && node.managementNotification.roles.length >= 1,
        `Leaf ${nodeId} sem roles em managementNotification.required=true`
      );
    }

    assert.ok(
      Array.isArray(node.contactTargets.services) && node.contactTargets.services.length >= 1,
      `Leaf ${nodeId} sem serviceId primário em contactTargets.services`
    );
  });
});

test('todos os serviceIds dos leafs devem existir em PROTOCOL_DATA.services', async () => {
  const fs = await import('node:fs/promises');
  const source = await fs.readFile(new URL('../content/protocolData.ts', import.meta.url), 'utf8');
  const serviceIds = new Set(Array.from(source.matchAll(/id:\s*'([^']+)'/g)).map((match) => match[1]));

  Object.entries(decisionTreeV2.nodes).forEach(([nodeId, node]) => {
    if (!isLeaf(node)) return;

    node.contactTargets.services.forEach((serviceRef, index) => {
      assert.ok(serviceRef.serviceId, `Leaf ${nodeId} contactTargets.services[${index}] sem serviceId`);
      assert.ok(serviceIds.has(serviceRef.serviceId), `Leaf ${nodeId} referencia serviceId inexistente: ${serviceRef.serviceId}`);
    });
  });
});

test('não deve haver nós órfãos', () => {
  const referencedNodes = new Set<string>([decisionTreeV2.rootNodeId]);

  Object.values(decisionTreeV2.nodes).forEach((node) => {
    collectTransitions(node).forEach((nextNodeId) => referencedNodes.add(nextNodeId));
  });

  Object.keys(decisionTreeV2.nodes).forEach((nodeId) => {
    if (nodeId === decisionTreeV2.rootNodeId) return;
    assert.ok(referencedNodes.has(nodeId), `Nó órfão detectado: ${nodeId}`);
  });
});

test('profundidade da árvore não deve exceder 8', () => {
  const depth = validateDecisionTreeDepth(decisionTreeV2, 8);
  assert.ok(!depth.exceedsLimit, `Profundidade máxima ${depth.maxDepth} excede limite 8`);
});

test('todos os caminhos navegáveis devem terminar em LEAF (sem tela em branco)', () => {
  const visiting = new Set<string>();
  const cache = new Map<string, boolean>();

  const pathEndsInLeaf = (nodeId: string): boolean => {
    if (cache.has(nodeId)) return cache.get(nodeId)!;
    assert.ok(decisionTreeV2.nodes[nodeId], `Nó inexistente durante travessia: ${nodeId}`);

    if (visiting.has(nodeId)) {
      assert.fail(`Ciclo detectado na árvore decisória: ${Array.from(visiting).join(' -> ')} -> ${nodeId}`);
    }

    visiting.add(nodeId);
    const node = decisionTreeV2.nodes[nodeId];

    if (isLeaf(node)) {
      visiting.delete(nodeId);
      cache.set(nodeId, true);
      return true;
    }

    const transitions = collectTransitions(node);
    assert.ok(transitions.length > 0, `Nó terminal sem resultado detectado: ${nodeId}`);

    const result = transitions.every((nextNodeId) => pathEndsInLeaf(nextNodeId));
    visiting.delete(nodeId);
    cache.set(nodeId, result);
    return result;
  };

  assert.ok(pathEndsInLeaf(decisionTreeV2.rootNodeId), 'Há pelo menos um caminho que não termina em LEAF');
});
