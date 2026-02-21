import React from 'react';

type GlassCardProps = {
  title?: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
};

export const GlassCard: React.FC<GlassCardProps> = ({ title, subtitle, rightSlot, children, className = '', strong = false }) => {
  return (
    <section
      className={className}
      style={{
        background: strong ? 'var(--surface-strong)' : 'var(--surface)',
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-1)',
        padding: '16px 20px'
      }}
    >
      {title || subtitle || rightSlot ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' }}>
          <div>
            {title ? <h2 style={{ margin: 0, color: 'var(--text)', fontSize: '1.1rem' }}>{title}</h2> : null}
            {subtitle ? <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.92rem' }}>{subtitle}</p> : null}
          </div>
          {rightSlot}
        </div>
      ) : null}
      {children}
    </section>
  );
};
