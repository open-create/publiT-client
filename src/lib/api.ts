export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '';

export class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
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
  const res = await fetch(`${API_BASE}${path}`, {
    method: init.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...init,
  });
  if (!res.ok) {
    // 응답 본문을 최대한 보존해 에러에 담아줌
    let payload: unknown = undefined;
    try {
      payload = await res.json();
    } catch {
      try {
        payload = await res.text();
      } catch {
        payload = undefined;
      }
    }
    const message = (payload as any)?.message ?? (res.statusText || `HTTP ${res.status}`);
    throw new ApiError(message, res.status, payload);
  }
  return res.json() as Promise<T>;
}
