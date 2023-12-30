import './styles/index.scss';
// Non out of the box Roboto font weights. MUI does not ship with 300, 400.
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { CssBaseline, ThemeProvider } from '@mui/material';

import App from './app.tsx';
import { HashRouter } from 'react-router-dom';
import { MSAL } from '@core/authentication/msal/msal.config.ts';
import { MsalProvider } from '@azure/msal-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from './modules/core/error/global-snackbar-error.context.tsx';
import { theme } from './styles/theme/nvisia.theme.ts';

async function enableMocking() {
    if (import.meta.env.MODE !== 'mock') {
        return;
    }

    const { worker } = await import('./mocks/browser.ts');

    return worker.start();
}

async function initializeMSALandHandleRedirect() {
    await MSAL.instance.initialize();
    await MSAL.instance.handleRedirectPromise();
}

async function init() {
    await enableMocking();
    await initializeMSALandHandleRedirect();
}

init().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <CssBaseline />
            <HashRouter>
                <MsalProvider instance={MSAL.instance}>
                    <ThemeProvider theme={theme}>
                        <SnackbarProvider>
                            <App />
                        </SnackbarProvider>
                    </ThemeProvider>
                </MsalProvider>
            </HashRouter>
        </React.StrictMode>
    );
});
