import { Box, Button, Typography } from '@mui/material';

import icon from '@assets/images/svgs/network.svg';
import { useParams } from 'react-router-dom';
import { useCreateProfileWizard } from '../create-profile-wizard/data-access/context/create-profile-wizard.context';

export function Skills() {
    const { previousStep } = useCreateProfileWizard();

    const { profileId } = useParams<{ profileId: string }>();

    return (
        <Box display="flex" flexDirection="column" color="#425D93">
            <Box display="flex" alignItems="center" gap={2} sx={{ mb: 3 }}>
                <img src={icon} />
                <Typography variant="h5" fontWeight="bold">
                    Skills
                </Typography>
            </Box>
            <Typography textAlign="center" sx={{ p: 4 }} color="black">
                TODO
            </Typography>
            <Button
                variant="text"
                color="secondary"
                sx={{ px: 6 }}
                onClick={() => previousStep(parseInt(profileId!))}>
                BACK
            </Button>
        </Box>
    );
}

export default Skills;
