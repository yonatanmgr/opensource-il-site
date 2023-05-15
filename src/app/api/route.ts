import {
  GetDataCronSingleton,
  mainDataFetch
} from '@/server/services/dataManager.service';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  GetDataCronSingleton.getInstance();
  const r = await mainDataFetch();
  return NextResponse.json({ api: 'online', r });
}
