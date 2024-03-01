import { NestFactory } from '@nestjs/core';
import { AppModule } from './v1/app.module';
import * as process from 'process';

const port = process.env.PORT ?? 3000;

async function bootstrap () {
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => console.log(`Server is running on 127.0.0.1:${port}`));
}

bootstrap();
