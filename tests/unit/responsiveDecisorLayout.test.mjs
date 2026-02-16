import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const wizard = readFileSync(new URL('../../components/DecisionWizard.tsx', import.meta.url), 'utf8');
const hook = readFileSync(new URL('../../hooks/useBreakpoint.ts', import.meta.url), 'utf8');

test('decision wizard uses automatic breakpoint hook', () => {
  assert.match(wizard, /useBreakpoint/);
  assert.match(wizard, /isMobile/);
  assert.match(wizard, /isDesktop/);
});

test('breakpoint hook maps mobile, tablet and desktop ranges', () => {
  assert.match(hook, /'mobile'\s*\|\s*'tablet'\s*\|\s*'desktop'/);
  assert.match(hook, /width >= 1024/);
  assert.match(hook, /width >= 768/);
});
