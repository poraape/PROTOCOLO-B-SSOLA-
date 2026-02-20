import React from 'react';

export type SlaLevel = 'IMEDIATO' | 'ATÉ 2H' | 'HOJE' | 'ATÉ 24H' | 'ATÉ 48H';

const SLA_STYLES: Record<SlaLevel, string> = {
  IMEDIATO: 'bg-red-100 text-red-800 border border-red-300 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold',
  'ATÉ 2H': 'bg-orange-100 text-orange-800 border border-orange-300 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold',
  HOJE: 'bg-amber-100 text-amber-800 border border-amber-300 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
  'ATÉ 24H': 'bg-sky-100 text-sky-800 border border-sky-300 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
  'ATÉ 48H': 'bg-slate-100 text-slate-700 border border-slate-300 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold'
};

const SLA_ICONS: Record<SlaLevel, string> = {
  IMEDIATO: '[!]',
  'ATÉ 2H': '[▲]',
  HOJE: '[●]',
  'ATÉ 24H': '[■]',
  'ATÉ 48H': '[□]'
};

const toSlaLevel = (deadline?: string): SlaLevel => {
  const normalized = (deadline || '').toLowerCase();
  if (/imediat|agora|urgente/.test(normalized)) return 'IMEDIATO';
  if (/(2h|2 h|duas horas)/.test(normalized)) return 'ATÉ 2H';
  if (/hoje/.test(normalized)) return 'HOJE';
  if (/(24h|24 h|1 dia)/.test(normalized)) return 'ATÉ 24H';
  return 'ATÉ 48H';
};

export const SlaChip: React.FC<{ deadline?: string }> = ({ deadline }) => {
  const level = toSlaLevel(deadline);

  return (
    <span className={SLA_STYLES[level]}>
      {SLA_ICONS[level]} {level}
    </span>
  );
};
