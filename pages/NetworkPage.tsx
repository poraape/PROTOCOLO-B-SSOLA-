import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { NetworkMap } from '../components/NetworkMap';
import { PROTOCOL_DATA } from '../content/protocolData';
import { shouldUseListFallback } from '../services/networkFallback';
import { Service } from '../types';

type NetworkFilter = 'TODOS' | 'SAUDE' | 'SOCIAL' | 'TUTELAR' | 'SEGURANCA';

type ServiceWithCoordinates = Service & { coordinates: { lat: number; lng: number } };

const expiredServiceIds = ['conselho-tutelar', 'ddm-sao-miguel'];

const mapServiceToFilter = (service: Service): NetworkFilter[] => {
  const list: NetworkFilter[] = [];
  if (service.category === 'SAÚDE') list.push('SAUDE');
  if (service.category === 'SOCIAL') list.push('SOCIAL');
  if (service.category === 'DIREITOS_SGD' || service.name.toLowerCase().includes('conselho tutelar')) list.push('TUTELAR');
  if (service.category === 'EMERGÊNCIA' || /pol[ií]cia|delegacia|ddm|190|192|193/i.test(service.name + service.phone)) list.push('SEGURANCA');
  if (!list.length) list.push('TODOS');
  return list;
};

const normalizePhoneToTel = (phone: string) => `tel:${phone.replace(/\D/g, '')}`;
const hasCoordinates = (service: Service): service is ServiceWithCoordinates => !!service.coordinates;

export const NetworkPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<NetworkFilter>('TODOS');
  const [showMap, setShowMap] = useState(false);
  const referralFilter = (searchParams.get('referral') || '').trim();
  const normalizedReferralFilter = referralFilter.toLowerCase();

  const filters: { id: NetworkFilter; label: string }[] = [
    { id: 'TODOS', label: 'Todos' },
    { id: 'SAUDE', label: 'Saúde' },
    { id: 'SOCIAL', label: 'Social' },
    { id: 'TUTELAR', label: 'Tutelar' },
    { id: 'SEGURANCA', label: 'Segurança' }
  ];

  const services = useMemo(() => PROTOCOL_DATA.services.filter((service) => {
    const text = `${service.name} ${service.address} ${service.phone}`.toLowerCase();
    const matchesSearch = search.trim().length === 0 || text.includes(search.toLowerCase());
    const matchesFilter = filter === 'TODOS' || mapServiceToFilter(service).includes(filter);
    const matchesReferral = !normalizedReferralFilter || text.includes(normalizedReferralFilter);
    return matchesSearch && matchesFilter && matchesReferral;
  }), [filter, search, normalizedReferralFilter]);

  const mappableServices = useMemo(() => services.filter(hasCoordinates), [services]);
  const listOnlyMode = shouldUseListFallback(services.length, mappableServices.length);

  return (
    <div className="space-y-4 pb-20">
      <header className="card">
        <h1 className="text-2xl font-extrabold text-text">Rede de Apoio — Contatos essenciais</h1>
        <p className="mt-2 text-sm text-muted">Telefones e endereços verificados (quando disponível).</p>
      </header>

      {referralFilter && (
        <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-sm">
          Exibindo serviços recomendados para:
          <strong className="ml-1">{referralFilter}</strong>
          <button
            className="ml-3 text-blue-700 underline focus-visible:ring-2 focus-visible:ring-brand-500"
            onClick={() => navigate('/rede')}
          >
            Limpar filtro
          </button>
        </div>
      )}

      <section className="card">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar serviço, endereço ou telefone"
          className="w-full rounded-xl border border-border px-4 py-3 text-sm text-text placeholder:text-muted"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`rounded-full px-3 py-2 text-xs font-semibold ${filter === item.id ? 'bg-brand-50 text-brand-800' : 'bg-slate-100 text-muted hover:bg-slate-200'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {!listOnlyMode && (
        <section className="card p-4">
          <button onClick={() => setShowMap((v) => !v)} className="text-sm font-semibold text-brand-800">
            {showMap ? 'Ocultar mapa' : 'Ver mapa'}
          </button>
          {showMap && (
            <div className="mt-3 h-[320px] overflow-hidden rounded-xl border border-border">
              {mappableServices.length ? <NetworkMap services={mappableServices} /> : <div className="flex h-full items-center justify-center text-sm text-muted">Sem coordenadas para os filtros atuais.</div>}
            </div>
          )}
        </section>
      )}

      <section className="grid grid-cols-1 gap-3">
        {services.map((service) => (
          <article key={service.id} className="card p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base font-bold text-text">{service.name}</h2>
              <span className="badge">{service.type || 'Serviço'}</span>
            </div>

            {expiredServiceIds.includes(service.id) && <div className="mt-2 inline-flex badge-accent">Verificação necessária</div>}

            <p className="mt-2 text-sm text-muted">{service.address}</p>
            <a className="mt-1 inline-block text-sm font-semibold text-brand-800" href={normalizePhoneToTel(service.phone)}>{service.phone}</a>

            <div className="mt-3 flex flex-wrap gap-2">
              <a href={normalizePhoneToTel(service.phone)} className="btn-primary text-sm focus-visible:ring-2 focus-visible:ring-brand-500">Ligar agora</a>
              <button onClick={() => navigator.clipboard.writeText(`${service.name}\n${service.address}\n${service.phone}`)} className="btn-secondary text-sm focus-visible:ring-2 focus-visible:ring-brand-500">Copiar</button>
            </div>

            <details className="mt-3 text-xs text-muted">
              <summary className="cursor-pointer font-semibold">Verificação e fonte</summary>
              <p className="mt-1">Fonte: {service.officialSource || 'Não informada'} · Verificado em {service.verifiedAt || 'N/A'} por {service.verifiedBy || 'N/A'}</p>
            </details>
          </article>
        ))}

        {!services.length && <div className="card text-center text-sm font-semibold text-muted">Nenhum serviço encontrado para os filtros atuais.</div>}
      </section>
    </div>
  );
};
