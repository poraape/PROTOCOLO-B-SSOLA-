import React, { useMemo, useState } from 'react';
import { ALERTS_DATA, NODE_TAG_MAP } from '../../data/alerts';
import { GOOD_PRACTICES_DATA } from '../../data/goodPractices';

interface AlertPanelProps {
  context?: 'inline' | 'orientacoes';
  ruleId?: string;
  categoryKey?: keyof typeof NODE_TAG_MAP;
}

const severityTone: Record<string, string> = {
  critical: 'border-danger-200',
  important: 'border-amber-300',
  standard: 'border-slate-200'
};

export const AlertPanel: React.FC<AlertPanelProps> = ({ context = 'orientacoes', ruleId, categoryKey }) => {
  const [open, setOpen] = useState(false);

  const tags = useMemo(() => {
    if (context === 'orientacoes') return [];
    const mapped = categoryKey ? NODE_TAG_MAP[categoryKey] || [] : [];
    return Array.from(new Set([...(ruleId ? [ruleId] : []), ...mapped]));
  }, [context, ruleId, categoryKey]);

  const alerts = useMemo(() => {
    if (context === 'orientacoes') return ALERTS_DATA;
    return ALERTS_DATA.filter((alert) => alert.tags.some((tag) => tags.includes(tag)));
  }, [context, tags]);

  const practices = GOOD_PRACTICES_DATA.slice(0, context === 'orientacoes' ? GOOD_PRACTICES_DATA.length : 3);

  return (
    <section className="card p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Orientações de segurança</h3>
        {context === 'inline' ? (
          <button type="button" className="btn-secondary text-xs" onClick={() => setOpen((v) => !v)}>
            ⚠️ {open ? 'Ocultar' : 'Ver alertas'}
          </button>
        ) : null}
      </div>

      {(context === 'orientacoes' || open) && (
        <div className="mt-3 space-y-3">
          {alerts.map((alert) => (
            <article key={alert.id} className={`rounded-xl border p-3 ${severityTone[alert.severity] || severityTone.standard}`}>
              <div className="grid gap-2 md:grid-cols-3 text-sm">
                <p><strong className="text-danger-700">Não fazer:</strong> {alert.doNot}</p>
                <p><strong className="text-emerald-700">Fazer em vez:</strong> {alert.doInstead}</p>
                <p><strong className="text-slate-600">Por quê:</strong> {alert.reason}</p>
              </div>
            </article>
          ))}

          <div className="rounded-xl border border-brand-100 bg-brand-50 p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-brand-900">💬 Boas práticas de escuta</p>
            <ul className="mt-2 space-y-2 text-sm">
              {practices.map((item) => (
                <li key={item.id}>
                  <strong className="text-emerald-700">✓ {item.title}:</strong> {item.description}
                  {item.example ? <span className="block text-xs text-muted">Ex.: {item.example}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};
