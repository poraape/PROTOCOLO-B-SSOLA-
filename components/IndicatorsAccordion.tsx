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
  microcopy = 'Este bloco apoia a observação. Não substitui escuta qualificada.',
  defaultOpen = false
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  if (!items.length) return null;

  return (
    <section className="panel mt-4 p-3">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-sm font-semibold text-text hover:bg-white focus-visible:ring-2 focus-visible:ring-brand-500"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <span aria-hidden className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border text-base leading-none">
          {open ? '▾' : '▸'}
        </span>
      </button>

      {open ? (
        <div id={panelId} className="mt-2 px-2" role="region" aria-label="Lista de sinais e indicadores">
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
            {items.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs font-semibold text-muted">{microcopy}</p>
        </div>
      ) : null}
    </section>
  );
};
