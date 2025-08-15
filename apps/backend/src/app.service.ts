import { Injectable, Inject, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

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

  async signup(createUserDto: CreateUserDto) {
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
      email: createUserDto.email,
      password_hash: hashedPassword,
    }).select();

    if (error) {
      console.error(error);
      throw new BadRequestException('Gagal mendaftarkan pengguna.');
    }

    return {
      message: 'Pendaftaran berhasil.',
      user: data[0],
    };
  }


  // --- Metode Login yang mengelola otentikasi secara manual ---
  async login(loginDto: LoginDto) {
    // 1. Cari pengguna berdasarkan email
    const { data: user, error } = await this.supabaseClient
      .from('users')
      .select('*')
      .eq('email', loginDto.email)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw new UnauthorizedException('Kombinasi email dan kata sandi salah.');
    }

    // 2. Verifikasi password dengan bcrypt
    const isPasswordValid = await compare(loginDto.password, user.password_hash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Kombinasi email dan kata sandi salah.');
    }

    const payload = { 
      sub: user.id, 
      name: user.name, 
      email: user.email 
    };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login berhasil.',
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    };
  }
}