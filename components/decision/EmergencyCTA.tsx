import React from 'react';
import { FlowNode } from '../../types';

const getPanicLink = (node?: FlowNode) => {
  if (!node || node.category === 'EMERGÊNCIA' || node.riskLevel === 'EMERGENCIAL') {
    return 'tel:190';
  }
  return 'tel:192';
};

export const EmergencyCTA: React.FC<{ node?: FlowNode }> = ({ node }) => {
  return (
    <a
      href={getPanicLink(node)}
      className="fixed bottom-24 right-6 z-40 rounded-full bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-red-700"
    >
      EMERGÊNCIA 190/192
    </a>
  );
};
