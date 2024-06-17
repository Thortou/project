import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { Connect_DB } from "../enum/connect-ennum";
import { ConfigService } from "@nestjs/config";
import { IEnv } from "../interface/env.interface";
import { models } from "../../infrastructure/adapters/repositories/typeorm/model";

export const typeOrmOption = (): TypeOrmModuleAsyncOptions => ({
    name: Connect_DB.MAIN,
    useFactory: (config: ConfigService<IEnv>) => ({
        type: 'postgres',
        host: config.get('DATABASE_HOST'),
        username: config.get('DATABASE_USER'),
        port: config.get('DATABASE_PORT'),
        database: config.get('DATABASE_NAME'),
        password: config.get('DATABASE_PASSWORD'),
        entities: models,
        synchronize: true,
        logging: false
    }),
    inject: [ConfigService]
})