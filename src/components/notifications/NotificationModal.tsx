'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, HStack, VStack, Text } from '@chakra-ui/react';
import { formatRelativeTime } from '@/utils/relativeTime';
import Modal from '@/components/ui/Modal';

export type NotificationItem = {
  id: string | number;
  avatarUrl?: string | null;
  message: string;
  createdAt: string | Date; // ISO string or Date
};

interface NotificationModalProps {
  items: NotificationItem[];
  onReadAll?: () => void;
  width?: string | number;
  maxVisible?: number;
  isOpen?: boolean;
  onClose?: () => void;
  showTitleAction?: boolean;
  onTitleAction?: () => void;
}

export default function NotificationModal({
  items,
  onReadAll,
  width = '420px',
  maxVisible = 5,
  isOpen = true,
  onClose = () => {},
  showTitleAction,
  onTitleAction,
}: NotificationModalProps) {
  const router = useRouter();
  const data = items.slice(0, 10);
  const maxH = typeof maxVisible === 'number' ? `${maxVisible * 72 + 96}px` : '360px';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      withOverlay={false}
      size="md"
      containerProps={{ w: width, position: 'relative' }}
      title="알림"
      showTitleAction={showTitleAction}
      onTitleAction={onTitleAction ?? (() => router.push('/notifications'))}
      showCloseButton={false}
      closeOnOutsideClick
    >
      {/* header 우측 액션 */}
      {onReadAll && (
        <Box
          position="absolute"
          top={5}
          right={4}
          as="button"
          onClick={onReadAll}
          color="gray.500"
          _hover={{ color: 'gray.700' }}
        >
          모두 읽기
        </Box>
      )}

      {/* List */}
      <VStack align="stretch" maxH={maxH} overflowY="auto" p={1} gap={0}>
        {data.length === 0 && (
          <Box p={4} color="gray.600">
            알림이 없습니다.
          </Box>
        )}
        {data.map((item, index) => (
          <Box key={item.id}>
            {index !== 0 && <Box borderTop="1px solid" borderColor="gray.100" />}
            <HStack align="start" gap={3} p={3}>
              <Box w="8" h="8" borderRadius="full" bg="gray.200" flexShrink={0} />
              <VStack align="start" gap={1} flex={1}>
                <Text fontSize="s">{item.message}</Text>
                <Text fontSize="xs" color="gray.500">
                  {formatRelativeTime(item.createdAt)}
                </Text>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Modal>
  );
}
