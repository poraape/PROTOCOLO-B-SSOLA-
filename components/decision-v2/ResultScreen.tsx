import { ArrowLeft, CheckCircle, Info, Phone } from 'lucide-react';
import { InstitutionalBreadcrumb } from './InstitutionalBreadcrumb';
import type { ResultNode } from '../../types/decision-tree-v2';
import { AccordionSection } from './AccordionSection';
import { HelpTooltip } from './HelpTooltip';

interface ResultScreenProps {
  node: ResultNode;
  onBack: () => void;
  onReset: () => void;
}

export const ResultScreen = ({ node, onBack, onReset }: ResultScreenProps) => {
  return (
    <div className="result-screen">
      <header className="decision-header">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={18} />
          Voltar
        </button>
        <InstitutionalBreadcrumb schoolName="Escola de Exemplo" />
      </header>

      <div className="result-content">
        <div className="result-main">
          <div className="result-indicator">
            <CheckCircle size={32} />
          </div>
          <h1 className="result-title">{node.label}</h1>
          <p className="result-description">{node.details.description}</p>

          {node.details.nextSteps && (
            <div className="result-section">
              <h2 className="result-section-title">Próximos Passos</h2>
              <ul className="result-steps-list">
                {node.details.nextSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="result-sidebar">
          {node.details.contacts && node.details.contacts.length > 0 && (
            <AccordionSection title="Contatos Importantes" icon={Phone}>
              <div className="contact-list">
                {node.details.contacts.map((contact) => (
                  <div key={contact.name} className="contact-item">
                    <p className="contact-name">{contact.name}</p>
                    <a href={`tel:${contact.phone}`} className="contact-phone">
                      {contact.phone}
                    </a>
                    {contact.description && (
                       <p className="contact-description">{contact.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </AccordionSection>
          )}

          {node.details.goodToKnow && (
             <AccordionSection title="Bom Saber" icon={Info}>
                <div
                  className="good-to-know-content"
                  dangerouslySetInnerHTML={{ __html: node.details.goodToKnow }}
                />
             </AccordionSection>
          )}
        </aside>
      </div>

       <footer className="result-footer">
          <button onClick={onReset} className="reset-button">
            Iniciar Nova Simulação
          </button>
          <HelpTooltip />
        </footer>
    </div>
  );
};
