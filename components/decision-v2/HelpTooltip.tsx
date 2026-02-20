import React from 'react';
import { designTokens } from '../../styles/design-tokens';

interface HelpTooltipProps {
  text: string;
}

export const HelpTooltip: React.FC<HelpTooltipProps> = ({ text }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        aria-label="Ajuda"
        style={{
          width: '24px',
          height: '24px',
          borderRadius: designTokens.borderRadius.full,
          backgroundColor: designTokens.colors.info,
          color: '#FFFFFF',
          fontSize: '14px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none'
        }}
      >
        ?
      </div>

      {open ? (
        <div
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: '300px',
            padding: designTokens.spacing.sm,
            borderRadius: designTokens.borderRadius.sm,
            backgroundColor: '#111827',
            color: '#FFFFFF',
            fontSize: designTokens.typography.help.size,
            lineHeight: designTokens.typography.help.lineHeight,
            zIndex: 20,
            boxShadow: designTokens.shadows.md,
            whiteSpace: 'normal'
          }}
        >
          {text}
        </div>
      ) : null}
    </div>
  );
};
