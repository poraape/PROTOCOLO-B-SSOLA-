import React from 'react';
import { Link } from 'react-router-dom';
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

const serviceLink = (serviceId: string) => `/rede/${serviceId}`;

const ServiceItem: React.FC<{ service: Service; highlight?: boolean }> = ({ service, highlight = false }) => (
  <li className={`panel p-3 ${highlight ? 'border-brand-300 bg-brand-50' : ''}`}>
    <div className="flex items-center justify-between gap-2">
      <p className="font-semibold text-text">{service.name}</p>
      <span className="badge text-xs">{service.type}</span>
    </div>
    <p className="mt-1 text-xs text-muted">{service.address}</p>
    <a className="mt-1 inline-block text-sm font-semibold text-brand-800" href={normalizePhoneToTel(service.phone)}>{service.phone}</a>
    <div className="mt-2">
      <Link className="btn-secondary text-xs focus-visible:ring-2 focus-visible:ring-brand-500" to={serviceLink(service.id)}>Ver na Rede</Link>
    </div>
  </li>
);

export const ActionCard: React.FC<ActionCardProps> = ({ leafNode, services }) => {
  const risk = leafNode.riskLevel || 'MÉDIO';
  const sourceLink = getSourceLink(leafNode.sourceRef);

  const primaryServiceId = leafNode.decisionResult?.mainServiceId || leafNode.primaryServiceIds?.[0] || leafNode.serviceIds?.[0];
  const primaryService = services.find((service) => service.id === primaryServiceId) || services.find((service) => service.id === 'de-leste1') || services[0];

  const secondaryIds = leafNode.decisionResult?.secondaryServiceIds || leafNode.secondaryServiceIds || [];
  const secondaryServices = services.filter((service) => secondaryIds.includes(service.id) && service.id !== primaryService?.id);

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-2xl border border-brand-100 bg-brand-50 p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className={urgencyStyles[risk] || 'badge'}>Classificação: {leafNode.decisionResult?.classification || risk}</span>
          <span className="badge">Prioridade: {leafNode.decisionResult?.priority || leafNode.actionPriority || 'ORIENTAÇÃO'}</span>
        </div>

        <h3 className="text-base font-bold text-brand-900">O que fazer agora</h3>
        <p className="mt-1 text-sm text-brand-900">{leafNode.whatToDoNow || leafNode.doNow?.[0]}</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-brand-900">
          {(leafNode.doNow || leafNode.guidance || []).slice(0, 3).map((item, index) => (
            <li key={`${leafNode.id}-action-${index}`}>{item}</li>
          ))}
        </ol>
      </article>

      <aside className="space-y-3">
        <div className="card p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Serviço principal</h3>
          {primaryService && <ul className="mt-2 space-y-2"><ServiceItem service={primaryService} highlight /></ul>}
        </div>

        {!!secondaryServices.length && (
          <div className="card p-4">
            <h4 className="text-sm font-bold uppercase tracking-wide text-muted">Serviços complementares</h4>
            <ul className="mt-2 space-y-2">
              {secondaryServices.map((service) => <ServiceItem key={service.id} service={service} />)}
            </ul>
          </div>
        )}

        <div className="card p-4 text-sm text-text">
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Prazo</h3>
          <p className="mt-2">{leafNode.deadline || leafNode.decisionResult?.deadline || 'Hoje'}</p>
        </div>

        <div className="card p-4 text-sm text-text">
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Justificativa</h3>
          <p className="mt-2">{leafNode.decisionResult?.justification || leafNode.whyThisService || 'Encaminhamento definido por risco e competência da rede.'}</p>
        </div>

        <div className="card p-4 text-sm text-text">
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Registro obrigatório</h3>
          {!!leafNode.recordRequired?.length ? (
            <ul className="mt-2 list-disc pl-5">
              {leafNode.recordRequired.map((record, index) => (
                <li key={`${record.system}-${index}`}>{record.system} · até {record.due}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2">Sem exigência explícita no protocolo para este cenário.</p>
          )}
        </div>
      </aside>

      <div className="lg:col-span-2 text-xs text-muted">
        {sourceLink ? <details><summary className="cursor-pointer">Base normativa (ver referência)</summary><a className="mt-2 inline-block" href={sourceLink.href} target="_blank" rel="noreferrer">{sourceLink.label}</a></details> : null}
        <div className="mt-3"><Link to="/protocolo" className="btn-secondary focus-visible:ring-2 focus-visible:ring-brand-500">Consultar protocolo oficial</Link></div>
      </div>
    </section>
  );
};
