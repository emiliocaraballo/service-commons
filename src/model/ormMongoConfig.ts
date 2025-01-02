// LIBRARIES
import constants from '../constants';
import { join } from 'path';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

export const getOrmConfig = (customPathEntities?: string) => {
  // Connection config TypeORM
  const config: MongoConnectionOptions = {
    type: 'mongodb',
    host: constants.DATABASE_MONGO_HOST,
    port: constants.DATABASE_MONGO_PORT,
    database: constants.DATABASE_MONGO_NAME,
    username: constants.DATABASE_MONGO_USER,
    password: constants.DATABASE_MONGO_PASSWORD,
    authSource: constants.NODE_ENV === 'local' ? undefined : 'admin', // Cambiar si se requiere otro authSource
    useUnifiedTopology: true,
    useNewUrlParser: true,
    entities: [join(__dirname, '**', '*.entity.{ts,js}'), customPathEntities],
    synchronize: false, // MongoDB no soporta el sincronizado de esquemas
    logging: constants.NODE_ENV !== 'production',
  };

  return config;
};
