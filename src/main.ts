import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dataSource from 'db/data-source';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
