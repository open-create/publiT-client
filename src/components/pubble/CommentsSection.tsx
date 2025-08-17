'use client';

import { useState } from 'react';
import { Box, Heading, HStack, Input, Text, Icon, Image } from '@chakra-ui/react';
import { ChevronRight, User } from 'lucide-react';
import CommentsModal from './CommentsModal';

interface CommentsSectionProps {
  total: number;
}

export default function CommentsSection({ total }: CommentsSectionProps) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <Box bg="blue.100" p={6} rounded="lg">
      {/* 헤더: 제목 + 화살표 */}
      <HStack justify="space-between" align="center" mb={4}>
        <Heading size="lg">댓글 {total}개</Heading>
        <Box as="button" onClick={() => setOpen(true)} aria-label="전체 댓글 보기">
          <Icon as={ChevronRight} color="gray.700" boxSize={6} />
        </Box>
      </HStack>

      {/* 대표 댓글 */}
      <HStack align="center" gap={4} mb={4}>
        <Box
          w="3rem"
          h="3rem"
          borderRadius="full"
          bg="gray.300"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={User} boxSize="1.5rem" color="gray.600" />
        </Box>
        <Text fontSize="xl" color="gray.900" fontWeight="medium">
          작가님 이번 글 너무 감동이라... 눈물이
        </Text>
      </HStack>

      {/* 구분선 */}
      <Box w="100%" h="1px" bg="blue.300" mb={4} />

      {/* 입력창 */}
      <HStack align="center" gap={4}>
        <Box
          w="2.25rem"
          h="2.25rem"
          borderRadius="full"
          bg="gray.300"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={User} boxSize="1rem" color="gray.600" />
        </Box>
        <Input
          placeholder="작가에게 힘이 되는 말을 남겨주세요!"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          border="none"
          bg="transparent"
          _focus={{ boxShadow: 'none' }}
        />
      </HStack>

      {/* 전체 댓글 모달 */}
      <CommentsModal isOpen={open} onClose={() => setOpen(false)} total={total} />
    </Box>
  );
}
