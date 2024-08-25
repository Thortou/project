import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LOGGER_SERVICE } from '../inject-keys';
import { loggerFactory } from '../logger.factory';

@Global()
@Module({})
export class LoggerModule {
  static forRootAsync(): DynamicModule {
    const providers = [
      {
        provide: LOGGER_SERVICE,
        useFactory: loggerFactory,
        inject: [ConfigService],
      },
    ];

    return {
      module: LoggerModule,
      providers,
      exports: providers,
    };
  }
}
