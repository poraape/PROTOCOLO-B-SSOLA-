import React from 'react';

type DomainCardProps = {
  domainKey?: string;
  label: string;
  icon?: string;
  domainColorVar: string;
  onClick: () => void;
  description?: string;
  summary?: string;
  examples?: string[];
  whenToUse?: string;
};

type DomainChipVariant = 'emergency' | 'urgent' | 'support' | 'neutral';

const DOMAIN_CHIPS: Record<string, { variant: DomainChipVariant; tooltip: string }> = {
  DOM_DIREITOS_Q1: { variant: 'emergency', tooltip: 'Violacao de direitos: acione a rede de protecao e registre o encaminhamento.' },
  DOM_COMPORTAMENTO_Q1: { variant: 'emergency', tooltip: 'Risco fisico ou comportamento grave: proteger e comunicar a gestao imediatamente.' },
  EMERGENCY_LEAF: { variant: 'emergency', tooltip: 'Emergencia: acione a resposta imediata e servicos de urgencia quando aplicavel.' },

  DOM_SAUDE_MENTAL_Q1: { variant: 'urgent', tooltip: 'Sofrimento emocional: acolher e encaminhar para cuidado especializado.' },
  DOM_SAUDE_FISICA_Q1: { variant: 'urgent', tooltip: 'Saude fisica: orientar familia e acionar a rede de saude conforme gravidade.' },
  DOM_SUBSTANCIAS_Q1: { variant: 'urgent', tooltip: 'Uso de substancias: acionar cuidado em saude e evitar resposta apenas punitiva.' },
  DOM_GRAVIDEZ_Q1: { variant: 'urgent', tooltip: 'Gravidez/saude sexual: encaminhar para UBS e acompanhamento psicossocial.' },
  DOM_VULNERABILIDADE_Q1: { variant: 'urgent', tooltip: 'Risco social/familiar: acionar CRAS/assistencia para acompanhamento.' },
  DOM_EVASAO_Q1: { variant: 'urgent', tooltip: 'Risco de evasao: agir cedo para recompor vinculo e apoio intersetorial.' },

  DOM_PEDAGOGICO_Q1: { variant: 'support', tooltip: 'Dificuldade pedagogica: acionar orientacao e plano de apoio escolar.' },
  DOM_CONFLITOS_Q1: { variant: 'support', tooltip: 'Conflitos: mediar, registrar e acompanhar para prevenir escalada.' },
  DOM_DISCRIMINACAO_Q1: { variant: 'support', tooltip: 'Discriminacao: aplicar protocolo de escuta e resposta institucional.' },
  DOM_INCLUSAO_Q1: { variant: 'support', tooltip: 'Inclusao: remover barreiras e ajustar apoios de acessibilidade.' }
};

const getDomainChipMeta = (domainKey?: string) =>
  DOMAIN_CHIPS[domainKey || ''] || {
    variant: 'neutral' as DomainChipVariant,
    tooltip: 'Demanda institucional: registrar e acompanhar com a equipe escolar.'
  };

export const DomainCard: React.FC<DomainCardProps> = ({
  domainKey,
  label,
  icon,
  domainColorVar,
  onClick,
  description,
  summary,
  examples = [],
  whenToUse
}) => {
  const chipMeta = getDomainChipMeta(domainKey);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Abrir domínio ${label}. ${chipMeta.tooltip}`}
      className="domain-card card-surface"
      style={{ ['--domain-card-color' as string]: `var(${domainColorVar})` }}
    >
      <span className="domain-card-strip" aria-hidden="true" />

      <div className="domain-card-content">
        <div className="domain-card-head">
          {icon ? <span className="domain-card-icon">{icon}</span> : null}
          <strong className="domain-card-title">{label}</strong>
          <span
            className={`chip chip--${chipMeta.variant}`}
            data-tooltip={chipMeta.tooltip}
            aria-hidden="true"
          >
            {label}
          </span>
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
