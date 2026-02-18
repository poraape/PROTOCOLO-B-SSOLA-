import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../../App.tsx', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../../components/Layout.tsx', import.meta.url), 'utf8');

test('mvp route /sobre exists', () => {
  assert.match(app, /path="\/sobre"/);
});

test('primary navigation includes only core MVP labels', () => {
  assert.match(layout, /label:\s*'Início'/);
  assert.match(layout, /label:\s*'Decisor'/);
  assert.match(layout, /label:\s*'Rede'/);
  assert.match(layout, /label:\s*'Glossário'/);
  assert.match(layout, /label:\s*'FAQ'/);
  assert.match(layout, /label:\s*'Simulador'/);
  assert.doesNotMatch(layout, /label:\s*'Recursos'/);
  assert.match(layout, /label:\s*'Versão'/);
});
