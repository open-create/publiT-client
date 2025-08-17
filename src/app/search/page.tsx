'use client';

import { useState } from 'react';
import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import SearchBar from '@/components/search/SearchBar';
import TagScroller from '@/components/search/TagScroller';
import RecentKeywords from '@/components/search/RecentKeywords';
import SearchResultGrid, { SearchFilter } from '@/components/search/SearchResultGrid';

export default function SearchPage() {
  const [recent, setRecent] = useState<string[]>(['김해원 작가', '방구석 재민이']);
  const [tags] = useState<string[]>([
    '로맨스',
    '판타지',
    '스릴러',
    '액션',
    '일상',
    '드라마',
    '개그',
    '모험/사극',
    '감성',
    '스포츠',
  ]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<SearchFilter>('해시태그');
  const [items, setItems] = useState(Array.from({ length: 40 }).map((_, i) => ({ id: i + 1 })));

  const handleSearch = (kw: string) => {
    setRecent((prev) => {
      const next = [kw, ...prev.filter((v) => v !== kw)];
      return next.slice(0, 10);
    });
    setPage(1);
  };

  return (
    <Container maxW="1200px" py={8}>
      <VStack align="stretch" gap={8}>
        {/* <Box h="1rem" /> */}
        {/* 검색창 */}
        <SearchBar onSubmit={handleSearch} />

        {/* 태그 목록 (가로 스크롤) */}
        <TagScroller tags={tags} onSelect={handleSearch} />

        {/* 최근 검색어 */}
        <RecentKeywords
          items={recent}
          onRemove={(kw) => setRecent((prev) => prev.filter((v) => v !== kw))}
          onClear={() => setRecent([])}
        />

        {/* 검색 결과 그리드 + 필터 + 페이지네이션 */}
        <SearchResultGrid
          items={items}
          page={page}
          onPageChange={setPage}
          filter={filter}
          onFilterChange={setFilter}
        />
      </VStack>
    </Container>
  );
}
