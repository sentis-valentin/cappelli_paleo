import { defineConfig } from 'vite';

export default defineConfig({
  base: '/cappelli_paleo/',
  root: '.',
  publicDir: './public',
  build: {
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      input: './index.html'
    }
  },
  server: {
    port: 3000,
    open: '/index.html'
  },
  css: {
    postcss: './postcss.config.js'
  }
});