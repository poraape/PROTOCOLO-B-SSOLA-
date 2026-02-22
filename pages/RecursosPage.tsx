// pages/RecursosPage.tsx — v2 (Patch 7)
// Hub consolidado: FAQ · Glossário · Modelos · Simulador · Sobre
//
// Arquitetura de tabs:
//   - Estado via URL ?tab= → link compartilhável, histórico navegável
//   - Cada aba carregada com React.lazy (code splitting automático)
//   - Fallback suspense com skeleton leve
//   - Keyboard nav: ArrowLeft/ArrowRight entre abas

import React, {
  lazy,
  Suspense,
  useEffect,
  useRef,
} from 'react';
import { useSearchParams } from 'react-router-dom';

// ─── Lazy imports (cada aba só carrega quando acessada) ───────

const FAQPage        = lazy(() => import('./FAQPage').then((m) => ({ default: m.FAQPage ?? m.default })));
const GlossaryPage   = lazy(() => import('./GlossaryPage').then((m) => ({ default: m.GlossaryPage ?? m.default })));
const ModelosPage    = lazy(() => import('./ModelosPage'));                           // default export
const SimulatorPage  = lazy(() => import('./SimulatorPage').then((m) => ({ default: m.SimulatorPage ?? m.default })));
const AboutPage      = lazy(() => import('./AboutPage').then((m) => ({ default: m.AboutPage ?? m.default })));

// ─── Definição das abas ───────────────────────────────────────

type TabId = 'faq' | 'glossario' | 'modelos' | 'simulador' | 'sobre';

interface TabDef {
  id: TabId;
  label: string;
  ariaLabel: string;
  Component: React.LazyExoticComponent<React.ComponentType>;
}

const TABS: TabDef[] = [
  {
    id: 'faq',
    label: 'FAQ',
    ariaLabel: 'Perguntas frequentes sobre o protocolo',
    Component: FAQPage,
  },
  {
    id: 'glossario',
    label: 'Glossário',
    ariaLabel: 'Termos e conceitos institucionais',
    Component: GlossaryPage,
  },
  {
    id: 'modelos',
    label: 'Modelos',
    ariaLabel: 'Modelos de documentos institucionais',
    Component: ModelosPage,
  },
  {
    id: 'simulador',
    label: 'Simulador',
    ariaLabel: 'Simulador de cenários do protocolo',
    Component: SimulatorPage,
  },
  {
    id: 'sobre',
    label: 'Sobre',
    ariaLabel: 'Sobre o Protocolo Bússola',
    Component: AboutPage,
  },
];

const DEFAULT_TAB: TabId = 'faq';

const isValidTab = (value: string | null): value is TabId =>
  TABS.some((t) => t.id === value);

// ─── Skeleton de carregamento ─────────────────────────────────

const TabSkeleton: React.FC = () => (
  <div className="recursos-skeleton" aria-busy="true" aria-label="Carregando conteúdo…">
    <div className="recursos-skeleton-line recursos-skeleton-line--title" />
    <div className="recursos-skeleton-line" />
    <div className="recursos-skeleton-line recursos-skeleton-line--short" />
    <div className="recursos-skeleton-line" />
    <div className="recursos-skeleton-line recursos-skeleton-line--short" />
  </div>
);

// ─── RecursosPage ─────────────────────────────────────────────

export const RecursosPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabListRef = useRef<HTMLDivElement | null>(null);

  // Resolve aba ativa a partir da URL
  const rawTab = searchParams.get('tab');
  const activeTab: TabId = isValidTab(rawTab) ? rawTab : DEFAULT_TAB;
  const activeIndex = TABS.findIndex((t) => t.id === activeTab);

  const goToTab = (id: TabId) => {
    const next = new URLSearchParams(searchParams);
    next.set('tab', id);
    setSearchParams(next, { replace: true });
  };

  // Keyboard navigation entre abas (ARIA pattern: tablist)
  useEffect(() => {
    const list = tabListRef.current;
    if (!list) return;

    const onKey = (e: KeyboardEvent) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();

      let next = activeIndex;
      if (e.key === 'ArrowRight') next = (activeIndex + 1) % TABS.length;
      if (e.key === 'ArrowLeft')  next = (activeIndex - 1 + TABS.length) % TABS.length;
      if (e.key === 'Home')       next = 0;
      if (e.key === 'End')        next = TABS.length - 1;

      goToTab(TABS[next].id);
      // Foca o botão da aba seguinte
      const btn = list.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next];
      btn?.focus();
    };

    list.addEventListener('keydown', onKey);
    return () => list.removeEventListener('keydown', onKey);
  }, [activeIndex]);

  const { Component: ActiveComponent } = TABS[activeIndex];

  return (
    <div className="col">

      {/* Cabeçalho da seção */}
      <div className="ui-page-header">
        <div>
          <h1 className="ui-page-title">Recursos</h1>
          <p className="ui-page-subtitle">
            Consulta, referência e treinamento — tudo em um só lugar.
          </p>
        </div>
      </div>

      {/* Tab list */}
      <div
        ref={tabListRef}
        className="recursos-tablist"
        role="tablist"
        aria-label="Seções de recursos"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-controls={`tabpanel-${tab.id}`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={[
                'recursos-tab',
                isActive ? 'recursos-tab--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => goToTab(tab.id)}
              aria-label={tab.ariaLabel}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab panel */}
      <div
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="recursos-tabpanel"
        tabIndex={0}
      >
        <Suspense fallback={<TabSkeleton />}>
          <ActiveComponent />
        </Suspense>
      </div>

    </div>
  );
};
