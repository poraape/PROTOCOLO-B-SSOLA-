import React from 'react';
import { urgencyConfig } from '../../styles/design-tokens';
import { LeafNode, DecisionNode, ManagementRole, RiskClassification } from '../../types/decision-tree-v2';
import { AccordionSection } from './AccordionSection';
import { InstitutionalBreadcrumb } from './InstitutionalBreadcrumb';
import { PROTOCOL_DATA } from '../../content/protocolData';
import { anexosMeta } from '../../data/anexosMeta';
import { AppCard } from '../ui/AppCard';
import { AppChip } from '../ui/AppChip';
import { AppButton } from '../ui/AppButton';
import { SidePanelOrientacoes } from '../ui/SidePanelOrientacoes';
import { BottomSheetOrientacoes } from '../ui/BottomSheetOrientacoes';
import { verbByIntentCapitalized } from '../../content/microcopyLexicon';
import { trackDecisionEvent } from '../../services/analytics';

type FinalizationChecklistState = {
  emergencyContacted: boolean;
  managementInformed: boolean;
  recordStarted: boolean;
  completed: boolean;
};

interface ResultScreenProps {
  leaf: LeafNode;
  rationaleText?: string;
  history?: string[];
  nodes?: Record<string, DecisionNode>;
  currentNodeId?: string;
  riskClassification?: RiskClassification;
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

const FINALIZATION_STORAGE_KEY = 'decision-v2-finalization-checklist';

const requiredChecklistByUrgency: Record<LeafNode['primaryActions']['urgencyLevel'], Array<keyof Omit<FinalizationChecklistState, 'completed'>>> = {
  IMMEDIATE: ['emergencyContacted', 'managementInformed', 'recordStarted'],
  URGENT: ['emergencyContacted', 'managementInformed'],
  SCHEDULED: ['recordStarted']
};

const reassessmentDeadlineByUrgency: Record<LeafNode['primaryActions']['urgencyLevel'], string> = {
  IMMEDIATE: 'imediatamente após o atendimento inicial',
  URGENT: 'ainda hoje',
  SCHEDULED: 'em até 7 dias'
};

const ResultScreenBase: React.FC<ResultScreenProps> = ({
  leaf,
  rationaleText,
  history,
  nodes,
  currentNodeId,
  riskClassification,
  onBack,
  onPrint,
  onContactManagement
}) => {
  const [showGuidance, setShowGuidance] = React.useState(false);
  const [checklistState, setChecklistState] = React.useState<FinalizationChecklistState>({
    emergencyContacted: false,
    managementInformed: false,
    recordStarted: false,
    completed: false
  });
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

  const primaryActionTemplate = React.useMemo(() => {
    const firstAction = leaf.primaryActions.actions[0] ?? 'o acionamento principal';
    const cleanedAction = firstAction.replace(/[.!]+$/g, '').toLowerCase();

    return formatActionTemplate({
      action: cleanedAction,
      deadline: leaf.followUp.deadline,
      responsible: leaf.followUp.responsible ?? 'gestão escolar'
    });
  }, [leaf.primaryActions.actions, leaf.followUp.deadline, leaf.followUp.responsible]);

  const followUpTemplate = React.useMemo(
    () =>
      formatActionTemplate({
        action: leaf.followUp.title,
        deadline: leaf.followUp.deadline,
        responsible: leaf.followUp.responsible ?? 'gestão escolar'
      }),
    [leaf.followUp.deadline, leaf.followUp.responsible, leaf.followUp.title]
  );

  const managementNotification = leaf.managementNotification ?? {
    required: false,
    timing: 'CIENCIA' as const,
    roles: [] as ManagementRole[]
  };

  React.useEffect(() => {
    trackDecisionEvent('resultado_gerado', {
      nodeId: leaf.id,
      riskClassification
    });
  }, [leaf.id, riskClassification]);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const persistedValue = window.localStorage.getItem(FINALIZATION_STORAGE_KEY);
    if (!persistedValue) {
      return;
    }

    try {
      const parsed = JSON.parse(persistedValue) as Record<string, FinalizationChecklistState>;
      if (parsed[leaf.id]) {
        setChecklistState(parsed[leaf.id]);
      }
    } catch {
      window.localStorage.removeItem(FINALIZATION_STORAGE_KEY);
    }
  }, [leaf.id]);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const persistedValue = window.localStorage.getItem(FINALIZATION_STORAGE_KEY);
    let storedChecklistByLeaf: Record<string, FinalizationChecklistState> = {};

    if (persistedValue) {
      try {
        storedChecklistByLeaf = JSON.parse(persistedValue) as Record<string, FinalizationChecklistState>;
      } catch {
        storedChecklistByLeaf = {};
      }
    }

    storedChecklistByLeaf[leaf.id] = checklistState;
    window.localStorage.setItem(FINALIZATION_STORAGE_KEY, JSON.stringify(storedChecklistByLeaf));
  }, [checklistState, leaf.id]);

  const requiredItems = requiredChecklistByUrgency[leaf.primaryActions.urgencyLevel];
  const canFinalize = requiredItems.every((requiredItem) => checklistState[requiredItem]);

  const handleChecklistToggle = (field: keyof Omit<FinalizationChecklistState, 'completed'>) => {
    setChecklistState((previousState) => ({
      ...previousState,
      [field]: !previousState[field],
      completed: false
    }));
  };

  const handleFinalize = () => {
    if (!canFinalize) {
      return;
    }

    setChecklistState((previousState) => ({
      ...previousState,
      completed: true
    }));
  };

  return (
    <section className="decision-layout-container decision-section">
      <InstitutionalBreadcrumb history={history} nodes={nodes} currentNodeId={currentNodeId} />

      {(onBack || onPrint) ? (
        <div className="result-actions-row">
          {onBack ? <AppButton onClick={onBack} variant="secondary">↩️ Recomeçar</AppButton> : null}
          {onPrint ? <AppButton onClick={onPrint} variant="ghost">🖨️ Imprimir</AppButton> : null}
        </div>
      ) : null}

      <div className="decision-screen-grid">
        <div className="decision-screen-main">
          <AppCard
            strong
            heading="O que fazer agora neste caso"
            subheading={leaf.primaryActions.title}
            rightSlot={<AppChip label={urgency.label} tone={urgencyTone[leaf.primaryActions.urgencyLevel]} />}
          >
            <div className="decision-options-grid">
              <AppCard strong heading="PRIORIDADE 1 / PRIORIDADE 2" subheading="Ação e acionamento inicial">
                <div className="decision-stack-grid">
                  <div className="result-priority-card">
                    <div className="result-priority-heading">🥇 Prioridade 1</div>
                    {primaryService?.details ? (
                      <a href={`tel:${toDialNumber(primaryService.details.phone)}`} className="result-primary-link">
                        {primaryService.details.name} — {primaryService.details.phone}
                      </a>
                    ) : (
                      <div className="result-fallback-grid">
                        <span>Serviço principal indisponível. Avise a gestão e use contato de contingência.</span>
                        <a href="#comunicar-gestao" className="result-muted-link">➡️ Ir para Comunicar gestão</a>
                      </div>
                    )}
                  </div>

                  <div className="result-priority-card">
                    <div className="result-priority-heading">🥈 Prioridade 2</div>
                    {secondaryService?.details ? (
                      <span>{secondaryService.details.name} — {secondaryService.details.phone}</span>
                    ) : (
                      <div className="result-fallback-grid">
                        <span>Sem serviço complementar definido para este caso.</span>
                        <a href="#quem-acionar" className="result-muted-link">➡️ Ver bloco Quem acionar</a>
                      </div>
                    )}
                  </div>
                </div>
              </AppCard>

              <AppCard strong heading={`${verbByIntentCapitalized('avisar_gestao')} gestão`.toUpperCase()} subheading="Timing e papéis recomendados">
                <div className="result-management-grid">
                  <AppChip label={managementNotification.timing} tone={timingTone[managementNotification.timing]} />
                  <div className="result-text">
                    <strong>Papéis:</strong>{' '}
                    {managementNotification.roles.length > 0
                      ? managementNotification.roles.map((role) => roleLabel[role]).join(' • ')
                      : 'Não definido'}
                  </div>
                  <div className="result-text"><strong>Obrigatório:</strong> {managementNotification.required ? 'Sim' : 'Não'}</div>
                  {managementNotification.message ? <div className="result-muted-text">{managementNotification.message}</div> : null}
                  {managementNotification.required && onContactManagement ? (
                    <AppButton variant="primary" onClick={onContactManagement}>{verbByIntentCapitalized('avisar_gestao')} gestão</AppButton>
                  ) : null}
                </div>
              </AppCard>

              <AppCard strong heading="Formulários e anexos para registro" subheading="Como registrar: anexos recomendados para registro e encaminhamento">
                <div className="result-chip-wrap">
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
                          className="result-link-reset"
                        >
                          <AppChip label={anexo.title} tone="info" />
                        </a>
                      );
                    })
                  ) : (
                    <span className="result-muted-text">Sem instrumentos definidos para este fluxo.</span>
                  )}
                </div>
              </AppCard>

              <AppCard strong heading="Quem acionar neste caso" subheading={leaf.contactTargets.title}>
                <ul className="result-inline-list">
                  {resolvedServices.map((serviceRef, idx) => (
                    <li key={`${serviceRef.serviceId}-${idx}`}>
                      {serviceRef.details ? `${serviceRef.details.name} — ${serviceRef.details.phone}` : `Serviço não encontrado (${serviceRef.serviceId})`}
                    </li>
                  ))}
                </ul>
              </AppCard>

              <AppCard strong heading="Ações prioritárias" subheading={`${urgency.icon} ${urgency.label}`}>
                <div className="result-muted-text">{primaryActionTemplate}</div>
                <ol className="result-inline-list">
                  {leaf.primaryActions.actions.slice(0, 3).map((action, idx) => (
                    <li key={`${action}-${idx}`}>{action}</li>
                  ))}
                </ol>
              </AppCard>

              <AppCard strong heading="Acompanhamento" subheading={leaf.followUp.frequency}>
                <div className="result-text">{followUpTemplate}</div>
              </AppCard>

              <AppCard strong heading="Antes de finalizar" subheading="Confirme os acionamentos essenciais desta consulta">
                <div className="decision-stack-grid">
                  <label className="result-check-label">
                    <input
                      type="checkbox"
                      checked={checklistState.emergencyContacted}
                      onChange={() => handleChecklistToggle('emergencyContacted')}
                    />
                    Contato emergencial/rede acionado
                    {requiredItems.includes('emergencyContacted') ? <strong> (obrigatório)</strong> : null}
                  </label>

                  <label className="result-check-label">
                    <input
                      type="checkbox"
                      checked={checklistState.managementInformed}
                      onChange={() => handleChecklistToggle('managementInformed')}
                    />
                    Gestão comunicada
                    {requiredItems.includes('managementInformed') ? <strong> (obrigatório)</strong> : null}
                  </label>

                  <label className="result-check-label">
                    <input
                      type="checkbox"
                      checked={checklistState.recordStarted}
                      onChange={() => handleChecklistToggle('recordStarted')}
                    />
                    Registro iniciado
                    {requiredItems.includes('recordStarted') ? <strong> (obrigatório)</strong> : null}
                  </label>

                  <AppButton variant="primary" onClick={handleFinalize} disabled={!canFinalize}>
                    Concluir consulta
                  </AppButton>

                  {checklistState.completed ? (
                    <div
                      role="status"
                      className="result-check-complete"
                    >
                      ✅ Consulta concluída. Reavalie em {reassessmentDeadlineByUrgency[leaf.primaryActions.urgencyLevel]} prazo.
                    </div>
                  ) : null}
                </div>
              </AppCard>
            </div>
          </AppCard>

          {leaf.secondaryContent ? (
            <div className="result-secondary-content">
              {leaf.secondaryContent.forbiddenActions ? (
                <AccordionSection title="❌ O que NÃO fazer" defaultOpen={false}>
                  <ul className="result-inline-list">
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
                  <ul className="result-inline-list">
                    {leaf.secondaryContent.legalBasis.references.map((reference, idx) => (
                      <li key={`${reference}-${idx}`}>{reference}</li>
                    ))}
                  </ul>
                </AccordionSection>
              ) : null}

              <AccordionSection title="💡 Por que essa ação protege" defaultOpen={false}>
                <div className="result-rationale">{rationaleText || 'A ação foi priorizada para reduzir risco imediato e garantir proteção contínua.'}</div>
              </AccordionSection>
            </div>
          ) : null}

          <button
            type="button"
            className="decision-guidance-trigger xl:hidden"
            onClick={() => setShowGuidance(true)}
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
