import { Box, Button, Divider, Fab, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { CareerHighlightsFormSchema, schema } from './career-highlights-form.schema';

import { useCreateProfileWizard } from '../../data-access/context/create-profile-wizard.context';
import { theme } from '@src/styles/theme/nvisia.theme';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ProfileService } from '@src/api/services/profile.service';
import { Highlight } from '@src/modules/profile/shared/models/career-highlights.interface';
import { useSnackbar } from '@src/modules/core/error/global-snackbar-error.context';

export function CareerHighlights() {
    const { nextStep, previousStep } = useCreateProfileWizard();
    const { showSnackbarError, showSnackbarSuccess } = useSnackbar();
    const { profileId } = useParams<{ profileId: string }>();
    const [data, setData] = useState<Highlight[]>([]);

    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CareerHighlightsFormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            highlights: [{ title: '', description: '' }],
        },
        values: {
            highlights: data,
        },
    });

    const watchedHighlights = watch('highlights');

    useEffect(() => {
        const fetchHighlights = async () => {
            if (!profileId) {
                showSnackbarError('Profile ID is missing. Unable to fetch highlights.');
                return;
            }

            const { response, error } = await ProfileService.getProfileById(profileId!);

            if (error || !response) {
                showSnackbarError('Error fetching highlights');
            } else {
                setData(response.highlights);
            }
        };
        fetchHighlights();
    }, []);

    const { fields, append, remove } = useFieldArray({
        name: 'highlights',
        control,
    });

    const onSubmit: SubmitHandler<CareerHighlightsFormSchema> = async (values) => {
        const dataToSend = {
            profileId: profileId ? profileId : '',
            highlights: values.highlights,
        };

        try {
            const { error } = await ProfileService.putCareerHighlights(dataToSend);

            if (error) {
                showSnackbarError('Error updating highlights');
            } else {
                showSnackbarSuccess('Highlights updated');
                nextStep(parseInt(profileId!));
            }
        } catch (error) {
            showSnackbarError('Submission didnt work');
        }
    };

    return (
        <Box width="100%" display="flex" flexDirection="column" alignItems="center" gap={4}>
            {/* Section Heading and Description */}
            <Box width="100%" display="flex" flexDirection="column" alignItems="center">
                <Typography component="h1" variant="h3" fontWeight={300}>
                    Career and Highlights
                </Typography>
                <Typography component="h2" variant="h5" fontWeight={300}>
                    Your professional peaks. Which achievements have defined your journey?
                </Typography>
            </Box>

            <Box width="55%" display="flex" flexDirection="column" alignItems="center" gap={0.5}>
                {fields.map((highlight, index) => (
                    <React.Fragment key={highlight.id}>
                        <Box
                            display="flex"
                            width="100%"
                            alignItems="center"
                            gap={1}
                            mb={2}
                            position="relative">
                            {/* Title Input */}
                            <TextField
                                label="Title"
                                {...register(`highlights.${index}.title`)}
                                error={Boolean(errors.highlights?.[index]?.title)}
                                fullWidth
                                inputProps={{ maxLength: 50 }}
                                FormHelperTextProps={{
                                    sx: {
                                        textAlign: 'right',
                                    },
                                }}
                                helperText={
                                    errors.highlights?.[index]?.title?.message
                                        ? errors.highlights?.[index]?.title?.message
                                        : `${watchedHighlights[index]?.title?.length || 0}/50`
                                }
                            />

                            {/* Remove button */}
                            {fields.length > 1 && (
                                <Fab
                                    size="small"
                                    color="primary"
                                    aria-label="remove"
                                    onClick={() => remove(index)}
                                    sx={{
                                        position: 'absolute',
                                        right: -50,
                                        top: '35%',
                                        transform: 'translateY(-50%)',
                                    }}>
                                    <ClearIcon />
                                </Fab>
                            )}
                        </Box>

                        {/* Description Input */}
                        <TextField
                            fullWidth
                            label="Description"
                            {...register(`highlights.${index}.description`)}
                            error={Boolean(errors.highlights?.[index]?.description)}
                            multiline
                            rows={5}
                            inputProps={{ maxLength: 300 }}
                            FormHelperTextProps={{
                                sx: {
                                    textAlign: 'right',
                                },
                            }}
                            helperText={
                                errors.highlights?.[index]?.description?.message
                                    ? errors.highlights?.[index]?.description?.message
                                    : `${watchedHighlights[index]?.description?.length || 0}/300`
                            }
                        />
                        {index < fields.length - 1 && (
                            <Divider style={{ width: '100%', margin: '20px 0' }} />
                        )}
                    </React.Fragment>
                ))}

                {/* Add Highlight + Button */}
                <Fab
                    variant="extended"
                    size="small"
                    disabled={fields.length >= 3}
                    sx={{
                        alignSelf: 'flex-end',
                        mt: 1,
                        py: 0.5,
                        px: 2,
                        minWidth: 'fit-content',
                        fontSize: '0.75rem',
                        lineHeight: '1rem',
                        textTransform: 'none',
                        borderRadius: '30px',
                        color: 'white',
                        backgroundColor: theme.palette.nvisiaSteelBlue.main,
                    }}
                    onClick={() => append({ title: '', description: '' })}>
                    ADD HIGHLIGHT {<AddIcon />}
                </Fab>

                {/* Action Buttons */}
                <Box width="100%" display="flex" justifyContent="space-between" mt={4}>
                    {/* Back */}
                    <Button
                        variant="text"
                        color="secondary"
                        sx={{ px: 6 }}
                        onClick={() => previousStep(parseInt(profileId!))}>
                        BACK
                    </Button>
                    {/* Continue */}
                    <Button onClick={handleSubmit(onSubmit)} variant="contained" sx={{ px: 6 }}>
                        CONTINUE
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default CareerHighlights;
