import React from 'react';
import { ScenarioPlayer } from '../components/scenario/ScenarioPlayer';

export const SimulatorPage: React.FC = () => {
  return (
    <div className="col" style={{ paddingBottom: 20 }}>
      <div className="card-flat">
        <div className="ui-section">
          <div>
            <h1 className="ui-page-title">Simulador Institucional Bússola v2.0</h1>
            <p className="ui-page-subtitle">
              Interface reconstruída para decisão em 5-10 segundos: contexto claro, ação prioritária, feedback pedagógico e histórico colapsável.
            </p>
          </div>

          <ScenarioPlayer />
        </div>
      </div>
    </div>
  );
};
