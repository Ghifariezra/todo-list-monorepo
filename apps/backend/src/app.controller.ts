import { Controller, Get, Post, Body, Req, Res, UseGuards, UnauthorizedException, Patch, UseInterceptors, UploadedFile, Delete, Param, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import type { Response, Request } from 'express';
import type { ReqToken, ReqProfile } from './types/request';
import { AuthGuard } from '@nestjs/passport';
import { minutes, Throttle } from '@nestjs/throttler';
import { UpdateProfileDto } from './dto/update-user.dto';
import { CreateTaskDto, UpdateTaskDto, EmailPayloadDto } from './dto/tasks.dto';
import { XssCleanPipe } from './pipes/xss-clean.pipe';


@Controller('auth')
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Get('google')

  @Throttle({
    default: {
      limit: 5,
      ttl: minutes(1),
    }
  })
  @Post('signup')
  @UsePipes(XssCleanPipe)
  signup(@Body() body: CreateUserDto) {
    return this.appService.signup(body);
  }

  @Throttle({
    default: {
      limit: 5,
      ttl: minutes(1),
    }
  })
  @UsePipes(XssCleanPipe)
  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const { access_token, refresh_token, user } = await this.appService.login(body);

    res.cookie('token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 60 * 1000,
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
  async refresh(@Req() req: Request, @Res() res: Response) {
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
        maxAge: 30 * 60 * 1000,
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
  async logout(@Req() req: ReqProfile, @Res() res: Response) {
    await this.appService.logout(req);
    
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

  @Post('user/upload/profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard('jwt'))
  uploadProfilePicture(@UploadedFile() file: Express.Multer.File, @Req() req: ReqProfile) {
    return this.appService.uploadProfilePicture(file, req);
  }

  @Post('user/tasks/add')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(XssCleanPipe)
  addTask(@Req() req: ReqProfile, @Body() body: CreateTaskDto) {
    return this.appService.addTask(req, body);
  }

  @Post('user/tasks/send-email')
  @UseGuards(AuthGuard('jwt'))
  sendTask(@Req() req: ReqProfile, @Body() body: EmailPayloadDto) {
    return this.appService.sendEmail(req, body);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('csrf-token')
  getCsrfToken(@Req() req: ReqToken) {
    return this.appService.getCsrfToken(req);
  }
  
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  profile(@Req() req: ReqProfile) {
    return this.appService.getProfile(req);
  }

  @Get('user/tasks')
  @UseGuards(AuthGuard('jwt'))
  getTasks(@Req() req: ReqProfile) {
    return this.appService.getTasks(req);
  }

  @Patch('user/update')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(XssCleanPipe)
  updateUser(@Req() req: ReqProfile, @Body() body: UpdateProfileDto) {
    return this.appService.updateProfile(req, body);
  }

  @Patch('user/tasks/:taskId')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(XssCleanPipe)
  updateTask(@Req() req: ReqProfile, @Param('taskId') taskId: string, @Body() body: UpdateTaskDto) {
    return this.appService.updateTask(req, taskId, body);
  }

  @Delete('user/tasks/:taskId')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(XssCleanPipe)
  deleteTask(@Req() req: ReqProfile, @Param('taskId') taskId: string) {
    return this.appService.deleteTask(req, taskId);
  }
}
