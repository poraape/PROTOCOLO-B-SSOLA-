import React from 'react';
import { PROTOCOL_META } from '../content/protocolMeta';

export const ProtocolVersionBadge: React.FC = () => {
  return (
    <section className="panel px-4 py-3 text-xs text-muted">
      <p className="font-semibold">Versão do Protocolo: {PROTOCOL_META.version}</p>
      <p className="mt-1">Vigência: {PROTOCOL_META.effectiveDate}</p>
      <p className="mt-1">Atualizado em: {PROTOCOL_META.lastUpdated}</p>
    </section>
  );
};
