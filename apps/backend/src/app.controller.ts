import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import type { Request as ExpressRequest } from 'express';

interface CustomRequest extends ExpressRequest {
  csrfToken: () => string;
}
interface ExpressRequestWithPath extends ExpressRequest {
  path: string;
}

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('csrf-token')
  getCsrfToken(@Req() req: CustomRequest) {
    return { csrfToken: req.csrfToken() };
  }

  @Post('signup')
  signup(@Body() body: CreateUserDto) {
    return this.appService.signup(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.appService.login(body);
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