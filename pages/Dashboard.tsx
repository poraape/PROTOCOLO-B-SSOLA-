// pages/Dashboard.tsx — v2 (Patch 4)
// Dashboard = orientação + acesso rápido ao Decisor

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DOMAIN_GROUPS, IconKey } from '../data/domainGroups';

const Icon: React.FC<{ name: IconKey }> = ({ name }) => {
  // Ícones inline (Lucide-style). Patch 5 troca por Lucide React.
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  switch (name) {
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 2 20 6v6c0 5-3.5 9-8 10C7.5 21 4 17 4 12V6l8-4z" />
        </svg>
      );
    case 'scale':
      return (
        <svg {...common}>
          <path d="M12 3v18" />
          <path d="M7 6h10" />
          <path d="m7 6-3 6h6L7 6z" />
          <path d="m17 6-3 6h6l-3-6z" />
          <path d="M8 21h8" />
        </svg>
      );
    case 'alert':
      return (
        <svg {...common}>
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      );
    case 'heart':
      return (
        <svg {...common}>
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
      );
    case 'brain':
      return (
        <svg {...common}>
          <path d="M8.5 6.5a3 3 0 0 1 3-3" />
          <path d="M15.5 6.5a3 3 0 0 0-3-3" />
          <path d="M7 8a3 3 0 0 0 0 6" />
          <path d="M17 8a3 3 0 0 1 0 6" />
          <path d="M8 14a3 3 0 0 0 0 6" />
          <path d="M16 14a3 3 0 0 1 0 6" />
          <path d="M12 3.5v17" />
        </svg>
      );
    case 'stethoscope':
      return (
        <svg {...common}>
          <path d="M6 2v6a6 6 0 0 0 12 0V2" />
          <path d="M8 2v6" />
          <path d="M16 2v6" />
          <path d="M12 14v4a4 4 0 0 0 8 0v-2" />
          <circle cx="20" cy="16" r="2" />
        </svg>
      );
    case 'flask':
      return (
        <svg {...common}>
          <path d="M10 2v6l-5 9a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17l-5-9V2" />
          <path d="M8.5 10h7" />
        </svg>
      );
    case 'baby':
      return (
        <svg {...common}>
          <path d="M9 12a3 3 0 1 0 6 0" />
          <path d="M10 10h.01" />
          <path d="M14 10h.01" />
          <path d="M8 16a6 6 0 0 1 8 0" />
          <path d="M12 3a5 5 0 0 0-5 5" />
          <path d="M12 3a5 5 0 0 1 5 5" />
        </svg>
      );
    case 'home':
      return (
        <svg {...common}>
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="M9 22V12h6v10" />
        </svg>
      );
    case 'userx':
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="m17 8 5 5" />
          <path d="m22 8-5 5" />
        </svg>
      );
    case 'messages':
      return (
        <svg {...common}>
          <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          <path d="M8 8h8" />
          <path d="M8 12h5" />
        </svg>
      );
    case 'book':
      return (
        <svg {...common}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case 'door':
      return (
        <svg {...common}>
          <path d="M14 3h7v18h-7" />
          <path d="M10 17 15 12 10 7" />
          <path d="M15 12H3" />
        </svg>
      );
    case 'accessibility':
      return (
        <svg {...common}>
          <circle cx="12" cy="4" r="2" />
          <path d="M10 22v-6l-2-4" />
          <path d="M14 22v-6l2-4" />
          <path d="M6 10h12" />
          <path d="M12 6v6" />
        </svg>
      );
    default:
      return <span aria-hidden="true" />;
  }
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const goDecisor = () => navigate('/decisor');
  const goRede = () => navigate('/rede');
  const goRecursos = () => navigate('/recursos');

  return (
    <div className="col">

      {/* HERO — ponto focal */}
      <section className="card-elevated dashboard-hero-card">
        <div className="ui-page-header">
          <div>
            <h1 className="ui-page-title">Há uma situação agora?</h1>
            <p className="ui-page-subtitle">
              Use o Decisor para orientar acolhimento e encaminhamento de forma clara e responsável.
            </p>
          </div>

          {/* espaço reservado para ação rápida futura (ex.: “Emergência”) */}
          <div className="ui-page-actions" />
        </div>

        <div className="dashboard-cta-row" style={{ marginTop: 12 }}>
          <button type="button" className="ui-btn ui-btn--primary dashboard-cta-primary" onClick={goDecisor}>
            Iniciar Decisor
          </button>

          <button type="button" className="ui-btn ui-btn--secondary dashboard-cta-secondary" onClick={goRede}>
            Consultar Rede
          </button>

          <button type="button" className="ui-btn ui-btn--ghost dashboard-cta-secondary" onClick={goRecursos}>
            Abrir Recursos
          </button>
        </div>
      </section>

      {/* MAPA — domínios por categoria */}
      <section className="card-flat">
        <div className="ui-section">
          <div>
            <h2 className="ui-section-title">Domínios (para consulta)</h2>
            <p className="ui-section-subtitle">
              Explore por categoria para encontrar rapidamente o tipo de demanda do estudante.
            </p>
          </div>

          <div className="col" style={{ gap: 18 }}>
            {DOMAIN_GROUPS.map((group) => {
              const groupColor = `var(${group.colorVar})`;

              return (
                <div key={group.id} className="card-flat" style={{ padding: 16 }}>
                  <div
                    className="domain-group-header"
                    style={{ ['--group-color' as any]: groupColor }}
                  >
                    <span className="domain-group-icon">
                      <Icon name={group.icon} />
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <div className="domain-group-title">{group.title}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4, lineHeight: 1.4 }}>
                        {group.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="col" style={{ gap: 10 }}>
                    {group.domains.map((domain) => (
                      <button
                        key={domain.id}
                        type="button"
                        className="domain-card"
                        style={{ ['--domain-card-color' as any]: groupColor }}
                        onClick={() => navigate('/decisor', { state: { domainId: domain.id } })}
                        aria-label={`${domain.title}. Abrir Decisor neste domínio.`}
                      >
                        <span className="domain-card-strip" aria-hidden="true" />
                        <div className="domain-card-content">
                          <div className="domain-card-head">
                            <span className="domain-card-icon">
                              <Icon name={domain.icon} />
                            </span>
                            <span className="domain-card-title">{domain.title}</span>
                          </div>

                          <p className="domain-card-summary">{domain.summary}</p>
                          <p className="domain-card-when">{domain.when}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ações secundárias — baixa fricção */}
          <div className="grid-2" style={{ marginTop: 8 }}>
            <button type="button" className="ui-btn ui-btn--ghost dashboard-support-action" onClick={() => navigate('/recursos')}>
              FAQ, Glossário e Modelos
            </button>

            <button type="button" className="ui-btn ui-btn--ghost dashboard-support-action" onClick={() => navigate('/versao')}>
              Versão e governança
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
