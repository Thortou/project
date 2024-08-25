import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { redisProvider } from 'src/common/configurations/cache.config';
import { CACHE_SERVICE } from '../inject-key';
import { CacheService } from './cache.service';
import { LOGGER_SERVICE } from '../../logger/inject-keys';
import { LoggerService } from '../../logger/winston/logger.service';

const PROVIDERS = [
  redisProvider,
  {
    provide: CACHE_SERVICE,
    useClass: CacheService,
  },
  {
    provide: LOGGER_SERVICE,
    useClass: LoggerService,
  },
];

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  providers: PROVIDERS,
  exports: PROVIDERS,
})
export class CacheManagerModule {}
