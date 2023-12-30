import { TypeOf, array, number, object, string } from 'zod';

export const schema = object({
    skills: array(
        object({
            skillCodeId: number({ required_error: 'Skill is required' }),
            description: string()
                .min(1, 'Description is required')
                .max(200, 'Description must be no more than 200 characters'),
        })
    ),
});

export type SkillsFormSchema = TypeOf<typeof schema>;
