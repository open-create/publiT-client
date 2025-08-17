'use client';

import { Box, HStack, VStack, Text, IconButton } from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Post {
  id: string | number;
  title: string;
  subtitle?: string;
}

interface PostNavigationProps {
  currentPostId: string | number;
  posts: Post[];
}

export default function PostNavigation({ currentPostId, posts }: PostNavigationProps) {
  // 현재 포스트의 인덱스 찾기 (최신순 기준)
  const currentIndex = posts.findIndex((post) => post.id === currentPostId);

  // 이전 포스트 (더 최신)
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  // 다음 포스트 (더 오래된)
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <HStack
      justify="space-between"
      align="center"
      w="100%"
      py={4}
      borderTop="1px solid"
      borderColor="gray.200"
    >
      {/* 이전 포스트 (더 최신) */}
      <HStack
        flex={1}
        justify="flex-start"
        gap={3}
        cursor={prevPost ? 'pointer' : 'default'}
        opacity={prevPost ? 1 : 0.3}
        onClick={
          prevPost
            ? () => {
                // 이전 포스트로 이동 로직
                console.log('Navigate to prev post:', prevPost.id);
              }
            : undefined
        }
      >
        <IconButton aria-label="이전 포스트" variant="ghost" size="sm" disabled={!prevPost}>
          <ChevronLeft />
        </IconButton>
        <VStack align="start" gap={0} flex={1} maxW="300px">
          <Text fontSize="xl" fontWeight="semibold" color="gray.800" lineClamp={1}>
            {prevPost?.title || '이전 포스트가 없어요.'}
          </Text>
          <Text fontSize="s" color="gray.500" lineClamp={1}>
            {prevPost?.subtitle || '서울대 타이틀로 어그로 끌어보기'}
          </Text>
        </VStack>
      </HStack>

      {/* 가운데 구분선 */}
      <Box w="1px" h="60px" bg="gray.200" />

      {/* 다음 포스트 (더 오래된) */}
      <HStack
        flex={1}
        justify="flex-end"
        gap={3}
        cursor={nextPost ? 'pointer' : 'default'}
        opacity={nextPost ? 1 : 0.3}
        onClick={
          nextPost
            ? () => {
                // 다음 포스트로 이동 로직
                console.log('Navigate to next post:', nextPost.id);
              }
            : undefined
        }
      >
        <VStack align="end" gap={0} flex={1} maxW="300px">
          <Text
            fontSize="xl"
            fontWeight="semibold"
            color="gray.800"
            lineClamp={1}
            textAlign="right"
          >
            {nextPost?.title || '다음 포스트가 없어요.'}
          </Text>
          <Text fontSize="s" color="gray.500" lineClamp={1} textAlign="right">
            {nextPost?.subtitle || ''}
          </Text>
        </VStack>
        <IconButton aria-label="다음 포스트" variant="ghost" size="sm" disabled={!nextPost}>
          <ChevronRight />
        </IconButton>
      </HStack>
    </HStack>
  );
}
