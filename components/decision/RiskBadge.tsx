import React from 'react';
import { normalizeRiskTokenLevel, riskTokens } from '../../src/tokens/riskTokens';

export const RiskBadge: React.FC<{ level?: string }> = ({ level }) => {
  const normalizedLevel = normalizeRiskTokenLevel(level);
  const token = riskTokens[normalizedLevel];

  return (
    <span
      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold"
      style={{ backgroundColor: token.bg, color: token.text, borderColor: token.border, boxShadow: token.shadow }}
    >
      {token.icon} {normalizedLevel}
    </span>
  );
};
