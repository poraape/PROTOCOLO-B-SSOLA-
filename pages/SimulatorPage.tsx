import React from 'react';
import { ScenarioPlayer } from '../components/scenario/ScenarioPlayer';
import { PageHeader } from '../components/ui/PageHeader';
import { Section } from '../components/ui/Section';
import { AppCard } from '../components/ui/AppCard';

export const SimulatorPage: React.FC = () => {
  return (
    <div className="stack space-3" style={{ paddingBottom: 20 }}>
      <PageHeader
        title="Treinamento de travessia da árvore"
        subtitle="Selecione um cenário realista e acompanhe a travessia passo a passo. Ative o modo treinamento para comparar suas decisões com o fluxo recomendado."
      />

      <Section>
        <AppCard>
          <ScenarioPlayer />
        </AppCard>
      </Section>
    </div>
  );
};
