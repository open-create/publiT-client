'use client';

import React, { useState } from 'react';
import { VStack, Box, Input, Textarea, HStack, Text } from '@chakra-ui/react';
import Button from '@/components/ui/Button';
import { Select as UiSelect } from '@/components/ui';

interface NoticeFormProps {
  noticeId?: string;
}

export default function NoticeForm({ noticeId }: NoticeFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 로직
    console.log({ title, content, status });
  };

  const statusOptions = [
    { label: '임시저장', value: 'draft' },
    { label: '발행', value: 'published' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <VStack align="stretch" gap={6}>
        <Box>
          <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
            제목 *
          </Text>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="공지사항 제목을 입력하세요"
            size="lg"
            borderColor="gray.300"
            _focus={{
              borderColor: 'blue.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
            }}
            required
          />
        </Box>

        <Box>
          <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
            내용 *
          </Text>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            placeholder="공지사항 내용을 입력하세요"
            size="lg"
            borderColor="gray.300"
            _focus={{
              borderColor: 'blue.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
            }}
            required
          />
        </Box>

        <Box>
          <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
            상태
          </Text>
          <UiSelect options={statusOptions} value={status} onChange={setStatus} width="100%" />
        </Box>

        <HStack justify="flex-end" gap={4}>
          <Button variant="secondary" type="button">
            취소
          </Button>
          <Button variant="primary" type="submit">
            {noticeId ? '수정' : '등록'}
          </Button>
        </HStack>
      </VStack>
    </form>
  );
}
