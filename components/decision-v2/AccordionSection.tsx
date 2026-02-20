import React from 'react';
import { designTokens } from '../../styles/design-tokens';

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  children,
  defaultOpen = false
}) => {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <section style={{ marginBottom: designTokens.spacing.md }}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: designTokens.spacing.md,
          backgroundColor: designTokens.colors.background.secondary,
          border: `1px solid ${designTokens.colors.background.tertiary}`,
          borderRadius: designTokens.borderRadius.md,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: designTokens.spacing.sm,
          fontSize: designTokens.typography.secondary.size,
          fontWeight: '600',
          lineHeight: designTokens.typography.secondary.lineHeight
        }}
      >
        <span>{open ? '▼' : '▶'}</span>
        <span>{title}</span>
      </button>

      {/*
        A animação de max-height simplifica a transição sem CSS externo,
        preservando o requisito de abertura/fechamento suave.
      */}
      <div
        style={{
          maxHeight: open ? '600px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease'
        }}
      >
        <div
          style={{
            padding: open ? designTokens.spacing.md : '0px',
            transition: 'padding 0.3s ease'
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
};
