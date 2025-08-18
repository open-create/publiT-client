// FeedItem Props
export interface FeedItemProps {
  post: {
    id: string;
    title: string;
    subtitle?: string;
    content: string;
    author: {
      id: string;
      username: string;
      avatar?: string;
    };
    createdAt: string;
    likes: number;
    comments: number;
    views: number;
  };
  withTopDivider?: boolean;
}

// FeedList Props
export interface FeedListProps {
  items: Array<{
    id: string;
    title: string;
    subtitle?: string;
    content: string;
    author: {
      id: string;
      username: string;
      avatar?: string;
    };
    createdAt: string;
    likes: number;
    comments: number;
    views: number;
  }>;
  variant?: 'main' | 'side';
  isLoading?: boolean;
}

// FeedFilter Props
export interface FeedFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  filters: Array<{
    key: string;
    label: string;
  }>;
}
