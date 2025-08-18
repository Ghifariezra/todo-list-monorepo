import { Controller, Get, Post, Body, Req, Res, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { minutes, Throttle } from '@nestjs/throttler';

interface CustomRequest extends ExpressRequest {
  csrfToken: () => string;
}

interface ReqProfile extends ExpressRequest {
  user: {
    userId: string;
    name: string;
    email: string;
  };
}

@Controller('auth')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService
  ) { }

  @Throttle({
    default: {
      limit: 5,
      ttl: minutes(1),
    }
  })
  @Post('signup')
  signup(@Body() body: CreateUserDto) {
    return this.appService.signup(body);
  }

  @Throttle({
    default: {
      limit: 5,
      ttl: minutes(1),
    }
  })
  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: ExpressResponse) {
    const { access_token, refresh_token, user } = await this.appService.login(body);

    // src/app.controller.ts
    res.cookie('token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ message: 'Login berhasil', user });
  }

  @Post('refresh')
  async refresh(@Req() req: ExpressRequest, @Res() res: ExpressResponse) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Tidak ada refresh token.');
    }

    try {
      const { access_token } = await this.appService.refresh(refreshToken);

      res.cookie('token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
      });

      return res.json({ message: 'Token berhasil diperbarui' });

    } catch {
      res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      throw new UnauthorizedException('Refresh token tidak valid atau sudah kadaluarsa.');
    }
  }

  @Post('logout')
  // Gunakan guard untuk mendapatkan user ID dari token akses
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req: ReqProfile, @Res() res: ExpressResponse) {
    // Hapus refresh token dari database
    await this.appService.logout(req.user.userId);

    // Hapus token akses dan refresh token dari cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return res.json({ message: 'Logout berhasil' });
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  profile(@Req() req: ReqProfile) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('csrf-token')
  getCsrfToken(@Req() req: CustomRequest) {
    const csrfToken = req.csrfToken();

    if (!csrfToken) {
      throw new UnauthorizedException('CSRF token tidak ditemukan.');
    }

    return { csrfToken: csrfToken };
  }

}
