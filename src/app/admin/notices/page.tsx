import React from 'react';
import Link from 'next/link';
import DataTable from '@/components/admin/DataTable';

export default function NoticesPage() {
  const notices = [
    { id: 1, title: '서비스 이용 안내', status: 'published', createdAt: '2024-01-15' },
    { id: 2, title: '개인정보 처리방침 변경', status: 'draft', createdAt: '2024-01-14' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">공지사항 관리</h1>
        <Link
          href="/admin/notices/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          새 공지사항 작성
        </Link>
      </div>

      <DataTable
        data={notices}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'title', label: '제목' },
          { key: 'status', label: '상태' },
          { key: 'createdAt', label: '작성일' },
        ]}
        actions={[
          { label: '수정', href: (id) => `/admin/notices/${id}` },
          { label: '삭제', action: 'delete' },
        ]}
      />
    </div>
  );
}
