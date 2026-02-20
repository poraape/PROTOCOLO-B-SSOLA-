# Auditoria Visual e Estratégica — DECISOR
## Estética Contemporânea Institucional (iOS 26 / Glassmorphism Seguro)

## 1) Sumário Executivo Estético

**Nota geral visual:** **8,1 / 10**  
**Percentual de atualização estética:** **81%** (estado atual em direção a “premium institucional”, com lacunas pontuais em consistência cross-screen e controle fino de densidade em folhas críticas).

### 5 achados críticos (decisão + estética)
1. **Boa diferenciação de severidade foi implantada**, mas ainda carece de tokenização centralizada (design token único) para evitar drift em novos componentes.  
2. **A base visual já está moderna e limpa**, porém há competição de blocos informacionais no resultado quando todos os painéis coexistem (taxonomia + obrigatório + acordeões + checklist).  
3. **SLA chips evoluíram muito em contraste/semântica**, mas ainda podem ganhar padronização de tamanho/peso entre contextos (header vs cards internos).  
4. **Potencial de glassmorphism é alto** em camadas auxiliares, porém deve permanecer conservador em telas de emergência para não prejudicar legibilidade.  
5. **Hierarquia tipográfica é sólida**, mas pode ficar ainda mais institucional com escala tipográfica declarada em tokens (H1/H2/body/label/microcopy) e regras formais de line-height.

---

## 2) Scorecard Visual Completo (15 dimensões)

| Dimensão | Nota | Diagnóstico estratégico | Risco se não evoluir |
|---|---:|---|---|
| 2.1 Consistência visual geral | 8,0 | Cards, badges, chips e botões têm padrão geral consistente; evolução recente reforçou identidade de severidade. | Inconsistência incremental em novos fluxos/telas. |
| 2.2 Hierarquia tipográfica | 8,1 | Títulos e seções principais destacam bem; há bom contraste entre heading e corpo. | Perda de foco em telas densas sem escala formal declarada. |
| 2.3 Espaçamento e respiro visual | 7,7 | Layout respira na maioria das telas; resultado final pode ficar “pesado” com múltiplos blocos empilhados. | Fadiga visual em uso sob estresse. |
| 2.4 Organização de layout | 8,3 | Ordem de leitura está coerente com decisão (Ação imediata → Escalonar → Registro). | Desvio de prioridade se novos blocos forem inseridos sem regra. |
| 2.5 Equilíbrio texto/interface | 7,8 | Uso de listas e passos numerados melhorou escaneabilidade. | Sobrecarga cognitiva se microcopy crescer sem governança. |
| 2.6 Uso de cores | 8,5 | Paleta de risco/SLA foi fortalecida e ficou semanticamente mais clara. | Saturação visual ou inconsistência sem guideline formal de uso. |
| 2.7 Profundidade visual (camadas) | 7,6 | Sombreamento e cartões funcionam bem no nível atual. | Interface pode parecer “flat administrativa” em partes auxiliares. |
| 2.8 Potencial de glassmorphism | 7,4 | Estrutura favorece adoção controlada em overlays/auxiliares. | Excesso de blur pode comprometer legibilidade em crise. |
| 2.9 Modernidade percebida | 8,4 | Visual está acima da média de sistemas institucionais escolares. | Estagnação de percepção premium sem refinamentos finais. |
| 2.10 Legibilidade | 8,2 | Fontes e contraste estão bons; chips e textos críticos são legíveis. | Queda de leitura em ambientes externos se contraste não for auditado continuamente. |
| 2.11 Clareza de foco visual | 8,3 | “Ação imediata” e severidade já saltam visualmente. | Concorrência entre alertas e metadados em folhas longas. |
| 2.12 Coerência entre telas/estados | 7,5 | Estados principais existem, mas faltam guidelines completos de loading/erro/sucesso no DS. | Variação de comportamento visual por componente. |
| 2.13 Responsividade visual | 8,0 | Mobile-first está funcional e robusto. | Pontos de sobreposição de elementos fixos em cenários específicos. |
| 2.14 Performance percebida | 8,0 | Interface rápida; efeitos atuais são leves. | Introdução de efeitos visuais pesados sem budget de performance. |
| 2.15 Adequação ao contexto institucional | 8,8 | Tom visual transmite seriedade, cuidado e proteção de direitos sem infantilização. | Perder confiança institucional com excesso de experimentalismo visual. |

**Síntese:** maturidade visual alta para MVP institucional, com foco em governança de tokens, redução de densidade crítica e refinamento de consistência entre estados.

---

## 3) Diagnóstico Geral da Interface Atual

O DECISOR já opera em um patamar visual superior ao “painel administrativo genérico”: há direção estética clara, semântica de risco legível e componentes de decisão bem definidos. A evolução recente (badges de severidade, chips de SLA e reforço de ação imediata) elevou substancialmente a clareza sob pressão.

A principal oportunidade agora não é “mais efeito”, e sim **controle sistêmico**: garantir que a linguagem visual consolidada se mantenha estável ao crescer. Isso inclui tokenização declarativa, regras de prioridade de informação e limites de densidade para telas críticas.

Em termos de estética contemporânea (iOS 26 / glassmorphism seguro), o produto está apto a incorporar refinamentos premium em camadas secundárias (modais, painéis auxiliares, superfícies de navegação), preservando opacidade e contraste máximos na decisão crítica.

---

## 4) Psicologia das Cores — Análise + Proposta

## 4.1 Paleta atual (levantamento)

### Base e neutros atuais
- `--bg: #F5F7FA` (fundo geral claro, sensação de limpeza e neutralidade).  
- `--surface: #FFFFFF` (cartões/superfícies primárias).  
- `--subtle: #F8FAFC` (superfícies secundárias).  
- `--border: #E2E8F0` (divisores e contornos leves).  
- `--text: #0F172A` / `--muted: #475569` (alto contraste textual institucional).

### Acentos institucionais atuais
- `--brand-primary: #1E3A8A` (autoridade, confiança, institucionalidade pública).  
- Links: `#1E40AF` (consistência com família azul educacional/informativa).

### Risco/severidade atual (componentes)
- MÉDIO: neutro/slate (baixo alarme, atenção moderada).  
- ALTO: laranja (aviso e urgência operacional).  
- EMERGENCIAL: vermelho (alerta máximo/imediato).  
- SLA: vermelho, laranja, âmbar, azul, cinza conforme prazo.

## 4.2 Diagnóstico de coerência emocional
A paleta atual está emocionalmente coerente com decisão institucional: azul para confiança, neutros para leitura sustentada, cores quentes para urgência. Não há “vermelho decorativo” para casos leves, o que evita dessensibilização.

## 4.3 Nova paleta recomendada (premium institucional)

| Grupo | Cor sugerida | Uso | Justificativa psicológica | Justificativa funcional |
|---|---|---|---|---|
| Base app | `#F4F7FB` | Fundo global | Calma e estabilidade | reduz fadiga em sessões longas |
| Surface primary | `#FFFFFF` | Cards principais | Clareza e confiança | máximo contraste para texto |
| Surface glass safe | `rgba(255,255,255,0.86)` | modais/painéis auxiliares | sofisticação controlada | mantém leitura em blur leve |
| Texto primário | `#0B1324` | Corpo/títulos | autoridade sem agressividade | contraste WCAG forte |
| Texto secundário | `#4A5A73` | microcopy | neutralidade informativa | hierarquia sem ruído |
| Institucional | `#1D4ED8` | CTA padrão | confiança e direção | orientação visual imediata |
| Sucesso/baixo risco | `#15803D` | estados seguros | segurança/estabilidade | feedback positivo inequívoco |
| Moderado | `#475569` | monitoramento | atenção sem alarme | evita over-alert |
| Alto | `#EA580C` | urgência alta | alerta operacional | diferencia de moderado |
| Emergencial | `#B91C1C` | risco iminente | perigo imediato | prioridade máxima de ação |
| Informação | `#0369A1` | dicas institucionais | clareza técnica | separa de risco |

## 4.4 Regras e gradientes
- **Regra de saturação:** no máximo 1 bloco quente dominante por viewport.  
- **Gradiente base discreto:** `linear-gradient(180deg, #F8FAFF 0%, #F4F7FB 100%)` apenas em fundo geral.  
- **Sem gradiente em cartões críticos de emergência** (usar sólidos para leitura instantânea).  
- **Notificação legal obrigatória:** usar cor de alerta + ícone + texto obrigatório (não apenas cor).

---

## 5) Aplicação Estratégica de Glassmorphism

## 5.1 Onde aplicar com segurança
- Modais de apoio (glossário, confirmação não emergencial).  
- Painéis secundários de histórico/ajuda contextual.  
- Top bars não críticas em desktop.

## 5.2 Onde evitar (manter sólido)
- Bloco “Ação imediata” em folhas críticas.  
- CTA de emergência e painéis de obrigação legal.  
- Chips de severidade e SLA em estados ALTO/EMERGENCIAL.

## 5.3 Tokens recomendados
- `radius.sm = 10px`  
- `radius.md = 16px`  
- `radius.lg = 22px`  
- `blur.sm = 8px`  
- `blur.md = 14px`  
- `opacity.surface.glass = 0.86`  
- `shadow.sm = 0 2px 8px rgba(15,23,42,.08)`  
- `shadow.md = 0 8px 24px rgba(15,23,42,.12)`

## 5.4 Microinterações
- **Sim:** hover/press curto (120–180ms) em botões não emergenciais; acordeões com transição curta.  
- **Não:** animações longas, bounce, parallax ou efeitos chamativos em emergências.

---

## 6) Recomendações de Layout por Tela

## Home/Entrada DECISOR
- Manter bloco de sinais observáveis acima da dobra (já positivo).  
- Introduzir divisores visuais mais suaves entre “entrada rápida” e “pergunta formal”.

## Triagem
- Garantir no máximo 1 pergunta principal + 1 suporte visual por viewport em mobile.  
- Se houver indicadores longos, usar colapso progressivo com “ver mais”.

## Resultado
- Preservar ordem atual (Ação imediata → Escalonar → Registro).  
- Reduzir concorrência de blocos secundários (taxonomia sempre compacta em chips/tags).

## Glossário/FAQ
- Maior liberdade de glass leve e blocos translúcidos (conteúdo não crítico em segundos).

---

## 7) Sistema Visual Recomendado (Mini Design System)

## 7.1 Paleta
- Base/neutros conforme seção 4.3.  
- Matriz de risco fixa (baixo/moderado/alto/emergencial).  
- Matriz de prazo SLA fixa (imediato/2h/hoje/24h/48h).

## 7.2 Tipografia
- **H1:** 28/34, 800  
- **H2:** 22/28, 700  
- **Body:** 16/24, 500  
- **Label:** 14/20, 600  
- **Microcopy:** 12/18, 500

## 7.3 Componentes-chave
- **RiskBadge** (ícone + texto + cor tokenizada).  
- **SlaChip** (prazo + ícone + contraste garantido).  
- **ActionCardSection** (solididade máxima em críticos).  
- **SafetyAlert** (mensagem anti-erro).  
- **MandatoryActionBar** (não colapsável em proteção).

---

## 8) Top 20 Melhorias Prioritárias

| ID | Pri | Problema | Proposta | Justificativa (estética+funcional) | Esforço |
|---|---|---|---|---|---|
| V-001 | P0 | Sem token central de risco | Criar `risk.tokens.ts` e mapear em todos badges/chips | Evita drift visual e semântico | Médio |
| V-002 | P0 | Densidade em resultado crítico | Compactar blocos secundários por prioridade | Menor carga cognitiva sob estresse | Médio |
| V-003 | P0 | Notificação legal pode perder destaque | Barra obrigatória fixa com ícone+prazo | Segurança institucional | Baixo |
| V-004 | P0 | Falta guideline de contraste formal | Checklist WCAG por componente crítico | Evita regressão de legibilidade | Médio |
| V-005 | P1 | Tipografia sem token explícito | Criar escala tipográfica global | Consistência cross-screen | Baixo |
| V-006 | P1 | Ícones podem variar por contexto | Biblioteca de ícones semânticos por risco | Reconhecimento mais rápido | Baixo |
| V-007 | P1 | Espaçamento vertical irregular | Tabela `spacing-2/3/4/6/8` padronizada | Ritmo visual estável | Baixo |
| V-008 | P1 | Microcopy longa em críticos | Regra ≤18 palavras/linha em ações | Escaneabilidade real | Baixo |
| V-009 | P1 | Header pode competir com ação | Reduzir elementos não críticos acima da dobra | foco no “fazer agora” | Baixo |
| V-010 | P1 | Estados de erro pouco visíveis | Padrão visual de erro/sucesso/loading | previsibilidade operacional | Médio |
| V-011 | P2 | Falta sofisticação em overlays | Aplicar glass nível 3 em modais auxiliares | modernidade controlada | Médio |
| V-012 | P2 | Navegação desktop “plana” | Superfície translúcida leve em top area | percepção premium | Médio |
| V-013 | P2 | Chips com altura variada | Normalizar altura e padding | leitura uniforme | Baixo |
| V-014 | P2 | Acordeões sem animação suave | Transição curta 150ms | fluidez sem atraso | Baixo |
| V-015 | P2 | Ícones sem fallback textual em alguns pontos | sempre ícone+texto | acessibilidade cognitiva | Baixo |
| V-016 | P3 | Sombras pouco hierárquicas | Escala de sombra sm/md/lg | profundidade refinada | Baixo |
| V-017 | P3 | Bordas sem padrão formal | tokens de borda por severidade | acabamento premium | Baixo |
| V-018 | P3 | Gradiente geral discreto ausente | fundo institucional em gradiente leve | modernidade sutil | Baixo |
| V-019 | P3 | Falta “motion guideline” | mini guia de motion seguro | consistência de comportamento | Baixo |
| V-020 | P3 | Sem kit visual para DE | pacote de identidade reaproveitável | escalabilidade institucional | Alto |

---

## 9) Checklist de Interface Moderna MVP (PASS/FAIL)

| Item | Status | Observação |
|---|---|---|
| Ação imediata acima da dobra em mobile | PASS | Estrutura atual prioriza ação no topo da folha. |
| Risco MÉDIO/ALTO/EMERGENCIAL claramente distinguível | PASS | Tokens recentes melhoraram separação visual. |
| SLA por prazo claramente hierarquizado | PASS | Chips com cores e ícones distintos. |
| Contraste mínimo para leitura crítica | PASS* | Bom na prática; manter auditoria WCAG contínua. |
| Emergência não sofre atraso por animação excessiva | PASS | Interações diretas e sem motion longa. |
| Superfícies críticas permanecem opacas | PASS | Decisão crítica prioriza solidez visual. |
| Estados loading/erro/sucesso totalmente padronizados | FAIL | Precisa guideline transversal no DS. |
| Tipografia tokenizada em escala oficial | FAIL | Escala existe de fato, mas não formalizada em tokens. |
| Regras de glassmorphism documentadas | FAIL | Potencial alto, guideline ainda não consolidado. |
| Interface mantém tom institucional público | PASS | Linguagem e visual sérios e não infantilizados. |

**Resultado:** 7/10 PASS (com margem clara para 9+ após formalização de design system).

---

## 10) Visão Futuro — Padrão Premium Institucional

Para atingir padrão 9,5–10/10 sem perder segurança decisória, a evolução recomendada é em 3 ondas:

1. **Onda 1 (P0/P1):** consolidar tokens centrais (risco, SLA, tipografia, espaçamento) e estados transversais (erro/loading/sucesso).  
2. **Onda 2 (P2):** aplicar glassmorphism seguro em camadas auxiliares, refinando percepção premium sem tocar a opacidade de áreas críticas.  
3. **Onda 3 (P3):** publicar mini design system institucional reutilizável pela escola e potencialmente pela Diretoria de Ensino (kit de componentes e guidelines).

Esse caminho mantém o DECISOR como **guia rápido de proteção**, melhora confiança visual e cria uma base replicável para outras unidades da rede pública com baixo custo de manutenção.
