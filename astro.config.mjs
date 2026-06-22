// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import emdash from 'emdash/astro';
import react from '@astrojs/react';
import { sqlite, libsql } from 'emdash/db';

const isProd = !!process.env.TURSO_URL;

export default defineConfig({
  site: 'https://portafoliotu.netlify.app',
  output: 'server',
  adapter: netlify(),
  integrations: [
    react(),
    emdash({
      database: isProd
        ? libsql({
            url: process.env.TURSO_URL,
            authToken: process.env.TURSO_TOKEN
          })
        : sqlite({ url: 'file:./local.db' })
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