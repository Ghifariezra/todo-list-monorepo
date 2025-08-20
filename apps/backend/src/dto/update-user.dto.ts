import {
    IsOptional,
    IsString,
    IsEmail,
    MinLength,
    Matches,
    IsUrl,
    IsDateString,
} from 'class-validator';

export class UpdateProfileDto {
    @IsOptional()
    @MinLength(6, { message: 'Nama minimal 6 karakter' })
    name?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Email tidak valid' })
    email?: string;

    @IsOptional()
    @Matches(/^(\+62|0)[0-9]{9,14}$/, {
        message: 'Nomor telepon tidak valid',
    })
    phone?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsDateString({}, {
        message: 'Tanggal lahir harus format tanggal yang valid (YYYY-MM-DD)',
    })
    date_of_birth?: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsUrl({}, { message: 'URL foto profil tidak valid' })
    profile_picture_url?: string;
}
