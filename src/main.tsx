import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { App } from 'src/App';
import AppProvider from './providers/AppProvider';
import SettingsProvider from './providers/SettingsProvider';
import 'src/css/index.css';

Sentry.init({
  dsn: 'https://4ef023b94fba4dfd9ab26e6a3f8610f3@o142627.ingest.us.sentry.io/1074117',
  tracesSampleRate: 1.0,
  tracePropagationTargets: [/^\//, /^https:\/\/api\.spacedashboard\.com/],
});

posthog.init('phc_9c7D91ze1wShYC4X83jlsYBnNvqDMSaOOyeJEm418hK', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'always',
});

/**
When upgrading to React 19, let's use the error hooks:

const root = ReactDOM.createRoot(document.getElementById('app')!, {
  onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
    console.warn('Uncaught error', error, errorInfo.componentStack);
  }),
  onCaughtError: Sentry.reactErrorHandler(),
  onRecoverableError: Sentry.reactErrorHandler(),
});

root.render(...);
*/

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <SettingsProvider>
        <AppProvider>
          <Sentry.ErrorBoundary fallback={<p>Something went wrong</p>}>
            <App />
          </Sentry.ErrorBoundary>
        </AppProvider>
      </SettingsProvider>
    </PostHogProvider>
  </React.StrictMode>,
);
