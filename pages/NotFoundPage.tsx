import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 0' }}>
      <div
        className="ios-card"
        style={{
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '2rem' }} aria-hidden="true">
          🧭
        </div>
        <h1 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text, #111827)' }}>Página não encontrada</h1>
        <p style={{ margin: 0, color: 'var(--text-muted, #64748B)' }}>
          O endereço informado não existe ou foi movido.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
          <button type="button" className="ui-btn ui-btn--primary" onClick={() => navigate('/')}>
            Ir para Início
          </button>
          <button type="button" className="ui-btn ui-btn--ghost" onClick={() => navigate('/busca')}>
            Abrir Busca
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
