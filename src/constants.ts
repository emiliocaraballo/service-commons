// Libraries
import { config } from 'dotenv';

// Dot env config
config();

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_URL: process.env.API_URL || 'http://localhost:3000',
  API_TOKEN_KEY_VALUE:
    process.env.API_TOKEN_KEY_VALUE ||
    '7fd2e24a7d6a7b666588c44d4f563e0334a789bae42a56368560c983170a269e',
  // POSTGRES
  DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
  DATABASE_USER: process.env.DATABASE_USER || 'postgres',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'postgres',
  DATABASE_NAME: process.env.DATABASE_NAME || 'postgres',
  DATABASE_PORT: Number(process.env.DATABASE_PORT) || 5432,
  // MONGODB
  DATABASE_MONGO_HOST: process.env.DATABASE_MONGO_HOST || 'localhost',
  DATABASE_MONGO_PORT: Number(process.env.DATABASE_MONGO_PORT) || 27017,
  DATABASE_MONGO_NAME: process.env.DATABASE_MONGO_NAME || 'admin',
  DATABASE_MONGO_USER: process.env.DATABASE_MONGO_USER || 'admin',
  DATABASE_MONGO_PASSWORD: process.env.DATABASE_MONGO_PASSWORD || 'admin',
};
