'use client';

import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { NotificationItem } from './types';

interface NotificationRowProps {
  item: NotificationItem;
}

export default function NotificationRow({ item }: NotificationRowProps) {
  return (
    <Box position="relative">
      {!item.read && (
        <Box
          position="absolute"
          left="-0.25rem"
          top="-0.25rem"
          w="1.5rem"
          h="1.5rem"
          bg="blue.500"
          borderRadius="full"
        />
      )}
      <HStack
        align="center"
        justify="space-between"
        // bg={item.read ? 'gray.100' : 'gray.200'}
        bg="gray.100"
        p={6}
        rounded="xl"
      >
        <VStack align="start" gap={1} flex={1}>
          <Text color="gray.800" fontWeight="semibold">
            {item.message}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {item.time}
          </Text>
        </VStack>
        {!item.read && (
          <Text fontSize="sm" color="gray.700">
            읽지 않음
          </Text>
        )}
      </HStack>
    </Box>
  );
}
