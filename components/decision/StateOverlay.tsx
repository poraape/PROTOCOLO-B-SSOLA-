import React from 'react';

type StateType = 'loading' | 'error' | 'success';

const STYLE_BY_TYPE: Record<StateType, string> = {
  loading: 'border-sky-200 bg-sky-50 text-sky-800',
  error: 'border-danger-200 bg-danger-50 text-danger-800',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800'
};

const ICON_BY_TYPE: Record<StateType, string> = {
  loading: '⏳',
  error: '⚠️',
  success: '✓'
};

export const StateOverlay: React.FC<{ type: StateType; text: string; inline?: boolean }> = ({ type, text, inline = false }) => {
  const box = (
    <div className={`rounded-2xl border p-4 text-sm font-semibold ${STYLE_BY_TYPE[type]}`} role="status" aria-live="polite">
      <span className="mr-2">{ICON_BY_TYPE[type]}</span>
      {text}
    </div>
  );

  if (inline) return box;

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md">{box}</div>
    </div>
  );
};
