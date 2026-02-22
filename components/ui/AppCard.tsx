import React from 'react';

type AppCardProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
  as?: 'div' | 'section' | 'article' | 'aside';
  heading?: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
};

export const AppCard: React.FC<AppCardProps> = ({
  children,
  className = '',
  strong = false,
  as = 'section',
  heading,
  subtitle,
  rightSlot,
  ...rest
}) => {
  const Component = as;
  const cardVariantClass = strong ? 'card-elevated' : 'card-surface';

  return (
    <Component className={`${cardVariantClass} ${className}`.trim()} {...rest}>
      {heading || subtitle || rightSlot ? (
        <div className="ui-card-header">
          <div>
            {heading ? <h3 className="ui-card-title">{heading}</h3> : null}
            {subtitle ? <p className="ui-card-subtitle">{subtitle}</p> : null}
          </div>
          {rightSlot ? <div className="ui-card-actions">{rightSlot}</div> : null}
        </div>
      ) : null}
      {children}
    </Component>
  );
};
