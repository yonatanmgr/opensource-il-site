import { logger } from '../utils/logger';

type ConfigVars = {
  NODE_ENV: string;
  PORT: string;
  SECRET_KEY: string;
  LOG_FORMAT: string;
  GITHUB_READ_ONLY: string;
  MONGODB_URI: string;
  TRIGGER_DATA_REFETCH: string;
};

export const {
  NODE_ENV,
  PORT,
  GITHUB_READ_ONLY,
  MONGODB_URI,
  SECRET_KEY,
  LOG_FORMAT,
  TRIGGER_DATA_REFETCH
} = process.env as ConfigVars;

const testVars: ConfigVars = {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_FORMAT,
  GITHUB_READ_ONLY,
  MONGODB_URI,
  TRIGGER_DATA_REFETCH
};

for (const key in testVars) {
  if (!key) {
    logger.error('🚀 ~ file: index.ts:34 ~ key:', {
      key,
      var: testVars[key as keyof ConfigVars]
    });
  }
}
