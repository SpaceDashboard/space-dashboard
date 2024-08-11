import React from 'react';
import ReactDOM from 'react-dom/client';
import posthog from 'posthog-js'
import { PostHogProvider} from 'posthog-js/react'
import { App } from 'src/App';
import AppProvider from './providers/AppProvider';
import SettingsProvider from './providers/SettingsProvider';
import 'src/css/index.css';

posthog.init('phc_9c7D91ze1wShYC4X83jlsYBnNvqDMSaOOyeJEm418hK', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'always',
})

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <SettingsProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </SettingsProvider>
    </PostHogProvider>
  </React.StrictMode>,
);
