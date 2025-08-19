// GitHub 스타일 활동 색상 팔레트 (낮음 → 높음)
const ACTIVITY_COLORS = [
  '#E9EEF6', // 0개 (매우 낮음)
  '#C6D5F6', // 1-2개 (낮음)
  '#8FB3FF', // 3-5개 (보통)
  '#3D86FF', // 6-9개 (높음)
  '#1E5BDD', // 10개+ (매우 높은)
] as const;

// 활동 수준별 임계값 (각 색상에 대응)
const ACTIVITY_THRESHOLDS = [0, 1, 3, 6, 10] as const;

// 활동 수에 따른 색상 반환 (이진 탐색으로 최적화)
// O(log n) 시간 복잡도
export function getActivityColor(count: number = 0): string {
  if (!ACTIVITY_THRESHOLDS.length || !ACTIVITY_COLORS.length) return 'gray';

  const lastThreshold = ACTIVITY_THRESHOLDS[ACTIVITY_THRESHOLDS.length - 1]!;
  const lastColor = ACTIVITY_COLORS[ACTIVITY_COLORS.length - 1] ?? 'gray';

  if (count <= 0) return ACTIVITY_COLORS[0] ?? 'gray';
  if (count >= lastThreshold) return lastColor;

  // 이진 탐색으로 적절한 색상 인덱스 찾기
  let left = 0;
  let right = ACTIVITY_THRESHOLDS.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right + 1) / 2);
    const threshold = ACTIVITY_THRESHOLDS[mid]!;
    if (count >= threshold) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }

  return ACTIVITY_COLORS[left] ?? 'gray';
}

// 범례용 색상 배열 반환 (불변 배열로 최적화)
export const getLegendColors = (): readonly string[] => ACTIVITY_COLORS;

// 월 이름 상수 (영문 축약형, 불변 배열)
// 인덱스 0 = January, 11 = December
export const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

// 월 이름을 숫자 인덱스로 가져오기
// @param monthIndex 0-11 (0=January, 11=December)
export const getMonthName = (monthIndex: number): string => {
  return MONTH_NAMES[monthIndex] ?? 'Invalid';
};

// 활동 수준별 설명 텍스트
// export const ACTIVITY_LEVEL_DESCRIPTIONS = [
//   '활동 없음',
//   '낮은 활동',
//   '보통 활동',
//   '높은 활동',
//   '매우 높은 활동',
// ] as const;

// 활동 수에 따른 설명 텍스트 반환
// export const getActivityLevelDescription = (count: number = 0): string => {
//   if (count <= 0) return ACTIVITY_LEVEL_DESCRIPTIONS[0];
//   if (count >= 10) return ACTIVITY_LEVEL_DESCRIPTIONS[4];
//   if (count >= 6) return ACTIVITY_LEVEL_DESCRIPTIONS[3];
//   if (count >= 3) return ACTIVITY_LEVEL_DESCRIPTIONS[2];
//   return ACTIVITY_LEVEL_DESCRIPTIONS[1];
// };
