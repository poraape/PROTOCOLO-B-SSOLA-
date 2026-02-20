# Guia de Migração — Sistema Antigo para Decision V2

## 1. Objetivo
Migrar gradualmente do modelo legado (`FlowNode`) para o modelo V2 (`DecisionNode`) sem interromper uso da escola.

## 2. Conversão de nó antigo para novo

### De `FlowNode` para `DecisionNode`
- Nó inicial de risco -> `CriticalTriageNode`.
- Perguntas de gravidade -> `RiskAssessmentNode` (1..5, `totalQuestions: 5`).
- Seleção por tema -> `CategoryNode`.
- Perguntas internas -> `SubflowNode`.
- Resultado final -> `LeafNode`.

### Compatibilidade temporária
- Para IDs antigos salvos, criar `LegacyNode` com:
  - `deprecated: true`
  - `redirectTo`
  - `reason`

## 3. Migrando conteúdo operacional

Para cada leaf antigo, reorganize em:
- `primaryActions` (o que fazer agora)
- `contactTargets` (quem acionar e como)
- `recordingRequirement` (registro formal)
- `followUp` (prazo e responsável)
- `secondaryContent` (conteúdo educativo opcional)

## 4. Adicionando novos serviços territoriais

1. Atualizar leaf correspondente em `data/decision-tree-migration.ts`.
2. Incluir serviço em `contactTargets.services` com:
   - `name`, `phone`
   - `address` e `hours` quando houver
   - `urgency` (`IMMEDIATE`, `URGENT`, `SCHEDULED`)
3. Priorizar o serviço principal mais urgente na primeira posição da lista.

## 5. Testes locais da migração

1. `npm run analyze-tree` para identificar:
   - nós cosméticos,
   - bifurcações redundantes,
   - nós órfãos,
   - caminho médio e pior caso.
2. `npm run test:unit` para smoke checks existentes.
3. `npm run dev` e validar fluxo V2 pela feature flag em `/decisor`.

## 6. Critérios mínimos para concluir migração

- Zero nós cosméticos novos.
- Zero bifurcações redundantes novas.
- Caminho médio até leaf <= 4 cliques (meta).
- Leafs com estrutura executável completa.
