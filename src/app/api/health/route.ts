import { NextResponse } from 'next/server';
// utils
import { logger } from '@/server/utils/logger';
import getUuid from '@/server/utils/uuid';
import { getRedisVal } from '@/server/db/redis-vercel-kv';

export async function GET() {
  const data = {
    requestId: getUuid(),
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date(),
    redis: await getRedisVal('test')
  };
  logger.info(data);
  return NextResponse.json(data);
}
