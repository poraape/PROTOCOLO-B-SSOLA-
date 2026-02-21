# Protocolo Bússola — Guia Decisório Ágil para Contexto Escolar

Aplicação web institucional da **E.E. Ermelino Matarazzo** para apoio rápido à tomada de decisão em situações escolares de risco, vulnerabilidade, convivência e saúde.

O projeto resolve um problema operacional comum em escolas no início de implementação de protocolo: **transformar orientação normativa extensa em decisão prática e segura em poucos passos**. O foco do MVP é reduzir hesitação na ponta (docentes e equipe) e orientar o acionamento correto da rede, sem substituir os fluxos formais da unidade.

---

## 1️⃣ TÍTULO E DESCRIÇÃO OBJETIVA

O **Protocolo Bússola** é um webapp de uso interno que funciona como **guia decisório ágil** para situações críticas ou sensíveis no cotidiano escolar.

Ele foi estruturado para apoiar a equipe em quatro perguntas centrais:
- quando acionar;
- qual serviço acionar;
- em qual nível de gravidade;
- quando envolver formalmente a gestão escolar.

**Contexto institucional atual:** a solução atende uma escola em fase inicial de consolidação de protocolo de proteção e encaminhamento, oferecendo padronização mínima de decisão sem substituir governança institucional.

---

## 2️⃣ PROPOSTA DE VALOR E OBJETIVO

### Público-alvo
- Professores(as);
- Funcionários(as) da escola;
- Equipe gestora.

### Para que serve
- Apoiar decisão imediata com base em perguntas estruturadas;
- Reduzir dúvidas de encaminhamento sob pressão;
- Direcionar para serviços prioritários e complementares;
- Reforçar necessidade de comunicação e escalonamento para gestão.

### O que **NÃO** é
- **Não é** plataforma de registro de casos;
- **Não é** banco de dados institucional de ocorrências;
- **Não é** substituto de protocolo oficial, direção, órgãos legais ou sistemas formais.

### Benefícios práticos
- Resposta mais rápida e consistente entre equipes;
- Menor risco de omissão em situações sensíveis;
- Maior alinhamento entre decisão pedagógica e rede de proteção.

---

## 3️⃣ VISÃO GERAL FUNCIONAL — MVP ATUAL

### Implementado no MVP
- **Decisor Escolar** em formato wizard (pergunta por pergunta);
- Página de **Rede de Apoio** com contatos, filtros e mapa quando há coordenadas;
- Páginas de apoio: glossário, FAQ, simulador de cenários, versão/governança, fluxos por categoria;
- Visualização de protocolo e anexos em Markdown (consulta e impressão);
- Busca global com índice estático local (sem backend).

### Funcionamento do DECISOR
- Início por triagem de risco imediato;
- Classificação por categoria principal (emocional, direitos/violência, social, convivência, pedagógico, saúde física, dúvida);
- Encaminhamento para folhas de decisão com:
  - prioridade,
  - ação imediata,
  - serviço principal,
  - serviços complementares,
  - prazo,
  - indicação de registro,
  - orientação de comunicação à gestão.

### Estrutura de perguntas e saídas
- Árvore decisória com nó raiz, nós intermediários e nós folha padronizados;
- Cada folha consolida orientação prática e justificativa institucional;
- Há fallback explícito para incerteza (`leaf_duvida_padrao`).

### Diferenciação de serviços e acionamento da gestão
- Os serviços são organizados por natureza (emergência, saúde, proteção/direitos, social, educação/gestão);
- O fluxo sinaliza quando a gestão deve ser notificada e quando a urgência exige ação imediata (ex.: 190/192/193).

### Limitações atuais do MVP
- Sem autenticação de usuários;
- Sem persistência de dados em banco;
- Sem workflow formal de caso (abertura, tramitação, encerramento);
- Conteúdo e regras carregados localmente em arquivo de dados;
- Alguns módulos coexistem em camadas “MVP atual” e “compatibilidade legada”, exigindo harmonização futura.

---

## 4️⃣ ARQUITETURA E STACK TECNOLÓGICA

### Tecnologias
- **Frontend:** React + TypeScript + Vite;
- **Roteamento:** `react-router-dom` (HashRouter);
- **Mapas:** Leaflet + React-Leaflet;
- **Ícones:** Lucide React;
- **Testes:** Node test runner (`node --test`) para smoke/unit/e2e textual.

### Organização principal de pastas
- `components/`: componentes reutilizáveis e núcleo do decisor;
- `pages/`: telas roteadas da aplicação;
- `content/`: fonte de verdade do protocolo (árvore, serviços, metadados);
- `services/`: validações e regras auxiliares;
- `search/`: indexação estática e busca;
- `docs/`: documentação técnica e fluxogramas;
- `tests/`: verificações automatizadas;
- `public/`: protocolo/anexos e ativos estáticos.

### Componentes principais
- `DecisionWizard` (núcleo do decisor);
- `ActionCard` (resultado por folha);
- `QuestionStep`, `DecisionSummary`, `DecisionHistoryPanel`, `FlowBreadcrumb`, `EmergencyCTA`;
- `NetworkPage` + `NetworkMap` para apoio territorial.

### Navegação / rotas implementadas
Rotas centrais:
- `/` Início
- `/decisor`
- `/rede` e `/rede/:id`
- `/fluxos` e `/fluxos/:id`
- `/glossario`
- `/faq`
- `/simulador`
- `/protocolo`
- `/modelos`
- `/sobre` e `/versao`
- `/busca`

### Estratégia de modularização
- Regras e conteúdo concentrados em `content/protocolData.ts`;
- Composição de UI por subcomponentes no wizard;
- Camada de serviços para validação e fallback operacional.

---

## 5️⃣ FLUXO DE DECISÃO

Fluxo geral de uso do decisor:
1. Verificar risco imediato de vida/integridade;
2. Classificar a natureza predominante da situação;
3. Responder triagens específicas por categoria;
4. Receber orientação de ação, prioridade e encaminhamento;
5. Acionar gestão e rede conforme saída gerada.

### Lógica de gravidade
- Escalonamento por níveis (`BAIXO`, `MÉDIO`, `ALTO`, `EMERGENCIAL`);
- Priorização operacional (`ORIENTAÇÃO`, `URGENTE`, `IMEDIATA`);
- Em incerteza, o fluxo direciona para proteção e escalonamento institucional.

### Quando a gestão é acionada
- Situações graves/emergenciais;
- Violação de direitos e risco à integridade;
- Casos que exigem comunicação institucional formal;
- Situações dúbias que demandam decisão superior.

### Diferenciação dos serviços
- Emergência (190/192/193);
- Saúde (UBS/CAPS/UPA);
- Rede protetiva e direitos (Conselho Tutelar (CT), CREAS, Delegacia, Defensoria);
- Assistência social (CRAS/CREAS);
- Instâncias educacionais e governança da escola.

### Referência de fluxogramas
- Consulte `docs/fluxogramas/decision-tree-cenarios.md` para visualização Mermaid e descrição dos nós folha.

---

## 6️⃣ GUIA RÁPIDO DE USO

1. Acesse o **Decisor** (`/decisor`).
2. Responda às perguntas conforme os sinais observados no momento.
3. Leia a saída: prioridade, ação imediata, serviço principal e complementares.
4. Faça o acionamento indicado (rede e/ou emergência) e comunique a gestão quando orientado.
5. Realize o registro nos canais formais previstos pelo protocolo institucional.

---

## 7️⃣ INSTALAÇÃO E EXECUÇÃO LOCAL

### Pré-requisitos
- Node.js 20+ (recomendado);
- npm.

### Instalação
```bash
npm install
```

### Execução local
```bash
npm run dev
```

### Build de produção
```bash
npm run build
```

### Testes
```bash
npm run test
```

### Variáveis de ambiente
- Não há variáveis obrigatórias documentadas para o MVP atual.

### Deploy
- Projeto preparado para build estático via Vite.

---

## 8️⃣ PADRÕES DE CONTRIBUIÇÃO

- Manter `content/protocolData.ts` como fonte principal das regras e conteúdos decisórios;
- Evitar criar rotas/funcionalidades não refletidas no protocolo vigente;
- Priorizar nomenclatura clara e coerente entre tipos, dados e UI;
- Executar testes (`npm run test`) antes de submeter mudanças;
- Em alterações de conteúdo institucional, registrar revisão com gestão responsável.

---

## 9️⃣ ROADMAP PROSPECTIVO

> Itens abaixo são **projeções** e não funcionalidades atuais do MVP.

- Painel institucional de métricas agregadas (sem exposição indevida de dados pessoais);
- Módulo formal de registro com trilha de auditoria e perfis de acesso;
- Integração com sistemas oficiais (ex.: SED/Conviva), conforme governança e viabilidade técnica;
- Expansão de parametrização para replicação em outras unidades escolares;
- Fortalecimento de validações automáticas de consistência do fluxo decisório.

---

## 🔟 GOVERNANÇA E RESPONSABILIDADE INSTITUCIONAL

- O uso adequado da ferramenta exige atuação coordenada com a gestão escolar;
- A aplicação **não substitui** protocolo formal, normativas legais, dever funcional e análise profissional;
- Em risco à integridade, a resposta emergencial deve ocorrer sem atraso;
- O sigilo de informações de estudantes deve ser preservado conforme normas vigentes;
- Registros oficiais devem ocorrer nos instrumentos e sistemas institucionais apropriados (incluindo plataformas formais quando exigidas);
- O acionamento formal da direção/gestão permanece obrigatório nos casos previstos no protocolo.

---

## 1️⃣1️⃣ LICENÇA

Até o momento, **não há licença explicitamente definida** no repositório.

---

## ⚠️ Observações Técnicas Identificadas no Repositório

- Há coexistência de estruturas modernas do decisor e camadas de compatibilidade legada (`FLUXOS`, `CONTATOS`, `RECURSOS` derivados da mesma fonte), o que aumenta acoplamento de manutenção.
- Tipos e nomenclaturas apresentam variações próximas (`RiskLevel`, `RiskLevelV2`, `ProtocolRiskLevel`; `priority` vs `actionPriority`), sugerindo padronização futura para reduzir ambiguidade.
- Parte das verificações automatizadas é textual (assert por regex em fonte), útil para smoke rápido, porém limitada para garantir comportamento funcional completo em runtime.
- Alguns serviços da rede estão sinalizados no código como “verificação necessária”, indicando necessidade de rotina operacional de atualização de contatos.
- O módulo de busca é estático e em memória (reindexado no carregamento), adequado ao MVP, mas sem persistência, relevância avançada ou telemetria.
- Páginas de conteúdo (protocolo/anexos) fazem renderização Markdown simplificada e `dangerouslySetInnerHTML`; para evolução, recomenda-se política explícita de sanitização mais robusta.
- Não há backend institucional implementado; qualquer registro oficial permanece externo ao aplicativo (ex.: instrumentos e sistemas formais da rede).

---

## 1️⃣1️⃣ DIRETRIZES DE INTERFACE LIMPA (DECLUTTER)

Regras não negociáveis para telas críticas do DECISOR:

1. Máx. 80 palavras em tela crítica.
2. Máx. 3 decisões visíveis simultâneas.
3. Ação imediata sempre no primeiro bloco visual.
4. Máx. 1 sinalização (emoji/ícone) por card, sempre com texto.
5. Máx. 2 alertas por tela (1 crítico + 1 suporte).
6. Texto curto, preferencialmente em bullets orientados por verbo de ação.
7. Cor somente para risco, SLA e obrigatoriedade legal (sem uso decorativo).
8. Ação principal acima da dobra no mobile.


---

## Nova Versão V2 (Experimental)

A V2 do decisor introduz melhorias estruturais para triagem sob pressão:

- arquitetura hierárquica de decisão com níveis claros;
- triagem crítica obrigatória como primeira etapa;
- subfluxos por categoria sem pré-passos cosméticos;
- leaf executável (ação, contato, prazo e registro);
- persistência local de progresso e rastreabilidade simplificada.

### Como ativar a feature flag

1. Acesse `#/decisor`.
2. Marque **“Usar Nova Versão V2 (Experimental)”** no topo da tela.
3. Desmarque para retornar ao fluxo legado.

### Documentação técnica da V2

- [Arquitetura V2](docs/ARCHITECTURE-V2.md)
- [Guia de Migração](docs/MIGRATION-GUIDE.md)

### Screenshots

- Placeholder: incluir capturas de `DecisionScreen`, `CategoryGrid` e `ResultScreen` após validação funcional completa.
