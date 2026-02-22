import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BussolaLogo } from '../components/BussolaLogo';
import '../styles/dashboard.css';

// ═══════════════════════════════════════════════════════════════
// DOMÍNIOS COMPLETOS — linguagem adaptada para professores/leigos
// ═══════════════════════════════════════════════════════════════

type DomainItem = {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  color: string;
  bg: string;
  pulse?: boolean;
};

const DOMAINS_CRITICAL: DomainItem[] = [
  {
    id: 'suicidio',
    label: 'Risco de Morte',
    sublabel: 'Fala ou ameaça de tirar a própria vida',
    icon: '🚨',
    color: '#DC2626',
    bg: '#FEF2F2',
    pulse: true
  },
  {
    id: 'v-sexual',
    label: 'Violência Sexual',
    sublabel: 'Abuso, assédio ou suspeita recente',
    icon: '⚠️',
    color: '#F97316',
    bg: '#FFF7ED'
  },
  {
    id: 'uso-substancias',
    label: 'Drogas ou Álcool',
    sublabel: 'Uso, venda ou dependência',
    icon: '💊',
    color: '#DC2626',
    bg: '#FEF2F2'
  }
];

const DOMAINS_CARE: DomainItem[] = [
  {
    id: 'autolesao',
    label: 'Cortes ou Machucados',
    sublabel: 'Marcas no corpo feitas de propósito',
    icon: '🩹',
    color: '#3B82F6',
    bg: '#EFF6FF'
  },
  {
    id: 'saude-mental',
    label: 'Tristeza Profunda',
    sublabel: 'Choro frequente, isolamento, angústia',
    icon: '💭',
    color: '#3B82F6',
    bg: '#EFF6FF'
  },
  {
    id: 'gravidez',
    label: 'Gravidez',
    sublabel: 'Suspeita ou confirmação',
    icon: '🤰',
    color: '#64748B',
    bg: '#F8FAFC'
  }
];

const DOMAINS_SOCIAL: DomainItem[] = [
  {
    id: 'comportamento',
    label: 'Briga ou Agressão',
    sublabel: 'Comportamento violento ou descontrolado',
    icon: '⚡',
    color: '#F97316',
    bg: '#FFF7ED'
  },
  {
    id: 'conflitos',
    label: 'Problemas com Colegas',
    sublabel: 'Discussões, ameaças, não se dá com ninguém',
    icon: '🤝',
    color: '#8B5CF6',
    bg: '#F5F3FF'
  },
  {
    id: 'discriminacao',
    label: 'Exclusão ou Bullying',
    sublabel: 'Preconceito, xingamentos, isolamento',
    icon: '🚫',
    color: '#8B5CF6',
    bg: '#F5F3FF'
  }
];

const DOMAINS_LEARNING: DomainItem[] = [
  {
    id: 'pedagogico',
    label: 'Dificuldade de Aprender',
    sublabel: 'Rendimento muito baixo, evasão frequente',
    icon: '📚',
    color: '#1E4DA1',
    bg: '#EFF6FF'
  },
  {
    id: 'vulnerabilidade',
    label: 'Falta de Condições',
    sublabel: 'Situação de rua, fome, falta de material',
    icon: '🏠',
    color: '#D97706',
    bg: '#FFFBEB'
  },
  {
    id: 'violacao-direitos',
    label: 'Direitos Violados',
    sublabel: 'Trabalho infantil, negligência, exploração',
    icon: '⚖️',
    color: '#DC2626',
    bg: '#FEF2F2'
  }
];

const DOMAINS_HEALTH: DomainItem[] = [
  {
    id: 'saude-fisica',
    label: 'Problema de Saúde',
    sublabel: 'Doença, sintomas, necessidade de exame',
    icon: '🏥',
    color: '#10B981',
    bg: '#ECFDF5'
  }
];

const ACTION_TOOLS = [
  {
    label: 'Documentos e Modelos',
    sublabel: 'Ofícios, relatórios, formulários',
    icon: '📋',
    path: '/recursos',
    bg: '#FFFBEB',
    color: '#D97706'
  },
  {
    label: 'Rede de Apoio',
    sublabel: 'UBSs, CAPS, Conselho Tutelar',
    icon: '🗺️',
    path: '/rede',
    bg: '#ECFDF5',
    color: '#10B981'
  },
  {
    label: 'Glossário de Termos',
    sublabel: 'Entenda palavras técnicas',
    icon: '📖',
    path: '/recursos#glossario',
    bg: '#EFF6FF',
    color: '#3B82F6'
  }
];

export function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'professor' | 'gestor'>('gestor');
  const [expandedGroup, setExpandedGroup] = useState<string | null>('critical');

  const toggleGroup = (group: string) => {
    setExpandedGroup(expandedGroup === group ? null : group);
  };

  return (
    <div className="dashboard-wrap">
      {/* ── HERO ──────────────────────────────────── */}
      <section className="dash-hero">
        <div className="dash-hero-figure" aria-hidden="true">
          <BussolaLogo size={130} />
        </div>

        <div className="dash-hero-content">
          <div className="dash-hero-top">
            <div className="dash-hero-brand">
              <span className="dash-hero-brand-icon">🛡️</span>
              <span className="dash-hero-brand-text">PROTOCOLO BÚSSOLA 4.5</span>
            </div>
            <div className="dash-role-toggle">
              {(['professor', 'gestor'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`role-btn ${role === r ? 'role-btn--active' : ''}`}
                  type="button"
                >
                  {r === 'professor' ? 'DOCENTE' : 'GESTÃO'}
                </button>
              ))}
            </div>
          </div>

          <h1 className="dash-headline">
            O que fazer <span className="dash-accent">agora?</span>
          </h1>
          <p className="dash-subtitle">
            Identifique a situação do estudante e saiba os próximos passos.
          </p>

          <div className="dash-ctas">
            <button className="dash-cta dash-cta--primary" onClick={() => navigate('/decisor')} type="button">
              INICIAR ATENDIMENTO GUIADO 🧭
            </button>
            <button className="dash-cta dash-cta--secondary" onClick={() => navigate('/rede')} type="button">
              CONSULTAR REDE DE APOIO 📞
            </button>
          </div>
        </div>
      </section>

      {/* ── DOMÍNIOS ORGANIZADOS POR GRUPO ─────────── */}

      <section className="domain-section">
        <button
          className="domain-section-header"
          onClick={() => toggleGroup('critical')}
          aria-expanded={expandedGroup === 'critical'}
          type="button"
        >
          <span className="domain-section-title">🚨 Situações de Maior Gravidade</span>
          <span className="domain-section-toggle">{expandedGroup === 'critical' ? '▼' : '▶'}</span>
        </button>
        {expandedGroup === 'critical' ? (
          <div className="domain-grid">
            {DOMAINS_CRITICAL.map((item) => (
              <DomainCard key={item.id} item={item} navigate={navigate} />
            ))}
          </div>
        ) : null}
      </section>

      <section className="domain-section">
        <button
          className="domain-section-header"
          onClick={() => toggleGroup('care')}
          aria-expanded={expandedGroup === 'care'}
          type="button"
        >
          <span className="domain-section-title">💙 Acolhimento e Cuidado</span>
          <span className="domain-section-toggle">{expandedGroup === 'care' ? '▼' : '▶'}</span>
        </button>
        {expandedGroup === 'care' ? (
          <div className="domain-grid">
            {DOMAINS_CARE.map((item) => (
              <DomainCard key={item.id} item={item} navigate={navigate} />
            ))}
          </div>
        ) : null}
      </section>

      <section className="domain-section">
        <button
          className="domain-section-header"
          onClick={() => toggleGroup('social')}
          aria-expanded={expandedGroup === 'social'}
          type="button"
        >
          <span className="domain-section-title">🤝 Convivência Escolar</span>
          <span className="domain-section-toggle">{expandedGroup === 'social' ? '▼' : '▶'}</span>
        </button>
        {expandedGroup === 'social' ? (
          <div className="domain-grid">
            {DOMAINS_SOCIAL.map((item) => (
              <DomainCard key={item.id} item={item} navigate={navigate} />
            ))}
          </div>
        ) : null}
      </section>

      <section className="domain-section">
        <button
          className="domain-section-header"
          onClick={() => toggleGroup('learning')}
          aria-expanded={expandedGroup === 'learning'}
          type="button"
        >
          <span className="domain-section-title">📚 Ensino e Aprendizado</span>
          <span className="domain-section-toggle">{expandedGroup === 'learning' ? '▼' : '▶'}</span>
        </button>
        {expandedGroup === 'learning' ? (
          <div className="domain-grid">
            {DOMAINS_LEARNING.map((item) => (
              <DomainCard key={item.id} item={item} navigate={navigate} />
            ))}
          </div>
        ) : null}
      </section>

      <section className="domain-section">
        <button
          className="domain-section-header"
          onClick={() => toggleGroup('health')}
          aria-expanded={expandedGroup === 'health'}
          type="button"
        >
          <span className="domain-section-title">🏥 Saúde e Bem-Estar</span>
          <span className="domain-section-toggle">{expandedGroup === 'health' ? '▼' : '▶'}</span>
        </button>
        {expandedGroup === 'health' ? (
          <div className="domain-grid">
            {DOMAINS_HEALTH.map((item) => (
              <DomainCard key={item.id} item={item} navigate={navigate} />
            ))}
          </div>
        ) : null}
      </section>

      {/* ── FERRAMENTAS ──────────────────────────────── */}
      <section className="dash-tools-section">
        <h3 className="dash-tools-title">🛠️ Ferramentas e Orientações</h3>
        <div className="dash-tools-grid">
          {ACTION_TOOLS.map((tool) => (
            <button
              key={tool.path}
              className="tool-card ios-card"
              onClick={() => navigate(tool.path)}
              style={{ '--tool-bg': tool.bg, '--tool-color': tool.color } as React.CSSProperties}
              type="button"
            >
              <div className="tool-card-icon" style={{ background: tool.bg, color: tool.color }}>
                {tool.icon}
              </div>
              <div className="tool-card-text">
                <span className="tool-card-label">{tool.label}</span>
                <span className="tool-card-sub">{tool.sublabel}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── CARD CONTEXTUAL (role) ─────────────────── */}
      <section
        className={`dash-role-card ${role === 'professor' ? 'dash-role-card--professor' : 'dash-role-card--gestor'}`}
      >
        <div className="dash-role-icon">{role === 'professor' ? '👨‍🏫' : '🏢'}</div>
        <div>
          <h4 className="dash-role-title">
            {role === 'professor' ? 'Seu Papel como Professor(a)' : 'Responsabilidade da Gestão Escolar'}
          </h4>
          <p className="dash-role-text">
            {role === 'professor'
              ? 'Você é responsável por acolher e observar. A gestão cuida da notificação e dos encaminhamentos oficiais.'
              : 'Garanta que o caso seja registrado, notificado aos órgãos competentes e que a rede seja acionada em até 24 horas.'}
          </p>
        </div>
      </section>
    </div>
  );
}

type DomainCardProps = {
  item: DomainItem;
  navigate: (path: string) => void;
};

// ── COMPONENTE DE CARD DE DOMÍNIO ────────────────────
const DomainCard: React.FC<DomainCardProps> = ({ item, navigate }) => (
  <button
    className={`domain-card ios-card ${item.pulse ? 'pulse-emergency' : ''}`}
    onClick={() => navigate(`/decisor?domain=${item.id}`)}
    style={{ '--domain-color': item.color, '--domain-bg': item.bg } as React.CSSProperties}
    type="button"
  >
    <div className="domain-card-icon" style={{ background: item.bg }}>
      {item.icon}
    </div>
    <div className="domain-card-text">
      <span className="domain-card-label">{item.label}</span>
      <span className="domain-card-sublabel">{item.sublabel}</span>
    </div>
  </button>
);

export default Dashboard;
