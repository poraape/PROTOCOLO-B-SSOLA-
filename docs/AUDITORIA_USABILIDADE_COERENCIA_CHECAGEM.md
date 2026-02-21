# Auditoria de Usabilidade, Coerência e Checagem de Informações — DECISOR

## 1) Sumário Executivo

**Estado geral:** o DECISOR está em nível **Funcional/Sólido**, com boa base para uso institucional sob pressão, mas ainda com inconsistências de coerência e risco operacional em pontos críticos de emergência e semântica de acionamento.

- **Nota geral consolidada:** **7,4 / 10**
- **Adequação ao MVP:** **74%**
- **Decisão executiva:** **Requer Ajustes**

### 5 achados críticos
1. O fluxo de emergência imediata usa `riskLevel: 'ALTO'` em vez de `EMERGENCIAL`, reduzindo consistência semântica da classificação de risco no próprio núcleo decisório.  
2. O CTA contextual de emergência confirma e liga sempre para SAMU (`192`), mesmo quando o texto orienta 190/192; isso pode induzir acionamento inadequado em ocorrência de segurança pública.  
3. O resultado final melhorou em estrutura, mas ainda depende de abertura manual de seções para leitura completa de escalonamento/registro em uso real sob estresse.
4. A entrada inicial não usa ainda catálogo explícito de sinais P/S/F/V na tela (como no protocolo textual), podendo elevar hesitação para usuários não pedagógicos.
5. A distinção “guia decisório x registro formal” está boa em banner e CTA, mas falta reforço persistente no fechamento de *toda* ação crítica (inclusive emergência contextual).

---

## 2) Scorecard Geral (0–10)

| Dimensão | Nota | Comentário estratégico |
|---|---:|---|
| 2.1 Usabilidade prática | 7,6 | Entrada e progressão são claras (“pergunta por vez”, passo atual), com fallback de incerteza e CTA de emergência global. Ainda falta catálogo de sinais/códigos na entrada e alguns desfechos exigem leitura adicional para ação completa. |
| 2.2 Coerência dos fluxos | 7,0 | A pré-triagem nova melhora roteamento (risco→violência→emocional), mas há incoerência relevante: folha de “emergência imediata” classificada como `ALTO` em vez de `EMERGENCIAL`. |
| 2.3 Consistência terminológica | 7,8 | Houve avanço com `TermTooltip` e textos de escopo/registro formal. Persistem variações de ação (“acionar”, “notificar”, “registrar”) em contextos onde obrigação legal poderia estar ainda mais padronizada. |
| 2.4 Checagem de informações | 7,1 | README condiz com escopo MVP e limitações reais. Porém há descompasso operacional no CTA contextual de emergência (texto 190/192 x ação efetiva 192). |
| 2.5 Clareza dos acionamentos | 7,2 | Ações finais agora estão estruturadas (imediata/escalar/registro), com SLA e sequência numerada. Porém o caminho de discagem contextual pode induzir canal errado em cenários de violência em curso. |
| 2.6 Redução de ambiguidade | 7,9 | Pré-triagem reduziu ambiguidade de bloco em casos híbridos e o fallback ficou mais orientado à gestão. Ainda há termos amplos (“conforme protocolo”) sem detalhamento contextual em todas as folhas. |
| 2.7 Carga cognitiva | 7,3 | Acordeões por prioridade diminuem sobrecarga inicial e preservam detalhes. Em compensação, múltiplos modais de confirmação podem aumentar fricção em crise real. |
| 2.8 Feedback e confirmação | 7,4 | Confirmações de ação crítica foram adicionadas (emergência e registro), e o fluxo tem passo/breadcrumb. Falta confirmação final consolidada de “consulta concluída + próximos passos executados”. |
| 2.9 Alinhamento com escopo institucional | 8,6 | Header, banner e CTA formal reforçam que não é sistema jurídico-formal e não substitui notificação oficial. Boa aderência ao escopo de guia decisório. |
| 2.10 Robustez para escola iniciante | 7,0 | UI é relativamente autoexplicativa e com suporte textual contextual; ainda há necessidade de simplificação adicional na entrada por sinais observáveis e menos dependência de interpretação de categoria. |

### Cálculo consolidado
- **Média simples:** 7,49  
- **Média ponderada recomendada (pesos maiores para 2.2, 2.4, 2.5, 2.9):** **7,4**.

---

## 3) Avaliação por Dimensão (detalhada)

### 2.1 Usabilidade prática
O fluxo principal mantém padrão de uso rápido: pergunta única, navegação com voltar/reiniciar e histórico por trilha. O texto de suporte do wizard orienta “duração média: 30 segundos”, o que combina com cenário de decisão sob pressão.  
A estrutura final em três blocos (ação imediata, escalonamento e registro formal) melhora legibilidade operacional para diferentes perfis da escola.  
Ponto de atenção: a tela de entrada ainda não oferece a matriz explícita de sinais/códigos (P/S/F/V), então o usuário depende de leitura de pergunta/categoria sem o “atalho mental” previsto no protocolo textual.

### 2.2 Coerência dos fluxos
A pré-triagem adicionada é um ganho claro: rechecagem de risco imediato, depois violência/abuso, depois sofrimento emocional. Isso reduz erro de roteamento inicial em casos híbridos.  
Entretanto, a folha `leaf_emergencia_imediata` está com `riskLevel: 'ALTO'` mesmo descrevendo “emergência imediata” e “prazo imediato”; essa diferença semântica conflita com o próprio esquema `ALTO` vs `EMERGENCIAL` e impacta badge/urgência na UI.

### 2.3 Consistência terminológica
O projeto já avançou ao incluir glossário inline para termos-chave, inclusive definição explícita de “registro formal” fora do app.  
Ainda há espaços para padronizar verbo por intenção: **acionar** (imediato), **encaminhar** (rede), **notificar** (obrigação), **registrar** (canal oficial). Hoje isso aparece, mas com variações contextuais que podem confundir equipe com menos letramento técnico.

### 2.4 Checagem de informações (integridade/veracidade)
A documentação principal é coerente com o que existe (wizard, ausência de banco, sem workflow formal de caso). Não há promessa evidente de recurso inexistente no README.  
Inconsistência relevante: no CTA contextual de risco iminente, o texto informa 190/192, mas o botão “Confirmar” disca diretamente para `192`, independentemente do contexto. Em eventos de arma/ameaça ativa, isso pode atrasar acionamento correto de segurança pública.

### 2.5 Clareza dos acionamentos
Há boa estrutura de “quem/como/quando” no resultado: serviço principal, complemento, SLA e checklist numerado.  
Por outro lado, expressões como “conforme protocolo” aparecem em itens críticos sem detalhar imediatamente o gatilho obrigatório (ex.: Conselho Tutelar (CT) “hoje” em todos os cenários de proteção), exigindo conhecimento prévio ou leitura adicional de referência normativa.

### 2.6 Redução de ambiguidade
A melhoria da pré-triagem reduziu ambiguidade estrutural do primeiro desvio de rota.  
Ainda existem áreas com ambiguidade residual: classes de risco e comportamento de emergência não estão totalmente uniformes; e em alguns resultados o usuário pode interpretar “escalar” como opcional, apesar de cenário crítico.

### 2.7 Carga cognitiva
Os acordeões por prioridade reduziram densidade visual de conteúdo e melhoraram foco inicial no “fazer agora”.  
Em contrapartida, modais de confirmação múltiplos podem adicionar etapas em situações de segundos críticos. A configuração ideal é confirmação curta + possibilidade clara de ação imediata com baixo atrito.

### 2.8 Feedback e confirmação
Há bons sinais de progresso e confirmação de ações críticas.  
Ainda falta um encerramento consolidado do tipo “Decisão concluída: próximos 3 passos confirmados”, com estado explícito para evitar encerramento prematuro da consulta sem execução mínima.

### 2.9 Alinhamento com escopo institucional
Muito bom alinhamento com escopo MVP de guia, reforçado no header e no banner fixo.  
A mensagem de confirmação também reforça que confirmar ação não substitui registro oficial. Isso reduz risco de falsa conformidade jurídica no uso cotidiano.

### 2.10 Robustez para escola iniciante
A arquitetura atual ajuda bastante iniciantes: fallback de incerteza, microcopy de proteção e fluxo guiado.  
Para robustez real em equipe heterogênea (porteiro, merendeira, inspetor), falta ainda entrada mais direta por sinais observáveis e textos ainda mais curtos nas ações críticas.

---

## 4) Simulações de Uso (mín. 5)

## CENÁRIO 1 — Risco de suicídio com plano definido (B4)
**Usuário/contexto:** professor em sala, aluno verbaliza plano autolesivo; 2 minutos para decidir.  
**Caminho no app:** `root (Não)` → `n_pretriagem_recheck_risco (Não)` → `n_pretriagem_violencia (Não)` → `n_pretriagem_emocional (Sim)` → `n_mental_triagem (Sim)` → `leaf_mental_agudo`.  
**Tempo mental estimado:** 1,5–2,5 min.

**Diagnóstico de usabilidade:** o pré-filtro reduz desvio para bloco pedagógico e leva rápido à saúde mental aguda. O resultado traz ação imediata, escalonamento e registro formal, com orientação para gestão.  
Ponto de dúvida: classificação do leaf mental agudo ainda vem como `MÉDIO`; para parte dos profissionais isso pode parecer subestimado em caso de plano suicida explícito.  
**Risco identificado:** **Alto** (subclassificação percebida e possível atraso de emergência).  
**Melhoria sugerida:** revisar critérios e níveis das folhas agudas de saúde mental para elevar consistência com linguagem de risco iminente.

## CENÁRIO 2 — Autolesão com marcas visíveis (B3)
**Usuário/contexto:** inspetor identifica cortes recentes no braço durante intervalo.  
**Caminho:** similar ao cenário 1, podendo cair em `leaf_mental_agudo` quando responde “Sim” para risco autolesivo.  
**Tempo mental:** 2–3 min.

**Diagnóstico:** fluxo é curto e orienta escalonamento institucional rápido. Safety alert ajuda a reduzir condutas imprudentes.  
Dúvida residual: quando não há risco imediato físico, a fronteira entre CAPS/UBS pode gerar hesitação sem regra “se X, então Y” totalmente explícita na tela final.  
**Risco identificado:** **Médio/Alto**.  
**Melhoria:** explicitar em 1 linha “CAPS quando crise/autoagressão; UBS quando demanda leve/moderada sem risco imediato”.

## CENÁRIO 3 — Briga física em curso (D2)
**Usuário/contexto:** agente de organização no pátio com conflito ativo.  
**Caminho:** `root (Sim)` → `leaf_emergencia_imediata` (atalho).  
**Tempo mental:** 30–60 segundos.

**Diagnóstico:** rota é objetiva e correta para urgência. Botão global de emergência aumenta descobribilidade.  
Problema crítico: na confirmação do CTA contextual, o “Confirmar” liga para 192 por padrão; em briga com ameaça/arma, o mais adequado pode ser 190.  
**Risco identificado:** **Crítico**.  
**Melhoria:** no modal contextual, oferecer botões 190/192/193 (como no global), sem fixar SAMU.

## CENÁRIO 4 — Violência doméstica/maus-tratos (D5)
**Usuário/contexto:** professora nota relato indireto + marcas antigas; sem risco iminente no momento.  
**Caminho:** `root (Não)` → `recheck (Não)` → `violencia (Sim)` → `n_direitos_triagem (Sim)` → `n_direitos_urgencia (Não)` → `leaf_direitos_conselho_rede`.  
**Tempo mental:** 2–4 min.

**Diagnóstico:** fluxo chega ao bloco de proteção correto e inclui Conselho Tutelar (CT)/CREAS e registro no dia. O modelo é institucionalmente seguro.  
Ponto de fricção: linguagem “conforme protocolo” pode ser abstrata para usuários não pedagógicos; falta CTA direto “notificar Conselho Tutelar (CT) hoje” como frase imperativa única.  
**Risco identificado:** **Alto** (atraso de notificação).  
**Melhoria:** destacar obrigação legal em chip/linha fixa no topo da folha de proteção.

## CENÁRIO 5 — Abuso sexual/exploração (D6/C6)
**Usuário/contexto:** secretaria recebe relato da família; gestão precisa validar encaminhamento.  
**Caminho provável:** entrada por violência (`n_pretriagem_violencia = Sim`) + triagem direitos até folhas de proteção.  
**Tempo mental:** 2–4 min.

**Diagnóstico:** o decisor conduz para proteção e escalonamento institucional. Há referências normativas em folhas do bloco de direitos e registro formal fora do app.  
Ponto de atenção: para uso sob estresse, seria importante frase fixa anti-revitimização no topo (“não investigar; acolher e acionar rede”).  
**Risco identificado:** **Alto**.  
**Melhoria:** reforço textual padrão de escuta protegida e proibição de perguntas investigativas em todos os cenários de violência sexual.

## CENÁRIO 6 — Desmaio/convulsão (C1/C2)
**Usuário/contexto:** merendeira presencia desmaio na fila.  
**Caminho:** `root (Sim)` → `leaf_emergencia_imediata` + CTA de emergência.  
**Tempo mental:** 30–90 segundos.

**Diagnóstico:** caminho é apropriado para urgência clínica; estrutura “ação imediata” com prazo imediato funciona bem.  
Risco operacional vem do mesmo ponto do cenário 3 (discagem contextual fixa em 192) e de eventual duplicidade de botões de emergência na tela, podendo confundir qual usar primeiro.  
**Risco identificado:** **Médio/Alto**.  
**Melhoria:** unificar comportamento de CTA contextual/global com mesma modal multicanal e mesma microcopy.

---

## 5) Inconsistências Detectadas (UI × lógica × docs)

| ID | Localização | Tipo | Descrição | Impacto | Correção sugerida |
|---|---|---|---|---|---|
| I-001 | `content/protocolData.ts` (`leaf_emergencia_imediata`) | Contradição | “Emergência imediata” classificada como `ALTO` e não `EMERGENCIAL`. | Pode reduzir percepção de criticidade e inconsistir badges/regras visuais. | Ajustar `riskLevel` para `EMERGENCIAL` e revisar folhas correlatas. |
| I-002 | `components/decision/EmergencyCTA.tsx` | Contradição | Texto orienta 190/192, mas confirmação disca só para 192. | Risco de canal inadequado em ameaça/violência em curso. | Modal contextual com botões 190/192/193 (paridade com botão global). |
| I-003 | `components/DecisionWizard.tsx` + CTA global/contextual | Ambiguidade | Há CTA contextual e CTA global simultâneos em certos estados. | Pode gerar hesitação (“qual botão usar?”). | Definir hierarquia: contextual substitui global em risco alto, ou global recolhe quando contextual ativo. |
| I-004 | `content/protocolData.ts` + UI de entrada | Omissão | Protocolo menciona sinais estruturados; UI não apresenta catálogo explícito de códigos/sinais na entrada. | Maior hesitação para usuários iniciantes. | Adicionar painel “sinais observáveis comuns” antes/ao lado da primeira decisão. |
| I-005 | `components/ActionCard.tsx` | Ambiguidade | Itens usam “conforme protocolo” sem sempre explicitar obrigação concreta na mesma dobra. | Pode atrasar notificação obrigatória. | Incluir linha fixa de obrigação em cenários de direitos (ex.: “Notificar CT hoje”). |

---

## 6) Mapa de Riscos Operacionais

| Localização (tela/código/doc) | Tipo de risco | Descrição | Classificação | Correção sugerida |
|---|---|---|---|---|
| `EmergencyCTA` modal | Acionar serviço incorreto | Confirmar chama 192 mesmo quando demanda imediata de segurança (190). | **Crítico** | Confirm modal com seleção explícita 190/192/193. |
| `leaf_emergencia_imediata` | Interpretação errada | Emergência com `ALTO` pode parecer menos urgente que “iminente”. | **Alto** | Reclassificar para `EMERGENCIAL`. |
| Resultado colapsável | Não acionar gestão | Usuário pode executar só o primeiro bloco e ignorar escalonamento/registro. | **Alto** | Badges obrigatórios + lembrete persistente de gestão/registro. |
| Entrada por categorias | Interpretação errada | Sem lista de sinais/códigos, iniciante pode escolher categoria inadequada. | **Médio** | Entrada auxiliar por sinais observáveis com exemplos. |
| Termos operacionais | Ambiguidade | “Conforme protocolo” e verbos próximos podem gerar dúvida de obrigatoriedade. | **Médio** | Matriz verbal fixa: Acionar/Encaminhar/Notificar/Registrar. |
| Duplo CTA emergência | Fricção/hesitação | Contextual + global podem competir visualmente. | **Baixo/Médio** | Política de exibição única por estado de risco. |

---

## 7) Lista de Correções Prioritárias

| ID | Prioridade | Localização | Problema | Impacto | Solução sugerida | Tipo |
|---|---|---|---|---|---|---|
| C-001 | P0 | `components/decision/EmergencyCTA.tsx` | Confirmação liga só para 192. | Erro de acionamento em violência/arma. | Substituir por modal com 190/192/193 e confirmação explícita por canal. | Lógica/UI |
| C-002 | P0 | `content/protocolData.ts` (`leaf_emergencia_imediata`) | Risco “ALTO” em emergência imediata. | Incoerência de criticidade. | Definir `riskLevel: 'EMERGENCIAL'` e validar impactos no badge/SLA. | Lógica/dados |
| C-003 | P0 | `components/ActionCard.tsx` (direitos) | Escalonamento obrigatório pode ficar “dobrado”. | Omissão de notificação/gestão. | Linha fixa não colapsável: “Obrigatório hoje: gestão + CT (quando aplicável)”. | Layout/texto |
| C-004 | P1 | `components/DecisionWizard.tsx` | CTA global e contextual podem competir. | Hesitação sob pressão. | Regra de exibição única com prioridade contextual. | Layout |
| C-005 | P1 | `components/ActionCard.tsx` | Verbos de ação não totalmente normalizados. | Ambiguidade operacional. | Prefixar passos com verbo padrão (Acionar/Notificar/Registrar). | Texto |
| C-006 | P1 | `components/decision/TermTooltip.tsx` | Cobertura limitada de termos na própria folha. | Dúvida de equipe não técnica. | Expandir uso para “encaminhar”, “risco iminente”, “notificação obrigatória”. | Texto/UI |
| C-007 | P2 | Entrada do DECISOR | Falta ponto de entrada por sinais/códigos observáveis. | Aumento de tempo em triagem. | Card “Sinais frequentes” com atalhos para blocos. | Layout |
| C-008 | P2 | `components/ActionCard.tsx` | Sem resumo final de conclusão do fluxo. | Encerramento ambíguo. | Card final “Decisão concluída: próximos 3 passos”. | UI |
| C-009 | P3 | Paleta de severidade | `ALTO` e `MÉDIO` ainda próximos visualmente em alguns contextos. | Leitura de risco menos imediata. | Ajustar tokens de contraste e iconografia redundante. | Visual |

---

## 8) Checklist Final de Usabilidade MVP (PASS/FAIL)

| Critério | Status | Observação |
|---|---|---|
| Identifica em <5s que é guia decisório e não registro jurídico-formal | PASS | Header + ScopeBanner deixam escopo explícito. |
| Tela inicial traz ponto de entrada por sinais observáveis (P/S/F/V) | FAIL | Não há catálogo explícito de sinais/códigos na entrada atual. |
| Fluxos IMINENTE levam a emergência sem ambiguidade | FAIL | Há rota de emergência, mas CTA contextual fixa discagem 192. |
| Notificações obrigatórias estão claramente marcadas | PASS | Folhas de direitos trazem CT/registro e prazos, ainda com oportunidade de destaque maior. |
| Gestão acionada explicitamente em fluxos críticos | PASS | Resultado traz bloco de escalonamento + checkpoint de confirmação. |
| UI não sugere que usar DECISOR substitui procedimentos formais | PASS | Banner, título e modal de confirmação reforçam não substituição. |
| Fluxo mais longo em patamar razoável para uso sob pressão | PASS | Com pré-triagem, fluxo típico crítico fica ~4–6 decisões (aceitável para MVP). |
| Palavras críticas definidas ou evitadas | PASS | Tooltips e microcopy ajudam; ainda pode expandir cobertura. |
| README não promete o que não existe | PASS | README explicita limitações (sem banco, sem workflow formal). |
| Resultado final sempre traz próximos passos objetivos | PASS | ActionCard fornece sequência numerada com SLA e escalonamento. |

- **PASS:** 8/10
- **Decisão final:** **MVP de usabilidade/coerência = Requer Ajustes**.

---

## 9) Conclusão

O DECISOR evoluiu de forma consistente para um padrão institucional útil: melhorou triagem inicial, reduziu carga cognitiva no resultado e reforçou escopo legal correto.  
Para atingir um patamar “Sólido/Referência” com menor risco operacional, o foco agora deve ser **eliminar incoerências de emergência** (classificação e discagem), **reduzir ambiguidade residual de obrigação** e **melhorar entrada por sinais observáveis** para equipe heterogênea.
