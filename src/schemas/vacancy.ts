import * as z from 'zod';

const Vacancy = z.object({
    id: z.number(),
    title: z.string(),
    city: z.string(),
    description: z.string(),
    conditions: z.array(z.string()),
    requirements: z.array(z.string()),
    salary_min: z.number().optional(),
    salary_max: z.number().optional(),
    status: z.enum(['Открыта', 'На паузе', 'Закрыта']),
})

export type Vacancy = z.infer<typeof Vacancy>