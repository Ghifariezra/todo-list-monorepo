import { z } from "zod";

export const profileSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    country: z.string().optional(),
    date_of_birth: z.date().optional(),
    title: z.string().optional(),
    bio: z.string().optional(),
    profile_picture_url: z.instanceof(File).optional().nullable(), // ✅ support File/null
});

export type ProfileSchema = z.infer<typeof profileSchema>;
