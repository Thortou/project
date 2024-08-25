import { ConfigService } from '@nestjs/config';
import { createLogger } from 'src/common/configurations/logger.config';
import { IEnv } from 'src/common/interface/env.interface';

export function loggerFactory(configService: ConfigService<IEnv>) {
  return createLogger(configService);
}
