import { TRIGGER_DATA_REFETCH } from '@/server/config';
import { getRedisVal, setRedisVal } from '@/server/db/redis-vercel-kv';
import { mainDataFetch } from '@/server/services/dataManager.service';
import { extractSearchParams } from '@/server/utils/extractParamFromUrl';
import { logger } from '@/server/utils/logger';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const searchParams = extractSearchParams(req);
  let isRefetch = false;
  if (searchParams?.refetch && searchParams.refetch === TRIGGER_DATA_REFETCH) {
    isRefetch = true;
  }
  const data = await mainDataFetch(isRefetch);
  await setRedisVal('test', new Date().toISOString());
  const r = await getRedisVal('test');
  logger.info('api/', {
    successRedis: !!r,
    dataSuccess: data?.success,
    date: new Date(),
    isRefetch
  });
  return NextResponse.json({
    refetch: isRefetch,
    api: 'online',
    data
  });
}
