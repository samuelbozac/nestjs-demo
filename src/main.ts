import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  const options = new DocumentBuilder()
    .setTitle('Iluvcoffe')
    .setDescription('Coffe application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
