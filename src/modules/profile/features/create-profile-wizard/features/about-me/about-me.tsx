import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AboutMeFormSchema, schema } from './about-me-form.schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateProfileWizard } from '../../data-access/context/create-profile-wizard.context';
import { useParams } from 'react-router-dom';
import { ProfileService } from '@src/api/services/profile.service';
import { useSnackbar } from '@src/modules/core/error/global-snackbar-error.context';

const defaultAboutMe = 'Write something about yourself.';

export function AboutMe() {
    const { previousStep } = useCreateProfileWizard();
    const [error, setError] = useState<string | null>(null);
    const { profileId } = useParams<{ profileId: string }>();
    const [profileAboutMe, setProfileAboutMe] = useState<string>('');
    const { showSnackbarError: showMessage } = useSnackbar();
    const { showSnackbarError } = useSnackbar();
    const { nextStep } = useCreateProfileWizard();

    useEffect(() => {
        const prefillAboutMe = async () => {
            try {
                // Check if profileId is undefined or null
                if (profileId == null) {
                    // Handle the case where profileId is not available
                    throw new Error('Profile ID is not available. Please check and try again.');
                }

                const profileResponse = await ProfileService.getProfileById(profileId);

                // Check if there is an error in fetching profile data
                if (profileResponse.error) {
                    throw new Error(
                        'Oops, something went wrong when fetching profile data. Please refresh the page and try again.'
                    );
                }

                // Check if the profile response is undefined
                if (!profileResponse.response) {
                    throw new Error('Profile data not available.');
                }

                // Extract aboutMe from the profile response
                const aboutMe = profileResponse.response.aboutMe;

                setProfileAboutMe(aboutMe!);
            } catch (error: any) {
                // Handle errors
                if (error instanceof Error) {
                    setError(error.message); // Set the error state with the error message
                    showMessage(error.message); // Show the error message using the custom Snackbar hook
                } else {
                    // Handle unexpected errors
                    showSnackbarError('Error updating the about me');
                }
            }
        };

        // Trigger the prefillEducationAndCertification effect when the profileId changes
        prefillAboutMe();
    }, [profileId]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<AboutMeFormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            aboutMe: defaultAboutMe,
        },
        values: {
            aboutMe: profileAboutMe,
        },
    });

    const watchedAboutMe = watch('aboutMe');

    /**
     * Form submission handler.
     */
    const onSubmit: SubmitHandler<AboutMeFormSchema> = async (values) => {
        try {
            const aboutMe = values.aboutMe;

            const aboutMeData = {
                profileId: profileId!,
                aboutMe: aboutMe,
            };

            const { error } = await ProfileService.putAboutMe(aboutMeData);

            if (error) {
                setError(
                    'Oops, something went wrong when processing your request. Please try again.'
                );
            } else {
                nextStep(parseInt(profileId!));
            }
        } catch (error: any) {
            // Handle unexpected errors
            setError('Oops, something went wrong. Please try again.');
        }
    };

    return (
        <Box width="100%" display="flex" flexDirection="column" alignItems="center" gap={4}>
            {/* Section Heading and Description */}
            <Box width="100%" display="flex" flexDirection="column" alignItems="center">
                <Typography component="h1" variant="h3" fontWeight={300}>
                    About Me
                </Typography>
                <Typography component="h2" variant="h5" fontWeight={300}>
                    Define your narrative. How does your experience shape you?
                </Typography>
            </Box>

            {/* Body */}
            {error && <Alert severity="error">{error}</Alert>}

            <Box width="55%" display="flex" flexDirection="column" alignItems="center" gap={2}>
                {/* About Me Input */}
                <TextField
                    label="About Me"
                    {...register('aboutMe')}
                    error={Boolean(errors['aboutMe'])}
                    helperText={errors['aboutMe']?.message}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={7}
                    InputLabelProps={{ shrink: watchedAboutMe?.length >= 1 }}
                    inputProps={{ maxLength: 300 }}
                    FormHelperTextProps={{
                        sx: {
                            textAlign: 'left',
                        },
                    }}
                />

                {/* Action Buttons */}
                <Box width="100%" display="flex" justifyContent="space-between" mt={4}>
                    {/* Back */}
                    <Button color="secondary" onClick={() => previousStep(parseInt(profileId!))}>
                        Back
                    </Button>

                    {/* Continue */}
                    <Button variant="contained" sx={{ px: 6 }} onClick={handleSubmit(onSubmit)}>
                        Continue
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default AboutMe;
