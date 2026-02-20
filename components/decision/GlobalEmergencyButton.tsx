import React, { useState } from 'react';
import { EmergencyChannelModal } from './EmergencyChannelModal';

export const GlobalEmergencyButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="fixed bottom-20 right-4 z-40 rounded-xl bg-danger-600 px-4 py-3 text-sm font-bold text-white shadow-soft md:bottom-auto md:right-6 md:top-24"
        onClick={() => setOpen(true)}
      >
        Emergência (190/192)
      </button>
      <EmergencyChannelModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
