import React from 'react';
import NoticeForm from '@/components/admin/NoticeForm';

interface NoticeDetailPageProps {
  params: {
    id: string;
  };
}

export default function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const { id } = params;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">공지사항 수정</h1>
      </div>

      <NoticeForm noticeId={id} />
    </div>
  );
}
