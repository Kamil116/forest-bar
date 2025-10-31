import * as z from 'zod';

const Vacancy = z.object({
    id: z.number(),
    title: z.string(),
    city: z.string(),
    department: z.string(),
    description: z.string(),
    conditions: z.array(z.string()),
    requirements: z.array(z.string()),
    salary_min: z.number().optional(),
    salary_max: z.number().optional(),
    employment_type: z.enum(['full-time', 'part-time', 'contract', 'internship']),
    status: z.enum(['open', 'closed', 'on-hold']),
    posted_date: z.string(),
})

export type Vacancy = z.infer<typeof Vacancy>