import { AuthenticationContext } from '../context/authentication.context';
import { useContext } from 'react';

export const useAuthentication = () => {
    const context = useContext(AuthenticationContext);

    if (context === undefined) {
        throw new Error('useAuthentication must be used within an AuthenticationProvider context.');
    }

    return context;
};
