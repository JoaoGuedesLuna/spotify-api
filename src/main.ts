import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('spotify/api/v1');

  setupSwagger(app);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(process.env.APP_PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Error starting the app', err);
  process.exit(1);
});
