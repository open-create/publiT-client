'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Box, VStack, HStack, Text, Spinner, Center, Heading } from '@chakra-ui/react';
import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { toaster } from '@/components/ui/Toaster';
import ProfileSideHeader from '@/components/profile/ProfileSideHeader';
import ProfileDeleteButton from '@/components/profile/ProfileDeleteButton';
import PostsList from '@/components/profile/PostsList';

// 탈퇴 페이지 (/profile/withdrawal) - 본인만 접근 가능
export default function WithdrawalPage() {
  const router = useRouter();

  // 권한 체크 상태
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  // 프로필 확인 체크박스 상태
  const [isProfileConfirmed, setIsProfileConfirmed] = useState(false);

  // 현재 사용자 프로필 데이터 (실제로는 API에서 가져올 데이터)
  const [profileData] = useState({
    username: '김해원',
    bio: '안녕하세요! 퍼블릿에서 활동하고 있는 개발자입니다.',
    avatar: null,
  });

  // 인기 포스트 데이터 (실제로는 API에서 가져올 데이터)
  const [popularPosts] = useState([
    {
      id: '1',
      title: 'React 18의 새로운 기능들',
      excerpt: 'React 18에서 추가된 Concurrent Features에 대해 알아보겠습니다...',
      createdAt: '2024-01-15',
      views: 1250,
      likes: 89,
      comments: 23,
      thumbnail: '',
    },
    {
      id: '2',
      title: 'TypeScript 5.0 마이그레이션 가이드',
      excerpt: 'TypeScript 5.0으로 업그레이드하면서 주의해야 할 점들을 정리했습니다...',
      createdAt: '2024-01-10',
      views: 980,
      likes: 67,
      comments: 15,
      thumbnail: '',
    },
    {
      id: '3',
      title: 'Next.js App Router 완벽 가이드',
      excerpt: 'Next.js 13의 App Router를 실제 프로젝트에 적용하며 배운 것들...',
      createdAt: '2024-01-05',
      views: 1580,
      likes: 124,
      comments: 34,
      thumbnail: '',
    },
    {
      id: '4',
      title: 'CSS-in-JS vs Tailwind CSS 비교',
      excerpt: '각 스타일링 방법의 장단점과 프로젝트에 맞는 선택 기준...',
      createdAt: '2024-01-01',
      views: 756,
      likes: 45,
      comments: 12,
      thumbnail: '',
    },
  ]);

  // 권한 체크 (페이지 로드 시)
  useEffect(() => {
    const checkAuth = () => {
      try {
        // 실제 앱에서는 여기서 로그인 상태 및 권한 체크
        // const user = await getCurrentUser();
        // if (!user) {
        //   router.push('/auth');
        //   return;
        // }

        // 임시로 권한 있음으로 설정
        setIsAuthorized(true);
      } catch (error) {
        console.error('권한 체크 실패:', error);
        toaster.create({
          title: '접근 권한이 없습니다.',
          description: '로그인이 필요합니다.',
          type: 'error',
          duration: 3000,
        });
        void router.push('/auth');
      }
    };

    checkAuth();
  }, [router]);

  const handleDeleteProfile = () => {
    try {
      // 실제 앱에서는 여기서 API 호출
      // await deleteProfile();

      toaster.create({
        title: '계정이 탈퇴되었습니다.',
        description: '그동안 이용해 주셔서 감사합니다.',
        type: 'success',
        duration: 3000,
      });

      // 로그인 페이지로 이동
      void router.push('/auth');
    } catch (error) {
      toaster.create({
        title: '계정 탈퇴에 실패했습니다.',
        description: '다시 시도해주세요.',
        type: 'error',
        duration: 3000,
      });
      throw error; // ProfileDeleteButton에서 에러 핸들링
    }
    return Promise.resolve();
  };

  // 권한 체크 중 로딩
  if (isAuthorized === null) {
    return (
      <Center h="50vh">
        <VStack gap={4}>
          <Spinner size="lg" color="blue.500" />
          <Text color="gray.600">권한을 확인하고 있습니다...</Text>
        </VStack>
      </Center>
    );
  }

  // 권한 없음
  if (!isAuthorized) {
    return (
      <Center h="50vh">
        <VStack gap={4}>
          <Text fontSize="lg" color="gray.600">
            접근 권한이 없습니다.
          </Text>
          <Button onClick={() => router.push('/auth')}>로그인하기</Button>
        </VStack>
      </Center>
    );
  }

  return (
    <>
      <ProfileSideHeader
        variant="minimal"
        title="프로필 삭제"
        showBackButton
        onBack={() => router.push('/profile/edit')}
      />

      {/* 메인 콘텐츠 */}
      <Container maxW="46rem" py={8}>
        <VStack align="start" gap={8}>
          <HStack gap={2} align="center">
            <Check size={20} color="#3182ce" />
            <Text fontSize="sm" color="gray.600" fontWeight="medium">
              삭제할 프로필을 확인해 주세요.
            </Text>
          </HStack>
          {/* 프로필 정보 */}
          <VStack
            align="center"
            gap={4}
            w="100%"
            py={6}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
          >
            {/* 프로필 사진 */}
            <Box
              w="100px"
              h="100px"
              borderRadius="full"
              bg="gray.300"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="4px solid white"
              shadow="md"
            >
              {profileData.avatar ? (
                // 추후 실제 이미지 구현
                <Text fontSize="4xl" color="gray.600" fontWeight="bold">
                  {profileData.username.charAt(0)}
                </Text>
              ) : (
                <Text fontSize="4xl" color="gray.600" fontWeight="bold">
                  {profileData.username.charAt(0)}
                </Text>
              )}
            </Box>

            {/* 닉네임 */}
            <Heading size="2xl" color="gray.800" fontWeight="medium">
              {profileData.username}
            </Heading>

            {/* 한 줄 소개 */}
            {profileData.bio && (
              <Text color="gray.700" fontSize="sm" textAlign="center" maxW="500px">
                {profileData.bio}
              </Text>
            )}

            {/* 프로필 확인 체크박스 */}
            <HStack gap={2} align="center" pt={2}>
              <Box
                as="button"
                onClick={() => setIsProfileConfirmed(!isProfileConfirmed)}
                w="20px"
                h="20px"
                border="2px solid"
                borderColor={isProfileConfirmed ? 'blue.500' : 'gray.300'}
                borderRadius="md"
                bg={isProfileConfirmed ? 'blue.500' : 'transparent'}
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  borderColor: isProfileConfirmed ? 'blue.500' : 'gray.400',
                }}
              >
                {isProfileConfirmed && <Check size={14} color="white" />}
              </Box>
              <Text fontSize="sm" color="gray.700" fontWeight="medium" w="100%" p={2}>
                위 프로필 정보를 확인했습니다. (필수)
              </Text>
            </HStack>
          </VStack>

          {/* 삭제될 포스트 목록 */}
          <VStack align="start" gap={4} w="100%">
            <HStack gap={2} align="center">
              <Check size={20} color="#3182ce" />
              <Text fontSize="sm" color="gray.600" fontWeight="medium">
                프로필 삭제 시 아래 퍼블들을 포함한 모든 데이터가 영구적으로 삭제됩니다.
              </Text>
            </HStack>

            {/* 인기 포스트 4개 */}
            <PostsList posts={popularPosts} maxPosts={4} columns={2} showFilter={false} />
          </VStack>

          {/* 탈퇴 버튼 */}
          <ProfileDeleteButton
            username={profileData.username}
            onDelete={handleDeleteProfile}
            isDisabled={!isProfileConfirmed}
          />
        </VStack>
      </Container>
    </>
  );
}
