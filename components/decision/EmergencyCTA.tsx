import React from 'react';
import { FlowNode } from '../../types';
import { SCHOOL_CONFIG } from '../../content/schoolConfig';

const shouldShowEmergency = (node?: FlowNode) => {
  if (!node) return false;
  return node.category === 'EMERGÊNCIA' || node.riskLevel === 'EMERGENCIAL' || node.riskLevel === 'ALTO';
};

export const EmergencyCTA: React.FC<{ node?: FlowNode; isMobile?: boolean }> = ({ node, isMobile = false }) => {
  if (!shouldShowEmergency(node)) return null;

  return (
    <a
      href={`tel:${SCHOOL_CONFIG.emergency.police}`}
      className={isMobile
        ? 'fixed bottom-20 right-4 z-40 rounded-xl bg-danger-600 px-4 py-3 text-sm font-bold text-white shadow-soft'
        : 'inline-flex rounded-xl bg-danger-600 px-4 py-2 text-sm font-bold text-white shadow-soft'}
    >
      EMERGÊNCIA {SCHOOL_CONFIG.emergency.police}/{SCHOOL_CONFIG.emergency.samu}
    </a>
  );
};
