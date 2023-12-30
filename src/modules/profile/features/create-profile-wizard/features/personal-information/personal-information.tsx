import { Alert, Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { PersonalInformationFormSchema, schema } from './personal-information-form.schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAccount, useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { ProfileService } from '@src/api/services/profile.service';
import { Title } from '@src/modules/profile/shared/models/title.interface';
import { useCreateProfileWizard } from '../../data-access/context/create-profile-wizard.context';
import { useSnackbar } from '@src/modules/core/error/global-snackbar-error.context';
import { zodResolver } from '@hookform/resolvers/zod';

export function PersonalInformation() {
    const [error, setError] = useState<string | null>(null);
    const [titles, setTitles] = useState<Title[]>([]);

    const account = useAccount(useMsal().accounts[0] || {});
    const { showSnackbarError: showMessage } = useSnackbar();

    const { nextStep } = useCreateProfileWizard();

    /**
     * Effect responsible for fetching a list of available titles to render in
     * the dropdown.
     */
    useEffect(() => {
        const fetchTitles = async () => {
            const { response, error } = await ProfileService.getTitles();

            if (error) {
                showMessage(
                    'Oops, something went wrong when fetching titles. Please refresh the page and try again.'
                );
            } else {
                setTitles(response!);
            }
        };

        fetchTitles();
    }, []);

    /**
     * Hook responsible for connecting input elements with react-hook-form and
     * zod's schema validations.
     *
     * useForm
     *      This is the initialization of the useForm hook. PersonalInformationFormSchema
     *      is declared in the personal-information-form.schema.ts file shape of
     *      form data, ensuring type safety.
     *      The resolver: zodResolver(schema) part is where you specify how to
     *      validate the form data. Here, zodResolver is used along with a zod
     *      schema for validation. This setup means that the form will be
     *      validated according to the rules defined in your zod schema.
     *
     * register
     *      This function is used to connect your input fields to the
     *      react-hook-form. By using register, you tell react-hook-form
     *      to track the value, validation, and various states of the
     *      input field. When you "register" an input, it becomes part of
     *      the form data that react-hook-form manages for you.
     *
     * handleSubmit
     *      This function wraps around your form's submit handler. It takes care
     *      of gathering all form data, executing validation based on your rules
     *      (defined in the zod .schema file next to this one), and then, if
     *      everything is valid, it passes the form data to the function you
     *      specify for form submission.
     *
     * formState
     *      This part of react-hook-form keeps track of the current state of the
     *      form, including any validation errors. The errors object contains
     *      any validation errors that have been generated after user interaction
     *      or form submission, allowing you to display appropriate error messages
     *      in the UI.
     */
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PersonalInformationFormSchema>({
        resolver: zodResolver(schema),
    });

    /**
     * Form submission handler.
     */
    const onSubmit: SubmitHandler<PersonalInformationFormSchema> = async (values) => {
        const params = {
            emailAddress: account!.username,
            ...values,
        };

        const { response, error } = await ProfileService.createProfile(params);

        if (error) {
            setError('Oops, something went wrong when processing your request. Please try again.');
        } else {
            const { profileId } = response!;
            nextStep(profileId);
        }
    };

    return (
        <Box width="100%" display="flex" flexDirection="column" alignItems="center" gap={4}>
            {/* Section Heading and Description */}
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography component="h1" variant="h3" fontWeight={300}>
                    Personal Information
                </Typography>
                <Typography component="h2" variant="h5" fontWeight={300}>
                    Your professional blueprint. Start with the essentials.
                </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <Box width="50%" display="flex" flexDirection="column" alignItems="center" gap={2}>
                {/* First Name Input */}
                <TextField
                    label="First Name"
                    {...register('firstName')}
                    error={Boolean(errors['firstName'])}
                    helperText={errors['firstName']?.message}
                    variant="outlined"
                    fullWidth
                />

                {/* Last Name Input */}
                <TextField
                    label="Last Name"
                    {...register('lastName')}
                    error={Boolean(errors['lastName'])}
                    helperText={errors['lastName']?.message}
                    variant="outlined"
                    fullWidth
                />

                {/* Title Dropdown Input */}
                <TextField
                    select
                    fullWidth
                    label="Title"
                    {...register('titleCodeId', {
                        valueAsNumber: true,
                    })}
                    defaultValue=""
                    error={Boolean(errors['titleCodeId'])}
                    helperText={errors['titleCodeId']?.message}>
                    {titles.map((title) => (
                        <MenuItem key={title.titleCodeId} value={title.titleCodeId}>
                            {title.description}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Years of Experience Input */}
                <TextField
                    label="Years of Experience"
                    {...register('yearsOfExperience', {
                        valueAsNumber: true,
                    })}
                    error={Boolean(errors['yearsOfExperience'])}
                    helperText={errors['yearsOfExperience']?.message}
                    variant="outlined"
                    fullWidth
                />

                {/* Action Buttons */}
                <Box width="100%" display="flex" justifyContent="end" mt={4}>
                    {/* Continue */}
                    <Button onClick={handleSubmit(onSubmit)} variant="contained" sx={{ px: 6 }}>
                        Continue
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default PersonalInformation;
