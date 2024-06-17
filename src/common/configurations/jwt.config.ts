import { ConfigService } from '@nestjs/config';
import { IEnv } from '../interface/env.interface';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = (config: ConfigService<IEnv>): JwtModuleOptions => ({
  global: true,
  secret: config.get('JWT_SECRET'),
  signOptions: { expiresIn: '183d' },
});