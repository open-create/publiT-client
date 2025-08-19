// 사용자 도메인 타입
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

// 포스트 도메인 타입
export interface Post {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  author: User;
  tags: string[];
  visibility: 'public' | 'private';
  adultOnly: boolean;
  password?: string;
  likes: number;
  views: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

// 댓글 도메인 타입
export interface Comment {
  id: string;
  content: string;
  author: User;
  postId: string;
  parentId?: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
}

// 알림 도메인 타입
export interface Notification {
  id: string;
  type: 'comment' | 'like' | 'follow' | 'mention' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: Record<string, unknown>;
}

// 좋아요 도메인 타입
export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

// 팔로우 도메인 타입
export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

// 검색 결과 도메인 타입
export interface SearchResult {
  type: 'post' | 'user' | 'tag';
  id: string;
  title: string;
  description?: string;
  url: string;
  score: number;
}

// 파일 업로드 도메인 타입
export interface FileUpload {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: string;
}

// 사용자 설정 도메인 타입
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

// 통계 도메인 타입
export interface Stats {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  totalLikes: number;
  activeUsers: number;
  newUsersThisWeek: number;
  newPostsThisWeek: number;
}
