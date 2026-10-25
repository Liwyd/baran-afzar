// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

const ADMIN_PATH = (process.env.ADMIN_PATH ?? '/admin-8f3c2a').trim();

if (!/^\/[a-z0-9-]{4,64}$/i.test(ADMIN_PATH)) {
  throw new Error(
    'ADMIN_PATH must look like "/something" (4–64 chars, letters/digits/dashes).'
  );
}

export default defineConfig({
  site: process.env.PUBLIC_ORIGIN ?? 'http://127.0.0.1:4321',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  server: { port: 4321, host: '127.0.0.1' },
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
  vite: {
    define: {
      __ADMIN_PATH__: JSON.stringify(ADMIN_PATH),
    },
    server: {
      watch: { ignored: ['**/data/**', '**/dist/**'] },
    },
  },
});
