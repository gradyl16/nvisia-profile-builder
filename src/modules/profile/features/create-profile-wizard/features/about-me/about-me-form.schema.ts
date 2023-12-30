import { TypeOf, object, string } from 'zod';

export const schema = object({
    aboutMe: string()
        .min(1, 'About Me is required')
        .max(300, 'About Me must be no more than 300 characters'),
});

export type AboutMeFormSchema = TypeOf<typeof schema>;

