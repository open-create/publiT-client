'use client';

import { VStack, HStack, Box, Text, Image, Icon } from '@chakra-ui/react';
import { User } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { formatRelativeTime } from '@/utils/formatDate';

interface Comment {
  id: string;
  author: {
    nickname: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
}

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  comments?: Comment[];
}

// 더미 댓글 데이터
const DUMMY_COMMENTS: Comment[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `comment-${i + 1}`,
  author: {
    nickname: `사용자${i + 1}`,
    avatar: '',
  },
  content:
    i === 0
      ? '작가님 이번 글 너무 감동이라... 눈물이 나네요. 정말 좋은 내용 감사합니다!'
      : `아주 유익한 내용이네요! 많은 도움이 되었습니다.`,
  createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
}));

export default function CommentsModal({
  isOpen,
  onClose,
  total,
  comments = DUMMY_COMMENTS,
}: CommentsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`댓글 ${total}개`} size="lg">
      <VStack align="stretch" gap={4} maxH="60vh" overflowY="auto">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </VStack>
    </Modal>
  );
}

interface CommentItemProps {
  comment: Comment;
}

function CommentItem({ comment }: CommentItemProps) {
  return (
    <HStack
      align="start"
      gap={3}
      p={3}
      bg="white"
      rounded="md"
      border="1px solid"
      borderColor="gray.200"
    >
      {/* 프로필 사진 */}
      {comment.author.avatar ? (
        <Image
          src={comment.author.avatar}
          alt={comment.author.nickname}
          w="2rem"
          h="2rem"
          borderRadius="full"
          objectFit="cover"
        />
      ) : (
        <Box
          w="2rem"
          h="2rem"
          borderRadius="full"
          bg="gray.300"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={User} boxSize="1rem" color="gray.600" />
        </Box>
      )}

      {/* 댓글 내용 */}
      <VStack align="start" gap={1} flex={1}>
        {/* 닉네임 + 상대 시간 */}
        <HStack justify="space-between" w="100%">
          <Text fontSize="sm" fontWeight="medium" color="gray.800">
            {comment.author.nickname}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {formatRelativeTime(comment.createdAt)}
          </Text>
        </HStack>

        {/* 본문 */}
        <Text fontSize="sm" color="gray.700" lineHeight="tall">
          {comment.content}
        </Text>
      </VStack>
    </HStack>
  );
}
