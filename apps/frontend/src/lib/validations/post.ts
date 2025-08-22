import { z } from "zod";

// Definisikan enum tanpa required_error (karena z.enum gak support itu)
export const PriorityEnum = z.enum(["low", "medium", "high"]);

// Schema post
export const postSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Judul wajib diisi"),

    schedule: z.date(),

    priority: PriorityEnum,

    description: z
        .string()
        .trim()
        .optional(),
});

export type PostSchema = z.infer<typeof postSchema>;
