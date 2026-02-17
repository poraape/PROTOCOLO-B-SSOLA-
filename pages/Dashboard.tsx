import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SchoolShield } from '../components/SchoolShield';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const coreActions = [
    {
      title: 'Rede de Apoio',
      subtitle: 'Telefones e endereços da rede',
      icon: '📞',
      onClick: () => navigate('/rede')
    },
    {
      title: 'Modelos de Documentos',
      subtitle: 'Anexo I e orientações',
      icon: '📄',
      onClick: () => navigate('/recursos')
    }
  ];


  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-600 to-blue-700 p-6 text-white shadow-lg dark:border-slate-700 dark:from-sky-700 dark:to-blue-900">
        <div className="flex items-center gap-4">
          <SchoolShield className="h-16 w-16 shrink-0" />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">Hub de Comando</p>
            <h1 className="mt-1 text-2xl font-extrabold leading-tight">Bússola de Atendimento Escolar</h1>
            <p className="mt-2 text-sm text-blue-100">
              Atendimento guiado para situações de violência e vulnerabilidade, com foco em ação rápida.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border-2 border-amber-300 bg-white p-4 shadow-sm dark:border-amber-500/60 dark:bg-slate-900">
        <button
          onClick={() => navigate('/decisor')}
          className="w-full rounded-2xl bg-amber-400 px-6 py-7 text-center text-lg font-black uppercase tracking-wide text-slate-900 shadow-md transition hover:bg-amber-300 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:bg-amber-300"
        >
          INICIAR ATENDIMENTO
        </button>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {coreActions.map((action) => (
          <button
            key={action.title}
            onClick={action.onClick}
            className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-sky-600"
          >
            <p className="text-2xl">{action.icon}</p>
            <h2 className="mt-2 text-base font-extrabold text-slate-900 dark:text-slate-100">{action.title}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{action.subtitle}</p>
          </button>
        ))}
      </section>
      <footer className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        Baseado no Protocolo Fev/2026 - E.E. Ermelino Matarazzo
      </footer>
    </div>
  );
};
