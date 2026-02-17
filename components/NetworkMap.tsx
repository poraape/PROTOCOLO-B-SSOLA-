import React, { useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Service } from '../types';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

type ServiceWithCoordinates = Service & {
  coordinates: {
    lat: number;
    lng: number;
  };
};

interface NetworkMapProps {
  services: Service[];
  height?: number;
}

const getRiskLabel = (risk?: string) => {
  if (risk === 'EMERGENCIA') return 'Emergência';
  if (risk === 'ALTA_PRIORIDADE') return 'Alta prioridade';
  if (risk === 'APOIO_INSTITUCIONAL') return 'Apoio institucional';
  return 'Outros';
};

const getRiskBadgeClass = (risk?: string) => {
  if (risk === 'EMERGENCIA') return 'badge-EMERGENCIA';
  if (risk === 'ALTA_PRIORIDADE') return 'badge-ALTA_PRIORIDADE';
  if (risk === 'APOIO_INSTITUCIONAL') return 'badge-APOIO_INSTITUCIONAL';
  return 'badge-OUTROS';
};

const normalizePhone = (phone?: string) => {
  if (!phone) return '';
  return phone.replace(/[^\d+]/g, '');
};

const getMapsRouteUrl = (lat: number, lng: number, label?: string) => {
  const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const name = encodeURIComponent(label ?? 'Destino');
  if (isApple) {
    return `https://maps.apple.com/?daddr=${lat},${lng}&q=${name}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
};

const hasVerifiedCoordinates = (service: Service): service is ServiceWithCoordinates => {
  return !!service.coordinates
    && service.geoStatus === 'VERIFICADO'
    && Number.isFinite(service.coordinates.lat)
    && Number.isFinite(service.coordinates.lng);
};

export const NetworkMap: React.FC<NetworkMapProps> = ({ services, height = 360 }) => {
  const mappable = useMemo(() => services.filter(hasVerifiedCoordinates), [services]);

  const center = useMemo(() => {
    if (!mappable.length) return { lat: -23.53, lng: -46.45 };
    const lat = mappable.reduce((acc, s) => acc + s.coordinates.lat, 0) / mappable.length;
    const lng = mappable.reduce((acc, s) => acc + s.coordinates.lng, 0) / mappable.length;
    return { lat, lng };
  }, [mappable]);

  if (!mappable.length) {
    return (
      <div className="card-soft">
        <div className="text-sm font-semibold text-gray-800">Mapa indisponível (sem coordenadas verificadas)</div>
        <p className="mt-1 text-sm text-gray-600">
          A lista completa de serviços continua disponível abaixo. Para habilitar o mapa, inclua coordenadas (lat/lng)
          e marque <strong>geoStatus: "VERIFICADO"</strong> para os serviços.
        </p>
      </div>
    );
  }

  return (
    <div className="card-elevated">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-gray-900">Mapa da Rede (pins verificadas)</div>
          <div className="text-xs text-gray-500">Clique no pin para ligar ou abrir rota</div>
        </div>
        <div className="text-xs text-gray-500">
          Pins: <strong>{mappable.length}</strong>
        </div>
      </div>

      <div style={{ height }} className="overflow-hidden rounded-xl border border-gray-100">
        <MapContainer center={[center.lat, center.lng]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {mappable.map((service) => {
            const lat = service.coordinates.lat;
            const lng = service.coordinates.lng;
            const routeUrl = getMapsRouteUrl(lat, lng, service.name);
            const tel = normalizePhone(service.phone);

            return (
              <Marker key={service.id} position={[lat, lng]}>
                <Popup>
                  <div className="map-popover">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-gray-900">{service.name}</div>
                      <span className={`risk-badge ${getRiskBadgeClass(service.riskLevel)}`}>
                        {getRiskLabel(service.riskLevel)}
                      </span>
                    </div>

                    {service.strategicDescription ? (
                      <p className="mt-1 text-sm leading-snug text-gray-700">{service.strategicDescription}</p>
                    ) : null}

                    {service.address ? <p className="mt-2 text-xs text-gray-500">{service.address}</p> : null}

                    <div className="mt-3 flex gap-2">
                      {tel ? (
                        <a
                          href={`tel:${tel}`}
                          className={`rounded-md px-3 py-2 text-xs font-semibold ${
                            service.riskLevel === 'EMERGENCIA'
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'bg-blue-800 text-white hover:bg-blue-900'
                          }`}
                        >
                          Ligar
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">Sem telefone</span>
                      )}

                      <a
                        href={routeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md border border-gray-300 px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                      >
                        Abrir rota
                      </a>
                    </div>

                    <p className="mt-2 text-[11px] text-gray-400">Use o mapa como apoio. Em risco imediato, priorize 190/192.</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};
