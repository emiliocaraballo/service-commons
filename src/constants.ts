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
};
