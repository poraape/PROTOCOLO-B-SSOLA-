import React from 'react';
import { PROTOCOL_DATA } from '../content/protocolData';

const toBRDate = (value: string) => {
  const [y, m, d] = value.split('-');
  return y && m && d ? `${d}/${m}/${y}` : value;
};

export const ProtocolMetaBanner: React.FC = () => {
  const { metadata } = PROTOCOL_DATA;

  return (
    <section className="rounded-2xl border border-sky-200 bg-sky-50 p-3 text-xs text-sky-900">
      <p className="font-black uppercase tracking-wide text-sky-700">Versão normativa ativa</p>
      <p className="mt-1 font-semibold">
        v{metadata.protocolVersion} · Vigência {toBRDate(metadata.effectiveDate)}
      </p>
      <p className="text-sky-800">
        Revisado em {toBRDate(metadata.lastReviewedAt)} por {metadata.reviewedBy}
      </p>
    </section>
  );
};
