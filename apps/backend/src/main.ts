// main.ts
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

  // Tambahkan konfigurasi ini
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          'img-src': [
            "'self'",
            'data:',
            'https://cdn0.iconfinder.com',
            'https://cdn1.iconfinder.com',
            'https://cdn2.iconfinder.com',
            'https://cdn3.iconfinder.com',
            'https://cdn4.iconfinder.com',
          ],
        },
      },
    }),
  );

  app.useGlobalPipes(
    new XssCleanPipe(),
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();