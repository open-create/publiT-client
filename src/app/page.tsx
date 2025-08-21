'use client';

import FeedList from '@/components/main/FeedList';
import FeedFilter from '@/components/main/FeedFilter';
import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function HomePage() {
  const [source] = useState<'smart' | 'popular' | 'subscribed' | 'recent' | 'notice'>('smart');
  const [filter, setFilter] = useState<'smart' | 'popular' | 'subscribed'>('smart');
  const searchParams = useSearchParams();

  // OAuth 로그인 후 토큰 처리 (홈에서는 재발급 호출하지 않음)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1) OAuth 로그인 후 URL 파라미터로 받은 토큰 처리
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('accessToken', token);
      // 토큰을 저장한 후 URL에서 제거
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('token');
      window.history.replaceState({}, '', newUrl.toString());
      return;
    }

    // 2) 홈에서는 재발급 트리거 하지 않음 (auth 페이지 전담)
  }, [searchParams]);

  return (
    <Grid templateColumns="3fr 1fr" gap="8" pt="4" pl="10" pr="10">
      {/* 왼쪽 메인 피드 */}
      <GridItem>
        <VStack gap="1" align="stretch">
          <FeedFilter value={filter} onChange={setFilter} />
          <FeedList variant="main" source={source} />
        </VStack>
      </GridItem>

      {/* 오른쪽 사이드 피드 */}
      <GridItem>
        <VStack gap="4" align="stretch">
          <FeedList variant="side" source="recent" limit={4} />
          <FeedList variant="side" source="notice" limit={4} />
        </VStack>
      </GridItem>
    </Grid>
  );
}
