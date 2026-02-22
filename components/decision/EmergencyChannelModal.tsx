import React from 'react';
import { SCHOOL_CONFIG } from '../../content/schoolConfig';

interface EmergencyChannelModalProps {
  open: boolean;
  onClose: () => void;
}

const channels = [
  { label: 'Ligar 192 (SAMU - emergência médica)', phone: SCHOOL_CONFIG.emergency.samu },
  { label: 'Ligar 190 (Polícia Militar - violência/arma)', phone: SCHOOL_CONFIG.emergency.police },
  { label: 'Ligar 193 (Bombeiros - incêndio/estrutura)', phone: SCHOOL_CONFIG.emergency.firefighters }
];

export const EmergencyChannelModal: React.FC<EmergencyChannelModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black/40 p-4" onClick={onClose}>
      <div className="mx-auto mt-24 max-w-md rounded-2xl border border-danger-200 bg-white p-5" onClick={(event) => event.stopPropagation()}>
        <h3 className="text-lg font-extrabold text-danger-700">Risco iminente: escolha o serviço</h3>
        <p className="mt-2 text-sm text-text">Selecione o serviço conforme o que está acontecendo agora e comunique a Direção em seguida.</p>

        <div className="mt-4 grid gap-2">
          {channels.map((channel) => (
            <a key={channel.phone} href={`tel:${channel.phone}`} className="ui-btn ui-btn--primary text-center focus-visible:ring-2 focus-visible:ring-brand-500">
              {channel.label}
            </a>
          ))}
        </div>

        <button type="button" onClick={onClose} className="ui-btn ui-btn--secondary mt-3 w-full focus-visible:ring-2 focus-visible:ring-brand-500">Fechar sem ligar</button>
      </div>
    </div>
  );
};
