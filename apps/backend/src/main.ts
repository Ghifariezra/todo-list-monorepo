import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { XssCleanPipe } from './pipes/xss-clean.pipe';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.use(csurf({ cookie: true }));
  app.use(helmet());
  
  app.useGlobalPipes(
    new XssCleanPipe(),
    new ValidationPipe({
      whitelist: true,            // buang field tak terdaftar di DTO
      forbidNonWhitelisted: true, // error jika ada field liar
      transform: true,            // auto transform ke tipe DTO
    }),
  );

  await app.listen(3000);
}
bootstrap();
