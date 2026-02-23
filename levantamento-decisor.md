# Levantamento Completo do Decisor (pages/components/data)

## Escopo e critério

- Baseado no branch local `main-codex` (repositório local em `/mnt/x/NutriInsight/PROTOCOLO-B-SSOLA-`).
- Critério de busca inicial: arquivos em `pages/`, `components/`, `data/` com ocorrência de `decisor|decision|fluxo|flow|step|question|result|resultado`.
- Abaixo estão:
  - fluxo principal do decisor (v2, ativo),
  - fluxo legado (wizard/decision),
  - páginas satélite que entram/encaminham para o decisor,
  - hits indiretos (simulador) e
  - hits fora do escopo do decisor (apenas listados).

## Rotas mapeadas (App.tsx)

- `/decisor/*` → `pages/DecisorPage.tsx`
- `/fluxos` → `pages/FlowsListPage.tsx`
- `/fluxos/:id` → `pages/FlowPage.tsx`
- `/busca` → `pages/BuscaPage.tsx`
- `/` → `pages/Dashboard.tsx` (entrada para `/decisor`)

## Fluxo principal do decisor (v2)

📁 `pages/DecisorPage.tsx`
├── Rotas: `/decisor/*`
├── Estados principais: `nenhum (useEffect + useLocation)`
├── Condições renderização: sem `switch`; remount forçado por `key` com `location.key + pathname + search`
├── Navegação: indireta (renderiza `DecisionTreeNavigator`)
└── Conteúdo exposto: log de remount/reset; sem textos de UI relevantes além do navigator

📁 `components/decision-v2/DecisionTreeNavigator.tsx`
├── Rotas: `N/A (componente do /decisor/*)`
├── Estados principais: `showManagementModal`, `resultEntryNodeId` (+ estado vindo do hook `useDecisionTreeV2`: `currentNode`, `state`, `riskClassification`, `transitionError`)
├── Condições renderização: `switch(currentNode.level)` com `CRITICAL_TRIAGE | RISK_ASSESSMENT | SUBFLOW | CATEGORY | LEAF`; alerts condicionais para `transitionError` e divergência de resultado
├── Navegação: `navigate(nextNodeId, answer, riskWeight)` (hook), `goBack()`, `reset()`, atalho `navigate('DOMAIN_SELECT')`, emergência força `goToNode('EMERGENCY_LEAF')`
└── Conteúdo exposto: botão flutuante emergência (`192/190/193`), botão "Comunicar a gestão agora", mensagens de erro/invariância de fluxo, botão "Voltar para a pergunta anterior"

📁 `components/decision-v2/DecisionScreen.tsx`
├── Rotas: `N/A`
├── Estados principais: `showGuidance`
├── Condições renderização: renderiza `ProgressBar` se `progress`; `HelpTooltip` se `helpText`; variantes de botão por label (`SIM`/`NÃO`/outros)
├── Navegação: `onSelect(value)` (callback para navigator)
└── Conteúdo exposto: "Decisão principal", "Selecione a opção...", pergunta atual, "Abrir orientações", breadcrumb institucional

📁 `components/decision-v2/CategoryGrid.tsx`
├── Rotas: `N/A`
├── Estados principais: `showGuidance`, `hoveredDomainKey`
├── Condições renderização: painel lateral muda entre `hoveredCopy` e `SidePanelOrientacoes`; bottom sheet condicionado por `showGuidance`
├── Navegação: `onSelect(category.id)` (callback para navigator)
└── Conteúdo exposto: classificação por domínio; pergunta "Qual demanda predomina neste momento?"; cards de domínio com resumo/exemplos/whenToUse; botão "Abrir orientações"

📁 `components/decision-v2/ResultScreen.tsx`
├── Rotas: `N/A`
├── Estados principais: `showGuidance`, `copyStatus`, `checklistState { emergencyContacted, managementInformed, recordStarted, completed }`
├── Condições renderização: múltiplos `if`s para `transitionError`, `copyStatus`, `!hasRenderableResult`, blocos por presença de `orientacoesGerais`, `orientacoesEspecificas`, `instruments`, `secondaryContent`; habilita finalizar por `canFinalize`
├── Navegação: `onBack` (novo atendimento/reset), `onPrint`, `onContactManagement`, links `tel:`, links para anexos, `BottomSheetOrientacoes`
└── Conteúdo exposto: "Resumo do resultado", urgência/classificação, "O que fazer agora", prioridades 1/2, gestão (timing/papéis/obrigatório), anexos, "Quem acionar", checklist finalização, "Concluir consulta", resumo copiável ("Resumo do Decisor")

📁 `components/decision-v2/ContextualControls.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum`
├── Condições renderização: mostra "Voltar à seleção de domínio" se `canGoBackToCategories && currentLevel !== 'CATEGORY'`; mostra "Iniciar nova classificação" se `showReclassify && currentLevel === 'LEAF'`
├── Navegação: callbacks `onBackToCategories`, `onContactManagement`, `onReclassify`
└── Conteúdo exposto: ações fixas de rodapé (domínio/gestão/reclassificar)

📁 `components/decision-v2/ManagementContactModal.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum` (controlado por props `isOpen`)
├── Condições renderização: `if (!isOpen) return null`; fallback quando serviço de gestão não existe
├── Navegação: fecha via `onClose`; links `tel:` ("Ligar agora")
└── Conteúdo exposto: contatos de `Direção`, `Vice-direção`, `Coordenação`; título "Comunicar a gestão agora"; telefone/endereço/horário

📁 `components/decision-v2/InstitutionalBreadcrumb.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum` (`useMemo`)
├── Condições renderização: fallback `"Triagem inicial"` se sem histórico/nós; deduplica níveis
├── Navegação: `nenhuma`
└── Conteúdo exposto: trilha "Você está em: Triagem inicial → Categoria → Análise do caso → Encaminhamento" (conforme percurso)

📁 `components/decision-v2/DecisionBreadcrumb.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum`
├── Condições renderização: filtra marcos `CRITICAL_TRIAGE/CATEGORY/LEAF`; labels condicionais `1. Triagem crítica`, `2. Categoria`, `3. Ação`
├── Navegação: `nenhuma`
└── Conteúdo exposto: breadcrumb resumido de marcos do fluxo

📁 `components/decision-v2/ProgressBar.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum`
├── Condições renderização: sem `if`; clamp de `current/total`
├── Navegação: `nenhuma`
└── Conteúdo exposto: label de progresso (`Progresso` / `Etapa da triagem`) + barra visual

📁 `components/decision-v2/HelpTooltip.tsx`
├── Rotas: `N/A`
├── Estados principais: `open`
├── Condições renderização: tooltip aparece se `open`
├── Navegação: `nenhuma`
└── Conteúdo exposto: ícone `?` e texto de ajuda contextual por pergunta

📁 `components/decision-v2/AccordionSection.tsx`
├── Rotas: `N/A`
├── Estados principais: `open`
├── Condições renderização: conteúdo recolhido/expandido por `open`
├── Navegação: `nenhuma`
└── Conteúdo exposto: seções expansíveis usadas no resultado ("O que NÃO fazer", "Base legal", "Por que essa ação protege")

📁 `components/decision-v2/DecisionButton.tsx`
├── Rotas: `N/A`
├── Estados principais: `isHovered`, `isActive`
├── Condições renderização: estilos condicionais por `variant`/`disabled`
├── Navegação: callback `onClick`
└── Conteúdo exposto: botão reutilizável de decisão (default/emergency/secondary)

📁 `components/decision-v2/managementNotificationLabel.ts`
├── Rotas: `N/A`
├── Estados principais: `nenhum`
├── Condições renderização: `if (!timing)` fallback
├── Navegação: `nenhuma`
└── Conteúdo exposto: labels de timing da gestão (`Avisar gestão agora`, `hoje`, `Dar ciência`)

📁 `data/decision-tree-migration.ts`
├── Rotas: `N/A (dados do /decisor/*)`
├── Estados principais: `nenhum`
├── Condições renderização: `N/A (estrutura de dados)`
├── Navegação: `N/A (define nextNodeId no grafo)`
└── Conteúdo exposto: árvore `decisionTreeV2` (v3.0.0), triagem crítica, seleção de domínio e folhas de resultado

Conteúdo-chave extraído de `data/decision-tree-migration.ts`:
- Domínios (`DOMAIN_CATEGORIES`, 12): `Pedagógico`, `Saúde mental`, `Conflitos`, `Discriminação`, `Comportamento grave / ato infracional`, `Vulnerabilidade familiar`, `Violação de direitos`, `Uso de substâncias`, `Saúde física`, `Gravidez e saúde sexual`, `Inclusão / deficiência`, `Evasão`
- Risco imediato (`IMMEDIATE_RISK_CARDS`, 6): `Tentativa de suicídio / plano ativo`, `Lesão grave / sangramento`, `Violência em curso`, `Intoxicação / desmaio`, `Abandono imediato`, `Violência sexual recente`
- Estrutura (contagem rápida): `1` nó `CRITICAL_TRIAGE`, `2` nós `CATEGORY`, `12` nós `SUBFLOW`, `25` folhas (`makeLeaf(...)`)
- Pergunta raiz: "Há risco imediato de vida ou integridade física neste momento?"

## Fluxo legado do decisor (wizard + componentes `components/decision/*`)

📁 `components/DecisionWizard.tsx`
├── Rotas: `N/A (componente legado de decisor)`
├── Estados principais: `history`, `showMobileHistory`, `isTransitioning`
├── Condições renderização: `if (!currentNode)` erro; alterna `QuestionStep` vs `ActionCard` por `currentNode.isLeaf`; exibe histórico por breakpoint (`isMobile/isDesktop`)
├── Navegação: interna por histórico (`goToNext`, `goBack`, `resetWizard`, `goToCategoryHome`, `goToSupport`)
└── Conteúdo exposto: botões "Voltar à seleção de categorias", "Iniciar nova classificação", "Comunicar a gestão agora", histórico e overlay "Atualizando recomendação..."

📁 `components/ActionCard.tsx`
├── Rotas: `N/A`
├── Estados principais: `managementConfirmed`, `confirmFormal`
├── Condições renderização: vários blocos condicionais por risco/categoria (`violence`, `isCritical`, `showMandatoryToday`), modal de confirmação de abertura do protocolo
├── Navegação: `navigate('/protocolo')`; links `Link` para `/rede?highlight=...&view=map|list`; links `tel:`
└── Conteúdo exposto: classificação/risco, "Ação imediata (próximos 5 minutos)", "Escalonar para", "Registro formal obrigatório", serviços principal/complementares, confirmação de gestão, base normativa

📁 `components/decision/QuestionStep.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum`
├── Condições renderização: `root_risk_check` mostra entradas rápidas; `category_home` usa `CategoryOptionCard`; botão de incerteza se não houver opção "não sei"
├── Navegação: callback `onSelect(nextNodeId, label)`
└── Conteúdo exposto: pergunta atual, indicadores observáveis, alertas inline, entradas rápidas `P/S/F/V`, botão "Não tenho certeza — acionar apoio da gestão", painel de segurança

📁 `components/decision/AlertPanel.tsx`
├── Rotas: `N/A`
├── Estados principais: `open`
├── Condições renderização: filtra alertas por `context` (`orientacoes` vs `inline`) e tags (`ruleId/categoryKey`); mostra painel expansível em inline
├── Navegação: `nenhuma`
└── Conteúdo exposto: "Orientações de segurança", lista `ALERTS_DATA` ("Não fazer / Fazer em vez / Por quê"), "Boas práticas de escuta"

📁 `components/decision/DecisionHistoryPanel.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum`
├── Condições renderização: lista histórico se `items.length`; fallback "Nenhuma decisão anterior..."
├── Navegação: `nenhuma`
└── Conteúdo exposto: histórico de perguntas e respostas; pergunta atual

📁 `components/decision/DecisionSummary.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum`
├── Condições renderização: botão voltar só se `canGoBack`
├── Navegação: callbacks `onGoBack`, `onReset`
└── Conteúdo exposto: "Passo X", "Pergunta X de Y", "Voltar para pergunta anterior", "Iniciar nova triagem"

📁 `components/decision/EmergencyCTA.tsx`
├── Rotas: `N/A`
├── Estados principais: `open`
├── Condições renderização: `if !shouldShowEmergency(node) return null`
├── Navegação: abre `EmergencyChannelModal`
└── Conteúdo exposto: CTA de risco iminente para ligar `190/192`

📁 `components/decision/EmergencyChannelModal.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum` (controlado por props `open`)
├── Condições renderização: `if (!open) return null`
├── Navegação: links `tel:` (192/SAMU, 190/PM, 193/Bombeiros); fechar modal
└── Conteúdo exposto: "Risco iminente: escolha o serviço", instrução de comunicar Direção depois

📁 `components/decision/FlowBreadcrumb.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum`
├── Condições renderização: `if (!items.length) return null`; resposta exibida se existir
├── Navegação: `nenhuma`
└── Conteúdo exposto: histórico resumido de perguntas/respostas

📁 `components/decision/GlobalEmergencyButton.tsx`
├── Rotas: `N/A`
├── Estados principais: `open`
├── Condições renderização: sempre renderiza botão; modal condicionado por `open`
├── Navegação: abre `EmergencyChannelModal`
└── Conteúdo exposto: botão flutuante "Emergência (190/192)"

📁 `components/decision/MandatoryBar.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum`
├── Condições renderização: `nenhuma`
├── Navegação: `nenhuma`
└── Conteúdo exposto: faixa "Obrigatório hoje" + `SlaChip`

📁 `components/decision/SafetyGuidancePanel.tsx`
├── Rotas: `N/A`
├── Estados principais: `open`
├── Condições renderização: `mode === 'compact'` vs `full`; dialog completo se `open`; `details` para "Ver mais exemplos"
├── Navegação: `nenhuma`
└── Conteúdo exposto: "Lembretes rápidos de segurança", "Ver orientações completas", grupos (não fazer / fazer primeiro / como falar / boas práticas)

📁 `components/decision/SafetyAlert.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum`
├── Condições renderização: `if` sem props -> `null`; campos opcionais por prop
├── Navegação: `nenhuma`
└── Conteúdo exposto: bloco "NÃO faça sozinho / FAÇA / Escale para"

📁 `components/decision/StateOverlay.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum`
├── Condições renderização: `inline` vs overlay; estilo por `type` (`loading/error/success`)
├── Navegação: `nenhuma`
└── Conteúdo exposto: mensagens de estado (`⏳`, `⚠️`, `✓`)

📁 `components/decision/TermTooltip.tsx`
├── Rotas: `N/A`
├── Estados principais: `open`
├── Condições renderização: tooltip aparece se `open`
├── Navegação: `nenhuma`
└── Conteúdo exposto: glossário de termos (`notificar`, `encaminhar`, `acionar`, `registro_formal`, `comunicar`, `risco_iminente`)

📁 `components/decision/RiskBadge.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum`
├── Condições renderização: estilo ícone/cor por nível de risco normalizado
├── Navegação: `nenhuma`
└── Conteúdo exposto: badge visual de risco

📁 `components/decision/SlaChip.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum`
├── Condições renderização: SLA derivado por regex (`IMEDIATO`, `ATÉ 2H`, `HOJE`, `ATÉ 24H`, `ATÉ 48H`)
├── Navegação: `nenhuma`
└── Conteúdo exposto: chips de prazo/SLA

📁 `components/decision/ScopeBanner.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum`
├── Condições renderização: `nenhuma`
├── Navegação: `nenhuma`
└── Conteúdo exposto: aviso "Guia de decisão rápida — não substitui notificação..."

📁 `data/alerts.ts`
├── Rotas: `N/A (dados usados no decisor leg.)`
├── Estados principais: `nenhum`
├── Condições renderização: `N/A (dataset)`
├── Navegação: `N/A`
└── Conteúdo exposto: `ALERTS_DATA` (A01..A19) com "Não fazer / Fazer em vez / Por quê", severidade e tags; `NODE_TAG_MAP` para categorias (`mental_health`, `violence`, `physical_health`, `pedagogical`, `registration`, `emergency`)

## Páginas de fluxo/protocolo (fluxos) relacionadas

📁 `pages/FlowsListPage.tsx`
├── Rotas: `/fluxos`
├── Estados principais: `search`, `categoria`
├── Condições renderização: `filteredFluxos` por busca/categoria; fallback "Nenhum protocolo corresponde à busca"
├── Navegação: `navigate('/fluxos/${f.id}')`
└── Conteúdo exposto: "Biblioteca de Protocolos", busca por sintoma, categorias (`Todos`, `Saúde Mental`, `Violência`, `Pedagógico`), cards com `Protocolo {codigo}`

📁 `pages/FlowPage.tsx`
├── Rotas: `/fluxos/:id`
├── Estados principais: `activePhase`, `completedChecklist`, `expandedItemIndex`
├── Condições renderização: `if (!fluxo)`; fases/itens/checklists/expansões condicionais; botão próxima fase muda em `activePhase === 7`
├── Navegação: `navigate(-1)`, `navigate('/protocolo')`, `window.open(link.url)`
└── Conteúdo exposto: fluxo por fases (1..7), checklist de ações, vedações, rede de apoio direta, contatos telefônicos, dica de segurança e progresso

## Páginas/componentes satélite (entrada/atalhos para o decisor)

📁 `pages/Dashboard.tsx`
├── Rotas: `/`
├── Estados principais: `role`, `expandedGroup`
├── Condições renderização: expande grupos de domínio (`critical/care/social/learning/health`); card contextual varia por `role`
├── Navegação: `navigate('/decisor')`, `navigate('/rede')`, `navigate(tool.path)`, `navigate(\`/decisor?domain=${item.id}\`)`
└── Conteúdo exposto: CTA "INICIAR ATENDIMENTO GUIADO 🧭"; domínios organizados por gravidade/cuidado/convivência/aprendizado/saúde; exemplos como `Risco de Morte`, `Violência Sexual`, `Saúde Mental`, `Direitos Violados`

📁 `pages/BuscaPage.tsx`
├── Rotas: `/busca`
├── Estados principais: `query`
├── Condições renderização: resultados se `query.trim()`; lista vs estado vazio; pluralização de "resultado(s)"
├── Navegação: `navigate(item.path)` (inclui `/decisor?domain=...`)
└── Conteúdo exposto: busca por palavras-chave; mock `SEARCH_INDEX` com itens de domínio (`Risco de Morte`, `Violência Sexual`), rede (`UBS Ermelino Matarazzo`) e recursos

📁 `components/Layout.tsx`
├── Rotas: `N/A (shell global; contém links do app)`
├── Estados principais: `theme`, `a11yOpen`, `fontSize`, `highContrast`
├── Condições renderização: painel de acessibilidade por `a11yOpen`; estado ativo de navegação por `location.pathname`
├── Navegação: `navigate('/')`, `navigate('/decisor')`, `navigate('/rede')`, `navigate('/recursos')`, `navigate('/busca')`
└── Conteúdo exposto: nav principal e mobile com item `Decisor`; branding "Bússola"; controles de acessibilidade/tema

📁 `components/GlobalSearch.tsx`
├── Rotas: `N/A (componente de busca global)`
├── Estados principais: `query`
├── Condições renderização: resultados só com `query.trim().length > 2`; dropdown se `results.length > 0`
├── Navegação: `navigate(result.route)` em clique/Enter/Espaço
└── Conteúdo exposto: input "Buscar no sistema..." e resultados vindos de `searchIndex` (podem incluir rotas do decisor/fluxos/resultados)

## Hits indiretos por palavra-chave (simulador de decisão)

📁 `data/scenarios.ts`
├── Rotas: `N/A (dataset do simulador)`
├── Estados principais: `nenhum`
├── Condições renderização: `N/A`
├── Navegação: `N/A`
└── Conteúdo exposto: cenários de treinamento com `treeTraversal` (steps, opções, outcome). Cenários visíveis (C01..C08): sonolência/trabalho infantil, autolesão, hipoglicemia, suspeita de violência doméstica, cyberbullying racista, tiros no entorno, TEA + discriminação, uso frequente de maconha

📁 `components/scenario/ScenarioPlayer.tsx`
├── Rotas: `N/A`
├── Estados principais: `selectedScenarioId`, `stepIndex`, `mode`, `selectedOptionId`, `showFeedback`, `score`, `showHistory`, `filters`
├── Condições renderização: fluxo por `currentStep`; modo guiado/desafio; histórico expandido/recolhido
├── Navegação: navegação interna de steps/opções (sem `react-router`)
└── Conteúdo exposto: simulação de decisão com etapas, feedback, score e histórico

📁 `components/scenario/SimulatorDecision.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum` (via contexto)
├── Condições renderização: `if (!scenario || !currentStep) return null`; rationale opcional
├── Navegação: `goToStepById(nextStepId)` (interna)
└── Conteúdo exposto: etapa atual, ator responsável, ação, opções, alerta disparado

📁 `components/scenario/SimulatorFeedback.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum` (via contexto)
├── Condições renderização: só aparece em `trainingMode` com opção selecionada
├── Navegação: `nenhuma`
└── Conteúdo exposto: "Resposta correta/incorreta", referências legais, alerta de decisão de risco

📁 `components/scenario/SimulatorHistory.tsx`
├── Rotas: `N/A`
├── Estados principais: `nenhum` (via contexto)
├── Condições renderização: `if (!scenario) return null`; listas condicionais para `realPath`
├── Navegação: `nenhuma`
└── Conteúdo exposto: trilha recomendada vs real, divergências e risco institucional

📁 `components/scenario/SimulatorProvider.tsx`
├── Rotas: `N/A`
├── Estados principais: `selectedScenarioId`, `currentStepId`, `visitedStepIds`, `trainingMode`, `selectedOptionId`, `score`, `showRationale`, `guidedOrder`, `completedScenarioIds`, `realPath`, `filters`
├── Condições renderização: múltiplos guards (`if !scenario`, `if !currentStep`, `if selectedOptionId`, etc.); restauração/persistência de estado
├── Navegação: interna (mudança de cenário/step) por contexto
└── Conteúdo exposto: motor de simulação e metadados de decisão/feedback (não é o decisor operacional)

## Arquivos encontrados pela busca de palavra-chave, mas fora do escopo do decisor (sem detalhamento)

- `components/ProtocoloViewer.tsx` (conteúdo de protocolo; hit por palavras genéricas)
- `components/decision-v2/ContextualControls.tsx` já detalhado acima
- `components/decision-v2/DecisionBreadcrumb.tsx` já detalhado acima
- `components/decision-v2/DecisionButton.tsx` já detalhado acima
- `components/decision-v2/ProgressBar.tsx` já detalhado acima
- `components/decision/DecisionHistoryPanel.tsx` já detalhado acima
- `components/decision/DecisionSummary.tsx` já detalhado acima
- `components/decision/EmergencyCTA.tsx` já detalhado acima
- `components/decision/FlowBreadcrumb.tsx` já detalhado acima
- `components/decision/QuestionStep.tsx` já detalhado acima
- `components/decision/SafetyGuidancePanel.tsx` já detalhado acima
- `pages/FAQPage.tsx` (hit por "perguntas", não participa do decisor)
- `pages/GlossaryPage.tsx` / `pages/TechnicalGlossaryPage.tsx` / `pages/StudentTermsPage.tsx` (hits por "Fluxo Operacional"/perguntas/termos)
- `pages/ResourcesPage.tsx` / `pages/ModelosPage.tsx` (recursos/documentos)

## Observações rápidas

- Decisor ativo hoje: `pages/DecisorPage.tsx` + `components/decision-v2/*` + `data/decision-tree-migration.ts`.
- `components/DecisionWizard.tsx` e `components/decision/*` permanecem como fluxo legado (ainda úteis para referência/migração).
- Há dois pontos de entrada principais para o decisor: `Dashboard` (`/` → `/decisor`) e `Busca` (`/busca` com links para `/decisor?domain=...`).
