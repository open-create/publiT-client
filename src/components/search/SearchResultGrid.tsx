'use client';

import { useMemo } from 'react';
import { Box, Grid, HStack, Text, VStack } from '@chakra-ui/react';
import { Pagination } from '@/components/ui';

export type SearchFilter = '작가' | '제목' | '본문' | '해시태그';

export interface GridItem {
  id: string | number;
}

interface SearchResultGridProps<TItem extends GridItem> {
  items: TItem[];
  page: number;
  pageSize?: number; // 기본 8개
  onPageChange: (page: number) => void;
  filter: SearchFilter;
  onFilterChange: (f: SearchFilter) => void;
}

export default function SearchResultGrid<TItem extends GridItem>({
  items,
  page,
  pageSize = 8,
  onPageChange,
  filter,
  onFilterChange,
}: SearchResultGridProps<TItem>) {
  const totalPages = 10; // Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  const visible = useMemo(() => items.slice(start, end), [items, start, end]);

  const goPrev = () => onPageChange(Math.max(1, currentPage - 1));
  const goNext = () => onPageChange(Math.min(totalPages, currentPage + 1));

  const filters: SearchFilter[] = ['작가', '제목', '본문', '해시태그'];

  return (
    <VStack align="stretch" gap={4} position="relative">
      {/* 필터: 작가 | 제목 | 본문 | 해시태그 */}
      <HStack justify="flex-end" align="center" gap={4} color="gray.600">
        {filters.map((f, idx) => (
          <HStack key={f} gap={4}>
            <Box
              as="button"
              onClick={() => onFilterChange(f)}
              color={filter === f ? 'gray.900' : 'gray.500'}
              fontWeight={filter === f ? 'bold' : 'normal'}
              fontSize="lg"
            >
              {f}
            </Box>
            {idx < filters.length - 1 && (
              <Text color="gray.400" fontSize="lg">
                |
              </Text>
            )}
          </HStack>
        ))}
      </HStack>

      {/* 결과 그리드: 2행 4열 */}
      <Grid templateColumns="repeat(4, 1fr)" gap={8}>
        {visible.map((item) => (
          <Box key={item.id} w="100%" h="18rem" bg="blue.100" borderRadius="md" />
        ))}
      </Grid>

      <Box h="0.5rem" />

      <Pagination currentPage={currentPage} totalPages={totalPages} onChange={onPageChange} />
    </VStack>
  );
}
