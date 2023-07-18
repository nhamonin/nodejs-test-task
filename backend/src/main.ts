import { join } from 'node:path';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

import * as express from 'express';
import { Express } from 'express-serve-static-core';

import { AppModule } from './app.module';

async function bootstrap() {
  const server: Express = express();
  server.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  server.use(express.static(join(__dirname, '../../frontend/dist')));
  server.get(
    '*',
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      if (!req.url.startsWith('/api/')) {
        res.sendFile(join(__dirname, '../../frontend/dist/index.html'));
      } else {
        next();
      }
    },
  );

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
