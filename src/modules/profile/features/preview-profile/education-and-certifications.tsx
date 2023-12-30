import { Box, Typography, useTheme } from '@mui/material';

import icon from '@assets/images/svgs/award-ribbon.svg';

export function EducationAndCertifications() {
    const theme = useTheme();

    return (
        <Box display="flex" flexDirection="column" color={theme.palette.nvisiaSteelBlue.main}>
            <Box display="flex" alignItems="center" gap={2}>
                <img src={icon} />
                <Typography variant="h5" fontWeight="bold">
                    Education & Certifications
                </Typography>
            </Box>
            <Typography textAlign="center" sx={{ p: 4 }} color="black">
                TODO
            </Typography>
        </Box>
    );
}

export default EducationAndCertifications;
