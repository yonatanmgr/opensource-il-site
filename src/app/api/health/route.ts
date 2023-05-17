import { NextResponse } from 'next/server';
// utils
import { logger } from '@/server/utils/logger';
import getUuid from '@/server/utils/uuid';
import { getRedisVal, setRedisVal } from '@/server/db/redis-vercel-kv';
import { NODE_ENV } from '@/server/config';

export const dynamic = 'force-dynamic';

export async function GET() {
  await setRedisVal('test', getUuid());

  const data = {
    requestId: getUuid(),
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date(),
    apiRedis: NODE_ENV,
    redis: await getRedisVal('test')
  };
  logger.info('/api/health', data);
  return NextResponse.json(data);
}
