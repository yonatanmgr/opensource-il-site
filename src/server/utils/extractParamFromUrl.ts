import { NextRequest } from 'next/server';
import { logger } from './logger';

export function extractLastParamFromUrl(req: NextRequest) {
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

export function extractSearchParams(req: NextRequest) {
  try {
    if (!req.url) {
      throw new Error('no req.url');
    }
    const urlObj = new URL(req.url);

    return Array.from(urlObj.searchParams.entries()).reduce(
      (acc: any, item: string[]) => {
        acc[item[0]] = item[1];
        return acc;
      },
      {}
    );
  } catch (error) {
    logger.error(
      '🚀 ~ file: extractParamFromUrl.ts:13 ~ extractParamFromUrl ~ error:',
      error
    );
    return null;
  }
}
