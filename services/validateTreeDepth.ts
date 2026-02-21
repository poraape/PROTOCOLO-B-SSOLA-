import type { FlowNode } from '../types';
import type { DecisionTreeV2, DecisionNode } from '../types/decision-tree-v2';

interface TreeDepthValidationResult {
  maxDepth: number;
  exceedsLimit: boolean;
}

const ROOT_NODE_ID = 'root';

export const validateTreeDepth = (tree: FlowNode[], maxAllowedDepth = 5): TreeDepthValidationResult => {
  const nodeMap = new Map(tree.map((node) => [node.id, node]));

  const visit = (nodeId: string, depth: number, trail: Set<string>): number => {
    if (trail.has(nodeId)) return depth;

    const node = nodeMap.get(nodeId);
    if (!node) return depth;

    if (!node.options.length || node.isLeaf) return depth;

    const nextTrail = new Set(trail);
    nextTrail.add(nodeId);

    return node.options.reduce((maxDepth, option) => {
      const branchDepth = visit(option.nextNodeId, depth + 1, nextTrail);
      return Math.max(maxDepth, branchDepth);
    }, depth);
  };

  const maxDepth = visit(ROOT_NODE_ID, 1, new Set());
  const exceedsLimit = maxDepth > maxAllowedDepth;

  if (exceedsLimit) {
    console.warn(`Fluxo excede limite de ${maxAllowedDepth} nós.`);
  }

  return { maxDepth, exceedsLimit };
};

const hasLevel = (node: DecisionNode): node is DecisionNode & { level: string } => 'level' in node;
const hasOptions = (node: DecisionNode): node is DecisionNode & { options: Array<{ nextNodeId: string }> } =>
  'options' in node && Array.isArray((node as { options?: unknown }).options);
const hasCategories = (node: DecisionNode): node is DecisionNode & { categories: Array<{ nextNodeId: string }> } =>
  'categories' in node && Array.isArray((node as { categories?: unknown }).categories);

export const validateDecisionTreeDepth = (
  tree: DecisionTreeV2,
  maxAllowedDepth = 8
): TreeDepthValidationResult => {
  const visit = (nodeId: string, depth: number, trail: Set<string>): number => {
    const node = tree.nodes[nodeId];
    if (!node) return depth;
    if (trail.has(nodeId)) return depth;

    if (hasLevel(node) && node.level === 'LEAF') return depth;

    const nextTrail = new Set(trail);
    nextTrail.add(nodeId);

    const branchDepths: number[] = [];

    if (hasOptions(node)) {
      node.options.forEach((option) => {
        branchDepths.push(visit(option.nextNodeId, depth + 1, nextTrail));
      });
    }

    if (hasCategories(node)) {
      node.categories.forEach((category) => {
        branchDepths.push(visit(category.nextNodeId, depth + 1, nextTrail));
      });
    }

    if (!hasLevel(node) && 'redirectTo' in node) {
      branchDepths.push(visit(node.redirectTo, depth + 1, nextTrail));
    }

    return branchDepths.length ? Math.max(...branchDepths) : depth;
  };

  const maxDepth = visit(tree.rootNodeId, 0, new Set());
  return { maxDepth, exceedsLimit: maxDepth > maxAllowedDepth };
};
