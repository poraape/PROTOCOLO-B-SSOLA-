import React from 'react';

type GlassCardProps = {
  title?: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
};

export const GlassCard: React.FC<GlassCardProps> = ({
  title,
  subtitle,
  rightSlot,
  children,
  className = '',
  strong = false,
}) => {
  const glassClass = strong ? 'card-glass card-glass--strong' : 'card-glass';

  return (
    <section className={`${glassClass} ${className}`.trim()}>
      {(title || rightSlot) && (
        <div className="ui-card-header">
          <div>
            {title && <h2 className="ui-card-title text-h3">{title}</h2>}
            {subtitle && <p className="ui-card-subtitle text-caption">{subtitle}</p>}
          </div>
          {rightSlot}
        </div>
      )}
      {children}
    </section>
  );
};
