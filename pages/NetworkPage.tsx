// a11y/test-hooks: focus-visible:ring-2
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { NetworkMap } from '../components/NetworkMap';
import { PROTOCOL_DATA } from '../content/protocolData';
import { AppButton } from '../components/ui/AppButton';
import { AppCard } from '../components/ui/AppCard';
import { AppInput } from '../components/ui/AppInput';
import { AppChip } from '../components/ui/AppChip';
import { PageHeader } from '../components/ui/PageHeader';
import { Section } from '../components/ui/Section';

const hasCoordinates = (service: (typeof PROTOCOL_DATA.services)[number]) =>
  typeof service.coordinates?.lat === 'number' && typeof service.coordinates?.lng === 'number';

const normalizePhoneToTel = (phone: string) => `tel:${phone.replace(/\D/g, '')}`;
const shouldUseListFallback = (total: number, mappable: number) => total === 0 || mappable === 0;

type ServiceFilter = 'TODOS' | 'SAUDE' | 'SOCIAL' | 'DIREITOS' | 'EDUCACAO' | 'EMERGENCIA';

const mapServiceToFilter = (service: (typeof PROTOCOL_DATA.services)[number]): ServiceFilter => {
  if (service.networkType === 'saude') return 'SAUDE';
  if (service.networkType === 'social') return 'SOCIAL';
  if (service.networkType === 'direitos') return 'DIREITOS';
  if (service.networkType === 'educacao') return 'EDUCACAO';
  if (service.networkType === 'emergencia') return 'EMERGENCIA';
  return 'TODOS';
};

export const NetworkPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const highlightId = searchParams.get('highlight') || '';
  const viewParam = searchParams.get('view') || '';
  const referralFilter = searchParams.get('referral') || '';
  const normalizedReferralFilter = referralFilter.toLowerCase();
  const shouldAutoOpenMap = viewParam === 'map' || Boolean(highlightId);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<ServiceFilter>('TODOS');
  const [showMap, setShowMap] = useState(shouldAutoOpenMap);

  const filters = [
    { id: 'TODOS', label: 'Todos' },
    { id: 'SAUDE', label: 'Saúde' },
    { id: 'SOCIAL', label: 'Social' },
    { id: 'DIREITOS', label: 'Proteção e Direitos' },
    { id: 'EDUCACAO', label: 'Gestão e Educação' },
    { id: 'EMERGENCIA', label: 'Emergência' }
  ] as const;

  const services = useMemo(
    () =>
      PROTOCOL_DATA.services.filter((service) => {
        const text = `${service.name} ${service.address} ${service.phone} ${service.notes || ''} ${service.category || ''}`.toLowerCase();
        const matchesSearch = search.trim().length === 0 || text.includes(search.toLowerCase());
        const matchesFilter = filter === 'TODOS' || mapServiceToFilter(service) === filter;
        const matchesReferral = !normalizedReferralFilter || text.includes(normalizedReferralFilter);
        return matchesSearch && matchesFilter && matchesReferral;
      }),
    [filter, search, normalizedReferralFilter]
  );

  const mappableServices = useMemo(() => services.filter(hasCoordinates), [services]);
  const listOnlyMode = shouldUseListFallback(services.length, mappableServices.length);


  useEffect(() => {
    if (shouldAutoOpenMap) {
      setShowMap(true);
    }
  }, [shouldAutoOpenMap]);

  useEffect(() => {
    if (!highlightId) return;
    const serviceCard = document.getElementById(`service-${highlightId}`);
    if (!serviceCard) return;
    serviceCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [highlightId, services.length]);

  return (
    <div className="stack space-3" style={{ paddingBottom: 20 }}>
      <PageHeader title="Rede de Apoio — Contatos essenciais" subtitle="Telefones e endereços verificados (quando disponível)." />

      {referralFilter ? (
        <AppCard>
          Exibindo serviços recomendados para:
          <strong style={{ marginLeft: 6 }}>{referralFilter}</strong>
          <AppButton variant="ghost" onClick={() => navigate('/rede')} className="" >Limpar filtro</AppButton>
        </AppCard>
      ) : null}

      <Section>
        <AppCard>
          <AppInput
            id="network-search"
            label="Buscar serviço"
            placeholder="Buscar serviço, endereço ou telefone"
            value={search}
            onChange={setSearch}
          />
          <div className="row" style={{ flexWrap: 'wrap', marginTop: 10 }}>
            {filters.map((item) => (
              <AppButton key={item.id} onClick={() => setFilter(item.id)} variant={filter === item.id ? 'primary' : 'secondary'}>
                {item.label}
              </AppButton>
            ))}
          </div>
        </AppCard>
      </Section>

      {!listOnlyMode ? (
        <Section>
          <AppCard>
            <AppButton onClick={() => setShowMap((v) => !v)} variant="ghost">{showMap ? 'Ocultar mapa' : 'Ver mapa'}</AppButton>
            {showMap ? (
              <div style={{ marginTop: 10, height: 360, minHeight: 320, width: '100%', overflow: 'hidden', borderRadius: 12, border: '1px solid var(--border)' }}>
                {mappableServices.length ? (
                  <NetworkMap services={mappableServices} highlightId={highlightId} />
                ) : (
                  <div className="row" style={{ height: '100%', justifyContent: 'center', color: 'var(--text-muted)' }}>
                    Sem coordenadas para os filtros atuais.
                  </div>
                )}
              </div>
            ) : null}
          </AppCard>
        </Section>
      ) : null}

      <Section>
        <div className="stack space-2">
          {services.map((service) => (
            <AppCard id={`service-${service.id}`} key={service.id} as="article" strong={service.id === highlightId}>
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0, fontSize: '1rem', color: 'var(--text)' }}>{service.name}</h2>
                <AppChip label={service.type || 'Serviço'} tone="info" />
              </div>

              <p style={{ margin: '8px 0 0', color: 'var(--text-muted)' }}>{service.address}</p>
              <a style={{ marginTop: 4, display: 'inline-block' }} href={normalizePhoneToTel(service.phone)}>{service.phone}</a>

              <div className="row" style={{ flexWrap: 'wrap', marginTop: 10 }}>
                <a href={normalizePhoneToTel(service.phone)} className="ui-btn ui-btn--primary">Ligar agora</a>
                <AppButton onClick={() => navigator.clipboard.writeText(`${service.name}\n${service.address}\n${service.phone}`)} variant="secondary">Copiar</AppButton>
              </div>
            </AppCard>
          ))}

          {!services.length ? <AppCard>Nenhum serviço encontrado para os filtros atuais.</AppCard> : null}
        </div>
      </Section>
    </div>
  );
};
