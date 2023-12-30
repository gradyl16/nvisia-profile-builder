import { TypeOf, array, object, string, number } from 'zod';

export const schema = object({
  educations: array(
    object({
      schoolName: string().min(1, 'School is required.'),
      graduationYear: number({ invalid_type_error: 'Graduation year must be a number.' })
        .int({ message: 'Graduation year must be an integer.' })
        .nullable()
        .refine((value) => value !== null, { message: 'Graduation year is required.' }),
      majorDegreeName: string().optional(),
      minorDegreeName: string().optional(),
    })
  ),
  certifications: array(
    object({
      title: string().min(1, 'Certification is required.'),
      year: number({ invalid_type_error: 'Certification year must be a number.' })
      .int({ message: 'Graduation year must be an integer.' })
      .nullable()
      .refine((value) => value !== null, { message: 'Certification year is required.' }),
    })
  ),
});

export type EducationAndCertificationsFormSchema = TypeOf<typeof schema>;
