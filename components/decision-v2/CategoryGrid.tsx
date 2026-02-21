import React from 'react';
import { DomainCard } from '../ui/DomainCard';
import { GlassCard } from '../ui/GlassCard';
import { SidePanelOrientacoes } from '../ui/SidePanelOrientacoes';
import { BottomSheetOrientacoes } from '../ui/BottomSheetOrientacoes';
import { DOMAIN_UI_COPY } from '../../content/domainUiCopy';

interface CategoryGridProps {
  categories: {
    id: string;
    label: string;
    icon: string;
    examples?: string[];
    nextNodeId?: string;
  }[];
  onSelect: (categoryId: string) => void;
}

const domainColorById: Record<string, string> = {
  pedagogico: '--domain-pedagogico',
  'saude-mental': '--domain-saude-mental',
  conflitos: '--domain-conflitos',
  discriminacao: '--domain-discriminacao',
  'comportamento-grave': '--domain-comportamento-grave',
  'vulnerabilidade-familiar': '--domain-vulnerabilidade',
  'violacao-direitos': '--domain-violacao-direitos',
  'uso-substancias': '--domain-substancias',
  'saude-fisica': '--domain-saude-fisica',
  'gravidez-saude-sexual': '--domain-gravidez',
  'inclusao-deficiencia': '--domain-inclusao',
  evasao: '--domain-evasao',
  'suicidio-ativo': '--domain-protecao',
  'lesao-grave': '--domain-protecao',
  'violencia-curso': '--domain-protecao',
  'intoxicacao-desmaio': '--domain-protecao',
  'abandono-imediato': '--domain-protecao',
  'violencia-sexual-recente': '--domain-protecao'
};

const CategoryGridBase: React.FC<CategoryGridProps> = ({ categories, onSelect }) => {
  const [showGuidance, setShowGuidance] = React.useState(false);
  const [hoveredDomainKey, setHoveredDomainKey] = React.useState<string | null>(null);

  const hoveredCopy = hoveredDomainKey ? DOMAIN_UI_COPY[hoveredDomainKey] : undefined;

  return (
    <section style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 16px 24px' }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, maxWidth: 820, margin: '0 auto' }}>
          <GlassCard
            title="Seleção de domínio"
            subtitle="Escolha o domínio predominante para seguir com uma decisão por vez."
            strong
          >
            <h1 style={{ margin: '0 0 14px', color: 'var(--text)', fontSize: '1.4rem' }}>Qual é o tipo de demanda?</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
              {categories.map((category) => {
                const nodeKey = category.nextNodeId || category.id;
                const uiCopy = DOMAIN_UI_COPY[nodeKey];

                return (
                  <div
                    key={category.id}
                    onMouseEnter={() => setHoveredDomainKey(nodeKey)}
                    onFocus={() => setHoveredDomainKey(nodeKey)}
                  >
                    <DomainCard
                      label={category.label}
                      icon={uiCopy?.icon || category.icon}
                      domainColorVar={uiCopy?.colorVar || domainColorById[category.id] || '--info'}
                      onClick={() => onSelect(category.id)}
                      description={category.examples?.[0]}
                      summary={uiCopy?.summary}
                      examples={uiCopy?.examples}
                      whenToUse={uiCopy?.whenToUse}
                    />
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <button
            type="button"
            className="xl:hidden"
            onClick={() => setShowGuidance(true)}
            style={{ marginTop: 12, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--surface-strong)', padding: '10px 14px', color: 'var(--text)' }}
          >
            Orientações
          </button>
        </div>

        <div style={{ width: 300, display: 'none' }} className="xl:block">
          {hoveredCopy ? (
            <GlassCard title="Como escolher este domínio" subtitle={hoveredCopy.summary}>
              <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-muted)' }}>
                {hoveredCopy.examples.slice(0, 3).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p style={{ margin: '10px 0 0', color: 'var(--text-muted)', fontSize: '0.84rem' }}>{hoveredCopy.whenToUse}</p>
            </GlassCard>
          ) : (
            <SidePanelOrientacoes />
          )}
        </div>
      </div>

      <BottomSheetOrientacoes open={showGuidance} onClose={() => setShowGuidance(false)} />
    </section>
  );
};

export const CategoryGrid = React.memo(CategoryGridBase);
