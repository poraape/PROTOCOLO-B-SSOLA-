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
        <AppCard>
          <div className="stack space-3">
            <SchoolShield variant="full" />
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>
              Ferramenta interna de apoio à decisão para situações escolares,
              com foco em acolhimento responsável e encaminhamento adequado.
            </p>
            <div className="row" style={{ flexWrap: 'wrap' }}>
              <AppButton onClick={() => navigate('/decisor')} variant="primary">Iniciar atendimento guiado</AppButton>
              <AppButton onClick={() => navigate('/rede')} variant="secondary">Abrir Rede de Apoio</AppButton>
            </div>
          </div>
        </AppCard>
      </Section>

      <Section title="Acesso rápido">
        <div className="grid-3">
          <AppCard as="article">
            <button onClick={() => navigate('/rede')} className="ui-btn ui-btn--ghost" style={{ width: '100%', textAlign: 'left' }}>
              Rede de Apoio
            </button>
          </AppCard>
          <AppCard as="article">
            <button onClick={() => navigate('/glossario')} className="ui-btn ui-btn--ghost" style={{ width: '100%', textAlign: 'left' }}>
              Glossário formativo
            </button>
          </AppCard>
          <AppCard as="article">
            <button onClick={() => navigate('/versao')} className="ui-btn ui-btn--ghost" style={{ width: '100%', textAlign: 'left' }}>
              Versão e Governança
            </button>
          </AppCard>
        </div>
      </Section>
    </div>
  );
};
