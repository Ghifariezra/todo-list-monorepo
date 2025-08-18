import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XssCleanPipe } from './pipes/xss-clean.pipe';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { supabaseProvider } from './config/client';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { ThrottlerModule, ThrottlerGuard, minutes } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'frontend/dist'),
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../../frontend', '.env'),
    }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '15m' }
    }),
    JwtModule.register({
      secret: process.env.JWT_REFRESH_SECRET,
      signOptions: { expiresIn: '7d' }
    }),
    ThrottlerModule.forRoot({
      throttlers: [{
        ttl: minutes(1), 
        limit: 100,
        ignoreUserAgents: [
          /googlebot/i,
          /bingbot/i,
          /slurp/i
        ]
      }],
      errorMessage: "Ups, kamu terlalu semangat! Tunggu sebentar, ya. Nanti kita lanjut lagi. 🏃💨",
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    XssCleanPipe,
    supabaseProvider,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
