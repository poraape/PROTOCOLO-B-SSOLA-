import React from 'react';
import { PROTOCOL_META } from '../content/protocolMeta';

export const ProtocolVersionBadge: React.FC = () => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
      <p className="font-semibold">Versão do Protocolo: {PROTOCOL_META.version}</p>
      <p className="mt-1">Vigência: {PROTOCOL_META.effectiveDate}</p>
      <p className="mt-1">Atualizado em: {PROTOCOL_META.lastUpdated}</p>
    </section>
  );
};
