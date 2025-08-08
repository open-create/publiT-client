'use client';

// 무한 스크롤 관련 라이브러리
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { useInView } from 'react-intersection-observer';

import { VStack, Button, Text, HStack, Box, Icon } from '@chakra-ui/react';
import FeedItem from './FeedItem';
import { ChevronRight } from 'lucide-react';

interface FeedListProps {
  // source: 'smart' | 'popular' | 'subscribed';
  source: 'smart' | 'popular' | 'subscribed' | 'recent' | 'notice';
  variant: 'main' | 'side';
  limit?: number; // side = 4
}

export default function FeedList({ source, variant, limit }: FeedListProps) {
  /* ① 더미 데이터 */
  const dummyData = [
    {
      id: 1,
      title: 'React 18의 새로운 기능들: Concurrent Features와 Suspense',
      author: '김개발',
      date: '2024.01.15',
      thumbnail: '/dummy1.jpg',
      content: 'React 18의 새로운 기능들: Concurrent Features와 Suspense',
    },
    {
      id: 2,
      title: 'TypeScript 5.0에서 추가된 유용한 타입 기능들',
      author: '이코딩',
      date: '2024.01.14',
      thumbnail: '/dummy2.jpg',
      content: 'TypeScript 5.0에서 추가된 유용한 타입 기능들',
    },
    {
      id: 3,
      title: 'Next.js 14 App Router 완벽 가이드',
      author: '박프론트',
      date: '2024.01.13',
      thumbnail: '/dummy3.jpg',
      content: 'Next.js 14 App Router 완벽 가이드',
    },
    {
      id: 4,
      title: 'Chakra UI v3 마이그레이션 가이드',
      author: '최디자인',
      date: '2024.01.12',
      thumbnail: '/dummy4.jpg',
      content: 'Chakra UI v3 마이그레이션 가이드',
    },
    {
      id: 5,
      title: '성능 최적화를 위한 React 렌더링 최적화 기법',
      author: '정성능',
      date: '2024.01.11',
      thumbnail: '/dummy5.jpg',
      content: '성능 최적화를 위한 React 렌더링 최적화 기법',
    },
  ];

  /* ① 데이터 요청 (주석 처리) */
  // const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
  //   queryKey: ['feed', source],
  //   queryFn: ({ pageParam = 1 }) =>
  //     fetch(`/api/feed?source=${source}&page=${pageParam}`).then((r) => r.json()),
  //   initialPageParam: 1,
  //   getNextPageParam: (last: any) => last.nextPage ?? false,
  //   enabled: variant === 'main', // side-feed는 1페이지만
  // });

  /* ② 스크롤 감지 (주석 처리) */
  // const { ref } = useInView({
  //   onChange: (inView) => inView && hasNextPage && fetchNextPage(),
  //   rootMargin: '100px',
  //   triggerOnce: false,
  // });

  /* ③ side-feed용 잘라내기 */
  const items = variant === 'side' ? dummyData.slice(0, limit ?? 4) : dummyData;

  return (
    <VStack align="stretch" gap={variant === 'main' ? 6 : 4}>
      {/* 사이드 피드 헤더 (recent, notice일 때만) */}
      {variant === 'side' && (source === 'recent' || source === 'notice') && (
        <HStack justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold" color="gray.800">
            {source === 'recent' ? '최근 본 퍼블' : '퍼블릿 공지사항'}
          </Text>
          <Button variant="ghost" size="xs" p="0">
            <Icon as={ChevronRight} boxSize={6} color="black" strokeWidth={2} />
          </Button>
        </HStack>
      )}

      {/* 기존 제목 (recent, notice가 아닐 때만) */}
      {variant !== 'side' && (source === 'recent' || source === 'notice') && (
        <Text fontSize="sm" fontWeight="semibold" color="gray.600">
          {source === 'recent' ? '최근 본 퍼블' : '퍼블릿 공지사항'}
        </Text>
      )}

      {items.map((post: any, i: number) => (
        <FeedItem
          key={post.id}
          title={post.title}
          author={post.author}
          date={post.date}
          content={post.content}
          thumbnail={post.thumbnail}
          compact={variant === 'side'}
          showTopBorder={true}
        />
      ))}

      {/* 메인 피드 무한스크롤 로딩 트리거 (주석 처리) */}
      {/* {variant === 'main' && hasNextPage && (
        <Button ref={ref} loading={isFetchingNextPage} variant="ghost" size="sm">
          더 보기
        </Button>
      )} */}
    </VStack>
  );
}
