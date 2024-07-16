import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; 
import { SnackbarProvider } from 'notistack'; // For error and notification handling

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}> {/* Display up to 3 snackbars at a time */}
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
