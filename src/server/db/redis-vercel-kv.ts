import { kv } from '@vercel/kv';
import { logger } from '../utils/logger';

export async function setRedisVal(key: string, value: unknown) {
  const payload = JSON.stringify({ data: value });
  return await kv.set(key, payload);
}

export async function getRedisVal(key: string) {
  try {
    const payload: { data: unknown } | null = await kv.get(key);
    if (!payload?.data) return null;
    // if (!payload?.data) throw new Error('error fetching data');
    return payload.data;
  } catch (error) {
    logger.warn('payload is null', error);
    return null;
  }
}

export async function getAllRedisKeys() {
  return await kv.keys('*');
}

export async function delRedisKey(key: string) {
  return await kv.del(key);
}
