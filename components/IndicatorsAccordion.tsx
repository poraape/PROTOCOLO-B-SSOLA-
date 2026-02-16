import React, { useId, useState } from 'react';

interface IndicatorsAccordionProps {
  items?: string[];
}

export const IndicatorsAccordion: React.FC<IndicatorsAccordionProps> = ({ items = [] }) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  if (!items.length) return null;

  return (
    <section className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-sm font-bold text-slate-800 hover:bg-slate-100"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>Como identificar?</span>
        <span aria-hidden>{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div id={panelId} className="mt-2 px-2">
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            {items.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs font-semibold text-slate-500">Em dúvida, escale para a gestão.</p>
        </div>
      )}
    </section>
  );
};
