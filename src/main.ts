import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Filters payload with DTO parameters
      transform: true, // Transform payload to a object (DTO)
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true, // Enable convertions without Type decorator
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000);
}
bootstrap();
