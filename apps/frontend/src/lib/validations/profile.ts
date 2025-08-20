import { z } from "zod";

export const profileSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    country: z.string().optional(),
    date_of_birth: z.date().optional(),
    title: z.string().optional(),
    bio: z.string().optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;