# Auditoria UI — DECISOR (Guia Decisório Institucional)

## 9.1 Sumário Executivo Estratégico

**Estado atual da UI:** **Sólido (MVP avançando para operação institucional)** com **nota geral 7,6/10**. A interface já comunica com clareza que é um assistente de decisão, mantém foco em fluxo rápido e apresenta bons pilares para uso em crise (wizard progressivo, fallback “Não sei”, CTA de emergência, resumo de passo).  

**Principais riscos críticos atuais (alto impacto institucional):**
1. **Confusão entre “orientar” e “cumprir obrigação formal”** em alguns momentos de saída (especialmente quando mostra “registro obrigatório”, sem reforço visual de que o app não substitui sistema oficial).  
2. **Urgência legal pouco diferenciada por prazo operacional visível** (“Hoje”, “< 2h”, “imediato”) — aparece na folha, mas sem padrão visual consistente de SLA institucional.  
3. **Botão de emergência condicionado ao nó atual** (alto/emergencial), podendo reduzir descobribilidade para usuário administrativo que entra em cenário crítico sem ter passado pela triagem.  
4. **Sobrecarga semântica em categorias iniciais** (casos híbridos: pedagógico + sofrimento emocional) ainda dependem de interpretação humana sem “pré-pergunta de desambiguação”.  
5. **Rastreabilidade limitada da decisão** no MVP (há histórico da sessão, mas não há trilha auditável persistente por caso/ação executada).

**Potencial de evolução:** maturidade atual estimada em **76%**; com implementação das recomendações P0/P1 deste relatório, projeção de **88–91%** sem descaracterizar MVP.

**Recomendação-chave (maior impacto estratégico):** implantar **bloco final padronizado de encerramento institucional** em todas as folhas (Ação imediata → Escalonamento obrigatório → Prazo legal → Registro formal fora do app), com microcopy unificada e CTA explícita “Ir para canal oficial de registro”. Isso reduz erro decisório, ambiguidade jurídica e hesitação em crise.

---

## 9.2 Scorecard Multidimensional (0–10)

| Dimensão | Nota | Justificativa estratégica |
|---|---:|---|
| 1. Clareza da proposta visual | 8,5 | “Assistente de decisão”, “pergunta por vez” e disclaimer institucional aparecem cedo. Diferença entre apoio e protocolo formal está presente, mas pode ser reforçada nas telas finais. |
| 2. Hierarquia da informação | 7,5 | Classificação/prioridade e “o que fazer agora” têm destaque bom; obrigações legais e prazos ainda não usam padrão visual de criticidade tão forte quanto urgência clínica. |
| 3. Facilidade de navegação | 8,0 | Fluxo linear, voltar/reiniciar e breadcrumb/histórico ajudam recuperação. Falta mapa global opcional para gestão auditar caminho completo rapidamente. |
| 4. Coerência dos fluxos decisórios | 7,8 | Árvore robusta com fallback “Não sei”; ainda há zonas cinzentas entre categorias (pedagógico vs mental/violência indireta). |
| 5. Leveza cognitiva | 7,2 | Boa divisão por pergunta única; em algumas saídas há alta densidade (serviços, justificativa, registro, referência) na mesma tela. |
| 6. Consistência terminológica | 7,0 | Estrutura técnica é forte, mas coexistem verbos próximos (“acionar”, “encaminhar”, “notificar”, “comunicar”) sem legenda operacional fixa por papel. |
| 7. Eficiência até decisão final | 8,2 | Tempo de uso curto para cenários típicos; risco de atraso em casos híbridos por dúvida de categoria inicial. |
| 8. Clareza de acionamentos | 8,0 | Serviços principais/complementares e telefones estão claros. Recomendável separar visualmente “urgente agora” vs “encaminhar em rotina”. |
| 9. Qualidade da microcopy | 7,4 | Tom institucional e protetivo é bom; precisa simplificar termos para público administrativo e reduzir frases longas em alta pressão. |
| 10. Feedback e estados de sistema | 6,8 | Há progresso por passo e histórico; faltam confirmações de ações críticas (ex.: “você acionou 192?”) e estados de erro/carregamento mais explícitos. |
| 11. Acessibilidade (visual/textual) | 7,0 | Foco visível e estrutura razoável; falta evidência formal WCAG (contraste medido, semântica completa e fluxo teclado de ponta a ponta). |
| 12. Adequação institucional (tom) | 8,4 | Linguagem evita sensacionalismo na maior parte e reforça papel da gestão; ainda pode endurecer proibições críticas em formato “NÃO FAÇA”. |
| 13. Mobile responsiveness | 8,1 | Layout mobile-first com navegação fixa e CTA móvel; revisar alvos pequenos e evitar excesso de texto em tela final. |
| 14. Escalabilidade visual | 7,9 | Componente modular e árvore externa favorecem expansão (novos blocos/cenários); falta design token de severidade legal unificado. |

**Nota Geral da UI:** **7,6 / 10**  
**Percentual de Maturidade MVP:** **76%**  
**Classificação:** **☑ Sólido**

---

## 9.3 Análise por Perspectiva (7 perspectivas)

## Perspectiva 1 — Professor (sob pressão de tempo)
### Pontos fortes
- Entrada com “pergunta por vez” reduz carga cognitiva inicial.
- Resumo de passo (“Pergunta X de Y”) aumenta senso de progresso.
- Fallback “Não sei / preciso de apoio” evita bloqueio decisório.
- CTA de emergência aparece em nós de alto risco.

### Fricções
1. Categoria inicial pode gerar hesitação em caso misto (emocional + pedagógico).  
2. Texto de saída pode ficar denso (ações + serviços + justificativa + registro).  
3. Em sala cheia, professor precisa saber “faço sozinho ou escalo agora” em bloco único e mais explícito.  
4. CTA emergencial condicional pode reduzir previsibilidade (“cadê o botão?”).  
5. Breadcrumb/histórico mobile exige interação extra para abrir detalhes.

### Riscos de interpretação equivocada
- Professor entender que concluir wizard = obrigação legal cumprida.
- Achar que pode aguardar gestão em situação de risco iminente.
- Tratar caso como disciplinar quando há marcador de saúde mental aguda.

### Recomendações priorizadas
1. **[P0]** Bloco fixo “Decisão em 20 segundos” no resultado: **AGORA / ESCALAR / REGISTRAR**.  
2. **[P0]** Selo visual “Risco iminente = acione 190/192 imediatamente”.  
3. **[P1]** Pré-pergunta de desambiguação antes das categorias (“há risco físico imediato?”, “há sofrimento emocional principal?”).  
4. **[P1]** Compactar resultado em acordeões por prioridade.  
5. **[P1]** Atalho home para cenários recorrentes (autolesão, agressão, desmaio).  
6. **[P2]** Modo “consulta rápida” com linguagem ultraobjetiva (frases curtas).  

## Perspectiva 2 — Funcionário administrativo
### Pontos fortes
- Botões com verbos diretos e opção “não sei”.
- Encaminhamentos com telefone clicável facilitam execução.
- Estrutura de checklist no resultado auxilia ação prática.

### Fricções
1. Termos como “encaminhamento”, “registro obrigatório”, “classificação” podem exigir interpretação.  
2. Falta explicação curta de “por que fazer” ao lado de cada passo crítico.  
3. Nem todos os conceitos técnicos estão imediatamente disponíveis in-line (depende de ir ao glossário).  
4. Em pânico, distinção entre PM/SAMU/Conselho pode confundir.

### Riscos críticos
- Acionar serviço inadequado por não entender diferença entre urgência médica e proteção de direitos.
- Postergar comunicação à direção por achar que “já encaminhei”.
- Executar conduta proibida (confrontar agressor, prometer sigilo absoluto).

### Recomendações
1. **[P0]** Inserir “POR QUE” em 1 linha para cada ação obrigatória.  
2. **[P0]** Cartão fixo “Quem ligar agora?” com três opções (190/192/Direção).  
3. **[P1]** Glossário contextual por tooltip nos termos críticos.  
4. **[P1]** Ícones semânticos + texto (não depender só de cor).  
5. **[P1]** Microcopy anti-erro com verbos proibitivos claros (“NÃO confronte”).  
6. **[P2]** Versão “linguagem simplificada” ativável na interface.

## Perspectiva 3 — Gestão escolar (risco jurídico)
### Pontos fortes
- Conteúdo contempla referências normativas e notificação em múltiplos cenários.
- Há indicação de registro obrigatório por folha quando aplicável.
- Distinção de rede principal/complementar ajuda governança operacional.

### Fricções
1. Prazos legais não estão padronizados em sistema visual de SLA.  
2. Não há trilha persistente de auditoria por decisão tomada.  
3. Falta painel consolidado “o que foi recomendado x o que foi executado”.  
4. Diferença entre “orientação” e “ato administrativo formal” ainda pode passar despercebida sob pressão.

### Riscos críticos
- Escola assumir exposição por acreditar que uso do app substitui notificação oficial.
- Comunicação tardia em obrigações “hoje/imediato”.
- Linguagem operacional ser interpretada como ato investigativo.

### Recomendações
1. **[P0]** Selo jurídico fixo: “Ferramenta de orientação — notificação formal obrigatória em canal oficial”.  
2. **[P0]** Etiquetas de prazo padronizadas (IMEDIATO / ATÉ 2H / HOJE / 24H / 48H).  
3. **[P1]** Exportar resumo da orientação (PDF) para dossiê interno.  
4. **[P1]** Assinatura de responsabilidade de execução (quem acionou gestão/rede).  
5. **[P1]** Dashboard de conformidade (percentual de fluxos com registro formal concluído).  

## Perspectiva 4 — UX/UI Sênior
### Pontos fortes
- Arquitetura modular (wizard, cards, histórico, alertas).
- Padrão visual relativamente consistente (cards, badges, botões).
- Progressão explícita por passos + retorno/reinício.

### Fricções
1. Tela final tem competição de blocos de informação.  
2. Hierarquia de criticidade jurídica vs clínica não está equilibrada visualmente.  
3. Primário/ secundário ainda pode variar por contexto de tela.  
4. Falta estado de sucesso/fechamento com sensação de conclusão operacional.

### Riscos
- Usuário executar apenas primeira ação e ignorar notificações.
- Leitura parcial por excesso de blocos equivalentes.
- Dúvida sobre próximo passo após chegar na folha.

### Recomendações
1. **[P0]** Redesenhar resultado com bloco topo “Ação prioritária única”.  
2. **[P1]** Grid de severidade com cor + ícone + rótulo textual.  
3. **[P1]** Padronizar CTA primário em posição fixa (rodapé do card).  
4. **[P1]** Tela de encerramento com checklist concluível.  
5. **[P2]** Skeleton/loading e mensagens de estado para robustez percebida.

## Perspectiva 5 — Microcopy institucional
### Pontos fortes
- Tom geral é institucional, não sensacionalista.
- Há orientações protetivas e anti-revitimização em trechos importantes.
- CTA de emergência usa verbos fortes e objetivos.

### Fricções
1. Frases longas em alguns blocos reduzem escaneabilidade.  
2. Termos técnicos aparecem sem definição imediata no contexto.  
3. Verbos próximos (notificar/comunicar/encaminhar/acionar) sem taxonomia fixa por papel.

### Riscos
- Interpretação ambígua de responsabilidade de professor x direção.
- Conduta inadequada por compreensão parcial.
- Risco jurídico por linguagem aparentemente investigativa.

### Recomendações
1. **[P0]** Guia terminológico único com verbos operacionais padronizados.  
2. **[P0]** Estrutura textual padrão: “Faça / Não faça / Escale / Registre”.  
3. **[P1]** CTAs específicos com sujeito + ação + canal (“Acionar SAMU 192 agora”).  
4. **[P1]** Reduzir blocos para frases de até 18 palavras em contexto crítico.  
5. **[P2]** Inclusão de exemplos de fala segura (“frases prontas”).

## Perspectiva 6 — Acessibilidade e usabilidade educacional
### Pontos fortes
- Foco visível em componentes críticos.
- Navegação simplificada por pergunta única.
- Botões com área razoável e contraste base adequado.

### Fricções
1. Ausência de evidência automatizada de contraste WCAG em todo fluxo.  
2. Sem comprovação completa de navegação por teclado ponta-a-ponta no wizard.  
3. Potencial de leitura extensa em saída para usuários com baixa escolaridade funcional.  
4. Ausência de camada multilíngue para comunidades imigrantes.

### Riscos
- Exclusão de usuários com baixa visão/dislexia.
- Falha operacional em crise por leitura longa.
- Dependência excessiva de literacia textual.

### Recomendações
1. **[P0]** Auditoria WCAG formal (contraste, headings, landmarks, foco, aria).  
2. **[P1]** Modo alto contraste e tipografia ampliada.  
3. **[P1]** Conteúdo em bullets curtos e ícones reforçadores.  
4. **[P1]** Navegação por teclado validada com roteiro de testes.  
5. **[P2]** Estratégia de internacionalização (PT/ES inicial).

## Perspectiva 7 — Auditor institucional de protocolo
### Pontos fortes
- Cobertura temática ampla (saúde mental, física, violência, pedagógico, dúvida).
- Várias folhas já trazem notificação obrigatória e referência normativa.
- Alertas de boas práticas existem no conteúdo estruturado.

### Fricções
1. Falta rastro auditável persistente de consulta e decisão executada.  
2. Encerramento institucional não padronizado em todos os desfechos.  
3. Atualização de contatos depende manutenção manual sem painel de governança.

### Riscos
- Inconsistência entre recomendação e execução real.
- Fragilidade em auditoria externa de conformidade.
- Desatualização silenciosa de rede/telefones.

### Recomendações
1. **[P0]** Checkpoint obrigatório de “gestão acionada?” em cenários críticos.  
2. **[P0]** Resumo exportável da decisão orientada (sem dados sensíveis no app).  
3. **[P1]** Rotina de verificação de contatos com data de validade visível.  
4. **[P1]** Matriz de conformidade legal por folha (obrigatório/recomendado).  
5. **[P2]** Versionamento visual por bloco/cenário.

---

## 9.4 Mapa de Fricções (Hesitação, Erro, Abandono)

| Localização | Fricção identificada | Impacto | Severidade | Tipo | Solução proposta |
|---|---|---|---|---|---|
| Triagem inicial | Sobreposição entre categorias em casos híbridos | Dúvida 20–40s; rota possivelmente inadequada | Alta | A | Pré-pergunta de desambiguação antes da categoria |
| Resultado (folha) | Muitos blocos com peso visual similar | Usuário ignora obrigação legal/prazo | Alta | B | Hierarquia: topo “Ação prioritária”, depois “Escalar”, depois “Registrar” |
| Resultado (registro) | “Registro obrigatório” sem reforço de canal oficial | Falso senso de conformidade legal | Crítica | B | Banner fixo “não substitui registro formal” + CTA externo |
| Mobile emergência | CTA emergencial aparece só em certos nós | Perda de segundos em crise | Alta | B | Botão emergência persistente com confirmação contextual |
| Perguntas longas | Frases extensas em cenário tenso | Lentidão cognitiva, abandono | Média | C | Limite de 1 ideia por linha + glossário inline |
| Histórico mobile | Necessidade de expandir manualmente | Baixa visão do percurso | Média | A | Mini breadcrumb sempre visível no topo |
| Serviços múltiplos | Diferença entre principal/complementar não operacionalizada | Acionamento em ordem errada | Média | B | Numerar sequência: 1º ligar X, 2º comunicar Y |
| Encerramento | Falta “consulta concluída” inequívoco | Usuário incerto sobre próximos passos | Média | C | Tela de fechamento com checklist e confirmação |
| Termos técnicos | Jargões sem explicação imediata | Erro por interpretação parcial | Média | A | Tooltips/glossário contextual no próprio card |
| SLA legal | Prazos não padronizados por severidade | Atraso de notificação | Alta | B | Chips de prazo com código visual + texto obrigatório |

---

## 9.5 Auditoria de Microcopy (antes/depois)

### 1) Título da home do decisor
**LOCALIZAÇÃO:** Header da página Decisor  
**TEXTO ATUAL:** “Protocolo de atendimento rápido”  
**NOVA VERSÃO SUGERIDA:** “Guia de decisão rápida (não substitui registro oficial)”  
**JUSTIFICATIVA:**
- **Clareza:** torna explícito o escopo em leitura única.
- **Redução de ambiguidade:** separa orientação de formalização.
- **Adequação ao público:** reduz dúvida operacional para professor e apoio.
- **Risco institucional:** evita interpretação de quitação legal no app.
- **Alinhamento MVP:** reforça missão de guia, não sistema de casos.

### 2) Prompt de pergunta
**LOCALIZAÇÃO:** Bloco de pergunta do wizard  
**TEXTO ATUAL:** “Escolha uma opção para continuar o protocolo.”  
**NOVA VERSÃO SUGERIDA:** “Escolha a opção mais próxima do que você vê agora.”  
**JUSTIFICATIVA:**
- Clareza comportamental em tempo real.
- Reduz indecisão por perfeccionismo (“opção exata”).
- Linguagem mais simples para equipe não pedagógica.
- Menos risco de paralisia decisória.
- Mantém foco em orientação imediata.

### 3) Fallback de incerteza
**LOCALIZAÇÃO:** Botão adicional no QuestionStep  
**TEXTO ATUAL:** “Não sei / preciso de apoio”  
**NOVA VERSÃO SUGERIDA:** “Não tenho certeza — acionar apoio da gestão”  
**JUSTIFICATIVA:**
- Explicita próximo passo.
- Elimina ambiguidade do “apoio” genérico.
- Funciona melhor para funcionários administrativos.
- Protege instituição ao antecipar escalonamento.
- Preserva escopo do guia.

### 4) CTA de emergência
**LOCALIZAÇÃO:** EmergencyCTA  
**TEXTO ATUAL:** “EMERGÊNCIA 190/192”  
**NOVA VERSÃO SUGERIDA:** “Risco iminente: ligar 190/192 agora”  
**JUSTIFICATIVA:**
- Clareza de ação imediata.
- Evita interpretação informativa/passiva.
- Linguagem universal para todos os perfis.
- Reduz omissão em minutos críticos.
- Mantém caráter de orientação emergencial.

### 5) Bloco “O que fazer agora”
**LOCALIZAÇÃO:** ActionCard (folha)  
**TEXTO ATUAL:** “O que fazer agora” + lista  
**NOVA VERSÃO SUGERIDA:** “Ação imediata (próximos 5 minutos)”  
**JUSTIFICATIVA:**
- Introduz janela temporal objetiva.
- Diminui ambiguidade sobre urgência.
- Facilita execução por equipe sob pressão.
- Reduz risco de atraso jurídico/assistencial.
- Compatível com fluxo MVP.

### 6) Registro obrigatório
**LOCALIZAÇÃO:** ActionCard  
**TEXTO ATUAL:** “Registro obrigatório”  
**NOVA VERSÃO SUGERIDA:** “Registro formal obrigatório (fora deste app)”  
**JUSTIFICATIVA:**
- Esclarece limite do produto.
- Evita interpretação de que registro ocorreu no sistema.
- Acessível para todos os perfis.
- Protege juridicamente a escola.
- Alinha com escopo MVP declarado.

### 7) Justificativa
**LOCALIZAÇÃO:** ActionCard  
**TEXTO ATUAL:** “Justificativa”  
**NOVA VERSÃO SUGERIDA:** “Por que essa ação protege o estudante”  
**JUSTIFICATIVA:**
- Clareza sem tecnicismo.
- Reduz leitura abstrata.
- Aumenta adesão comportamental.
- Evita linguagem de investigação/diagnóstico.
- Mantém função educativa do guia.

### 8) Alertas de proibição
**LOCALIZAÇÃO:** AlertPanel  
**TEXTO ATUAL:** variável por regra/categoria  
**NOVA VERSÃO SUGERIDA (template):** “NÃO faça sozinho: [conduta proibida]. Acione: [gestão/rede].”  
**JUSTIFICATIVA:**
- Padroniza tom de segurança.
- Remove ambiguidades contextuais.
- Melhor para baixa literacia funcional.
- Reduz erro crítico e risco institucional.
- Preserva objetividade MVP.

### 9) CTA final
**LOCALIZAÇÃO:** Saída do fluxo  
**TEXTO ATUAL:** “Consultar protocolo oficial”  
**NOVA VERSÃO SUGERIDA:** “Abrir protocolo oficial e concluir registro formal”  
**JUSTIFICATIVA:**
- Fecha ciclo orientação→formalização.
- Elimina lacuna de responsabilidade.
- Direto para gestão/secretaria.
- Mitiga exposição jurídica.
- Fortalece escopo institucional.

### 10) Mensagem de erro de fluxo
**LOCALIZAÇÃO:** fallback de nó inexistente  
**TEXTO ATUAL:** “Erro: fluxo não encontrado.”  
**NOVA VERSÃO SUGERIDA:** “Não foi possível carregar este caminho. Reinicie e comunique a coordenação.”  
**JUSTIFICATIVA:**
- Dá ação concreta.
- Evita abandono sem escalonamento.
- Linguagem simples, sem tecnicismo.
- Reduz risco de omissão por falha técnica.
- Mantém papel de suporte decisório.

---

## 9.6 Top 15 melhorias prioritárias

### #1 [P0] — Encerramento institucional obrigatório em toda folha
**Problema:** saída atual pode não forçar leitura de escalonamento/registro.  
**Impacto:** risco de decisão incompleta e exposição jurídica.  
**Solução:** bloco único “AGORA / ESCALAR / REGISTRAR FORMALMENTE” com checklist.  
**Esforço:** Médio.

### #2 [P0] — Banner fixo de escopo legal
**Problema:** usuários podem confundir orientação com cumprimento legal.  
**Impacto:** falsa conformidade documental.  
**Solução:** banner persistente no decisor e nas folhas: “não substitui notificação oficial”.  
**Esforço:** Baixo.

### #3 [P0] — Sistema visual de prazo (SLA)
**Problema:** prazos aparecem, mas sem padronização de criticidade.  
**Impacto:** atrasos de notificação obrigatória.  
**Solução:** chips “IMEDIATO / ATÉ 2H / HOJE / 24H / 48H”.  
**Esforço:** Médio.

### #4 [P0] — CTA de emergência sempre acessível
**Problema:** CTA depende do nó atual.  
**Impacto:** tempo perdido em emergência real.  
**Solução:** botão fixo global + confirmação contextual.  
**Esforço:** Baixo.

### #5 [P0] — Microcopy anti-erro padronizada
**Problema:** proibições críticas variam por contexto.  
**Impacto:** condutas inseguras (confronto, sigilo absoluto).  
**Solução:** template “NÃO faça / FAÇA / ESCALE”.  
**Esforço:** Médio.

### #6 [P1] — Pré-triagem de desambiguação
**Problema:** sobreposição de categorias iniciais.  
**Impacto:** rota errada e retrabalho.  
**Solução:** 2 perguntas filtro antes da categoria principal.  
**Esforço:** Médio.

### #7 [P1] — Resultado com camadas colapsáveis
**Problema:** densidade alta na folha final.  
**Impacto:** leitura parcial de conteúdo crítico.  
**Solução:** acordeões por prioridade (imediato, encaminhamento, legal).  
**Esforço:** Médio.

### #8 [P1] — Sequência operacional numerada
**Problema:** principal vs complementar sem ordem temporal explícita.  
**Impacto:** acionamento invertido.  
**Solução:** “1º ligue X, 2º comunique Y, 3º registre Z”.  
**Esforço:** Baixo.

### #9 [P1] — Glossário contextual inline
**Problema:** dependência de navegação externa para termos-chave.  
**Impacto:** hesitação de usuário administrativo.  
**Solução:** tooltip/popover em termos técnicos críticos.  
**Esforço:** Baixo.

### #10 [P1] — Evidência de conformidade acessível
**Problema:** falta verificação formal WCAG contínua.  
**Impacto:** barreira de uso para baixa visão/dislexia.  
**Solução:** rotina de testes de contraste, navegação teclado e semântica.  
**Esforço:** Médio.

### #11 [P1] — Exportação de resumo da consulta
**Problema:** sem artefato para acoplamento à rotina institucional.  
**Impacto:** perda de continuidade entre decisão e secretaria/gestão.  
**Solução:** exportar resumo sem dados sensíveis (PDF/impressão estruturada).  
**Esforço:** Médio.

### #12 [P1] — Checkpoint “gestão acionada?”
**Problema:** escalonamento pode ficar implícito.  
**Impacto:** falha de governança em caso grave.  
**Solução:** confirmação obrigatória em cenários de alto/emergencial/proteção.  
**Esforço:** Médio.

### #13 [P2] — Atalhos na home para cenários frequentes
**Problema:** entrada pode ser lenta para ocorrências recorrentes.  
**Impacto:** segundos preciosos em crise.  
**Solução:** cards rápidos (Autolesão, Agressão, Desmaio, Violência sexual).  
**Esforço:** Baixo.

### #14 [P2] — Modo leitura simplificada
**Problema:** diferentes níveis de letramento no público.  
**Impacto:** aumento de erro por compreensão parcial.  
**Solução:** toggle “linguagem simples” em frases curtas.  
**Esforço:** Médio.

### #15 [P3] — Refino visual de severidade por ícone
**Problema:** severidade depende muito de badge/cor.  
**Impacto:** legibilidade menor para daltonismo.  
**Solução:** adicionar ícones e padrões visuais redundantes por nível de risco.  
**Esforço:** Baixo.

---

## 9.7 Diretrizes estratégicas para revolucionar a UI

### 7.1 Princípios visuais (6)
1. **Clareza > estética:** decisão correta sempre vence ornamentação.  
2. **Urgência sem pânico:** sinalizar criticidade com precisão, sem alarmismo.  
3. **Escopo explícito:** orientar não é registrar formalmente.  
4. **Mobile-first real:** todo fluxo crítico deve ser executável com uma mão.  
5. **Progressão visível contínua:** usuário sempre sabe etapa atual e próxima.  
6. **Acessibilidade por redundância:** cor + texto + ícone em qualquer alerta crítico.

### 7.2 Estrutura de layout recomendada
#### Tela inicial
- Cards de entrada por cenário com subtítulo operacional (“quando usar”).
- Botão **Emergência** fixo inferior direito (mobile) e topo (desktop).
- Acesso rápido a glossário e versão normativa.

#### Tela de triagem
- Uma pergunta por tela.
- Barra de progresso curta (“Passo 2 de 4”).
- Botões fixos: **Voltar** e **Cancelar com segurança**.

#### Tela de resultado
- Topo: **Ação prioritária** (1 frase + CTA primário).
- Meio: sequência numerada de encaminhamentos.
- Base: obrigação legal + prazo + CTA de registro formal.
- Contatos críticos sempre visíveis sem scroll profundo.

### 7.3 Simplificação de fluxos
- Atalhos de alto volume na home.
- Pré-filtro para reduzir bifurcações ambíguas.
- Preenchimento automático de data/hora no resumo exportável (sem persistência de caso no MVP).

### 7.4 Sistema de feedback
- Confirmar ações críticas (ex.: “Você está ligando para 192”).
- Estado de carregamento discreto em consultas/rotas.
- Erros com saída prática (“como corrigir agora”).
- Sucesso com próximos passos obrigatórios.

### 7.5 Estratégia de consistência
- **Botões:** primário (ação crítica), secundário (navegação), terciário (apoio), perigo (emergência).
- **Cards:** título curto, ação imediata, justificativa curta, CTA.
- **Alertas:** info/atenção/perigo/sucesso com ícone fixo.
- **Formulários:** labels explícitas, placeholders educativos, validação em linha.

### Anexo A — Wireframe textual proposto (MVP-safe)

```text
[Header]
Guia de decisão rápida (não substitui registro oficial)
[Botão fixo: Emergência 190/192]

[Passo 2 de 4]  [Voltar] [Reiniciar]
Pergunta: Há risco imediato à integridade física?
( ) Sim  ( ) Não  ( ) Não tenho certeza — acionar gestão

--- Resultado ---
[AÇÃO IMEDIATA - destaque vermelho controlado]
Ligar 192 e comunicar Direção agora.

[SEQUÊNCIA]
1. Garantir segurança física do estudante
2. Acionar serviço principal
3. Comunicar gestão e registrar formalmente

[PRAZO LEGAL]
IMEDIATO

[CTA]
Abrir protocolo oficial e concluir registro formal
```

### Anexo B — Exemplo de token visual sugerido
- `risk.emergencial = #B91C1C`
- `risk.alto = #EA580C`
- `risk.moderado = #CA8A04`
- `risk.baixo = #166534`
- Sempre acompanhado de ícone + texto (`[!] Emergencial`, `[▲] Alto`, etc.).

---

## 9.8 Checklist final de MVP UI (PASS/FAIL)

| Critério | Status | Observações |
|---|---|---|
| Usuário identifica propósito em < 5s | PASS | Header e disclaimer comunicam “assistente de decisão”. |
| Cenários críticos têm caminho claro | PASS | Árvore cobre emergência, violência, saúde e dúvida; revisão fina de cobertura contínua recomendada. |
| Contatos de emergência em ≤ 2 cliques | PASS | Telefones e rede acessíveis; melhorar persistência de CTA global. |
| Textos críticos evitam jargões técnicos | FAIL | Ainda há termos técnicos sem explicação contextual imediata. |
| Mobile sem zoom (fonte mínima adequada) | PASS | Base visual é responsiva; validar casos extremos em aparelhos 5". |
| Contraste WCAG 2.1 AA | FAIL | Sem evidência formal completa de medição para todo o fluxo. |
| Obrigações legais destacadas | PASS | Existem em folhas e referências; falta padrão visual de SLA. |
| Sistema previne ações de risco com alertas | PASS | Há alertas e boas práticas anti-erro. |
| Fluxo mais longo ≤ 5 passos | PASS | Estrutura do wizard tende a caminhos curtos. |
| Diferencia “orientação” de “registro oficial” | PASS | Disclaimer existe; reforçar no encerramento de cada folha. |
| Glossário para termos inevitáveis | PASS | Existe página de glossário. |
| Botões primários consistentes | FAIL | Necessita padronização plena de hierarquia em todas as telas/estados. |
| Usuário pode voltar sem perder progresso | PASS | Voltar/reiniciar e histórico disponíveis. |
| Telas de emergência com máx. 3 ações principais | PASS | Estrutura já limita lista principal em saídas. |
| Confirma ações críticas | FAIL | Ainda não há confirmação explícita de execução crítica (ligação/notificação). |

**RESULTADO FINAL:** **11 de 15 PASS**  
**STATUS MVP:** **☑ REQUER AJUSTES (10–12 PASS)**

---

## Conclusão Executiva
A UI atual do DECISOR já é operacionalmente valiosa e institucionalmente promissora. O salto para referência regional depende menos de novas funcionalidades e mais de **clareza decisória de alto risco**: padronizar encerramento, reforçar escopo legal, reduzir ambiguidade textual e elevar acessibilidade formal. Com as ações P0/P1 propostas, o produto pode evoluir rapidamente para um padrão de excelência replicável em outras escolas públicas sem fugir do MVP.
