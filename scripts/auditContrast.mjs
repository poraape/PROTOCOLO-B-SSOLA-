import { readFileSync, writeFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/tokens/riskTokens.ts', import.meta.url), 'utf8');
const hexes = [...src.matchAll(/(EMERGENCIAL|ALTO|MODERADO|BAIXO):\s*\{[\s\S]*?bg:\s*'(#(?:[0-9A-Fa-f]{6}))'[\s\S]*?text:\s*'(#(?:[0-9A-Fa-f]{6}))'/g)]
  .map((m) => ({ level: m[1], bg: m[2], text: m[3] }));

const hexToRgb = (hex) => {
  const n = hex.replace('#', '');
  return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
};

const lin = (c) => {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const contrast = (a, b) => {
  const [ar, ag, ab] = hexToRgb(a).map(lin);
  const [br, bg, bb] = hexToRgb(b).map(lin);
  const L1 = 0.2126 * ar + 0.7152 * ag + 0.0722 * ab;
  const L2 = 0.2126 * br + 0.7152 * bg + 0.0722 * bb;
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
};

const lines = [];
lines.push('# Relatório Automatizado de Contraste (WCAG)');
lines.push('');
lines.push('| Nível | BG | Texto | Contraste | AA 4.5:1 | AAA 7:1 (crítico) |');
lines.push('|---|---|---|---:|:---:|:---:|');

for (const item of hexes) {
  const ratio = contrast(item.bg, item.text);
  lines.push(`| ${item.level} | ${item.bg} | ${item.text} | ${ratio.toFixed(2)} | ${ratio >= 4.5 ? 'PASS' : 'FAIL'} | ${ratio >= 7 ? 'PASS' : 'FAIL'} |`);
}

lines.push('');
lines.push('Fonte: `src/tokens/riskTokens.ts`.');

writeFileSync(new URL('../docs/testing/wcag-contrast-report.md', import.meta.url), lines.join('\n'));
console.log('wcag report generated');
