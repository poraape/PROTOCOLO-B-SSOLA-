import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export const ActionCard = () => {
  return (
    <Link to="/decisor" className="action-card">
      <div className="action-card-content">
        <h3 className="action-card-title">Não sabe por onde começar?</h3>
        <p className="action-card-description">
          Use nosso decisor guiado para identificar a situação e encontrar a
          melhor rota de ação.
        </p>
      </div>
      <div className="action-card-icon">
        <Compass size={24} />
      </div>
    </Link>
  );
};
