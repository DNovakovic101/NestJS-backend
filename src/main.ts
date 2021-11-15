import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // swagger___
  const config = new DocumentBuilder()
    .setTitle('Offertolino Api')
    .setDescription('Swagger documentation for Offertolino')
    .setVersion('1.0')
    .addTag('Offertolino')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // swagger___

  await app.listen(3001);
}

bootstrap();
