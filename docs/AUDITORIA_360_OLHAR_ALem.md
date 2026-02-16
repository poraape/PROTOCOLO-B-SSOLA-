# Auditoria Técnica e Plano de Ação de Código — Protocolo Bússola

## Escopo e Assunções
- **Assunção:** objetivo imediato é MVP funcional interno (uso institucional), sem automação de decisão e sem coleta de dados sensíveis.
- **Assunção:** stack atual React + Vite + TypeScript, frontend-only, com fonte principal de conteúdo em `data.ts` e `public/protocolo`.
- **Assunção:** o plano abaixo prioriza robustez operacional sob estresse (30–60s), clareza cognitiva e segurança institucional mínima.

## Diagnóstico Técnico Consolidado

### 1) Lacunas técnicas
- Acoplamento alto entre conteúdo e UI em pontos críticos (regras/metadata institucionais não aparecem de forma consistente na interface).
- Dependência de geocoding externo em runtime sem cache persistente de coordenadas e sem timeout explícito por tentativa.
- Parsing de markdown para chat por HTML string com `dangerouslySetInnerHTML` (superfície residual de risco).
- Navegação principal com módulos não essenciais competindo com fluxo crítico de decisão.

### 2) Problemas cognitivos nos fluxos
- Entrada inicial com muitas alternativas reduz velocidade de decisão em contexto de estresse.
- Falta padrão único de fallback de incerteza transversal a todos os caminhos.
- Gravidade é mais evidente no final; poderia ser sinalizada com mais consistência durante a jornada.

### 3) Violações/fragilidades de segurança mínima
- Sem camada mínima de exposição por perfil/contexto para uso interno.
- Chave de API de IA em `localStorage` no cliente (risco operacional em dispositivos compartilhados).
- Ausência de política técnica explícita para “conteúdo oficial” vs “orientação derivada” na UI.

### 4) Inconsistências de arquitetura
- Fonte única de dados existe, porém metadados de governança (versão normativa, vigência, data de validação da rede) não estão estruturados de ponta a ponta.
- Páginas combinam responsabilidades de apresentação, regra e contingência em um único componente.

### 5) Pontos que pedem modularização
- Estratégias de fallback (mapa/rede/offline) devem virar utilitários/serviços reutilizáveis.
- Componentes de decisão (pergunta, indicadores, resumo, decisão final) precisam ser decompostos em blocos menores.
- Metadados institucionais (versão e governança) devem ser centralizados e consumidos por header/rodapé padrão.

---
ITEM: CODEx-001
PRIORIDADE: P0
ARQUIVOS IMPACTADOS:
- `data.ts`
- `types.ts`
- `pages/DecisorPage.tsx`
- `pages/NetworkPage.tsx`
- `pages/ResourcesPage.tsx`
- `components/Layout.tsx`
COMPONENTES / FUNÇÕES:
- `PROTOCOL_DATA`
- Tipos `ProtocolData`, `Service`
- Cabeçalhos de páginas críticas
DESCRIÇÃO DA MUDANÇA:
- Incluir metadados institucionais obrigatórios no modelo (`protocolVersion`, `effectiveDate`, `lastReviewedAt`, `reviewedBy`).
- Exibir esses metadados nas telas Decisor, Rede e Recursos em bloco visual fixo e discreto.
JUSTIFICATIVA (impacto x esforço x risco):
- **Impacto alto**, **esforço baixo/médio**, **risco mitigado alto** (fidelidade normativa e rastreabilidade institucional).
TESTES (unitários/e2e) e critérios de aceite:
- Unitário: valida que `PROTOCOL_DATA` contém campos obrigatórios de versão.
- E2E: verificar presença do bloco de versão nas 3 rotas críticas.
- Aceite: usuário sempre identifica versão e vigência sem rolagem extensa.
---

---
ITEM: CODEx-002
PRIORIDADE: P0
ARQUIVOS IMPACTADOS:
- `pages/NetworkPage.tsx`
- `data.ts`
- `types.ts`
COMPONENTES / FUNÇÕES:
- `geocodeAddress`
- render do mapa/lista de rede
DESCRIÇÃO DA MUDANÇA:
- Implementar fallback robusto de mapa: quando geocoding falhar ou rede indisponível, manter lista acionável como fonte primária.
- Adicionar “copiar endereço” e mensagem operacional explícita (“Mapa indisponível. Use lista e ligue agora”).
- Acrescentar metadados de verificação oficial por serviço (`officialSource`, `verifiedAt`, `verifiedBy`).
JUSTIFICATIVA (impacto x esforço x risco):
- **Impacto alto**, **esforço médio**, **risco mitigado alto** (continuidade operacional em baixa conectividade).
TESTES (unitários/e2e) e critérios de aceite:
- Unitário: função de fallback retorna estado “lista-prioritária” em erro de fetch.
- E2E: simular falha de rede e confirmar uso completo da lista (ligar/copiar/endereço).
- Aceite: fluxo de acionamento não depende do mapa para concluir ação.
---

---
ITEM: CODEx-003
PRIORIDADE: P0
ARQUIVOS IMPACTADOS:
- `components/DecisionWizard.tsx`
- `components/ActionCard.tsx`
- `data.ts`
- `types.ts`
COMPONENTES / FUNÇÕES:
- renderização de pergunta
- nós de fallback e nós finais
DESCRIÇÃO DA MUDANÇA:
- Consolidar triagem inicial com foco em risco imediato e reduzir ramificações redundantes.
- Garantir nó de fallback “Não sei” visível e transversal, com escalonamento seguro padronizado.
- Limitar profundidade de decisão útil (meta: até 5 nós por caminho crítico).
JUSTIFICATIVA (impacto x esforço x risco):
- **Impacto muito alto**, **esforço médio**, **risco mitigado alto** (tempo de decisão e redução de erro cognitivo).
TESTES (unitários/e2e) e critérios de aceite:
- Unitário: validar grafo sem ciclos inválidos e com fallback em todos os ramos críticos.
- E2E: percorrer 3 cenários críticos e concluir decisão em ≤ 60s no teste moderado.
- Aceite: todos os caminhos críticos têm saída objetiva com ação imediata.
---

---
ITEM: CODEx-004
PRIORIDADE: P0
ARQUIVOS IMPACTADOS:
- `components/DecisionWizard.tsx`
- `components/ActionCard.tsx`
- `components/` (novo componente sugerido: `IndicatorsAccordion.tsx`)
- `data.ts`
COMPONENTES / FUNÇÕES:
- bloco colapsável de indicadores
DESCRIÇÃO DA MUDANÇA:
- Criar bloco colapsável “Como identificar?” por nó, com indicadores objetivos já previstos no protocolo.
- Manter separação visual entre apoio de identificação e decisão final (sem automatização).
JUSTIFICATIVA (impacto x esforço x risco):
- **Impacto alto**, **esforço médio**, **risco mitigado médio/alto** (clareza sem poluição visual).
TESTES (unitários/e2e) e critérios de aceite:
- Unitário: estado aberto/fechado do acordeão e renderização de lista de indicadores.
- E2E: em mobile, acordeão não quebra layout e mantém CTA principal visível.
- Aceite: usuário acessa indicadores sob demanda sem perder foco da pergunta.
---

---
ITEM: CODEx-005
PRIORIDADE: P1
ARQUIVOS IMPACTADOS:
- `components/Layout.tsx`
- `pages/Dashboard.tsx`
- `App.tsx`
COMPONENTES / FUNÇÕES:
- navegação principal
- cards de acesso rápido
DESCRIÇÃO DA MUDANÇA:
- Reorganizar IA da navegação para MVP: Início, Decisor, Rede, Recursos, Sobre/Versão.
- Isolar módulos não essenciais (chat/simulador/editor) fora do caminho principal de atendimento.
JUSTIFICATIVA (impacto x esforço x risco):
- **Impacto alto**, **esforço baixo/médio**, **risco mitigado médio** (redução de distração em contexto crítico).
TESTES (unitários/e2e) e critérios de aceite:
- E2E: da home ao resultado do decisor em 3 toques máximos.
- Aceite: usuário encontra “Iniciar atendimento” imediatamente em mobile.
---

---
ITEM: CODEx-006
PRIORIDADE: P1
ARQUIVOS IMPACTADOS:
- `components/DecisionWizard.tsx`
- `components/ActionCard.tsx`
- `pages/NetworkPage.tsx`
- `pages/ResourcesPage.tsx`
- `index.css`
COMPONENTES / FUNÇÕES:
- componentes interativos críticos
DESCRIÇÃO DA MUDANÇA:
- Ajustes mobile-first e A11y AA mínima: foco visível consistente, alvos de toque confortáveis, hierarquia tipográfica e contraste.
- Revisar microcopy para comandos curtos orientados à ação (“faça agora”).
JUSTIFICATIVA (impacto x esforço x risco):
- **Impacto alto**, **esforço médio**, **risco mitigado médio** (usabilidade real sob estresse).
TESTES (unitários/e2e) e critérios de aceite:
- E2E: breakpoints 360x800, 768x1024, 1366x768.
- A11y: navegação completa por teclado e contraste mínimo AA nas telas críticas.
- Aceite: todos os CTAs críticos acionáveis com teclado e touch sem sobreposição.
---

---
ITEM: CODEx-007
PRIORIDADE: P1
ARQUIVOS IMPACTADOS:
- `pages/ChatPage.tsx`
- `services/protocolKnowledge.ts`
COMPONENTES / FUNÇÕES:
- `renderMarkdownSimple`
- armazenamento de chave API
DESCRIÇÃO DA MUDANÇA:
- Isolar Chat IA do MVP principal e reduzir superfície de risco:
  - remover destaque na navegação principal;
  - evitar persistência longa de chave em dispositivo compartilhado;
  - substituir parser artesanal por estratégia de renderização segura sem HTML injetado.
JUSTIFICATIVA (impacto x esforço x risco):
- **Impacto médio/alto**, **esforço médio**, **risco mitigado alto** (segurança mínima e previsibilidade).
TESTES (unitários/e2e) e critérios de aceite:
- Unitário: mensagens não executam HTML/script.
- E2E: módulo não interfere no fluxo principal de decisão.
- Aceite: MVP funciona integralmente sem dependência do chat.
---

---
ITEM: CODEx-008
PRIORIDADE: P1
ARQUIVOS IMPACTADOS:
- `data.ts`
- `types.ts`
- `pages/FAQPage.tsx`
- `pages/ResourcesPage.tsx`
COMPONENTES / FUNÇÕES:
- modelo de dados e blocos de conteúdo
DESCRIÇÃO DA MUDANÇA:
- Separar explicitamente no modelo e UI:
  - **Conteúdo Institucional Oficial**;
  - **Orientação Operacional Derivada**.
- Adicionar rotulagem e fonte/capítulo em conteúdos críticos.
JUSTIFICATIVA (impacto x esforço x risco):
- **Impacto alto**, **esforço médio**, **risco mitigado alto** (evita “invenção de regra” e conflito de interpretação).
TESTES (unitários/e2e) e critérios de aceite:
- Unitário: campos obrigatórios de rotulagem no tipo de conteúdo.
- E2E: usuário distingue tipo de conteúdo em páginas de apoio e decisão.
- Aceite: nenhum trecho crítico aparece sem rótulo de origem.
---

---
ITEM: CODEx-009
PRIORIDADE: P2
ARQUIVOS IMPACTADOS:
- `components/DecisionWizard.tsx`
- `data.ts`
- `types.ts`
COMPONENTES / FUNÇÕES:
- breadcrumb/histórico
- estrutura de nós
DESCRIÇÃO DA MUDANÇA:
- Modularizar o decisor em subcomponentes (`QuestionStep`, `DecisionSummary`, `EmergencyCTA`, `FlowBreadcrumb`) para reduzir complexidade e facilitar testes.
JUSTIFICATIVA (impacto x esforço x risco):
- **Impacto médio**, **esforço médio**, **risco mitigado médio** (manutenção e evolução segura).
TESTES (unitários/e2e) e critérios de aceite:
- Unitário: cada subcomponente renderiza estados críticos (loading/erro/leaf).
- Aceite: redução de complexidade ciclomática e melhoria de legibilidade.
---

---
ITEM: CODEx-010
PRIORIDADE: P2
ARQUIVOS IMPACTADOS:
- `package.json`
- (novos) `tests/` e configuração de testes
COMPONENTES / FUNÇÕES:
- suíte de testes (unit/e2e smoke)
DESCRIÇÃO DA MUDANÇA:
- Introduzir base mínima de testes automatizados para rotas e fluxos críticos do MVP.
JUSTIFICATIVA (impacto x esforço x risco):
- **Impacto médio/alto**, **esforço médio**, **risco mitigado médio** (evita regressão na consolidação do MVP).
TESTES (unitários/e2e) e critérios de aceite:
- Unitário: funções puras de fluxo e fallback.
- E2E: happy path decisor + falha de mapa + fallback de incerteza.
- Aceite: pipeline local passa com cobertura dos caminhos P0.
---

## Ordem de Execução Recomendada (MVP interno)
1. CODEx-001
2. CODEx-002
3. CODEx-003
4. CODEx-004
5. CODEx-005
6. CODEx-006
7. CODEx-008
8. CODEx-007
9. CODEx-009
10. CODEx-010

## Critérios de Aceite Globais do MVP
- Decisão assistida concluída em até 60 segundos nos cenários críticos.
- Fluxo principal não depende de mapa, chat ou integração externa para orientar ação imediata.
- Versão normativa e governança da rede visíveis na interface crítica.
- Sem coleta de dados pessoais sensíveis e sem automação decisória.
- Mobile-first funcional com acessibilidade mínima AA nas telas críticas.
