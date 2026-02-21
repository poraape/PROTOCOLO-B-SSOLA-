import React from 'react';

type DomainCardProps = {
  label: string;
  icon?: string;
  domainColorVar: string;
  onClick: () => void;
  description?: string;
  summary?: string;
  examples?: string[];
  whenToUse?: string;
};

export const DomainCard: React.FC<DomainCardProps> = ({
  label,
  icon,
  domainColorVar,
  onClick,
  description,
  summary,
  examples = [],
  whenToUse
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Abrir domínio ${label}`}
      className="domain-card"
      style={{ ['--domain-card-color' as string]: `var(${domainColorVar})` }}
    >
      <span className="domain-card-strip" aria-hidden="true" />

      <div className="domain-card-content">
        <div className="domain-card-head">
          {icon ? <span className="domain-card-icon">{icon}</span> : null}
          <strong className="domain-card-title">{label}</strong>
        </div>

        {summary || description ? <p className="domain-card-summary">{summary || description}</p> : null}

        {examples.length > 0 ? (
          <ul className="domain-card-examples" aria-label="Exemplos">
            {examples.slice(0, 2).map((example) => (
              <li key={example}>{example}</li>
            ))}
          </ul>
        ) : null}

        {whenToUse ? <p className="domain-card-when">{whenToUse}</p> : null}
      </div>
    </button>
  );
};
