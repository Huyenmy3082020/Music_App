import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dataSource from 'db/data-source';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:7000', 
      credentials: true,
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
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
