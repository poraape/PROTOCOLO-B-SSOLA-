import React from 'react';
import { SlaChip } from './SlaChip';

export const MandatoryBar: React.FC<{ text: string; deadline?: string }> = ({ text, deadline = 'Hoje' }) => (
  <div className="mb-3 rounded-xl border border-danger-300 bg-danger-100 px-3 py-2 text-sm font-semibold text-danger-900">
    <span className="mr-2">🔔 Obrigatório hoje:</span>
    {text}
    <span className="ml-2 align-middle"><SlaChip deadline={deadline} /></span>
  </div>
);
