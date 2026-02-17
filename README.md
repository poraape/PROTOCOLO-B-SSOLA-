# Protocolo Bússola
### **Sistema de Apoio à Decisão Escolar** · *“Proteção como ato de coragem”*

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Status](https://img.shields.io/badge/Status-Stable-2EA043)

> **🔒 Privacidade Absoluta**  
> Este app **não coleta dados**. Todo o processamento ocorre no navegador do usuário.

---

## 1) Sobre o Projeto

O **Protocolo Bússola** foi criado para a **E.E. Ermelino Matarazzo (CIE 2835 - DE Leste 1/SP)** como uma ferramenta prática de apoio ao professor e à gestão escolar em situações de violência, vulnerabilidade e risco.

A proposta do produto é transformar um protocolo originalmente em papel (PDF extenso) em um **Wizard de Decisão Interativo**, rápido de usar em contexto real de escola.

Base normativa institucional:
- **Protocolo de Acolhimento Fev/2026**
- Referências do **CONVIVA/SP**
- Diretrizes do **ECA** e marcos educacionais aplicáveis

### Módulos principais
- **Decisor (Fluxos):** árvore guiada de perguntas e ações imediatas.
- **Rede de Proteção:** contatos territoriais com telefone clicável e rota por mapas.
- **Documentos:** gerador de formulário para registro (Anexo I) e apoio à formalização de encaminhamentos.

---

## 2) Funcionalidades-Chave

- ⚡ **Decisão Rápida**  
  Navegação guiada para casos urgentes com foco em ação imediata e redução de dúvida operacional.

- 📱 **PWA / Offline-First**  
  Aplicação preparada para uso progressivo em ambientes de conectividade instável, com experiência de app em dispositivo móvel.

- 🖨️ **Gerador de Documentos**  
  Criação de conteúdo para **Anexo I** e apoio a registros sem depender de editor externo.

- 📍 **Rede Territorial da Zona Leste**  
  Serviços como **UBS Ermelino**, **CAPS IJ**, **CRAS**, **Conselho Tutelar** e emergências (190/192) organizados para acionamento rápido.

---

## 3) Instalação e Execução (Desenvolvimento)

### Pré-requisitos
- **Node.js 20+** (recomendado: Node 20 LTS)
- **npm 10+**

### Comandos

```bash
npm install
npm run dev
npm run build
```

### Scripts disponíveis
- `npm run dev` → inicia ambiente local de desenvolvimento.
- `npm run build` → gera build de produção.
- `npm run preview` → pré-visualiza build localmente.

---

## 4) Arquitetura de Dados (o “cérebro” do sistema)

> **Seção crítica para manutenção.**

A lógica de negócio **não deve ficar hardcoded nas páginas**.  
O projeto adota **Single Source of Truth** em `data.ts`.

**Regra de profundidade do decisor:** O decisor não deve ultrapassar 5 perguntas por caminho.

### Regra de manutenção
Se você precisar:
- alterar telefone,
- atualizar endereço,
- mudar regras de fluxo,
- incluir/editar campos de anexos,

edite prioritariamente **`data.ts`** (e, quando necessário, `types.ts`).

As páginas (`pages/`) devem apenas **consumir** essa estrutura.

### Exemplo simplificado de estrutura de fluxo

```ts
export const PROTOCOL_DATA = {
  decisionTree: [
    {
      id: 'root',
      question: 'Qual é o tipo principal da demanda?',
      options: [
        { label: '🏥 SAÚDE', nextNodeId: 'saude_tipo' },
        { label: '🚨 EMERGÊNCIA', nextNodeId: 'emergencia_folha' }
      ]
    },
    {
      id: 'emergencia_folha',
      question: 'Risco de vida iminente.',
      isLeaf: true,
      riskLevel: 'EMERGENCIAL',
      serviceIds: ['samu', 'policia-militar'],
      guidance: ['Acionar imediatamente SAMU (192) e/ou Polícia Militar (190).']
    }
  ],
  services: [/* diretório territorial */],
  documentTemplates: [/* anexos e campos obrigatórios */]
};
```

---

## 5) Stack Tecnológico

- **React + Vite**
- **TypeScript**
- **Tailwind CSS**
- Arquitetura **client-side only** (sem backend de aplicação)
- Preparado para hospedagem gratuita em **Vercel** ou **GitHub Pages**

---

## 6) Deploy (Custo Zero) – Vercel

### Passo a passo rápido
1. Faça push do repositório para GitHub.
2. Acesse [https://vercel.com](https://vercel.com) e faça login.
3. Clique em **Add New Project**.
4. Conecte o repositório do projeto.
5. Confirme as configurações (Vite geralmente é detectado automaticamente):
   - Build command: `npm run build`
   - Output directory: `dist`
6. Clique em **Deploy**.
7. Após publicar, teste rotas principais (`/`, `/decisor`, `/rede`, `/recursos`).

> Dica: para ambientes institucionais, registre o domínio em menu fácil (atalho na tela inicial dos dispositivos da escola).

---

## 7) Estrutura de Pastas

```text
.
├── components/          # Componentes reutilizáveis de UI (ex.: Layout, Wizard, ActionCard, SchoolShield)
├── pages/               # Páginas/rotas principais da aplicação
├── data.ts              # Fonte única dos dados e regras do protocolo (Single Source of Truth)
├── types.ts             # Tipagem central das entidades (fluxos, serviços, documentos)
├── App.tsx              # Registro de rotas da aplicação
├── index.tsx            # Bootstrap React
├── index.css            # Estilos globais
├── index.html           # HTML base + configuração Tailwind CDN
├── vite.config.ts       # Configuração de build/dev do Vite
└── README.md            # Documento institucional/técnico do projeto
```

---

## 8) Jurídico e Créditos

### Aviso de responsabilidade
Este software é uma ferramenta de **apoio à decisão**.  
A decisão final, os encaminhamentos formais e a responsabilidade funcional permanecem com os profissionais e autoridades competentes.

### Créditos institucionais
- Equipe pedagógica e gestora da **E.E. Ermelino Matarazzo**.
- Base legal e orientadora: **ECA**, **LDB**, normativas e diretrizes de proteção escolar aplicáveis no Estado de São Paulo.

---

## 9) Compromisso Público

O Protocolo Bússola existe para apoiar quem está na linha de frente da escola pública:  
**agir com rapidez, registrar com qualidade e proteger com responsabilidade.**
