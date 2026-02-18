# Auditoria Técnico-Estratégica — Webapp Institucional de Acolhimento Escolar

## 1) Auditoria do ambiente Vercel (GitHub → Vercel)

### Evidências verificadas
- `package.json` mantém scripts padrão de Vite (`dev`, `build`, `preview`) e suíte de testes local sem backend.
- `vite.config.ts` usa configuração padrão de frontend com plugin React e sem mudanças de `build.outDir`.
- Não existe `vercel.json` no repositório (deploy usando defaults do framework no Vercel).
- Router em `App.tsx` utiliza `HashRouter` (compatível com deploy estático sem rewrites).
- Build local (`npm run build`) gerou assets versionados com hash: `dist/assets/index-*.css` e `dist/assets/index-*.js`.

### Classificação
**Ambiente parcialmente configurado.**

### Fundamentação da classificação
- Pontos seguros: build Vite íntegro, hash de assets ativo, HashRouter adequado para hosting estático, pipeline test/build funcionando.
- Pontos de risco: presença de Tailwind via CDN em `index.html` (dependência de terceiro em runtime para CSS utilitário); isso pode afetar previsibilidade de disponibilidade e governança institucional.

---

## 2) Auditoria multiperspectiva (6 lentes)

### 1. Professor sob estresse
- O decisor apresenta fluxo guiado e CTA emergencial visível em cenários críticos.
- Ainda havia risco de perda de contexto com internet instável; mitigado com banner offline.
- Tempo de ação é adequado em casos comuns, mas depende da clareza dos contatos para cada escola.

### 2. Gestão escolar
- Há trilha de decisão por histórico, prazo e indicação de registro em folhas finais do fluxo.
- Disclaimer institucional foi reforçado para reduzir interpretação de automação decisória absoluta.
- Risco jurídico residual: dados de rede precisam governança recorrente (telefones e endereços).

### 3. Estudante
- Linguagem geral orientada a proteção e encaminhamento, sem exposição ostensiva de dados sensíveis do aluno.
- Necessidade contínua: revisão semântica periódica para evitar termos estigmatizantes em conteúdos longos.

### 4. Desenvolvedor
- Código modular com páginas e componentes por domínio.
- Introduzida centralização institucional (`schoolConfig.ts`) para reduzir hardcode transversal.
- Arquitetura continua escalável sem alterar máquina de estados.

### 5. Sustentação institucional
- Configuração institucional centralizada reduz dispersão de ajustes operacionais.
- Reduz necessidade de editar múltiplos arquivos TypeScript para identidade e emergência.

### 6. Auditor institucional
- Fluxos permanecem coerentes com níveis de risco e escalonamento.
- Melhorias de confiabilidade institucional aplicadas sem alterar estrutura central do decisor.

---

## 3) Scorecard objetivo (0–5)

| Dimensão | Peso | Nota | Evidência | Risco |
|---|---:|---:|---|---|
| Clareza de Fluxo | 5 | 4.5 | Fluxo guiado por etapas e histórico de decisão | Baixo |
| Ação Imediata | 5 | 4.7 | CTA de emergência e instruções “Faça agora” | Baixo |
| Segurança & Privacidade | 5 | 3.8 | Disclaimer + orientação offline; ainda com Tailwind CDN | Médio |
| Rastreabilidade | 4 | 4.3 | Bloco de prazo/registro e histórico de respostas | Baixo |
| Robustez em Ambiente Escolar | 5 | 4.2 | HashRouter, build estável, tratamento offline visual | Baixo |
| Escalabilidade Institucional | 4 | 4.4 | `schoolConfig.ts` como ponto único de identidade e emergência | Baixo |
| Acessibilidade | 3 | 4.0 | foco visível e testes smoke de acessibilidade existentes | Baixo |
| Governança Implícita | 4 | 4.1 | avisos institucionais e revisão recomendada no guia | Médio-Baixo |

### Fatos
- Build local aprovado com assets hash.
- Testes unitários/e2e aprovados.
- HashRouter em produção estática.
- Não há backend.

### Inferências
- O MVP está apto para demonstração institucional com baixo risco de quebra de pipeline.
- O principal risco técnico não bloqueante é dependência visual via CDN do Tailwind.

### Recomendações
- Em fase posterior, migrar Tailwind CDN para build local controlado (sem alterar arquitetura funcional).
- Instituir rotina trimestral de validação de rede de serviços.

---

## 4) Patches adaptativos (priorizados)

### PATCH-ID: P0-001-OFFLINE-DISCLAIMER
**PRIORIDADE:** P0  
**OBJETIVO:** aumentar confiança institucional em instabilidade de rede e reduzir ambiguidade de responsabilidade.  
**JUSTIFICATIVA:** professores em campo precisam indicação explícita quando estiverem offline e aviso institucional sempre visível.  
**ARQUIVOS AFETADOS:** `components/OfflineStatusBanner.tsx`, `App.tsx`, `components/Layout.tsx`  
**PASSO A PASSO TÉCNICO:** inserir banner reativo a `navigator.onLine`; renderizar acima das rotas; incluir disclaimer fixo no layout principal.  
**CRITÉRIO DE ACEITE:** ao desligar rede, banner aparece; disclaimer institucional visível em todas as páginas.  
**RISCO DE DEPLOY:** baixo.

### PATCH-ID: P1-001-SCHOOL-CONFIG
**PRIORIDADE:** P1  
**OBJETIVO:** centralizar dados institucionais para governança local sem alterar máquina de decisão.  
**JUSTIFICATIVA:** reduzir hardcode e esforço técnico para customização local.  
**ARQUIVOS AFETADOS:** `content/schoolConfig.ts`, `components/Layout.tsx`, `components/decision/EmergencyCTA.tsx`, `App.tsx`, `index.css`  
**PASSO A PASSO TÉCNICO:** criar config central; consumir nome/telefones/disclaimer nos componentes; aplicar variável de cor primária.  
**CRITÉRIO DE ACEITE:** alteração de `schoolConfig.ts` reflete identidade e telefones em runtime.  
**RISCO DE DEPLOY:** baixo.

### PATCH-ID: P3-001-CDN-HIGIENE-PARCIAL
**PRIORIDADE:** P3  
**OBJETIVO:** reduzir dependências externas não essenciais em runtime.  
**JUSTIFICATIVA:** governança técnica e previsibilidade institucional.  
**ARQUIVOS AFETADOS:** `index.html`, `index.tsx`  
**PASSO A PASSO TÉCNICO:** remover CDN de fonte e CSS do Leaflet; importar CSS do Leaflet localmente via pacote NPM.  
**CRITÉRIO DE ACEITE:** mapa renderiza sem erro visual e build permanece estável.  
**RISCO DE DEPLOY:** baixo.

### PATCH-ID: P3-002-TAILWIND-CDN-LOCAL (planejado)
**PRIORIDADE:** P3  
**OBJETIVO:** eliminar dependência Tailwind CDN mantendo comportamento visual.  
**JUSTIFICATIVA:** é o último elo crítico de dependência externa de estilo em runtime.  
**ARQUIVOS AFETADOS:** planejado (não aplicado nesta rodada).  
**PASSO A PASSO TÉCNICO:** configurar pipeline local de Tailwind com purge e tokens equivalentes.  
**CRITÉRIO DE ACEITE:** paridade visual e build estável no Vercel.  
**RISCO DE DEPLOY:** médio (mudança de toolchain CSS).

---

## 5) Relatório final

### Síntese executiva (gestão)
O sistema está em condição de **MVP institucional demonstrável**, com reforço de confiança operacional para professor (offline + aviso institucional), melhor capacidade de customização por escola e sem ruptura no fluxo GitHub → Vercel.

### Diagnóstico técnico
- Pipeline local íntegro (`test` e `build` aprovados).
- Estrutura do decisor preservada.
- Melhorias aplicadas por adição incremental de componentes/configuração.

### Lista priorizada de patches
1. P0-001-OFFLINE-DISCLAIMER ✅ aplicado.
2. P1-001-SCHOOL-CONFIG ✅ aplicado.
3. P3-001-CDN-HIGIENE-PARCIAL ✅ aplicado.
4. P3-002-TAILWIND-CDN-LOCAL 🕒 recomendado para próxima iteração.

### Riscos de deploy
- Baixo risco geral nesta entrega.
- Risco residual: indisponibilidade do CDN Tailwind afeta aparência.

### Recomendações para MVP piloto
- Validar telefones com rede local antes da apresentação.
- Simular três cenários críticos com equipe (emergência, suspeita grave, dúvida sem consenso).
- Definir responsável institucional por revisão trimestral do conteúdo.

### Checklist pré-apresentação institucional
- [ ] Build e testes rodados no commit final.
- [ ] Fluxo emergencial testado em celular.
- [ ] Impressão de uma decisão final validada pela gestão.
- [ ] Telefones críticos conferidos (190/192/193 + rede local).
- [ ] Versão protocolar e data de revisão comunicadas à equipe.

---

## 6) Simulação de deploy (por patch)

| Patch | Impacto Preview | Impacto Production | Teste manual | Probabilidade de quebra de build |
|---|---|---|---|---|
| P0-001 | imediato, sem migração | imediato | sim (toggle offline no browser) | muito baixa |
| P1-001 | imediato, mudança de conteúdo | imediato | sim (rotas, logo, telefones) | muito baixa |
| P3-001 | imediato, remove CDNs pontuais | imediato | sim (mapa e tipografia) | baixa |
| P3-002 (planejado) | exigirá validação visual completa | exigirá rollout cauteloso | obrigatório | média |
