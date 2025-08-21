import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
    API_BASE: process.env.API_BASE,
    NODE_ENV: process.env.NODE_ENV,
  });
}
