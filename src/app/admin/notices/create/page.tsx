'use client';

import React from 'react';
import { VStack, HStack, Heading } from '@chakra-ui/react';
import NoticeForm from '@/components/admin/NoticeForm';

export default function CreateNoticePage() {
  return (
    <VStack align="stretch" gap={6}>
      <HStack justify="space-between" align="center">
        <Heading size="2xl" color="gray.900">
          새 공지사항 작성
        </Heading>
      </HStack>

      <NoticeForm />
    </VStack>
  );
}
