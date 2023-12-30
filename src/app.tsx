import { Box, CircularProgress } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';

import { InteractionStatus } from '@azure/msal-browser';
import LoginPage from './modules/login/login.page';
import ProfilePage from './modules/profile/profile.page';

function App() {
    const { inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    if (inProgress !== InteractionStatus.None) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        );
    }

    // If a user is NOT authenticated, always route them to the /auth page.
    if (!isAuthenticated) {
        return (
            <Routes>
                <Route path="*" element={<Navigate replace to="/auth" />} />
                <Route path="/auth" element={<LoginPage />} />
            </Routes>
        );
    }

    // If we are here, the user is authenticated. Route normally.
    return (
        <Routes>
            <Route path="/profile/*" element={<ProfilePage />} />
            {/* Default to /profile */}
            <Route path="*" element={<Navigate replace to="/profile" />} />
        </Routes>
    );
}

export default App;
