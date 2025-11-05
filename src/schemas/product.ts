import * as z from 'zod';

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    short_description: z.string(),
    long_description: z.string(),
    image_url: z.string(),
    video_url: z.string().optional(),
    seller_id: z.number(),
});

export type Product = z.infer<typeof ProductSchema>;
