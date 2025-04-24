import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Don't redirect root path to dashboard anymore - keep the landing page
  // Only redirect /login to dashboard to simulate auto-login
  if (req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // BYPASS AUTHENTICATION - Direct access to dashboard without login
  // This is for development purposes only and should be removed in production
  if (
    req.nextUrl.pathname.startsWith('/dashboard') ||
    req.nextUrl.pathname.startsWith('/homework') ||
    req.nextUrl.pathname.startsWith('/video') ||
    req.nextUrl.pathname.startsWith('/profile') ||
    req.nextUrl.pathname.startsWith('/subscription')
  ) {
    return res;
  }

  // Skip Supabase client creation entirely for now
  return res;
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/homework/:path*',
    '/video/:path*',
    '/profile/:path*',
    '/subscription/:path*',
    '/login',
    '/register',
  ],
} 