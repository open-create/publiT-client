'use client';

import React from 'react';
import { Box, HStack, VStack, Text, Icon } from '@chakra-ui/react';
import { LogOut, Settings, ChevronRight } from 'lucide-react';
import { formatRelativeTime } from '@/utils/formatDate';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

type Activity = {
  id: string | number;
  message: string;
  createdAt: string | Date;
};

interface ProfileModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  width?: string | number;
  username: string;
  onEditProfile?: () => void;
  onProfile?: () => void;
  onLogout?: () => void;
  onOpenSettings?: () => void;
  today?: Activity[]; // deprecated: recentActivities로 통합
  recent7Days?: Activity[]; // deprecated
  recentActivities?: Activity[]; // 내 최근 활동 (최대 10개 렌더)
  maxVisibleActivities?: number; // 스크롤 시작 기준 (기본 5)
  // showTitle?: boolean; // 제목 노출 여부
}

export default function ProfileModal({
  isOpen = true,
  onClose = () => {},
  width = '420px',
  username,
  onEditProfile,
  onProfile,
  onLogout,
  onOpenSettings,
  today = [],
  recent7Days = [],
  recentActivities = [],
  maxVisibleActivities = 5,
}: ProfileModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      withOverlay={false}
      size="md"
      containerProps={{ w: width, position: 'relative' }}
      showCloseButton={false}
      closeOnOutsideClick
      showTitle={false}
    >
      {/* 상단 프로필 요약 */}
      <HStack align="center" justify="space-between" pt={2} px={4} pb={3}>
        <HStack align="center" gap={3}>
          <Box w="12" h="12" borderRadius="full" bg="gray.200" />
          <VStack align="start" gap={0}>
            <Text fontWeight="bold">{username}</Text>
            <Button
              variant="ghost"
              size="xs"
              p="0"
              minW="auto"
              h="auto"
              color="gray.500"
              _hover={{ color: 'gray.700', bg: 'transparent' }}
              onClick={onEditProfile}
            >
              프로필 수정
            </Button>
          </VStack>
        </HStack>
        <Icon
          as={ChevronRight}
          boxSize={5}
          color="gray.500"
          _hover={{ color: 'gray.700' }}
          onClick={onProfile}
        />
      </HStack>

      {/* 내 최근 활동 (오늘 / 최근 7일 분리) */}
      <VStack align="stretch" px={4} gap={2} mt={2}>
        <Box borderTop="1px solid" borderColor="gray.100" />
        {(() => {
          // 최대 10개만 사용
          const data = (
            recentActivities.length ? recentActivities : [...today, ...recent7Days]
          ).slice(0, 10);
          // 그룹 분리
          const now = new Date();
          const startOfToday = new Date(now);
          startOfToday.setHours(0, 0, 0, 0);
          const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          const toDate = (d: string | Date) => (typeof d === 'string' ? new Date(d) : d);
          const todayList = data.filter((it) => toDate(it.createdAt) >= startOfToday);
          const weekList = data.filter(
            (it) => toDate(it.createdAt) < startOfToday && toDate(it.createdAt) >= sevenDaysAgo
          );
          const maxH = `${maxVisibleActivities * 72}px`;
          if (todayList.length + weekList.length === 0) {
            return (
              <Box p={4} color="gray.600">
                최근 활동이 없습니다.
              </Box>
            );
          }
          return (
            <VStack align="stretch" maxH={maxH} overflowY="auto" gap={0}>
              {todayList.length > 0 && (
                <>
                  <Text fontWeight="bold" px={1} py={2}>
                    오늘
                  </Text>
                  {todayList.map((it, idx) => (
                    <Box key={it.id}>
                      {idx !== 0 && <Box borderTop="1px solid" borderColor="gray.100" />}
                      <HStack align="start" gap={3} p={3}>
                        <Box w="8" h="8" borderRadius="full" bg="gray.200" />
                        <VStack align="start" gap={0} flex={1}>
                          <Text fontSize="s">{it.message}</Text>
                          <Text fontSize="xs" color="gray.500">
                            {formatRelativeTime(it.createdAt)}
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  ))}
                </>
              )}
              {weekList.length > 0 && (
                <>
                  <Box borderTop="1px solid" borderColor="gray.100" />
                  <Text fontWeight="bold" px={1} py={2}>
                    최근 7일
                  </Text>
                  {weekList.map((it, idx) => (
                    <Box key={it.id}>
                      {idx !== 0 && <Box borderTop="1px solid" borderColor="gray.100" />}
                      <HStack align="start" gap={3} p={3}>
                        <Box w="8" h="8" borderRadius="full" bg="gray.200" />
                        <VStack align="start" gap={0} flex={1}>
                          <Text fontSize="s">{it.message}</Text>
                          <Text fontSize="xs" color="gray.500">
                            {formatRelativeTime(it.createdAt)}
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  ))}
                </>
              )}
            </VStack>
          );
        })()}
      </VStack>

      {/* 하단 액션 */}
      <HStack align="center" justify="space-between" px={4} py={3}>
        <Button
          variant="ghost"
          size="xs"
          onClick={onLogout}
          color="gray.500"
          bg="transparent"
          _hover={{ color: 'gray.700', bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
          _focus={{ bg: 'transparent' }}
        >
          <HStack gap={2}>
            <Icon as={LogOut} />
            <Text>로그아웃</Text>
          </HStack>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenSettings}
          color="gray.600"
          bg="transparent"
          _hover={{ color: 'gray.500', bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
          _focus={{ bg: 'transparent' }}
        >
          <Icon as={Settings} />
        </Button>
      </HStack>
    </Modal>
  );
}
