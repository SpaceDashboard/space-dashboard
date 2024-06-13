import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'src/App';
import { AppProvider } from 'src/providers/AppProvider';
import { ToastProvider } from 'src/providers/ToastProvider';
import 'src/css/index.css';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <AppProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AppProvider>
  </React.StrictMode>,
);
