import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from '@auth/context/AuthProvider';
import AppRouter from '@app/AppRouter';
import '@styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>,
);
