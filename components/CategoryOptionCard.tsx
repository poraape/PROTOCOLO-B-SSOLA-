import React from 'react';
import { CATEGORY_TOKENS, CategoryId } from '../ui/categoryTokens';

type Props = {
  categoryId: CategoryId;
  onClick: () => void;
  isSelected?: boolean;
};

export function CategoryOptionCard({ categoryId, onClick, isSelected }: Props) {
  const t = CATEGORY_TOKENS[categoryId];

  const selectedClass = isSelected ? 'ring-2 ring-brand-300 ring-offset-2' : '';

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'category-card p-5',
        t.tint.bg,
        t.tint.border,
        t.tint.ring,
        selectedClass,
        'focus-visible:ring-2'
      ].join(' ')}
    >
      <span className={['category-chip', t.tint.border, t.tint.bg, t.tint.text].join(' ')}>
        <span className="category-emoji" aria-hidden="true">{t.emoji}</span>
        <span>{t.label}</span>
      </span>

      <h3 className="category-title text-base font-medium">{t.label}</h3>
      <p className="category-desc mt-2 text-sm leading-relaxed text-gray-600">{t.short}</p>
    </button>
  );
}
