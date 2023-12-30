import { Box, Card } from '@mui/material';

import NvisiaLogo from './ui/nvisia-logo';
import SignInWithMicrosoftButton from './features/sign-in-with-microsoft-button';
import styles from './login.page.module.scss';

export function LoginPage() {
    return (
        <div className={styles['container']}>
            <Card sx={{ marginTop: -25, px: 6, py: 8 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <NvisiaLogo />

                    <SignInWithMicrosoftButton />
                </Box>
            </Card>
        </div>
    );
}

export default LoginPage;
