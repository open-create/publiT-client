import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const cookies = req.cookies;

  return NextResponse.json({
    url: req.url,
    searchParams: Object.fromEntries(searchParams.entries()),
    cookies: Object.fromEntries(cookies.getAll().map((cookie) => [cookie.name, cookie.value])),
    headers: Object.fromEntries(Array.from(req.headers.entries())),
  });
}
