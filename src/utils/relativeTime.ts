export function formatRelativeTime(input: string | Date): string {
  const now = Date.now();
  const t = typeof input === 'string' ? new Date(input).getTime() : input.getTime();
  const diffMs = Math.max(0, now - t);
  const min = 60 * 1000;
  const hour = 60 * min;
  const day = 24 * hour;
  const week = 7 * day;

  if (diffMs < min) return '방금 전';
  if (diffMs < hour) return `${Math.floor(diffMs / min)}분 전`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)}시간 전`;
  if (diffMs < week) return `${Math.floor(diffMs / day)}일 전`;

  const d = new Date(t);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${dd}`;
}
