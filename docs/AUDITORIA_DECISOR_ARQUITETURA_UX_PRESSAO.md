# Auditoria profunda do Decisor — Arquitetura de decisão, UX sob pressão e proteção estudantil

## 1) Diagnóstico aprofundado

### 1.1 Mapa da hierarquia de decisões atual (como está implementado)

```text
Nível 1 — Decisão crítica imediata
root_risk_check
├── Sim -> immediate_scenario_select
│   ├── Violência em curso -> leaf_imm_violencia
│   ├── Emergência de saúde física -> leaf_imm_saude_fisica
│   ├── Segurança do ambiente comprometida -> leaf_imm_seguranca_ambiente
│   ├── Crise emocional aguda -> leaf_imm_crise_emocional_aguda
│   └── Outro / não sei -> leaf_imm_outro
└── Não -> category_home

Nível 2 — Categorias principais
category_home
├── Saúde emocional -> cat_saude_emocional
├── Violência e direitos -> cat_violencia_direitos
├── Vulnerabilidade social -> cat_vulnerabilidade_social
├── Convivência e conflitos -> cat_convivencia_conflitos
├── Pedagógico -> cat_pedagogico
├── Saúde física -> cat_saude_fisica
├── Substâncias -> cat_substancias
├── Gravidez -> cat_gravidez
└── Não sei / apoio -> cat_nao_sei_apoio -> leaf_nao_sei

Nível 3 — Subfluxos por categoria (padrão recorrente)
cat_* (tela de entrada com botão "Continuar")
└── sub_* (1..3 perguntas de classificação)
    └── leaf_*

Nível 4 — Conteúdo orientativo e microdecisões na mesma tela
- AlertPanel (inline e orientações)
- IndicatorsAccordion
- SafetyGuidancePanel
- Botões globais extras (voltar categorias, reclassificar, falar com gestão)
- Botão de emergência global (quando não emergencial)
- Histórico/breadcrumb + resumo de passos
```

### 1.2 Três camadas decisórias concorrentes identificadas

1. **Camada A — risco imediato**: `root_risk_check` + `immediate_scenario_select` (triagem crítica).  
2. **Camada B — categorias**: `category_home` com 9 categorias já decisórias.  
3. **Camada C — microdecisões locais**: botões auxiliares e decisões embutidas em conteúdo (não tenho certeza, falar com gestão, abrir protocolo oficial, confirmar comunicação, etc.).

### 1.3 Problemas de arquitetura de decisão

#### P1. "Pré-passo vazio" por categoria (ramificação cosmética)
- **O que acontece hoje**: nós `cat_*` usam apenas um botão “Continuar” antes da triagem real (`sub_*`).
- **Por que é crítico**: acrescenta clique sem ganho informacional e aumenta tempo de chegada ao leaf em cenário de pressão.
- **Camada afetada**: Categoria + Subfluxo.
- **Evidências**: todos os nós `cat_*` com `options: [{ label: 'Continuar' ... }]`.

#### P2. Bifurcações sem consequência distinta
- **O que acontece hoje**: múltiplas opções convergem para o mesmo próximo nó (`Suspeita` e `Confirmada` -> `sub_viol_agressor`; `Leve` e `Moderado` -> `sub_emocional_fator_protecao`; respostas de risco em emocional convergem de novo).
- **Por que é crítico**: usuário sente que escolheu algo relevante, mas o sistema não usa essa diferença; isso reduz confiança e gera “falsa complexidade”.
- **Camada afetada**: Subfluxo.

#### P3. Fluxo paralelo fora da árvore principal
- **O que acontece hoje**: barra com “Voltar para categorias”, “Reclassificar” e “Falar com gestão” altera o histórico para nós específicos, independentemente do ponto atual.
- **Por que é crítico**: cria navegação lateral paralela ao fluxo formal, com potencial de quebra de rastreabilidade do raciocínio decisório.
- **Camada afetada**: Decisão crítica + Categoria + Subfluxo.

#### P4. Duplicidade de árvore e risco de desalinhamento
- **O que acontece hoje**: há uma árvore antiga (`root`, `n_pretriagem_*`) e outra reconstruída (`root_risk_check`, `category_home`) no mesmo arquivo; ao final, a reconstruída sobrescreve a anterior.
- **Por que é crítico**: manutenção vira terreno de conflito (qual árvore é “oficial” para quem lê o código), elevando risco de regressão lógica.
- **Camada afetada**: Arquitetura global.

### 1.4 Problemas de coesão intenção–implementação

#### P5. Promessa de "uma pergunta por vez" vs superfície carregada
- **O que acontece hoje**: apesar da pergunta principal, a tela agrega múltiplos blocos simultâneos (alerta inline, accordion de sinais, grid de ações, painel de segurança, histórico, botões globais).
- **Por que é crítico**: contradiz objetivo de triagem rápida sob carga cognitiva alta.
- **Camada afetada**: Conteúdo orientativo + Subfluxo.

#### P6. Triagem curta prometida, fluxo real estendido
- **O que acontece hoje**: categorias introduzem etapa intermediária de “Continuar”, além de perguntas de confirmação que repetem classificação.
- **Por que é crítico**: degrada SLA cognitivo em casos críticos (menos tempo para ação, mais tempo na interface).
- **Camada afetada**: Categoria + Subfluxo.

### 1.5 Problemas de usabilidade sob pressão

#### P7. Competição entre elementos decisórios e informativos
- **O que acontece hoje**: mesma tela combina decisão primária, conteúdo educativo, fallback de incerteza, e ações globais fora do contexto.
- **Por que é crítico**: em 3–5 segundos, o usuário pode não distinguir “o que decidir agora” versus “o que ler depois”.
- **Camada afetada**: Subfluxo + Conteúdo orientativo.

#### P8. Escaneabilidade prejudicada
- **O que acontece hoje**: cards, detalhes expansíveis, badges, chips de SLA, tooltips e alertas empilham estímulos visuais em sequência longa.
- **Por que é crítico**: leitura em Z/F perde foco; em crise, usuário tende a “caçar botão” em vez de seguir trilha clara.
- **Camada afetada**: Interface + Conteúdo orientativo.

#### P9. Carga cognitiva no leaf elevada
- **O que acontece hoje**: `ActionCard` concentra classificação, prioridade, alerta, taxonomia, checklist, serviços principal/secundários, justificativa, confirmação e modal.
- **Por que é crítico**: leaf deveria maximizar executabilidade imediata (quem acionar, como, em quanto tempo), não exigir parsing extensivo.
- **Camada afetada**: Leaf + Conteúdo orientativo.

### 1.6 Problemas de modelo mental

#### P10. Modelo mental esperado vs fluxo observado
- **Modelo mental esperado**: (1) risco imediato? (2) categoria? (3) 1–2 perguntas clínicas/contextuais mínimas (4) ação clara.
- **Fluxo observado**: entradas de categoria com “Continuar”, confirmações redundantes e controles globais que permitem saltos fora do trilho.
- **Impacto**: quebra da previsibilidade (“o que vem depois?”), especialmente em coordenação escolar sob estresse.
- **Camada afetada**: Todas.

### 1.7 Problemas de interface e hierarquia visual

#### P11. Densidade informacional acima do necessário para decisão crítica
- **O que acontece hoje**: alto volume de blocos e estilos concorrentes na tela de decisão e principalmente no leaf.
- **Por que é crítico**: reduz velocidade de interpretação e aumenta risco de erro operacional.
- **Camada afetada**: Conteúdo orientativo + UI.

#### P12. Sinalização crítica não é dominante o tempo todo
- **O que acontece hoje**: pergunta principal divide atenção com vários painéis de suporte logo no viewport.
- **Por que é crítico**: em emergência, a prioridade visual deve ser quase monolítica: decisão -> ação -> confirmação.
- **Camada afetada**: Decisão crítica + UI.

---

## 2) Proposta de reestruturação estratégica da arquitetura do decisor

### 2.1 Princípios estruturantes

1. **Uma decisão principal por tela**.  
2. **Conteúdo orientativo sempre secundário/recolhível** por padrão.  
3. **Sem passos “Continuar” sem valor diagnóstico**.  
4. **Triagem crítica com caminho máximo de 2 cliques até ação emergencial**.  
5. **Categoria -> subtriagem mínima (1–2 perguntas úteis) -> leaf executável**.  
6. **Rastreabilidade explícita**: cada decisão altera um resumo de caminho curto e legível.

### 2.2 Nova hierarquia proposta (4 níveis)

```text
N1 — Decisão crítica imediata (obrigatória e única na primeira tela)
Q1: Há risco imediato de vida/segurança agora?
├─ Sim -> Leaf emergencial direto por cenário (NÃO inserir conteúdo denso antes da ação)
└─ Não -> N2

N2 — Categoria principal (única decisão da tela)
Escolher 1 entre: emocional, violência, vulnerabilidade social, convivência,
pedagógico, saúde física, substâncias, gravidez, não sei.

N3 — Subfluxo mínimo por categoria
1 a 2 perguntas de alta discriminação clínica/operacional.
Eliminar perguntas que convergem para o mesmo nó sem efeito.

N4 — Leaf de ação
Formato fixo: "Ação imediata" -> "Quem acionar" -> "Prazo" -> "Registro obrigatório".
Conteúdo educativo extra em acordeão "Ver orientação detalhada".
```

### 2.3 Reorganização concreta dos caminhos

- **Eliminar nós de entrada `cat_*` com botão “Continuar”** e iniciar direto na primeira pergunta útil `sub_*`.  
- **Colapsar bifurcações cosméticas**:
  - violência: unir “suspeita/confirmada” quando não muda desfecho imediato;
  - emocional: remover confirmações que não alteram roteamento;
  - convivência/pedagógico: manter apenas o discriminador que muda serviço/prazo.
- **Conter atalhos globais**:
  - “Falar com gestão” vira ação contextual fixa no rodapé (secundária), sem “teletransporte” de histórico;
  - “Voltar para categorias” só aparece quando já passou da etapa de categoria;
  - “Reclassificar” apenas no resumo final do leaf.

### 2.4 Mapa de migração do conteúdo existente (sem descarte)

- `AlertPanel` (orientações gerais) -> **acordeão “Orientações de segurança”** abaixo da decisão principal.
- `IndicatorsAccordion` -> **bloco “Sinais observáveis (opcional)”** recolhido por padrão.
- `SafetyGuidancePanel` -> **ajuda contextual por categoria**, acessível via “Ver boas práticas”.
- bloco “Taxonomia de ações” + tooltips -> **tooltip único “Glossário rápido”** no cabeçalho do leaf.
- “Por que essa ação protege” -> **aba secundária “Racional técnico”**.
- “Serviços complementares” -> manter, mas em **segunda dobra** após ação principal.
- checklist final e confirmação -> **componente compacto de conclusão** (3 checkboxes), sem modal bloqueante.

### 2.5 Critérios de desenho (guardrails objetivos)

- Máximo de **3 elementos interativos primários** por tela (ex.: 2–3 opções + fallback).  
- Máximo de **1 bloco de apoio aberto por padrão**.  
- Emergência: **até 2 cliques** da primeira pergunta ao serviço acionável (telefone visível).  
- Categoria não emergencial: **até 4 cliques** até leaf.  
- Nenhum subfluxo com perguntas cujas respostas caiam no mesmo próximo nó sem registrar efeito.  
- Todo leaf deve exibir, acima da dobra: **Quem acionar / Como / Em quanto tempo**.

---

## 3) Recomendações objetivas de UX/UI

### 3.1 Redução de ruído visual

- Mover para camada secundária: exemplos longos, justificativas extensas, explicações normativas completas.
- Padronizar alertas:
  - vermelho: apenas risco imediato;
  - âmbar: alta prioridade sem risco imediato;
  - azul/cinza: conteúdo explicativo.
- Limitar ícones e badges simultâneos no topo do leaf (no máximo: risco + SLA).

### 3.2 Layout e hierarquia visual

**Padrão fixo por tela (sempre igual):**
1. Pergunta (H1 curto).  
2. Opções de decisão (botões grandes, alto contraste).  
3. Fallback “Não sei / acionar gestão”.  
4. Ajuda dobrável (sinais, exemplos, boas práticas).

No leaf:
1. **Ação imediata (card primário)**.  
2. **Serviço principal + CTA de contato**.  
3. **Prazo e registro obrigatório**.  
4. Conteúdo complementar em dobras.

### 3.3 Texto e microcopy

- Botões sempre em formato decisório e objetivo:
  - “Sim, há risco agora” / “Não, sem risco imediato”.
- Evitar rótulos vagos (“Continuar”) quando possível; preferir “Classificar gravidade”, “Definir tipo de risco”.
- Frases críticas em padrão condicional explícito:
  - **“Se SIM: acione 190 imediatamente.”**
  - **“Se NÃO: prossiga para categoria da demanda principal.”**
- Separar verbo de ação vs explicação:
  - ação começa por **Acionar / Encaminhar / Notificar / Registrar**;
  - contexto começa por **Porque / Observação / Atenção**.

### 3.4 Uso sob pressão (3–5 segundos)

Cada tela deve responder instantaneamente:
- **Onde estou?** (etapa 1/4, 2/4...).
- **O que decido agora?** (uma pergunta, opções claras).
- **O que acontece se eu clicar?** (microtexto curto sob cada opção, opcional).

Adicionar “pré-visualização de consequência” nas opções críticas:
- Ex.: “Sim, risco imediato -> abre ação de emergência com contatos 190/192”.

### 3.5 Testes de usabilidade recomendados (cenários críticos)

1. **Violência em curso com possível arma**: medir tempo até CTA correto (meta < 10s).  
2. **Tentativa de autoagressão**: medir acerto do serviço primário + registro obrigatório.  
3. **Crise coletiva em sala**: medir se usuário mantém trilha sem saltar para atalhos confusos.  
4. **Caso ambíguo (não sei)**: medir se o fallback leva a ação segura sem paralisia.  
5. **Convivência leve vs discriminação grave**: validar diferenciação de severidade sem sobrecarga textual.

Métricas mínimas:
- tempo até primeira decisão;
- número de cliques até leaf;
- taxa de escolha correta do encaminhamento;
- taxa de retorno/retrocesso no fluxo;
- percepção de confiança (escala Likert 1–5).

---

## Síntese executiva

O decisor já possui base de conteúdo robusta, mas sofre de **arquitetura concorrente** (decisão crítica + categoria + microdecisões locais), **ramificações cosméticas** e **excesso de superfície informacional**. A reestruturação proposta mantém 100% do conteúdo e reorganiza o sistema para um fluxo progressivo e previsível, com foco em **segurança, velocidade e rastreabilidade** em contexto escolar de alta pressão.
