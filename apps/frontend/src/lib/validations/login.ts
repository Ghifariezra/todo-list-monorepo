import { z } from 'zod';

const strongPassword = z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .regex(/[A-Z]/, 'Harus mengandung huruf besar')
    .regex(/[a-z]/, 'Harus mengandung huruf kecil')
    .regex(/[0-9]/, 'Harus mengandung angka')
    .regex(/[^A-Za-z0-9]/, 'Harus mengandung simbol');

const loginSchema = z.object({
    email: z.string().email('Email tidak valid'),
    password: strongPassword,
});

export { loginSchema };
