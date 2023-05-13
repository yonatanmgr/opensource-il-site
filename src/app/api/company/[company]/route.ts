import { extractParamFromUrl } from '@/server/utils/extractParamFromUrl';
import { logger } from '@/server/utils/logger';
import getUuid from '@/server/utils/uuid';
import { NextRequest, NextResponse } from 'next/server';
import { fetchCompany } from '@/server/services/dataManager.service';

export async function GET(req: NextRequest) {
  const uuid = getUuid();
  const companyId = extractParamFromUrl(req);
  if (!companyId) {
    throw new Error('no valid companyid');
  }
  const company = await fetchCompany(companyId);
  const payload = { uuid, company: company || null, success: !!company };
  logger.info('request company', payload);
  return NextResponse.json(payload);
}
