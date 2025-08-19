'use client';

import { Box, VStack, Text } from '@chakra-ui/react';

interface VisitsChartProps {
  totalVisits: number;
  chartData?: Record<string, unknown>[]; // 추후 차트 라이브러리에 맞게 타입 정의
  title?: string;
}

export default function VisitsChart({
  totalVisits,
  chartData,
  title = '총 방문자 수',
}: VisitsChartProps) {
  return (
    <Box bg="gray.100" p={6} borderRadius="lg" h="100%">
      <VStack align="start" h="100%">
        {/* 제목 */}
        <Text fontSize="lg" fontWeight="semibold" color="gray.700">
          {title}
        </Text>

        {/* 총 방문자 수 */}
        <Text fontSize="3xl" fontWeight="bold" color="blue.500">
          {totalVisits.toLocaleString()}
        </Text>

        {/* 차트 영역 */}
        <Box flex="1" w="100%" bg="gray.200" borderRadius="md" p={4}>
          {chartData && chartData.length > 0 ? (
            // 추후 실제 차트 라이브러리 구현
            <Text fontSize="sm" color="gray.500" textAlign="center" mt={20}>
              차트 데이터 연결됨 (구현 예정)
            </Text>
          ) : (
            <Text fontSize="sm" color="gray.500" textAlign="center" mt={20}>
              차트 영역 (추후 구현)
            </Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
}
