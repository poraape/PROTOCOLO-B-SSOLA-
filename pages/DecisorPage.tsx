import React from 'react';
import { DecisionWizard } from '../components/DecisionWizard';
import { PROTOCOL_DATA } from '../content/protocolData';
import { ProtocolVersionBadge } from '../components/ProtocolVersionBadge';
import { ScopeBanner } from '../components/decision/ScopeBanner';

export const DecisorPage: React.FC = () => {
  return (
    <div className="space-y-4 pb-20">
      <header className="card">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-700">Assistente de decisão</p>
        <h1 className="mt-2 text-2xl font-extrabold text-text">Guia de decisão rápida (não substitui registro oficial)</h1>
        <p className="mt-2 text-sm text-muted">Siga uma pergunta por vez para definir ação imediata e encaminhamento correto.</p>
        <p className="mt-2 text-xs font-semibold text-muted">
          {PROTOCOL_DATA.institution.name} • CIE {PROTOCOL_DATA.institution.cie} • {PROTOCOL_DATA.institution.diretoriaEnsino}
        </p>
      </header>

      <ProtocolVersionBadge />
      <ScopeBanner />

      <DecisionWizard />
    </div>
  );
};
