import { NestFactory } from '@nestjs/core';
import { AppModule } from './v1/app.module';
import * as process from 'process';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.PORT ?? 3000;

async function bootstrap () {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Payment Manager API')
    .setDescription('System for managing payments')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => console.log(`Server is running on 127.0.0.1:${port}`));
}

bootstrap();
