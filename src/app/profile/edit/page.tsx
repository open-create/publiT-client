'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  VStack,
  Input,
  Textarea,
  HStack,
  Text,
  Spinner,
  Center,
} from '@chakra-ui/react';
import Button from '@/components/ui/Button';
import { toaster } from '@/components/ui/Toaster';
import ProfileSideHeader from '@/components/profile/ProfileSideHeader';
import ProfileImageEditor from '@/components/profile/ProfileImageEditor';

// 프로필 수정 페이지 - 본인만 접근 가능
export default function ProfileEditPage() {
  const router = useRouter();

  // 권한 체크 상태
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 현재 사용자 프로필 데이터 (실제로는 API에서 가져올 데이터)
  const [formData, setFormData] = useState({
    username: '김해원',
    bio: '안녕하세요! 퍼블릿에서 활동하고 있는 개발자입니다.',
  });

  // 프로필 이미지 파일
  const [profileImage, setProfileImage] = useState<File | null>(null);

  // 임시로 profileImage 사용 (나중에 실제 이미지 업로드 로직으로 교체)
  useEffect(() => {
    if (profileImage) {
      console.log('Profile image selected:', profileImage.name);
    }
  }, [profileImage]);

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
        // 임시로 error 사용 (나중에 실제 에러 처리로 교체)
        console.log('Auth check error:', error);
        // console.error('권한 체크 실패:', error);
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

  // 입력 필드 변경 핸들러
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 프로필 저장 핸들러
  const handleSave = async () => {
    setIsLoading(true);

    try {
      // 실제 앱에서는 여기서 API 호출
      // const formDataToSend = new FormData();
      // formDataToSend.append('username', formData.username);
      // formDataToSend.append('bio', formData.bio);
      // if (profileImage) {
      //   formDataToSend.append('profileImage', profileImage);
      // }
      // await updateProfile(formDataToSend);

      // 임시 성공 처리
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toaster.create({
        title: '프로필이 수정되었습니다.',
        type: 'success',
        duration: 3000,
      });

      // 프로필 페이지로 이동
      void router.push('/profile');
    } catch (error) {
      // 임시로 error 사용 (나중에 실제 에러 처리로 교체)
      console.log('Save profile error:', error);
      toaster.create({
        title: '프로필 수정에 실패했습니다.',
        description: '다시 시도해주세요.',
        type: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 취소 핸들러
  const handleCancel = () => {
    void router.push('/profile');
  };

  // const handleDeleteProfile = async () => {
  //   try {
  //     // 실제 앱에서는 여기서 API 호출
  //     // await deleteProfile();

  //     toaster.create({
  //       title: '계정이 삭제되었습니다.',
  //       type: 'success',
  //       duration: 3000,
  //     });

  //     // 로그인 페이지로 이동
  //     router.push('/auth');
  //   } catch (error) {
  //     toaster.create({
  //       title: '계정 삭제에 실패했습니다.',
  //       description: '다시 시도해주세요.',
  //       type: 'error',
  //       duration: 3000,
  //     });
  //     throw error; // ProfileDeleteButton에서 에러 핸들링
  //   }
  // };

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
        title="프로필 수정"
        showBackButton
        onBack={handleCancel}
      />

      <Container maxW="46rem" py={8}>
        <VStack align="start" gap={8}>
          {/* 프로필 이미지 수정 */}
          <ProfileImageEditor
            currentImage={null} // 실제로는 현재 프로필 이미지 URL
            username={formData.username}
            onImageChange={setProfileImage}
          />

          {/* 닉네임 수정 */}
          <VStack align="start" gap={2} w="100%">
            <Text fontWeight="medium">
              닉네임{' '}
              <Text as="span" color="red.500">
                *
              </Text>
            </Text>
            <Input
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="닉네임을 입력하세요"
              maxLength={20}
            />
            <Text fontSize="s" color="gray.500">
              {formData.username.length}/20자
            </Text>
          </VStack>

          {/* 자기소개 수정 */}
          <VStack align="start" gap={2} w="100%">
            <Text fontWeight="medium">자기소개</Text>
            <Textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="자기소개를 입력해 주세요"
              rows={4}
              resize="vertical"
              maxLength={200}
            />
            <Text fontSize="s" color="gray.500">
              {formData.bio.length}/200자
            </Text>
          </VStack>

          {/* 저장 버튼 */}
          <HStack gap={3} w="100%">
            <Button
              variant="primary"
              onClick={() => void handleSave()}
              loading={isLoading}
              loadingText="저장 중..."
              flex={1}
              h="3rem"
              fontSize="md"
            >
              저장
            </Button>
          </HStack>

          {/* 탈퇴 페이지로 이동 버튼 */}
          <VStack
            align="start"
            gap={4}
            pt={4}
            borderTop="1px solid"
            borderColor="gray.200"
            w="100%"
          >
            <Box>
              <HStack gap={3} align="center">
                <Button
                  size="sm"
                  fontSize="s"
                  variant="ghost"
                  onClick={() => router.push('/profile/withdrawal')}
                  color="gray.800"
                  _hover={{ color: 'red.500', bg: 'transparent' }}
                  p={0}
                >
                  프로필 삭제
                </Button>
                <Text fontSize="s" color="gray.600">
                  프로필을 삭제하기 전에 삭제될 데이터를 확인하세요.
                </Text>
              </HStack>
            </Box>
          </VStack>
        </VStack>
      </Container>
    </>
  );
}
