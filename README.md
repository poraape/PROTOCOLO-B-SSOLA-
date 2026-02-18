# Protocolo Bússola — Webapp institucional de acolhimento escolar

O **Protocolo Bússola** é um aplicativo web de apoio à decisão para situações de vulnerabilidade, risco e encaminhamento de estudantes no contexto escolar. O projeto foi estruturado para transformar protocolos institucionais longos em uma navegação prática por rotas, com orientação de ação imediata, consulta de rede de proteção e acesso a modelos de registro.

A solução é orientada a escolas iniciantes na implementação de protocolo de acolhimento: busca simplicidade operacional, linguagem direta e clareza de responsabilidade entre professor, coordenação e direção. O sistema **apoia** a decisão institucional, mas não substitui avaliação profissional, protocolos legais nem acionamento urgente da rede quando necessário.

No estado atual, o repositório é predominantemente frontend (React + Vite), com conteúdo institucional em arquivos TypeScript e Markdown. Há funcionalidades de consulta e navegação estruturada, porém com lacunas de governança típicas de MVP (como trilha de auditoria robusta e controle técnico de permissões).

## Como a escola usa na prática (fluxo resumido)
1. A equipe identifica uma situação e abre o **Decisor** (`/#/decisor`).
2. O app orienta classificação por risco e ação inicial.
3. A equipe consulta contatos em **Rede** (`/#/rede`).
4. Registra com apoio dos **Modelos** (`/#/modelos`).
5. Coordenação/direção conduzem encaminhamento e acompanhamento.

## Como rodar localmente
### Pré-requisitos
- Node.js 20+
- npm 10+

### Comandos
```bash
npm install
npm run dev
npm run build
npm test
```

## Documentação oficial do projeto
- Blueprint técnico institucional: `docs/01-blueprints/BLUEPRINT_TECNICO_INSTITUCIONAL.md`
- Blueprint usuário/comunidade: `docs/01-blueprints/BLUEPRINT_USUARIO_COMUNIDADE.md`
- Guia rápido operacional: `docs/04-uso-e-treinamento/GUIA_RAPIDO_OPERACIONAL.md`
- Privacidade e dados: `docs/03-governanca-e-lgpd/PRIVACIDADE_E_DADOS.md`
- Trilha de auditoria e registros: `docs/03-governanca-e-lgpd/TRILHA_DE_AUDITORIA_E_REGISTROS.md`
- Roadmap: `docs/06-roadmap/ROADMAP.md`
- Glossário institucional: `docs/00-visao-geral/GLOSSARIO.md`

## Estrutura resumida
- `App.tsx`: roteamento principal.
- `pages/`: telas e fluxos por módulo.
- `components/`: componentes compartilhados.
- `content/protocolData.ts`: fonte principal de dados e regras.
- `public/protocol/` e `public/anexos/`: documentos institucionais em markdown.
- `docs/`: documentação oficial de governança e operação.

## Status do projeto
**MVP funcional em desenvolvimento institucional contínuo.**

### Entregue
- Decisor com árvore de triagem.
- Rede de serviços e contatos.
- Consulta ao protocolo e anexos.
- FAQ, glossário e simulador.

### Lacunas críticas (prioridade)
- Controle de acesso por perfil (não implementado).
- Trilha de auditoria institucional (não implementada).
- Política formal de retenção/descarte e privacidade operacional detalhada.

---
Ferramenta de apoio institucional para proteção escolar responsável.
