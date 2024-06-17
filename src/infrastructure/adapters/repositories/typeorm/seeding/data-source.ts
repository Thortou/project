import { config } from 'dotenv';
import 'reflect-metadata';
import { userSeeders } from '../../../../../modules/users/seeds/seeders';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions, runSeeders } from 'typeorm-extension';
import { models } from '../model';
config();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: models,
  seeds: [
    ...userSeeders,
  ],
};
const dataSource = new DataSource(options);
dataSource.initialize().then(async () => {
  await runSeeders(dataSource);
});   
