import React from 'react';
import FeedList from '@/components/publit/FeedList';

export default function FeedPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">피드</h1>
      </div>

      <FeedList />
    </div>
  );
}
