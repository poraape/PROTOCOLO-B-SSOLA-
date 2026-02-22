// pages/DecisorPage.tsx — v2 (Patch 5)
// Lê domainId do location.state (vindo do Dashboard) e
// passa initialNodeId para o DecisionTreeNavigator.

import React from 'react';
import { useLocation } from 'react-router-dom';
import { DecisionTreeNavigator } from '../components/decision-v2/DecisionTreeNavigator';
import { resolveEntryNode } from '../data/domainEntryNodes';
import { DOMAIN_GROUPS } from '../data/domainGroups';

interface LocationState {
  domainId?: string;
}

export const DecisorPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const domainId = state?.domainId;

  // Resolve o nodeId de entrada; se nulo, o wizard começa do root_risk_check
  const initialNodeId = resolveEntryNode(domainId);

  // Encontra o título do domínio para mostrar contexto ao usuário
  const domainLabel = domainId
    ? DOMAIN_GROUPS
        .flatMap((g) => g.domains)
        .find((d) => d.id === domainId)?.title ?? null
    : null;

  return (
    <div className="col" style={{ gap: 12 }}>

      {/* Faixa de contexto: aparece apenas quando o usuário veio do Dashboard
          com um domínio pré-selecionado. Informa de onde o fluxo partiu
          e permite retornar sem perder o contexto. */}
      {domainLabel && (
        <div className="decisor-context-strip">
          <span className="decisor-context-label">
            Domínio selecionado:
          </span>
          <span className="decisor-context-domain">
            {domainLabel}
          </span>
        </div>
      )}

      {/*
        DecisionTreeNavigator recebe initialNodeId como prop.
        Se o navigator ainda não aceitar essa prop, adicione a interface:

          interface DecisionTreeNavigatorProps {
            initialNodeId?: string;
          }

        E use-a no useState de inicialização do history:

          const [history, setHistory] = useState(
            [{ nodeId: props.initialNodeId ?? 'root_risk_check' }]
          );
      */}
      <DecisionTreeNavigator initialNodeId={initialNodeId} />
    </div>
  );
};
