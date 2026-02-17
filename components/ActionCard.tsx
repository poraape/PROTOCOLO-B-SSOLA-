import React from 'react';
import { Link } from 'react-router-dom';
import { FlowNode, Service } from '../types';
import { getSourceLink } from '../services/getSourceLink';
import { IndicatorsAccordion } from './IndicatorsAccordion';

interface ActionCardProps {
  leafNode: FlowNode;
  services: Service[];
}

const urgencyStyles: Record<string, { badge: string; ring: string; title: string }> = {
  BAIXO: { badge: 'bg-emerald-100 text-emerald-800', ring: 'ring-emerald-200 border-emerald-200', title: 'Baixo' },
  'MÉDIO': { badge: 'bg-amber-100 text-amber-800', ring: 'ring-amber-200 border-amber-200', title: 'Médio' },
  ALTO: { badge: 'bg-red-100 text-red-800', ring: 'ring-red-200 border-red-200', title: 'Alto' },
  EMERGENCIAL: { badge: 'bg-red-600 text-white', ring: 'ring-red-300 border-red-300', title: 'Emergencial' }
};

const normalizePhoneToTel = (phone: string) => `tel:${phone.replace(/\D/g, '')}`;
const mapsLink = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export const ActionCard: React.FC<ActionCardProps> = ({ leafNode, services }) => {
  const risk = leafNode.riskLevel || 'MÉDIO';
  const riskStyle = urgencyStyles[risk];

  const sourceLink = getSourceLink(leafNode.sourceRef);

  return (
    <section className={`rounded-3xl border bg-white p-6 shadow-sm ring-2 ${riskStyle.ring}`}>
      <header className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Resultado do protocolo</p>
        <h2 className="text-3xl font-extrabold text-slate-900">{leafNode.question}</h2>
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${riskStyle.badge}`}>
          🚨 Risco {riskStyle.title}
        </span>
      </header>

      <IndicatorsAccordion items={leafNode.indicators || leafNode.severityCriteria} />

      <div className="mt-6">
        <h3 className="text-sm font-black uppercase tracking-wide text-slate-600">FAÇA AGORA</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-800">
          {(leafNode.doNow || leafNode.guidance || []).slice(0, 3).map((item, index) => (
            <li key={`${leafNode.id}-action-${index}`}>{item}</li>
          ))}
        </ol>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <h3 className="text-sm font-black uppercase tracking-wide text-slate-600">Prazo</h3>
        <p className="mt-1 text-sm text-slate-800">{leafNode.deadline || 'Hoje'}</p>
      </div>

      {!!leafNode.recordRequired?.length && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <h3 className="text-sm font-black uppercase tracking-wide text-slate-600">Registro</h3>
          <ul className="mt-1 text-sm text-slate-800">
            {leafNode.recordRequired.map((record, index) => (
              <li key={`${record.system}-${index}`}>{record.system} · até {record.due}{record.notes ? ` · ${record.notes}` : ''}</li>
            ))}
          </ul>
        </div>
      )}

      <IndicatorsAccordion
        items={leafNode.serviceCharacterization}
        title="Como escolher o serviço?"
        microcopy="Este bloco é apoio educativo; siga o protocolo oficial e a gestão em caso de dúvida."
      />

      <div className="mt-6 rounded-2xl bg-slate-50 p-4">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-600">Quem acionar</h4>
        {!!services.length ? (
          <ul className="mt-2 space-y-3 text-sm text-slate-700">
            {services.map((service) => (
              <li key={service.id} className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="font-semibold">{service.name}</p>
                <p className="text-xs text-slate-500">{service.address}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <a className="rounded-lg bg-[#007AFF] px-3 py-1 text-xs font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500" href={normalizePhoneToTel(service.phone)}>Ligar</a>
                  <button className="rounded-lg border px-3 py-1 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500" onClick={() => navigator.clipboard.writeText(`${service.name}\n${service.address}\n${service.phone}`)}>Copiar</button>
                  <a className="rounded-lg border px-3 py-1 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500" href={mapsLink(service.address)} target="_blank" rel="noreferrer">Abrir rota</a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm font-semibold text-amber-700">Serviço não cadastrado; contate a gestão (pendente).</p>
        )}
      </div>

      {leafNode.sourceRef && (
        <div className="mt-4 text-xs text-slate-600">
          <strong>Fonte:</strong> {leafNode.sourceRef.label}
          {leafNode.sourceRef.section ? ` · ${leafNode.sourceRef.section}` : ''}
          {leafNode.sourceRef.filePath ? ` · ${leafNode.sourceRef.filePath}` : ''}
        </div>
      )}

      <div className="mt-3 text-xs font-bold text-slate-600">Em dúvida: escale para gestão escolar.</div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link
          to="/recursos"
          className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-400"
        >
          📂 Abrir documentos necessários
        </Link>
      </div>
    </section>
  );
};
