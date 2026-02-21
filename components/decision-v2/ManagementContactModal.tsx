import React from 'react';
import { PROTOCOL_DATA } from '../../content/protocolData';
import { designTokens } from '../../styles/design-tokens';

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
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
        padding: designTokens.spacing.md
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Contatos da gestão"
        onClick={(event) => event.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: designTokens.borderRadius.lg,
          padding: designTokens.spacing.lg,
          width: 'min(92vw, 680px)',
          boxShadow: designTokens.shadows.lg
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: designTokens.spacing.md }}>
          <h3 style={{ margin: 0 }}>Falar com gestão</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar contatos da gestão"
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '20px' }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: designTokens.spacing.md }}>
          {MANAGEMENT_SERVICES.map((target) => {
            const service = serviceById.get(target.id);

            if (!service) {
              console.warn(`[DecisionTreeV2] Serviço de gestão não encontrado: ${target.id}`);
              return (
                <div
                  key={target.id}
                  style={{
                    border: '1px dashed #DC2626',
                    borderRadius: designTokens.borderRadius.md,
                    padding: designTokens.spacing.md
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{target.label}</div>
                  <div style={{ marginTop: '6px', color: '#B91C1C', fontSize: '14px' }}>Serviço não encontrado ({target.id})</div>
                </div>
              );
            }

            return (
              <div
                key={service.id}
                style={{
                  border: `1px solid ${designTokens.colors.background.muted}`,
                  borderRadius: designTokens.borderRadius.md,
                  padding: designTokens.spacing.md,
                  backgroundColor: designTokens.colors.background.secondary
                }}
              >
                <div style={{ fontWeight: 700 }}>{target.label}</div>
                <div style={{ fontSize: '14px', marginTop: '4px' }}>{service.name}</div>
                <div style={{ fontSize: '18px', marginTop: '8px', color: designTokens.colors.routine }}>{service.phone}</div>
                {service.address ? <div style={{ fontSize: '13px', marginTop: '6px' }}>{service.address}</div> : null}
                {service.hours ? <div style={{ fontSize: '13px', marginTop: '4px' }}>Horário: {service.hours}</div> : null}

                {service.phone ? (
                  <a
                    href={`tel:${toDialNumber(service.phone)}`}
                    style={{
                      marginTop: designTokens.spacing.sm,
                      display: 'inline-block',
                      padding: '8px 12px',
                      borderRadius: designTokens.borderRadius.md,
                      backgroundColor: designTokens.colors.routine,
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '14px'
                    }}
                  >
                    Ligar
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
