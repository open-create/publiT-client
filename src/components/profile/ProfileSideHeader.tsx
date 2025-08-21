'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Container, Box, Heading, VStack, Text, HStack } from '@chakra-ui/react';
import Button from '@/components/ui/Button';

interface ProfileSideHeaderProps {
  variant?: 'full' | 'minimal';
  username?: string;
  bio?: string;
  avatar?: string | null;
  isMyProfile?: boolean;
  isFollowing?: boolean;
  onFollowToggle?: () => void;
  onEditProfile?: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
}

export default function ProfileSideHeader({
  variant = 'full',
  username,
  bio,
  avatar,
  isMyProfile,
  isFollowing = false,
  onFollowToggle,
  onEditProfile,
  showBackButton = false,
  onBack,
  title,
}: ProfileSideHeaderProps) {
  const router = useRouter();

  // 임시로 IconButton import 사용 (나중에 실제 아이콘 버튼으로 교체)
  console.log('IconButton component available for future use');

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  // Minimal: 뒤로 가기 버튼과 제목만 있음
  if (variant === 'minimal') {
    return (
      <Box w="100%" bg="blue.50" py={4} borderBottom="1px solid" borderColor="blue.100">
        <Container maxW="1200px" mx="auto">
          <HStack align="center" gap={3}>
            <Box
              as="button"
              onClick={handleBack}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="md"
              p={1}
              bg="transparent"
              color="gray.600"
              _hover={{
                bg: 'gray.100',
                color: 'gray.800',
              }}
              _active={{
                bg: 'gray.200',
              }}
              transition="all 0.2s"
              cursor="pointer"
              border="none"
              outline="none"
              _focus={{
                boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)',
              }}
            >
              <ArrowLeft size={28} />
            </Box>
            {title && (
              <Heading size="md" color="gray.800">
                {title}
              </Heading>
            )}
          </HStack>
        </Container>
      </Box>
    );
  }

  // Full: 뒤로 가기 버튼 + 세부 정보 포함
  return (
    <Box w="100%" bg="blue.50" py={8} borderBottom="1px solid" borderColor="blue.100">
      <Container maxW="1200px" mx="auto">
        <VStack align="center" gap={6}>
          {/* 뒤로 가기 버튼 */}
          {showBackButton && (
            <HStack w="100%" justify="flex-start">
              <Box
                as="button"
                onClick={handleBack}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="md"
                p={2}
                bg="transparent"
                color="gray.600"
                _hover={{
                  bg: 'gray.100',
                  color: 'gray.800',
                }}
                _active={{
                  bg: 'gray.200',
                }}
                transition="all 0.2s"
                cursor="pointer"
                border="none"
                outline="none"
                _focus={{
                  boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)',
                }}
              >
                <ArrowLeft size={24} />
              </Box>
            </HStack>
          )}

          {/* 프로필 사진 */}
          <Box
            w="7.5rem"
            h="7.5rem"
            borderRadius="full"
            bg="gray.300"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="0.25rem solid white"
            shadow="md"
          >
            {avatar ? (
              // 추후 실제 이미지 구현
              <Text fontSize="4xl" color="gray.600" fontWeight="bold">
                {username?.charAt(0)}
              </Text>
            ) : (
              <Text fontSize="4xl" color="gray.600" fontWeight="bold">
                {username?.charAt(0)}
              </Text>
            )}
          </Box>

          {/* 이름 */}
          <Heading size="2xl" color="gray.800">
            {username}
          </Heading>

          {/* 액션 버튼 */}
          {isMyProfile
            ? // 내 프로필 - 프로필 수정 버튼
              onEditProfile && (
                <Button variant="primary" onClick={onEditProfile} px="1rem">
                  프로필 수정
                </Button>
              )
            : // 상대 프로필 - 팔로우/언팔로우 버튼
              onFollowToggle && (
                <Button
                  variant={isFollowing ? 'outline' : 'primary'}
                  onClick={onFollowToggle}
                  px="2rem"
                >
                  {isFollowing ? '언팔로우' : '팔로우'}
                </Button>
              )}

          {/* 한 줄 소개 */}
          {bio && (
            <Text color="gray.700" fontSize="lg" textAlign="center" maxW="37.5rem">
              {bio}
            </Text>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
