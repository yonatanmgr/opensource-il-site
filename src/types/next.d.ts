import type { NextRequest } from 'next/server';

/**
 * A NextRequest type extention to be used project wide
 *
 *
 * @param {NextRequest} request - the default consumption.
 * @example
 * ```ts
 * export function middleware(request: NextRequestExtended) {
 *  request.uuid = getUuid();
 *  return response;
 * }
 * ```
 * @see {@link ./src/types/next.d.ts | Request Extended Documentation}
 */
interface NextRequestExtended extends NextRequest {
  uuid: string;
}
