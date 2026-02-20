import React, { useState } from 'react';

export const TERM_DEFINITIONS: Record<string, string> = {
  notificar: 'Informar formalmente um órgão competente quando houver obrigação legal.',
  encaminhar: 'Direcionar o estudante para serviço adequado de saúde, proteção ou assistência.',
  acionar: 'Chamar imediatamente um serviço ou responsável para atuar no caso.',
  registro_formal: 'Registro feito no canal oficial da escola. Não é feito neste app.',
  comunicar: 'Informar internamente a gestão/coordenação para responsabilização institucional.',
  risco_iminente: 'Situação com risco imediato de morte, lesão grave ou violência em curso.'
};

export const TermTooltip: React.FC<{ term: keyof typeof TERM_DEFINITIONS; label: string }> = ({ term, label }) => {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex items-center gap-1">
      <span className="underline decoration-dotted">{label}</span>
      <button
        type="button"
        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border text-xs text-muted focus-visible:ring-2 focus-visible:ring-brand-500"
        aria-label={`Ver definição de ${label}`}
        onClick={() => setOpen((value) => !value)}
      >
        i
      </button>
      {open ? (
        <span className="absolute left-0 top-6 z-20 w-64 rounded-lg border border-border bg-white p-2 text-xs text-text shadow-soft">
          {TERM_DEFINITIONS[term]}
        </span>
      ) : null}
    </span>
  );
};
