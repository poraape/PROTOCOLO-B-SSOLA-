# ROADMAP — PROTOCOLO BÚSSOLA

## Visão geral
Roadmap orientado por risco institucional, segurança e capacidade operacional de escola iniciante.

## Fase atual (MVP existente)
- Decisor com árvore de triagem.
- Rede de proteção com contatos.
- Consulta ao protocolo e anexos.
- FAQ, glossário e simulador.

## Trimestre 1 (Prioridade P0/P1)
### P0 — Crítico
- Implementar política institucional de privacidade e retenção.
- Remover/limitar persistência local de dados sensíveis.
- Definir fluxo formal de registro e escalonamento obrigatório.

### P1 — Alto impacto
- Implementar autenticação por perfil.
- Implementar trilha de auditoria (eventos mínimos).
- Painel de histórico de caso por status e responsável.

## Trimestre 2 (P1/P2)
- Consolidação de permissões por papel (menor privilégio).
- Versionamento de conteúdo de protocolo/anexos por escola.
- Rotina de validação da rede (telefone/endereço/geo).
- Melhorias de acessibilidade e experiência mobile.

## Trimestre 3 (P2)
- Integração com sistemas institucionais aplicáveis.
- Relatórios de governança (tempo de resposta, encaminhamentos, pendências).
- Módulo de formação continuada e trilhas de capacitação.

## Backlog contínuo
- Revisão jurídica e normativa semestral.
- Auditoria de segurança anual.
- Revisão pedagógica da linguagem de orientação.

## Priorização por risco/impacto
| Item | Risco atual | Impacto | Prioridade |
|---|---|---|---|
| Controle de acesso por perfil | Alto | Alto | P0/P1 |
| Trilha de auditoria institucional | Alto | Alto | P1 |
| Retenção e descarte formal | Alto | Alto | P0 |
| Governança de conteúdo e revisão | Médio | Alto | P1 |
| Analytics e relatórios avançados | Médio | Médio | P2 |

## Evidências no repo
`content/protocolData.ts`, `pages/FlowPage.tsx`, `pages/GlossaryPage.tsx`, `App.tsx`, `components/Layout.tsx`.
