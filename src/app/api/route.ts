import { getRedisVal, setRedisVal } from '@/server/db/redis-vercel-kv';
import { mainDataFetch } from '@/server/services/dataManager.service';
import { logger } from '@/server/utils/logger';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await mainDataFetch();
  await setRedisVal('test', new Date().toISOString());
  const r = await getRedisVal('test');
  logger.info('api/', {
    successRedis: !!r,
    dataSuccess: data?.success,
    date: new Date()
  });
  return NextResponse.json({ api: 'online', data });
}
