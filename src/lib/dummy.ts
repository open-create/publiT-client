import { Post, User } from '@/types';

// 프로필용 더미 데이터 (고유/비중복)
export const me: User = {
  id: 'user-0001',
  username: 'haewon.dev',
  email: 'haewon@example.com',
  avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=300&h=300&fit=crop',
  bio: 'Frontend Engineer · Publit',
  createdAt: '2024-01-02T09:00:00Z',
  updatedAt: '2025-08-01T09:00:00Z',
};

// 프로필 잔디(간단 카운트 예시)
export const contributionGrid: Array<{ date: string; count: number }> = Array.from(
  { length: 180 },
  (_, i) => {
    const d = new Date('2025-02-01T00:00:00Z');
    d.setDate(d.getDate() + i);
    return { date: d.toISOString().slice(0, 10), count: (i * 7) % 10 };
  }
);

// 최신글 12개 (작성 시각/제목/아이디 비중복)
export const recentPosts: Post[] = Array.from({ length: 12 }, (_, i) => ({
  id: `post-r-${i + 1}`,
  title: `최신 글 ${i + 1}`,
  subtitle: `최신 글 서브타이틀 ${i + 1}`,
  content: `<p>더미 컨텐츠 ${i + 1}</p>`,
  author: me,
  tags: ['dummy', `tag-${(i % 4) + 1}`],
  visibility: 'public',
  adultOnly: false,
  likes: (i * 3) % 71,
  views: (i * 97) % 2000,
  comments: i % 9,
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  updatedAt: new Date(Date.now() - i * 86400000 + 3600000).toISOString(),
}));

// 스마트 추천(많이) + 최근 본 + 공지 더미
export const smartFeed: Post[] = Array.from({ length: 40 }, (_, i) => ({
  id: `post-s-${i + 1}`,
  title: `스마트 추천 글 ${i + 1}`,
  subtitle: `추천 서브 ${i + 1}`,
  content: `<p>추천 컨텐츠 ${i + 1}</p>`,
  author: {
    ...me,
    id: `author-${(i % 10) + 1}`,
    username: `writer_${(i % 10) + 1}`,
    avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
  },
  tags: ['smart', `topic-${(i % 6) + 1}`],
  visibility: 'public',
  adultOnly: false,
  likes: (i * 11) % 990,
  views: (i * 37) % 5000,
  comments: (i * 2) % 40,
  createdAt: new Date(Date.now() - i * 43200000).toISOString(),
  updatedAt: new Date(Date.now() - i * 43200000 + 600000).toISOString(),
}));

export const recentViewed: Post[] = Array.from({ length: 8 }, (_, i) => ({
  id: `post-v-${i + 1}`,
  title: `최근 본 글 ${i + 1}`,
  content: `<p>최근 컨텐츠 ${i + 1}</p>`,
  author: {
    ...me,
    id: `viewer-${i + 1}`,
    username: `viewer_${i + 1}`,
    avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
  },
  tags: ['recent'],
  visibility: 'public',
  adultOnly: false,
  likes: (i * 5) % 123,
  views: (i * 19) % 2000,
  comments: (i * 3) % 20,
  createdAt: new Date(Date.now() - i * 7200000).toISOString(),
  updatedAt: new Date(Date.now() - i * 7200000 + 300000).toISOString(),
}));

export const notices: Post[] = Array.from({ length: 6 }, (_, i) => ({
  id: `notice-${i + 1}`,
  title: `퍼블릿 공지사항 ${i + 1}`,
  content: `<p>공지 내용 ${i + 1}</p>`,
  author: {
    ...me,
    id: 'publit-official',
    username: 'publit_official',
    avatar:
      'https://images.unsplash.com/photo-1587613992345-01aa7a3a9b9b?q=80&w=400&h=400&fit=crop',
  },
  tags: ['notice'],
  visibility: 'public',
  adultOnly: false,
  likes: (i * 2) % 77,
  views: (i * 13) % 5000,
  comments: i % 5,
  createdAt: new Date(Date.now() - i * 86400000 * 3).toISOString(),
  updatedAt: new Date(Date.now() - i * 86400000 * 3 + 3600000).toISOString(),
}));
