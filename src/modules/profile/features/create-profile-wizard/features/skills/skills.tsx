import { Box, Button, Divider, Fab, MenuItem, TextField, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateProfileWizard } from '../../data-access/context/create-profile-wizard.context';
import React, { useEffect, useState } from 'react';
import { theme } from '@src/styles/theme/nvisia.theme';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { SkillsFormSchema, schema } from './skills-form.schema';
import { ProfileService } from '@src/api/services/profile.service';
import { useSnackbar } from '@src/modules/core/error/global-snackbar-error.context';
import { zodResolver } from '@hookform/resolvers/zod';
import { Skill, SkillOption } from '@src/modules/profile/shared/models/skills.interface';

const formSkillToAPI = (form: SkillsFormSchema): Skill[] => {
    const transformedValues = form.skills.map((x) => {
        const newValue: Skill = {
            skillCodeId: x.skillCodeId,
            description: x.description,
        };
        return newValue;
    });
    return transformedValues;
};

const APIToformSkill = (api: Skill[]): SkillsFormSchema => {
    return { skills: api.map((y) => ({ skillCodeId: y.skillCodeId, description: y.description })) };
};

export function Skills() {
    const { previousStep } = useCreateProfileWizard();
    const { showSnackbarError, showSnackbarSuccess } = useSnackbar();
    const { showSnackbarError: showMessage } = useSnackbar();
    const [skillOptions, setSkillOptions] = useState<SkillOption[]>([]);
    const [profileSkills, setProfileSkills] = useState<Skill[]>([]);
    const { profileId } = useParams<{ profileId: string }>();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        control,
        // reset,
    } = useForm<SkillsFormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            skills: [{ skillCodeId: 0, description: '' }],
        },
        values: APIToformSkill(profileSkills),
    });

    const watchedSkills = watch('skills');

    useEffect(() => {
        const fetchSkill = async () => {
            if (!profileId) {
                showMessage('Profile ID is missing. Unable to fetch skills.');
                return;
            }

            const { response: skillOptionsResponse, error: skillOptionsError } =
                await ProfileService.getSkillOptions();

            const { response: profileResponse, error: profileError } =
                await ProfileService.getProfileById(profileId!);

            if (skillOptionsError || profileError) {
                showMessage(
                    'Oops, something went wrong when fetching skills. Please refresh the page and try again.'
                );
            } else {
                setSkillOptions(skillOptionsResponse!);
                setProfileSkills(profileResponse!.skills);
            }
        };

        fetchSkill();
    }, []);

    const { fields, append, remove } = useFieldArray({
        name: 'skills',
        control,
    });

    const onSubmit: SubmitHandler<SkillsFormSchema> = async (values) => {
        const transformedSkills = formSkillToAPI(values);

        const request = {
            profileId: profileId ? profileId : '',
            skills: transformedSkills,
        };

        try {
            const { error } = await ProfileService.putSkill(request);
            if (error) {
                showSnackbarError('Error updating skills');
            } else {
                showSnackbarSuccess('Skills updated');
                navigate('/profile/preview');
            }
        } catch (error) {
            showSnackbarError('Submission failed');
        }
    };

    return (
        <Box width="100%" display="flex" flexDirection="column" alignItems="center" gap={4}>
            {/* Section Heading and Description */}
            <Box width="100%" display="flex" flexDirection="column" alignItems="center">
                <Typography component="h1" variant="h3" fontWeight={300}>
                    Skills
                </Typography>
                <Typography component="h2" variant="h5" fontWeight={300}>
                    Your professional arsenal. What competencies do you bring to the table?
                </Typography>
            </Box>
            <Box width="55%" display="flex" flexDirection="column" alignItems="center" gap={0.5}>
                {fields.map((skills, index) => (
                    <React.Fragment key={skills.id}>
                        <Box
                            display="flex"
                            width="100%"
                            alignItems="center"
                            gap={1}
                            mb={2}
                            position="relative">
                            {/* Title Input - Drop down */}
                            <Controller
                                name={`skills.${index}.skillCodeId`}
                                control={control}
                                defaultValue={skills.skillCodeId}
                                render={({ field }) => (
                                    <TextField select fullWidth label="Skill" {...field}>
                                        {skillOptions.map((option) => (
                                            <MenuItem
                                                key={option.skillCodeId}
                                                value={option.skillCodeId}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
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
                                        top: '50%',
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
                            {...register(`skills.${index}.description`)}
                            error={Boolean(errors.skills?.[index]?.description)}
                            multiline
                            rows={5}
                            inputProps={{ maxLength: 300 }}
                            FormHelperTextProps={{
                                sx: {
                                    textAlign: 'right',
                                },
                            }}
                            helperText={
                                errors.skills?.[index]?.description?.message
                                    ? errors.skills?.[index]?.description?.message
                                    : `${watchedSkills?.[index]?.description?.length || 0}/200`
                            }
                        />

                        {/* DIVIDER */}
                        {index < fields.length - 1 && (
                            <Divider style={{ width: '100%', margin: '20px 0' }} />
                        )}
                    </React.Fragment>
                ))}

                {/* Add Highlight + Button */}
                <Fab
                    variant="extended"
                    size="small"
                    disabled={fields.length >= 6}
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
                    onClick={() => append({ skillCodeId: 0, description: '' })}>
                    ADD HIGHLIGHT {<AddIcon />}
                </Fab>
            </Box>

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
                    SAVE & PREVIEW
                </Button>
            </Box>
        </Box>
    );
}

export default Skills;
