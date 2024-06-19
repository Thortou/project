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

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const corsOptions = {
    origin: 'http://localhost:5173',  // Replace with your frontend's origin
    credentials: true,               // Access-Control-Allow-Credentials
    optionsSuccessStatus: 200        // Some legacy browsers choke on 204
  };

  app.use(cors(corsOptions));  // Apply the CORS middleware with options

  app.useGlobalPipes(new ValidationPipe());

  const config = app.get(ConfigService<IEnv>);

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
