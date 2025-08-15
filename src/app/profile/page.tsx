'use client';

import React, { useState } from 'react';
import { Container, Box, Heading } from '@chakra-ui/react';
import ContributionGrid from '@/components/profile/ContributionGrid';

// 년도별 활동 데이터 (실제로는 API에서 가져올 데이터)
const mockDataByYear: Record<number, { date: string; count: number }[]> = {
  2025: [
    { date: '2025-01-10', count: 3 },
    { date: '2025-02-14', count: 8 },
    { date: '2025-04-20', count: 0 },
    { date: '2025-04-21', count: 2 },
    { date: '2025-04-22', count: 5 },
    { date: '2025-04-23', count: 1 },
    { date: '2025-04-24', count: 8 },
    { date: '2025-04-27', count: 3 },
    { date: '2025-08-09', count: 3 },
    { date: '2025-08-10', count: 10 },
    { date: '2025-08-11', count: 10 },
    { date: '2025-08-12', count: 17 },
  ],
  2024: [
    { date: '2024-01-15', count: 4 },
    { date: '2024-03-20', count: 6 },
    { date: '2024-04-20', count: 2 },
    { date: '2024-06-10', count: 12 },
    { date: '2024-07-25', count: 8 },
    { date: '2024-09-14', count: 3 },
    { date: '2024-11-30', count: 7 },
    { date: '2024-12-25', count: 15 },
    { date: '2024-12-01', count: 2 },
    { date: '2024-12-15', count: 5 },
  ],
  2023: [
    { date: '2023-02-14', count: 1 },
    { date: '2023-05-01', count: 3 },
    { date: '2023-08-15', count: 2 },
    { date: '2023-12-01', count: 1 },
  ],
  2022: [
    // 활동이 없었던 해 - 빈 배열도 가능
  ],
  2021: [
    // 2021년: 계정 생성 년도
    { date: '2021-07-01', count: 1 }, // 첫 활동
    { date: '2021-08-10', count: 2 },
    { date: '2021-09-15', count: 4 },
    { date: '2021-10-20', count: 3 },
    { date: '2021-11-25', count: 6 },
    { date: '2021-12-31', count: 8 },
  ],
};

export default function ProfilePage() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()); // 현재 년도가 기본값

  // 선택된 년도의 데이터 가져오기
  const currentData = mockDataByYear[selectedYear] || [];

  // 총 퍼블 수 계산 (모든 count 값의 합)
  const totalPubls = currentData.reduce((sum, item) => sum + item.count, 0);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    // 실제 앱에서는 여기서 API 호출
    // fetchContributionData(year);
  };

  return (
    <Container maxW="800px" py={8}>
      <Box mb={8}>
        <Heading size="xl" mb={2}>
          {totalPubls}개의 퍼블
        </Heading>
      </Box>

      <ContributionGrid
        data={currentData}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        accountCreatedYear={2021} // 계정 생성 년도 (2021~2025 버튼 표시)
        size={24}
        weeklyColumnGap={6}
      />
    </Container>
  );
}
