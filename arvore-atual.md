# Árvore Decisória Atual (v2)

- Fonte: `data/decision-tree-migration.ts` (árvore ativa do `/decisor/*`)
- Versão no código: `3.0.0`
- Formato abaixo: perguntas/opções/resultados exatamente como modelados no código.

## Triagem Crítica (raiz)

TRIAGEM CRÍTICA: Há risco imediato de vida ou integridade física neste momento?
├── SIM → Seleção de risco imediato (`IMMEDIATE_RISK_SELECT`)
└── NÃO → Seleção de domínio (`DOMAIN_SELECT`)

## Risco Imediato (ramo emergencial)

SELEÇÃO DE RISCO IMEDIATO: Qual situação de risco imediato melhor descreve o caso?
├── Tentativa de suicídio / plano ativo (`suicidio-ativo`) → RESULTADO: EMERGENCY_LEAF [🆘 Acionar proteção imediata e ajuda emergencial | Risco: EMERGENCIAL | Urgência: IMMEDIATE]
├── Lesão grave / sangramento (`lesao-grave`) → RESULTADO: EMERGENCY_LEAF [🆘 Acionar proteção imediata e ajuda emergencial | Risco: EMERGENCIAL | Urgência: IMMEDIATE]
├── Violência em curso (`violencia-curso`) → RESULTADO: EMERGENCY_LEAF [🆘 Acionar proteção imediata e ajuda emergencial | Risco: EMERGENCIAL | Urgência: IMMEDIATE]
├── Intoxicação / desmaio (`intoxicacao-desmaio`) → RESULTADO: EMERGENCY_LEAF [🆘 Acionar proteção imediata e ajuda emergencial | Risco: EMERGENCIAL | Urgência: IMMEDIATE]
├── Abandono imediato (`abandono-imediato`) → RESULTADO: EMERGENCY_LEAF [🆘 Acionar proteção imediata e ajuda emergencial | Risco: EMERGENCIAL | Urgência: IMMEDIATE]
└── Violência sexual recente (`violencia-sexual-recente`) → RESULTADO: EMERGENCY_LEAF [🆘 Acionar proteção imediata e ajuda emergencial | Risco: EMERGENCIAL | Urgência: IMMEDIATE]

## Seleção de Domínio

SELEÇÃO DE DOMÍNIO: Selecione o domínio principal da situação observada.
├── Pedagógico (`pedagogico`) → `DOM_PEDAGOGICO_Q1`
├── Saúde mental (`saude-mental`) → `DOM_SAUDE_MENTAL_Q1`
├── Conflitos (`conflitos`) → `DOM_CONFLITOS_Q1`
├── Discriminação (`discriminacao`) → `DOM_DISCRIMINACAO_Q1`
├── Comportamento grave / ato infracional (`comportamento-grave`) → `DOM_COMPORTAMENTO_Q1`
├── Vulnerabilidade familiar (`vulnerabilidade-familiar`) → `DOM_VULNERABILIDADE_Q1`
├── Violação de direitos (`violacao-direitos`) → `DOM_DIREITOS_Q1`
├── Uso de substâncias (`uso-substancias`) → `DOM_SUBSTANCIAS_Q1`
├── Saúde física (`saude-fisica`) → `DOM_SAUDE_FISICA_Q1`
├── Gravidez e saúde sexual (`gravidez-saude-sexual`) → `DOM_GRAVIDEZ_Q1`
├── Inclusão / deficiência (`inclusao-deficiencia`) → `DOM_INCLUSAO_Q1`
└── Evasão (`evasao`) → `DOM_EVASAO_Q1`

## Árvores por Domínio (exato no código)

### DOMÍNIO: Pedagógico (`pedagogico`)

Pedagógico
└── Pergunta 1: "Há impacto pedagógico grave com risco de ruptura do vínculo escolar?" (`DOM_PEDAGOGICO_Q1`)
    ├── SIM → RESULTADO: LEAF_PEDAGOGICO_INTENSIVO [Plano pedagógico intensivo de permanência | Risco: MODERADO | Urgência: URGENT]
    └── NÃO → RESULTADO: LEAF_PEDAGOGICO_APOIO [Apoio pedagógico com acompanhamento de rotina | Risco: BAIXO | Urgência: SCHEDULED]

### DOMÍNIO: Saúde mental (`saude-mental`)

Saúde mental
└── Pergunta 1: "Há sinais persistentes de sofrimento emocional com prejuízo funcional?" (`DOM_SAUDE_MENTAL_Q1`)
    ├── SIM → RESULTADO: LEAF_SAUDE_MENTAL_PRIORITARIO [Cuidado prioritário em saúde mental | Risco: ALTO | Urgência: URGENT]
    └── NÃO → RESULTADO: LEAF_SAUDE_MENTAL_MONITORADO [Monitoramento de saúde mental com apoio escolar | Risco: MODERADO | Urgência: SCHEDULED]

### DOMÍNIO: Conflitos (`conflitos`)

Conflitos
└── Pergunta 1: "O conflito é recorrente e envolve ameaça/intimidação continuada?" (`DOM_CONFLITOS_Q1`)
    ├── SIM → RESULTADO: LEAF_CONFLITO_RECORRENTE [Intervenção estruturada para conflito recorrente | Risco: MODERADO | Urgência: URGENT]
    └── NÃO → RESULTADO: LEAF_CONFLITO_PONTUAL [Manejo educativo para conflito pontual | Risco: BAIXO | Urgência: SCHEDULED]

### DOMÍNIO: Discriminação (`discriminacao`)

Discriminação
└── Pergunta 1: "A discriminação tem gravidade moderada/grave ou repetição sistemática?" (`DOM_DISCRIMINACAO_Q1`)
    ├── SIM → RESULTADO: LEAF_DISCRIMINACAO_GRAVE [Resposta institucional para discriminação grave | Risco: ALTO | Urgência: URGENT]
    └── NÃO → RESULTADO: LEAF_DISCRIMINACAO_ORIENTATIVA [Intervenção educativa em discriminação inicial | Risco: MODERADO | Urgência: SCHEDULED]

### DOMÍNIO: Comportamento grave / ato infracional (`comportamento-grave`)

Comportamento grave / ato infracional
└── Pergunta 1: "Houve ato infracional ou comportamento com potencial de dano relevante?" (`DOM_COMPORTAMENTO_Q1`)
    ├── SIM → RESULTADO: LEAF_COMPORTAMENTO_GRAVE [Resposta para comportamento grave / ato infracional | Risco: ALTO | Urgência: URGENT]
    └── NÃO → RESULTADO: LEAF_COMPORTAMENTO_PREVENTIVO [Plano preventivo para comportamento de risco | Risco: MODERADO | Urgência: SCHEDULED]

### DOMÍNIO: Vulnerabilidade familiar (`vulnerabilidade-familiar`)

Vulnerabilidade familiar
└── Pergunta 1: "Há vulnerabilidade familiar intensa (fome, negligência ou desproteção recorrente)?" (`DOM_VULNERABILIDADE_Q1`)
    ├── SIM → RESULTADO: LEAF_VULNERABILIDADE_INTENSA [Proteção social intensiva | Risco: ALTO | Urgência: URGENT]
    └── NÃO → RESULTADO: LEAF_VULNERABILIDADE_ACOMPANHADA [Acompanhamento social orientado | Risco: MODERADO | Urgência: SCHEDULED]

### DOMÍNIO: Violação de direitos (`violacao-direitos`)

Violação de direitos
└── Pergunta 1: "Existe suspeita consistente de violação de direitos com necessidade de proteção formal?" (`DOM_DIREITOS_Q1`)
    ├── SIM → RESULTADO: LEAF_DIREITOS_PROTECAO [Proteção formal por violação de direitos | Risco: ALTO | Urgência: URGENT]
    └── NÃO → RESULTADO: LEAF_DIREITOS_ORIENTACAO [Orientação e proteção de direitos com monitoramento | Risco: MODERADO | Urgência: SCHEDULED]

### DOMÍNIO: Uso de substâncias (`uso-substancias`)

Uso de substâncias
└── Pergunta 1: "O uso de substâncias está associado a risco de dano recorrente?" (`DOM_SUBSTANCIAS_Q1`)
    ├── SIM → RESULTADO: LEAF_SUBSTANCIAS_PRIORITARIO [Encaminhamento prioritário por uso de substâncias | Risco: ALTO | Urgência: URGENT]
    └── NÃO → RESULTADO: LEAF_SUBSTANCIAS_ORIENTATIVO [Orientação preventiva para uso de substâncias | Risco: MODERADO | Urgência: SCHEDULED]

### DOMÍNIO: Saúde física (`saude-fisica`)

Saúde física
└── Pergunta 1: "Há necessidade de avaliação clínica no mesmo dia por sintomas relevantes?" (`DOM_SAUDE_FISICA_Q1`)
    ├── SIM → RESULTADO: LEAF_SAUDE_FISICA_URGENTE [Avaliação clínica no mesmo dia | Risco: ALTO | Urgência: URGENT]
    └── NÃO → RESULTADO: LEAF_SAUDE_FISICA_ROTINA [Encaminhamento clínico de rotina | Risco: BAIXO | Urgência: SCHEDULED]

### DOMÍNIO: Gravidez e saúde sexual (`gravidez-saude-sexual`)

Gravidez e saúde sexual
└── Pergunta 1: "Existe situação de risco psicossocial associada à gravidez/saúde sexual?" (`DOM_GRAVIDEZ_Q1`)
    ├── SIM → RESULTADO: LEAF_GRAVIDEZ_PROTECAO [Proteção e cuidado em gravidez/saúde sexual | Risco: MODERADO | Urgência: URGENT]
    └── NÃO → RESULTADO: LEAF_GRAVIDEZ_ACOMPANHAMENTO [Acompanhamento de rotina em gravidez/saúde sexual | Risco: BAIXO | Urgência: SCHEDULED]

### DOMÍNIO: Inclusão / deficiência (`inclusao-deficiencia`)

Inclusão / deficiência
└── Pergunta 1: "Há barreira grave de acesso/participação que exige intervenção imediata da gestão?" (`DOM_INCLUSAO_Q1`)
    ├── SIM → RESULTADO: LEAF_INCLUSAO_PRIORITARIA [Intervenção prioritária de inclusão e acessibilidade | Risco: MODERADO | Urgência: URGENT]
    └── NÃO → RESULTADO: LEAF_INCLUSAO_PLANO [Plano de inclusão com ajustes progressivos | Risco: BAIXO | Urgência: SCHEDULED]

### DOMÍNIO: Evasão (`evasao`)

Evasão
└── Pergunta 1: "Há risco iminente de evasão (faltas persistentes e rompimento de vínculo)?" (`DOM_EVASAO_Q1`)
    ├── SIM → RESULTADO: LEAF_EVASAO_BUSCA_ATIVA [Busca ativa para risco de evasão | Risco: ALTO | Urgência: URGENT]
    └── NÃO → RESULTADO: LEAF_EVASAO_PREVENCAO [Prevenção de evasão com plano de permanência | Risco: MODERADO | Urgência: SCHEDULED]

## Resumo rápido (domínio → resultados)

- `pedagogico` (Pedagógico): SIM => `LEAF_PEDAGOGICO_INTENSIVO` | NÃO => `LEAF_PEDAGOGICO_APOIO`
- `saude-mental` (Saúde mental): SIM => `LEAF_SAUDE_MENTAL_PRIORITARIO` | NÃO => `LEAF_SAUDE_MENTAL_MONITORADO`
- `conflitos` (Conflitos): SIM => `LEAF_CONFLITO_RECORRENTE` | NÃO => `LEAF_CONFLITO_PONTUAL`
- `discriminacao` (Discriminação): SIM => `LEAF_DISCRIMINACAO_GRAVE` | NÃO => `LEAF_DISCRIMINACAO_ORIENTATIVA`
- `comportamento-grave` (Comportamento grave / ato infracional): SIM => `LEAF_COMPORTAMENTO_GRAVE` | NÃO => `LEAF_COMPORTAMENTO_PREVENTIVO`
- `vulnerabilidade-familiar` (Vulnerabilidade familiar): SIM => `LEAF_VULNERABILIDADE_INTENSA` | NÃO => `LEAF_VULNERABILIDADE_ACOMPANHADA`
- `violacao-direitos` (Violação de direitos): SIM => `LEAF_DIREITOS_PROTECAO` | NÃO => `LEAF_DIREITOS_ORIENTACAO`
- `uso-substancias` (Uso de substâncias): SIM => `LEAF_SUBSTANCIAS_PRIORITARIO` | NÃO => `LEAF_SUBSTANCIAS_ORIENTATIVO`
- `saude-fisica` (Saúde física): SIM => `LEAF_SAUDE_FISICA_URGENTE` | NÃO => `LEAF_SAUDE_FISICA_ROTINA`
- `gravidez-saude-sexual` (Gravidez e saúde sexual): SIM => `LEAF_GRAVIDEZ_PROTECAO` | NÃO => `LEAF_GRAVIDEZ_ACOMPANHAMENTO`
- `inclusao-deficiencia` (Inclusão / deficiência): SIM => `LEAF_INCLUSAO_PRIORITARIA` | NÃO => `LEAF_INCLUSAO_PLANO`
- `evasao` (Evasão): SIM => `LEAF_EVASAO_BUSCA_ATIVA` | NÃO => `LEAF_EVASAO_PREVENCAO`

## Validação de extração

- Domínios detectados: `12`
- Cartões de risco imediato detectados: `6`
- Folhas `makeLeaf` detectadas: `25`
- Referências de folhas sem correspondência: `nenhuma`
- Opções na triagem crítica: `2`
- Opções em `DOM_SAUDE_MENTAL_Q1`: `2`
