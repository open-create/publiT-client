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

  // 로컬스토리지에 저장된 accessToken 자동 주입 (클라이언트 환경만)
  const storedToken =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') ?? undefined : undefined;
  const effectiveToken = token ?? storedToken;

  const doFetch = async (authToken?: string) =>
    await fetch(`${API_BASE}${path}`, {
      method: init.method ?? 'GET',
      headers: {
        // Content-Type은 body가 있을 때만 설정 (빈 POST의 preflight 방지)
        ...(!isFormData && body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...headers,
      } as HeadersInit,
      body: body === undefined ? undefined : isFormData ? (body as FormData) : JSON.stringify(body),
      // 기본은 쿠키 전송 안 함(Authorization 토큰 사용). 필요 시 호출부에서 credentials 지정
      credentials: init.credentials ?? 'omit',
      ...init,
    });

  let res = await doFetch(effectiveToken);

  if (process.env.NODE_ENV === 'development') {
    try {
      console.log('[request]', {
        url: `${API_BASE}${path}`,
        method: init.method ?? 'GET',
        hasAuthHeader: Boolean(effectiveToken),
        credentials: init.credentials ?? 'omit',
      });
    } catch {}
  }

  // 204 No Content 대응
  if (res.status === 204) return undefined as unknown as T;

  const ct = res.headers.get('content-type') ?? '';
  const parse = async () => (ct.includes('application/json') ? await res.json() : await res.text());

  // 401이면 토큰 재발급 시도 후 1회 재시도
  if (res.status === 401) {
    try {
      const refresh = await fetch(`${API_BASE}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
      });
      if (refresh.ok) {
        const refreshed = (await refresh.json()) as any;
        const newToken: string | undefined = refreshed?.data;
        if (newToken && typeof window !== 'undefined') {
          localStorage.setItem('accessToken', newToken);
        }
        res = await doFetch(newToken ?? undefined);
      }
    } catch {}
  }

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
