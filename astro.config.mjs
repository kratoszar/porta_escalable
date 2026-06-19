// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import emdash from 'emdash/astro';
import react from '@astrojs/react';
import { sqlite, libsql } from 'emdash/db';
import { emdashSmtp } from 'emdash-smtp';

const isProd = !!process.env.TURSO_URL;

export default defineConfig({
  site: process.env.URL || 'https://portafoliotu.netlify.app',
  output: 'server',
  adapter: netlify(),
  integrations: [
    react(),
    emdash({
      // @ts-ignore
      plugins: [emdashSmtp()],
      
      database: isProd
        ? libsql({
            url: process.env.TURSO_URL || '',
            authToken: process.env.TURSO_TOKEN || ''
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
    },
    define: {
      'process.env.EMDASH_EMAIL_FROM': JSON.stringify('albertozarco57@gmail.com'),
      'process.env.EMDASH_SMTP_HOST': JSON.stringify('smtp.gmail.com'),
      'process.env.EMDASH_SMTP_PORT': JSON.stringify('587'),
      'process.env.EMDASH_SMTP_USER': JSON.stringify('albertozarco57@gmail.com'),
      'process.env.EMDASH_SMTP_PASS': JSON.stringify('hyqceqqadmcqakuq')
    }
  }
});