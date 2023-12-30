import { Box, CircularProgress, Step, StepLabel, Stepper } from '@mui/material';

import { useCreateProfileWizard } from '../../data-access/context/create-profile-wizard.context';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function ProfileWizard() {
    const { step: stepParam } = useParams<{ step: string }>();

    const { steps, activeStepIndex, setActiveStepIndex } = useCreateProfileWizard();

    /**
     * Effect responsible for initializing the active step of the wizard based
     * on the current route.
     */
    useEffect(() => {
        const isValidStepRoute = steps.some((step) => step.route === stepParam);

        // If the route has an invalid step route name, default to the beginning.
        if (!isValidStepRoute) {
            setActiveStepIndex(0);
        } else {
            const indexOfCurrentRouteStep = steps.findIndex((step) => step.route === stepParam);
            setActiveStepIndex(indexOfCurrentRouteStep);
        }
    }, []);

    const ActiveStepComponent = steps[activeStepIndex]
        ? steps[activeStepIndex].component
        : CircularProgress;

    return (
        <>
            <Stepper activeStep={activeStepIndex} sx={{ mt: 4 }}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepLabel>{step.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box display="flex" justifyContent="center" mt={8}>
                <ActiveStepComponent />
            </Box>
        </>
    );
}

export default ProfileWizard;
