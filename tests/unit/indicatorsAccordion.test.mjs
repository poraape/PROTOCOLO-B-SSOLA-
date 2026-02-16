import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const accordionSource = readFileSync(new URL('../../components/IndicatorsAccordion.tsx', import.meta.url), 'utf8');
const protocolSource = readFileSync(new URL('../../content/protocolData.ts', import.meta.url), 'utf8');

test('indicators accordion defines closed default state', () => {
  assert.match(accordionSource, /defaultOpen\s*=\s*false/);
  assert.match(accordionSource, /useState\(defaultOpen\)/);
  assert.match(accordionSource, /aria-expanded=\{open\}/);
});

test('indicators accordion supports open state with list region rendering', () => {
  assert.match(accordionSource, /\{open \? \(/);
  assert.match(accordionSource, /role="region"/);
  assert.match(accordionSource, /Lista de sinais e indicadores/);
});

test('decision flow includes indicators in 3 relevant flows', () => {
  assert.match(protocolSource, /id:\s*'n_saude_mental'[\s\S]*?indicators:/);
  assert.match(protocolSource, /id:\s*'n_violacoes'[\s\S]*?indicators:/);
  assert.match(protocolSource, /id:\s*'n_social'[\s\S]*?indicators:/);
});

test('accordion includes keyboard-focus visibility classes and aria labels', () => {
  assert.match(accordionSource, /focus-visible:ring-2/);
  assert.match(accordionSource, /aria-controls/);
  assert.match(accordionSource, /aria-expanded/);
  assert.match(accordionSource, /aria-label/);
});
