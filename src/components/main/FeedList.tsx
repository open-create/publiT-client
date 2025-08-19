'use client';

import { VStack, Button, Text, HStack, Icon } from '@chakra-ui/react';
import FeedItem from './FeedItem';
import { ChevronRight } from 'lucide-react';
import { usePubbles } from '@/apis/pubble';
import type { Post } from '@/types';
import { formatRelativeTime } from '@/utils/formatDate';

interface FeedListProps {
  source: 'smart' | 'popular' | 'subscribed' | 'recent' | 'notice';
  variant: 'main' | 'side';
  limit?: number; // side = 4
}

type ViewPost = {
  id: string;
  title: string;
  author: string;
  date: string;
  // Post 타입엔 thumbnail이 없으니 제거
  content?: string;
};

export default function FeedList({ source, variant, limit }: FeedListProps) {
  const { data, error: _error } = usePubbles({
    source,
    page: 1,
    ...(variant === 'side' && limit && { limit }),
  });

  const posts: Post[] = data?.posts ?? [];

  // Post -> ViewPost 변환 (정적 타입만 사용)
  const apiItems: ViewPost[] = posts.map((p) => ({
    id: p.id,
    title: p.title ?? '(제목 없음)',
    author: p.author?.username ?? '익명',
    date: formatRelativeTime(p.createdAt),
    content: p.subtitle ?? p.content ?? undefined,
  }));

  const fallback: ViewPost[] = [
    { id: '1', title: '샘플 포스트 1', author: 'publiT', date: '방금 전', content: '샘플 내용' },
    { id: '2', title: '샘플 포스트 2', author: 'publiT', date: '1시간 전', content: '샘플 내용' },
    { id: '3', title: '샘플 포스트 3', author: 'publiT', date: '어제', content: '샘플 내용' },
  ];

  const items =
    apiItems.length > 0 ? apiItems : fallback.slice(0, variant === 'side' ? limit ?? 4 : undefined);

  return (
    <VStack align="stretch" gap={variant === 'main' ? 6 : 4}>
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

      {variant !== 'side' && (source === 'recent' || source === 'notice') && (
        <Text fontSize="sm" fontWeight="semibold" color="gray.600">
          {source === 'recent' ? '최근 본 퍼블' : '퍼블릿 공지사항'}
        </Text>
      )}

      {items.map((post) => (
        <FeedItem
          key={post.id}
          title={post.title}
          author={post.author}
          date={post.date}
          {...(variant === 'main' && post.content && { content: post.content })}
          compact={variant === 'side'}
          showTopBorder
        />
      ))}
    </VStack>
  );
}
