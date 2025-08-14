import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class LoginDto {
    @IsNotEmpty({ message: 'Email wajib diisi' })
    @IsEmail({}, { message: 'Email tidak valid' })
    email: string;

    @IsNotEmpty({ message: 'Password wajib diisi' })
    @MinLength(8, { message: 'Password minimal 8 karakter' })
    @Matches(/[A-Z]/, { message: 'Password harus mengandung huruf besar' })
    @Matches(/[a-z]/, { message: 'Password harus mengandung huruf kecil' })
    @Matches(/[0-9]/, { message: 'Password harus mengandung angka' })
    @Matches(/[^A-Za-z0-9]/, { message: 'Password harus mengandung simbol' })
    password: string;
}
