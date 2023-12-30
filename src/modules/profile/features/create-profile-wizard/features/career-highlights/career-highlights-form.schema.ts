import { TypeOf, array, object, string } from 'zod';

export const schema = object({
    highlights: array(
        object({
            title: string()
                .min(1, 'Title is required')
                .max(50, 'Title must be no more than 50 characters'),
            description: string()
                .min(1, 'Description is required')
                .max(300, 'Description must be no more than 300 characters'),
        })
    ),
});

export type CareerHighlightsFormSchema = TypeOf<typeof schema>;
