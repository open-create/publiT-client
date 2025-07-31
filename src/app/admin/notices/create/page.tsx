import React from 'react';
import NoticeForm from '@/components/admin/NoticeForm';

export default function CreateNoticePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">새 공지사항 작성</h1>
      </div>

      <NoticeForm />
    </div>
  );
}
