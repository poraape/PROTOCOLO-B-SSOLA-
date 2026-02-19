import React, { useMemo, useState } from 'react';
import { PROTOCOL_DATA, ROLEPLAY_SCENARIOS } from '../data';

interface RoleplayScenario {
  id: string;
  title: string;
  riskLevel: 'BAIXO' | 'MÉDIO' | 'ALTO' | 'EMERGENCIAL';
  tags: string[];
  context: string;
  entryNodeId: string;
  expectedNodeId: string;
  expectedContacts: string[];
  idealPath: string[];
  outcome: string;
}

const RISK_CLASS: Record<RoleplayScenario['riskLevel'], string> = {
  BAIXO: 'bg-green-100 text-green-800',
  'MÉDIO': 'bg-yellow-100 text-yellow-800',
  ALTO: 'bg-red-100 text-red-800',
  EMERGENCIAL: 'bg-red-700 text-white'
};

export const SimulatorPage: React.FC = () => {
  const scenarios = ROLEPLAY_SCENARIOS as RoleplayScenario[];
  const [selectedId, setSelectedId] = useState<string>(scenarios[0]?.id || '');
  const [userPath, setUserPath] = useState<string[]>([]);

  const selectedScenario = useMemo(
    () => scenarios.find((scenario) => scenario.id === selectedId) || scenarios[0],
    [scenarios, selectedId]
  );

  const availableNodes = useMemo(
    () => PROTOCOL_DATA.decisionTree.filter((node) => node.id !== 'root' && node.id !== 'leaf_duvida_padrao'),
    []
  );

  const result = useMemo(() => {
    if (!selectedScenario || userPath.length === 0) return null;
    const finalNodeId = userPath[userPath.length - 1];
    const finalNode = PROTOCOL_DATA.decisionTree.find((node) => node.id === finalNodeId);
    const correctOutcome = finalNodeId === selectedScenario.expectedNodeId;

    const missingCritical = selectedScenario.expectedContacts.filter((contact) => !(finalNode?.contactTargets || []).includes(contact));

    return {
      correctOutcome,
      finalNodeId,
      missingCritical
    };
  }, [selectedScenario, userPath]);

  const reset = () => setUserPath([]);

  return (
    <div className="space-y-4 pb-20">
      <header className="card">
        <h1 className="text-2xl font-extrabold text-text">Simulador de cenários</h1>
        <p className="mt-1 text-sm text-muted">Treine o percurso do protocolo e compare com o fluxo ideal.</p>
      </header>

      <section className="card">
        <h2 className="text-lg font-bold">Cenários</h2>
        <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => {
                setSelectedId(scenario.id);
                setUserPath([]);
              }}
              className={`rounded-lg border p-3 text-left ${scenario.id === selectedId ? 'border-brand-300 bg-brand-50' : 'border-border'}`}
              style={{ minHeight: 48 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-black">{scenario.id}</span>
                <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${RISK_CLASS[scenario.riskLevel]}`}>{scenario.riskLevel}</span>
              </div>
              <p className="mt-1 font-semibold">{scenario.title}</p>
              <p className="mt-1 text-xs text-muted">{scenario.context}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {scenario.tags.map((tag) => <span key={tag} className="rounded bg-slate-100 px-2 py-0.5 text-[10px]">#{tag}</span>)}
              </div>
            </button>
          ))}
        </div>
      </section>

      {selectedScenario && (
        <section className="card">
          <h3 className="text-lg font-bold">Modo simulação</h3>
          <p className="text-sm text-muted">Selecione os nós que você acionaria no caso real.</p>
          <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
            {availableNodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setUserPath((prev) => [...prev, node.id])}
                className="rounded-lg border border-border p-3 text-left"
                style={{ minHeight: 48 }}
              >
                <p className="text-xs font-bold">{node.riskLevel || 'MÉDIO'}</p>
                <p className="text-sm font-semibold">{node.question}</p>
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm">
            <p className="font-bold">Seu percurso</p>
            <p>{userPath.length ? userPath.join(' → ') : 'Nenhum passo selecionado ainda.'}</p>
            <p className="mt-2 font-bold">Percurso ideal</p>
            <p>{selectedScenario.idealPath.join(' → ')}</p>
            <p className="mt-2 text-xs">Desfecho esperado: {selectedScenario.outcome}</p>
          </div>

          {result && (
            <div className={`mt-3 rounded-lg border p-3 text-sm ${result.correctOutcome ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
              <p className="font-bold">{result.correctOutcome ? 'Desfecho correto.' : 'Desfecho incorreto.'}</p>
              {!result.correctOutcome && <p>Nó final selecionado: {result.finalNodeId}</p>}
              {result.missingCritical.length > 0 && (
                <p className="mt-1 text-red-700">Erros críticos: não acionou {result.missingCritical.join(', ')}.</p>
              )}
            </div>
          )}

          <button onClick={reset} className="btn-secondary mt-3" style={{ minHeight: 48 }}>Limpar simulação</button>
        </section>
      )}
    </div>
  );
};
