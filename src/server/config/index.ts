import { logger } from '../utils/logger';

type ConfigVars = {
  NODE_ENV: string;
  PORT: string;
  SECRET_KEY: string;
  LOG_FORMAT: string;
  LOG_DIR: string;
  GITHUB_READ_ONLY: string;
  UPDATE_PASSWORD: string;
  MONGODB_URI: string;
};

export const {
  NODE_ENV,
  PORT,
  GITHUB_READ_ONLY,
  UPDATE_PASSWORD,
  MONGODB_URI,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR
} = process.env as ConfigVars;

const testVars: ConfigVars = {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  GITHUB_READ_ONLY,
  UPDATE_PASSWORD,
  MONGODB_URI
};

for (const key in testVars) {
  if (!key) {
    logger.error('🚀 ~ file: index.ts:34 ~ key:', {
      key,
      var: testVars[key as keyof ConfigVars]
    });
  }
}
