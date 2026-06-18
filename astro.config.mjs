// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node'; // <-- Importamos Node
import emdash from 'emdash/astro';
import react from '@astrojs/react';
import { sqlite } from 'emdash/db';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321', 
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [
    react(),
    emdash({
      database: sqlite({ url: 'file:./local.db' }) 
    })
  ],
  vite: {
    ssr: {
      external: ['@libsql/client']
    },
    optimizeDeps: {
      include: [
        'use-sync-external-store',
        'use-sync-external-store/shim',
        'use-sync-external-store/shim/with-selector'
      ]
    }
  }
});