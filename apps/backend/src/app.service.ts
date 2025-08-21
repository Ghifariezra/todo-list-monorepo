import { Injectable, Inject, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import validate from 'deep-email-validator'
import type { ReqToken, ReqProfile } from './types/request';
import { UpdateProfileDto } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  private readonly saltRounds = 10;
  constructor(
    @Inject('SUPABASE_ADMIN_CLIENT')
    private readonly supabaseClient: SupabaseClient,
    private readonly jwtService: JwtService
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  private async checkEmailValidity(email: string) {
    const validationResult = await validate({
      email,
      validateSMTP: false,
    });

    return validationResult;
  }

  private formatDateToString(date?: string | Date) {
    if (!date) return undefined;
    const d = typeof date === 'string' ? new Date(date) : date;

    // Ambil tanggal lokal, bukan UTC
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  async signup(createUserDto: CreateUserDto) {
    const { valid, validators } = await this.checkEmailValidity(createUserDto.email);

    // Cek jika ada typo dan berikan saran
    if (validators.typo?.valid === false) {
      const reason = validators.typo.reason;
      const suggestedEmail = reason?.split(': ')[1];

      throw new BadRequestException(`Ups, sepertinya ada salah ketik. 😉 Mungkin maksud kamu ${suggestedEmail}?`);
    }

    if (!valid) {
      throw new BadRequestException('Emailnya nggak nyambung 😬. Pakai email yang aktif, ya!');
    }

    // 1️⃣ Validasi password dan confirmPassword
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException('Password dan konfirmasi password tidak sama.');
    }

    // 2️⃣ Cek apakah email sudah ada
    const { data: existingUser } = await this.supabaseClient
      .from('users')
      .select('email')
      .eq('email', createUserDto.email)
      .maybeSingle();

    if (existingUser) {
      throw new BadRequestException('Email sudah terdaftar.');
    }

    // 3️⃣ Hash password
    const hashedPassword = await hash(createUserDto.password, this.saltRounds);

    // 4️⃣ Simpan ke database (hanya simpan password, jangan simpan confirmPassword)
    const { data, error } = await this.supabaseClient.from('users').insert({
      name: createUserDto.name,
      phone: createUserDto.phone,
      country: createUserDto.country,
      date_of_birth: this.formatDateToString(createUserDto.dateOfBirth),
      email: createUserDto.email,
      password_hash: hashedPassword,
    }).select();

    if (error) {
      console.error(error);
      throw new BadRequestException('Gagal mendaftarkan pengguna.');
    }

    return {
      status: 200,
      message: 'Pendaftaran berhasil.',
      user: data[0],
    };
  }

  async logout(req: ReqProfile) {
    await this.supabaseClient
      .from('users')
      .update({ refresh_token_hash: null })
      .eq('id', req.user.userId);
  }

  // --- Metode Login yang mengelola otentikasi secara manual ---
  async login(loginDto: LoginDto) {
    // 1. Cari pengguna berdasarkan email
    const { data: user } = await this.supabaseClient
      .from('users')
      .select('*')
      .eq('email', loginDto.email)
      .maybeSingle();

    // 2. Verifikasi password dengan bcrypt
    const isPasswordValid = await compare(loginDto.password, user.password_hash);

    if (!isPasswordValid || !user) {
      throw new UnauthorizedException('Kombinasi email dan kata sandi salah.');
    }

    // 3. Buat access + refresh token
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      title: user.title,
      date_of_birth: user.date_of_birth,
      bio: user.bio,
      phone: user.phone,
      country: user.country,
      profile_picture_url: user.profile_picture_url,
      createdAt: user.created_at
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '30m', secret: process.env.JWT_ACCESS_SECRET });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d', secret: process.env.JWT_REFRESH_SECRET });

    // 4. Hash refresh token dan simpan di DB
    const hashedRefreshToken = await hash(refreshToken, this.saltRounds);
    await this.supabaseClient
      .from('users')
      .update({ refresh_token_hash: hashedRefreshToken })
      .eq('id', user.id);

    return {
      message: 'Login berhasil.',
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    };
  }

  async refresh(refreshToken: string) {
    try {
      // 1. Verifikasi refresh token menggunakan secret
      const payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });

      // 2. Ambil user dari DB
      const { data: user } = await this.supabaseClient
        .from('users')
        .select('id, refresh_token_hash, name, email')
        .eq('id', payload.sub)
        .maybeSingle();

      if (!user || !user.refresh_token_hash) {
        throw new UnauthorizedException('Refresh token tidak valid.');
      }

      // 3. Cocokin refresh token yang dikirim client dengan hash di DB
      const isMatch = await compare(refreshToken, user.refresh_token_hash);
      if (!isMatch) {
        throw new UnauthorizedException('Refresh token tidak cocok.');
      }

      // 4. Buat access token baru
      const newAccessToken = this.jwtService.sign(
        { sub: user.id, name: user.name, email: user.email },
        { expiresIn: '30m', secret: process.env.JWT_ACCESS_SECRET } // Gunakan secret yang benar
      );

      return { access_token: newAccessToken };

    } catch {
      throw new UnauthorizedException('Refresh token expired or invalid.');
    }
  }

  async updateProfile(req: ReqProfile, body: UpdateProfileDto) {
    const { error } = await this.supabaseClient
      .from('users')
      .update(body)
      .eq('id', req.user.userId)
      .single();

    if (error) {
      console.error(error);
      throw new BadRequestException('Gagal memperbarui data pengguna.');
    }

    const { data: updatedUser, error: error2 } = await this.supabaseClient
      .from('users')
      .update(body)
      .eq('id', req.user.userId)
      .select("name, email, phone, country, date_of_birth, title, bio, profile_picture_url, created_at")
      .maybeSingle();

    if (error2) {
      console.error(error2);
      throw new BadRequestException('Gagal memperbarui data pengguna.');
    }

    return {
      status: 200,
      message: 'Data pengguna berhasil diperbarui.',
      user: {
        userId: req.user.userId,
        ...updatedUser
      }
    }
  }

  async uploadProfilePicture(file: Express.Multer.File, req: ReqProfile) {
    // Check previous file and delete it
    const fileExtOld = req.user.profile_picture_url?.split('profile/').pop();
    if (fileExtOld) {
      const filePathOld = `profile/${fileExtOld}`;
      await this.supabaseClient.storage.from('Achievly').remove([filePathOld]);
    }

    if (!file) {
      throw new BadRequestException('File tidak ditemukan.');
    }

    const fileExt = file.originalname.split('.').pop();
    const fileName = `${req.user.userId}-${uuid()}.${fileExt}`;
    const filePath = `profile/${fileName}`;

    const { error } = await this.supabaseClient.storage
      .from('Achievly') // ganti dengan nama bucket kamu
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      throw new BadRequestException('Gagal upload ke Supabase: ' + error.message);
    }

    // ambil public URL
    const { data } = this.supabaseClient
      .storage
      .from('Achievly')
      .getPublicUrl(filePath);

    // update URL ke tabel users
    await this.supabaseClient
      .from('users')
      .update({ profile_picture_url: data.publicUrl })
      .eq('id', req.user.userId);

    return { url: data.publicUrl };
  }

  getCsrfToken(req: ReqToken) {
    const csrfToken = req.csrfToken();

    if (!csrfToken) {
      throw new UnauthorizedException('CSRF token tidak ditemukan.');
    }

    return { csrfToken: csrfToken };
  }

  getProfile(req: ReqProfile) {
    return req.user;
  }
}