import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FlowNode, Service } from '../types';
import { getSourceLink } from '../services/getSourceLink';
import { AlertPanel } from './decision/AlertPanel';
import { SlaChip } from './decision/SlaChip';
import { SafetyAlert } from './decision/SafetyAlert';
import { TermTooltip } from './decision/TermTooltip';
import { RiskBadge } from './decision/RiskBadge';
import { MandatoryBar } from './decision/MandatoryBar';
import { normalizeRiskTokenLevel, riskTokens } from '../src/tokens/riskTokens';
import { typography } from '../src/tokens/typography';
import { StateOverlay } from './decision/StateOverlay';

interface ActionCardProps {
  leafNode: FlowNode;
  services: Service[];
  onRestart: () => void;
  variant?: 'default' | 'compact';
}

const normalizePhoneToTel = (phone: string) => `tel:${phone.replace(/\D/g, '')}`;
const serviceLink = (serviceId: string, view: 'map' | 'list' = 'map') =>
  `/rede?highlight=${encodeURIComponent(serviceId)}&view=${view}`;

const categoryKeyFromLeaf = (leaf: FlowNode): 'mental_health' | 'violence' | 'physical_health' | 'pedagogical' | 'registration' | 'emergency' => {
  if (leaf.riskLevel === 'EMERGENCIAL' || leaf.category === 'EMERGÊNCIA') return 'emergency';
  if (leaf.category === 'EMOCIONAL_COMPORTAMENTO') return 'mental_health';
  if (leaf.category === 'VIOLACAO_DIREITOS_VIOLENCIA' || leaf.category === 'CONVIVENCIA_CONFLITOS') return 'violence';
  if (leaf.category === 'SAUDE_FISICA') return 'physical_health';
  return 'pedagogical';
};

const ServiceItem: React.FC<{ service: Service; highlight?: boolean }> = ({ service, highlight = false }) => (
  <li className={`panel p-3 ${highlight ? 'border-brand-300 bg-brand-50' : ''}`}>
    <div className="flex items-center justify-between gap-2">
      <p className="font-semibold text-text">{service.name}</p>
      <span className="badge text-xs">{service.type}</span>
    </div>
    <p className="mt-1 text-xs text-muted">{service.address}</p>
    <a className="mt-1 inline-block text-sm font-semibold text-brand-800" href={normalizePhoneToTel(service.phone)}>{service.phone}</a>
    <div className="mt-2">
      <Link className="btn-secondary text-xs focus-visible:ring-2 focus-visible:ring-brand-500" to={serviceLink(service.id, 'map')}>Ver no mapa</Link>
      <Link className="btn-secondary ml-2 text-xs focus-visible:ring-2 focus-visible:ring-brand-500" to={serviceLink(service.id, 'list')}>Ver na lista</Link>
    </div>
  </li>
);

export const ActionCard: React.FC<ActionCardProps> = ({ leafNode, services, onRestart, variant = 'compact' }) => {
  const [managementConfirmed, setManagementConfirmed] = useState(false);
  const [confirmFormal, setConfirmFormal] = useState(false);
  const navigate = useNavigate();

  const risk = leafNode.riskLevel || 'MÉDIO';
  const sourceLink = getSourceLink(leafNode.sourceRef);
  const deadline = leafNode.deadline || leafNode.decisionResult?.deadline || 'Hoje';

  const primaryServiceId = leafNode.decisionResult?.primaryServiceId || leafNode.primaryServiceIds?.[0] || leafNode.serviceIds?.[0];
  const primaryService = services.find((service) => service.id === primaryServiceId) || services.find((service) => service.id === 'de-leste1') || services[0];
  const secondaryIds = leafNode.decisionResult?.secondaryServiceIds || leafNode.secondaryServiceIds || [];
  const secondaryServices = services.filter((service) => secondaryIds.includes(service.id) && service.id !== primaryService?.id);

  const isCritical = risk === 'ALTO' || risk === 'EMERGENCIAL' || categoryKeyFromLeaf(leafNode) === 'violence';

  const showMandatoryToday = categoryKeyFromLeaf(leafNode) === 'violence' && !!leafNode.mandatoryTodayAction;
  const toneToken = riskTokens[normalizeRiskTokenLevel(risk)];
  const isCompact = variant === 'compact';

  const startsWithVerb = (value: string) => /^(Acionar|Encaminhar|Notificar|Registrar|Comunicar)\b/i.test(value.trim());
  const toVerbStep = (value: string, verb: 'Acionar' | 'Encaminhar' | 'Notificar' | 'Registrar' | 'Comunicar') =>
    startsWithVerb(value) ? value : `${verb}: ${value.charAt(0).toLowerCase()}${value.slice(1)}`;

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-2xl border border-brand-100 bg-brand-50 p-5 shadow-md lg:col-span-2">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2"><span className="text-xs font-semibold text-muted">Classificação:</span><RiskBadge level={risk} /></span>
          <span className="badge">Prioridade: {leafNode.decisionResult?.priority || leafNode.actionPriority || 'ORIENTAÇÃO'}</span>
          <SlaChip deadline={deadline} />
        </div>

        <div className="mb-3"><AlertPanel context="inline" ruleId={leafNode.id.toUpperCase().startsWith('R') ? leafNode.id.toUpperCase() : undefined} categoryKey={categoryKeyFromLeaf(leafNode)} /></div>



        <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
          <strong>Taxonomia de ações:</strong> <TermTooltip term="acionar" label="Acionar" /> · <TermTooltip term="encaminhar" label="Encaminhar" /> · <TermTooltip term="notificar" label="Notificar" /> · <TermTooltip term="registro_formal" label="Registrar" /> · <TermTooltip term="comunicar" label="Comunicar" />
        </div>

        {categoryKeyFromLeaf(leafNode) === 'violence' ? (
          <div className="mb-3 rounded-xl border border-danger-200 bg-danger-50 px-3 py-2 text-sm text-danger-900">
            Acolha, escute com calma e não investigue por conta própria. Não faça perguntas detalhadas nem confronte o suposto agressor; acione a rede de proteção.
          </div>
        ) : null}

        {showMandatoryToday ? <MandatoryBar text={leafNode.mandatoryTodayAction || ''} deadline={deadline} /> : null}

        <details open className="rounded-xl border p-3" style={{ backgroundColor: toneToken.bg + '14', borderColor: toneToken.border }}>
          <summary className="cursor-pointer" style={{ fontSize: typography.H2.size, lineHeight: typography.H2.lineHeight, fontWeight: typography.H2.weight, color: toneToken.border }}>Ação imediata (próximos 5 minutos)</summary>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm" style={{ color: toneToken.border }}>
            {(leafNode.doNow || leafNode.guidance || []).slice(0, 3).map((item, index) => (
              <li key={`${leafNode.id}-action-${index}`}>{toVerbStep(item, index === 0 ? 'Acionar' : index === 1 ? 'Comunicar' : 'Encaminhar')}</li>
            ))}
          </ol>
        </details>

        <details className="mt-3 rounded-xl border border-brand-200 bg-white p-3">
          <summary className="cursor-pointer text-base font-bold text-brand-900">Escalonar para</summary>
          {isCompact ? <p className="mt-1 text-xs text-muted">Toque para ver passos e serviços.</p> : null}
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-text">
            <li><TermTooltip term="comunicar" label="Comunicar" /> a Direção/Coordenação imediatamente.</li>
            {primaryService ? <li><span className="font-semibold"><TermTooltip term="acionar" label="Acionar" /> serviço principal:</span> {primaryService.name}.</li> : null}
            <li>
              <TermTooltip term="notificar" label="Notificar" />
              {' '}órgãos obrigatórios conforme risco e protocolo.
            </li>
          </ol>
          {primaryService && <ul className="mt-3 space-y-2"><ServiceItem service={primaryService} highlight /></ul>}
        </details>

        <details className="mt-3 rounded-xl border border-accent-200 bg-accent-50 p-3">
          <summary className="cursor-pointer text-base font-bold text-accent-900">Registro formal obrigatório (fora deste app)</summary>
          {isCompact ? <p className="mt-1 text-xs text-muted">Toque para ver checklist e canais formais.</p> : null}
          <div className="mt-2"><SlaChip deadline={deadline} /></div>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-accent-900">
            <li><TermTooltip term="registro_formal" label="Registrar" /> no canal oficial da escola.</li>
            <li>Registrar prazo e órgão acionado.</li>
            <li>Arquivar evidências administrativas conforme protocolo.</li>
          </ol>
          {!!leafNode.recordRequired?.length ? (
            <ul className="mt-2 list-disc pl-5 text-sm text-accent-900">
              {leafNode.recordRequired.map((record, index) => (
                <li key={`${record.system}-${index}`}>{record.system} · até {record.due}</li>
              ))}
            </ul>
          ) : null}

          <button
            type="button"
            onClick={() => setConfirmFormal(true)}
            className="btn-secondary mt-3 focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Abrir protocolo oficial e concluir registro formal
          </button>
        </details>

        <div className="mt-3">
          <SafetyAlert
            forbiddenAction={leafNode.forbiddenActions?.[0] || 'Confrontar agressor sem suporte'}
            recommendedAction={leafNode.doNow?.[0] || 'Proteger o estudante e acionar rede de apoio'}
            escalateTo={categoryKeyFromLeaf(leafNode) === 'violence' ? 'Direção e Conselho Tutelar (CT) (quando aplicável)' : 'Direção/Coordenação'}
          />
        </div>
      </article>

      <aside className="space-y-3">
        {!!secondaryServices.length && (
          <div className="card p-4">
            <h4 className="text-sm font-bold uppercase tracking-wide text-muted">Serviços complementares</h4>
            <ul className="mt-2 space-y-2">
              {secondaryServices.map((service) => <ServiceItem key={service.id} service={service} />)}
            </ul>
          </div>
        )}

        <div className="card p-4 text-sm text-text">
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Por que essa ação protege o estudante</h3>
          <p className="mt-2">{leafNode.decisionResult?.justification || leafNode.whyThisService || 'Encaminhamento definido por risco e competência da rede.'}</p>
        </div>

        {isCritical ? (
          <div className="card p-4 text-sm text-text">
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Confirmação</h3>
            <p className="mt-2">Você já comunicou a gestão (Direção/Coordenação) sobre este caso?</p>
            <label className="mt-2 flex items-start gap-2">
              <input
                type="checkbox"
                checked={managementConfirmed}
                onChange={(event) => setManagementConfirmed(event.target.checked)}
              />
              <span>Sim, já comuniquei. / Ainda não, vou comunicar a gestão agora.</span>
            </label>
          </div>
        ) : null}
      </aside>

      <div className="lg:col-span-2 text-xs text-muted">
        {sourceLink ? <details><summary className="cursor-pointer">Base normativa (ver referência)</summary><a className="mt-2 inline-block" href={sourceLink.href} target="_blank" rel="noreferrer">{sourceLink.label}</a></details> : null}
      </div>


      <div className="lg:col-span-2 card p-4">
        <StateOverlay type="success" text="Decisão registrada. Finalize os encaminhamentos." inline />
        <p className="mt-2 text-sm text-muted">Confira se você já executou os passos abaixo:</p>
        <ul className="mt-2 list-disc pl-5 text-sm text-text">
          <li>Você acionou o passo imediato.</li>
          <li>Você comunicou a gestão (Direção/Coordenação).</li>
          <li>Você iniciou o registro no canal oficial.</li>
        </ul>
        <button type="button" className="btn-secondary mt-3 focus-visible:ring-2 focus-visible:ring-brand-500" onClick={onRestart}>Concluir e reiniciar triagem</button>
      </div>

      {confirmFormal ? (
        <div className="fixed inset-0 z-[70] bg-black/40 p-4" onClick={() => setConfirmFormal(false)}>
          <div className="glass-overlay mx-auto mt-24 max-w-md p-5 shadow-lg" onClick={(event) => event.stopPropagation()}>
            <h3 className="text-lg font-extrabold text-text">Confirmar abertura do protocolo oficial agora?</h3>
            <p className="mt-2 text-sm text-muted">Ao continuar, você seguirá para o protocolo. Esta etapa não substitui o registro oficial da escola.</p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="btn-primary focus-visible:ring-2 focus-visible:ring-brand-500"
                onClick={() => {
                  setConfirmFormal(false);
                  navigate('/protocolo');
                }}
              >
                Abrir protocolo oficial
              </button>
              <button type="button" className="btn-secondary focus-visible:ring-2 focus-visible:ring-brand-500" onClick={() => setConfirmFormal(false)}>Voltar ao resultado</button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};
