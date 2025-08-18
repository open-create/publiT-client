// SearchBar Props
export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
}

// SearchResultGrid Props
export interface GridItem {
  id: string;
  title: string;
  description?: string;
  type: string;
}

export interface SearchResultGridProps<TItem extends GridItem> {
  items: TItem[];
  isLoading?: boolean;
  onItemClick?: (item: TItem) => void;
}

// RecentKeywords Props
export interface RecentKeywordsProps {
  keywords: string[];
  onKeywordClick: (keyword: string) => void;
  onClearAll: () => void;
}

// TagScroller Props
export interface TagScrollerProps {
  tags: Array<{
    id: string;
    name: string;
    count: number;
  }>;
  onTagClick: (tag: string) => void;
}

// RealtimePopular Props
export interface RealtimePopularProps {
  posts: Array<{
    id: string;
    title: string;
    author: string;
    views: number;
    createdAt: string;
  }>;
  onPostClick: (postId: string) => void;
}

// RecommendedCarousel Props
export interface RecommendedCarouselProps {
  posts: Array<{
    id: string;
    title: string;
    subtitle?: string;
    author: string;
    coverImage?: string;
    createdAt: string;
  }>;
  onPostClick: (postId: string) => void;
}
