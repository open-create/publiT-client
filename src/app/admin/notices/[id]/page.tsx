'use client';

import React from 'react';
import { VStack, HStack, Heading } from '@chakra-ui/react';
import NoticeForm from '@/components/admin/NoticeForm';

import { NoticeDetailPageProps } from '../../types';

export default function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const [id, setId] = React.useState<string>('');

  // params를 Promise로 처리
  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

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
