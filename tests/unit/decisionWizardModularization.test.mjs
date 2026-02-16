import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const wizard = readFileSync(new URL('../../components/DecisionWizard.tsx', import.meta.url), 'utf8');

test('decision wizard uses modular subcomponents', () => {
  assert.match(wizard, /FlowBreadcrumb/);
  assert.match(wizard, /QuestionStep/);
  assert.match(wizard, /DecisionSummary/);
  assert.match(wizard, /EmergencyCTA/);
});
