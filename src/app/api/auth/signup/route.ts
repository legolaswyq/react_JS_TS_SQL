import { NextResponse } from 'next/server';
import { createUser } from '@/lib/db/users';
import { initializeDatabase } from '@/lib/db/init';

export async function POST(request: Request) {
  try {
    // Initialize database before any operations
    await initializeDatabase();
    
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await createUser({ email, password, name });
    
    const response = new NextResponse(
      JSON.stringify({ user }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    
    response.cookies.set('session', user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    return response;
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Email already exists') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }
      
    console.error('Failed to create user:', error);
    
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
