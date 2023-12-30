import { Box, Button, Container, Typography } from '@mui/material';
import { useAccount, useMsal } from '@azure/msal-react';

import Divider from './divider';
import NvisiaLogoIcon from '../../ui/nvisia-logo-icon';
import styles from './header.module.scss';
import { useNavigate } from 'react-router-dom';

export function Header() {
    const { instance, accounts } = useMsal();
    const account = useAccount(accounts[0] || {});

    const navigate = useNavigate();

    return (
        <Box component="header" className={styles['container']}>
            <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: ' column', gap: 3 }}>
                <Box display="flex">
                    <Box sx={{ mr: 3 }}>
                        <Button onClick={() => navigate('/profile')}>
                            <NvisiaLogoIcon />
                        </Button>
                    </Box>

                    <Box width="100%" display="flex" justifyContent="space-between">
                        <Button color="inherit" onClick={() => navigate('/profile/preview')}>
                            Preview
                        </Button>
                        <Box display="flex" alignItems="center">
                            <Button color="inherit">New Profile</Button>
                            <Divider />
                            <Button color="inherit" onClick={() => instance.logoutRedirect()}>
                                Log Out
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Typography component="h1" variant="h3" fontWeight="300">
                    {/* Split at the first space to show the first name. Fallback to full name  */}
                    Welcome {account?.name?.split(' ')?.[0] ?? account?.name ?? ''}
                </Typography>
            </Container>
        </Box>
    );
}

export default Header;
