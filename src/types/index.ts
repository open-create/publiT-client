// 기본 API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 페이지네이션 타입
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 파일 업로드 타입
export interface FileUpload {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: string;
}

// 알림 타입
export interface Notification {
  id: string;
  type: 'comment' | 'like' | 'follow' | 'mention' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: Record<string, any>;
}

// 댓글 타입
export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  postId: string;
  parentId?: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
}

// 좋아요 타입
export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

// 팔로우 타입
export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

// 검색 결과 타입
export interface SearchResult {
  type: 'post' | 'user' | 'tag';
  id: string;
  title: string;
  description?: string;
  url: string;
  score: number;
}

// 설정 타입
export interface UserSettings {
  id: string;
  userId: string;
  emailNotifications: {
    comments: boolean;
    likes: boolean;
    follows: boolean;
    mentions: boolean;
    system: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'followers';
    showEmail: boolean;
    allowComments: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
  language: 'ko' | 'en';
}

// 통계 타입
export interface Stats {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  totalLikes: number;
  activeUsers: number;
  newUsersThisWeek: number;
  newPostsThisWeek: number;
}

// 에러 타입
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// 로딩 상태 타입
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

// 폼 상태 타입
export interface FormState<T = any> {
  data: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValid: boolean;
}
