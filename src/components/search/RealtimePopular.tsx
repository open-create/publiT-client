'use client';

import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/react';

interface PopularPostItem {
  id: string | number;
  title: string;
  excerpt?: string;
  author: string;
  date: string;
  thumbnail?: string;
}

interface RealtimePopularProps {
  items: PopularPostItem[];
}

export default function RealtimePopular({ items }: RealtimePopularProps) {
  const top5 = items.slice(0, 5);

  return (
    <VStack align="stretch" gap={4}>
      <Heading size="xl" color="gray.800" fontWeight="bold">
        지금 실시간 인기 퍼블
      </Heading>

      <VStack align="stretch" gap={4}>
        {top5.map((post) => (
          <Box
            key={post.id}
            w="100%"
            p={6}
            border="1px solid"
            borderColor="blue.300"
            rounded="lg"
            bg="white"
          >
            <HStack align="start" gap={6}>
              {/* 썸네일 */}
              <Box w="11.25rem" h="7rem" bg="gray.200" rounded="md" />

              {/* 본문 영역 */}
              <VStack align="start" gap={3} flex={1}>
                <Text fontSize="lg" fontWeight="bold" color="gray.900">
                  {post.title}
                </Text>
                {post.excerpt && (
                  <Text fontSize="sm" color="gray.600">
                    {post.excerpt}
                  </Text>
                )}

                <HStack align="center" gap={3}>
                  <Box w="2.5rem" h="2.5rem" borderRadius="full" bg="gray.300" />
                  <VStack align="start" gap={0}>
                    <Text fontSize="sm" color="gray.800" fontWeight="medium">
                      {post.author}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {post.date}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
}
