import { Box, Button } from '@mui/material';

import { MSAL } from '@src/modules/core/authentication/msal/msal.config';
import microsoftLogoColor from '@assets/images/svgs/microsoft-logo-color.svg';
import { useMsal } from '@azure/msal-react';

export function SignInWithMicrosoftButton() {
    const { instance } = useMsal();

    return (
        <Button
            onClick={() => instance.loginRedirect(MSAL.redirectRequest)}
            variant="outlined"
            color="secondary"
            sx={{ borderRadius: 0, textTransform: 'none' }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                <img src={microsoftLogoColor} />
                Sign in with Microsoft
            </Box>
        </Button>
    );
}

export default SignInWithMicrosoftButton;
