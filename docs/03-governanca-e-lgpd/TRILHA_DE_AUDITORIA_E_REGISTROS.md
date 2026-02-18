# TRILHA DE AUDITORIA E REGISTROS

## 1) Objetivo
Definir padrão mínimo de rastreabilidade para registrar ciclo de atendimento institucional com segurança operacional e jurídica.

## 2) Estado atual no repositório
- Não existe backend de auditoria.
- Existe persistência local parcial em `FlowPage` (`localStorage`) para checklist de fase.

**Evidência no repo:** `pages/FlowPage.tsx`, `package.json` (stack frontend-only).

## 3) Eventos-chave obrigatórios (MVP)
1. `case_created`
2. `case_updated`
3. `risk_reclassified`
4. `forwarded_internal`
5. `forwarded_external`
6. `record_submitted`
7. `case_closed`
8. `case_reopened`

## 4) Estrutura mínima de log (proposta)
```json
{
  "eventId": "uuid",
  "caseId": "ESCOLA-ANO-SEQ",
  "eventType": "case_updated",
  "timestamp": "2026-02-10T15:42:00Z",
  "actorRole": "COORDENACAO",
  "actorId": "hash-ou-matricula",
  "before": {"status": "triagem"},
  "after": {"status": "encaminhado"},
  "justification": "risco alto identificado",
  "source": "webapp"
}
```

## 5) Padrões de numeração de casos
Formato recomendado: `CIE-AAAA-TIPO-XXXX`
- `CIE`: código da escola
- `AAAA`: ano corrente
- `TIPO`: categoria principal (SAUDE, DIREITOS, SOCIAL etc.)
- `XXXX`: sequencial

## 6) Integridade e imutabilidade (MVP e futuro)
### MVP
- Log append-only em backend simples (arquivo ou banco leve).
- Sem sobrescrita de eventos anteriores.

### Futuro (v1+)
- Assinatura/hash de bloco de eventos.
- Trilha de acesso (view audit) além de alteração de conteúdo.

## 7) Regras de qualidade do registro
- Registrar fatos observáveis, não juízo moral.
- Informar data/hora, responsável e ação tomada.
- Evitar dados excessivos (minimização).
- Sempre vincular encaminhamento ao evento de decisão.

## 8) Matriz de responsabilidade (resumo)
- Professor: registro inicial factual.
- Coordenação/POC: classificação e atualização técnica.
- Direção/Vice: validação de casos graves e encaminhamento externo.
- Secretaria: suporte documental e protocolo institucional.

## 9) Lacunas e implementação
❗ Lacuna atual: inexistência de mecanismo técnico de trilha no produto.

### Plano incremental
- P0: especificação de eventos e padrão de IDs.
- P1: endpoint de registro + painel simples de histórico.
- P2: relatórios e exportação segura para auditoria institucional.
