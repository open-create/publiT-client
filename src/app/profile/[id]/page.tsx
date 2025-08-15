'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Box, Heading, VStack } from '@chakra-ui/react';
import ContributionGrid from '@/components/profile/ContributionGrid';
import ProfileSideHeader from '@/components/profile/ProfileSideHeader';
import PostsList from '@/components/profile/PostsList';

// 년도별 활동 데이터 (실제로는 API에서 가져올 데이터)
const mockDataByYear: Record<number, { date: string; count: number }[]> = {
  2025: [
    { date: '2025-01-10', count: 2 },
    { date: '2025-02-14', count: 5 },
    { date: '2025-04-20', count: 1 },
    { date: '2025-04-21', count: 3 },
    { date: '2025-08-09', count: 2 },
    { date: '2025-08-10', count: 7 },
  ],
  2024: [
    { date: '2024-01-15', count: 3 },
    { date: '2024-03-20', count: 4 },
    { date: '2024-06-10', count: 8 },
    { date: '2024-07-25', count: 6 },
    { date: '2024-09-14', count: 2 },
    { date: '2024-11-30', count: 5 },
  ],
};

// 남의 프로필 페이지 (/profile/[id])
export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  // 선택된 년도의 데이터 가져오기
  const currentData = mockDataByYear[selectedYear] || [];

  // 총 퍼블 수 계산
  const totalPubls = currentData.reduce((sum, item) => sum + item.count, 0);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    // 실제 앱에서는 여기서 API 호출
    // fetchUserContributionData(userId, year);
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    // 실제 앱에서는 여기서 팔로우/언팔로우 API 호출
  };

  // 임시 사용자 데이터 (실제로는 API에서 가져올 데이터)
  const userProfile = {
    id: userId,
    username: '김지현',
    email: 'user@example.com',
    bio: '안녕하세요! 퍼블릿에서 활동하고 있습니다.',
    avatar: null,
    joinedAt: '2022-03-15',
    followersCount: 67,
    followingCount: 42,
    isMyProfile: false, // 남의 프로필이므로 false
  };

  // 임시 포스트 데이터 (많은 데이터로 테스트)
  const mockPosts = [
    {
      id: '1',
      title: '다른 사용자의 포스트 1',
      views: 850,
      createdAt: '2025-01-12',
    },
    {
      id: '2',
      title: '다른 사용자의 포스트 2',
      views: 720,
      createdAt: '2025-01-08',
    },
    {
      id: '3',
      title: '다른 사용자의 포스트 3',
      views: 1200,
      createdAt: '2025-01-15',
    },
    {
      id: '4',
      title: '다른 사용자의 포스트 4',
      views: 950,
      createdAt: '2025-01-10',
    },
    {
      id: '5',
      title: '다른 사용자의 포스트 5',
      views: 650,
      createdAt: '2025-01-05',
    },
    {
      id: '6',
      title: '다른 사용자의 포스트 6',
      views: 1500,
      createdAt: '2025-01-18',
    },
    {
      id: '7',
      title: '다른 사용자의 포스트 7',
      views: 420,
      createdAt: '2025-01-03',
    },
    {
      id: '8',
      title: '다른 사용자의 포스트 8',
      views: 890,
      createdAt: '2025-01-14',
    },
    {
      id: '9',
      title: '다른 사용자의 포스트 9',
      views: 1100,
      createdAt: '2025-01-20',
    },
    {
      id: '10',
      title: '다른 사용자의 포스트 10',
      views: 780,
      createdAt: '2025-01-07',
    },
    {
      id: '11',
      title: '다른 사용자의 포스트 11',
      views: 2000,
      createdAt: '2025-01-22',
    },
    {
      id: '12',
      title: '다른 사용자의 포스트 12',
      views: 320,
      createdAt: '2025-01-01',
    },
    {
      id: '13',
      title: '다른 사용자의 포스트 13',
      views: 1350,
      createdAt: '2025-01-25',
    },
    {
      id: '14',
      title: '다른 사용자의 포스트 14',
      views: 590,
      createdAt: '2025-01-04',
    },
    {
      id: '15',
      title: '다른 사용자의 포스트 15',
      views: 1750,
      createdAt: '2025-01-28',
    },
  ];

  return (
    <Box w="100%" h="100%">
      {/* 프로필 헤더 */}
      <ProfileSideHeader
        username={userProfile.username}
        bio={userProfile.bio}
        avatar={userProfile.avatar}
        isMyProfile={false}
        isFollowing={isFollowing}
        onFollowToggle={handleFollowToggle}
        showBackButton={true}
      />

      {/* 메인 영역 */}
      <Container maxW="1200px" py={8}>
        <VStack gap={12} align="stretch">
          {/* 활동 내역 */}
          <Box>
            <Heading size="lg" mb={6} color="blue.600">
              {totalPubls}개의 퍼블
            </Heading>
            <Box border="1px solid" borderColor="gray.200" borderRadius="lg" p={6} w="fit-content">
              <ContributionGrid
                data={currentData}
                selectedYear={selectedYear}
                onYearChange={handleYearChange}
                accountCreatedYear={2022}
                size={28}
                weeklyColumnGap={6}
              />
            </Box>
          </Box>

          {/* 포스트 목록 */}
          <PostsList
            posts={mockPosts}
            title={`${userProfile.username} 님의 포스트 목록`}
            columns={4}
            maxPosts={8}
            showFilter={true} // 필터 표시
            defaultSort="latest"
          />
        </VStack>
      </Container>
    </Box>
  );
}
