# Snippets de testes visuais automatizados (layout adaptativo)

> Objetivo: validar o comportamento automático sem botão de alternância manual.

## 1) Mobile-first (fluxo sequencial)

```ts
import { test, expect } from '@playwright/test';

test('decisor mobile mostra fluxo sequencial sem painel lateral', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#/decisor');

  await expect(page.getByText('Fluxo mobile ativo: uma etapa por vez')).toBeVisible();
  await expect(page.getByLabel('Histórico de decisões')).toHaveCount(0);
});
```

## 2) Desktop (painel lateral visível)

```ts
import { test, expect } from '@playwright/test';

test('decisor desktop exibe painel lateral de histórico', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/#/decisor');

  await expect(page.getByLabel('Histórico de decisões')).toBeVisible();
  await expect(page.getByText('Fluxo mobile ativo: uma etapa por vez')).toHaveCount(0);
});
```

## 3) Tablet (layout híbrido sem painel fixo)

```ts
import { test, expect } from '@playwright/test';

test('decisor tablet mantém histórico resumido no fluxo', async ({ page }) => {
  await page.setViewportSize({ width: 834, height: 1112 });
  await page.goto('/#/decisor');

  await expect(page.getByLabel('Histórico resumido')).toBeVisible();
  await expect(page.getByLabel('Histórico de decisões')).toHaveCount(0);
});
```
