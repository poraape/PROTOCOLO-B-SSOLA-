import React from 'react';
import { designTokens } from '../../styles/design-tokens';

interface CategoryGridProps {
  categories: {
    id: string;
    label: string;
    icon: string;
    examples?: string[];
  }[];
  onSelect: (categoryId: string) => void;
}

const CategoryGridBase: React.FC<CategoryGridProps> = ({ categories, onSelect }) => {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  return (
    <section
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: designTokens.spacing.xl
      }}
    >
      <h1
        style={{
          fontSize: designTokens.typography.question.size,
          fontWeight: designTokens.typography.question.weight,
          lineHeight: designTokens.typography.question.lineHeight,
          margin: 0,
          marginBottom: designTokens.spacing.lg
        }}
      >
        Qual é o tipo de demanda?
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: designTokens.spacing.md,
          marginTop: designTokens.spacing.xl
        }}
      >
        {categories.map((category) => {
          const isHovered = hoveredId === category.id;
          const examplesText = category.examples?.join(', ') || '';

          return (
            <div
              key={category.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(category.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelect(category.id);
                }
              }}
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                padding: designTokens.spacing.xl,
                borderRadius: designTokens.borderRadius.lg,
                backgroundColor: designTokens.colors.background.secondary,
                border: `2px solid ${isHovered ? designTokens.colors.routine : 'transparent'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isHovered ? designTokens.shadows.md : designTokens.shadows.sm,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: designTokens.spacing.sm }}>{category.icon}</div>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  textAlign: 'center',
                  marginBottom: designTokens.spacing.sm
                }}
              >
                {category.label}
              </div>

              {examplesText ? (
                <div
                  title={`Exemplos: ${examplesText}`}
                  style={{
                    fontSize: '14px',
                    color: designTokens.colors.info,
                    textAlign: 'center',
                    fontStyle: 'italic',
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Exemplos: {examplesText}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const CategoryGrid = React.memo(CategoryGridBase);
