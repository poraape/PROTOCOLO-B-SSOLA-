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

export const NetworkMap: React.FC<NetworkMapProps> = ({ services }) => {
  const verifiedServices = services.filter((service) => service.geoStatus !== "PENDENTE");

  if (!verifiedServices.length) return null;

  const center: [number, number] = [verifiedServices[0].coordinates.lat, verifiedServices[0].coordinates.lng];

  return (
    <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {verifiedServices.map((service) => (
        <Marker key={service.id} position={[service.coordinates.lat, service.coordinates.lng]}>
          <Popup>
            <strong>{service.name}</strong>
            <br />
            {service.phone}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
