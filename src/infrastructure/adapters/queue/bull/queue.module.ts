
import { BullModule } from '@nestjs/bull';
import { Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DefaultQueueService } from './default-queue.service';
import { DEFAULT_QUEUE_SERVICE } from '../inject-key';
import { queueFactory } from './queue.factory';
import { IEnv } from 'src/common/interface/env.interface';
import { QueueProcessor } from './processors/default-queue.processor';
import { AppService } from 'src/app.service';

const providers: Provider[] = [
  {
    provide: DEFAULT_QUEUE_SERVICE,
    useClass: DefaultQueueService,
  }
];

@Global()
@Module({
  imports: [
    BullModule.registerQueueAsync(
      {
        name: 'defaultQueue',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService<IEnv>) =>
          queueFactory('defaultQueue', configService), // Corrected method
      },

    ),
  ],
  providers: [
    QueueProcessor,
    ...providers,
    AppService
  ],
  exports: providers,
})
export class QueueModule {}
