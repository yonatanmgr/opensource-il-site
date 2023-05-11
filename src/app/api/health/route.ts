import { NextRequestExtended } from '@/types/next';
import { NextResponse } from 'next/server';

export async function GET(
  request: NextRequestExtended,
  response: NextResponse
) {
  console.log('🚀 ~ file: route.ts:5 ~ GET ~ request:', request.uuid);
  const data = {
    requestId: request.uuid /*|| response.headers.get('uuid')*/,
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date()
  };
  return NextResponse.json(data);
}
