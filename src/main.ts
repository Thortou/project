import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnv } from './common/interface/env.interface';
import * as admin from 'firebase-admin';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {

  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = app.get(ConfigService<IEnv>)

  const documentCongfig = new DocumentBuilder()
  .setTitle('UI NestJs Tutorial 2024')
  .setDescription('this NestJs Tutorial API for Connect')
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
const document = SwaggerModule.createDocument(app, documentCongfig);
SwaggerModule.setup('docs', app, document, {
  swaggerOptions: {
    persistAuthorization: true,
    docExpansion: 'none',
  },
}); 

  //add firebase
  // const serviceAccount = require('../notification-bd259-firebase-adminsdk-tgmvs-46ebbec261.json');
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount)
  // });

  await app.listen(config.get('SERVER_PORT'));


}
bootstrap(); 
