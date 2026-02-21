import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppCard } from '../components/ui/AppCard';
import { AppButton } from '../components/ui/AppButton';
import { PageHeader } from '../components/ui/PageHeader';
import { Section } from '../components/ui/Section';

type ResourceLink = {
  title: string;
  description: string;
  path: string;
};

const resourceLinks: ResourceLink[] = [
  {
    title: 'Glossário Técnico',
    description: 'Conceitos institucionais e terminologias de proteção para decisões consistentes.',
    path: '/glossary'
  },
  {
    title: 'FAQ',
    description: 'Perguntas frequentes sobre acolhimento, fluxos, sigilo e responsabilidades.',
    path: '/faq'
  },
  {
    title: 'Simulador',
    description: 'Treino guiado de cenários para reforçar tempo de resposta e coerência no protocolo.',
    path: '/simulador'
  },
  {
    title: 'Gírias dos Estudantes',
    description: 'Apoio pedagógico para compreensão contextual da linguagem estudantil.',
    path: '/student-terms'
  }
];

export const ResourcesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="stack space-3" style={{ paddingBottom: 20 }}>
      <PageHeader
        title="Recursos de apoio"
        subtitle="Centralize materiais complementares para apoiar atendimento, comunicação e tomada de decisão."
      />

      <Section>
        <div className="grid-2">
          {resourceLinks.map((resource) => (
            <AppCard as="article" key={resource.path}>
              <div className="stack space-2">
                <h3 style={{ margin: 0 }}>{resource.title}</h3>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>{resource.description}</p>
                <div>
                  <AppButton variant="secondary" onClick={() => navigate(resource.path)}>
                    Acessar
                  </AppButton>
                </div>
              </div>
            </AppCard>
          ))}
        </div>
      </Section>
    </div>
  );
};
