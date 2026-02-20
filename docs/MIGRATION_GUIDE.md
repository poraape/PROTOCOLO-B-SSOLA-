# Guia de Migração do Protocolo V1 → V2

## 📌 Visão Geral

Este guia detalha o processo de migração da estrutura original do Decisor (V1) para a arquitetura reorganizada (V2), **garantindo 100% de preservação de conteúdo**.

### O que muda?

| Aspecto | V1 (Estrutura Antiga) | V2 (Estrutura Nova) |
|---------|----------------------|---------------------|
| **Organização** | Árvore linear de decisão | Categorias temáticas com subárvores |
| **Navegação** | Perguntas sequenciais | Seleção de categoria + refinamento |
| **Cobertura** | Cenários principais | Cenários expandidos (drogas, gravidez, evasão, discriminação, PcD) |
| **Campos de nó folha** | Básicos (doNow, serviceIds) | Completos (prazo, justificativa, ações proibidas) |
| **Validação** | Manual | Automatizada com script |

### O que é preservado?

✅ **Todos os serviços** - Nenhum contato é perdido  
✅ **Todos os cenários críticos** - Emergências, violências, saúde mental  
✅ **Metadados e templates** - Anexos I e II permanecem intactos  
✅ **Regras de prioridade** - Níveis de risco mantidos  
✅ **Integrações** - CONVIVA, SED, rede de proteção  

---

## 🛠️ Ferramenta de Migração

### Instalação de dependências

```bash
npm install
```

### Execução do script de validação

```bash
npx tsx scripts/migrateProtocolData.ts
```

### Saída esperada

O script gera:

1. **Relatório visual no terminal** com estatísticas comparativas
2. **Arquivo JSON detalhado** (`migration-report.json`) com dados completos
3. **Código de saída** indicando sucesso ou falhas

#### Exemplo de saída (sucesso):

```
═══════════════════════════════════════════════════════════════
   RELATÓRIO DE MIGRAÇÃO DO PROTOCOLO V1 → V2
═══════════════════════════════════════════════════════════════

Data: 20/02/2026, 18:30:00

📊 ESTRUTURA V1 (Original)
─────────────────────────────────────────────────────────────
Total de nós:          42
Nós folha (cenários):  25
Nós de decisão:        17
Categorias únicas:     7
Serviços referenciados: 18

📊 ESTRUTURA V2 (Reorganizada)
─────────────────────────────────────────────────────────────
Total de nós:          58
Nós folha (cenários):  35
Nós de decisão:        23
Categorias únicas:     7
Serviços referenciados: 20

✓ VALIDAÇÃO DE INTEGRIDADE
─────────────────────────────────────────────────────────────
Nós folha migrados:    ✅ SIM
Serviços preservados:  ✅ SIM
Sem perda de dados:    ✅ SIM

💡 RECOMENDAÇÕES
─────────────────────────────────────────────────────────────
✅ Migração validada: todos os nós folha e serviços foram preservados.
✨ V2 possui 10 nós folha adicionais, expandindo cobertura de cenários.

═══════════════════════════════════════════════════════════════

📄 Relatório detalhado salvo em: ./migration-report.json

✅ Migração validada com sucesso!
```

---

## 🔍 O que o script verifica

### 1. Preservação de nós folha

✅ Verifica se **todos os cenários de atuação** da V1 existem na V2  
✅ Identifica nós removidos ou renomeados  
✅ Detecta nós novos adicionados  

### 2. Cobertura de serviços

✅ Confirma que **todos os serviços da rede** continuam referenciados  
✅ Lista serviços novos (ex: SCFV, MP Infância)  
✅ Alerta sobre serviços removidos  

### 3. Integridade de dados

✅ Valida presença de campos obrigatórios (`doNow`, `deadline`, `riskLevel`)  
✅ Verifica consistência de `contactTargets` e `serviceIds`  
✅ Detecta nós folha com dados incompletos  

### 4. Mudanças críticas

⚠️ Alerta quando nível de risco é alterado  
⚠️ Avisa sobre remoção de serviços de um nó  
⚠️ Sinaliza modificações em textos de orientação  

---

## 🚨 Checklist de Segurança

Antes de ativar a V2 em produção:

- [ ] **Executar o script de migração** e revisar o relatório
- [ ] **Validar que `noDataLoss = true`** no relatório
- [ ] **Revisar manualmente avisos críticos** se houver
- [ ] **Testar navegação na interface** com casos reais
- [ ] **Validar encaminhamentos** para cada categoria:
  - Emergências (SAMU, PM, Bombeiros)
  - Saúde mental (CAPS IJ, UBS, UPA)
  - Proteção (CT, CREAS, Delegacia)
  - Vulnerabilidade (CRAS, SCFV)
  - Pedagógico (DE Leste 1, CONVIVA)
- [ ] **Confirmar que Anexos I e II** estão disponíveis
- [ ] **Criar backup** de `protocolData.ts` antes da ativação

---

## 🔧 Como ativar a V2

### Passo 1: Validar a migração

```bash
npx tsx scripts/migrateProtocolData.ts
```

Aguarde confirmação de **✅ Migração validada com sucesso!**

### Passo 2: Revisar o código

O arquivo `content/protocolData.ts` já contém a linha:

```typescript
PROTOCOL_DATA.decisionTree = REBUILT_DECISION_TREE.map(standardizeLeafNode);
```

Isto significa que **a V2 já está ativa** no código. Se você quiser reverter:

```typescript
// Para usar V1 (estrutura antiga):
// Comentar esta linha:
// PROTOCOL_DATA.decisionTree = REBUILT_DECISION_TREE.map(standardizeLeafNode);

// Para usar V2 (estrutura nova):
PROTOCOL_DATA.decisionTree = REBUILT_DECISION_TREE.map(standardizeLeafNode);
```

### Passo 3: Atualizar a interface (se necessário)

Se a interface ainda usa a navegação antiga:

1. Verificar `components/DecisionTreeNavigator.tsx`
2. Garantir que renderiza corretamente nós com `options` múltiplas
3. Adicionar suporte visual para categorias (ícones, cores)

### Passo 4: Deploy

```bash
npm run build
npm run deploy
```

---

## 🐞 Troubleshooting

### Problema: "Nós folha V1 não encontrados em V2"

**Causa:** Cenários da V1 foram renomeados ou fundidos em V2.

**Solução:**
1. Revisar lista de `nodesRemoved` no relatório
2. Procurar IDs equivalentes em V2 (ex: `leaf_mental_agudo` pode ter sido expandido em `leaf_imm_crise_emocional_aguda`)
3. Se conteúdo foi perdido, adicionar manualmente à V2

### Problema: "Serviços referenciados em V1 mas não em V2"

**Causa:** Serviço foi substituído por outro mais específico.

**Solução:**
1. Verificar se o serviço foi movido para `secondaryServiceIds`
2. Confirmar se é um serviço obsoleto (ex: contato desativado)
3. Se necessário, adicionar de volta em `SERVICES`

### Problema: "Nós folha V2 com dados incompletos"

**Causa:** Função `standardizeLeafNode` não preencheu todos os campos.

**Solução:**
1. Editar manualmente os nós listados no relatório
2. Garantir que cada nó folha tenha:
   - `doNow` com pelo menos 1 ação
   - `deadline`
   - `riskLevel`
   - `primaryServiceId` ou `contactTargets`

### Problema: Script falha com erro de importação

**Causa:** `tsx` não instalado ou erro de sintaxe no TypeScript.

**Solução:**
```bash
npm install -D tsx
npx tsx scripts/migrateProtocolData.ts
```

Se persistir, verificar erros de TypeScript:
```bash
npx tsc --noEmit
```

---

## 📊 Exemplo de relatório JSON

O arquivo `migration-report.json` gerado contém:

```json
{
  "timestamp": "2026-02-20T21:30:00.000Z",
  "v1Stats": {
    "totalNodes": 42,
    "leafNodes": 25,
    "decisionNodes": 17,
    "categories": ["EMOCIONAL_COMPORTAMENTO", "VIOLACAO_DIREITOS_VIOLENCIA", ...],
    "services": ["samu", "policia-militar", "caps-ij", ...]
  },
  "v2Stats": {
    "totalNodes": 58,
    "leafNodes": 35,
    "decisionNodes": 23,
    "categories": [...],
    "services": [...]
  },
  "comparison": {
    "nodesAdded": ["leaf_drogas_caps_ad", "leaf_gravidez_violencia_sexual", ...],
    "nodesRemoved": [],
    "nodesModified": ["leaf_mental_agudo", ...],
    "servicesAdded": ["scfv-ermelino", "mp-infancia"],
    "servicesRemoved": []
  },
  "validation": {
    "allLeafNodesMigrated": true,
    "allServicesCovered": true,
    "noDataLoss": true,
    "warnings": [],
    "errors": []
  },
  "recommendations": [
    "✅ Migração validada: todos os nós folha e serviços foram preservados.",
    "✨ V2 possui 10 nós folha adicionais, expandindo cobertura de cenários."
  ]
}
```

---

## 📚 Recursos Adicionais

- **Documentação da V2:** `docs/DECISION_TREE_V2.md`
- **Mapeamento de categorias:** `docs/CATEGORY_MAPPING.md`
- **FAQ de migração:** `docs/FAQ_MIGRATION.md`
- **Suporte:** Entre em contato com a equipe de desenvolvimento

---

## ✅ Conclusão

A ferramenta de migração garante que:

1. ✅ **Nenhum conteúdo é perdido** na transição V1 → V2
2. ✅ **Todos os serviços da rede** permanecem acessíveis
3. ✅ **Cenários críticos** são preservados
4. ✅ **Validação automatizada** reduz risco de erro humano
5. ✅ **Relatório detalhado** documenta cada alteração

**A V2 expande a cobertura do protocolo sem comprometer a segurança ou completude da V1.**
