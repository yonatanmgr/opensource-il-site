import { NextResponse } from 'next/server';
// utils
import { logger } from '@/server/utils/logger';
import getUuid from '@/server/utils/uuid';

export async function GET() {
  const data = {
    requestId: getUuid(),
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date()
  };
  logger.info(data);
  return NextResponse.json(data);
}
