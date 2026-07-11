import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for dev
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());
  
  // Set global prefix
  app.setGlobalPrefix('api');
  
  const PORT = process.env.PORT || 3001;
  await app.listen(PORT);
  console.log(`Product Service running on port ${PORT}`);
}

bootstrap();
