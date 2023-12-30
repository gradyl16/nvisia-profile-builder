import { Alert, Box, Button, Divider, Fab, TextField, Typography, useTheme } from '@mui/material';
import { EducationAndCertificationsFormSchema, schema } from './education-and-certifications-form.schema';
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { useCreateProfileWizard } from '../../data-access/context/create-profile-wizard.context';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileService } from '@src/api/services/profile.service';
import { Education } from '@src/modules/profile/shared/models/educations.interface';
import { useSnackbar } from '@src/modules/core/error/global-snackbar-error.context';
import { Certification } from '@src/modules/profile/shared/models/certifications.interface';
import ClearIcon from '@mui/icons-material/Clear';

const defaultSchool = {
    schoolName: '',
    graduationYear: null, 
    majorDegreeName: '', 
    minorDegreeName: '' 
};

const defaultCertification = {
    title: '',
    year: null, 
};

export function EducationAndCertifications() {
    const [error, setError] = useState<string | null>(null);
    const [profileEducation, setProfileEducation] = useState<Education[]>();
    const [profileCertification, setProfileCertification] = useState<Certification[]>();
    const { showSnackbarError: showMessage } = useSnackbar();
    const { showSnackbarError } = useSnackbar();
    const theme = useTheme();
    const { previousStep } = useCreateProfileWizard();
    const { nextStep } = useCreateProfileWizard();
    const { profileId } = useParams<{ profileId: string }>();

    /**
     * Effect responsible for prefilling previously submitted textfield info.
     */
    useEffect(() => {
        const prefillEducationAndCertification = async () => {
            try {
                // Check if profileId is undefined or null
                if (profileId == null) {
                    // Handle the case where profileId is not available
                    throw new Error('Profile ID is not available. Please check and try again.');
                }
    
                const profileResponse = await ProfileService.getProfileById(profileId);
       
                // Check if there is an error in fetching profile data
                if (profileResponse.error) {
                    throw new Error('Oops, something went wrong when fetching profile data. Please refresh the page and try again.');
                }
    
                // Check if the profile response is undefined
                if (!profileResponse.response) {
                    throw new Error('Profile data not available.');
                }
    
                // Extract education and certification from the profile response
                const educations = profileResponse.response.educations || [];
                const certifications = profileResponse.response.certifications || [];
        
                setProfileEducation(educations);
                setProfileCertification(certifications);
            } catch (error: any) {
                // Handle errors
                if (error instanceof Error) {
                    setError(error.message); // Set the error state with the error message
                    showMessage(error.message); // Show the error message using the custom Snackbar hook
                } else {
                    // Handle unexpected errors
                    showSnackbarError('Error updating educations and certifications');
                }
            }
        };
    
        // Trigger the prefillEducationAndCertification effect when the profileId changes
        prefillEducationAndCertification();
    }, [profileId]);

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EducationAndCertificationsFormSchema>({
        resolver: zodResolver(schema),
        defaultValues:{
            educations: [defaultSchool],
            certifications: [defaultCertification],
        },
        values: {
            educations: profileEducation ?? [],
            certifications: profileCertification ?? [],
        }
    });

    const { fields: schoolFields, append: appendSchool, remove: removeSchool } = useFieldArray({
        name: "educations",
        control,
    });

    const addSchool = () => {
        if (schoolFields.length < 3) {
            appendSchool({
                schoolName: "",
                graduationYear: null,
                majorDegreeName: "",
                minorDegreeName: "",
              })
        }
    };

    const subtractSchool = (idxSchool: number) => {
        if (schoolFields.length > 1) {
            removeSchool(idxSchool);
        }
    };

    const { fields: certificationFields, append: appendCertification, remove: removeCertification } = useFieldArray({
        name: "certifications",
        control,
    });

    const addCertification = () => {
        if (certificationFields.length < 3) {
            appendCertification({
                title: "",
                year: null,
              })
        }
    };

    const subtractCertification = (idxCert: number) => {
        if (certificationFields.length > 1) {
            removeCertification(idxCert);
        }
    };

    const onSubmit: SubmitHandler<EducationAndCertificationsFormSchema> = async (values) => {
        try {
            // Separate the 'educations' and 'certifications' arrays
            const { educations, certifications } = values;
    
            // Format the education data
            const educationData = {
                profileId: profileId!,
                educations: educations.map(edu => ({
                    schoolName: edu.schoolName,
                    graduationYear: edu.graduationYear !== null ? edu.graduationYear : 0, // Assuming a default value if null
                    majorDegreeName: edu.majorDegreeName || '', // Assuming an empty string if undefined
                    minorDegreeName: edu.minorDegreeName || '', // Assuming an empty string if undefined
                })),
            };
    
            // Format the certification data
            const certificationData = {
                profileId: profileId!,
                certifications: certifications.map(cert => ({
                    title: cert.title,
                    year: cert.year !== null ? cert.year : 0, // Assuming a default value if null
                })),
            };
    
            // Make separate API calls for education and certification
            const educationResponse = await ProfileService.putEducation(educationData);
            const certificationResponse = await ProfileService.putCertification(certificationData);
    
            // Check for errors in each response
            const responseError = educationResponse.error || certificationResponse.error;
            if (responseError) {
                setError((responseError as any)?.response?.data[0]?.errorMessage);
            } else {
                // Both calls were successful
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
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography component="h1" variant="h3" fontWeight={300}>
                    Education & Certifications
                </Typography>
                <Typography component="h2" variant="h5" fontWeight={300} textAlign="center">
                    Credentials that count. List your educational achievements.
                </Typography>
            </Box>

            {/* Body */}
            <Box width="50%" display="flex" flexDirection="column" alignItems="center" gap={2}>
                {error && <Alert severity="error">{error}</Alert>}

                {/* School Section */}
                {schoolFields.map((school, idxSchool) => (
                    <React.Fragment key={school.id || idxSchool}>
                        
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ position: "relative" }}>

                            {schoolFields.length > 1 && (
                                <Fab
                                    size="small"
                                    color="primary"
                                    aria-label="remove"
                                    onClick={() => subtractSchool(idxSchool)}
                                    sx={{
                                        position: "absolute", 
                                        left: 230, 
                                        top: 22
                                    }}>
                                    <ClearIcon />
                                </Fab>
                            )}
                        </Box>

                        {/* School Input */}
                        <TextField
                            label="School"
                            {...register(`educations.${idxSchool}.schoolName`)}
                            error={Boolean(errors?.educations?.[idxSchool]?.schoolName)}
                            helperText={errors?.educations?.[idxSchool]?.schoolName?.message}
                            variant="outlined"
                            fullWidth
                        />

                        {/* Graduation Year Input */}
                        <TextField
                            label="Graduation Year"
                            {...register(`educations.${idxSchool}.graduationYear`, {valueAsNumber: true})}
                            error={Boolean(errors?.educations?.[idxSchool]?.graduationYear)}
                            helperText={errors?.educations?.[idxSchool]?.graduationYear?.message}
                            variant="outlined"
                            fullWidth
                        />

                        {/* Major Input */}
                        <TextField
                            label="Major (Optional)"
                            {...register(`educations.${idxSchool}.majorDegreeName`)}
                            variant="outlined"
                            fullWidth
                        />

                        {/* Minor Input */}
                        <TextField
                            label="Minor (Optional)"
                            {...register(`educations.${idxSchool}.minorDegreeName`)}
                            variant="outlined"
                            fullWidth
                        />

                        {idxSchool < schoolFields.length - 1 && (
                            <Divider style={{ width: '100%', margin: '20px 0' }} />
                        )}

                    </React.Fragment>
                ))}

                {/* Add School + Button */}
                <Fab
                    variant="extended"
                    size="small"
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
                        '&:hover': {
                            backgroundColor: theme.palette.nvisiaNavyBlue.main,
                        },
                    }}
                    onClick={addSchool}
                    disabled={schoolFields.length === 3}>
                    ADD SCHOOL {<AddIcon />}
                </Fab>

                {/* Certification Section */}
                {certificationFields.map((certification, idxCert) => (
                    <React.Fragment key={certification.id || idxCert}>

                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ position: "relative" }}>
                            {certificationFields.length > 1 && (
                                <Fab
                                    size="small"
                                    color="primary"
                                    aria-label="remove"
                                    onClick={() => subtractCertification(idxCert)}
                                    sx={{
                                        position: "absolute", 
                                        left: 230, 
                                        top: 22
                                    }}>
                                    <ClearIcon />
                                </Fab>
                            )}
                        </Box>

                        {/* Certification Input */}
                        <TextField
                            label="Certification"
                            {...register(`certifications.${idxCert}.title`)}
                            error={Boolean(errors?.certifications?.[idxCert]?.title)}
                            helperText={errors?.certifications?.[idxCert]?.title?.message}
                            variant="outlined"
                            fullWidth
                        />

                        {/* Certification Year Input */}
                        <TextField
                            label="Certification Year"
                            {...register(`certifications.${idxCert}.year`,{valueAsNumber: true})}
                            error={Boolean(errors?.certifications?.[idxCert]?.year)}
                            helperText={errors?.certifications?.[idxCert]?.year?.message}
                            variant="outlined"
                            fullWidth
                        />

                        {idxCert < certificationFields.length - 1 && (
                            <Divider style={{ width: '100%', margin: '20px 0' }} />
                        )}

                    </React.Fragment>

                ))}

                {/* Add Certification + Button */}
                <Fab
                    variant="extended"
                    size="small"
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
                        '&:hover': {
                            backgroundColor: theme.palette.nvisiaNavyBlue.main,
                        },
                    }}
                    onClick={addCertification}
                    disabled={certificationFields.length === 3}>
                    ADD CERTIFICATION {<AddIcon />}
                </Fab>

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

export default EducationAndCertifications;
