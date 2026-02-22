// components/decision/ResultScreenV2.tsx — Patch 5
// Tela de resultado v2: urgency badge, serviço prioritário +
// complementar linkados à Rede, orientações, banner de gestão,
// placeholder de anexos, botão de cópia de resumo.

import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FlowNode, Service } from '../../types';

// ─── Tipos internos ─────────────────────────────────────────

type UrgencyLevel = 'emergency' | 'attention' | 'followup';

interface ResultScreenV2Props {
  leafNode: FlowNode;
  services: Service[];
  onRestart: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────

/**
 * Gera URL de deep link para a aba Rede, com o serviço destacado.
 * O parâmetro ?highlight= é lido pelo NetworkPage para dar scroll + destaque.
 */
const serviceNetworkUrl = (serviceId: string): string =>
  `/rede?highlight=${encodeURIComponent(serviceId)}`;

/**
 * Normaliza telefone para link tel:
 */
const toTelHref = (phone: string): string =>
  `tel:${phone.replace(/\D/g, '')}`;

/**
 * Mapeia o riskLevel do nó para o nível de urgência visual.
 */
function resolveUrgencyLevel(riskLevel?: string): UrgencyLevel {
  if (!riskLevel) return 'attention';
  const upper = riskLevel.toUpperCase();
  if (upper === 'EMERGENCIAL' || upper === 'ALTO') return 'emergency';
  if (upper === 'MÉDIO' || upper === 'MEDIO') return 'attention';
  return 'followup';
}

/**
 * Textos do badge por nível de urgência.
 */
const URGENCY_META: Record<
  UrgencyLevel,
  { label: string; action: string; className: string }
> = {
  emergency: {
    label: 'Ação imediata',
    action: 'Acione agora, sem aguardar.',
    className: 'urgency-badge urgency-badge--emergency',
  },
  attention: {
    label: 'Encaminhamento',
    action: 'Encaminhe hoje, durante o turno.',
    className: 'urgency-badge urgency-badge--attention',
  },
  followup: {
    label: 'Acompanhamento',
    action: 'Agende e acompanhe nos próximos dias.',
    className: 'urgency-badge urgency-badge--followup',
  },
};

// ─── Ícones inline ────────────────────────────────────────────

const IconPhone: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.07 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 23 18l-.08-1.08z" />
  </svg>
);

const IconNetwork: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="5" r="3" />
    <circle cx="5" cy="19" r="3" />
    <circle cx="19" cy="19" r="3" />
    <line x1="12" y1="8" x2="5" y2="16" />
    <line x1="12" y1="8" x2="19" y2="16" />
  </svg>
);

const IconClipboard: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="2" width="6" height="4" rx="1" />
    <path d="M9 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

const IconCheck: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.25" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconWarning: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconAttachment: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <path d="M21.44 11.05L12.25 20.24a5 5 0 0 1-7.07-7.07l9.19-9.19a3 3 0 0 1 4.24 4.24L9.41 17.41a1 1 0 0 1-1.41-1.41L16.34 7.76" />
  </svg>
);

// ─── Sub-componente: card de serviço ─────────────────────────

interface ServiceCardProps {
  service: Service;
  priority: 'primary' | 'secondary';
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, priority }) => {
  const cardClass =
    priority === 'primary' ? 'result-priority-card' : 'result-secondary-card';

  return (
    <div className={cardClass}>
      <div className="result-service-row">
        <div className="result-service-info">
          <span className="result-service-label">
            {priority === 'primary' ? 'Serviço prioritário' : 'Serviço complementar'}
          </span>
          <strong className="result-service-name">{service.name}</strong>
          {service.type && (
            <span className="result-service-type">{service.type}</span>
          )}
          {service.address && (
            <span className="result-service-address">{service.address}</span>
          )}
        </div>

        <div className="result-service-actions">
          {service.phone && (
            <a
              href={toTelHref(service.phone)}
              className="ui-btn ui-btn--sm ui-btn--primary result-service-btn"
              aria-label={`Ligar para ${service.name}`}
            >
              <IconPhone />
              {service.phone}
            </a>
          )}

          <Link
            to={serviceNetworkUrl(service.id)}
            className="ui-btn ui-btn--sm ui-btn--ghost result-service-btn"
            aria-label={`Ver ${service.name} na aba Rede`}
          >
            <IconNetwork />
            Ver na Rede
          </Link>
        </div>
      </div>
    </div>
  );
};

// ─── Componente principal ─────────────────────────────────────

export const ResultScreenV2: React.FC<ResultScreenV2Props> = ({
  leafNode,
  services,
  onRestart,
}) => {
  const [copied, setCopied] = useState(false);

  // Urgência
  const urgencyLevel = resolveUrgencyLevel(leafNode.riskLevel);
  const urgencyMeta = URGENCY_META[urgencyLevel];

  // Serviços
  const primaryServiceId =
    leafNode.decisionResult?.primaryServiceId ??
    leafNode.primaryServiceIds?.[0] ??
    leafNode.serviceIds?.[0];

  const primaryService =
    services.find((s) => s.id === primaryServiceId) ?? services[0];

  const secondaryIds =
    leafNode.decisionResult?.secondaryServiceIds ??
    leafNode.secondaryServiceIds ??
    [];

  const secondaryServices = services.filter(
    (s) => secondaryIds.includes(s.id) && s.id !== primaryService?.id
  );

  // Orientações (máximo 3 bullets visíveis; resto expansível)
  const allGuidance = leafNode.doNow ?? leafNode.guidance ?? [];
  const primaryGuidance = allGuidance.slice(0, 3);
  const extraGuidance = allGuidance.slice(3);
  const [guidanceExpanded, setGuidanceExpanded] = useState(false);

  // Justificativa
  const justification =
    leafNode.decisionResult?.justification ??
    leafNode.whyThisService ??
    null;

  // Resumo para cópia
  const now = new Date();
  const dateStr = now.toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const buildSummary = useCallback((): string => {
    const lines: string[] = [
      '─────────────────────────────',
      'Bússola • E.E. Ermelino Matarazzo',
      `Data/hora: ${dateStr}`,
      `Urgência: ${urgencyMeta.label}`,
    ];

    if (leafNode.question) {
      lines.push(`Situação: ${leafNode.question}`);
    }

    if (primaryService) {
      lines.push('');
      lines.push('[ Serviço prioritário ]');
      lines.push(`${primaryService.name}`);
      if (primaryService.phone) lines.push(`Tel: ${primaryService.phone}`);
      if (primaryService.address) lines.push(primaryService.address);
    }

    if (secondaryServices.length > 0) {
      lines.push('');
      lines.push('[ Serviço complementar ]');
      secondaryServices.forEach((s) => {
        lines.push(`${s.name}${s.phone ? ` — Tel: ${s.phone}` : ''}`);
      });
    }

    if (primaryGuidance.length > 0) {
      lines.push('');
      lines.push('[ O que fazer agora ]');
      primaryGuidance.forEach((g, i) => lines.push(`${i + 1}. ${g}`));
    }

    lines.push('');
    lines.push('⚠️ Comunique imediatamente a equipe gestora.');
    lines.push('─────────────────────────────');

    return lines.join('\n');
  }, [leafNode, primaryService, secondaryServices, primaryGuidance, urgencyMeta, dateStr]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildSummary());
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback para navegadores sem clipboard API
      const el = document.createElement('textarea');
      el.value = buildSummary();
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <div className="result-screen-v2">

      {/* ── 1. Badge de urgência ─────────────────────────────── */}
      <div className="result-screen-top">
        <span className={urgencyMeta.className} role="status">
          {urgencyMeta.label}
        </span>
        <span className="result-urgency-action">{urgencyMeta.action}</span>
      </div>

      {/* ── 2. Título da situação ────────────────────────────── */}
      {leafNode.question && (
        <h2 className="result-screen-title">{leafNode.question}</h2>
      )}

      {/* ── 3. Serviço prioritário ──────────────────────────── */}
      {primaryService && (
        <ServiceCard service={primaryService} priority="primary" />
      )}

      {/* ── 4. Serviços complementares ──────────────────────── */}
      {secondaryServices.length > 0 && (
        <div className="col" style={{ gap: 8 }}>
          {secondaryServices.map((s) => (
            <ServiceCard key={s.id} service={s} priority="secondary" />
          ))}
        </div>
      )}

      {/* ── 5. O que fazer agora ────────────────────────────── */}
      {primaryGuidance.length > 0 && (
        <div className="result-guidance-block">
          <h3 className="result-guidance-title">O que fazer agora</h3>
          <ol className="result-guidance-list">
            {primaryGuidance.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
            {guidanceExpanded &&
              extraGuidance.map((item, i) => (
                <li key={`extra-${i}`}>{item}</li>
              ))}
          </ol>

          {extraGuidance.length > 0 && (
            <button
              type="button"
              className="result-guidance-expand"
              onClick={() => setGuidanceExpanded((v) => !v)}
              aria-expanded={guidanceExpanded}
            >
              {guidanceExpanded
                ? 'Ocultar orientações adicionais ↑'
                : `Ver mais ${extraGuidance.length} orientação${extraGuidance.length > 1 ? 'ões' : ''} ↓`}
            </button>
          )}
        </div>
      )}

      {/* ── 6. Justificativa (colapsada por padrão) ──────────── */}
      {justification && (
        <details className="result-justification">
          <summary className="result-justification-summary">
            Por que este encaminhamento?
          </summary>
          <p className="result-justification-body">{justification}</p>
        </details>
      )}

      {/* ── 7. Banner fixo de comunicação à gestão ──────────── */}
      <div className="result-management-banner" role="note">
        <IconWarning />
        <p>
          <strong>Comunique imediatamente</strong> a equipe gestora da escola
          (Direção ou Coordenação Pedagógica) sobre esta situação, mesmo que o
          encaminhamento já tenha sido iniciado.
        </p>
      </div>

      {/* ── 8. Placeholder de anexos ─────────────────────────── */}
      <div
        className="result-attachments-placeholder"
        role="note"
        aria-label="Documentos e anexos — em breve"
      >
        <IconAttachment />
        <span>
          Documentos de apoio e formulários serão disponibilizados aqui em
          breve, após aprovação da gestão escolar.
        </span>
      </div>

      {/* ── 9. Ações finais ──────────────────────────────────── */}
      <div className="result-actions-row">

        {/* Copiar resumo */}
        <button
          type="button"
          className="result-copy-btn"
          onClick={handleCopy}
          aria-live="polite"
          aria-label="Copiar resumo desta orientação para a área de transferência"
        >
          {copied ? <IconCheck /> : <IconClipboard />}
          {copied ? 'Copiado!' : 'Copiar resumo'}
        </button>

        {/* Link direto para a Rede (atalho geral) */}
        <Link
          to="/rede"
          className="ui-btn ui-btn--ghost ui-btn--sm"
          aria-label="Ir para a aba Rede de serviços"
        >
          <IconNetwork />
          Ver Rede
        </Link>

        {/* Reiniciar */}
        <button
          type="button"
          className="ui-btn ui-btn--secondary ui-btn--sm"
          onClick={onRestart}
          style={{ marginLeft: 'auto' }}
          aria-label="Reiniciar o Decisor do início"
        >
          Novo caso
        </button>
      </div>

    </div>
  );
};
