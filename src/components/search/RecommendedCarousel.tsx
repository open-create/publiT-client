'use client';

import { useMemo, useState } from 'react';
import { Box, Grid, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { RefreshCw } from 'lucide-react';

interface RecommendedItem {
  id: string | number;
  // 확장 여지를 위해 title/thumbnail 등은 선택
  title?: string;
  thumbnail?: string;
}

interface RecommendedCarouselProps {
  items: RecommendedItem[];
  pageSize?: number; // 기본 4개
}

export default function RecommendedCarousel({ items, pageSize = 4 }: RecommendedCarouselProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const visible = useMemo(() => items.slice(start, end), [items, start, end]);

  const handleRefresh = () => setPage((p) => (p >= totalPages ? 1 : p + 1));

  return (
    <VStack align="stretch" gap={4}>
      <HStack justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold" color="gray.800">
          당신을 위한 추천 퍼블
        </Text>
        <IconButton variant="ghost" aria-label="refresh" onClick={handleRefresh}>
          <RefreshCw />
        </IconButton>
      </HStack>

      <HStack align="center" justify="center" w="100%">
        <Grid templateColumns="repeat(4, 1fr)" gap={6} flex={1}>
          {visible.map((item) => (
            <Box key={item.id} w="100%" h="14rem" bg="gray.200" borderRadius="md" shadow="sm" />
          ))}
        </Grid>
      </HStack>
    </VStack>
  );
}
