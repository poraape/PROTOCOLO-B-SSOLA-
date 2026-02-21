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

  const positionedServices = useMemo(() => {
    const grouped = new Map<string, ServiceWithCoordinates[]>();
    mappableServices.forEach((service) => {
      const key = `${service.coordinates.lat.toFixed(6)}:${service.coordinates.lng.toFixed(6)}`;
      const current = grouped.get(key) || [];
      current.push(service);
      grouped.set(key, current);
    });

    return Array.from(grouped.values()).flatMap((group) => {
      if (group.length === 1) {
        return [{ service: group[0], position: [group[0].coordinates.lat, group[0].coordinates.lng] as [number, number] }];
      }

      return group.map((service, index) => {
        const radius = 0.00018;
        const angle = (2 * Math.PI * index) / group.length;
        return {
          service,
          position: [service.coordinates.lat + radius * Math.sin(angle), service.coordinates.lng + radius * Math.cos(angle)] as [number, number]
        };
      });
    });
  }, [mappableServices]);

  if (!mappableServices.length) return null;

  const highlightedService = highlightId ? mappableServices.find((service) => service.id === highlightId) : undefined;
  const centerService = highlightedService || mappableServices[0];
  const center: [number, number] = [centerService.coordinates.lat, centerService.coordinates.lng];
  const mapZoom = zoom ?? (highlightedService ? 15 : 13);

  return (
    <MapContainer center={center} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {positionedServices.map(({ service, position }) => (
        <Marker key={service.id} position={position}>
          <Popup>
            <strong>{service.name}</strong>
            <br />
            {service.phone}
            {service.geoStatus === 'PENDENTE' ? (
              <>
                <br />
                <em>(geolocalização pendente)</em>
              </>
            ) : null}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
