export type ErrorShape = { data?: { message?: string }; message?: string };

export function getErrorMessage(e: unknown): string {
  if (typeof e === 'string') return e;
  if (e instanceof Error) return e.message;
  if (e && typeof e === 'object') {
    const m = e as Partial<ErrorShape>;
    if (typeof m.data?.message === 'string') return m.data.message;
    if (typeof m.message === 'string') return m.message;
  }
  return '발행에 실패했습니다.';
}
