import React, { useMemo, useState } from 'react';
import { PROTOCOL_DATA, RECURSOS } from '../content/protocolData';
import { ProtocolVersionBadge } from '../components/ProtocolVersionBadge';

const formatDateBR = (value: string) => {
  if (!value) return '____/____/______';
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
};

export const ResourcesPage: React.FC = () => {
  const [nomeAluno, setNomeAluno] = useState('');
  const [relato, setRelato] = useState('');
  const [dataRegistro, setDataRegistro] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');

  const anexoIFields = PROTOCOL_DATA.instruments.anexoI.requiredFields;

  const placonText = useMemo(() => {
    return [
      'E.E. ERMELINO MATARAZZO (CIE 2835 - DE Leste 1)',
      'ANEXO I - FICHA DE ACOLHIMENTO / REGISTRO INICIAL',
      `Data do registro: ${formatDateBR(dataRegistro)}`,
      `Nome do aluno(a): ${nomeAluno || '[NÃO INFORMADO]'}`,
      `Relato objetivo: ${relato || '[PREENCHER RELATO]'}`,
      '',
      'Campos obrigatórios do protocolo:',
      ...anexoIFields.map((field, index) => `${index + 1}. ${field}`)
    ].join('\n');
  }, [anexoIFields, dataRegistro, nomeAluno, relato]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(placonText);
      setCopyFeedback('Conteúdo copiado para colar no PLACON.');
      setTimeout(() => setCopyFeedback(''), 2500);
    } catch {
      setCopyFeedback('Não foi possível copiar automaticamente. Copie manualmente no bloco abaixo.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-20">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-card { box-shadow: none !important; border-color: #111 !important; }
          body { background: #fff !important; }
        }
      `}</style>

      <header className="no-print rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-black uppercase tracking-widest text-[#007AFF]">Documentos inteligentes</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Gerador de Anexo I (Acolhimento)</h1>
        <p className="mt-2 text-sm text-slate-600">
          Preencha os campos essenciais, copie para o PLACON e imprima a ficha quando necessário.
        </p>
      </header>

      <ProtocolVersionBadge />


      <section className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-800">Conteúdo institucional oficial</p>
        <p className="mt-1 text-sm text-emerald-900">Campos e estrutura dos anexos refletem o protocolo vigente da unidade.</p>
      </section>

      <section className="no-print rounded-3xl border border-amber-300 bg-amber-50 p-4">
        <h2 className="text-sm font-black uppercase tracking-wide text-amber-800">Aviso de Privacidade</h2>
        <p className="mt-1 text-sm text-amber-900">
          Nada é salvo no servidor. Todos os dados deste formulário ficam apenas no navegador deste dispositivo.
        </p>
      </section>

      <section className="no-print grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">Formulário rápido</h2>

          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-bold text-slate-700">Nome do Aluno</span>
              <input
                value={nomeAluno}
                onChange={(e) => setNomeAluno(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-[#007AFF] focus:outline-none"
                placeholder="Nome completo"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-bold text-slate-700">Data</span>
              <input
                type="date"
                value={dataRegistro}
                onChange={(e) => setDataRegistro(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-[#007AFF] focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-bold text-slate-700">Relato</span>
              <textarea
                value={relato}
                onChange={(e) => setRelato(e.target.value)}
                rows={7}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-[#007AFF] focus:outline-none"
                placeholder="Descreva objetivamente os fatos observados"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={handleCopy}
              className="rounded-xl bg-[#007AFF] px-4 py-2 text-sm font-bold text-white hover:bg-[#005fcc]"
            >
              Copiar para PLACON
            </button>
            <button
              onClick={handlePrint}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100"
            >
              Imprimir Ficha
            </button>
          </div>

          {copyFeedback && <p className="mt-3 text-sm font-semibold text-emerald-700">{copyFeedback}</p>}
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">Texto pronto para PLACON</h2>
          <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-800">
            {placonText}
          </pre>
        </article>
      </section>

      <section className="print-card rounded-3xl border border-slate-300 bg-white p-6 shadow-sm">
        <header className="border-b border-slate-300 pb-4">
          <p className="text-center text-xs font-black uppercase tracking-widest text-slate-600">
            Estado de São Paulo • Secretaria da Educação
          </p>
          <h2 className="mt-2 text-center text-2xl font-extrabold text-slate-900">E.E. Ermelino Matarazzo</h2>
          <p className="mt-1 text-center text-sm text-slate-700">CIE 2835 • DE Leste 1</p>
          <p className="mt-3 text-center text-sm font-bold text-slate-800">ANEXO I — FICHA DE ACOLHIMENTO / REGISTRO INICIAL</p>
        </header>

        <div className="mt-5 grid gap-4 text-sm text-slate-900">
          <p>
            <span className="font-bold">Nome do Aluno(a): </span>
            {nomeAluno || '____________________________________________'}
          </p>
          <p>
            <span className="font-bold">Data: </span>
            {formatDateBR(dataRegistro)}
          </p>
          <div>
            <p className="font-bold">Relato objetivo:</p>
            <p className="mt-2 min-h-[120px] whitespace-pre-wrap rounded-xl border border-slate-200 p-3">
              {relato || '\n\n\n'}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 p-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-600">Campos obrigatórios do protocolo</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-800">
            {anexoIFields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
          <div>
            <p className="border-t border-slate-400 pt-2 text-center">Assinatura do responsável pelo registro</p>
          </div>
          <div>
            <p className="border-t border-slate-400 pt-2 text-center">Assinatura da direção</p>
          </div>
        </div>
      </section>

      <section className="no-print rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-extrabold text-slate-900">Documentos de referência</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {RECURSOS.map((recurso) => (
            <li key={recurso.id} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
              <p className="font-semibold">{recurso.titulo}</p>
              <p className="text-xs text-slate-500">{recurso.descricao}</p>
              <p className="mt-1 text-[11px] font-semibold text-slate-500">{recurso.contentOrigin} · {recurso.sourceRef || 'Fonte institucional'}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
