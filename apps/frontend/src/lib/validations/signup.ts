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
        phone: z
            .string()
            .min(1, 'Nomor telepon wajib diisi')
            .regex(/^(\+62|0)[0-9]{9,14}$/, 'Nomor telepon tidak valid'),
        country: z.string().min(1, 'Negara wajib diisi'),
        dateOfBirth: z
            .date({ error: 'Tanggal lahir wajib diisi' })
            .refine((date) => date <= new Date(), {
                message: 'Tanggal lahir tidak boleh di masa depan',
            }),
        password: strongPassword,
        confirmPassword: strongPassword,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password dan konfirmasi harus sama',
        path: ['confirmPassword'],
    });

export { signupSchema };
