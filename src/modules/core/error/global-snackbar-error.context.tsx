import { Alert, AlertColor, Snackbar } from '@mui/material';
import { ReactNode, createContext, useContext, useState } from 'react';

interface SnackbarContextState {
    message: string | null;
    showSnackbarSuccess: (message: string) => void;
    showSnackbarError: (message: string) => void;
    hideMessage: () => void;
}

const initialState: SnackbarContextState = {
    message: null,

    showSnackbarSuccess: (message: string) => {},
    showSnackbarError: (message: string) => {},
    hideMessage: () => {},
};

const SnackbarContext = createContext<SnackbarContextState>(initialState);

interface SnackbarProviderProps {
    children: ReactNode;
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<AlertColor>('success');

    const showMessage = (severity: AlertColor) => (newMessage: string) => {
        setMessage(newMessage);
        setSeverity(severity);
        setOpen(true);
    };

    const hideMessage = () => {
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider
            value={{
                message,
                showSnackbarError: showMessage('error'),
                showSnackbarSuccess: showMessage('success'),
                hideMessage,
            }}>
            {children}
            <Snackbar open={open} autoHideDuration={20000} onClose={hideMessage}>
                <Alert
                    onClose={hideMessage}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
