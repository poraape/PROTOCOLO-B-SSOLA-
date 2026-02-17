import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="section-container space-y-5">
      <div className="card-elevated section-header">
        <div className="badge-soft mb-3">Ferramenta institucional interna</div>

        <h2 className="section-title">Atendimento Guiado — Protocolo Bússola</h2>

        <p className="section-subtitle">
          Apoio à decisão para situações escolares, com foco em ação rápida e encaminhamento adequado.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/decisor')}
            className="rounded-lg bg-blue-800 px-5 py-2.5 text-white transition hover:bg-blue-900 focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Iniciar atendimento
          </button>

          <button
            onClick={() => navigate('/rede')}
            className="rounded-lg border border-gray-300 px-5 py-2.5 transition hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Ver Rede de Apoio
          </button>
        </div>
      </div>

      <section>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted">Acesso rápido</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <button onClick={() => navigate('/rede')} className="card-soft text-left hover:border-brand-200">
            <span className="badge-success">Rede de Apoio</span>
            <p className="mt-3 font-semibold text-text">Contatos essenciais para encaminhamento.</p>
          </button>
          <button onClick={() => navigate('/recursos')} className="card-soft text-left hover:border-brand-200">
            <span className="badge">Modelos/Anexos essenciais</span>
            <p className="mt-3 font-semibold text-text">Anexo I, Anexo II e orientações.</p>
          </button>
          <button onClick={() => navigate('/sobre')} className="card-soft text-left hover:border-brand-200">
            <span className="badge-accent">Versão e Governança</span>
            <p className="mt-3 font-semibold text-text">Vigência, atualização e base institucional.</p>
          </button>
        </div>
      </section>

      <footer className="panel px-4 py-3 text-center text-xs font-semibold text-muted">
        Baseado no Protocolo (Fev/2026) — EE Ermelino Matarazzo
      </footer>
    </div>
  );
};
