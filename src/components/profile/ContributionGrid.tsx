'use client';

import { useMemo, useEffect, useRef } from 'react';
import { Box, Flex, Text, HStack } from '@chakra-ui/react';
import { parseDate, formatDateString, calculateWeekStart } from '@/utils/formatDate';
import { getActivityColor, getLegendColors, MONTH_NAMES } from '@/utils/activityGrid';

type Activity = {
  date: string;
  count: number;
};

type Props = {
  startDate?: string; // '2024-06-01' 처럼 주단위로 시작 안 해도 됨
  endDate?: string; // '2025-05-31'
  data: Activity[]; // 기간 안의 데이터만 주면 됨
  weeklyColumnGap?: number; // px
  size?: number; // 각 칸 한 변(px)
  selectedYear?: number; // 선택된 년도
  onYearChange?: (year: number) => void; // 년도 변경 핸들러
  availableYears?: number[]; // 사용 가능한 년도 목록
  accountCreatedYear?: number; // 계정 생성 년도
};

export default function ContributionGrid({
  startDate,
  endDate,
  data,
  weeklyColumnGap = 4,
  size = 16,
  selectedYear,
  onYearChange,
  availableYears,
  accountCreatedYear,
}: Props) {
  // 현재 년도를 기본값으로 사용
  const currentYear = selectedYear || new Date().getFullYear();
  const realCurrentYear = new Date().getFullYear();

  // availableYears가 없으면 계정 생성 년도부터 현재 년도까지 자동 생성
  const defaultAvailableYears =
    availableYears ||
    (() => {
      const createdYear = accountCreatedYear || realCurrentYear - 4; // 기본 5년
      const years = [];
      for (let year = realCurrentYear; year >= createdYear; year--) {
        years.push(year);
      }
      return years;
    })();

  // startDate, endDate가 없으면 선택된 년도 기준으로 자동 생성
  const actualStartDate =
    startDate ||
    (() => {
      // 모든 연도: 해당 연도 1월 1일부터
      return `${currentYear}-01-01`;
    })();

  const actualEndDate =
    endDate ||
    (() => {
      if (currentYear === realCurrentYear) {
        // 현재 연도: 오늘까지
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
          today.getDate()
        ).padStart(2, '0')}`;
      } else {
        // 과거 연도: 해당 년도 12월 31일까지
        return `${currentYear}-12-31`;
      }
    })();

  // 날짜 -> count 맵
  const map = useMemo(() => {
    const m = new Map<string, number>();
    data.forEach(({ date, count }) => m.set(date, count));
    return m;
  }, [data]);

  const { weeks, monthLabels } = useMemo(() => {
    const s = calculateWeekStart(parseDate(actualStartDate));
    const e = parseDate(actualEndDate);
    // 주 단위 열 채우기
    const cols: Date[][] = [];
    const labels: { col: number; month: string }[] = [];

    let cursor = new Date(s);
    let colIndex = 0;

    while (cursor <= e) {
      // 월 라벨: 해당 주에 새로운 월의 첫 날이 포함되어 있으면 표시
      const weekStart = new Date(cursor);
      const weekEnd = new Date(cursor);
      weekEnd.setDate(cursor.getDate() + 6);

      // 이번 주에 새로운 월이 시작되는지 확인 (범위 내에서만)
      for (let d = new Date(weekStart); d <= weekEnd; d.setDate(d.getDate() + 1)) {
        if (d.getDate() === 1 && d >= s && d <= e) {
          labels.push({
            col: colIndex,
            month: MONTH_NAMES[d.getMonth()],
          });
          break;
        }
      }
      // 한 주(일~토) 7칸
      const col: Date[] = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(cursor);
        d.setDate(cursor.getDate() + i);
        col.push(d);
      }
      cols.push(col);
      // 다음 주
      cursor.setDate(cursor.getDate() + 7);
      colIndex++;
    }
    return { weeks: cols, monthLabels: labels };
  }, [actualStartDate, actualEndDate]);

  // 총 활동 수 계산
  const totalActivities = data.reduce((sum, activity) => sum + activity.count, 0);

  // 스크롤 컨테이너 ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 현재 연도일 때 현재 날짜 위치로 스크롤
  useEffect(() => {
    if (currentYear === realCurrentYear && scrollContainerRef.current) {
      const today = new Date();
      const startDate = parseDate(actualStartDate);

      console.log('=== 스크롤 위치 계산 디버그 ===');
      console.log('오늘 날짜:', today.toLocaleDateString());
      console.log('시작 날짜:', actualStartDate);
      console.log('현재 연도:', currentYear);
      console.log('실제 현재 연도:', realCurrentYear);

      // 시작일부터 오늘까지의 주 수 계산
      const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const weeksDiff = Math.floor(daysDiff / 7);

      console.log('일수 차이:', daysDiff);
      console.log('주수 차이:', weeksDiff);

      // 스크롤을 맨 끝으로 이동 (현재 날짜가 맨 오른쪽에 보이도록)
      console.log('스크롤을 맨 끝으로 이동');
      console.log('================================');

      // 즉시 스크롤 적용 + requestAnimationFrame으로 확실하게
      const scrollToEnd = () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
      };

      scrollToEnd(); // 즉시 실행
      requestAnimationFrame(scrollToEnd); // 다음 프레임에서 한 번 더
    }
  }, [currentYear, realCurrentYear, actualStartDate, size, weeklyColumnGap]);

  return (
    <Flex direction="column" gap={3}>
      {/* 메인 컨테이너: 잔디 + 연도 선택창 */}
      <HStack align="flex-start" gap={6}>
        {/* 잔디 컨테이너 (스크롤 가능) */}
        <Box w="100%" maxW="62.5rem" overflowX="auto" ref={scrollContainerRef}>
          <Flex direction="column" gap={3} minW="fit-content">
            {/* 잔디 본체 */}
            <Box>
              {/* 상단 월 라벨 */}
              <Box mb={2}>
                <HStack gap={weeklyColumnGap} align="flex-end">
                  {weeks.map((_, col) => {
                    const label = monthLabels.find((l) => l.col === col)?.month;
                    return (
                      <Box key={col} w={`${size}px`} textAlign="left">
                        {label && (
                          <Text fontSize="xs" color="gray.500" whiteSpace="nowrap">
                            {label}
                          </Text>
                        )}
                      </Box>
                    );
                  })}
                </HStack>
              </Box>

              {/* 잔디 그리드 */}
              <HStack align="flex-start" gap={weeklyColumnGap}>
                {weeks.map((week, col) => (
                  <Flex key={col} direction="column" gap="2px">
                    {Array.from({ length: 7 }, (_, row) => {
                      const date = week[row];
                      if (!date) {
                        // 날짜가 없는 경우 빈 공간
                        return <Box key={`${col}-${row}`} w={`${size}px`} h={`${size}px`} />;
                      }

                      // 종료 날짜를 넘어서는 날짜는 빈 공간으로 표시
                      const endDate = parseDate(actualEndDate);
                      if (date > endDate) {
                        return <Box key={`${col}-${row}`} w={`${size}px`} h={`${size}px`} />;
                      }

                      const key = formatDateString(date);
                      const count = map.get(key) ?? 0;
                      return (
                        <Box
                          key={`${col}-${row}`}
                          aria-label={`${key} ${count} activities`}
                          role="img"
                          w={`${size}px`}
                          h={`${size}px`}
                          bg={getActivityColor(count)}
                          borderRadius="2px"
                        />
                      );
                    })}
                  </Flex>
                ))}
              </HStack>
            </Box>
          </Flex>
        </Box>

        {/* 연도 선택창 (세로 배치) */}
        {defaultAvailableYears.length > 0 && (
          <Flex direction="column" gap={2} flexShrink={0}>
            {defaultAvailableYears.map((year) => (
              <Box
                key={year}
                as="button"
                onClick={() => onYearChange?.(year)}
                px={3}
                py={2}
                fontSize="xs"
                color={year === currentYear ? 'blue.500' : 'gray.500'}
                fontWeight={year === currentYear ? 'semibold' : 'normal'}
                bg={year === currentYear ? 'blue.50' : 'transparent'}
                borderRadius="md"
                border="1px solid"
                borderColor={year === currentYear ? 'blue.200' : 'gray.200'}
                minW="60px"
                textAlign="center"
                _hover={{
                  color: 'blue.500',
                  bg: 'blue.50',
                  borderColor: 'blue.200',
                }}
                transition="all 0.2s"
              >
                {year}
              </Box>
            ))}
          </Flex>
        )}
      </HStack>

      {/* 하단 정보 및 범례 */}
      <HStack justify="space-between" align="center" w="100%" maxW="62.5rem">
        <Text fontSize="xs" color="gray.600">
          {totalActivities} activities in {currentYear}
        </Text>

        <HStack gap={2}>
          <Text fontSize="xs" color="gray.600">
            Less
          </Text>
          {getLegendColors().map((c, i) => (
            <Box key={i} w={`${size}px`} h={`${size}px`} bg={c} borderRadius="2px" />
          ))}
          <Text fontSize="xs" color="gray.600">
            More
          </Text>
        </HStack>
      </HStack>
    </Flex>
  );
}
