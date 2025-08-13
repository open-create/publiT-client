'use client';

import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Flex, Box, HStack, IconButton, Icon, chakra, useDisclosure } from '@chakra-ui/react';
import Button from '@/components/ui/Button';
import NotificationModal, { NotificationItem } from '@/components/notifications/NotificationModal';
import ProfileModal from '@/components/profile/ProfileModal';
import { BellIcon, NotebookPenIcon } from 'lucide-react';

type HeaderVariant = 'minimal' | 'guest' | 'user' | 'admin';

interface HeaderProps {
  variant?: HeaderVariant;
}

export default function Header({ variant = 'minimal' }: HeaderProps) {
  const router = useRouter();
  const CLink = chakra(NextLink);
  // 색상 제어 상수: 여기만 바꾸면 전체 헤더 색상이 일괄 반영됩니다
  const LINK_COLOR = 'gray.800';
  const LINK_HOVER_COLOR = 'blue.500';
  const BUTTON_BG = 'blue.50';
  const BUTTON_HOVER_BG = 'blue.100';
  const ICON_COLOR = 'blue.500';
  const ICON_HOVER_BG = 'gray.100';
  const ICON_HOVER_COLOR = 'blue.600';
  // 모달 관련 상태 관리
  const notifDisclosure = useDisclosure();
  const profileDisclosure = useDisclosure();

  /* 공통: 왼쪽 로고 */
  const Logo = (
    <NextLink href="/">
      <Image src="/assets/logo_pic.png" alt="logo" width={148} height={32} />
    </NextLink>
  );

  /* 우측 요소 – variant별로 결정 */
  let right: React.ReactNode = null;

  switch (variant) {
    case 'guest':
      right = (
        <HStack gap="10" fontSize="sm">
          <CLink
            href="/search"
            color={LINK_COLOR}
            _hover={{ color: LINK_HOVER_COLOR }}
            transition="color .2s"
          >
            검색
          </CLink>
          <CLink
            href="/auth"
            mr="5"
            color={LINK_COLOR}
            _hover={{ color: LINK_HOVER_COLOR }}
            transition="color .2s"
          >
            로그인
          </CLink>
        </HStack>
      );
      break;

    case 'user':
      right = (
        <HStack gap="10" fontSize="sm">
          <Button
            bg={BUTTON_BG}
            variant="primary"
            onClick={() => router.push('/pubble')}
            _hover={{ bg: BUTTON_HOVER_BG }}
          >
            <NotebookPenIcon />
            PUBBLE +
          </Button>

          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => {
              if (!notifDisclosure.open) profileDisclosure.onClose();
              notifDisclosure.onToggle();
            }}
            data-modal-trigger
            p="0"
            minW="auto"
            h="auto"
            bg="transparent"
            color={notifDisclosure.open ? LINK_HOVER_COLOR : LINK_COLOR}
            aria-expanded={notifDisclosure.open}
            fontWeight="normal"
            _hover={{ color: LINK_HOVER_COLOR, bg: 'transparent' }}
          >
            알림
          </Button>
          <CLink
            href="/search"
            color={LINK_COLOR}
            _hover={{ color: LINK_HOVER_COLOR }}
            transition="color .2s"
          >
            검색
          </CLink>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => {
              if (!profileDisclosure.open) notifDisclosure.onClose();
              profileDisclosure.onToggle();
            }}
            data-modal-trigger
            onMouseDown={(e) => e.stopPropagation()}
            p="0"
            minW="auto"
            h="auto"
            bg="transparent"
            color={LINK_COLOR}
            fontWeight="normal"
            _hover={{ color: LINK_HOVER_COLOR, bg: 'transparent' }}
            mr="5"
          >
            프로필
          </Button>
        </HStack>
      );
      break;

    case 'admin':
      right = (
        <HStack gap="6">
          <Button
            bg={BUTTON_BG}
            variant="primary"
            onClick={() => router.push('/search')}
            _hover={{ bg: BUTTON_HOVER_BG }}
          >
            + 공지 작성
          </Button>
          <IconButton
            aria-label="알림"
            variant="ghost"
            size="lg"
            onClick={() => router.push('/search')}
            color={ICON_COLOR}
            _hover={{ bg: ICON_HOVER_BG, color: ICON_HOVER_COLOR }}
          >
            <Icon as={BellIcon} boxSize={7} color="currentColor" />
          </IconButton>
          <Box mr="5">
            <Box w="8" h="8" borderRadius="full" bg="gray.300" />
          </Box>
        </HStack>
      );
      break;

    case 'minimal':
    default:
      right = null;
  }

  // 목업 데이터
  const mockNotifications: NotificationItem[] = [
    { id: 1, message: 'loveen8201님의 퍼블을 저장했습니다', createdAt: new Date() },
    {
      id: 2,
      message: 'vkerhr__2 님의 퍼블을 좋아합니다',
      createdAt: new Date(Date.now() - 20 * 60 * 1000),
    },
    {
      id: 3,
      message: 'kdkkkkkk님의 퍼블을 저장했습니다',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    { id: 4, message: 'loveen8201님의 퍼블을 저장했습니다', createdAt: new Date() },
    {
      id: 5,
      message: 'vkerhr__2 님의 퍼블을 좋아합니다',
      createdAt: new Date(Date.now() - 20 * 60 * 1000),
    },
    {
      id: 6,
      message: 'kdkkkkkk님의 퍼블을 저장했습니다',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    { id: 7, message: 'loveen8201님의 퍼블을 저장했습니다', createdAt: new Date() },
    {
      id: 8,
      message: 'vkerhr__2 님의 퍼블을 좋아합니다',
      createdAt: new Date(Date.now() - 20 * 60 * 1000),
    },
    {
      id: 9,
      message: 'kdkkkkkk님의 퍼블을 저장했습니다',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
  ];

  return (
    <>
      <Box as="header" w="100%" px={{ base: 4, md: 6 }} py="3" boxShadow="sm" bg="white">
        <Flex align="center" justify="space-between">
          {Logo}
          {right}
        </Flex>
      </Box>
      {/* 알림 드롭다운: 배경 없이 헤더 바로 아래에 표시 */}
      {notifDisclosure.open && (
        <Box position="absolute" right={{ base: 20, md: 48 }} mt={2} zIndex={1500}>
          <NotificationModal
            items={mockNotifications}
            onReadAll={() => {}}
            isOpen={notifDisclosure.open}
            onClose={notifDisclosure.onClose}
            showTitleAction
            onTitleAction={() => {
              router.push('/notifications');
              notifDisclosure.onClose();
            }}
          />
        </Box>
      )}
      {profileDisclosure.open && (
        <Box position="absolute" right={{ base: 4, md: 8 }} mt={2} zIndex={1500}>
          <ProfileModal
            isOpen={profileDisclosure.open}
            onClose={profileDisclosure.onClose}
            username="김해원"
            recentActivities={mockNotifications}
            onEditProfile={() => {
              router.push('/profile/edit');
              profileDisclosure.onClose();
            }}
            onProfile={() => {
              router.push('/profile');
              profileDisclosure.onClose();
            }}
          />
        </Box>
      )}
    </>
  );
}
