import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const response = new NextResponse(
    JSON.stringify({ success: true }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
  
  response.cookies.set('session', '', { 
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  
  return response;
}
