import React from 'react';
import Link from 'next/link';

interface PostCardProps {
  postId?: string;
}

export default function PostCard({ postId }: PostCardProps) {
  // 실제로는 postId를 사용해서 데이터를 가져와야 합니다
  const post = {
    id: postId || '1',
    title: 'React와 Next.js로 만든 프로젝트',
    content:
      '이번에 React와 Next.js를 사용해서 새로운 프로젝트를 만들어보았습니다. TypeScript를 함께 사용하면서 타입 안정성도 확보했습니다.',
    author: '개발자',
    createdAt: '2024-01-15',
    likes: 42,
    comments: 12,
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm text-gray-600">👤</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{post.author}</p>
            <p className="text-sm text-gray-500">{post.createdAt}</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>

        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 leading-relaxed">{post.content}</p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
              <span>❤️</span>
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
              <span>💬</span>
              <span>{post.comments}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button className="text-gray-500 hover:text-gray-700">📤</button>
            <button className="text-gray-500 hover:text-gray-700">⭐</button>
          </div>
        </div>
      </div>
    </div>
  );
}
