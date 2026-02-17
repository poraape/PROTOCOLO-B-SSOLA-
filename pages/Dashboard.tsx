import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SchoolShield } from '../components/SchoolShield';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <section className="card">
        <div className="flex items-start gap-4">
          <SchoolShield className="h-11 w-11 shrink-0" />
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-text">Hub de Comando — Protocolo Bússola</h1>
            <p className="mt-2 text-sm text-muted">
              Atendimento guiado para situações escolares, com foco em ação rápida e encaminhamento correto.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={() => navigate('/decisor')} className="btn-primary focus-visible:ring-2 focus-visible:ring-brand-500">Iniciar atendimento</button>
              <button onClick={() => navigate('/rede')} className="btn-secondary focus-visible:ring-2 focus-visible:ring-brand-500">Ver Rede de Apoio</button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted">Acesso rápido</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <button onClick={() => navigate('/rede')} className="card text-left hover:border-brand-200">
            <span className="badge-success">Rede de Apoio</span>
            <p className="mt-3 font-semibold text-text">Contatos essenciais para encaminhamento.</p>
          </button>
          <button onClick={() => navigate('/recursos')} className="card text-left hover:border-brand-200">
            <span className="badge">Modelos/Anexos essenciais</span>
            <p className="mt-3 font-semibold text-text">Anexo I, Anexo II e orientações.</p>
          </button>
          <button onClick={() => navigate('/sobre')} className="card text-left hover:border-brand-200">
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
