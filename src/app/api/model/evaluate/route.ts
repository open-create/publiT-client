import { NextRequest, NextResponse } from 'next/server';

// 런타임 환경 변수(서버 전용) 사용. 배포 시 Cloud Run/Secret Manager에 설정.
const MODEL_API_BASE = process.env.MODEL_API_BASE || process.env.NEXT_PUBLIC_MODEL_API_BASE || '';

export async function POST(req: NextRequest) {
  try {
    if (!MODEL_API_BASE) {
      return NextResponse.json({ message: 'MODEL_API_BASE is not configured' }, { status: 500 });
    }
    const body = await req.json();
    const res = await fetch(`${MODEL_API_BASE.replace(/\/$/, '')}/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      // 모델 서버는 쿠키 불필요
    });
    const text = await res.text();
    const contentType = res.headers.get('content-type') || '';
    if (!res.ok) {
      return NextResponse.json({ message: text || res.statusText }, { status: res.status });
    }
    const json = contentType.includes('application/json') ? JSON.parse(text) : { raw: text };
    return NextResponse.json(json, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
