# Checklist Manual - ResultScreen do Decisor (V2)

## Objetivo
Validar que todos os caminhos do Decisor chegam a uma tela de resultado utilizável, sem tela em branco, sem travamento e com dados essenciais visíveis.

## Pré-condições
- Rodar o app local (`npm run dev`).
- Abrir `#/decisor`.
- Se houver estado antigo persistido, usar "Iniciar nova classificação" ou limpar `localStorage`.

## Fluxos guiados mínimos (amostra obrigatória)

1. Triagem crítica (emergência)
- `#/decisor`
- Responder `SIM` na triagem inicial.
- Selecionar qualquer cartão de risco imediato.
- Esperado: `ResultScreen` abre com badge `AÇÃO IMEDIATA`, orientações, contatos e checklist final.

2. Domínio A - Pedagógico
- `#/decisor`
- Responder `NÃO` na triagem inicial.
- Selecionar domínio `Pedagógico`.
- Responder `SIM`.
- Esperado: `ResultScreen` com domínio identificado, urgência, orientações gerais/específicas e bloco de rede de apoio.

3. Domínio B - Saúde mental
- `#/decisor`
- Responder `NÃO` na triagem inicial.
- Selecionar domínio `Saúde mental`.
- Responder `NÃO`.
- Esperado: `ResultScreen` sem erro de runtime, com contatos e acompanhamento.

4. Domínio C - Violação de direitos
- `#/decisor`
- Responder `NÃO` na triagem inicial.
- Selecionar domínio `Violação de direitos`.
- Responder `SIM`.
- Esperado: `ResultScreen` com comunicação de gestão e anexos.

## Checklist funcional (aplicar em cada fluxo testado)
- [ ] A navegação chega a uma `ResultScreen` (sem tela em branco).
- [ ] Não há carregamento infinito.
- [ ] O topo mostra domínio escolhido.
- [ ] O topo mostra nível de urgência / badge.
- [ ] Há bloco de orientações gerais.
- [ ] Há bloco de orientações específicas / rede de apoio.
- [ ] Há referência explícita à rede de apoio.
- [ ] O botão `Copiar resumo para registro` funciona (ou mostra fallback claro se clipboard indisponível).
- [ ] O botão `Imprimir resultado` abre impressão sem quebrar a navegação.
- [ ] `Voltar` retorna ao passo anterior mantendo consistência do fluxo.
- [ ] `Iniciar nova classificação` reinicia a triagem.

## Cobertura completa de domínios (execução em rodada final)
- Repetir o fluxo `NÃO` na triagem inicial e testar os 12 domínios.
- Para cada domínio, validar ao menos um caminho (`SIM` ou `NÃO`) até `LEAF`.
- Em auditoria final, alternar os dois ramos (`SIM` e `NÃO`) de cada domínio para garantir 100% dos desfechos.
