import React from 'react';
import { Service } from '../types';

const riskLabel: Record<string, string> = {
  EMERGENCIA: 'Emergência',
  ALTA_PRIORIDADE: 'Alta prioridade',
  APOIO_INSTITUCIONAL: 'Apoio institucional',
  OUTROS: 'Outros'
};

const normalizePhoneToTel = (phone: string) => `tel:${phone.replace(/\D/g, '')}`;

interface NetworkServiceCardProps {
  service: Service;
  expired: boolean;
}

export const NetworkServiceCard: React.FC<NetworkServiceCardProps> = ({ service, expired }) => {
  const riskLevel = service.riskLevel ?? 'OUTROS';

  return (
    <article className={`service-card service-${riskLevel} mb-4`}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-gray-900">{service.name}</h3>

        <span className={`risk-badge badge-${riskLevel}`}>
          {riskLabel[riskLevel]}
        </span>
      </div>

      {service.strategicDescription && (
        <p className="mt-2 text-sm leading-relaxed text-gray-700">{service.strategicDescription}</p>
      )}

      <div className="divider-soft" />

      {expired && <div className="mt-2 inline-flex badge-accent">Verificação necessária</div>}

      <p className="mt-2 text-sm text-muted">{service.address}</p>
      {service.phone && (
        <a className="mt-1 inline-block text-sm font-semibold text-brand-800" href={normalizePhoneToTel(service.phone)}>{service.phone}</a>
      )}

      <div className="mt-3 flex flex-wrap gap-3">
        {service.phone && (
          <a
            href={normalizePhoneToTel(service.phone)}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white ${
              riskLevel === 'EMERGENCIA' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-800 hover:bg-blue-900'
            }`}
          >
            Ligar agora
          </a>
        )}
        <button
          onClick={() => navigator.clipboard.writeText(`${service.name}\n${service.address}\n${service.phone || ''}`)}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm"
        >
          Copiar
        </button>
      </div>

      <details className="mt-3 text-xs text-muted">
        <summary className="cursor-pointer font-semibold">Verificação e fonte</summary>
        <p className="mt-1">Fonte: {service.officialSource || 'Não informada'} · Verificado em {service.verifiedAt || 'N/A'} por {service.verifiedBy || 'N/A'} · Geolocalização: {service.geoStatus || 'PENDENTE'}</p>
      </details>
    </article>
  );
};
