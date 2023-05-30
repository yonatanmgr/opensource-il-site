import { logger } from '@/server/utils/logger';
import getUuid from '@/server/utils/uuid';
import { NextResponse } from 'next/server';
import { fetchAllCompanies } from '@/server/services/dataManager.service';

export const dynamic = 'force-dynamic';

export async function GET() {
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
