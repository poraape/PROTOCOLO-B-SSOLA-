import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../../content/protocolData.ts', import.meta.url), 'utf8');

const scenarios = [
  { id: 'CEN001', entry: 'DIFICULDADE_PEDAGOGICA', expectedNode: 'SOFRIMENTO_PSIQUICO', contacts: ['CRAS', 'UBS'] },
  { id: 'CEN002', entry: 'AUTOLESAO', expectedNode: 'AUTOLESAO', contacts: ['CAPS_IJ', 'UPA_HOSPITAL'] },
  { id: 'CEN003', entry: 'RISCO_SUICIDIO', expectedNode: 'RISCO_SUICIDIO', contacts: ['CAPS_IJ', 'EMERGENCIA_192_193'] },
  { id: 'CEN004', entry: 'VIOLENCIA_DOMESTICA', expectedNode: 'VIOLENCIA_DOMESTICA', contacts: ['CONSELHO_TUTELAR', 'UBS'] },
  { id: 'CEN005', entry: 'USO_SUBSTANCIAS', expectedNode: 'USO_SUBSTANCIAS', contacts: ['CAPS_ADULTO', 'UBS'] },
  { id: 'CEN006', entry: 'GRAVIDEZ_ADOLESCENCIA', expectedNode: 'GRAVIDEZ_ADOLESCENCIA', contacts: ['UBS', 'CRAS'] },
  { id: 'CEN007', entry: 'TIROTEIO_EXTERNO', expectedNode: 'TIROTEIO_EXTERNO', contacts: ['EMERGENCIA_192_193', 'GESTAO_ESCOLAR'] }
];

for (const scenario of scenarios) {
  test(`${scenario.id}: nó de entrada existe`, () => {
    assert.match(source, new RegExp(`id:\\s*'${scenario.entry}'`));
  });

  test(`${scenario.id}: desfecho correto referenciado no cenário`, () => {
    assert.match(source, new RegExp(`id:\\s*'${scenario.id}'[\\s\\S]*expectedNodeId:\\s*'${scenario.expectedNode}'`));
  });

  test(`${scenario.id}: contactTargets do nó de desfecho contêm serviços esperados`, () => {
    const nodePattern = new RegExp(`id:\\s*'${scenario.expectedNode}'[\\s\\S]*?contactTargets:\\s*\\[([\\s\\S]*?)\\]`, 'm');
    const match = source.match(nodePattern);
    assert.ok(match, `contactTargets ausente para ${scenario.expectedNode}`);
    const contactBlock = match[1];
    for (const contact of scenario.contacts) {
      assert.match(contactBlock, new RegExp(`'${contact}'`));
    }
  });
}

test('cenários ALTO/EMERGENCIAL possuem recordRequired no nó de desfecho', () => {
  for (const nodeId of ['AUTOLESAO', 'RISCO_SUICIDIO', 'VIOLENCIA_DOMESTICA', 'TIROTEIO_EXTERNO']) {
    assert.match(source, new RegExp(`id:\\s*'${nodeId}'[\\s\\S]*recordRequired:\\s*\\[`));
  }
});

test('cenários com violência incluem CONSELHO_TUTELAR em contactTargets', () => {
  for (const nodeId of ['VIOLENCIA_DOMESTICA', 'ABUSO_SEXUAL', 'DISCRIMINACAO']) {
    const nodePattern = new RegExp(`id:\\s*'${nodeId}'[\\s\\S]*?contactTargets:\\s*\\[([\\s\\S]*?)\\]`, 'm');
    const match = source.match(nodePattern);
    assert.ok(match, `contactTargets ausente para ${nodeId}`);
    assert.match(match[1], /'CONSELHO_TUTELAR'/);
  }
});
