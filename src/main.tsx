import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'src/App';
import AppProvider from './providers/AppProvider';
import SettingsProvider from './providers/SettingsProvider';
import 'src/css/index.css';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <SettingsProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </SettingsProvider>
  </React.StrictMode>,
);
