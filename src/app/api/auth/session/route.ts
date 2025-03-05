import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUserById } from '@/lib/db/users';
import { initializeDatabase } from '@/lib/db/init';

export async function GET() {
  try {
    // Initialize database before any operations
    await initializeDatabase();
    
    const cookieStore = await cookies();
    const sessionCookie = await cookieStore.get('session');

    if (!sessionCookie?.value) {
      console.log('No session cookie found');
      return NextResponse.json({ user: null });
    }

    try {
      const userId = parseInt(sessionCookie.value, 10);
      if (isNaN(userId)) {
        console.error('Invalid session ID format');
        throw new Error('Invalid session ID');
      }

      const user = await getUserById(userId);
      if (!user) {
        console.log(`No user found for ID: ${userId}`);
        // Create response with cleared cookie
        const response = new NextResponse(
          JSON.stringify({ user: null }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );
        
        // Clear the session cookie
        response.cookies.set('session', '', { 
          maxAge: 0,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        return response;
      }

      console.log(`User session validated for ID: ${userId}`);
      return NextResponse.json({ user });
    } catch (error) {
      console.error('Error processing session:', error);
      throw error; // Re-throw to be caught by outer try-catch
    }
  } catch (error) {
    console.error('Session route error:', error);
    // Create response with cleared cookie
    const response = new NextResponse(
      JSON.stringify({ user: null }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    
    // Clear the session cookie
    response.cookies.set('session', '', { 
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    return response;
  }
}
