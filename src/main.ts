import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS with default settings
  await app.listen(PORT);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
