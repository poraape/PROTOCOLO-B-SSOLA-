// public/sw-cleanup.js
// Incluir no <head> do index.html ANTES do script do Vite:
// <script src="/sw-cleanup.js"></script>
//
// Remove Service Workers de versões anteriores ao Patch 8.
// Pode ser removido após 30 dias do primeiro deploy com PWA.

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((reg) => {
      // Remove apenas SWs antigos (sem escopo /bussola-pages-v1)
      // O novo SW do vite-plugin-pwa se re-registra automaticamente
      if (!reg.active?.scriptURL?.includes('sw.js')) {
        reg.unregister();
      }
    });
  });
}
