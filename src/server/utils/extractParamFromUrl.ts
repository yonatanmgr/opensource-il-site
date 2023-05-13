import { NextRequest } from 'next/server';
import { logger } from './logger';

export function extractParamFromUrl(req: NextRequest) {
  try {
    if (!req.url) {
      throw new Error('no req.url');
    }
    const urlObj = new URL(req.url);
    return urlObj.pathname.split('/').pop();
  } catch (error) {
    logger.error(
      '🚀 ~ file: extractParamFromUrl.ts:13 ~ extractParamFromUrl ~ error:',
      error
    );
    return null;
  }
}
