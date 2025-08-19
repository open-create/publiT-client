'use client';

import FeedList from '@/components/main/FeedList';
import FeedFilter from '@/components/main/FeedFilter';
import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRefreshToken } from '@/apis/auth';

export default function HomePage() {
  const [source] = useState<'smart' | 'popular' | 'subscribed' | 'recent' | 'notice'>('smart');
  const [filter, setFilter] = useState<'smart' | 'popular' | 'subscribed'>('smart');

  const refreshTokenMutation = useRefreshToken();

  // 로그인 직후 리다이렉트된 경우, 이전 페이지에서 저장한 응답을 출력
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1) 직전 페이지에서 저장해 둔 응답 출력
    const raw = sessionStorage.getItem('auth:lastRefresh');
    if (raw) {
      try {
        // console.log('[auth] lastRefresh:', JSON.parse(raw));
      } catch {}
      sessionStorage.removeItem('auth:lastRefresh');
    }

    // 2) accessToken이 없으면 홈에서 한 번 자동 재발급 시도 (쿠키 기반)
    const hasAccess = !!localStorage.getItem('accessToken');
    const tried = sessionStorage.getItem('auth:triedRefreshOnHome') === '1';
    if (!hasAccess && !tried) {
      sessionStorage.setItem('auth:triedRefreshOnHome', '1');
      refreshTokenMutation.mutate(undefined, {
        onSuccess: (data) => {
          // console.log('[auth] refresh from home success:', data);
          if (data?.success && data?.data) {
            localStorage.setItem('accessToken', data.data);
            sessionStorage.setItem('auth:lastRefresh', JSON.stringify(data));
          }
        },
        onError: (err) => {
          // console.error('[auth] refresh from home error:', err);
        },
      });
    }
  }, [refreshTokenMutation]);

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
