'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Box, Heading, VStack, Grid, GridItem } from '@chakra-ui/react';
import ContributionGrid from '@/components/profile/ContributionGrid';
import ProfileSideHeader from '@/components/profile/ProfileSideHeader';
import ViewsChart from '@/components/profile/ViewsChart';
import VisitsChart from '@/components/profile/VisitsChart';
import PostsList from '@/components/profile/PostsList';

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

export default function MyProfilePage() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const currentData = mockDataByYear[selectedYear] || [];
  const totalPubls = currentData.reduce((sum, item) => sum + item.count, 0);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    // API 호출
    // fetchContributionData(year);
  };

  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  // 임시 사용자 데이터 (실제로는 API에서 가져올 데이터)
  const myProfile = {
    id: 'my-user-id',
    username: '김해원',
    email: 'haewon@example.com',
    bio: '안녕하세요! 퍼블릿에서 활동하고 있는 개발자입니다.',
    avatar: null,
    joinedAt: '2021-07-01',
    followersCount: 128,
    followingCount: 85,
  };

  // 임시 통계 데이터
  const statsData = {
    totalViews: 11534,
    totalVisits: 11534,
    viewsChartData: [], // 추후 실제 차트 데이터
    visitsChartData: [], // 추후 실제 차트 데이터
  };

  // 임시 포스트 데이터 (인기 포스트 테스트용)
  const mockPosts = [
    {
      id: '1',
      title: '내 인기 포스트 1',
      views: 1250,
      createdAt: '2025-01-15',
    },
    {
      id: '2',
      title: '내 인기 포스트 2',
      views: 980,
      createdAt: '2025-01-10',
    },
    {
      id: '3',
      title: '내 인기 포스트 3',
      views: 850,
      createdAt: '2025-01-12',
    },
    {
      id: '4',
      title: '내 인기 포스트 4',
      views: 720,
      createdAt: '2025-01-08',
    },
    {
      id: '5',
      title: '내 인기 포스트 5',
      views: 2100,
      createdAt: '2025-01-20',
    },
    {
      id: '6',
      title: '내 인기 포스트 6',
      views: 1800,
      createdAt: '2025-01-18',
    },
    {
      id: '7',
      title: '내 인기 포스트 7',
      views: 650,
      createdAt: '2025-01-05',
    },
    {
      id: '8',
      title: '내 인기 포스트 8',
      views: 1500,
      createdAt: '2025-01-22',
    },
    {
      id: '9',
      title: '내 인기 포스트 9',
      views: 920,
      createdAt: '2025-01-14',
    },
    {
      id: '10',
      title: '내 인기 포스트 10',
      views: 1350,
      createdAt: '2025-01-25',
    },
    {
      id: '11',
      title: '내 인기 포스트 11',
      views: 580,
      createdAt: '2025-01-03',
    },
    {
      id: '12',
      title: '내 인기 포스트 12',
      views: 2500,
      createdAt: '2025-01-28',
    },
  ];

  return (
    <Box w="100%" h="100%">
      {/* ProfileSideHeader 컴포넌트 */}
      <ProfileSideHeader
        username={myProfile.username}
        bio={myProfile.bio}
        avatar={myProfile.avatar}
        isMyProfile={true}
        onEditProfile={handleEditProfile}
        showBackButton={true}
      />

      {/* 메인 컨텐츠 영역 */}
      <Container maxW="1200px" py={8}>
        <VStack gap={12} align="stretch">
          {/* 활동 내역 (잔디) */}
          <Box>
            <Heading size="xl" mb={6} color="blue.600" fontWeight="medium">
              {totalPubls}개의 퍼블
            </Heading>
            <Box border="1px solid" borderColor="gray.200" borderRadius="lg" p={6} w="fit-content">
              <ContributionGrid
                data={currentData}
                selectedYear={selectedYear}
                onYearChange={handleYearChange}
                accountCreatedYear={2021}
                size={28}
                weeklyColumnGap={6}
              />
            </Box>
          </Box>

          {/* 내 통계 영역 */}
          <Box w="100%">
            <Heading size="xl" mb={6} color="blue.600" fontWeight="medium">
              내 통계 영역
            </Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={8} w="100%">
              {/* 조회수 차트 */}
              <GridItem>
                <ViewsChart
                  totalViews={statsData.totalViews}
                  chartData={statsData.viewsChartData}
                />
              </GridItem>

              {/* 방문자 수 차트 */}
              <GridItem>
                <VisitsChart
                  totalVisits={statsData.totalVisits}
                  chartData={statsData.visitsChartData}
                />
              </GridItem>
            </Grid>
          </Box>

          {/* 인기 포스트 목록 */}
          <Box w="100%">
            <PostsList
              posts={mockPosts} // 데이터 추후 수정
              title="인기 포스트 목록"
              // columns={4}
              maxPosts={8}
              showFilter={false}
              defaultSort="popular"
            />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
