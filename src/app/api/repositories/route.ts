import { logger } from '@/server/utils/logger';
import getUuid from '@/server/utils/uuid';
import { NextResponse } from 'next/server';
import { fetchAllRepositories } from '@/server/services/dataManager.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  const uuid = getUuid();
  const repositories = await fetchAllRepositories();
  const payload = {
    uuid,
    repositories,
    success: repositories?.length ? true : false
  };
  logger.info('request repository', {
    uuid,
    success: repositories?.length ? true : false,
    repositories: repositories?.length
  });
  return NextResponse.json(payload);
}
