// ProfileSideHeader Props
export interface ProfileSideHeaderProps {
  variant?: 'default' | 'minimal';
  title?: string;
  onBack?: () => void;
}

// ProfileImageEditor Props
export interface ProfileImageEditorProps {
  currentImage?: string;
  onImageChange: (file: File) => void;
}

// ProfileModal Props
export interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    username: string;
    avatar?: string;
    bio?: string;
  };
}

// ProfileDeleteButton Props
export interface ProfileDeleteButtonProps {
  onDelete: () => void;
  isLoading?: boolean;
}

// PostsList Props
export interface PostsListProps {
  posts: Array<{
    id: string;
    title: string;
    subtitle?: string;
    createdAt: string;
    views: number;
    likes: number;
  }>;
  variant?: 'latest' | 'popular';
  showFilters?: boolean;
  limit?: number;
}

// ViewsChart Props
export interface ViewsChartProps {
  data: Array<{
    date: string;
    views: number;
  }>;
  period?: '7d' | '30d' | '90d';
}

// VisitsChart Props
export interface VisitsChartProps {
  data: Array<{
    date: string;
    visits: number;
  }>;
  period?: '7d' | '30d' | '90d';
}

// TrafficSource Props
export interface TrafficSourceProps {
  data: Array<{
    source: string;
    count: number;
    percentage: number;
  }>;
  type: 'profile' | 'post';
}
