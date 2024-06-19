import { ConfigService } from '@nestjs/config';
import { createQueueOptions } from 'src/common/configurations/queue.config';
import { IEnv } from 'src/common/interface/env.interface';

export function queueFactory(
  queueName: string,
  configService: ConfigService<IEnv>,
) {
  try {
    return createQueueOptions(queueName, configService);
  } catch (error) {
    throw error;
  }
}
