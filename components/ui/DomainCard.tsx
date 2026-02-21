import React from 'react';

type DomainCardProps = {
  label: string;
  icon?: string;
  domainColorVar: string;
  onClick: () => void;
  description?: string;
};

export const DomainCard: React.FC<DomainCardProps> = ({ label, icon, domainColorVar, onClick, description }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Abrir domínio ${label}`}
      style={{
        width: '100%',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        minHeight: 44,
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-1)',
        padding: '14px 14px 14px 12px',
        cursor: 'pointer'
      }}
    >
      <span style={{ width: 4, minWidth: 4, alignSelf: 'stretch', borderRadius: 99, background: `var(${domainColorVar})` }} aria-hidden="true" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {icon ? <span style={{ color: `var(${domainColorVar})` }}>{icon}</span> : null}
          <strong style={{ color: 'var(--text)' }}>{label}</strong>
        </div>
        {description ? <p style={{ margin: '6px 0 0', fontSize: '0.86rem', color: 'var(--text-muted)' }}>{description}</p> : null}
      </div>
    </button>
  );
};
