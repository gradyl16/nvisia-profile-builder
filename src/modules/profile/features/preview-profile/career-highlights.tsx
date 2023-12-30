import { Box, Typography } from '@mui/material';

import icon from '@assets/images/svgs/lightning-bolt.svg';

export function CareerHighlights() {
    return (
        <Box display="flex" flexDirection="column" color="#425D93">
            <Box display="flex" alignItems="center" gap={2}>
                <img src={icon} />
                <Typography variant="h5" fontWeight="bold">
                    Career Highlights
                </Typography>
            </Box>

            <Typography textAlign="center" sx={{ p: 4 }} color="black">
                TODO
            </Typography>
        </Box>
    );
}

export default CareerHighlights;
