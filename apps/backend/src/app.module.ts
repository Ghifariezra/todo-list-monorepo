import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XssCleanPipe } from './pipes/xss-clean.pipe';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { supabaseProvider } from './config/client';

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
  ],
  controllers: [AppController],
  providers: [AppService, XssCleanPipe, supabaseProvider],
})

export class AppModule { }
