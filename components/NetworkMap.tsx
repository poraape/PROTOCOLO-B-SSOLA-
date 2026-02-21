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
  highlightId?: string;
  zoom?: number;
}

export const NetworkMap: React.FC<NetworkMapProps> = ({ services, highlightId, zoom }) => {
  const mappableServices = useMemo(
    () => services.filter((service): service is ServiceWithCoordinates => Boolean(service.coordinates)),
    [services]
  );

  const groupedServices = useMemo(() => {
    const grouped = new Map<string, ServiceWithCoordinates[]>();
    mappableServices.forEach((service) => {
      const key = `${service.coordinates.lat.toFixed(6)}:${service.coordinates.lng.toFixed(6)}`;
      const current = grouped.get(key) || [];
      current.push(service);
      grouped.set(key, current);
    });

    return Array.from(grouped.values()).map((servicesAtPoint) => ({
      position: [servicesAtPoint[0].coordinates.lat, servicesAtPoint[0].coordinates.lng] as [number, number],
      services: servicesAtPoint
    }));
  }, [mappableServices]);

  const highlightedGroup = useMemo(() => {
    if (!highlightId) return undefined;
    return groupedServices.find((group) => group.services.some((service) => service.id === highlightId));
  }, [groupedServices, highlightId]);

  const highlightedService = useMemo(() => {
    if (!highlightId) return undefined;
    return mappableServices.find((service) => service.id === highlightId);
  }, [highlightId, mappableServices]);

  if (!mappableServices.length) return null;

  const center: [number, number] = highlightedGroup?.position || groupedServices[0].position;
  const mapZoom = zoom ?? (highlightedService ? 15 : 13);

  return (
    <MapContainer center={center} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {groupedServices.map((group) => {
        const sortedServices = [...group.services].sort((a, b) => {
          if (a.id === highlightId) return -1;
          if (b.id === highlightId) return 1;
          return a.name.localeCompare(b.name, 'pt-BR');
        });

        return (
          <Marker key={`${group.position[0]}:${group.position[1]}`} position={group.position}>
            <Popup>
              {sortedServices.map((service, index) => (
                <div key={service.id} style={{ marginBottom: index < sortedServices.length - 1 ? 8 : 0 }}>
                  <strong>{service.name}</strong>
                  {service.id === highlightId ? ' (destacado)' : ''}
                  <br />
                  {service.phone}
                  {service.geoStatus === 'PENDENTE' ? (
                    <>
                      <br />
                      <em>(geolocalização pendente)</em>
                    </>
                  ) : null}
                </div>
              ))}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
