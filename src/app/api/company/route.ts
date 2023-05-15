import { extractParamFromUrl } from '@/server/utils/extractParamFromUrl';
import { logger } from '@/server/utils/logger';
import getUuid from '@/server/utils/uuid';
import { NextRequest, NextResponse } from 'next/server';
import { fetchAllCompanies } from '@/server/services/dataManager.service';

export async function GET(req: NextRequest) {
  const uuid = getUuid();
  const companies = await fetchAllCompanies();
  const payload = {
    uuid,
    companies,
    success: companies?.length ? true : false
  };
  logger.info('request company', {
    uuid,
    success: companies?.length ? true : false,
    companies: companies?.length
  });
  return NextResponse.json(payload);
}
