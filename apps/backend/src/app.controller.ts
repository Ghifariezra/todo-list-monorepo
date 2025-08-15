import { Controller, Get, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import type { Request as ExpressRequest, Response as ExpressResponse, CookieOptions } from 'express';
import { AuthGuard } from '@nestjs/passport';

interface CustomRequest extends ExpressRequest {
  csrfToken: () => string;
}
interface ExpressRequestWithPath extends ExpressRequest {
  path: string;
}

interface ReqProfile extends ExpressRequest {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface ResLogin extends ExpressResponse {
  cookie: (
    name: string,
    value: string,
    options?: CookieOptions
  ) => this;
}

interface ResLogout extends ExpressResponse {
  clearCookie: (
    name: string,
    options?: CookieOptions
  ) => this;
}

interface ResResult extends ExpressResponse {
  json: (
    message: string,
    user?: {
      id: string;
      name: string;
      email: string;
    }
  ) => this;
}

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('signup')
  signup(@Body() body: CreateUserDto) {
    return this.appService.signup(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: ResLogin): Promise<ResResult> {
    const { access_token, user } = await this.appService.login(body);

    res.cookie('token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000
    });

    return res.json({ message: 'Login berhasil', user: user });
  }

  @Post('logout')
  logout(@Res() res: ResLogout): ResResult {
    res.clearCookie('token');
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
    return { csrfToken: req.csrfToken() };
  }

  @Get('*splat')
  handleWildcard(@Req() req: ExpressRequestWithPath) {
    return {
      status: 404,
      message: 'Not Found',
      path: req.path
    };
  }

}