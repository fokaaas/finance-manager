import { NestFactory } from '@nestjs/core';
import { AppModule } from './v1/app.module';
import * as process from 'process';
import { ValidationPipe, VersioningType } from '@nestjs/common';

const port = process.env.PORT ?? 3000;

async function bootstrap () {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(port, () => console.log(`Server is running on 127.0.0.1:${port}`));
}

bootstrap();
