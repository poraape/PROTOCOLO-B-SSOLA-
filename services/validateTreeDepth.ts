import { FlowNode } from '../types';

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
    console.warn('Fluxo excede limite de 5 nós.');
  }

  return { maxDepth, exceedsLimit };
};
