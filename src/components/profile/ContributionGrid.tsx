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
  startDate?: string;
  endDate?: string;
  data: Activity[];
  weeklyColumnGap?: number;
  size?: number;
  selectedYear?: number;
  onYearChange?: (year: number) => void;
  availableYears?: number[];
  accountCreatedYear?: number;
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
  const currentYear = selectedYear || new Date().getFullYear();
  const realCurrentYear = new Date().getFullYear();

  const defaultAvailableYears =
    availableYears ??
    (() => {
      const createdYear = accountCreatedYear || realCurrentYear - 4;
      const years: number[] = [];
      for (let y = realCurrentYear; y >= createdYear; y--) years.push(y);
      return years;
    })();

  const actualStartDate =
    startDate ??
    (() => {
      return `${currentYear}-01-01`;
    })();

  const actualEndDate =
    endDate ??
    (() => {
      if (currentYear === realCurrentYear) {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
          today.getDate()
        ).padStart(2, '0')}`;
      }
      return `${currentYear}-12-31`;
    })();

  const parsedEndDate = useMemo(() => parseDate(actualEndDate), [actualEndDate]);

  const map = useMemo(() => {
    const m = new Map<string, number>();
    data.forEach(({ date, count }) => m.set(date, count));
    return m;
  }, [data]);

  const { weeks, monthLabels } = useMemo(() => {
    const s = calculateWeekStart(parseDate(actualStartDate));
    const e = parseDate(actualEndDate);

    const cols: Date[][] = [];
    const labels: { col: number; month: string }[] = [];

    const cursor = new Date(s);
    let colIndex = 0;

    while (cursor <= e) {
      const weekStart = new Date(cursor);
      const weekEnd = new Date(cursor);
      weekEnd.setDate(cursor.getDate() + 6);

      for (let d = new Date(weekStart); d <= weekEnd; d.setDate(d.getDate() + 1)) {
        if (d.getDate() === 1 && d >= s && d <= e) {
          labels.push({ col: colIndex, month: MONTH_NAMES[d.getMonth()] ?? 'Unknown' });
          break;
        }
      }

      const col: Date[] = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(cursor);
        d.setDate(cursor.getDate() + i);
        col.push(d);
      }
      cols.push(col);

      cursor.setDate(cursor.getDate() + 7);
      colIndex++;
    }

    return { weeks: cols, monthLabels: labels };
  }, [actualStartDate, actualEndDate]);

  const totalActivities = useMemo(() => data.reduce((sum, a) => sum + a.count, 0), [data]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentYear === realCurrentYear && scrollContainerRef.current) {
      const scrollToEnd = () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
      };
      scrollToEnd();
      requestAnimationFrame(scrollToEnd);
    }
  }, [currentYear, realCurrentYear, actualStartDate, size, weeklyColumnGap]);

  return (
    <Flex direction="column" gap={3}>
      <HStack align="flex-start" gap={6}>
        {/* 잔디 영역 */}
        <Box w="100%" maxW="65rem" overflowX="auto" ref={scrollContainerRef}>
          <Flex direction="column" gap={3} minW="fit-content">
            <Box>
              {/* 월 라벨 */}
              <Box mb={2}>
                <HStack gap={weeklyColumnGap} align="flex-end">
                  {weeks.map((week) => {
                    const weekStartDate = week[0];
                    if (!weekStartDate) {
                      return <Box key={`week-label-empty-${Math.random()}`} w={`${size}px`} />;
                    }
                    const weekKey = formatDateString(weekStartDate);
                    const label = monthLabels.find((l) => l.col === weeks.indexOf(week))?.month;
                    return (
                      <Box key={`week-label-${weekKey}`} w={`${size}px`} textAlign="left">
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

              {/* 그리드 */}
              <HStack align="flex-start" gap={weeklyColumnGap}>
                {weeks.map((week) => {
                  const weekStartDate = week[0];
                  if (!weekStartDate) {
                    return (
                      <Flex key={`week-empty-${Math.random()}`} direction="column" gap="2px" />
                    );
                  }
                  const weekKey = formatDateString(weekStartDate);

                  return (
                    <Flex key={`week-${weekKey}`} direction="column" gap="2px">
                      {Array.from({ length: 7 }, (_, row) => {
                        const date = week[row];
                        if (!date || date > parsedEndDate) {
                          return (
                            <Box key={`day-${weekKey}-${row}`} w={`${size}px`} h={`${size}px`} />
                          );
                        }

                        const key = formatDateString(date);
                        const count = map.get(key) ?? 0;

                        return (
                          <Box
                            key={`day-${weekKey}-${row}`}
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
                  );
                })}
              </HStack>
            </Box>
          </Flex>
        </Box>

        {/* 연도 선택 */}
        {defaultAvailableYears.length > 0 && (
          <Flex direction="column" gap={2} flexShrink={0}>
            {defaultAvailableYears.map((year) => (
              <Box
                key={`year-${year}`}
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
                _hover={{ color: 'blue.500', bg: 'blue.50', borderColor: 'blue.200' }}
                transition="all 0.2s"
              >
                {year}
              </Box>
            ))}
          </Flex>
        )}
      </HStack>

      {/* 하단 범례 */}
      <HStack justify="space-between" align="center" w="100%" maxW="62.5rem">
        <Text fontSize="xs" color="gray.600">
          {totalActivities} activities in {currentYear}
        </Text>

        <HStack gap={2}>
          <Text fontSize="xs" color="gray.600">
            Less
          </Text>
          {getLegendColors().map((c) => (
            <Box
              key={`legend-${c}`} // ✅ 색상 값 자체를 key로 사용
              w={`${size}px`}
              h={`${size}px`}
              bg={c}
              borderRadius="2px"
            />
          ))}

          <Text fontSize="xs" color="gray.600">
            More
          </Text>
        </HStack>
      </HStack>
    </Flex>
  );
}
