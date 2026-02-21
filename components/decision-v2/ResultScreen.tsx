import React from 'react';
import { urgencyConfig } from '../../styles/design-tokens';
import { LeafNode, DecisionNode, ManagementRole } from '../../types/decision-tree-v2';
import { AccordionSection } from './AccordionSection';
import { DecisionBreadcrumb } from './DecisionBreadcrumb';
import { PROTOCOL_DATA } from '../../content/protocolData';
import { anexosMeta } from '../../data/anexosMeta';
import { AppCard } from '../ui/AppCard';
import { AppChip } from '../ui/AppChip';
import { AppButton } from '../ui/AppButton';
import { SidePanelOrientacoes } from '../ui/SidePanelOrientacoes';
import { BottomSheetOrientacoes } from '../ui/BottomSheetOrientacoes';
import { getManagementNotificationLabel } from './managementNotificationLabel';

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

const timingTone: Record<'IMEDIATO' | 'MESMO_DIA' | 'CIENCIA', 'danger' | 'warning' | 'info'> = {
  IMEDIATO: 'danger',
  MESMO_DIA: 'warning',
  CIENCIA: 'info'
};

const urgencyTone: Record<LeafNode['primaryActions']['urgencyLevel'], 'danger' | 'warning' | 'success'> = {
  IMMEDIATE: 'danger',
  URGENT: 'warning',
  SCHEDULED: 'success'
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
  const [showGuidance, setShowGuidance] = React.useState(false);
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
  const secondaryService = resolvedServices.at(1);
  const managementNotification = leaf.managementNotification ?? {
    required: false,
    timing: 'CIENCIA' as const,
    roles: [] as ManagementRole[]
  };

  return (
    <section style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 16px 24px' }}>
      {history && nodes && currentNodeId ? <DecisionBreadcrumb history={history} nodes={nodes} currentNodeId={currentNodeId} /> : null}

      {(onBack || onPrint) ? (
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          {onBack ? <AppButton onClick={onBack} variant="secondary">↩️ Recomeçar</AppButton> : null}
          {onPrint ? <AppButton onClick={onPrint} variant="ghost">🖨️ Imprimir</AppButton> : null}
        </div>
      ) : null}

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, maxWidth: 820, margin: '0 auto' }}>
          <AppCard
            strong
            className=""
            heading="Resultado do Protocolo"
            subheading={leaf.primaryActions.title}
            rightSlot={<AppChip label={urgency.label} tone={urgencyTone[leaf.primaryActions.urgencyLevel]} />}
          >
            <div style={{ display: 'grid', gap: 12 }}>
              <AppCard strong heading="PRIORIDADE 1 / PRIORIDADE 2" subheading="Ação e acionamento inicial">
                <div style={{ display: 'grid', gap: 10 }}>
                  <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: 12, background: 'var(--surface-strong)' }}>
                    <div style={{ marginBottom: 6, fontWeight: 700 }}>🥇 Prioridade 1</div>
                    {primaryService?.details ? (
                      <a href={`tel:${toDialNumber(primaryService.details.phone)}`} style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 600 }}>
                        {primaryService.details.name} — {primaryService.details.phone}
                      </a>
                    ) : (
                      <span>Serviço principal não definido.</span>
                    )}
                  </div>

                  <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: 12, background: 'var(--surface-strong)' }}>
                    <div style={{ marginBottom: 6, fontWeight: 700 }}>🥈 Prioridade 2</div>
                    {secondaryService?.details ? (
                      <span>{secondaryService.details.name} — {secondaryService.details.phone}</span>
                    ) : (
                      <span>Sem serviço complementar principal.</span>
                    )}
                  </div>
                </div>
              </AppCard>

              <AppCard strong heading="COMUNICAR GESTÃO" subheading="Timing e papéis recomendados">
                <div style={{ display: 'grid', gap: 8 }}>
                  <AppChip label={managementNotification.timing} tone={timingTone[managementNotification.timing]} />
                  <div style={{ color: 'var(--text)' }}>
                    <strong>Papéis:</strong>{' '}
                    {managementNotification.roles.length > 0
                      ? managementNotification.roles.map((role) => roleLabel[role]).join(' • ')
                      : 'Não definido'}
                  </div>
                  <div style={{ color: 'var(--text)' }}><strong>Obrigatório:</strong> {managementNotification.required ? 'Sim' : 'Não'}</div>
                  {managementNotification.message ? <div style={{ color: 'var(--text-muted)' }}>{managementNotification.message}</div> : null}
                  {managementNotification.required && onContactManagement ? (
                    <AppButton variant="primary" onClick={onContactManagement}>
                      {getManagementNotificationLabel(managementNotification.timing)}
                    </AppButton>
                  ) : null}
                </div>
              </AppCard>

              <AppCard strong heading="INSTRUMENTOS" subheading="Anexos recomendados para registro e encaminhamento">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {leaf.instruments.length > 0 ? (
                    leaf.instruments.map((instrumentId, idx) => {
                      const anexo = anexoById.get(instrumentId);
                      if (!anexo) {
                        console.warn(`[DecisionTreeV2] Instrumento não encontrado para id: ${instrumentId}`, { leafId: leaf.id });
                        return <AppChip key={`${instrumentId}-${idx}`} label={`Não encontrado: ${instrumentId}`} tone="danger" />;
                      }

                      return (
                        <a
                          key={anexo.id}
                          href={anexo.file}
                          target="_blank"
                          rel="noreferrer"
                          style={{ textDecoration: 'none' }}
                        >
                          <AppChip label={anexo.title} tone="info" />
                        </a>
                      );
                    })
                  ) : (
                    <span style={{ color: 'var(--text-muted)' }}>Sem instrumentos definidos para este fluxo.</span>
                  )}
                </div>
              </AppCard>

              <AppCard strong heading="Contatos úteis" subheading={leaf.contactTargets.title}>
                <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text)', lineHeight: 1.6 }}>
                  {resolvedServices.map((serviceRef, idx) => (
                    <li key={`${serviceRef.serviceId}-${idx}`}>
                      {serviceRef.details ? `${serviceRef.details.name} — ${serviceRef.details.phone}` : `Serviço não encontrado (${serviceRef.serviceId})`}
                    </li>
                  ))}
                </ul>
              </AppCard>

              <AppCard strong heading="Ações prioritárias" subheading={`${urgency.icon} ${urgency.label}`}>
                <ol style={{ margin: 0, paddingLeft: 20, color: 'var(--text)', lineHeight: 1.6 }}>
                  {leaf.primaryActions.actions.slice(0, 3).map((action, idx) => (
                    <li key={`${action}-${idx}`}>{action}</li>
                  ))}
                </ol>
              </AppCard>
            </div>
          </AppCard>

          {leaf.secondaryContent ? (
            <div style={{ marginTop: 12 }}>
              {leaf.secondaryContent.forbiddenActions ? (
                <AccordionSection title="❌ O que NÃO fazer" defaultOpen={false}>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
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
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {leaf.secondaryContent.legalBasis.references.map((reference, idx) => (
                      <li key={`${reference}-${idx}`}>{reference}</li>
                    ))}
                  </ul>
                </AccordionSection>
              ) : null}

              <AccordionSection title="💡 Por que essa ação protege" defaultOpen={false}>
                <div style={{ lineHeight: 1.6 }}>{rationaleText || 'A ação foi priorizada para reduzir risco imediato e garantir proteção contínua.'}</div>
              </AccordionSection>
            </div>
          ) : null}

          <button
            type="button"
            className="xl:hidden"
            onClick={() => setShowGuidance(true)}
            style={{ marginTop: 12, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--surface-strong)', padding: '10px 14px', color: 'var(--text)' }}
          >
            Orientações
          </button>
        </div>

        <SidePanelOrientacoes />
      </div>

      <BottomSheetOrientacoes open={showGuidance} onClose={() => setShowGuidance(false)} />
    </section>
  );
};

export const ResultScreen = React.memo(ResultScreenBase);
