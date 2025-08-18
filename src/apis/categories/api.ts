import { useApiQuery } from '@/hooks/useApi';

// Categories 관련 타입
export interface Category {
  id: string;
  name: string;
  description?: string;
  count: number;
}

export interface CategoriesResponse {
  categories: Category[];
}

// Categories API 함수들
export const categoriesApi = {
  // 퍼블 태그 종류 모두 조회
  getPubbleCategories: () => '/pubblesCategories',

  // 인기 태그 조회
  getPopularTags: () => '/tags/popular',

  // 태그 검색
  searchTags: (query: string) => `/tags/search?q=${query}`,
};

// Categories Hooks
export function usePubbleCategories() {
  return useApiQuery<CategoriesResponse>(['categories', 'pubbles'], '/pubblesCategories');
}

export function usePopularTags() {
  return useApiQuery<CategoriesResponse>(['tags', 'popular'], '/tags/popular');
}

export function useSearchTags(query: string) {
  return useApiQuery<CategoriesResponse>(
    ['tags', 'search', query],
    `/tags/search?q=${query}`,
    undefined,
    { enabled: !!query }
  );
}
