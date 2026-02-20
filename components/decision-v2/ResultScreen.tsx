import React from 'react';
import { designTokens, urgencyConfig } from '../../styles/design-tokens';
import { LeafNode, DecisionNode } from '../../types/decision-tree-v2';
import { AccordionSection } from './AccordionSection';
import { DecisionBreadcrumb } from './DecisionBreadcrumb';

interface ResultScreenProps {
  leaf: LeafNode;
  rationaleText?: string;
  history?: string[];
  nodes?: Record<string, DecisionNode>;
  currentNodeId?: string;
  onBack?: () => void;
  onPrint?: () => void;
}

const urgencyByLeaf = (leaf: LeafNode) => urgencyConfig[leaf.primaryActions.urgencyLevel];

const toDialNumber = (phone: string) => phone.replace(/\D/g, '');

const ResultScreenBase: React.FC<ResultScreenProps> = ({
  leaf,
  rationaleText,
  history,
  nodes,
  currentNodeId,
  onBack,
  onPrint
}) => {
  const urgency = urgencyByLeaf(leaf);

  const urgentService =
    leaf.contactTargets.services
      .filter((service) => service.urgency === 'IMMEDIATE' || service.urgency === 'URGENT')
      .at(0) || leaf.contactTargets.services.at(0);

  const complementaryServices = urgentService
    ? leaf.contactTargets.services.filter((service) => service !== urgentService)
    : leaf.contactTargets.services;

  return (
    <section
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: designTokens.spacing.xl,
        backgroundColor: '#FFFFFF',
        borderRadius: designTokens.borderRadius.lg,
        boxShadow: designTokens.shadows.md
      }}
    >
      {history && nodes && currentNodeId ? (
        <DecisionBreadcrumb history={history} nodes={nodes} currentNodeId={currentNodeId} />
      ) : null}


      {(onBack || onPrint) ? (
        <div style={{ display: 'flex', gap: designTokens.spacing.sm, marginBottom: designTokens.spacing.md }}>
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              style={{
                border: 'none',
                backgroundColor: designTokens.colors.routine,
                color: '#FFFFFF',
                padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
                borderRadius: designTokens.borderRadius.md,
                cursor: 'pointer'
              }}
            >
              ↩️ Recomeçar
            </button>
          ) : null}
          {onPrint ? (
            <button
              type="button"
              onClick={onPrint}
              style={{
                border: `1px solid ${designTokens.colors.info}`,
                backgroundColor: 'transparent',
                color: designTokens.colors.info,
                padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
                borderRadius: designTokens.borderRadius.md,
                cursor: 'pointer'
              }}
            >
              🖨️ Imprimir
            </button>
          ) : null}
        </div>
      ) : null}

      <section
        style={{
          backgroundColor: `${urgency.color}15`,
          padding: designTokens.spacing.xl,
          borderRadius: designTokens.borderRadius.lg,
          borderLeft: `6px solid ${urgency.color}`,
          marginBottom: designTokens.spacing.lg
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: '700', color: urgency.color, marginBottom: '8px' }}>
          {urgency.icon} {urgency.label}
        </div>

        <h1
          style={{
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: designTokens.spacing.md,
            lineHeight: '1.3'
          }}
        >
          {leaf.primaryActions.title}
        </h1>

        <ol style={{ fontSize: '18px', lineHeight: '1.6', paddingLeft: '20px', margin: 0 }}>
          {leaf.primaryActions.actions.slice(0, 3).map((action, idx) => (
            <li key={`${action}-${idx}`} style={{ marginBottom: '8px' }}>
              <strong>{action}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section style={{ marginBottom: designTokens.spacing.lg }}>
        <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>📞 Acionar agora</h2>

        {urgentService ? (
          <a
            href={`tel:${toDialNumber(urgentService.phone)}`}
            style={{
              display: 'block',
              padding: designTokens.spacing.lg,
              backgroundColor: designTokens.colors.emergency,
              color: '#FFFFFF',
              borderRadius: designTokens.borderRadius.md,
              textDecoration: 'none',
              textAlign: 'center',
              fontSize: '24px',
              fontWeight: '700',
              boxShadow: designTokens.shadows.lg
            }}
          >
            📞 {urgentService.phone} - {urgentService.name}
          </a>
        ) : (
          <div
            style={{
              padding: designTokens.spacing.md,
              borderRadius: designTokens.borderRadius.md,
              backgroundColor: designTokens.colors.background.secondary,
              color: designTokens.colors.info
            }}
          >
            Nenhum serviço de contato disponível para este leaf.
          </div>
        )}

        {complementaryServices.length > 0 ? (
          <div style={{ marginTop: designTokens.spacing.md }}>
            <AccordionSection title="Ver serviços complementares" defaultOpen={false}>
              {complementaryServices.map((service, idx) => (
                <div key={`${service.name}-${idx}`} style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: '600' }}>{service.name}</div>
                  <div style={{ fontSize: '18px', color: designTokens.colors.routine }}>{service.phone}</div>
                  {service.address ? <div style={{ fontSize: '14px' }}>{service.address}</div> : null}
                  {service.hours ? <div style={{ fontSize: '14px' }}>Horário: {service.hours}</div> : null}
                </div>
              ))}
            </AccordionSection>
          </div>
        ) : null}
      </section>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: designTokens.spacing.md,
          marginBottom: designTokens.spacing.lg
        }}
      >
        <div
          style={{
            padding: designTokens.spacing.md,
            backgroundColor: designTokens.colors.background.secondary,
            borderRadius: designTokens.borderRadius.md
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>📋 Registrar</h3>
          <ul style={{ fontSize: '14px', paddingLeft: '20px', margin: 0 }}>
            {leaf.recordingRequirement.instructions.slice(0, 2).map((instruction, idx) => (
              <li key={`${instruction}-${idx}`}>{instruction}</li>
            ))}
          </ul>
        </div>

        <div
          style={{
            padding: designTokens.spacing.md,
            backgroundColor: designTokens.colors.background.secondary,
            borderRadius: designTokens.borderRadius.md
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>⏱️ Prazo</h3>
          <div style={{ fontSize: '14px' }}>{leaf.followUp.deadline}</div>
        </div>
      </div>

      {leaf.secondaryContent ? (
        <>
          {leaf.secondaryContent.forbiddenActions ? (
            <AccordionSection title="❌ O que NÃO fazer" defaultOpen={false}>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {leaf.secondaryContent.forbiddenActions.items.map((item, idx) => (
                  <li key={`${item}-${idx}`}>{item}</li>
                ))}
              </ul>
            </AccordionSection>
          ) : null}

          {leaf.secondaryContent.exampleScenario ? (
            <AccordionSection title="📖 Ver exemplo de cenário" defaultOpen={false}>
              <div>
                <strong>{leaf.secondaryContent.exampleScenario.title}:</strong>{' '}
                {leaf.secondaryContent.exampleScenario.scenarioId}
              </div>
            </AccordionSection>
          ) : null}

          {leaf.secondaryContent.legalBasis ? (
            <AccordionSection title="🔗 Base legal" defaultOpen={false}>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {leaf.secondaryContent.legalBasis.references.map((reference, idx) => (
                  <li key={`${reference}-${idx}`}>{reference}</li>
                ))}
              </ul>
            </AccordionSection>
          ) : null}

          <AccordionSection title="💡 Por que essa ação protege" defaultOpen={false}>
            <div style={{ fontSize: designTokens.typography.secondary.size, lineHeight: '1.6' }}>
              {rationaleText || 'A ação foi priorizada para reduzir risco imediato e garantir proteção contínua.'}
            </div>
          </AccordionSection>
        </>
      ) : null}
    </section>
  );
};

export const ResultScreen = React.memo(ResultScreenBase);
