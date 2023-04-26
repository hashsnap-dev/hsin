import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import MongoStore = require('connect-mongo');
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  app.use(
    session({
      secret: configService.get('SESSTION_SECRET'),
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        mongoUrl: configService.get('SESSTION_MONGODB_URL'),
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native',
      }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
