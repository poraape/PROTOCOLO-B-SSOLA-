import React from 'react';
import { PROTOCOL_DATA } from '../../content/protocolData';

interface ManagementContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MANAGEMENT_SERVICES = [
  { id: 'gestao-direcao', label: 'Direção' },
  { id: 'gestao-vice', label: 'Vice-direção' },
  { id: 'gestao-coordenacao', label: 'Coordenação' }
] as const;

const serviceById = new Map(PROTOCOL_DATA.services.map((service) => [service.id, service] as const));

const toDialNumber = (phone: string) => phone.replace(/\D/g, '');

export const ManagementContactModal: React.FC<ManagementContactModalProps> = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div role="presentation" onClick={onClose} className="management-modal-overlay">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Canais de contato da gestão"
        onClick={(event) => event.stopPropagation()}
        className="management-modal-dialog"
      >
        <div className="management-modal-header">
          <h3 className="management-modal-title">Comunicar a gestão agora</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal de contatos da gestão"
            className="management-modal-close"
          >
            ✕
          </button>
        </div>

        <div className="management-modal-grid">
          {MANAGEMENT_SERVICES.map((target) => {
            const service = serviceById.get(target.id);

            if (!service) {
              console.warn(`[DecisionTreeV2] Serviço de gestão não encontrado: ${target.id}`);
              return (
                <div key={target.id} className="management-card card-critical card-critical--urgent management-card--missing">
                  <div className="management-card-title">{target.label}</div>
                  <div className="management-card-warning">Contato não localizado ({target.id})</div>
                </div>
              );
            }

            return (
              <div key={service.id} className="management-card card-critical card-critical--urgent">
                <div className="management-card-title">{target.label}</div>
                <div className="management-card-caption">{service.name}</div>
                <div className="management-card-phone">{service.phone}</div>
                {service.address ? <div className="management-card-meta">{service.address}</div> : null}
                {service.hours ? <div className="management-card-hours">Horário: {service.hours}</div> : null}

                {service.phone ? (
                  <a
                    href={`tel:${toDialNumber(service.phone)}`}
                    className="management-card-cta"
                  >
                    Ligar agora
                  </a>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
