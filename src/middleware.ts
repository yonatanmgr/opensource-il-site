// import getUuid from '@/utils/uuid';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware() {
  // request.uuid = getUuid();
  // response.headers.set('uuid', getUuid());
  // response.cookies?.set('uuid', getUuid());
  // console.log(
  //   '🚀 ~ file: middleware.ts:15 ~ response.cookies:',
  //   response.cookies
  // );

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
};
