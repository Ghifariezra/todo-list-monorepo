import { z } from "zod";

// Definisikan enum tanpa required_error (karena z.enum gak support itu)
export const PriorityEnum = z.enum(["low", "medium", "high"]);

// Schema post
export const updateSchema = z.object({
    id: z.string(),
    title: z
        .string()
        .trim()
        .min(1, "Judul wajib diisi"),

    schedule: z.date().optional(),

    priority: PriorityEnum,

    description: z
        .string()
        .trim()
        .optional(),
});

export type UpdateSchema = z.infer<typeof updateSchema>;
