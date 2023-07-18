import { join } from 'node:path';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

import * as express from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  const server = express();
  server.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.CLIENT_URL,
  });
  await app.listen(3000);
}
bootstrap();
