import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'src/App';
import { AppProvider, SettingsProvider, ToastProvider } from 'src/providers';
import 'src/css/index.css';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <SettingsProvider>
      <AppProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AppProvider>
    </SettingsProvider>
  </React.StrictMode>,
);
