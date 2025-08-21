'use client';

import { useMemo, use } from 'react';
import { Box, Container, HStack, VStack, Text, IconButton, Heading } from '@chakra-ui/react';
import { ChevronLeft } from 'lucide-react';
import { PostAuthor, PostBody, CommentsSection, PostNavigation } from '@/components/pubble';
import RecommendedCarousel from '@/components/search/RecommendedCarousel';

import { PostDetailPageProps } from '../types';

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = use(params);

  // 더미 데이터
  const isMine = false;
  const post = {
    id,
    title: '내 첫 도전이 무조건 성공이될 순 없지만',
    subtitle: '도전이 나에게 경험을 가져다 주니까 그 자체로 의미 있다',
    author: { nickname: 'chkdap02', avatar: '' },
    date: '2025.08.07',
    views: 3719280,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(80) +
      '\n\n' +
      'Vivamus vehicula, sapien sed lacinia aliquet, ipsum lacus ultrices lectus, eget efficitur nibh justo sit amet ante. '.repeat(
        60
      ),
    tags: ['도전', '개발', '성장'],
  };

  const authorPosts = useMemo(
    () => [
      {
        id: 'prev-post',
        title: '수능 영어 공부법 이것저것',
        subtitle: '서울대 타이틀로 어그로 끌어보기',
      },
      {
        id: 'current-post',
        title: '내 첫 도전이 무조건 성공이될 순 없지만',
        subtitle: '도전이 나에게 경험을 가져다주니까 그 자체로 의미있다',
      },
      { id: 'next-post', title: '다음 포스트가 없어요.', subtitle: '' },
    ],
    []
  );
  const recommended = useMemo(
    () => Array.from({ length: 12 }).map((_, i) => ({ id: `rec-${i + 1}` })),
    []
  );

  const showPostNavigation = authorPosts.length > 1;

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <VStack align="stretch" gap={0} w="100%" alignSelf="stretch">
        <Box px="1rem" pt="0.75rem" pb="1rem">
          <HStack gap={1.5}>
            <IconButton aria-label="back" variant="ghost" onClick={() => history.back()}>
              <ChevronLeft />
            </IconButton>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              {post.title}
            </Text>
          </HStack>
        </Box>
        {/* 화면 전체 너비 구분선 */}
        <Box w="100%" h="1px" bg="gray.200" />
      </VStack>

      <Container w="100%" maxW="900px" py={6} mx="auto">
        <VStack align="stretch" gap={8}>
          <VStack align="start" gap={6} pt={4} pl={4}>
            <VStack align="start" gap={1.5}>
              <Heading size="3xl">{post.title}</Heading>
              <Text color="gray.600">{post.subtitle}</Text>
            </VStack>
            <PostAuthor
              nickname={post.author.nickname}
              date={post.date}
              views={post.views}
              isMine={isMine}
            />
          </VStack>

          {/* 본문 + 태그 */}
          <PostBody content={post.content} tags={post.tags} isMine={isMine} />

          {/* 3. 댓글 영역 */}
          <CommentsSection total={1739} />

          {/* 4. 이전/다음 포스트 네비게이션 */}
          {showPostNavigation && (
            <PostNavigation currentPostId="current-post" posts={authorPosts} />
          )}

          {/* 5. 추천 포스트 */}
          <RecommendedCarousel items={recommended} />
        </VStack>
      </Container>
    </Box>
  );
}
