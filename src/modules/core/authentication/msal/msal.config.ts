import { Configuration, PublicClientApplication, RedirectRequest } from '@azure/msal-browser';

const config: Configuration = {
    auth: {
        clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
        authority: import.meta.env.VITE_MSAL_AUTHORITY,
        redirectUri: import.meta.env.VITE_MSAL_REDIRECT_URI,
    },
};

const instance = new PublicClientApplication(config);

const redirectRequest: RedirectRequest = {
    scopes: ['User.Read'],
};

export const MSAL = {
    instance,
    redirectRequest,
};
