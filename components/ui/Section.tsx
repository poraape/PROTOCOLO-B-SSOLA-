import React from 'react';

type SectionProps = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export const Section: React.FC<SectionProps> = ({ title, subtitle, children, className = '' }) => (
  <section className={`ui-section ${className}`.trim()}>
    {title ? <h2 className="ui-section-title">{title}</h2> : null}
    {subtitle ? <p className="ui-section-subtitle">{subtitle}</p> : null}
    {children}
  </section>
);
