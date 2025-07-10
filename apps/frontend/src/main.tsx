import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './router/AppRouter';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
