import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProtocolVersionBadge } from '../components/ProtocolVersionBadge';
import { NetworkMap } from '../components/NetworkMap';
import { NetworkServiceCard } from '../components/NetworkServiceCard';
import { PROTOCOL_DATA } from '../content/protocolData';
import { shouldUseListFallback } from '../services/networkFallback';
import { Service } from '../types';

type NetworkFilter = 'TODOS' | 'SAUDE' | 'SOCIAL' | 'TUTELAR' | 'SEGURANCA';

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

const sortByRiskLevel = (a: Service, b: Service) => {
  const priority: Record<string, number> = {
    EMERGENCIA: 0,
    ALTA_PRIORIDADE: 1,
    APOIO_INSTITUCIONAL: 2,
    OUTROS: 3
  };
  return (priority[a.riskLevel ?? 'OUTROS'] ?? 3) - (priority[b.riskLevel ?? 'OUTROS'] ?? 3);
};

const referralMap: Record<string, string[]> = {
  EMERGENCIA: ['EMERGÊNCIA', 'EMERGENCIA_192_193', 'UPA_HOSPITAL'],
  CAPS: ['CAPS_IJ', 'CAPS_ADULTO'],
  UBS: ['UBS'],
  CONSELHO_TUTELAR: ['CONSELHO_TUTELAR'],
  GESTAO_ESCOLAR: ['GESTAO_ESCOLAR'],
  CRAS_CREAS: ['CRAS', 'CREAS']
};

const matchReferral = (service: Service, referral: string) => {
  const allowed = referralMap[referral];
  if (!allowed) return true;
  return allowed.includes(service.type || '') || allowed.includes(service.category);
};

export const NetworkPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<NetworkFilter>('TODOS');
  const [showMap, setShowMap] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const referralFilter = searchParams.get('filter');

  const filters: { id: NetworkFilter; label: string }[] = [
    { id: 'TODOS', label: 'Todos' },
    { id: 'SAUDE', label: 'Saúde' },
    { id: 'SOCIAL', label: 'Social' },
    { id: 'TUTELAR', label: 'Tutelar' },
    { id: 'SEGURANCA', label: 'Segurança' }
  ];

  const services = useMemo(() => PROTOCOL_DATA.services.filter((service) => {
    const text = `${service.name} ${service.address} ${service.phone}`.toLowerCase();
    return (search.trim().length === 0 || text.includes(search.toLowerCase())) && (filter === 'TODOS' || mapServiceToFilter(service).includes(filter));
  }), [filter, search]);

  const referralFilteredServices = useMemo(
    () => (referralFilter ? services.filter((service) => matchReferral(service, referralFilter)) : services),
    [services, referralFilter]
  );

  const effectiveServices = referralFilter && referralFilteredServices.length === 0 ? services : referralFilteredServices;
  const orderedServices = useMemo(() => [...effectiveServices].sort(sortByRiskLevel), [effectiveServices]);

  const pinCount = useMemo(
    () => orderedServices.filter((service) => !!service.coordinates && service.geoStatus === 'VERIFICADO').length,
    [orderedServices]
  );
  const listOnlyMode = shouldUseListFallback(orderedServices.length, pinCount);

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

      {referralFilter && referralFilteredServices.length === 0 && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Nenhum serviço específico encontrado. Exibindo todos.
        </div>
      )}

      <ProtocolVersionBadge />

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
              className={`rounded-full px-3 py-2 text-xs font-semibold focus-visible:ring-2 focus-visible:ring-brand-500 ${filter === item.id ? 'bg-brand-50 text-brand-800' : 'bg-slate-100 text-muted hover:bg-slate-200'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {!listOnlyMode && (
        <section className="card-elevated mb-5">
          <button onClick={() => setShowMap((v) => !v)} className="text-sm font-semibold text-brand-800 focus-visible:ring-2 focus-visible:ring-brand-500">
            {showMap ? 'Ocultar mapa' : 'Ver mapa'}
          </button>
          {showMap && (
            <div className="mt-3 h-[320px] overflow-hidden rounded-xl border border-border">
              <NetworkMap services={orderedServices} height={360} />
            </div>
          )}
        </section>
      )}

      <div className="mt-4 text-xs text-gray-500">
        Cobertura do mapa: <strong>{pinCount}</strong> de <strong>{orderedServices.length}</strong> serviços com coordenadas verificadas.
      </div>

      <div className="divider-soft" />

      <section className="grid grid-cols-1 gap-3">
        {orderedServices.map((service) => (
          <NetworkServiceCard
            key={service.id}
            service={service}
            expired={expiredServiceIds.includes(service.id)}
          />
        ))}

        {!orderedServices.length && <div className="card text-center text-sm font-semibold text-muted">Nenhum serviço encontrado para os filtros atuais.</div>}
      </section>
    </div>
  );
};
