import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dataSource from 'db/data-source';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}

dataSource.initialize()
  .then(() => {
    console.log("✅ Database connected successfully!");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:", err);
  });

bootstrap();
