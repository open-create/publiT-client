import React from 'react';
import PostCard from '@/components/publit/PostCard';

interface PostDetailPageProps {
  params: {
    id: string;
  };
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = params;

  return (
    <div className="space-y-6">
      <PostCard postId={id} />
    </div>
  );
}
