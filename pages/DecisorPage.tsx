import React from 'react';
import { DecisionWizard } from '../components/DecisionWizard';
import { PROTOCOL_DATA } from '../content/protocolData';
import { ProtocolVersionBadge } from '../components/ProtocolVersionBadge';

export const DecisorPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-20">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-black uppercase tracking-widest text-[#007AFF]">Assistente de decisão</p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900">Protocolo de atendimento rápido</h1>
        <p className="mt-3 text-sm text-slate-600">
          Siga uma pergunta por vez. O sistema vai indicar a ação imediata, urgência, serviço e documento.
        </p>
        <p className="mt-2 text-xs font-semibold text-slate-500">
          {PROTOCOL_DATA.institution.name} • CIE {PROTOCOL_DATA.institution.cie} • {PROTOCOL_DATA.institution.diretoriaEnsino}
        </p>
      </header>

      <ProtocolVersionBadge />

      <DecisionWizard />
    </div>
  );
};
