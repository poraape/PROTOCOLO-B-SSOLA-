# Linguagem e termos padronizados

## Objetivo
Padronizar o texto do Decisor Escolar para reduzir ambiguidade, orientar ação imediata e apoiar público iniciante (professores e gestão).

## Termos obrigatórios
- **O que fazer agora**: instrução inicial e objetiva para a primeira ação.
- **Quem acionar**: pessoas/serviços que devem ser comunicados.
- **Quando acionar**: prazo de acionamento (imediato, hoje, até 24h etc.).
- **Serviço principal**: canal prioritário para resolver a situação.
- **Serviços complementares**: canais adicionais de suporte.
- **Informe a gestão escolar**: aviso explícito para escalonamento institucional.
- **Conselho Tutelar (CT)**: usar esta forma em toda primeira menção.


## Template único para ação
Use o mesmo molde em ações principais e follow-up:

- **`Faça X agora | até Y | responsável Z`**

Exemplos:
- `Faça acionar o serviço principal agora | até 24h | responsável Direção`
- `Faça revisão de convivência agora | até 14 dias | responsável Coordenação`

## Diretrizes de redação
1. Use frases curtas e verbos no imperativo (ex.: “Acione”, “Registre”, “Informe”).
2. Evite jargão jurídico/técnico sem explicação.
3. Sempre declarar prioridade: **IMEDIATA**, **URGENTE** ou **ORIENTAÇÃO**.
4. Evitar termos vagos como “avaliar melhor” sem ação concreta.
5. Em caso de incerteza, preferir orientação de proteção: “escale para a gestão escolar”.

## Antes → Depois (exemplos)
- “Faça agora” → **“O que fazer agora”**.
- “Quem acionar” (lista plana) → **“Serviço principal” + “Serviços complementares”**.
- “Escalonar se necessário” → **“Informe a gestão escolar”**.
- “Conforme caso” → **“Quando acionar: hoje / imediato / até 24h”**.

## Observação institucional
O decisor é ferramenta de **apoio à decisão** e **não** substitui protocolo oficial nem cria registro de caso automatizado.

## Matriz de aplicação

| Termo/padrão | Componentes/arquivos onde deve aparecer | Exemplos válidos | Exemplos inválidos |
| --- | --- | --- | --- |
| **Rótulos obrigatórios de ação**: “O que fazer agora”, “Quem acionar”, “Quando acionar” | `components/decision/ResultScreen.tsx` (renderização do resultado), conteúdo dos nós finais em `content/protocolData.ts` | “**O que fazer agora:** Acione a direção e mantenha o estudante acompanhado.”<br>“**Quem acionar:** Gestão escolar + serviço de saúde.”<br>“**Quando acionar:** Imediato.” | “Próximos passos” (sem padrão), “Contatos úteis” (sem indicar responsabilidade), “Depois você vê o prazo”. |
| **Botões críticos com verbo de ação + contexto** | `components/decision/DecisionTreeNavigator.tsx` (ações primárias do fluxo), `components/decision/ResultScreen.tsx` (CTA final) | “Registrar decisão”, “Voltar uma etapa”, “Ver serviço principal”, “Iniciar novo caso”. | “Clique aqui”, “OK”, “Continuar” (sem contexto), “Próximo” (ambíguo para ação crítica). |
| **Fallback de incerteza com orientação protetiva** | `components/decision/QuestionStep.tsx` (opção “Não tenho certeza”), nós de fallback em `content/protocolData.ts` (`fallbackNextNodeId`, `leaf_duvida_padrao`, `cat_nao_sei_apoio`) | “Não tenho certeza — acionar apoio da gestão”, “Em caso de dúvida, informe a gestão escolar e registre o observado.” | “Não sei” (isolado), “Pular etapa”, “Decidir depois” (sem proteção ou escalonamento). |
| **Blocos de decisão com estrutura mínima padronizada** | Definições de nós em `content/protocolData.ts` (perguntas, opções e folhas), validações em `tests/unit/protocolData.test.mjs` | Pergunta objetiva + opções mutuamente exclusivas + fallback explícito.<br>Folha final com prioridade, ação imediata, acionamento e prazo. | Perguntas genéricas (“Avaliar melhor”), opções sobrepostas (“grave” vs “muito grave” sem critério), folha sem prazo de acionamento. |
| **Registro explícito em `protocolData` quando houver encaminhamento/escalação** | `content/protocolData.ts` (campos de nós e folhas), `scripts/migrateProtocolData.ts` (migração/consistência) | Nó com `fallbackNextNodeId` definido, folha com orientação de registro e escalonamento institucional quando aplicável. | Encaminhamento apenas na UI sem reflexo no dado-fonte, regras críticas apenas em texto solto fora de `protocolData`. |

### Regra de desempate entre design, conteúdo e desenvolvimento
Quando houver divergência entre microcopy da interface, documentação e implementação, prevalece a matriz acima com esta ordem de ajuste:
1. Atualizar o dado-fonte em `content/protocolData.ts`.
2. Alinhar renderização e rótulos nos componentes (`DecisionTreeNavigator`, `ResultScreen`, `QuestionStep`).
3. Atualizar documentação e exemplos para refletir o comportamento publicado.
