import * as z from 'zod';

const Vendor = z.object({
    id: z.number(),
    title: z.string(),
    name: z.string(),
    middleName: z.string(),
    surname: z.string(),
    address: z.string(),
    phone: z.string(),
    coords: z.array(z.number()).length(2),
    email: z.string().optional(),
    description: z.string().optional(),
});

export type Vendor = z.infer<typeof Vendor>;
