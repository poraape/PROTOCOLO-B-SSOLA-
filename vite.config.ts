// vite.config.ts — v2 (Patch 8)
// Adiciona PWA com cache inteligente:
//   - Acesso via link: comportamento idêntico ao atual
//   - Acesso repetido: banner "Adicionar à tela inicial" nativo
//   - Offline: telas já visitadas funcionam sem internet
//   - Atualização: SW atualiza silenciosamente em background

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    plugins: [
      react(),

      VitePWA({
        // Modo: gera SW + manifesto automaticamente
        registerType: 'autoUpdate',

        // Injeta o registro do SW no entry point sem tocar em index.html
        injectRegister: 'auto',

        // Inclui todos os assets do build no precache
        includeAssets: [
          'favicon.ico',
          'favicon.svg',
          'apple-touch-icon.png',
          'assets/**/*',
        ],

        // Manifesto do app (lido pelo PWA e por mobile browsers)
        manifest: {
          name: 'Protocolo Bússola',
          short_name: 'Bússola',
          description:
            'Guia digital de acolhimento e encaminhamento — E.E. Ermelino Matarazzo',
          start_url: '/',
          display: 'standalone',
          background_color: '#F5F7FA',
          theme_color: '#2C4A6E',
          lang: 'pt-BR',
          dir: 'ltr',
          orientation: 'portrait-primary',
          categories: ['education', 'productivity'],
          icons: [
            {
              src: '/icons/pwa-192.svg',
              sizes: '192x192',
              type: 'image/svg+xml',
              purpose: 'any',
            },
            {
              src: '/icons/pwa-512.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any',
            },
            {
              src: '/icons/pwa-512-maskable.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'maskable',
            },
          ],
          shortcuts: [
            {
              name: 'Iniciar Decisor',
              short_name: 'Decisor',
              description: 'Abrir o Decisor diretamente',
              url: '/decisor',
              icons: [{ src: '/icons/shortcut-decisor.svg', sizes: '96x96' }],
            },
            {
              name: 'Rede de Serviços',
              short_name: 'Rede',
              description: 'Consultar a rede intersetorial',
              url: '/rede',
              icons: [{ src: '/icons/shortcut-rede.svg', sizes: '96x96' }],
            },
          ],
        },

        // Estratégia de cache do Service Worker
        workbox: {
          // Limpa caches de builds anteriores automaticamente
          cleanupOutdatedCaches: true,

          // Timeout para fallback offline: 3s sem resposta → cache
          navigateFallbackDenylist: [/^\/api\//],
          navigateFallback: '/index.html',

          // Estratégias de cache por tipo de recurso
          runtimeCaching: [
            {
              // Navegação HTML → Network First (sempre tenta online primeiro)
              // Se offline → serve do cache
              urlPattern: ({ request }) => request.mode === 'navigate',
              handler: 'NetworkFirst',
              options: {
                cacheName: 'bussola-pages-v1',
                networkTimeoutSeconds: 4,
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 60 * 60 * 24 * 7, // 7 dias
                },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
            {
              // Assets estáticos (JS, CSS, fontes) → Cache First
              // Muda só com novo build (hashes mudam)
              urlPattern: /\.(js|css|woff2?|ttf|eot)$/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'bussola-assets-v1',
                expiration: {
                  maxEntries: 60,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 dias
                },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
            {
              // Imagens (logo, ícones) → Cache First, longa duração
              urlPattern: /\.(png|jpg|jpeg|svg|gif|webp|ico)$/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'bussola-images-v1',
                expiration: {
                  maxEntries: 40,
                  maxAgeSeconds: 60 * 60 * 24 * 60, // 60 dias
                },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
            {
              // Tiles do mapa Leaflet (OpenStreetMap) → Stale While Revalidate
              // Mostra o tile em cache imediatamente, atualiza em background
              urlPattern: /^https:\/\/[abc]\.tile\.openstreetmap\.org\//,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'bussola-map-tiles-v1',
                expiration: {
                  maxEntries: 200,
                  maxAgeSeconds: 60 * 60 * 24 * 14, // 14 dias
                },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
          ],
        },

        // Dev: ativa SW em desenvolvimento para testar offline
        // Desabilite se atrapalhar o HMR
        devOptions: {
          enabled: false,
          type: 'module',
        },
      }),
    ],

    define: {
      'process.env.API_KEY':        JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
