import { NextResponse, type NextRequest } from 'next/server';
// Note: We cannot easily use the full supabase client in edge middleware without specific helpers.
// For this project, we'll keep it simple: client-side redirection is already handled in pages.
// But we'll add a placeholder middleware to demonstrate structure.

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Example: Basic redirection for root if no session cookie exists
  // if (pathname === '/' && !request.cookies.get('sb-access-token')) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/data', '/users', '/prediction', '/history', '/evaluation', '/map'],
};
