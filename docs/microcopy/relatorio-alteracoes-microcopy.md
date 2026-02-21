## Alteração #001
**Arquivo:** `/components/ActionCard.tsx`
**Antes:** `Decisão concluída. Siga os passos.`
**Depois:** `Decisão registrada. Finalize os encaminhamentos.`
**Contexto:** Mensagem de sucesso na finalização do fluxo.
**Justificativa:** Maior precisão operacional e foco em próximos passos.
**Prioridade:** ALTA

---

## Alteração #002
**Arquivo:** `/components/ActionCard.tsx`
**Antes:** `Entendi / Concluir`
**Depois:** `Concluir e reiniciar triagem`
**Contexto:** CTA de fechamento da tela de resultado.
**Justificativa:** CTA explícito com consequência clara.
**Prioridade:** ALTA

---

## Alteração #003
**Arquivo:** `/components/ActionCard.tsx`
**Antes:** `Confirmar` / `Cancelar`
**Depois:** `Abrir protocolo oficial` / `Voltar ao resultado`
**Contexto:** Botões do modal de confirmação.
**Justificativa:** Elimina rótulos genéricos em ação crítica.
**Prioridade:** CRÍTICA

---

## Alteração #004
**Arquivo:** `/components/decision/EmergencyChannelModal.tsx`
**Antes:** `Cancelar`
**Depois:** `Fechar sem ligar`
**Contexto:** Botão secundário no modal de emergência.
**Justificativa:** Explicita efeito da ação em cenário de risco.
**Prioridade:** CRÍTICA

---

## Alteração #005
**Arquivo:** `/pages/GlossaryPage.tsx`
**Antes:** `Salvar termo`
**Depois:** `Registrar termo`
**Contexto:** CTA do formulário de cadastro no glossário.
**Justificativa:** Alinhamento terminológico com protocolo (“registrar”).
**Prioridade:** ALTA

---

## Alteração #006
**Arquivo:** `/pages/FAQPage.tsx`
**Antes:** `Nenhum resultado encontrado`
**Depois:** `Nenhuma resposta encontrada`
**Contexto:** Empty state da busca no FAQ.
**Justificativa:** Linguagem mais contextual ao conteúdo da tela.
**Prioridade:** MÉDIA

---

## Alteração #007
**Arquivo:** `/pages/FAQPage.tsx`
**Antes:** `Tente ajustar os termos da busca ou selecione outra categoria.`
**Depois:** `Nenhuma pergunta corresponde aos filtros atuais. Ajuste a busca ou selecione outra categoria.`
**Contexto:** Texto de orientação do empty state no FAQ.
**Justificativa:** Melhor acionabilidade e redução de ambiguidade.
**Prioridade:** MÉDIA

---

## Alteração #008
**Arquivo:** `/pages/FAQPage.tsx`
**Antes:** `Devo avisar a família...` / `a família ... deve ser avisada...`
**Depois:** `Devo comunicar a família...` / `a família ... deve ser comunicada...`
**Contexto:** Pergunta e resposta sobre abuso sexual.
**Justificativa:** Consistência com padrão verbal institucional (“comunicar”).
**Prioridade:** ALTA

---

## Alteração #009
**Arquivo:** `/data/alerts.ts`
**Antes:** `Acionar CT/rede e proteger vítima primeiro.`
**Depois:** `Acionar Conselho Tutelar (CT) e a rede de proteção, priorizando a vítima.`
**Contexto:** Orientação de conduta (A07).
**Justificativa:** Expansão de sigla na primeira ocorrência e maior clareza.
**Prioridade:** ALTA

---

## Alteração #010
**Arquivo:** `/data/scenarios.ts`
**Antes:** múltiplas ocorrências com `CT` isolado (ex.: `Notifica CT...`).
**Depois:** padronização para `Conselho Tutelar (CT)` nas primeiras menções dos cenários.
**Contexto:** Fluxos de cenários e desfechos.
**Justificativa:** Consistência terminológica oficial.
**Prioridade:** ALTA

---

## Alteração #011
**Arquivo:** `/scripts/generate-microcopy-inventory.ts`
**Antes:** inventário incluía muitas strings técnicas (classes CSS etc.).
**Depois:** filtros adicionais para priorizar texto de UI/microcopy visível.
**Contexto:** ferramenta de inventário para auditoria textual.
**Justificativa:** Reduz ruído e melhora utilidade do diagnóstico.
**Prioridade:** ALTA

---

### Entregáveis complementares
- Inventário de textos visíveis: `docs/microcopy/inventario-microcopy.csv`
- Mini style guide: `docs/microcopy/mini-style-guide-microcopy.md`
- Patch aplicável: `docs/microcopy/microcopy-revision.patch`

**Total de alterações textuais aplicadas:** 11 blocos de mudança
**Arquivos modificados (código/script):** 6
**Inventário atualizado:** 1207 entradas filtradas para foco em microcopy de interface
