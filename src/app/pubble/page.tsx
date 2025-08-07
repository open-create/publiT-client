import React from 'react';
import Editor from '@/components/pubble/Editor';

export default function PublitPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">새 게시글 작성</h1>
      </div>

      <Editor />
    </div>
  );
}
