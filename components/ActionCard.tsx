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
const isGenericAddress = (address?: string) => {
  if (!address) return true;
  return /acionamento telef[oô]nico|canal remoto|secretaria escolar digital|canal estadual|canal nacional|foro regional/i.test(address);
};

const mapsLink = (service: Service) => {
  const fallbackRegion = 'Ermelino Matarazzo São Paulo';
  const query = isGenericAddress(service.address)
    ? `${service.name} ${fallbackRegion}`
    : `${service.name} ${service.address}`;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};

const renderService = (service: Service) => (
  <li key={service.id} className="panel p-3">
    <div className="flex items-center justify-between gap-2">
      <p className="font-semibold text-text">{service.name}</p>
      <span className="badge text-xs">{service.type}</span>
    </div>
    <p className="mt-1 text-xs text-muted">{service.address}</p>
    <div className="mt-2 flex flex-wrap gap-2">
      <a className="btn-primary text-xs focus-visible:ring-2 focus-visible:ring-brand-500" href={normalizePhoneToTel(service.phone)}>Ligar agora</a>
      <button className="btn-secondary text-xs focus-visible:ring-2 focus-visible:ring-brand-500" onClick={() => navigator.clipboard.writeText(`${service.name}\n${service.address}\n${service.phone}`)}>Copiar</button>
      <a className="btn-secondary text-xs focus-visible:ring-2 focus-visible:ring-brand-500" href={mapsLink(service)} target="_blank" rel="noreferrer">Abrir rota</a>
    </div>
  </li>
);

export const ActionCard: React.FC<ActionCardProps> = ({ leafNode, services }) => {
  const risk = leafNode.riskLevel || 'MÉDIO';
  const sourceLink = getSourceLink(leafNode.sourceRef);
  const primary = services.filter((service) => (leafNode.primaryServiceIds || []).includes(service.id));
  const secondary = services.filter((service) => (leafNode.secondaryServiceIds || []).includes(service.id));
  const management = secondary.filter((service) => service.type === 'GESTAO');
  const secondaryWithoutManagement = secondary.filter((service) => service.type !== 'GESTAO');

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-2xl border border-brand-100 bg-brand-50 p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className={urgencyStyles[risk] || 'badge'}>Classificação: {risk}</span>
          <span className="badge">Prioridade: {leafNode.actionPriority || 'ORIENTAÇÃO'}</span>
        </div>
        <h2 className="text-lg font-extrabold text-brand-900">Resumo da decisão</h2>
        <p className="mt-2 text-sm text-brand-900">{leafNode.actionSummary || leafNode.question}</p>

        <h3 className="mt-4 text-base font-bold text-brand-900">O que fazer agora</h3>
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
          {!!primary.length ? <ul className="mt-2 space-y-2">{primary.map(renderService)}</ul> : <p className="mt-2 text-sm font-semibold text-accent-800">Serviço principal não cadastrado; informe a gestão escolar.</p>}
        </div>

        {!!secondaryWithoutManagement.length && (
          <div className="card p-4">
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Serviços complementares</h3>
            <ul className="mt-2 space-y-2">{secondaryWithoutManagement.map(renderService)}</ul>
          </div>
        )}

        {(leafNode.notifyManagement || !!management.length) && (
          <div className="card p-4 text-sm text-text border-l-4 border-l-amber-400">
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Informe a gestão escolar</h3>
            {!!management.length && <ul className="mt-2 space-y-2">{management.map(renderService)}</ul>}
            <p className="mt-2">Compartilhe o caso com coordenação/direção para validação de encaminhamento, proteção e registro institucional.</p>
          </div>
        )}

        <div className="card p-4 text-sm text-text">
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Quando acionar</h3>
          <p className="mt-2"><strong>Prazo:</strong> {leafNode.deadline || 'Hoje'}</p>
          {!!leafNode.recordRequired?.length && (
            <ul className="mt-2 list-disc pl-5">
              {leafNode.recordRequired.map((record, index) => (
                <li key={`${record.system}-${index}`}>{record.system} · até {record.due}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="card p-4 text-sm text-text">
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Justificativa</h3>
          <p className="mt-2">{leafNode.whyThisService || 'Encaminhamento definido pelo risco e competência da rede.'}</p>
        </div>
      </aside>

      <div className="lg:col-span-2 text-xs text-muted">
        {sourceLink ? <details><summary className="cursor-pointer">Base normativa (ver referência)</summary><a className="mt-2 inline-block" href={sourceLink.href} target="_blank" rel="noreferrer">{sourceLink.label}</a></details> : null}
        <div className="mt-3"><Link to="/protocolo" className="btn-secondary focus-visible:ring-2 focus-visible:ring-brand-500">Consultar protocolo oficial</Link></div>
      </div>
    </section>
  );
};
