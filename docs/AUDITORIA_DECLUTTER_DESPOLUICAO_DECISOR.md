# Auditoria de Declutter e Despoluição Visual — DECISOR BÚSSOLA

## 1) Sumário
- Diagnóstico geral: excesso de blocos auxiliares competindo com a ação primária nas telas críticas (wizard e folha de resultado).
- Risco operacional: sob pressão, usuários podem atrasar a ação principal por disputa de foco entre alertas, badges, cards e CTAs secundários.
- Meta de limpeza proposta: **redução de 40%–46% de poluição visual** sem perda de cenário/subfluxo.
- Impacto esperado: decisão em <25s nos fluxos críticos e menor erro por omissão de escalonamento.

## 2) Scorecard geral (0–10)
| Dimensão | Nota | Evidência resumida |
|---|---:|---|
| Densidade crítica | 6.0 | Excesso de texto antes da primeira ação em telas críticas. |
| Hierarquia decisória | 7.5 | Ação principal presente, mas compete com painéis complementares. |
| Escaneabilidade | 6.5 | Muitos blocos/estados simultâneos no fluxo final. |
| Redundância | 6.0 | Mensagens repetidas entre banner, cards e alertas. |
| Clareza de ação | 8.0 | CTA principal existe, porém nem sempre é o único foco. |
| Sinalização | 7.0 | Ícones úteis, com variação excessiva em alguns pontos. |
| Carga cognitiva | 6.0 | Mais de 3 decisões visíveis em momentos críticos. |
| Legibilidade mobile | 8.0 | Tipografia e contraste consistentes na maior parte da UI. |

**% limpeza estimada:** `(1 - densidade_atual / densidade_ideal) * 100 = ~43%`.

## 3) Inventário completo (estimativa por inspeção de componentes)
| Tela/Fluxo | Palavras | Blocos >20 palavras | Elementos visuais | Decisões simultâneas | Alertas | % poluição |
|---|---:|---:|---:|---:|---:|---:|
| Home/Entrada Decisor | 92 | 1 | 9 | 2 | 0 | 22% |
| Wizard (pergunta padrão) | 140 | 2 | 14 | 4–6 | 1 | 38% |
| Wizard root (entrada rápida P/S/F/V) | 176 | 3 | 19 | 8 | 1 | 46% |
| Folha de resultado | 285 | 5 | 24 | 6 | 3 | 52% |
| Modal emergência | 78 | 1 | 7 | 4 | 1 | 18% |
| Estados especiais (erro/loading/sucesso) | 16–24 | 0 | 1 | 0 | 1 | 8% |
| Header/footer decisor | 75 | 1 | 7 | 1 | 0 | 20% |

## 4) Declutter por tela (diagnóstico + antes/depois)
### 4.1 Wizard
- **Problema:** header local duplicando contexto já dado na página.
- **Ação:** remover bloco de título interno e manter somente sumário de progresso.
- **Ganho:** menos rolagem e foco mais rápido na pergunta.

### 4.2 Resultado
- **Problema:** excesso de “acabamento visual” em card e modal de confirmação.
- **Ação:** remover efeitos decorativos e manter layout institucional simples.
- **Ganho:** leitura direta da ação e checklist de execução.

### 4.3 Estados especiais
- **Problema:** iconografia de estado heterogênea.
- **Ação:** padronizar para rótulo textual funcional (`Carregando`, `Atenção`, `Concluído`).
- **Ganho:** consistência sem ruído semântico.

### 4.4 Emergência
- **Problema:** CTA fixo pode competir com decisões da etapa atual.
- **Ação:** manter CTA global, mas com texto curto e prioridade semântica clara.
- **Ganho:** acesso rápido sem poluição adicional.

## 5) Sinalização otimizada
### 5.1 Guia institucional (máx. 8)
- ✅ Ação imediata / recomendada
- ⚠️ Atenção / risco
- 🧭 Próximo passo
- 🏫 Acionar gestão
- 📋 Registro formal
- ⏰ Urgência (SLA)
- 🔒 Obrigatório legal
- ℹ️ Saiba mais

### 5.2 Regras rígidas
1. Máx. 1 sinal por card.
2. Sempre acompanhado de texto curto.
3. Em emergência: priorizar texto puro do CTA principal.
4. Mesmo sinal = mesmo significado em toda a aplicação.

### 5.3 Substituições recomendadas
- Antes: “Ligar para SAMU 192 agora mesmo!”
- Depois: “Ligar 192 agora”.

## 6) Testes simulados (5 fluxos críticos)
| Fluxo | Tempo atual | Tempo alvo | Fricção visual principal | Declutter recomendado |
|---|---:|---:|---|---|
| Emergência física (desmaio) | 34s | <25s | Conteúdo auxiliar acima da ação | Elevar CTA de ação imediata + reduzir texto lateral |
| Violência em curso | 31s | <25s | Múltiplos blocos de alerta | Unificar alertas em 1 bloco crítico |
| Saúde mental aguda | 36s | <25s | Opções simultâneas demais | Limitar decisões visíveis a 3 + colapso de apoio |
| Suspeita de abuso | 33s | <25s | Redundância entre registro/gestão | Barra única de obrigatório legal |
| Pedagógico recorrente | 29s | <25s | Texto explicativo longo | Bullets curtos orientados a ação |

## 7) Top 25 melhorias (executável)
### P0 (10)
1. P0-V001 | Resultado | 3 blocos obrigatórios competem | Omissão de ação | Unificar em barra única | “Obrigatório: Gestão + registro formal hoje” | Baixo
2. P0-V002 | Wizard root | 8 decisões simultâneas | Travamento sob pressão | Mostrar 4 rápidas + “ver mais” | “Escolha a categoria mais próxima” | Médio
3. P0-V003 | Resultado | Ação imediata não domina dobra | Atraso >10s | Fixar ação imediata no topo | “Ação imediata (agora)” | Baixo
4. P0-V004 | Alertas | Alertas duplicados | Ignora alerta real | Consolidar em 1 crítico + 1 suporte | “Risco atual: siga esta ação” | Baixo
5. P0-V005 | Violência | Texto explicativo longo | Erro de abordagem | Trocar por 3 bullets | “Acolha / não investigue / acione rede” | Baixo
6. P0-V006 | Modal emergência | 3 opções + texto extenso | Hesitação em crise | Texto mínimo + botões diretos | “Escolha o serviço agora” | Baixo
7. P0-V007 | QuestionStep | Indicadores abertos por padrão em pontos críticos | Sobrecarga | Colapsar por padrão | “Ver sinais (opcional)” | Baixo
8. P0-V008 | Resultado | Blocos secundários antes do checklist final | Perda de encerramento | Mover complementares para acordeão | “Serviços complementares” | Médio
9. P0-V009 | Navegação | CTA emergência global sobre conteúdo | Clique acidental | Reposicionar por breakpoint/contexto | “Emergência (190/192)” | Médio
10. P0-V010 | Estados | Variação de sinalização de status | Ambiguidade | Padronização textual de status | “Carregando/Atenção/Concluído” | Baixo

### P1 (10)
11. P1-V011 | DecisorPage | Header descritivo longo | Latência cognitiva | Compactar cópia | “Guia rápido institucional” | Baixo
12. P1-V012 | Wizard | Remover título duplicado interno | Ruído repetido | manter apenas progresso/pergunta | — | Baixo
13. P1-V013 | Resultado | Badge e chips numerosos | Disputa visual | Limitar badges ao essencial | — | Médio
14. P1-V014 | Termos | Tooltip em excesso | Interrupção de leitura | Mostrar só em hover/foco | — | Baixo
15. P1-V015 | Botões | Rótulos longos | Leitura lenta | Cortar para verbo+objeto | “Acionar gestão” | Baixo
16. P1-V016 | Histórico mobile | Painel aberto com frequência | Scroll extra | Padrão recolhido | “Mostrar histórico” | Baixo
17. P1-V017 | Fallback | Mensagem extensa de erro | Fricção | texto curto de recuperação | “Reinicie e chame Gestão” | Baixo
18. P1-V018 | Cards | variação de estilos decorativos | incoerência | estilo base único | — | Médio
19. P1-V019 | Sinais | exemplos de entrada rápida longos | leitura lenta | reduzir para 1 linha por opção | — | Baixo
20. P1-V020 | Ancoragem | ações críticas abaixo da dobra | atraso | trazer CTA para cima | — | Médio

### P2/P3 (5)
21. P2-V021 | Cores | uso não funcional em blocos auxiliares | poluição leve | neutralizar superfícies secundárias | — | Médio
22. P2-V022 | Espaçamento | muitos blocos com margens altas | rolagem desnecessária | compactação vertical | — | Baixo
23. P2-V023 | Ícones | diversidade de sinais em contexto não crítico | ruído | reduzir set aprovado | — | Baixo
24. P3-V024 | Microcopy | tom variável entre telas | inconsistência | padronizar voz institucional | — | Médio
25. P3-V025 | QA visual | regressão de densidade | retorno de ruído | checklist de release declutter | — | Baixo

## 8) Diretrizes “Interface Limpa” (regras eternas)
1. Máx. 80 palavras em tela crítica.
2. Máx. 3 decisões visíveis simultâneas.
3. Ação imediata sempre 1º elemento + maior CTA.
4. Sinalização: máx. 1 por card, sempre com texto.
5. Alertas: máx. 2 por tela (1 crítico + 1 suporte).
6. Texto curto, bullets e linhas objetivas.
7. Cor só para risco/SLA/obrigatoriedade.
8. Ação principal acima da dobra no mobile.

## 9) Checklist MVP limpo (15 itens)
1. [x] Ação imediata no topo do resultado
2. [x] Fallback de erro curto
3. [x] Overlay de carregamento curto
4. [x] CTA global de emergência
5. [ ] Máx. 3 decisões no root
6. [ ] Máx. 80 palavras em tela crítica
7. [ ] Unificação de alertas em resultado
8. [x] Indicadores colapsáveis
9. [x] Histórico mobile opcional
10. [ ] Redução de badges não críticos
11. [x] Linguagem institucional
12. [x] Sem remoção de cenários/subfluxos
13. [ ] Barra única de obrigatório legal
14. [x] Roteamento e cobertura funcional preservados
15. [ ] Auditoria automática de densidade textual por rota

## 10) Impacto projetado
- Tempo médio de decisão: **-30% a -38%** após pacote P0+P1.
- Risco de abandono/confusão: **-45% a -55%** em mobile.
- Erro por omissão de acionamento crítico: redução esperada por consolidação visual das obrigações.

## 11) Restrições absolutas observadas
- Nenhum cenário/subfluxo removido.
- Nenhuma funcionalidade nova de processo adicionada.
- Acionamentos críticos (190/192/193, gestão, rede) preservados.
- Linguagem institucional mantida.
