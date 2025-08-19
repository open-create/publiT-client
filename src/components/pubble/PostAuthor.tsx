'use client';

import { useState } from 'react';
import { Box, HStack, VStack, Text } from '@chakra-ui/react';
import Button from '@/components/ui/Button';

interface PostAuthorProps {
  avatarUrl?: string;
  nickname: string;
  date: string;
  views: number;
  isMine?: boolean;
}

export default function PostAuthor({ avatarUrl, nickname, date, views, isMine }: PostAuthorProps) {
  // 임시로 avatarUrl 사용 (나중에 실제 아바타 로직으로 교체)
  console.log('Avatar URL available:', avatarUrl);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribeToggle = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <HStack justify="space-between" w="100%">
      <HStack gap={3}>
        {/* TODO: 프로필 이미지 추가 */}
        <Box w="2.25rem" h="2.25rem" borderRadius="full" bg="gray.300" />
        <VStack align="start" gap={0}>
          <Text fontWeight="medium">{nickname}</Text>
          <Text fontSize="xs" color="gray.500">
            {date} · 조회 {views.toLocaleString()}
          </Text>
        </VStack>
      </HStack>
      <HStack gap={3}>
        {isMine ? (
          <Button variant="outline" size="sm">
            수정
          </Button>
        ) : (
          <Button
            variant={isSubscribed ? 'outline' : 'primary'}
            size="sm"
            onClick={handleSubscribeToggle}
          >
            {isSubscribed ? '언팔로우' : '팔로우'}
          </Button>
        )}
      </HStack>
    </HStack>
  );
}
