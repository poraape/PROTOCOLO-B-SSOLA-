# Arquitetura Técnica — Decision V2

## 1. Arquitetura hierárquica (4 níveis + leaf)

A V2 organiza decisão em progressão explícita:

1. **CRITICAL_TRIAGE**: checa risco imediato de vida/integridade.
2. **RISK_ASSESSMENT**: 5 perguntas estruturadas com `riskWeight`.
3. **CATEGORY**: classificação da demanda principal.
4. **SUBFLOW**: perguntas específicas da categoria.
5. **LEAF**: resultado executável (ação, contato, registro, follow-up).

## 2. Diagrama textual da árvore

```text
CRITICAL_TRIAGE_ROOT
├── SIM -> EMERGENCY_LEAF
└── NÃO -> RISK_ASSESS_Q1 -> Q2 -> Q3 -> Q4 -> Q5 -> CATEGORY_SELECT
    ├── emocional -> EMOCIONAL_SUBFLOW_Q1 -> Q2 -> Q3 -> leafs emocionais
    ├── violencia -> VIOLENCIA_SUBFLOW_Q1 (placeholder de migração)
    ├── vulnerabilidade -> VULNERABILIDADE_SUBFLOW_Q1 (placeholder)
    ├── pedagogico -> PEDAGOGICO_SUBFLOW_Q1 (placeholder)
    ├── saude_fisica -> SAUDE_FISICA_SUBFLOW_Q1 (placeholder)
    ├── substancias -> SUBSTANCIAS_SUBFLOW_Q1 (placeholder)
    ├── gravidez -> GRAVIDEZ_SUBFLOW_Q1 (placeholder)
    ├── inclusao -> INCLUSAO_SUBFLOW_Q1 (placeholder)
    └── nao_sei -> SOFRIMENTO_EPISODICO_LEAF
```

## 3. Fluxo de dados

- **Props down**:
  - `DecisionTreeNavigator` injeta dados em `DecisionScreen`, `CategoryGrid` e `ResultScreen`.
- **Callbacks up**:
  - `onSelect`, `onBack`, `onPrint` retornam ação ao orquestrador.
- **Estado central**:
  - `useDecisionTreeV2` mantém `currentNodeId`, `history`, `answers`, `riskScore` e persistência local.

## 4. Estrutura de pastas V2

- `types/decision-tree-v2.ts`: contratos dos nós e árvore.
- `data/decision-tree-migration.ts`: árvore de migração V2 + nós legados redirecionáveis.
- `hooks/useDecisionTreeV2.ts`: estado, navegação e risco.
- `components/decision-v2/`: UI atômica, telas e orquestrador.
- `styles/design-tokens.ts`: tokens de design críticos.
- `scripts/analyze-tree-quality.ts`: verificação de qualidade da árvore.

## 5. Como adicionar novo subfluxo e leafs

1. Criar IDs novos em `data/decision-tree-migration.ts`.
2. Adicionar nó `SUBFLOW` com `categoryId`, `question`, `options`.
3. Adicionar `LEAF` com:
   - `primaryActions`
   - `contactTargets`
   - `recordingRequirement`
   - `followUp`
4. Ligar `CATEGORY_SELECT.categories[].nextNodeId` para o novo subfluxo.
5. Executar `npm run analyze-tree` e validar ausência de regressão cosmética/redundante.

## 6. Princípios de UX aplicados

- **Teste dos 3 segundos**: pergunta e ação principal visíveis imediatamente.
- **Hierarquia visual crítica**: pergunta -> botões -> ajuda secundária.
- **Baixa densidade no leaf**: CTA principal acima da dobra.
- **Rastreabilidade**: breadcrumb simplificado e histórico no hook.
- **Sem teletransporte**: atalhos contextuais com regras de exibição.
