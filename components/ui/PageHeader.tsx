import React from 'react';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  className?: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, rightSlot, className = '' }) => (
  <header className={`ui-page-header ${className}`.trim()}>
    <div>
      <h1 className="ui-page-title">{title}</h1>
      {subtitle ? <p className="ui-page-subtitle">{subtitle}</p> : null}
    </div>
    {rightSlot ? <div className="ui-page-actions">{rightSlot}</div> : null}
  </header>
);
