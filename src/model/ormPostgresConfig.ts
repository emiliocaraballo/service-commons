// LIBRARIES
import constants from '../constants';
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const ormPostgresConfig = (
  customPathEntities?: string,
  customPathMigrations?: string,
) => {
  const pathMigrations = customPathMigrations || __dirname;

  // Connection config TypeORM
  const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: constants.DATABASE_HOST,
    username: constants.DATABASE_USER,
    password: constants.DATABASE_PASSWORD,
    database: constants.DATABASE_NAME,
    port: constants.DATABASE_PORT,
    ssl: constants.NODE_ENV === 'local' ? false : { rejectUnauthorized: false },
    entities: [join(__dirname, '**', '*.entity.{ts,js}'), customPathEntities],
    synchronize: false,
    migrationsTableName: 'api-migrations',
    migrations: [pathMigrations],
    logging: constants.NODE_ENV !== 'production',
  };

  return config;
};
