# BLUEPRINT TÉCNICO-INSTITUCIONAL — Protocolo Bússola

## 1) Sumário executivo
O **Protocolo Bússola** é um webapp client-side para apoiar decisões escolares em situações de risco, vulnerabilidade e encaminhamento institucional. Seu foco é transformar protocolo textual extenso em fluxo operacional acionável por perguntas e respostas, com acesso rápido à rede de proteção e modelos de registro.

**Problema que resolve:** reduzir ambiguidade na tomada de decisão sob pressão (professor/gestão), padronizar passos mínimos de proteção, e facilitar o acesso a contatos e instrumentos.

**Benefícios operacionais e de proteção:**
- Redução de tempo para primeira ação em cenários críticos por fluxo guiado no módulo Decisor.
- Consolidação de dados de rede e modelos em fonte central (`content/protocolData.ts`).
- Suporte offline parcial no frontend (banner de conectividade e arquitetura sem backend obrigatório).

**Evidência no repo:** `App.tsx`, `components/DecisionWizard.tsx`, `content/protocolData.ts`, `components/OfflineStatusBanner.tsx`, `README.md`.

---

## 2) Contexto institucional e cenário de uso real
Este repositório está orientado para realidade de escola pública com equipe heterogênea, demandas simultâneas e baixa disponibilidade de tempo. A configuração da escola, identidade institucional e telefones de emergência estão centralizados em arquivo único para simplificar manutenção local.

**Restrições reais observáveis:**
- Uso em dispositivo móvel e desktop em ambiente de atendimento.
- Dependência de conectividade variável para conteúdos externos (ex.: mapa e arquivos públicos).
- Ausência de backend institucional para registro definitivo de casos.

**Evidência no repo:** `content/schoolConfig.ts`, `components/Layout.tsx`, `components/NetworkMap.tsx`, `pages/FlowPage.tsx`.

---

## 3) Fundamentação conceitual de acolhimento e encaminhamento
### 3.1 Princípios operacionais
- Proteção integral e ação proporcional ao risco.
- Não revitimização (escuta qualificada com mínimo necessário).
- Sigilo com limitação por dever de proteção e escalonamento.
- Melhor interesse da criança/adolescente.

**Evidência no repo:** `public/protocol/protocolo.md`, `public/anexos/ANEXO-II.md`, `content/protocolData.ts`.

### 3.2 Ocorrência interna x proteção
🟡 **Inferência plausível:** o modelo diferencia situações de convivência/pedagógicas e violação de direitos via categorias de decisão, mas sem seção normativa explícita “ocorrência interna vs proteção” no frontend.

**Evidência no repo:** `content/protocolData.ts` (categorias da árvore de decisão).

❗ **Lacuna:** falta documento sintético explicitando fronteira de competência institucional para todos os perfis.

### 3.3 Gravidade/urgência e encaminhamento
A árvore já define níveis de risco (`BAIXO`, `MÉDIO`, `ALTO`, `EMERGENCIAL`) e conecta folhas a serviços-alvo (`contactTargets`) com orientação de prazo/registro.

**Evidência no repo:** `types.ts`, `content/protocolData.ts`, `components/ActionCard.tsx`.

---

## 4) Arquitetura lógica e organizacional
### 4.1 Camadas
- **UI/Rotas:** React + React Router HashRouter.
- **Regra de decisão:** árvore em `PROTOCOL_DATA.decisionTree`.
- **Dados institucionais:** serviços, anexos, glossário, cenários em `content/protocolData.ts`.
- **Persistência local:** `localStorage` em módulos específicos (`FlowPage`, `GlossaryPage`).
- **Serviços utilitários:** validação de profundidade, fallback da rede, links de fonte, índice de busca.

**Evidência no repo:** `App.tsx`, `content/protocolData.ts`, `pages/FlowPage.tsx`, `pages/GlossaryPage.tsx`, `services/*.ts`.

### 4.2 Entidades conceituais implementadas
`FlowNode`, `Service`, `DocumentTemplate`, `Fluxo`, `CasoAtivo`, `Recurso`, `Contato`.

**Evidência no repo:** `types.ts`.

### 4.3 Ciclo da demanda (estado)
🟡 **Inferência plausível:** o ciclo conceitual existe no conteúdo dos fluxos (fases em `FlowPage`) e no decisor (pergunta→folha), porém sem engine transacional única de casos.

❗ **Lacuna:** não há entidade persistente consolidada “Caso” com trilha completa multiusuário.

---

## 5) Inventário técnico (Fase 0)
### 5.1 Stack, entrypoints e bibliotecas
- Frontend: React 19 + TypeScript + Vite.
- Roteamento: `react-router-dom` com `HashRouter`.
- Mapa: `leaflet` + `react-leaflet`.
- Ícones: `lucide-react`.
- Testes: Node test runner (`node --test`) com smoke estático de fonte.

**Evidência no repo:** `package.json`, `App.tsx`, `index.tsx`, `tests/unit/*.mjs`, `tests/e2e/*.mjs`.

### 5.2 Mapa de módulos e rotas
| Rota | Arquivo | Propósito | Entradas/Saídas | Dependências |
|---|---|---|---|---|
| `/` | `pages/Dashboard.tsx` | Página inicial com atalhos principais | Entrada: navegação. Saída: links para módulos | `react-router-dom` |
| `/decisor` | `pages/DecisorPage.tsx` + `components/DecisionWizard.tsx` | Triagem guiada por árvore | Entrada: respostas do usuário. Saída: ações e contatos | `content/protocolData.ts`, componentes `decision/*` |
| `/fluxos` | `pages/FlowsListPage.tsx` | Lista de fluxos operacionais legados | Entrada: seleção de fluxo. Saída: navegação para detalhe | `FLUXOS` |
| `/fluxos/:id` | `pages/FlowPage.tsx` | Fluxo faseado com checklist | Entrada: `id` + checklist. Saída: estado salvo local | `localStorage`, `FLUXOS`, `CONTATOS` |
| `/rede` | `pages/NetworkPage.tsx` | Rede de proteção com filtros e mapa/lista | Entrada: filtros de serviço. Saída: ligação/cópia/rota | `NetworkMap`, `checkNetworkValidity` |
| `/busca` | `pages/BuscaPage.tsx` | Busca em fluxos/contatos legados | Entrada: termo. Saída: navegação | `FLUXOS`, `CONTATOS` |
| `/glossario` | `pages/GlossaryPage.tsx` | Glossário operacional editável localmente | Entrada: termo/edição local. Saída: persistência local | `GLOSSARY_SEED`, `localStorage` |
| `/simulador` | `pages/SimulatorPage.tsx` | Treino de decisão por cenários | Entrada: respostas. Saída: pontuação/feedback | `ROLEPLAY_SCENARIOS` |
| `/faq` | `pages/FAQPage.tsx` | FAQ operacional | Entrada: filtro/busca. Saída: respostas categorizadas | conteúdo interno da página |
| `/sobre` e `/versao` | `pages/AboutPage.tsx` | Governança e escopo de uso | Entrada: navegação. Saída: metadados de versão | `ProtocolMetaBanner` |
| `/protocolo` | `pages/ProtocoloPage.tsx` + `components/ProtocoloViewer.tsx` | Leitura do protocolo em markdown | Entrada: fetch de arquivo. Saída: renderização + impressão | `public/protocol/protocolo.md` |
| `/modelos` | `pages/ModelosPage.tsx` | Leitura de anexos/modelos | Entrada: seleção de anexo. Saída: renderização + impressão | `data/anexosMeta.ts`, `public/anexos/*.md` |

### 5.3 Componentes compartilhados (camada transversal)
`Layout`, `GlobalSearch`, `OfflineStatusBanner`, `ActionCard`, `NetworkMap`, `NetworkServiceCard`, `ProtocolMetaBanner`, `ProtocolVersionBadge`, `IndicatorsAccordion`.

**Evidência no repo:** `components/*.tsx`.

### 5.4 Persistência e integrações
- Persistência local em navegador: `localStorage` para `FlowPage` e `GlossaryPage`.
- Sem backend, sem banco, sem API própria autenticada.
- Conteúdo carregado por `fetch` de arquivos markdown públicos.

**Evidência no repo:** `pages/FlowPage.tsx`, `pages/GlossaryPage.tsx`, `components/ProtocoloViewer.tsx`, `App.tsx`.

### 5.5 Autenticação/roles
❗ **Lacuna:** não há autenticação, sessão, RBAC/ABAC ou trilha por usuário autenticado.

**Evidência no repo:** ausência de módulos auth em `App.tsx`, `pages/`, `services/`.

### 5.6 Dados sensíveis
- O modelo contém temas de violência, saúde e proteção (potencial dado sensível), mas o app não implementa formulário clínico persistente central.
- Persistência local pode expor dados caso dispositivo seja compartilhado.

**Evidência no repo:** `types.ts`, `content/protocolData.ts`, `pages/FlowPage.tsx`, `pages/GlossaryPage.tsx`.

### 5.7 Mapa de documentos do protocolo no repo
- Protocolo principal: `public/protocol/protocolo.md`.
- Anexos operacionais I, II, III e guia de uso: `public/anexos/ANEXO-I.md`, `public/anexos/ANEXO-II.md`, `public/anexos/ANEXO-III.md`, `public/anexos/comousarI-II-III.md`.
- Consolidação extensa de anexos/referências: `public/anexos/anexos.md`.
- Metadados de versão no app: `content/protocolMeta.ts`.

---

## 6) Fluxos end-to-end
### 6.1 Fluxo padrão (demanda geral)
1. Usuário acessa `/decisor`.
2. Responde perguntas da árvore.
3. Alcança nó folha com risco, ações “faça agora”, serviços-alvo e prazo/registro.
4. Pode consultar protocolo completo/modelos.

**Evidência no repo:** `components/DecisionWizard.tsx`, `components/QuestionStep.tsx`, `components/ActionCard.tsx`.

### 6.2 Fluxos críticos
- Risco imediato encaminha para ações emergenciais e CTA telefônico.
- Violação de direitos e suspeita grave apontam para rede de proteção.

**Evidência no repo:** `content/protocolData.ts` (nós `root`, `n_direitos_*`, folhas emergenciais), `components/decision/EmergencyCTA.tsx`.

### 6.3 Follow-up e rastreabilidade
❗ **Lacuna:** não existe pipeline de acompanhamento longitudinal institucional com status por responsável autenticado; apenas estado local parcial em fluxo legado.

---

## 7) Papéis institucionais, responsabilidades e permissões
### 7.1 Perfis (MVP conceitual)
🟡 **Inferência plausível:** papéis citados no protocolo e conteúdos (professor, coordenação/POC, direção/vice, secretaria) devem ser formalizados em matriz funcional.

### 7.2 Matriz RACI mínima proposta
| Atividade | Professor | POC/Coordenação | Direção/Vice | Secretaria |
|---|---|---|---|---|
| Identificação inicial e registro factual | R | A/C | I | I |
| Triagem e classificação de risco | C | R/A | C | I |
| Acionamento rede externa em gravidade | I/C | C | R/A | I |
| Registro institucional obrigatório (ex.: Conviva) | I | C | A/R | R (apoio técnico) |
| Encerramento e revisão do caso | I | R | A | I |

R = Responsible, A = Accountable, C = Consulted, I = Informed.

### 7.3 Permissões (proposta)
- **MVP sem autenticação:** perfis simulados por seleção de papel no frontend (somente orientação).
- **Roadmap:** autenticação e autorização por perfil com princípio do menor privilégio.

❗ **Lacuna:** implementação atual não aplica controle real de acesso.

---

## 8) Governança e rastreabilidade (auditoria)
### 8.1 Trilhas mínimas necessárias
- quem criou/alterou
- quando
- justificativa
- encaminhamento realizado
- status

### 8.2 Situação atual
❗ **Lacuna:** não há log imutável, versionamento de caso por usuário ou ID institucional padronizado no app.

### 8.3 MVP recomendado
- Registro append-only em arquivo/local backend mínimo.
- ID de caso no padrão `ESCOLA-ANO-TIPO-SEQUENCIAL`.
- Eventos básicos: `create`, `update`, `status_change`, `forwarded`, `closed`, `reopened`.

**Evidência no repo:** `pages/FlowPage.tsx` (persistência local simples), ausência de backend em `package.json`/estrutura.

---

## 9) Segurança, privacidade e LGPD
### 9.1 Classificação de dados
- **Dados pessoais:** identificação de estudante, responsável, contatos.
- **Dados sensíveis:** saúde, violência, vida íntima, possíveis violações.

### 9.2 Situação do app
- Não coleta dados em backend próprio.
- Pode armazenar estado local em `localStorage` (risco em dispositivo compartilhado).
- Conteúdo normativo trata LGPD e sigilo.

**Evidência no repo:** `README.md`, `pages/FlowPage.tsx`, `pages/GlossaryPage.tsx`, `public/protocol/protocolo.md`, `public/anexos/anexos.md`.

### 9.3 Checklist de segurança MVP
- Desativar armazenamento local de dados sensíveis por padrão.
- Limpar dados locais ao encerrar sessão/dispositivo compartilhado.
- Padronizar controle de acesso por perfil.
- Definir política de retenção e descarte.
- Garantir logs auditáveis.

---

## 10) Requisitos mínimos de MVP funcional e institucional
### 10.1 Funcionais
- Fluxo completo de triagem e encaminhamento.
- Consulta de rede de proteção com contatos atualizados.
- Modelos oficiais de registro acessíveis.
- Consulta de protocolo e FAQ.

### 10.2 Não funcionais
- Disponibilidade offline parcial.
- Backup/versionamento de conteúdo de protocolo.
- Acessibilidade mínima para navegação por teclado e foco visível.
- Desempenho aceitável em dispositivos escolares comuns.

**Evidência no repo:** `components/OfflineStatusBanner.tsx`, `tests/unit/accessibilitySmoke.test.mjs`, `search/buildIndex.ts`.

---

## 11) Escalabilidade e replicabilidade
- Parametrização por escola já iniciada em `content/schoolConfig.ts`.
- Modelo de dados central já consolidado em `content/protocolData.ts`.
- Replicação sugerida: pacote por escola com contatos, metadados e anexos locais.
- Estratégia híbrida: conteúdo estático + backend institucional opcional para auditoria.

---

## 12) Padrões de qualidade e contribuição
- Build e execução via scripts padrão Vite.
- Testes smoke de estrutura e acessibilidade via Node test.
- Diretriz atual: fonte única de dados em `content/protocolData.ts` / `data.ts`.

**Evidência no repo:** `package.json`, `tests/unit/*.mjs`, `README.md`, `data.ts`.

❗ **Lacuna:** faltam `CONTRIBUTING.md`, `SECURITY.md` e checklist formal de PR no repositório.

---

## 13) Glossário institucional e técnico-conceitual
Base inicial disponível em `GLOSSARY_SEED`; versão institucional consolidada publicada em `docs/00-visao-geral/GLOSSARIO.md`.

**Evidência no repo:** `content/protocolData.ts`.

---

## 14) Roadmap evolutivo sugerido
- **MVP (atual):** triagem, rede, protocolo, anexos, FAQ, simulador.
- **v1:** autenticação por perfil, trilha de auditoria mínima, retenção e descarte.
- **v2:** integração institucional segura com sistema oficial/relatórios e governança avançada.

Detalhamento em `docs/06-roadmap/ROADMAP.md`.

---


## 15) Proposta de organização documental do repositório (Fase 1)
Estrutura recomendada, preservando o que já existe:

```text
/docs
  /00-visao-geral
  /01-blueprints
  /03-governanca-e-lgpd
  /04-uso-e-treinamento
  /06-roadmap
README.md
```

Arquivos obrigatórios definidos para escrita nesta rodada:
- `README.md`
- `docs/01-blueprints/BLUEPRINT_TECNICO_INSTITUCIONAL.md`
- `docs/01-blueprints/BLUEPRINT_USUARIO_COMUNIDADE.md`
- `docs/03-governanca-e-lgpd/PRIVACIDADE_E_DADOS.md`
- `docs/03-governanca-e-lgpd/TRILHA_DE_AUDITORIA_E_REGISTROS.md`
- `docs/04-uso-e-treinamento/GUIA_RAPIDO_OPERACIONAL.md`
- `docs/06-roadmap/ROADMAP.md`
- `docs/00-visao-geral/GLOSSARIO.md`

❗ Recomendação adicional de governança (roadmap): `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE` e `CODE_OF_CONDUCT.md`.

---

## Apêndice A — Lacunas e prioridades (Fase 0.2)
| Item | Evidência no repo | Impacto | Risco | Recomendação |
|---|---|---|---|---|
| Política de privacidade formal | Não encontrado como documento dedicado | Alto | Jurídico/LGPD | Criar `PRIVACIDADE_E_DADOS.md` (MVP) |
| Controle de acesso por perfil | Não encontrado | Alto | Segurança/Jurídico | MVP com perfis simulados + roadmap para RBAC |
| Trilha de auditoria institucional | Não encontrado | Alto | Jurídico/Operacional | Criar especificação de logs e implementar backend mínimo |
| Termo de uso institucional | Não encontrado | Médio | Jurídico | Criar documento padrão interno |
| Retenção e descarte de dados | Não encontrado | Alto | LGPD | Definir prazos e rotina de descarte |
| Encarregado/DPO e canal de titular | Referência textual no protocolo, sem rotina no app | Médio | Jurídico | Definir canal institucional e SLA |
| Plano de resposta a incidente | Não encontrado | Alto | Segurança | Criar playbook mínimo |
| Governança de atualização da rede | Há campos `verifiedAt/verifiedBy` | Médio | Operacional | Formalizar rotina trimestral com responsável |

