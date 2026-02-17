import React from 'react';
import { CategoryToken } from '../ui/categoryTokens';

type Props = {
  category: CategoryToken;
  onClick: () => void;
};

export function CategoryOptionCard({ category, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-xl border p-5 transition hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-500 ${category.tint}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{category.emoji}</span>

        <div>
          <div className="font-semibold text-base">{category.label}</div>

          <div className="text-sm mt-1 opacity-80">{category.short}</div>
        </div>
      </div>
    </button>
  );
}
