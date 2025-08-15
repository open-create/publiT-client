import React from 'react';

interface PostDetailPageProps {
  params: {
    id: string;
  };
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = params;

  return <div className="space-y-6">상세 퍼블 페이지</div>;
}
