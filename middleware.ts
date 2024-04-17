import createMiddleware from 'next-intl/middleware';
import {NextRequest} from "next/server";

export async function middleware(request: NextRequest) {



  console.log('middlewareInternationalization')

  const handleI18nRouting = createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'pl'],
    // Used when no locale matches
    defaultLocale: 'en'
  });

  return handleI18nRouting(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(pl|en)/:path*']
};
