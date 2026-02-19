import React, { useEffect, useMemo, useState } from 'react';
import { PROTOCOL_DATA } from '../content/protocolData';
import { FlowNode, Service, ServiceTarget } from '../types';

type TriagemKey = 'p1' | 'p2' | 'p3' | 'p4' | 'p5';

type Group = { id: string; title: string; icon: string; nodeIds: string[] };

type Persisted = {
  triagem: Record<TriagemKey, boolean | null>;
  selectedNodeId: string | null;
};

const STORAGE_KEY = 'decisor-page-state-v2';

const RISK_COLORS: Record<string, string> = {
  EMERGENCIAL: '#7f1d1d',
  ALTO: '#ef4444',
  'MÉDIO': '#eab308',
  BAIXO: '#22c55e'
};

const targetMap: Record<ServiceTarget, string[]> = {
  EMERGENCIA_192_193: ['SAMU', 'PM_190', 'UPA_ERMELINO'],
  UPA_HOSPITAL: ['UPA_ERMELINO'],
  UBS: ['UBS_ERMELINO'],
  CAPS_IJ: ['CAPS_IJ'],
  CAPS_ADULTO: ['CAPS_AD'],
  CONSELHO_TUTELAR: ['CONSELHO_TUTELAR'],
  CRAS: ['CRAS_ERMELINO'],
  CREAS: ['CREAS'],
  GESTAO_ESCOLAR: ['GESTAO_ESCOLAR'],
  OUTROS: []
};

const groups: Group[] = [
  { id: 'A', title: 'Bloco A — Pedagógico', icon: '🎓', nodeIds: ['DIFICULDADE_PEDAGOGICA', 'EVASAO_RISCO', 'CONFLITO_INTERPESSOAL', 'INCLUSAO_PCD'] },
  { id: 'B', title: 'Bloco B — Saúde Mental', icon: '🧠', nodeIds: ['SOFRIMENTO_PSIQUICO', 'AUTOLESAO', 'RISCO_SUICIDIO', 'USO_SUBSTANCIAS', 'SURTO_MENTAL'] },
  { id: 'C', title: 'Bloco C — Saúde Física', icon: '❤️', nodeIds: ['EMERGENCIA_IMEDIATA', 'SAUDE_FISICA_LEVE', 'GRAVIDEZ_ADOLESCENCIA', 'ABUSO_SEXUAL'] },
  { id: 'D', title: 'Bloco D — Violências', icon: '🛡️', nodeIds: ['BULLYING', 'BRIGA_COM_LESAO', 'ARMA_ESCOLA', 'VIOLENCIA_DOMESTICA', 'ABUSO_SEXUAL', 'DISCRIMINACAO', 'TIROTEIO_EXTERNO'] }
];

const toTel = (phone: string) => `tel:${phone.replace(/\D/g, '')}`;

const loadPersisted = (): Persisted => {
  const fallback: Persisted = { triagem: { p1: null, p2: null, p3: null, p4: null, p5: null }, selectedNodeId: null };
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as Persisted;
  } catch {
    return fallback;
  }
};

export const DecisorPage: React.FC = () => {
  const [state, setState] = useState<Persisted>(() => loadPersisted());

  const nodeMap = useMemo(() => new Map(PROTOCOL_DATA.decisionTree.map((node) => [node.id, node])), []);
  const selectedNode = state.selectedNodeId ? nodeMap.get(state.selectedNodeId) || null : null;

  const triageAlert = useMemo(() => {
    if (state.triagem.p1) return 'Risco imediato: acione emergência agora.';
    if (state.triagem.p3) return 'Notificação obrigatória ao Conselho Tutelar — Lei 13.431/2017.';
    if (state.triagem.p5) return 'Situação recorrente: ampliar rede, não resolver só internamente.';
    return '';
  }, [state.triagem]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setTriagem = (key: TriagemKey, value: boolean) => {
    const forcedNode = key === 'p1' && value ? 'EMERGENCIA_IMEDIATA' : state.selectedNodeId;
    setState((prev) => ({ ...prev, triagem: { ...prev.triagem, [key]: value }, selectedNodeId: forcedNode }));
  };

  const resolveContacts = (node: FlowNode): Service[] => {
    const targetIds = (node.contactTargets || [])
      .flatMap((target) => (typeof target === 'string' ? targetMap[target] : [target.serviceId]))
      .filter(Boolean);
    return PROTOCOL_DATA.services.filter((service) => targetIds.includes(service.id));
  };

  return (
    <div className="space-y-4 pb-20">
      <a href="tel:190" className="sticky top-16 z-20 block rounded-xl bg-red-700 p-3 text-center text-base font-extrabold text-white" style={{ minHeight: 48 }}>
        🆘 EMERGÊNCIA — 190 / 192 / 193
      </a>

      <section className="card">
        <h1 className="text-2xl font-extrabold text-text">Decisor Escolar — Triagem Rápida</h1>
        <p className="mt-1 text-sm text-muted">Responda 5 perguntas rápidas para definir prioridade.</p>

        <div className="mt-4 space-y-3">
          {[
            ['p1', 'Há risco imediato de morte ou lesão grave?'],
            ['p2', 'O evento está acontecendo AGORA?'],
            ['p3', 'Envolve criança/adolescente como vítima de violência?'],
            ['p4', 'Há objeto perigoso, substância ou arma?'],
            ['p5', 'A situação é recorrente/crônica?']
          ].map(([id, text]) => (
            <div key={id} className="rounded-lg border border-border p-3">
              <p className="text-sm font-semibold">{text}</p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => setTriagem(id as TriagemKey, true)} className="btn-primary" style={{ minHeight: 48 }}>Sim</button>
                <button onClick={() => setTriagem(id as TriagemKey, false)} className="btn-secondary" style={{ minHeight: 48 }}>Não</button>
              </div>
            </div>
          ))}
        </div>

        {triageAlert && <div className="mt-3 rounded-lg bg-amber-50 p-3 text-sm font-semibold text-amber-900">{triageAlert}</div>}
      </section>

      <section className="card">
        <h2 className="text-xl font-bold">Camada 2 — Seleção de situação</h2>
        <div className="mt-3 space-y-4">
          {groups.map((group) => (
            <div key={group.id}>
              <h3 className="text-sm font-bold">{group.icon} {group.title}</h3>
              <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                {group.nodeIds.map((nodeId) => {
                  const node = nodeMap.get(nodeId);
                  if (!node) return null;
                  const priority = node.riskLevel === 'ALTO' || node.riskLevel === 'EMERGENCIAL';
                  return (
                    <button
                      key={nodeId}
                      onClick={() => setState((prev) => ({ ...prev, selectedNodeId: nodeId }))}
                      className={`rounded-lg border p-3 text-left ${priority ? 'border-red-300 bg-red-50' : 'border-border bg-white'}`}
                      style={{ minHeight: 48 }}
                    >
                      <div className="text-xs font-bold">{priority ? '⚠️ PRIORIDADE' : 'Situação'}</div>
                      <div className="text-sm font-semibold">{node.question}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedNode && (
        <section className="card">
          <h2 className="text-xl font-bold">Camada 3 — Subfluxo</h2>
          <div className="mt-2 inline-flex rounded-full px-3 py-1 text-xs font-black text-white" style={{ backgroundColor: RISK_COLORS[selectedNode.riskLevel || 'MÉDIO'] }}>
            {selectedNode.riskLevel || 'MÉDIO'}
          </div>
          {selectedNode.deadline && <span className="ml-2 badge">Prazo: {selectedNode.deadline}</span>}

          {selectedNode.doNow?.length ? (
            <div className="mt-3 rounded-lg border border-red-200 bg-orange-50 p-3">
              <p className="font-bold">Faça agora</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {selectedNode.doNow.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ) : null}

          {selectedNode.guidance?.length ? (
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">
              {selectedNode.guidance.map((item) => <li key={item}>{item}</li>)}
            </ol>
          ) : null}

          {selectedNode.forbiddenActions?.length ? (
            <div className="mt-3 rounded-lg border border-slate-300 bg-slate-100 p-3">
              <p className="font-bold text-red-700">✖ Não fazer</p>
              <ul className="mt-1 list-disc pl-5 text-sm">
                {selectedNode.forbiddenActions.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ) : null}

          <div className="mt-3 flex flex-wrap gap-2">
            {resolveContacts(selectedNode).map((service) => (
              <a key={service.id} href={toTel(service.phone)} className="btn-secondary" style={{ minHeight: 48 }}>
                {service.name} — {service.phone}
              </a>
            ))}
          </div>

          <button
            className="btn-primary mt-4"
            style={{ minHeight: 48 }}
            onClick={() => {
              const historyRaw = localStorage.getItem('decisor-ocorrencias') || '[]';
              const history = JSON.parse(historyRaw) as Array<{ nodeId: string; at: string }>;
              history.push({ nodeId: selectedNode.id, at: new Date().toISOString() });
              localStorage.setItem('decisor-ocorrencias', JSON.stringify(history));
            }}
          >
            Registrar ocorrência
          </button>
        </section>
      )}
    </div>
  );
};
