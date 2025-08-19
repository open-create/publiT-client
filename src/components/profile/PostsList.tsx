'use client';

import React, { useState, useMemo } from 'react';
import { Box, Grid, GridItem, Text, Heading, HStack } from '@chakra-ui/react';

interface Post {
  id: string;
  title: string;
  thumbnail?: string;
  views: number;
  createdAt: string;
}

type SortType = 'latest' | 'popular';

interface PostsListProps {
  posts: Post[];
  title?: string;
  columns?: number;
  maxPosts?: number;
  showFilter?: boolean; // 필터 표시 여부
  defaultSort?: SortType; // 기본 정렬 방식
}

export default function PostsList({
  posts,
  title = '포스트 목록',
  columns = 4,
  maxPosts = 8,
  showFilter = false,
  defaultSort = 'popular',
}: PostsListProps) {
  const [sortType, setSortType] = useState<SortType>(defaultSort);

  // 정렬된 포스트 목록
  const sortedPosts = useMemo(() => {
    const sorted = [...posts];
    if (sortType === 'latest') {
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      return sorted.sort((a, b) => b.views - a.views);
    }
  }, [posts, sortType]);

  // 표시할 포스트 개수 결정
  const actualMaxPosts = useMemo(() => {
    if (sortType === 'popular') {
      return Math.min(maxPosts, 8); // 인기 포스트는 최대 8개
    } else {
      return sortedPosts.length; // 최신 포스트는 전체 출력
    }
  }, [sortType, maxPosts, sortedPosts.length]);

  const displayPosts = sortedPosts.slice(0, actualMaxPosts);
  const templateColumns = `repeat(${columns}, 1fr)`;

  // 임시로 Button import 사용 (나중에 실제 버튼으로 교체)
  console.log('Button component available for future use');

  return (
    <Box>
      {/* 헤더 (제목 + 필터) */}
      <HStack justify="space-between" align="center" mb={6}>
        <Heading size="lg" color="blue.600">
          {title}
        </Heading>

        {/* 필터 버튼 */}
        {showFilter && (
          <HStack gap={0} align="center">
            <Text
              as="button"
              onClick={() => setSortType('latest')}
              fontSize="lg"
              fontWeight={sortType === 'latest' ? 'medium' : 'normal'}
              color={sortType === 'latest' ? 'black' : 'gray.500'}
              cursor="pointer"
              _hover={{ color: 'black' }}
              transition="color 0.2s"
            >
              최신순
            </Text>
            <Text fontSize="lg" color="gray.400" mx={3}>
              |
            </Text>
            <Text
              as="button"
              onClick={() => setSortType('popular')}
              fontSize="lg"
              fontWeight={sortType === 'popular' ? 'medium' : 'normal'}
              color={sortType === 'popular' ? 'black' : 'gray.500'}
              cursor="pointer"
              _hover={{ color: 'black' }}
              transition="color 0.2s"
            >
              인기순
            </Text>
          </HStack>
        )}
      </HStack>

      {/* 포스트 그리드 */}
      <Grid templateColumns={templateColumns} gap={6}>
        {displayPosts.length > 0
          ? displayPosts.map((post) => (
              <GridItem key={post.id}>
                <Box
                  bg="blue.100"
                  h="200px"
                  borderRadius="lg"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  p={4}
                  cursor="pointer"
                  _hover={{
                    bg: 'blue.200',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s',
                  }}
                >
                  {post.thumbnail ? (
                    // 추후 실제 썸네일 이미지 구현
                    <Box
                      w="100%"
                      h="120px"
                      bg="gray.300"
                      borderRadius="md"
                      mb={3}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontSize="xs" color="gray.600">
                        썸네일
                      </Text>
                    </Box>
                  ) : null}

                  <Text
                    color="blue.700"
                    fontSize="sm"
                    fontWeight="semibold"
                    textAlign="center"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    display="-webkit-box"
                    css={{
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {post.title}
                  </Text>

                  <Text fontSize="xs" color="blue.600" mt={1}>
                    조회수 {post.views.toLocaleString()}
                  </Text>
                </Box>
              </GridItem>
            ))
          : // 빈 포스트 카드들 (기존과 동일)
            Array.from({ length: maxPosts }, (_, i) => (
              <GridItem key={i}>
                <Box
                  bg="blue.100"
                  h="200px"
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="blue.600" fontSize="sm">
                    포스트 {i + 1}
                  </Text>
                </Box>
              </GridItem>
            ))}
      </Grid>
    </Box>
  );
}
