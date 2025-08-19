'use client';

import { VStack, HStack, Heading } from '@chakra-ui/react';
import DataTable from '@/components/admin/DataTable';

export default function ReportsPage() {
  const reports = [
    { id: 1, title: '부적절한 게시글 신고', status: 'pending', createdAt: '2024-01-15' },
    { id: 2, title: '스팸 계정 신고', status: 'resolved', createdAt: '2024-01-14' },
  ];

  return (
    <VStack align="stretch" gap={6}>
      <HStack justify="space-between" align="center">
        <Heading size="2xl" color="gray.900">
          신고 관리
        </Heading>
      </HStack>

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
    </VStack>
  );
}
