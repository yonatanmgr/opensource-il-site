import { extractParamFromUrl } from '@/server/utils/extractParamFromUrl';
import { logger } from '@/server/utils/logger';
import getUuid from '@/server/utils/uuid';
import { NextRequest, NextResponse } from 'next/server';
import { fetchCompany } from '@/server/services/dataManager.service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const uuid = getUuid();
  const companyId = extractParamFromUrl(req);
  if (!companyId) {
    logger.error('missing companyId', { companyId });
    return NextResponse.json({ error: 'no valid companyid' });
  }
  const company = await fetchCompany(companyId);
  const payload = { uuid, company: company || null, success: !!company };
  logger.info('request company', payload);
  return NextResponse.json(payload);
}
