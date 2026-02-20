import React, { useState } from 'react';
import { FlowNode } from '../../types';
import { SCHOOL_CONFIG } from '../../content/schoolConfig';
import { EmergencyChannelModal } from './EmergencyChannelModal';

const shouldShowEmergency = (node?: FlowNode) => {
  if (!node) return false;
  return node.riskLevel === 'EMERGENCIAL';
};

export const EmergencyCTA: React.FC<{ node?: FlowNode; isMobile?: boolean }> = ({ node, isMobile = false }) => {
  const [open, setOpen] = useState(false);

  if (!shouldShowEmergency(node)) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={isMobile
          ? 'fixed bottom-20 right-4 z-40 rounded-xl bg-danger-600 px-4 py-3 text-sm font-bold text-white shadow-soft'
          : 'inline-flex rounded-xl bg-danger-600 px-4 py-2 text-sm font-bold text-white shadow-soft'}
      >
        Risco iminente: ligar {SCHOOL_CONFIG.emergency.police}/{SCHOOL_CONFIG.emergency.samu} agora
      </button>
      <EmergencyChannelModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
