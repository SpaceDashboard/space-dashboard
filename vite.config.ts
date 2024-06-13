import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  build: {
    sourcemap: process.env.NODE_ENV === 'development',
    cssTarget: ['edge112', 'firefox117', 'chrome112', 'safari17'],
    cssMinify: true,
  },
  css: {
    devSourcemap: true,
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    }
  },
  server: {
    port: 3000
  }
});
