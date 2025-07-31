export interface User {
  id: string;
  email: string;
  username: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  title: string;
  content: string;
  status: 'pending' | 'answered';
  user: User;
  answer?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  type: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  reporter: User;
  targetPost?: Post;
  createdAt: string;
  updatedAt: string;
}
