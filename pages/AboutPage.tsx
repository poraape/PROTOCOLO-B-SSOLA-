import React from 'react';
import { ProtocolMetaBanner } from '../components/ProtocolMetaBanner';

export const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-20">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-black uppercase tracking-widest text-[#007AFF]">Sobre</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Versão e governança do protocolo</h1>
        <p className="mt-2 text-sm text-slate-600">
          Este aplicativo apoia a decisão institucional e não substitui a avaliação profissional da equipe escolar.
        </p>
      </header>

      <ProtocolMetaBanner />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-black uppercase tracking-wide text-slate-500">Escopo de uso</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Uso interno para apoio à tomada de decisão sob pressão.</li>
          <li>Sem coleta de dados pessoais em backend institucional.</li>
          <li>Em caso de dúvida, escalar para a gestão imediatamente.</li>
        </ul>
      </section>
    </div>
  );
};
