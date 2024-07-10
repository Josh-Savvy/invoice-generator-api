import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = parseInt(process.env.PORT) || 3000;
  const logger = new Logger('Nest Application');
  await app
    .listen(PORT)
    .then(() => logger.log(`Nest application is running on PORT: ${PORT}`));
}

bootstrap();
