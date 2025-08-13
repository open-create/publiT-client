export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '';

export class ApiError<T = unknown> extends Error {
  status: number;
  data: T;
  constructor(message: string, status: number, data?: T) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data as T;
  }
}

type FetchOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  token?: string;
};

export async function request<T>(
  path: string,
  { body, token, headers, ...init }: FetchOptions = {}
) {
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  const res = await fetch(`${API_BASE}${path}`, {
    method: init.method ?? 'GET',
    headers: {
      // FormData일 땐 브라우저가 boundary 포함해 자동 설정
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    } as HeadersInit,
    body: body === undefined ? undefined : isFormData ? (body as FormData) : JSON.stringify(body),
    // 필요 시 쿠키 인증을 쓴다면 아래 주석 해제
    // credentials: 'include',
    ...init,
  });

  // 204 No Content 대응
  if (res.status === 204) return undefined as unknown as T;

  const ct = res.headers.get('content-type') ?? '';
  const parse = async () => (ct.includes('application/json') ? await res.json() : await res.text());

  if (!res.ok) {
    let payload: unknown;
    try {
      payload = await parse();
    } catch {
      payload = undefined;
    }
    const message = (payload as any)?.message ?? res.statusText ?? `HTTP ${res.status}`;
    throw new ApiError(message, res.status, payload);
  }

  try {
    const data = (await parse()) as T;
    return data;
  } catch {
    // 응답 본문이 비어있거나 파싱 불가인 경우
    return undefined as unknown as T;
  }
}
