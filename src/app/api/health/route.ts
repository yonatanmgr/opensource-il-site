import { NextResponse } from 'next/server';
// utils
import { logger } from '@/server/utils/logger';
import getUuid from '@/server/utils/uuid';
import { getRedisVal } from '@/server/db/redis-vercel-kv';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = {
    requestId: getUuid(),
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date(),
    apiRedis: process.env.KV_REST_API_URL,
    redis: await getRedisVal('test')
  };
  logger.info('/api/health', data);
  return NextResponse.json(data);
}
