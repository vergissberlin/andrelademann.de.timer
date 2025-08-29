import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import { setupI18n } from './lib/i18n';
import { readPrefs } from './lib/storage';
import { OverviewPage } from './pages/OverviewPage';
import { DetailPage } from './pages/DetailPage';
import { registerServiceWorker } from './sw-register';

const prefs = readPrefs();
setupI18n(prefs.language);
if (prefs.theme === 'dark') {
  document.documentElement.classList.remove('light');
} else if (prefs.theme === 'light') {
  document.documentElement.classList.add('light');
}

const router = createBrowserRouter([
  { path: '/', element: <OverviewPage /> },
  { path: '/event/:id', element: <DetailPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

registerServiceWorker();

