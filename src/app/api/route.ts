import { mainDataFetch } from '@/server/services/dataManager.service';
import { logger } from '@/server/utils/logger';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await mainDataFetch();
  logger.info('api/', { success: data?.success, date: new Date() });
  return NextResponse.json({ api: 'online', data });
}
