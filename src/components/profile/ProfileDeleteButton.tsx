'use client';

import { useState } from 'react';
import { useDisclosure, VStack, Text, HStack, Box, Input } from '@chakra-ui/react';
import { AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

interface ProfileDeleteButtonProps {
  username: string;
  onDelete: () => Promise<void>;
  isDisabled?: boolean;
}

export default function ProfileDeleteButton({
  username,
  onDelete,
  isDisabled = false,
}: ProfileDeleteButtonProps) {
  const { open: isOpen, onOpen, onClose } = useDisclosure();
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // 사용자명 입력 검증
  const isConfirmValid = confirmText === username;

  // 계정 삭제 함수
  const handleDelete = async () => {
    if (!isConfirmValid) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete();
      onClose();
    } catch (error) {
      console.error('계정 삭제 실패:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // 모달 닫기
  const handleClose = () => {
    setConfirmText('');
    onClose();
  };

  return (
    <>
      {/* 프로필 삭제 섹션 */}
      <VStack align="start" gap={4} pt={6} borderTop="1px solid" borderColor="red.200" w="100%">
        <Box>
          <Text fontSize="sm" color="red.600" mb={4}>
            프로필을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
          </Text>
          <Button size="sm" variant="danger" onClick={onOpen} fontSize="s" disabled={isDisabled}>
            <AlertTriangle size={16} />
            프로필 삭제
          </Button>
        </Box>
      </VStack>

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="프로필 삭제 확인"
        size="md"
        footer={
          <HStack gap={2} w="100%" justify="flex-end">
            <Button variant="outline" onClick={handleClose} disabled={isDeleting}>
              취소
            </Button>
            <Button
              variant="danger"
              onClick={() => void handleDelete()}
              disabled={!isConfirmValid}
              loading={isDeleting}
              loadingText="삭제 중..."
            >
              프로필 삭제
            </Button>
          </HStack>
        }
      >
        <VStack align="start" gap={4}>
          <VStack gap={2} align="start">
            <HStack gap={2} color="red.600">
              <AlertTriangle size={20} />
              <Text fontWeight="medium">프로필을 영구적으로 삭제하시겠습니까?</Text>
            </HStack>
            {/* <HStack gap={2}>
              <AlertTriangle size={20} />
              <Text color="gray.700">이 작업은 되돌릴 수 없습니다.</Text>
            </HStack> */}
          </VStack>

          <Box w="100%">
            <Text fontSize="sm" color="gray.600" mb={2}>
              (필수) 계속하려면 닉네임 <strong>{username}</strong>을 입력하세요:
            </Text>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={username}
              borderColor={isConfirmValid ? 'red.500' : 'gray.300'}
              _focus={{
                borderColor: isConfirmValid ? 'red.500' : 'blue.500',
              }}
            />
          </Box>

          <Box p={4} bg="red.50" borderRadius="md" w="100%">
            <Text fontSize="sm" color="red.700">
              <strong>삭제될 데이터:</strong>
            </Text>
            <Text fontSize="sm" color="red.600" mt={1}>
              • 모든 게시물 및 댓글
              <br />
              • 프로필 정보 및 설정
              <br />
              • 팔로워 / 팔로잉 관계
              <br />• 활동 기록 및 통계
            </Text>
          </Box>
        </VStack>
      </Modal>
    </>
  );
}
