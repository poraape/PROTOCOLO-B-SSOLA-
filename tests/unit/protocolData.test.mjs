import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../../content/protocolData.ts', import.meta.url), 'utf8');

test('protocol metadata fields are present in source-of-truth', () => {
  assert.match(source, /protocolVersion:\s*'\d{4}\.\d{2}'/);
  assert.match(source, /effectiveDate:\s*'\d{4}-\d{2}-\d{2}'/);
  assert.match(source, /lastReviewedAt:\s*'\d{4}-\d{2}-\d{2}'/);
  assert.match(source, /reviewedBy:\s*'[^']+'/);
});

test('root node has explicit uncertainty fallback', () => {
  assert.match(source, /id:\s*'root_risk_check'/);
  assert.match(source, /fallbackNextNodeId:\s*'cat_nao_sei_apoio'/);
  assert.match(source, /Não sei \/ dúvida/);
});
