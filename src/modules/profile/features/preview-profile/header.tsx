import { Box, Typography } from '@mui/material';

import avatar from '@assets/images/anonymous-avatar.png';
import logo from '@assets/images/svgs/nvisia-logo-primary-white.svg';
import styles from './preview-profile.module.scss';

export function Header() {
    return (
        <Box className={styles['header-container']}>
            <Box className={styles['avatar']}>
                <img src={avatar} />
            </Box>
            <Box flex={1}>
                <Typography color="white">TODO</Typography>
            </Box>
            <Box>
                <img src={logo} height="80%" />
            </Box>
        </Box>
    );
}

export default Header;
