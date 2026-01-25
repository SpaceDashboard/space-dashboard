import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';

// https://vitejs.dev/config/
export default defineConfig(() => {
  const plugins = [
    react()
  ];

  if (process.env.NODE_ENV !== 'development') {
    plugins.push(
      sentryVitePlugin({
        org: 'space-dashboard',
        project: 'space-dashboard'
      })
    );
  }

  return {
    plugins,
    resolve: {
      alias: {
        src: "/src",
        // Temporary fix for @tabler/icons-react, see https://github.com/tabler/tabler-icons/issues/1233#issuecomment-2428245119
        // /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
        '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
      },
    },
    build: {
      sourcemap: true,
      cssTarget: ['edge112', 'firefox117', 'chrome112', 'safari17'],
      cssMinify: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          minifyInternalExports: true,
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              switch (true) {
                case id.includes('@sentry'):
                  return 'vendor_sentry';
                case id.includes('posthog-js'):
                  return 'vendor_posthog';
                case id.includes('@tabler'):
                  return 'vendor_tabler_icons_react';
                case id.includes('@emotion'):
                  return 'vendor_emotion_css';
                case id.includes('@date-fns'):
                  return 'vendor_date_fns';
                case id.includes('@tanstack'):
                  return 'vendor_tanstack';
                case id.includes('axios'):
                  return 'vendor_axios';
                default:
                  return 'vendor';
              }
            }
          }
        }
      }
    },
    css: {
      devSourcemap: true,
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      }
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'https://api.spacedashboard.com',
          rewrite: (path) => path.replace(/^\/api/, ''),
          changeOrigin: true,
          secure: false
        },
      },
      cors: false
    }
  };
});
