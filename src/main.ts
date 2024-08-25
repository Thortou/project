import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnv } from './common/interface/env.interface';
import * as admin from 'firebase-admin';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import  cors from 'cors';
// import { TenantMiddleware } from './common/middleware/tennant-spatie.middleware';

async function bootstrap() { 
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({ origin: '*' })
  app.useGlobalPipes(new ValidationPipe());
  // app.use(new TenantMiddleware().use);

  const config = app.get(ConfigService<IEnv>);
  
  app.setGlobalPrefix('api')
  const documentConfig = new DocumentBuilder()
    .setTitle('UI NestJs Tutorial 2024')
    .setDescription('This NestJs Tutorial API for Connect')
    .setVersion('0.1')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
    },
  });

  // Uncomment and configure Firebase as needed
  // const serviceAccount = require('../notification-bd259-firebase-adminsdk-tgmvs-46ebbec261.json');
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount)
  // });
  await app.listen(config.get('SERVER_PORT'));
}

bootstrap();
