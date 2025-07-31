import React from 'react';
import DataTable from '@/components/admin/DataTable';

export default function ReportsPage() {
  const reports = [
    { id: 1, title: '부적절한 게시글 신고', status: 'pending', createdAt: '2024-01-15' },
    { id: 2, title: '스팸 계정 신고', status: 'resolved', createdAt: '2024-01-14' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">신고 관리</h1>
      </div>

      <DataTable
        data={reports}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'title', label: '제목' },
          { key: 'status', label: '상태' },
          { key: 'createdAt', label: '신고일' },
        ]}
        actions={[{ label: '상세보기', href: (id) => `/admin/reports/${id}` }]}
      />
    </div>
  );
}
