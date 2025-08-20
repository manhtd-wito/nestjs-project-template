import { NestFactory } from '@nestjs/core';
import { SeedModule } from './modules/seed.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);
}

bootstrap();
