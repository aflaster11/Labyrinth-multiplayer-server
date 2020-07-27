import * as dotenv from 'dotenv';
import * as path from 'path';
// @ts-ignore
import * as pkg from '../package.json';

// Load .env file
dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'test') ? '.test' : '')}`) });
import {
  getOsEnv, getOsEnvOptional, getOsPath, getOsPaths, normalizePort, toBool
} from './lib/env';
 /**
  * Environment variables
  */
export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  releaseVersion: process.env.RELEASE_VERSION || 'No available',
  app: {
    name: getOsEnv('APP_NAME'),
    version: (pkg as any).version,
    description: (pkg as any).description,
    host: getOsEnv('APP_HOST'),
    schema: getOsEnv('APP_SCHEMA'),
    routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
    port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
    banner: toBool(getOsEnv('APP_BANNER')),
    dirs: {
      migrations: getOsPaths('TYPEORM_MIGRATIONS'),
      migrationsDir: getOsPath('TYPEORM_MIGRATIONS_DIR'),
      entities: getOsPaths('TYPEORM_ENTITIES'),
      entitiesDir: getOsPath('TYPEORM_ENTITIES_DIR'),
      controllers: getOsPaths('CONTROLLERS'),
      wsControllers: getOsPaths('WS-CONTROLLERS'),
      middlewares: getOsPaths('MIDDLEWARES'),
      interceptors: getOsPaths('INTERCEPTORS'),
    }
  },
  log: {
    level: getOsEnv('LOG_LEVEL'),
    output: getOsEnv('LOG_OUTPUT'),
  },
  db: {
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: getOsEnvOptional('TYPEORM_SYNCHRONIZE') || false,
    dropSchema: getOsEnvOptional('TYPEORM_DROP') || false
  },
};
