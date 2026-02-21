import React from 'react';

type AppChipTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

type AppChipProps = {
  label: string;
  tone?: AppChipTone;
  className?: string;
};

export const AppChip: React.FC<AppChipProps> = ({ label, tone = 'neutral', className = '' }) => (
  <span className={`ui-chip ui-chip--${tone} ${className}`.trim()}>{label}</span>
);
