// ===================
// 모든 날짜 관련 함수 통합
// ===================

// 날짜 문자열을 Date 객체로 변환
export function parseDate(dateString: string): Date {
  return new Date(dateString + 'T00:00:00');
}

// Date 객체를 YYYY-MM-DD 문자열로 변환
export function formatDateString(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${date.getFullYear()}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`;
}

// 주의 시작일 (일요일) 계산
export function calculateWeekStart(date: Date): Date {
  const result = new Date(date);
  const weekDay = date.getDay(); // 일=0 … 토=6 (일요일 시작)
  result.setDate(date.getDate() - weekDay);
  return result;
}

// 상대 시간 문자열 생성
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

// 한국어 날짜 문자열 생성
export function formatKoreanDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return dateObj.toLocaleDateString('ko-KR', options || defaultOptions);
}

// 날짜와 시간 문자열 생성
export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return dateObj.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// 시간 문자열 생성
export function formatTimeString(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return dateObj.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
