'use client';

import FeedList from '@/components/main/FeedList';
import FeedFilter from '@/components/main/FeedFilter';
import { Grid, GridItem, HStack, Button, Box, VStack } from '@chakra-ui/react';
import { useState } from 'react';

export default function HomePage() {
  const [source, setSource] = useState<'smart' | 'popular' | 'subscribed' | 'recent' | 'notice'>(
    'smart'
  );
  const [filter, setFilter] = useState<'smart' | 'popular' | 'subscribed'>('smart');

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
