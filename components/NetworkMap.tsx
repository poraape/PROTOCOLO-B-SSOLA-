import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Service } from '../types';

type ServiceWithCoordinates = Service & {
  coordinates: {
    lat: number;
    lng: number;
  };
};

interface NetworkMapProps {
  services: ServiceWithCoordinates[];
}

export const NetworkMap: React.FC<NetworkMapProps> = ({ services }) => {
  if (!services.length) return null;

  const center: [number, number] = [services[0].coordinates.lat, services[0].coordinates.lng];

  return (
    <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {services.map((service) => (
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
