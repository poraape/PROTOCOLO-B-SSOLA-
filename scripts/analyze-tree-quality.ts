import { decisionTreeV2 } from '../data/decision-tree-migration.ts';
import type { DecisionNode } from '../types/decision-tree-v2.ts';

interface QualityReport {
  cosmeticNodes: string[];
  redundantBifurcations: string[];
  orphanNodes: string[];
  averagePathLength: number;
  maxPathLength: number;
}

const hasLevel = (node: DecisionNode): node is DecisionNode & { level: string } => 'level' in node;
const hasOptions = (node: DecisionNode): node is DecisionNode & { options: Array<{ label: string; nextNodeId: string }> } =>
  'options' in node && Array.isArray((node as { options?: unknown }).options);
const hasCategories = (node: DecisionNode): node is DecisionNode & { categories: Array<{ nextNodeId: string }> } =>
  'categories' in node && Array.isArray((node as { categories?: unknown }).categories);

function analyzeTreeQuality(): QualityReport {
  const report: QualityReport = {
    cosmeticNodes: [],
    redundantBifurcations: [],
    orphanNodes: [],
    averagePathLength: 0,
    maxPathLength: 0
  };

  const allNodeIds = Object.keys(decisionTreeV2.nodes);
  const referencedNodes = new Set<string>([decisionTreeV2.rootNodeId]);

  allNodeIds.forEach((nodeId) => {
    const node = decisionTreeV2.nodes[nodeId];
    if (!node) return;

    if (hasOptions(node)) {
      node.options.forEach((opt) => referencedNodes.add(opt.nextNodeId));

      if (node.options.length === 1 && node.options[0].label.toLowerCase().includes('continuar')) {
        report.cosmeticNodes.push(nodeId);
      }

      const destinations = new Set(node.options.map((o) => o.nextNodeId));
      const withWeight = node.options.some((o) => 'riskWeight' in o && typeof (o as { riskWeight?: number }).riskWeight === 'number');
      if (node.options.length > 1 && destinations.size === 1 && !withWeight) {
        report.redundantBifurcations.push(nodeId);
      }
    }

    if (hasCategories(node)) {
      node.categories.forEach((cat) => referencedNodes.add(cat.nextNodeId));
    }
  });

  allNodeIds.forEach((nodeId) => {
    if (!referencedNodes.has(nodeId) && nodeId !== decisionTreeV2.rootNodeId) {
      report.orphanNodes.push(nodeId);
    }
  });

  const pathLengths: number[] = [];
  const visited = new Set<string>();

  function measurePaths(nodeId: string, depth: number): void {
    const node = decisionTreeV2.nodes[nodeId];
    if (!node) return;

    const visitKey = `${nodeId}:${depth}`;
    if (visited.has(visitKey)) return;
    visited.add(visitKey);

    if (hasLevel(node) && node.level === 'LEAF') {
      pathLengths.push(depth);
      return;
    }

    if (hasOptions(node)) {
      node.options.forEach((opt) => measurePaths(opt.nextNodeId, depth + 1));
    }

    if (hasCategories(node)) {
      node.categories.forEach((cat) => measurePaths(cat.nextNodeId, depth + 1));
    }

    if (!hasLevel(node) && 'redirectTo' in node) {
      measurePaths(node.redirectTo, depth + 1);
    }
  }

  measurePaths(decisionTreeV2.rootNodeId, 0);

  if (pathLengths.length) {
    report.averagePathLength = pathLengths.reduce((a, b) => a + b, 0) / pathLengths.length;
    report.maxPathLength = Math.max(...pathLengths);
  }

  return report;
}

const report = analyzeTreeQuality();

console.log('═══════════════════════════════════════');
console.log('📊 RELATÓRIO DE QUALIDADE DA ÁRVORE');
console.log('═══════════════════════════════════════\n');

console.log(`❌ Nós cosméticos detectados: ${report.cosmeticNodes.length}`);
if (report.cosmeticNodes.length > 0) console.log(`   ${report.cosmeticNodes.join(', ')}\n`);

console.log(`⚠️  Bifurcações redundantes: ${report.redundantBifurcations.length}`);
if (report.redundantBifurcations.length > 0) console.log(`   ${report.redundantBifurcations.join(', ')}\n`);

console.log(`👻 Nós órfãos: ${report.orphanNodes.length}`);
if (report.orphanNodes.length > 0) console.log(`   ${report.orphanNodes.join(', ')}\n`);

console.log(`📏 Comprimento médio de caminho: ${report.averagePathLength.toFixed(1)} cliques`);
console.log(`📏 Pior caso: ${report.maxPathLength} cliques\n`);
console.log('═══════════════════════════════════════');

if (
  report.cosmeticNodes.length === 0 &&
  report.redundantBifurcations.length === 0 &&
  report.averagePathLength <= 4
) {
  console.log('✅ ÁRVORE PASSOU NO TESTE DE QUALIDADE');
} else {
  console.log('❌ ÁRVORE PRECISA DE OTIMIZAÇÃO');
  process.exit(1);
}
