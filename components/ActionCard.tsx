import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FlowNode, Service } from '../types';
import { getSourceLink } from '../services/getSourceLink';

interface ActionCardProps {
  leafNode: FlowNode;
  services: Service[];
}

const urgencyStyles: Record<string, string> = {
  BAIXO: 'badge',
  'MÉDIO': 'badge',
  ALTO: 'badge-danger',
  EMERGENCIAL: 'badge-danger'
};

const normalizePhoneToTel = (phone: string) => `tel:${phone.replace(/\D/g, '')}`;
const mapsLink = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export const ActionCard: React.FC<ActionCardProps> = ({ leafNode, services }) => {
  const navigate = useNavigate();
  const risk = leafNode.riskLevel || 'MÉDIO';
  const sourceLink = getSourceLink(leafNode.sourceRef);
  const doNowShort = (leafNode.doNowShort || leafNode.doNow || leafNode.guidance || []).slice(0, 3);

  const handleOpenNetwork = () => {
    const referral = leafNode.referralType ?? 'OUTROS';
    navigate(`/rede?filter=${referral}`);
  };

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className={urgencyStyles[risk] || 'badge'}>Risco {risk}</span>
          <span className="text-xs font-extrabold tracking-wide text-blue-900">FAÇA AGORA</span>
        </div>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-blue-900">
          {doNowShort.map((item, index) => (
            <li key={`${leafNode.id}-short-${index}`}>{item}</li>
          ))}
        </ol>
        {leafNode.escalation ? (
          <p className="mt-2 text-xs text-blue-900">Escalonamento: <strong>{leafNode.escalation}</strong></p>
        ) : null}
      </article>

      <aside className="space-y-3">
        <div className="card p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Quem acionar</h3>
          {!!services.length ? (
            <ul className="mt-2 space-y-2">
              {services.map((service) => (
                <li key={service.id} className="panel p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-text">{service.name}</p>
                    <span className="badge text-xs">{service.type || 'Serviço'}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">{service.address}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <a className="btn-primary text-xs focus-visible:ring-2 focus-visible:ring-brand-500" href={normalizePhoneToTel(service.phone)}>Ligar agora</a>
                    <button className="btn-secondary text-xs focus-visible:ring-2 focus-visible:ring-brand-500" onClick={() => navigator.clipboard.writeText(`${service.name}\n${service.address}\n${service.phone}`)}>Copiar</button>
                    {service.address && <a className="btn-secondary text-xs focus-visible:ring-2 focus-visible:ring-brand-500" href={mapsLink(service.address)} target="_blank" rel="noreferrer">Abrir rota</a>}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm font-semibold text-accent-800">Serviço não cadastrado; contate a gestão.</p>
          )}
        </div>

        <div className="card p-4 text-sm text-text">
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Prazo e registro</h3>
          <p className="mt-2"><strong>Prazo:</strong> {leafNode.deadline || 'Hoje'}</p>
          {!!leafNode.recordRequired?.length && (
            <ul className="mt-2 list-disc pl-5">
              {leafNode.recordRequired.map((record, index) => (
                <li key={`${record.system}-${index}`}>{record.system} · até {record.due}</li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      <div className="lg:col-span-2 text-xs text-muted">
        {sourceLink ? <details><summary className="cursor-pointer">Base normativa (ver referência)</summary><a className="mt-2 inline-block" href={sourceLink.href} target="_blank" rel="noreferrer">{sourceLink.label}</a></details> : null}
        <div className="mt-3 flex flex-wrap gap-2">
          <button onClick={handleOpenNetwork} className="btn-primary focus-visible:ring-2 focus-visible:ring-brand-500">Ver Rede de Apoio</button>
          <Link to="/recursos" className="btn-secondary focus-visible:ring-2 focus-visible:ring-brand-500">Abrir documentos necessários</Link>
        </div>
      </div>
    </section>
  );
};
