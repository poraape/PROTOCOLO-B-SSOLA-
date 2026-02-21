import React from 'react';
import { ScenarioPlayer } from '../components/scenario/ScenarioPlayer';
import { PageHeader } from '../components/ui/PageHeader';
import { Section } from '../components/ui/Section';
import { AppCard } from '../components/ui/AppCard';

export const SimulatorPage: React.FC = () => {
  return (
    <div className="stack space-3" style={{ paddingBottom: 20 }}>
      <PageHeader
        title="Simulador Institucional Bússola v2.0"
        subtitle="Interface reconstruída para decisão em 5-10 segundos: contexto claro, ação prioritária, feedback pedagógico e histórico colapsável."
      />

      <Section>
        <AppCard>
          <ScenarioPlayer />
        </AppCard>
      </Section>
    </div>
  );
};
