// a11y/test-hooks: focus-visible:ring-2 sm:grid-cols-2
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SchoolShield } from '../components/SchoolShield';
import { AppButton } from '../components/ui/AppButton';
import { AppCard } from '../components/ui/AppCard';
import { Section } from '../components/ui/Section';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="stack space-3">
      <Section>
        <AppCard className="dashboard-hero-card" strong>
          <div className="stack space-3">
            <SchoolShield variant="full" />
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>
              Ferramenta interna de apoio à decisão para situações escolares,
              com foco em acolhimento responsável e encaminhamento adequado.
            </p>
            <div className="row dashboard-cta-row" style={{ flexWrap: 'wrap' }}>
              <AppButton
                onClick={() => navigate('/decisor')}
                variant="primary"
                className="dashboard-cta-primary"
              >
                Iniciar atendimento guiado
              </AppButton>
              <AppButton
                onClick={() => navigate('/rede')}
                variant="secondary"
                className="dashboard-cta-secondary"
              >
                Consultar Rede de Apoio
              </AppButton>
            </div>
          </div>
        </AppCard>
      </Section>

      <Section title="Ações de apoio">
        <div className="grid-3">
          <AppCard as="article">
            <button onClick={() => navigate('/recursos')} className="ui-btn ui-btn--ghost dashboard-support-action">
              Recursos de apoio
            </button>
          </AppCard>
          <AppCard as="article">
            <button onClick={() => navigate('/rede')} className="ui-btn ui-btn--ghost dashboard-support-action">
              Rede de Apoio
            </button>
          </AppCard>
          <AppCard as="article">
            <button onClick={() => navigate('/versao')} className="ui-btn ui-btn--ghost dashboard-support-action">
              Versão e Governança
            </button>
          </AppCard>
        </div>
      </Section>
    </div>
  );
};
