'use client';

import { useState } from 'react';
import { Container, VStack, Heading, Text } from '@chakra-ui/react';
import SearchBar from '@/components/search/SearchBar';
import SearchResultGrid, { SearchFilter } from '@/components/search/SearchResultGrid';
// 관리자 페이지는 태그/추천/실시간 섹션 없이 단일 검색 중심 UI로 단순화

export default function AdminSearchPage() {
  // 최근/태그/추천/실시간 제거
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<SearchFilter>('해시태그');
  const [items] = useState(Array.from({ length: 40 }).map((_, i) => ({ id: i + 1 })));
  // 추천/실시간 제거

  const [hasSearched, setHasSearched] = useState(false);
  const [_query, setQuery] = useState('');

  const handleSearch = (kw: string) => {
    setQuery(kw);
    setPage(1);
    setHasSearched(true);
    // 임시로 query 사용 (나중에 실제 검색 로직으로 교체)
    console.log('Search query:', _query);
  };

  return (
    <Container maxW="1200px" py={8}>
      <VStack align="stretch" gap={8}>
        <Heading size="2xl">전체 글 검색</Heading>
        <SearchBar onSubmit={handleSearch} />
        {hasSearched ? (
          <SearchResultGrid
            items={items}
            page={page}
            onPageChange={setPage}
            filter={filter}
            onFilterChange={setFilter}
          />
        ) : (
          <Text color="gray.500">검색어를 입력해 모든 게시글을 조회하세요.</Text>
        )}
      </VStack>
    </Container>
  );
}
