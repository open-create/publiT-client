'use client';

import React from 'react';
import Link from 'next/link';
import { VStack, HStack, Heading } from '@chakra-ui/react';
import DataTable from '@/components/admin/DataTable';
import Button from '@/components/ui/Button';

export default function NoticesPage() {
  const notices = [
    { id: 1, title: '서비스 이용 안내', status: 'published', createdAt: '2024-01-15' },
    { id: 2, title: '개인정보 처리방침 변경', status: 'draft', createdAt: '2024-01-14' },
  ];

  return (
    <VStack align="stretch" gap={6}>
      <HStack justify="space-between" align="center">
        <Heading size="2xl" color="gray.900">
          공지사항 관리
        </Heading>
        <Button as={Link} href="/admin/notices/create" variant="primary">
          새 공지사항 작성
        </Button>
      </HStack>

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
    </VStack>
  );
}
