import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
        <div className="flex items-start gap-4">
          <img
            src="/assets/logo-escola.png"
            alt="EE Ermelino Matarazzo"
            className="h-14 w-auto object-contain"
          />

          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
              Guia de Acolhimento — Protocolo Bússola
            </h1>

            <p className="mt-2 text-slate-600 max-w-2xl">
              Ferramenta interna de apoio à decisão para situações escolares,
              com foco em acolhimento responsável e encaminhamento adequado.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => navigate('/decisor')}
                className="px-6 py-3 rounded-xl bg-blue-700 text-white hover:bg-blue-800 transition font-medium"
              >
                Iniciar atendimento guiado
              </button>

              <button
                onClick={() => navigate('/rede')}
                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
              >
                Abrir Rede de Apoio
              </button>
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
          <button onClick={() => navigate('/versao')} className="card text-left hover:border-brand-200">
            <span className="badge-accent">Versão e Governança</span>
            <p className="mt-3 font-semibold text-text">Vigência, atualização e base institucional.</p>
          </button>
        </div>
      </section>
    </div>
  );
};
