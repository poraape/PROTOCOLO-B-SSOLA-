# Protocolo Bússola
### Sistema de apoio à decisão escolar

## O que é o Decisor Escolar
O **Decisor Escolar** é um wizard de perguntas rápidas que orienta professores e gestão sobre **o que fazer agora**, **quem acionar** e **quando acionar** em situações de risco, vulnerabilidade, convivência e saúde no contexto escolar.

> O foco é ação imediata com segurança institucional, sem substituir o protocolo oficial.

## Como usar (3 passos)
1. **Classifique a situação** respondendo às perguntas do wizard.
2. **Leia o resultado hierarquizado**: classificação, prioridade, resumo, ação imediata e serviço principal.
3. **Acione a rede** (serviço principal + complementares) e **informe a gestão escolar** quando indicado.

## Limites do sistema
- O sistema **não é gestão/registro de casos**.
- O sistema **não substitui** direção, supervisão ou autoridade competente.
- O sistema **não remove** necessidade de seguir protocolo institucional oficial.

## Categorias do decisor
- Saúde emocional / comportamento
- Violação de direitos / violência
- Vulnerabilidade social / familiar
- Convivência escolar / conflito
- Dificuldade pedagógica persistente
- Saúde física / queixa clínica
- Não sei / preciso de apoio

## Fluxogramas
- Fluxos Mermaid + texto dos cenários da árvore: [docs/fluxogramas/decision-tree-cenarios.md](docs/fluxogramas/decision-tree-cenarios.md)

## Estrutura técnica (fonte de verdade)
- Dados do protocolo: `content/protocolData.ts`
- Tipos: `types.ts`
- Wizard: `components/DecisionWizard.tsx`
- Resultado (folha): `components/ActionCard.tsx`

## Scripts
```bash
npm install
npm run dev
npm run build
npm run test
```
