'use client';

import React from 'react';
import { VStack, HStack, Heading } from '@chakra-ui/react';
import NoticeForm from '@/components/admin/NoticeForm';

interface NoticeDetailPageProps {
  params: {
    id: string;
  };
}

export default function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const { id } = params;

  return (
    <VStack align="stretch" gap={6}>
      <HStack justify="space-between" align="center">
        <Heading size="2xl" color="gray.900">
          공지사항 수정
        </Heading>
      </HStack>

      <NoticeForm noticeId={id} />
    </VStack>
  );
}
