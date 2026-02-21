import React from 'react';
import { ProtocolMetaBanner } from '../components/ProtocolMetaBanner';
import { AppCard } from '../components/ui/AppCard';
import { PageHeader } from '../components/ui/PageHeader';
import { Section } from '../components/ui/Section';

export const AboutPage: React.FC = () => {
  return (
    <div className="stack space-3" style={{ paddingBottom: 20 }}>
      <PageHeader
        title="Versão e governança do protocolo"
        subtitle="Este aplicativo apoia a decisão institucional e não substitui a avaliação profissional da equipe escolar."
      />

      <Section>
        <AppCard>
          <ProtocolMetaBanner />
        </AppCard>
      </Section>

      <Section title="Escopo de uso">
        <AppCard>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            <li>Uso interno para apoio à tomada de decisão sob pressão.</li>
            <li>Sem coleta de dados pessoais em backend institucional.</li>
            <li>Em caso de dúvida, escalar para a gestão imediatamente.</li>
          </ul>
        </AppCard>
      </Section>
    </div>
  );
};
