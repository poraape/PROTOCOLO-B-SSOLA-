import React from 'react';

type StatusChipTone = 'danger' | 'warning' | 'success' | 'info' | 'neutral';

type StatusChipProps = {
  label: string;
  tone?: StatusChipTone;
};

const tones: Record<StatusChipTone, { bg: string; border: string; text: string }> = {
  danger: { bg: 'rgba(229,72,77,.12)', border: 'rgba(229,72,77,.45)', text: '#8c1d21' },
  warning: { bg: 'rgba(245,165,36,.15)', border: 'rgba(245,165,36,.45)', text: '#7a4d09' },
  success: { bg: 'rgba(47,191,113,.13)', border: 'rgba(47,191,113,.5)', text: '#106a3a' },
  info: { bg: 'rgba(59,130,246,.12)', border: 'rgba(59,130,246,.45)', text: '#1d4f99' },
  neutral: { bg: 'rgba(20,32,51,.08)', border: 'rgba(20,32,51,.2)', text: 'var(--text)' }
};

export const StatusChip: React.FC<StatusChipProps> = ({ label, tone = 'neutral' }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: 999,
      border: `1px solid ${tones[tone].border}`,
      background: tones[tone].bg,
      color: tones[tone].text,
      padding: '4px 10px',
      fontSize: '0.78rem',
      fontWeight: 700
    }}
  >
    {label}
  </span>
);
