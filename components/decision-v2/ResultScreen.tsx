import React from 'react';
import { designTokens, urgencyConfig } from '../../styles/design-tokens';
import { LeafNode, DecisionNode, ManagementRole } from '../../types/decision-tree-v2';
import { AccordionSection } from './AccordionSection';
import { DecisionBreadcrumb } from './DecisionBreadcrumb';
import { PROTOCOL_DATA } from '../../content/protocolData';
import { anexosMeta } from '../../data/anexosMeta';

interface ResultScreenProps {
  leaf: LeafNode;
  rationaleText?: string;
  history?: string[];
  nodes?: Record<string, DecisionNode>;
  currentNodeId?: string;
  onBack?: () => void;
  onPrint?: () => void;
  onContactManagement?: () => void;
}

type ResolvedServiceRef = {
  serviceId: string;
  urgency: 'IMMEDIATE' | 'URGENT' | 'SCHEDULED';
  note?: string;
  details?: (typeof PROTOCOL_DATA.services)[number];
};

const urgencyByLeaf = (leaf: LeafNode) => urgencyConfig[leaf.primaryActions.urgencyLevel];
const toDialNumber = (phone: string) => phone.replace(/\D/g, '');

const serviceById = new Map(PROTOCOL_DATA.services.map((service) => [service.id, service] as const));
const anexoById = new Map(anexosMeta.map((anexo) => [anexo.id, anexo] as const));

const roleLabel: Record<ManagementRole, string> = {
  DIRECAO: 'Direção',
  VICE_DIRECAO: 'Vice-direção',
  COORDENACAO: 'Coordenação'
};

const timingLabel: Record<'IMEDIATO' | 'MESMO_DIA' | 'CIENCIA', string> = {
  IMEDIATO: 'IMEDIATO',
  MESMO_DIA: 'MESMO_DIA',
  CIENCIA: 'CIENCIA'
};

const sectionCardStyle: React.CSSProperties = {
  padding: designTokens.spacing.md,
  backgroundColor: designTokens.colors.background.secondary,
  borderRadius: designTokens.borderRadius.md
};

const renderServiceCard = (serviceRef: ResolvedServiceRef, index: number) => {
  if (!serviceRef.details) {
    return (
      <div key={`${serviceRef.serviceId}-${index}`} style={{ ...sectionCardStyle, border: '1px dashed #DC2626' }}>
        <div style={{ fontWeight: 700, color: '#B91C1C' }}>Serviço não encontrado</div>
        <div style={{ fontSize: '14px' }}>ID informado: {serviceRef.serviceId}</div>
      </div>
    );
  }

  return (
    <div key={`${serviceRef.details.id}-${index}`} style={sectionCardStyle}>
      <div style={{ fontWeight: '700' }}>{serviceRef.details.name}</div>
      <div style={{ fontSize: '18px', color: designTokens.colors.routine }}>{serviceRef.details.phone}</div>
      {serviceRef.details.address ? <div style={{ fontSize: '14px' }}>{serviceRef.details.address}</div> : null}
      {serviceRef.details.hours ? <div style={{ fontSize: '14px' }}>Horário: {serviceRef.details.hours}</div> : null}
      {serviceRef.note ? <div style={{ fontSize: '14px' }}>Obs.: {serviceRef.note}</div> : null}
    </div>
  );
};

const ResultScreenBase: React.FC<ResultScreenProps> = ({
  leaf,
  rationaleText,
  history,
  nodes,
  currentNodeId,
  onBack,
  onPrint,
  onContactManagement
}) => {
  const urgency = urgencyByLeaf(leaf);

  const rawServices = leaf.contactTargets?.services ?? [];
  const resolvedServices = React.useMemo<ResolvedServiceRef[]>(
    () =>
      rawServices.map((serviceRef) => {
        const details = serviceById.get(serviceRef.serviceId);
        if (!details) {
          console.warn(`[DecisionTreeV2] Serviço não encontrado para serviceId: ${serviceRef.serviceId}`, {
            leafId: leaf.id
          });
        }

        return {
          ...serviceRef,
          details
        };
      }),
    [rawServices, leaf.id]
  );

  const primaryService = resolvedServices.at(0);
  const complementaryServices = resolvedServices.slice(1);

  const managementNotification = leaf.managementNotification ?? {
    required: false,
    timing: 'CIENCIA' as const,
    roles: [] as ManagementRole[]
  };

  const instruments = leaf.instruments ?? [];

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
      {history && nodes && currentNodeId ? <DecisionBreadcrumb history={history} nodes={nodes} currentNodeId={currentNodeId} /> : null}

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
        <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>🔵 PRIORIDADE DE ACIONAMENTO</h2>

        <div style={{ display: 'grid', gap: designTokens.spacing.sm }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: '8px' }}>🥇 PRIMEIRO A ACIONAR</div>
            {primaryService ? (
              primaryService.details ? (
                <a
                  href={`tel:${toDialNumber(primaryService.details.phone)}`}
                  style={{
                    display: 'block',
                    padding: designTokens.spacing.lg,
                    backgroundColor: designTokens.colors.emergency,
                    color: '#FFFFFF',
                    borderRadius: designTokens.borderRadius.md,
                    textDecoration: 'none',
                    fontSize: '22px',
                    fontWeight: '700',
                    boxShadow: designTokens.shadows.lg
                  }}
                >
                  📞 {primaryService.details.phone} - {primaryService.details.name}
                </a>
              ) : (
                renderServiceCard(primaryService, 0)
              )
            ) : (
              <div style={sectionCardStyle}>Nenhum serviço principal definido para este leaf.</div>
            )}
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: '8px' }}>🥈 COMPLEMENTAR</div>
            {complementaryServices.length > 0 ? (
              <div style={{ display: 'grid', gap: designTokens.spacing.sm }}>
                {complementaryServices.map((serviceRef, idx) => renderServiceCard(serviceRef, idx + 1))}
              </div>
            ) : (
              <div style={sectionCardStyle}>Sem serviços complementares para este fluxo.</div>
            )}
          </div>
        </div>
      </section>

      <section style={{ marginBottom: designTokens.spacing.lg }}>
        <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>🏫 COMUNICAR GESTÃO</h2>
        <div style={{ ...sectionCardStyle, display: 'grid', gap: '6px' }}>
          <div>
            <strong>Timing:</strong> {timingLabel[managementNotification.timing]}
          </div>
          <div>
            <strong>Papéis:</strong>{' '}
            {managementNotification.roles.length > 0
              ? managementNotification.roles.map((role) => roleLabel[role]).join(' • ')
              : 'Não definido'}
          </div>
          <div>
            <strong>Obrigatório:</strong> {managementNotification.required ? 'Sim' : 'Não'}
          </div>
          {managementNotification.message ? (
            <div>
              <strong>Mensagem:</strong> {managementNotification.message}
            </div>
          ) : null}

          {managementNotification.required && onContactManagement ? (
            <button
              type="button"
              onClick={onContactManagement}
              style={{
                marginTop: designTokens.spacing.sm,
                border: 'none',
                borderRadius: designTokens.borderRadius.md,
                backgroundColor: designTokens.colors.routine,
                color: '#FFFFFF',
                padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              Comunicar gestão
            </button>
          ) : null}
        </div>
      </section>

      <section style={{ marginBottom: designTokens.spacing.lg }}>
        <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>📋 INSTRUMENTO</h2>
        <div style={{ ...sectionCardStyle, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {instruments.length > 0 ? (
            instruments.map((instrumentId, idx) => {
              const anexo = anexoById.get(instrumentId);

              if (!anexo) {
                console.warn(`[DecisionTreeV2] Instrumento não encontrado para id: ${instrumentId}`, { leafId: leaf.id });
                return (
                  <span
                    key={`${instrumentId}-${idx}`}
                    style={{
                      border: '1px dashed #DC2626',
                      borderRadius: '999px',
                      padding: '6px 10px',
                      fontSize: '13px',
                      color: '#B91C1C'
                    }}
                  >
                    Instrumento não encontrado ({instrumentId})
                  </span>
                );
              }

              return (
                <a
                  key={anexo.id}
                  href={anexo.file}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    border: `1px solid ${designTokens.colors.routine}`,
                    borderRadius: '999px',
                    padding: '6px 10px',
                    fontSize: '13px',
                    color: designTokens.colors.routine,
                    textDecoration: 'none'
                  }}
                >
                  {anexo.title}
                </a>
              );
            })
          ) : (
            <span style={{ fontSize: '14px' }}>Instrumento a preencher: verificar orientação da gestão para este caso.</span>
          )}
        </div>
      </section>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: designTokens.spacing.md,
          marginBottom: designTokens.spacing.lg
        }}
      >
        <div style={sectionCardStyle}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>📋 Registrar</h3>
          <ul style={{ fontSize: '14px', paddingLeft: '20px', margin: 0 }}>
            {leaf.recordingRequirement.instructions.slice(0, 2).map((instruction, idx) => (
              <li key={`${instruction}-${idx}`}>{instruction}</li>
            ))}
          </ul>
        </div>

        <div style={sectionCardStyle}>
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
                <strong>{leaf.secondaryContent.exampleScenario.title}:</strong> {leaf.secondaryContent.exampleScenario.scenarioId}
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
