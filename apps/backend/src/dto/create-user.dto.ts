import {
    IsEmail,
    IsNotEmpty,
    MinLength,
    Matches,
    IsDateString
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Nama wajib diisi' })
    @MinLength(6, { message: 'Nama minimal 6 karakter' })
    name: string;

    @IsNotEmpty({ message: 'Email wajib diisi' })
    @IsEmail({}, { message: 'Email tidak valid' })
    email: string;

    @IsNotEmpty({ message: 'Nomor telepon wajib diisi' })
    @Matches(/^(\+62|0)[0-9]{9,14}$/, { message: 'Nomor telepon tidak valid' })
    phone: string;

    @IsNotEmpty({ message: 'Negara wajib diisi' })
    country: string;

    @IsNotEmpty({ message: 'Tanggal lahir wajib diisi' })
    @IsDateString({}, { message: 'Tanggal lahir harus format tanggal yang valid (YYYY-MM-DD)' })
    dateOfBirth: string; // pakai string biar sesuai JSON, validasi pakai IsDateString

    @IsNotEmpty({ message: 'Password wajib diisi' })
    @MinLength(8, { message: 'Password minimal 8 karakter' })
    @Matches(/[A-Z]/, { message: 'Password harus mengandung huruf besar' })
    @Matches(/[a-z]/, { message: 'Password harus mengandung huruf kecil' })
    @Matches(/[0-9]/, { message: 'Password harus mengandung angka' })
    @Matches(/[^A-Za-z0-9]/, { message: 'Password harus mengandung simbol' })
    password: string;

    @IsNotEmpty({ message: 'Konfirmasi password wajib diisi' })
    confirmPassword: string;
}
