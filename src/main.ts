import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnv } from './common/interface/env.interface';
import * as admin from 'firebase-admin';
async function bootstrap() {

  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = app.get(ConfigService<IEnv>)

  //add firebase
  // const serviceAccount = require('../notification-bd259-firebase-adminsdk-tgmvs-46ebbec261.json');
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount)
  // });

  await app.listen(config.get('SERVER_PORT'));


}
bootstrap(); 
