import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  
  if (!['google', 'kakao', 'naver'].includes(provider)) {
    return NextResponse.json({ message: 'Unsupported provider' }, { status: 400 });
  }
  
  if (!API_BASE) {
    return NextResponse.json(
      {
        message: 'API_BASE is not configured',
        env: {
          NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
        },
      },
      { status: 500 }
    );
  }
  
  const url = new URL(`/auth/login-${provider}`, API_BASE.replace(/\/$/, ''));
  req.nextUrl.searchParams.forEach((v, k) => url.searchParams.set(k, v));
  
  return NextResponse.redirect(url.toString(), 302);
}
