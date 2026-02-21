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

  if (!mappableServices.length) return null;

  const highlightedService = highlightId ? mappableServices.find((service) => service.id === highlightId) : undefined;
  const centerService = highlightedService || mappableServices[0];
  const center: [number, number] = [centerService.coordinates.lat, centerService.coordinates.lng];
  const mapZoom = zoom ?? (highlightedService ? 15 : 13);

  return (
    <MapContainer center={center} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {mappableServices.map((service) => (
        <Marker key={service.id} position={[service.coordinates.lat, service.coordinates.lng]}>
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
