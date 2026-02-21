import React from 'react';
import { GlassCard } from './GlassCard';

const bullets = [
  'Escuta ativa',
  'Não julgar',
  'Garantir sigilo',
  'Registrar fatos objetivos',
  'Não prometer o que não pode',
  'Se risco: acione gestão'
];

type BottomSheetOrientacoesProps = {
  open: boolean;
  onClose: () => void;
};

export const BottomSheetOrientacoes: React.FC<BottomSheetOrientacoesProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(2, 6, 23, 0.35)', zIndex: 1300 }} onClick={onClose}>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 12 }} onClick={(event) => event.stopPropagation()}>
        <GlassCard title="Orientações" subtitle="Guia rápido para condução" strong>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button type="button" onClick={onClose} style={{ marginTop: 12, width: '100%', borderRadius: 12, border: '1px solid var(--border)', background: '#fff', padding: '10px 12px' }}>
            Fechar
          </button>
        </GlassCard>
      </div>
    </div>
  );
};
