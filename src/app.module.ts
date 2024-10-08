import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmRepositoryModule } from './infrastructure/adapters/repositories/typeorm/typeorm.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './common/configurations/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { PermissionGuard } from './common/guards/permission.guard';
import { ExcelExportService } from './common/utils/excel-export/export.service';
import { UserService } from './modules/users/users/user.service';
import { userModules } from './modules/users';
import { QueueModule } from './infrastructure/adapters/queue/bull/queue.module';
import { FileUploadModule } from './infrastructure/adapters/file-upload/file-upload.module';
import { CacheManagerModule } from './infrastructure/adapters/cache/redis/cache.module';
import { LoggerModule } from './infrastructure/adapters/logger/winston/logger.module';
import { LearnModule } from './modules/learn-validation/learn-validation.module';
import { OrderModule } from './modules/orders/order.module';
import { ProductModule } from './modules/spatie-tennancy/products/product.module';

@Module({
  imports: [
    TypeOrmRepositoryModule,
    CacheManagerModule,
    LoggerModule.forRootAsync(),
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env'
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: jwtConfig,
      inject: [ConfigService],
    }),
    LearnModule,
    QueueModule,
    FileUploadModule,
    ...userModules,
    // OrderModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [
    UserService,
    AppService,
    ExcelExportService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },

  ],
})
export class AppModule {}
