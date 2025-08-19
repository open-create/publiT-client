'use client';

import { useState } from 'react';
import { Container, VStack } from '@chakra-ui/react';
import SearchBar from '@/components/search/SearchBar';
import TagScroller from '@/components/search/TagScroller';
import RecentKeywords from '@/components/search/RecentKeywords';
import SearchResultGrid, { SearchFilter } from '@/components/search/SearchResultGrid';
import RecommendedCarousel from '@/components/search/RecommendedCarousel';
import RealtimePopular from '@/components/search/RealtimePopular';

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
  const [recommended] = useState(
    Array.from({ length: 16 }).map((_, i) => ({ id: `rec-${i + 1}` }))
  );
  const [popular] = useState(
    Array.from({ length: 8 }).map((_, i) => ({
      id: `pop-${i + 1}`,
      title: '모기에 안 물리는 법',
      excerpt: '삽지기 표시를 내서 가려움을 참는다',
      author: '해원이오',
      date: '2025.08.08',
    }))
  );
  const [hasSearched, setHasSearched] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = (kw: string) => {
    setRecent((prev) => {
      const next = [kw, ...prev.filter((v) => v !== kw)];
      return next.slice(0, 10);
    });
    setPage(1);
    setQuery(kw);
    setHasSearched(true);
    // 임시로 setItems와 query 사용 (나중에 실제 검색 로직으로 교체)
    console.log('Search query:', query);
    console.log('Items count:', items.length);
    console.log('setItems function available:', setItems);
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

        {hasSearched ? (
          <SearchResultGrid
            items={items}
            page={page}
            onPageChange={setPage}
            filter={filter}
            onFilterChange={setFilter}
          />
        ) : (
          <>
            <RecommendedCarousel items={recommended} />
            <RealtimePopular items={popular} />
          </>
        )}
      </VStack>
    </Container>
  );
}
