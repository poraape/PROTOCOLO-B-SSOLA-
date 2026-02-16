# P0 Test Snippets

## CODEx-001 (metadata)
### Unit (Vitest)
```ts
import { describe, it, expect } from 'vitest';
import { PROTOCOL_DATA } from '../content/protocolData';

describe('protocol metadata', () => {
  it('has required governance fields', () => {
    expect(PROTOCOL_DATA.metadata.protocolVersion).toBeTruthy();
    expect(PROTOCOL_DATA.metadata.effectiveDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(PROTOCOL_DATA.metadata.lastReviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(PROTOCOL_DATA.metadata.reviewedBy).toBeTruthy();
  });
});
```

### E2E (Cypress)
```ts
it('shows protocol meta banner in critical pages', () => {
  ['/decisor', '/rede', '/recursos'].forEach((route) => {
    cy.visit(`/#${route}`);
    cy.contains('Versão normativa ativa').should('be.visible');
  });
});
```

## CODEx-002 (network fallback)
### Unit (Vitest)
```ts
import { describe, it, expect } from 'vitest';
import { shouldUseListFallback } from '../services/networkFallback';

describe('network fallback', () => {
  it('enables list fallback when no geocoded pins are available', () => {
    expect(shouldUseListFallback(3, 0)).toBe(true);
    expect(shouldUseListFallback(3, 1)).toBe(false);
  });
});
```

### E2E (Cypress)
```ts
it('shows fallback alert when map cannot load', () => {
  cy.intercept('GET', '**nominatim.openstreetmap.org**', { forceNetworkError: true });
  cy.visit('/#/rede');
  cy.contains('Mapa indisponível').should('be.visible');
  cy.contains('Ligar agora').should('be.visible');
});
```

## CODEx-003/004 (fallback and indicators)
### Unit (Vitest)
```ts
import { describe, it, expect } from 'vitest';
import { PROTOCOL_DATA } from '../content/protocolData';

describe('decision-tree guardrails', () => {
  it('root has explicit uncertainty option and fallback node', () => {
    const root = PROTOCOL_DATA.decisionTree.find((n) => n.id === 'root');
    expect(root?.fallbackNextNodeId).toBe('leaf_ambiguo');
    expect(root?.options.some((o) => /Não sei/.test(o.label))).toBe(true);
  });
});
```

### E2E (Cypress)
```ts
it('allows uncertainty path and shows action card', () => {
  cy.visit('/#/decisor');
  cy.contains('Não sei classificar / preciso de apoio').click();
  cy.contains('Resultado do protocolo').should('be.visible');
  cy.contains('Ações imediatas').should('be.visible');
});
```
