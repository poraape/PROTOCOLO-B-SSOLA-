import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { PROTOCOL_DATA } from '../data';
import { Service } from '../types';

type NetworkFilter = 'TODOS' | 'SAUDE' | 'SOCIAL' | 'TUTELAR' | 'SEGURANCA';

interface GeocodedService {
  service: Service;
  lat: number;
  lng: number;
}

const mapServiceToFilter = (service: Service): NetworkFilter[] => {
  const list: NetworkFilter[] = [];

  if (service.category === 'SAÚDE') list.push('SAUDE');
  if (service.category === 'SOCIAL') list.push('SOCIAL');

  if (
    service.category === 'DIREITOS_SGD' ||
    service.name.toLowerCase().includes('conselho tutelar')
  ) {
    list.push('TUTELAR');
  }

  if (
    service.category === 'EMERGÊNCIA' ||
    /pol[ií]cia|delegacia|ddm|190|192|193/i.test(service.name + service.phone)
  ) {
    list.push('SEGURANCA');
  }

  if (!list.length) list.push('TODOS');
  return list;
};

const normalizePhoneToTel = (phone: string) => `tel:${phone.replace(/\D/g, '')}`;

const mapsLink = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

const isPhysicalAddress = (service: Service) =>
  !/Acionamento telefônico|Canal remoto|Acesso institucional|Secretaria Escolar Digital/i.test(service.address);

const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`;
    const response = await fetch(url, {
      headers: { 'Accept-Language': 'pt-BR' }
    });
    const data = await response.json();
    if (!Array.isArray(data) || !data.length) return null;

    return {
      lat: Number(data[0].lat),
      lng: Number(data[0].lon)
    };
  } catch {
    return null;
  }
};

export const NetworkPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<NetworkFilter>('TODOS');
  const [geoServices, setGeoServices] = useState<GeocodedService[]>([]);
  const [isGeocoding, setIsGeocoding] = useState(true);

  const filters: { id: NetworkFilter; label: string }[] = [
    { id: 'TODOS', label: 'Todos' },
    { id: 'SAUDE', label: 'Saúde' },
    { id: 'SOCIAL', label: 'Social' },
    { id: 'TUTELAR', label: 'Tutelar' },
    { id: 'SEGURANCA', label: 'Segurança' }
  ];

  const services = useMemo(() => {
    return PROTOCOL_DATA.services.filter((service) => {
      const text = `${service.name} ${service.address} ${service.phone}`.toLowerCase();
      const matchesSearch = search.trim().length === 0 || text.includes(search.toLowerCase());
      const matchesFilter = filter === 'TODOS' || mapServiceToFilter(service).includes(filter);

      return matchesSearch && matchesFilter;
    });
  }, [filter, search]);

  useEffect(() => {
    let active = true;

    const runGeocode = async () => {
      setIsGeocoding(true);
      const physicalServices = services.filter(isPhysicalAddress);

      const results = await Promise.all(
        physicalServices.map(async (service) => {
          const coords = await geocodeAddress(service.address);
          return coords ? { service, ...coords } : null;
        })
      );

      if (active) {
        setGeoServices(results.filter((item): item is GeocodedService => !!item));
        setIsGeocoding(false);
      }
    };

    runGeocode();
    return () => {
      active = false;
    };
  }, [services]);

  const mapCenter: [number, number] = geoServices.length
    ? [geoServices[0].lat, geoServices[0].lng]
    : [-23.49, -46.48];

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-20">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-black uppercase tracking-widest text-[#007AFF]">Rede de proteção</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Contatos rápidos da Zona Leste</h1>
        <p className="mt-2 text-sm text-slate-600">
          Encontre o serviço, visualize no mapa e ligue em 1 toque.
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, endereço ou telefone"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#007AFF] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide transition ${
                filter === item.id
                  ? 'bg-[#007AFF] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="mb-2 px-2 text-xs font-bold text-slate-500">
          Mapa interativo da rede {isGeocoding ? '(localizando endereços...)' : `(${geoServices.length} alfinetes)`}
        </div>
        <div className="h-[360px] overflow-hidden rounded-2xl border border-slate-200">
          <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geoServices.map((item) => (
              <Marker key={item.service.id} position={[item.lat, item.lng]}>
                <Popup>
                  <div className="space-y-1">
                    <strong>{item.service.name}</strong>
                    <p>{item.service.address}</p>
                    <a href={normalizePhoneToTel(item.service.phone)}>{item.service.phone}</a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <article key={service.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-900">{service.name}</h2>

            <dl className="mt-3 space-y-2 text-sm text-slate-700">
              <div>
                <dt className="font-bold text-slate-500">Endereço</dt>
                <dd>{service.address}</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-500">Telefone</dt>
                <dd>
                  <a className="font-semibold text-[#007AFF] underline" href={normalizePhoneToTel(service.phone)}>
                    {service.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-bold text-slate-500">Horário</dt>
                <dd>{service.hours || 'Não informado'}</dd>
              </div>
            </dl>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={normalizePhoneToTel(service.phone)}
                className="rounded-xl bg-[#007AFF] px-4 py-2 text-sm font-bold text-white hover:bg-[#005fcc]"
              >
                Ligar agora
              </a>
              <a
                href={mapsLink(service.address)}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100"
              >
                Abrir no Maps
              </a>
            </div>
          </article>
        ))}

        {!services.length && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-500">
            Nenhum serviço encontrado para os filtros atuais.
          </div>
        )}
      </section>
    </div>
  );
};
