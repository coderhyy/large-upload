import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    ApplicationModule,
  );
  app.setGlobalPrefix('api/v1');
  app.useStaticAssets('public', {
    prefix: '/static/',
  });
  await app.listen(3000);
}
bootstrap();
