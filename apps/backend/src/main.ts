import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { XssCleanPipe } from './pipes/xss-clean.pipe';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', true);
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
            'https://*.iconfinder.com',
          ],
        },
      },
    }),
  );

  app.useGlobalPipes(
    // new XssCleanPipe(),
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();