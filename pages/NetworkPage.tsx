import React, { useMemo, useState } from 'react';
import { NetworkMap } from '../components/NetworkMap';
import { PROTOCOL_DATA } from '../content/protocolData';
import { Service } from '../types';

type FilterCategory = 'TODOS' | 'SAÚDE' | 'SOCIAL' | 'DIREITOS_SGD' | 'EMERGÊNCIA' | 'EDUCAÇÃO';

type ServiceWithCoordinates = Service & { coordinates: { lat: number; lng: number } };

const hasCoordinates = (service: Service): service is ServiceWithCoordinates => Boolean(service.coordinates);
const toTel = (phone: string) => `tel:${phone.replace(/\D/g, '')}`;

export const NetworkPage: React.FC = () => {
  const [filter, setFilter] = useState<FilterCategory>('TODOS');
  const [search, setSearch] = useState('');
  const [showMap, setShowMap] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const filters: FilterCategory[] = ['TODOS', 'SAÚDE', 'SOCIAL', 'DIREITOS_SGD', 'EMERGÊNCIA', 'EDUCAÇÃO'];

  const services = useMemo(() => {
    return PROTOCOL_DATA.services.filter((service) => {
      const text = `${service.name} ${service.address}`.toLowerCase();
      const bySearch = search.trim() === '' || text.includes(search.toLowerCase());
      const byCategory = filter === 'TODOS' || service.category === filter;
      return bySearch && byCategory;
    });
  }, [filter, search]);

  const mappable = useMemo(() => services.filter(hasCoordinates), [services]);

  return (
    <div className="space-y-4 pb-20">
      <header className="card">
        <h1 className="text-2xl font-extrabold text-text">Rede intersetorial</h1>
        <p className="mt-1 text-sm text-muted">Filtre por categoria e use os contatos clicáveis para encaminhamento.</p>
      </header>

      <section className="card space-y-3">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-xl border border-border px-4 py-3 focus-visible:ring-2 focus-visible:ring-brand-500"
          placeholder="Buscar por nome de serviço"
        />
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-3 py-2 text-xs font-bold focus-visible:ring-2 focus-visible:ring-brand-500 ${filter === item ? 'bg-brand-50 text-brand-900' : 'bg-slate-100 text-slate-600'}`}>
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <button onClick={() => setShowMap((prev) => !prev)} className="btn-secondary focus-visible:ring-2 focus-visible:ring-brand-500" style={{ minHeight: 48 }}>
          {showMap ? 'Ocultar mapa' : 'Mostrar mapa'}
        </button>
        {showMap && (
          <div className="mt-3 h-[340px] overflow-hidden rounded-xl border border-border">
            {mappable.length > 0 ? <NetworkMap services={mappable} /> : <div className="flex h-full items-center justify-center text-sm">Sem coordenadas disponíveis nos serviços filtrados.</div>}
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 gap-3">
        {services.map((service) => (
          <article key={service.id} className="card p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base font-bold">{service.name}</h2>
              <span className="badge">{service.category}</span>
            </div>
            <p className="mt-1 text-sm text-muted">{service.address}</p>
            <a href={toTel(service.phone)} className="mt-1 inline-block text-sm font-bold text-brand-800">{service.phone}</a>
            {service.hours ? <p className="mt-1 text-xs text-muted">Horário: {service.hours}</p> : null}
            {service.description ? <p className="mt-2 text-sm">{service.description}</p> : null}
            {service.notes ? <p className="mt-1 text-xs text-muted">Obs: {service.notes}</p> : null}
            {service.howToCall ? <p className="mt-1 text-xs font-semibold text-brand-700">Como acionar: {service.howToCall}</p> : null}

            <button
              onClick={() => setExpanded((prev) => ({ ...prev, [service.id]: !prev[service.id] }))}
              className="btn-secondary mt-3"
              style={{ minHeight: 48 }}
            >
              Como encaminhar
            </button>

            {expanded[service.id] && (
              <div className="mt-2 rounded-lg bg-slate-50 p-3 text-sm">
                Registrar no Anexo I e comunicar gestão. Em seguida, contatar {service.name} por telefone e formalizar no Anexo II quando houver envio externo.
              </div>
            )}
          </article>
        ))}
      </section>
    </div>
  );
};
