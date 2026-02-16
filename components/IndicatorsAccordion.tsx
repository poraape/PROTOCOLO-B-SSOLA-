import React, { useId, useState } from 'react';

interface IndicatorsAccordionProps {
  items?: string[];
  title?: string;
  microcopy?: string;
  defaultOpen?: boolean;
}

export const IndicatorsAccordion: React.FC<IndicatorsAccordionProps> = ({
  items = [],
  title = 'Sinais e indicadores de apoio',
  microcopy = 'Este bloco apoia a observação. Não substitui escuta qualificada nem define diagnóstico.',
  defaultOpen = false
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  if (!items.length) return null;

  return (
    <section className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/50">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-sm font-bold text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-slate-100 dark:hover:bg-slate-800"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${open ? 'Recolher' : 'Expandir'} ${title}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <span aria-hidden className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-base leading-none dark:border-slate-600">
          {open ? '▾' : '▸'}
        </span>
      </button>

      {open ? (
        <div id={panelId} className="mt-2 px-2" role="region" aria-label="Lista de sinais e indicadores">
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-200">
            {items.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">{microcopy}</p>
        </div>
      ) : null}
    </section>
  );
};
