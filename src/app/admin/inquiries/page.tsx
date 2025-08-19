'use client';

import { VStack, HStack, Heading } from '@chakra-ui/react';
import DataTable from '@/components/admin/DataTable';

export default function InquiriesPage() {
  const inquiries = [
    { id: 1, title: '로그인 문제 문의', status: 'pending', createdAt: '2024-01-15' },
    { id: 2, title: '결제 관련 문의', status: 'answered', createdAt: '2024-01-14' },
  ];

  return (
    <VStack align="stretch" gap={6}>
      <HStack justify="space-between" align="center">
        <Heading size="2xl" color="gray.900">
          문의 관리
        </Heading>
      </HStack>

      <DataTable
        data={inquiries}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'title', label: '제목' },
          { key: 'status', label: '상태' },
          { key: 'createdAt', label: '작성일' },
        ]}
        actions={[{ label: '상세보기', href: (id) => `/admin/inquiries/${id}` }]}
      />
    </VStack>
  );
}
