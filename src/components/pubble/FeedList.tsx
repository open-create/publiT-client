import React from 'react';
import PostCard from './PostCard';

export default function FeedList() {
  const posts = [
    {
      id: '1',
      title: 'React와 Next.js로 만든 프로젝트',
      content:
        '이번에 React와 Next.js를 사용해서 새로운 프로젝트를 만들어보았습니다. TypeScript를 함께 사용하면서 타입 안정성도 확보했습니다.',
      author: '개발자',
      createdAt: '2024-01-15',
      likes: 42,
      comments: 12,
    },
    {
      id: '2',
      title: 'TypeScript 팁과 트릭',
      content:
        'TypeScript를 사용하면서 알게 된 유용한 팁들을 공유합니다. 제네릭, 유니온 타입, 인터페이스 등을 활용한 실전 예제를 포함했습니다.',
      author: '타입스크립터',
      createdAt: '2024-01-14',
      likes: 28,
      comments: 8,
    },
    {
      id: '3',
      title: '웹 개발 시작하기',
      content:
        '웹 개발을 처음 시작하는 분들을 위한 가이드입니다. HTML, CSS, JavaScript부터 시작해서 React까지 단계별로 설명합니다.',
      author: '웹개발자',
      createdAt: '2024-01-13',
      likes: 35,
      comments: 15,
    },
  ];

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} postId={post.id} />
      ))}

      <div className="text-center py-8">
        <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
          더 보기
        </button>
      </div>
    </div>
  );
}
