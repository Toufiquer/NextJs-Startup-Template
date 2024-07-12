/*
|-----------------------------------------
| setting up app middleware
| @author: Jahid Haque <jahid.haque@yahoo.com>
| @copyright: ,
|-----------------------------------------
*/

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { getSession } from '@/libs/session';

import { AppConfig } from './utils/AppConfig';

const intlMiddleware = createMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

export default async function authMiddleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;
  const session = await getSession();

  if (currentPath.includes('/dashboard') && !session.user) {
    return NextResponse.redirect(
      new URL('/sign-in?redirectUrl=/dashboard', req.url),
    );
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
