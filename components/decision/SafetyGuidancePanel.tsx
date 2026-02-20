import React, { useMemo, useState } from 'react';

export type SafetyGuidanceGroupId =
  | 'do_not_do'
  | 'do_first'
  | 'how_to_speak'
  | 'good_practices';

export interface SafetyGuidanceItem {
  id: string;
  type: 'dont' | 'do' | 'why';
  text: string;
}

export interface SafetyGuidanceGroup {
  id: SafetyGuidanceGroupId;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tone: 'danger' | 'success' | 'info' | 'neutral';
  items: SafetyGuidanceItem[];
}

interface SafetyGuidancePanelProps {
  groups: SafetyGuidanceGroup[];
  mode?: 'compact' | 'full';
}

const TONE_STYLES: Record<SafetyGuidanceGroup['tone'], string> = {
  danger: 'bg-danger-50 border-danger-200',
  success: 'bg-emerald-50 border-emerald-200',
  info: 'bg-sky-50 border-sky-200',
  neutral: 'bg-slate-50 border-slate-200'
};

const extractEssentials = (groups: SafetyGuidanceGroup[]): SafetyGuidanceItem[] => {
  const doNot = groups.find((group) => group.id === 'do_not_do')?.items[0];
  const doFirst = groups.find((group) => group.id === 'do_first')?.items[0];
  const speak = groups.find((group) => group.id === 'how_to_speak')?.items[0];

  return [doNot, doFirst, speak].filter((item): item is SafetyGuidanceItem => !!item).slice(0, 3);
};

interface FullSafetyGuidanceDialogProps {
  groups: SafetyGuidanceGroup[];
  onClose: () => void;
}

const FullSafetyGuidanceDialog: React.FC<FullSafetyGuidanceDialogProps> = ({ groups, onClose }) => {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/40 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6 md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Orientações completas de segurança</h2>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Use para estudo e revisão de conduta. Em urgência, execute primeiro a ação imediata do decisor.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
          >
            Fechar
          </button>
        </header>

        <SafetyGuidancePanel groups={groups} mode="full" />
      </div>
    </div>
  );
};

export const SafetyGuidancePanel: React.FC<SafetyGuidancePanelProps> = ({ groups, mode = 'compact' }) => {
  const [open, setOpen] = useState(false);

  const essentials = useMemo(() => extractEssentials(groups), [groups]);

  if (mode === 'compact') {
    return (
      <section className="mt-4 mb-2">
        <div className="rounded-2xl border border-sky-100 bg-sky-50 p-3 sm:p-4">
          <h3 className="text-sm font-semibold text-slate-900">Lembretes rápidos de segurança</h3>
          <ul className="mt-1 space-y-1 text-xs text-slate-700 sm:text-sm">
            {essentials.map((item) => (
              <li key={item.id} className="flex gap-1.5">
                <span className="mt-0.5 text-sky-500">•</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-2 inline-flex items-center text-xs font-medium text-sky-700 hover:text-sky-800"
          >
            Ver orientações completas
          </button>
        </div>

        {open ? <FullSafetyGuidanceDialog groups={groups} onClose={() => setOpen(false)} /> : null}
      </section>
    );
  }

  return (
    <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
      {groups.map((group) => (
        <article key={group.id} className={`rounded-2xl border p-4 sm:p-5 ${TONE_STYLES[group.tone]}`}>
          <header className="mb-2 flex items-start gap-3">
            <div className="text-xl" aria-hidden="true">{group.icon}</div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 sm:text-base">{group.title}</h3>
              <p className="text-xs text-slate-600 sm:text-sm">{group.subtitle}</p>
            </div>
          </header>

          <ul className="mt-2 space-y-1.5 text-xs text-slate-800 sm:text-sm">
            {group.items.slice(0, 4).map((item) => (
              <li key={item.id} className="flex gap-1.5">
                <span className="mt-0.5 text-slate-400">•</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          {group.items.length > 4 ? (
            <details className="mt-2">
              <summary className="cursor-pointer text-xs font-medium text-sky-700">Ver mais exemplos</summary>
              <ul className="mt-1.5 space-y-1.5 text-xs text-slate-800 sm:text-sm">
                {group.items.slice(4).map((item) => (
                  <li key={item.id} className="flex gap-1.5">
                    <span className="mt-0.5 text-slate-400">•</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
        </article>
      ))}
    </div>
  );
};
