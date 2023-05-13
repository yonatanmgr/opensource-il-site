import { createClient } from 'redis';
import { logger } from '../utils/logger';

const redisClient = createClient();

redisClient.on('error', (err) => logger.error(`Redis Error: ${err}`));
redisClient.on('connect', () => logger.info('Redis connected'));
redisClient.on('reconnecting', () => logger.info('Redis reconnecting'));
redisClient.on('ready', () => {
  logger.info('Redis ready!');
});

export async function getFromRedis(key: string): Promise<any> {
  try {
    await redisClient.connect();
    return await redisClient.get(key);
  } catch (error) {
    logger.error('🚀 ~ file: redis.ts:18 ~ getFromRedis ~ error:', error);
  } finally {
    await redisClient.disconnect();
  }
}

export async function storeInRedis(key: string, value: any) {
  try {
    await redisClient.connect();
    await redisClient.set(key, value);
    return true;
  } catch (error) {
    logger.error('🚀 ~ file: redis.ts:28 ~ storeInRedis ~ error:', error);
  } finally {
    await redisClient.disconnect();
  }
}
