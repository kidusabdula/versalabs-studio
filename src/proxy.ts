import { NextResponse, type NextRequest } from 'next/server';

// Project slugs are lowercase. A mixed-case URL such as /work/SafeFrame gets a
// permanent redirect to the lowercase URL. This can't live in next.config
// redirects: their matching ignores case, so a lowercase target would loop.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lower = pathname.toLowerCase();
  if (pathname === lower) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = lower;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/work/:path*', '/products/:path*', '/projects/:path*'],
};
