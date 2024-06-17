import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { models } from './model';

config();

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: models,
  migrations: [
    'src/infrastructure/adapters/repositories/typeorm/migrations/*.ts',
  ],
  synchronize: false,
};

const dataSource = new DataSource(options);
export default dataSource;
