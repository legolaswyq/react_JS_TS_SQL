import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { getUserById } from '@/lib/db/users';
import { initializeDatabase } from '@/lib/db/init';

export async function middleware(request: NextRequest) {
  // Skip API routes and static files
  if (
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('favicon.ico')
  ) {
    return NextResponse.next();
  }

  try {
    // Initialize database before any operations
    await initializeDatabase();
    
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    let user = null;

    if (sessionCookie?.value) {
      try {
        const userId = parseInt(sessionCookie.value, 10);
        if (!isNaN(userId)) {
          user = await getUserById(userId);
        }
      } catch (error) {
        console.error('Error fetching user in middleware:', error);
      }
    }

    // Create a new response
    const response = NextResponse.next();

    // Add session info to response headers for server components
    if (user) {
      response.headers.set('x-session-user', JSON.stringify(user));
    }

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
