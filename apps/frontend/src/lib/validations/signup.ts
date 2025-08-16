import { z } from 'zod';

const strongPassword = z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .regex(/[A-Z]/, 'Harus mengandung huruf besar')
    .regex(/[a-z]/, 'Harus mengandung huruf kecil')
    .regex(/[0-9]/, 'Harus mengandung angka')
    .regex(/[^A-Za-z0-9]/, 'Harus mengandung simbol');

const signupSchema = z
    .object({
        name: z.string().min(8, 'Nama minimal 8 karakter'),
        email: z.string().email('Email tidak valid'),
        password: strongPassword,
        confirmPassword: strongPassword,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password dan konfirmasi harus sama',
        path: ['confirmPassword'],
    });

export { signupSchema };
