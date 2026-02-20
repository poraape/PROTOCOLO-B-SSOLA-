# Scripts de Manutenção do Protocolo

## 📝 Visão Geral

Esta pasta contém scripts utilitários para validação, migração e manutenção do protocolo de proteção escolar.

---

## 🛠️ Scripts Disponíveis

### 1. `migrateProtocolData.ts`

**Função:** Valida e documenta a migração da estrutura V1 (antiga) para V2 (reorganizada).

**Quando usar:**
- Ao atualizar a árvore de decisão
- Antes de fazer deploy de novas versões
- Para auditar integridade de dados
- Após adicionar novos cenários ou serviços

**Como executar:**

```bash
npx tsx scripts/migrateProtocolData.ts
```

**Saída:**

1. **Relatório visual no terminal** (✅ sucesso, ⚠️ avisos, ❌ erros)
2. **Arquivo JSON** (`migration-report.json`) com detalhes completos
3. **Código de saída:**
   - `0` = Sucesso total
   - `1` = Erros críticos detectados

**Exemplo de uso em CI/CD:**

```yaml
# .github/workflows/validate-protocol.yml
name: Validar Protocolo

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npx tsx scripts/migrateProtocolData.ts
      - name: Upload relatório
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: migration-report
          path: migration-report.json
```

---

## 📖 Entendendo o Relatório

### Seção: Estatísticas V1 vs V2

```
📊 ESTRUTURA V1 (Original)
Total de nós:          42
Nós folha (cenários):  25
```

- **Total de nós:** Número total de nós na árvore (decisões + cenários finais)
- **Nós folha:** Cenários de atuação (onde o protocolo termina com orientação específica)
- **Nós de decisão:** Perguntas intermediárias que direcionam o fluxo

### Seção: Comparação

```
🔄 COMPARAÇÃO V1 ↔ V2
Nós adicionados:       10
  + leaf_drogas_caps_ad
  + leaf_gravidez_violencia_sexual
  ...
Nós removidos:         0
```

- **Adicionados:** Novos cenários na V2 que não existiam na V1
- **Removidos:** Cenários da V1 que não estão na V2 (⚠️ revisar!)
- **Modificados:** Cenários com alterações em conteúdo

### Seção: Validação

```
✓ VALIDAÇÃO DE INTEGRIDADE
Nós folha migrados:    ✅ SIM
Serviços preservados:  ✅ SIM
Sem perda de dados:    ✅ SIM
```

- **Nós folha migrados:** Todos os cenários críticos foram preservados?
- **Serviços preservados:** Todos os contatos da rede continuam acessíveis?
- **Sem perda de dados:** Nenhum conteúdo essencial foi perdido?

---

## ⚠️ Interpretando Avisos e Erros

### 🔴 Erro: "Nós folha V1 não encontrados em V2"

**Significa:** Cenário da versão antiga não existe na nova.

**Ação:**
1. Verificar se foi renomeado (ex: `leaf_mental_agudo` → `leaf_emocional_alto`)
2. Se conteúdo foi fundido em outro nó, documentar no commit
3. Se foi removido por engano, adicionar de volta

**Exemplo:**

```typescript
// V1 tinha:
leaf_mental_agudo: {
  question: 'Saúde mental aguda',
  doNow: ['Acionar CAPS IJ']
}

// V2 pode ter renomeado para:
leaf_emocional_alto: {
  question: 'Sofrimento emocional grave',
  doNow: ['Acionar CAPS IJ', ...]
}
// ✅ Conteúdo preservado, apenas renomeado
```

### 🟡 Aviso: "Serviços referenciados em V1 mas não em V2"

**Significa:** Um serviço foi removido dos encaminhamentos.

**Ação:**
1. Verificar se o serviço foi substituído (ex: UBS genérica → UBS Ermelino específica)
2. Se foi erro, adicionar de volta em `secondaryServiceIds`
3. Se foi intencional (serviço desativado), documentar

### 🟡 Aviso: "Nós folha V2 com dados incompletos"

**Significa:** Cenário novo sem todos os campos obrigatórios.

**Ação:**

```typescript
// ❌ Incompleto:
{
  id: 'leaf_novo_cenario',
  question: 'Cenário novo',
  isLeaf: true
  // Faltam: doNow, deadline, riskLevel, contactTargets
}

// ✅ Completo:
{
  id: 'leaf_novo_cenario',
  question: 'Cenário novo',
  isLeaf: true,
  category: 'SAUDE_FISICA',
  riskLevel: 'ALTO',
  doNow: ['Encaminhar à UPA', 'Avisar família', 'Registrar Anexo I'],
  deadline: 'Hoje',
  primaryServiceId: 'upa-ermelino',
  contactTargets: ['UPA_HOSPITAL', 'GESTAO_ESCOLAR']
}
```

---

## 💡 Boas Práticas

### Antes de modificar `protocolData.ts`

1. **Criar branch separada:**
   ```bash
   git checkout -b update/protocol-v2.1
   ```

2. **Fazer backup:**
   ```bash
   cp content/protocolData.ts content/protocolData.backup.ts
   ```

3. **Editar com cuidado:**
   - Não remover nós folha sem justificativa
   - Sempre preencher campos obrigatórios
   - Manter consistência de IDs

4. **Validar após edição:**
   ```bash
   npx tsx scripts/migrateProtocolData.ts
   ```

5. **Revisar relatório:**
   - Confirmar `noDataLoss = true`
   - Revisar avisos críticos
   - Documentar alterações no commit

6. **Commit descritivo:**
   ```bash
   git add content/protocolData.ts migration-report.json
   git commit -m "feat: adiciona cenário de evasão escolar com busca ativa
   
   - Novo nó: leaf_evasao_busca_ativa_urgente
   - Integração com CT e CRAS
   - Prazo: 24h para contato inicial
   
   Validação: migration-report.json (sem perda de dados)"
   ```

### Ao adicionar novos serviços

```typescript
// 1. Adicionar em SERVICES
const SERVICES: Service[] = [
  // ...
  {
    id: 'novo-servico',
    name: 'Novo Serviço da Rede',
    category: 'SOCIAL',
    address: 'Rua Exemplo, 123',
    phone: '(11) 1234-5678',
    targetType: 'OUTROS',
    type: 'APOIO_SOCIAL',
    networkType: 'social',
    riskLevel: 'APOIO_INSTITUCIONAL'
  }
];

// 2. Referenciar em nó folha
leaf_cenario_exemplo: {
  // ...
  primaryServiceId: 'novo-servico',
  contactTargets: [{ serviceId: 'novo-servico', channel: 'telefone' }]
}

// 3. Validar
// npx tsx scripts/migrateProtocolData.ts
```

---

## 📊 Monitoramento Contínuo

### Executar validação periódica

```bash
# Semanalmente ou após cada atualização:
npx tsx scripts/migrateProtocolData.ts > validation-$(date +%Y%m%d).log
```

### Comparar relatórios

```bash
# Verificar diferenças entre versões:
diff migration-report-20260201.json migration-report-20260220.json
```

### Auditar histórico

```bash
# Ver mudanças no protocolo:
git log --oneline content/protocolData.ts

# Ver conteúdo de versão específica:
git show abc1234:content/protocolData.ts
```

---

## ❓ FAQ

**P: O script modifica o arquivo `protocolData.ts`?**  
R: Não. Ele apenas lê e valida. Nenhuma alteração é feita automaticamente.

**P: Posso executar em produção?**  
R: Sim, é seguro. O script é read-only e não afeta o sistema em execução.

**P: Quanto tempo leva para executar?**  
R: Tipicamente <5 segundos para árvores com ~50 nós.

**P: O que fazer se o script falhar?**  
R: Verificar:
1. `npm install` foi executado?
2. `protocolData.ts` tem erros de sintaxe? (`npx tsc --noEmit`)
3. Há circular dependencies nos imports?

**P: Como reverter para V1?**  
R: Comentar a linha final de `protocolData.ts`:
```typescript
// PROTOCOL_DATA.decisionTree = REBUILT_DECISION_TREE.map(standardizeLeafNode);
```

---

## 📞 Contato

Dúvidas ou sugestões sobre os scripts:
- Abrir issue no repositório
- Contatar a equipe de desenvolvimento
- Consultar `docs/MIGRATION_GUIDE.md` para mais detalhes
