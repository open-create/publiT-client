'use client';

import { VStack, Button, Text, HStack, Icon } from '@chakra-ui/react';
import FeedItem from './FeedItem';
import { ChevronRight } from 'lucide-react';
import { usePubbles } from '@/apis/pubble';
import { formatRelativeTime } from '@/utils/formatDate';
import { useEffect } from 'react';

interface FeedListProps {
  source: 'smart' | 'popular' | 'subscribed' | 'recent' | 'notice';
  variant: 'main' | 'side';
  limit?: number; // side = 4
}

export default function FeedList({ source, variant, limit }: FeedListProps) {
  // API 호출 (메인/사이드 동일 API, 사이드일 때 limit 전달)
  const { data, error } = usePubbles({
    source,
    page: 1,
    ...(variant === 'side' && limit && { limit }),
  });

  // 실패 시 콘솔 로깅
  useEffect(() => {
    if (error) {
      console.error('[feed] GET /pubbles error:', error);
    }
  }, [error]);

  // 서버 응답 스키마에 맞춰 매핑 (가정: data.posts)
  const apiItems =
    data?.posts?.map((p: any) => ({
      id: p.id,
      title: p.title,
      author: p.author?.username ?? '익명',
      date: formatRelativeTime(p.createdAt ?? new Date().toISOString()),
      thumbnail: p.thumbnail,
      content: p.subtitle ?? p.content,
    })) ?? [];

  // API 실패시 간단한 폴백
  const fallbackItems = [
    { id: 1, title: '샘플 포스트 1', author: 'publiT', date: '방금 전', content: '샘플 내용' },
    { id: 2, title: '샘플 포스트 2', author: 'publiT', date: '1시간 전', content: '샘플 내용' },
    { id: 3, title: '샘플 포스트 3', author: 'publiT', date: '어제', content: '샘플 내용' },
  ];

  const items =
    apiItems.length > 0
      ? apiItems
      : fallbackItems.slice(0, variant === 'side' ? limit ?? 4 : undefined);

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

      {items.map((post: any) => (
        <FeedItem
          key={post.id}
          title={post.title}
          author={post.author}
          date={post.date}
          content={variant === 'main' ? post.content : undefined}
          thumbnail={post.thumbnail}
          compact={variant === 'side'}
          showTopBorder={true}
        />
      ))}
    </VStack>
  );
}
