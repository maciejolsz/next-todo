import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from "next/server";
import { cookies } from 'next/headers'

import { auth } from "@/auth"

export async function middleware(request: NextRequest) {
  const session = await auth();
  const defaultLang = cookies().get("NEXT_LOCALE")?.value || "en";
  const isAtWorkshop = request.nextUrl.pathname.includes('/workshop');

  // redirect to homepage if there's no session under /workshop
  if (!session && isAtWorkshop) return NextResponse.redirect(new URL(`/${defaultLang}/unauthorised`, request.url))

  const handleI18nRouting = createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'pl'],
    // Used when no locale matches
    defaultLocale: 'en'
  });

  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/', '/(pl|en)/:path*']
};
