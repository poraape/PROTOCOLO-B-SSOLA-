import React from 'react';
import { GlassCard } from './GlassCard';

const bullets = [
  'Escuta ativa',
  'Não julgar',
  'Preservar privacidade',
  'Registrar fatos objetivos',
  'Não prometer o que não pode',
  'Se houver risco imediato à vida: acione 192 agora'
];

export const SidePanelOrientacoes: React.FC = () => {
  return (
    <aside className="hidden xl:block" style={{ width: 280 }}>
      <GlassCard title="Orientações" subtitle="Apoio rápido durante o atendimento">
        <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          {bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </GlassCard>
    </aside>
  );
};
