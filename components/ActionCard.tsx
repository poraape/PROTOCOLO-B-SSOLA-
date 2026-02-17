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
  BAIXO: {
    badge: 'bg-emerald-100 text-emerald-800',
    ring: 'ring-emerald-200 border-emerald-200',
    title: 'Baixa urgência'
  },
  'MÉDIO': {
    badge: 'bg-amber-100 text-amber-800',
    ring: 'ring-amber-200 border-amber-200',
    title: 'Urgência moderada'
  },
  ALTO: {
    badge: 'bg-red-100 text-red-800',
    ring: 'ring-red-200 border-red-200',
    title: 'Alta urgência'
  },
  EMERGENCIAL: {
    badge: 'bg-red-600 text-white',
    ring: 'ring-red-300 border-red-300',
    title: 'Emergencial'
  }
};

const normalizePhoneToTel = (phone: string) => `tel:${phone.replace(/\D/g, '')}`;

export const ActionCard: React.FC<ActionCardProps> = ({ leafNode, services }) => {
  const risk = leafNode.riskLevel || 'MÉDIO';
  const riskStyle = urgencyStyles[risk];
  const primaryService = services[0];

  const sourceLink = getSourceLink(leafNode.sourceRef);

  return (
    <section className={`rounded-3xl border bg-white p-6 shadow-sm ring-2 ${riskStyle.ring}`}>
      <header className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Resultado do protocolo</p>
        <h2 className="text-3xl font-extrabold text-slate-900">{leafNode.question}</h2>
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${riskStyle.badge}`}>
          🚨 {riskStyle.title} · {risk}
        </span>
      </header>


      <IndicatorsAccordion items={leafNode.indicators || leafNode.severityCriteria} />

      <div className="mt-6">
        <h3 className="text-sm font-black uppercase tracking-wide text-slate-600">📋 Ações imediatas</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-800">
          {(leafNode.guidance || []).map((item, index) => (
            <li key={`${leafNode.id}-action-${index}`}>{item}</li>
          ))}
        </ol>
      </div>

      {!!leafNode.forbiddenActions?.length && (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4">
          <h4 className="text-sm font-black uppercase tracking-wide text-red-700">⛔ Evitar</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-800">
            {leafNode.forbiddenActions.map((item, index) => (
              <li key={`${leafNode.id}-forbidden-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      )}


      <div className="mt-3">
        {leafNode.sourceRef && sourceLink ? (
          <a
            href={sourceLink.href}
            target={sourceLink.isExternal ? '_blank' : undefined}
            rel={sourceLink.isExternal ? 'noreferrer' : undefined}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 underline-offset-2 hover:text-slate-700 hover:underline"
            title={leafNode.sourceRef.label}
          >
            📎 Base normativa
          </a>
        ) : (
          <p className="text-xs font-semibold text-amber-700">Base normativa não especificada — revisar.</p>
        )}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {primaryService ? (
          <a
            href={normalizePhoneToTel(primaryService.phone)}
            className="inline-flex items-center justify-center rounded-2xl bg-[#007AFF] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#005fcc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            📞 Ligar agora ({primaryService.phone})
          </a>
        ) : (
          <button
            disabled
            className="inline-flex items-center justify-center rounded-2xl bg-slate-200 px-4 py-3 text-sm font-bold text-slate-500"
          >
            📞 Sem telefone sugerido
          </button>
        )}

        <Link
          to="/recursos"
          className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-400"
        >
          📂 Abrir documentos necessários
        </Link>
      </div>

      {!!services.length && (
        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-600">Serviços sugeridos</h4>
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            {services.map((service) => (
              <li key={service.id}>
                <p className="font-semibold">{service.name}</p>
                <p className="text-xs text-slate-500">{service.address}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
