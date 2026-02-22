// pages/NetworkPage.tsx — v2 (Patch 6)
// Mantém lógica completa (filtros, busca, mapa, highlight por URL).
// Remove componentes legados (AppButton, AppCard, AppChip, etc.)
// Aplica classes v2 e highlight visual com ring de foco no card.

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { NetworkMap } from '../components/NetworkMap';
import { PROTOCOL_DATA } from '../content/protocolData';

// ─── Tipos ───────────────────────────────────────────────────

type Service = (typeof PROTOCOL_DATA.services)[number];
type ServiceFilter =
  | 'TODOS'
  | 'SAUDE'
  | 'SOCIAL'
  | 'DIREITOS'
  | 'EDUCACAO'
  | 'EMERGENCIA';

// ─── Helpers ─────────────────────────────────────────────────

const hasCoordinates = (s: Service): boolean =>
  typeof s.coordinates?.lat === 'number' &&
  typeof s.coordinates?.lng === 'number';

const toTelHref = (phone: string): string =>
  `tel:${phone.replace(/\D/g, '')}`;

const mapToFilter = (s: Service): ServiceFilter => {
  const t = s.networkType;
  if (t === 'saude')     return 'SAUDE';
  if (t === 'social')    return 'SOCIAL';
  if (t === 'direitos')  return 'DIREITOS';
  if (t === 'educacao')  return 'EDUCACAO';
  if (t === 'emergencia') return 'EMERGENCIA';
  return 'TODOS';
};

const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => null);
  } else {
    const el = document.createElement('textarea');
    el.value = text;
    el.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
};

// ─── Constantes ───────────────────────────────────────────────

const FILTERS: { id: ServiceFilter; label: string }[] = [
  { id: 'TODOS',     label: 'Todos' },
  { id: 'SAUDE',     label: 'Saúde' },
  { id: 'SOCIAL',    label: 'Social' },
  { id: 'DIREITOS',  label: 'Proteção e Direitos' },
  { id: 'EDUCACAO',  label: 'Gestão e Educação' },
  { id: 'EMERGENCIA', label: 'Emergência' },
];

// ─── Ícones inline ────────────────────────────────────────────

const IconPhone: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.07 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 23 18l-.08-1.08z" />
  </svg>
);

const IconCopy: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const IconCheck: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.25"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconSearch: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const IconMap: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="3,6 9,3 15,6 21,3 21,18 15,21 9,18 3,21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);

const IconClose: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const IconAlert: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// ─── Componente de card de serviço ────────────────────────────

interface ServiceCardProps {
  service: Service;
  isHighlighted: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isHighlighted }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);

  // Scroll e foco visual quando destacado via URL
  useEffect(() => {
    if (!isHighlighted || !ref.current) return;
    // Aguarda render completo antes do scroll
    const timer = setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      ref.current?.focus({ preventScroll: true });
    }, 160);
    return () => clearTimeout(timer);
  }, [isHighlighted]);

  const isMissing = !service.phone;

  const handleCopy = () => {
    copyToClipboard(
      [service.name, service.address, service.phone].filter(Boolean).join('\n')
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      id={`service-${service.id}`}
      ref={ref}
      tabIndex={isHighlighted ? -1 : undefined}
      className={[
        'management-card',
        isMissing ? 'management-card--missing' : '',
        isHighlighted ? 'management-card--highlighted' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={`Serviço: ${service.name}`}
    >
      {/* Cabeçalho */}
      <div className="network-card-header">
        <div>
          <p className="management-card-title">{service.name}</p>
          {service.category && (
            <p className="management-card-caption">{service.category}</p>
          )}
        </div>

        {/* Chip de tipo */}
        <span className={`ui-chip network-chip-${(service.networkType ?? 'default').toLowerCase()}`}>
          {FILTERS.find((f) => f.id === mapToFilter(service))?.label ?? 'Outro'}
        </span>
      </div>

      {/* Endereço */}
      {service.address && (
        <p className="management-card-meta">{service.address}</p>
      )}

      {/* Horário */}
      {service.hours && (
        <p className="management-card-hours">
          Horário: {service.hours}
        </p>
      )}

      {/* Telefone */}
      {service.phone ? (
        <p className="management-card-phone">
          <a
            href={toTelHref(service.phone)}
            aria-label={`Ligar para ${service.name}: ${service.phone}`}
          >
            {service.phone}
          </a>
        </p>
      ) : (
        <p className="management-card-warning">
          <IconAlert /> Telefone não cadastrado
        </p>
      )}

      {/* Observações */}
      {service.notes && (
        <p className="management-card-meta" style={{ marginTop: 6 }}>
          {service.notes}
        </p>
      )}

      {/* Ações */}
      <div className="network-card-actions">
        {service.phone && (
          <a
            href={toTelHref(service.phone)}
            className="ui-btn ui-btn--primary ui-btn--sm management-card-cta"
            aria-label={`Ligar agora para ${service.name}`}
          >
            <IconPhone /> Ligar agora
          </a>
        )}

        <button
          type="button"
          className="ui-btn ui-btn--ghost ui-btn--sm network-card-copy"
          onClick={handleCopy}
          aria-label="Copiar dados do serviço"
          aria-live="polite"
        >
          {copied ? <IconCheck /> : <IconCopy />}
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
    </div>
  );
};

// ─── NetworkPage ──────────────────────────────────────────────

export const NetworkPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const highlightId     = searchParams.get('highlight') ?? '';
  const viewParam       = searchParams.get('view') ?? '';
  const referralFilter  = searchParams.get('referral') ?? '';
  const normalizedRef   = referralFilter.toLowerCase();

  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState<ServiceFilter>('TODOS');
  const [showMap, setShowMap] = useState(
    viewParam === 'map' || Boolean(highlightId)
  );

  // Abre mapa automaticamente se vier parâmetro de URL
  useEffect(() => {
    if (viewParam === 'map' || highlightId) setShowMap(true);
  }, [viewParam, highlightId]);

  // Serviços filtrados
  const services = useMemo(() => {
    return PROTOCOL_DATA.services.filter((s) => {
      const text = `${s.name} ${s.address} ${s.phone ?? ''} ${s.notes ?? ''} ${s.category ?? ''}`.toLowerCase();
      const matchSearch   = !search.trim() || text.includes(search.toLowerCase());
      const matchFilter   = filter === 'TODOS' || mapToFilter(s) === filter;
      const matchReferral = !normalizedRef || text.includes(normalizedRef);
      return matchSearch && matchFilter && matchReferral;
    });
  }, [search, filter, normalizedRef]);

  const mappableServices = useMemo(
    () => services.filter(hasCoordinates),
    [services]
  );

  const clearReferral = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('referral');
    setSearchParams(next);
  };

  return (
    <div className="col">

      {/* Cabeçalho */}
      <div className="ui-page-header">
        <div>
          <h1 className="ui-page-title">Rede de serviços</h1>
          <p className="ui-page-subtitle">
            Serviços intersetoriais de proteção, saúde, assistência e educação
            disponíveis para encaminhamento.
          </p>
        </div>
      </div>

      {/* Faixa de filtro por encaminhamento (vindo do Decisor) */}
      {referralFilter && (
        <div className="network-referral-strip">
          <span className="network-referral-label">
            Filtrando por encaminhamento:
          </span>
          <strong className="network-referral-value">{referralFilter}</strong>
          <button
            type="button"
            className="network-referral-clear"
            onClick={clearReferral}
            aria-label="Limpar filtro de encaminhamento"
          >
            <IconClose /> Limpar
          </button>
        </div>
      )}

      {/* Busca + filtros */}
      <div className="card-flat">
        <div className="col" style={{ gap: 12 }}>

          {/* Campo de busca */}
          <div className="network-search-wrap">
            <span className="network-search-icon" aria-hidden="true">
              <IconSearch />
            </span>
            <input
              type="search"
              className="ui-input network-search-input"
              placeholder="Buscar por nome, endereço ou telefone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar serviço"
            />
          </div>

          {/* Chips de filtro */}
          <div className="network-filter-row" role="group" aria-label="Filtrar por tipo de serviço">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={[
                  'ui-chip',
                  'network-filter-chip',
                  filter === f.id ? 'network-filter-chip--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Toggle do mapa */}
          {mappableServices.length > 0 && (
            <button
              type="button"
              className="ui-btn ui-btn--ghost ui-btn--sm network-map-toggle"
              onClick={() => setShowMap((v) => !v)}
              aria-expanded={showMap}
              aria-controls="network-map-region"
            >
              <IconMap />
              {showMap ? 'Ocultar mapa' : `Ver mapa (${mappableServices.length} serviços)`}
            </button>
          )}
        </div>
      </div>

      {/* Mapa */}
      {showMap && mappableServices.length > 0 && (
        <div
          id="network-map-region"
          className="card-flat network-map-wrap"
          aria-label="Mapa de serviços"
        >
          <NetworkMap services={mappableServices} highlightId={highlightId} />
        </div>
      )}

      {/* Grid de cards */}
      {services.length > 0 ? (
        <div className="network-grid">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isHighlighted={service.id === highlightId}
            />
          ))}
        </div>
      ) : (
        <div className="card-flat network-empty">
          <p className="network-empty-text">
            Nenhum serviço encontrado para os filtros atuais.
          </p>
          <button
            type="button"
            className="ui-btn ui-btn--ghost ui-btn--sm"
            onClick={() => { setSearch(''); setFilter('TODOS'); }}
          >
            Limpar filtros
          </button>
        </div>
      )}

    </div>
  );
};
