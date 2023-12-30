import { TypeOf, number, object, string } from 'zod';

export const schema = object({
    firstName: string().min(1, 'First name is required.'),
    lastName: string().min(1, 'Last name is required.'),
    titleCodeId: number({ required_error: 'Title is required' }),
    yearsOfExperience: number().positive('Years of experience can not be negative'),
});

export type PersonalInformationFormSchema = TypeOf<typeof schema>;
