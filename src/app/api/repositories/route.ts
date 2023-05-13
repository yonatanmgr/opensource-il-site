import { extractParamFromUrl } from '@/server/utils/extractParamFromUrl';
import { logger } from '@/server/utils/logger';
import getUuid from '@/server/utils/uuid';
import { NextRequest, NextResponse } from 'next/server';
import { fetchAllRepositories } from '@/server/services/dataManager.service';

export async function GET(req: NextRequest) {
  const uuid = getUuid();
  const companyId = extractParamFromUrl(req);
  if (!companyId) {
    throw new Error('no valid companyid');
  }
  const companies = await fetchAllRepositories();
  const payload = {
    uuid,
    companies,
    success: companies?.length ? true : false
  };
  logger.info('request company', payload);
  return NextResponse.json(payload);
}
