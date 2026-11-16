/**
 * Configuración del servidor de desarrollo de Vite.
 */

import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api-artic': {
        // Servidor de destino real de la API
        target: 'https://api.artic.edu',
        // Modifica la cabecera 'Host' para que coincida con el target externo
        changeOrigin: true,
        // Reescribe la URL para eliminar el prefijo local antes de mandarla a Chicago:
        // '/api-artic/api/v1/artworks' -> 'https://api.artic.edu/api/v1/artworks'
        rewrite: (path) => path.replace(/^\/api-artic/, ''),
        configure: (proxy) => {
          // Intercepta la petición HTTP saliente generada por Node.js
          proxy.on('proxyReq', (proxyReq) => {
            // Eliminamos 'origin' y 'referer' para que el Cloudflare del museo no detecte localhost
            proxyReq.removeHeader('origin');
            proxyReq.removeHeader('referer');
            // Inyectamos la cabecera de identificación requerida por los términos de uso de la API
            proxyReq.setHeader('AIC-User-Agent', 'art-discovery (dev@local.edu)');
          });
        },
      },
      // Proxy para el servidor IIIF de imágenes (elude CORP en local)
      '/iiif-artic': {
        target: 'https://www.artic.edu',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/iiif-artic/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.removeHeader('origin');
            proxyReq.removeHeader('referer');
            proxyReq.setHeader('AIC-User-Agent', 'art-discovery (dev@local.edu)');
          });
          proxy.on('proxyRes', (proxyRes) => {
            // Eliminamos la restricción CORP para que el navegador acepte la imagen
            delete proxyRes.headers['cross-origin-resource-policy'];
            proxyRes.headers['access-control-allow-origin'] = '*';
          });
        },
      },
    },
  },
});
