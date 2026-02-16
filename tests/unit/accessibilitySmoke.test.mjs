import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const filesWithFocus = [
  '../../components/Layout.tsx',
  '../../components/ActionCard.tsx',
  '../../pages/NetworkPage.tsx',
  '../../pages/Dashboard.tsx',
  '../../components/decision/QuestionStep.tsx',
  '../../components/decision/DecisionSummary.tsx'
];

test('critical interactive files contain focus-visible ring styles', () => {
  filesWithFocus.forEach((file) => {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8');
    assert.match(source, /focus-visible:ring-2/);
  });
});

test('indicators accordion includes aria attributes for keyboard/screen readers', () => {
  const source = readFileSync(new URL('../../components/IndicatorsAccordion.tsx', import.meta.url), 'utf8');
  assert.match(source, /aria-expanded/);
  assert.match(source, /aria-controls/);
});

test('mobile-first breakpoints exist in core pages', () => {
  const dashboard = readFileSync(new URL('../../pages/Dashboard.tsx', import.meta.url), 'utf8');
  const layout = readFileSync(new URL('../../components/Layout.tsx', import.meta.url), 'utf8');

  assert.match(dashboard, /sm:grid-cols-2/);
  assert.match(layout, /md:flex/);
  assert.match(layout, /md:hidden/);
});
