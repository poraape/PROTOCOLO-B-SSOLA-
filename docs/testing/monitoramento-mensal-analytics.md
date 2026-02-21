# Monitoramento mensal — Analytics do Decisor V2

Este documento define as métricas-alvo para acompanhar os eventos do fluxo de triagem no Decisor V2.

## Eventos-chave monitorados

- `triagem_iniciada`
- `triagem_abandonada`
- `resultado_gerado`
- `emergencia_acionada`
- `contato_gestao_acionado`

## Propriedades obrigatórias por evento

Todos os eventos devem carregar:

- `nodeId`
- `riskClassification`
- `tempo_total` (em segundos)
- `device` (`mobile`, `tablet`, `desktop` ou `unknown`)

## Métricas-alvo (janela mensal)

### 1) Conversão de triagem

- **Definição:** `resultado_gerado / triagem_iniciada`
- **Meta:** >= 70%
- **Interpretação:** mede fechamento efetivo de fluxo.

### 2) Taxa de abandono

- **Definição:** `triagem_abandonada / triagem_iniciada`
- **Meta:** <= 25%
- **Interpretação:** identifica fricção no processo.

### 3) Acionamento emergencial

- **Definição:** `emergencia_acionada / triagem_iniciada`
- **Meta operacional:** acompanhar tendência por mês e por `riskClassification`.
- **Alerta sugerido:** variação > 20% vs média móvel de 3 meses.

### 4) Comunicação com gestão

- **Definição:** `contato_gestao_acionado / resultado_gerado`
- **Meta:** >= 60%
- **Interpretação:** aderência ao protocolo de notificação institucional.

### 5) Tempo total até resultado

- **Definição:** mediana de `tempo_total` no evento `resultado_gerado`.
- **Meta:** <= 180 segundos.
- **Quebra recomendada:** por `device` e por `riskClassification`.

## Rotina mensal sugerida

1. Exportar os eventos do mês corrente.
2. Consolidar indicadores por evento e por propriedade.
3. Comparar com metas e com os 3 meses anteriores.
4. Registrar ações corretivas quando houver desvio de meta.
