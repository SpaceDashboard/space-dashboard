import { sentryVitePlugin } from "@sentry/vite-plugin";
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
        org: "space-dashboard",
        project: "space-dashboard-js"
      })
    );
  }

  return {
    plugins,
    resolve: {
      alias: {
        src: "/src",
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
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              switch (true) {
                case id.includes('react-dom'):
                  return 'vendor_react_dom';
                case id.includes('react-hook-form'):
                  return 'vendor_react_hook_form';
                case id.includes('react-toastify'):
                  return 'vendor_react_toastify';
                case id.includes('react-tooltip'):
                  return 'vendor_react_tooltip';
                case id.includes('react'):
                  return 'vendor_react';
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
        }
      },
      cors: false
    }
  };
});
