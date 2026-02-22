import React from 'react';
import { ProtocolMetaBanner } from '../components/ProtocolMetaBanner';

export const AboutPage: React.FC = () => {
  return (
    <div className="col" style={{ paddingBottom: 20 }}>
      <div className="card-flat">
        <div className="ui-section">
          <div>
            <h1 className="ui-page-title">Versão e governança do protocolo</h1>
            <p className="ui-page-subtitle">
              Este aplicativo apoia a decisão institucional e não substitui a avaliação profissional da equipe escolar.
            </p>
          </div>

          <ProtocolMetaBanner />
        </div>
      </div>

      <div className="card-flat">
        <div className="ui-section">
          <h2 className="ui-section-title">Escopo de uso</h2>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            <li>Uso interno para apoio à tomada de decisão sob pressão.</li>
            <li>Sem coleta de dados pessoais em backend institucional.</li>
            <li>Em caso de dúvida, escalar para a gestão imediatamente.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
