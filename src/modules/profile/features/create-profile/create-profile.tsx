import { Box, Button, Typography } from '@mui/material';

import splash from '@assets/images/svgs/product-management-line.svg';
import styles from './create-profile.module.scss';
import { useNavigate } from 'react-router-dom';

export function CreateProfile() {
    const navigate = useNavigate();

    return (
        <Box className={styles['container']} mt={8}>
            <Box sx={{ ml: 8, mb: 1 }}>
                <img src={splash} style={{ height: '30vh', maxHeight: '20rem' }} />
            </Box>

            <Typography
                component="h2"
                variant="h3"
                fontWeight="300"
                textAlign="center"
                sx={{ color: '#3c3e3e', mb: 2 }}>
                Create your first profile
            </Typography>
            <Typography
                component="h3"
                variant="h4"
                fontWeight="300"
                textAlign="center"
                sx={{ mb: 5 }}>
                Connect expertise to opportunity, build your narrative, enable your future.
            </Typography>
            <Button variant="contained" sx={{ width: '50%' }} onClick={() => navigate('./new')}>
                Create a Profile
            </Button>
        </Box>
    );
}

export default CreateProfile;
