'use client';

import { useState } from 'react';
import { Box, HStack, VStack, Text, Textarea, Switch, Icon } from '@chakra-ui/react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui';
import { Lock } from 'lucide-react';

type PublishType = 'scroll' | 'ebook';
type Visibility = 'public' | 'private';

import { PubbleSettingsModalProps } from './types';

export default function PubbleSettingsModal({
  isOpen,
  onClose,
  onPublish,
}: PubbleSettingsModalProps) {
  const [type, setType] = useState<PublishType>('scroll');
  const [tagsText, setTagsText] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('public');
  const [password, setPassword] = useState('');
  const [adultOnly, setAdultOnly] = useState(false);

  const handlePublish = () => {
    const tags = tagsText
      .split(/\s+/)
      .map((t) => t.trim())
      .filter(Boolean);
    onPublish?.({
      type,
      tags,
      visibility,
      password: visibility === 'private' ? password : undefined,
      adultOnly,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="설정">
      <VStack align="stretch" gap={6}>
        {/* 발행 형태 */}
        <VStack align="stretch" gap={2}>
          <Text fontWeight="medium">발행 형태</Text>
          <HStack gap={4}>
            <Button
              variant={type === 'scroll' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setType('scroll')}
            >
              스크롤형
            </Button>
            <Button
              variant={type === 'ebook' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setType('ebook')}
            >
              이북형
            </Button>
          </HStack>
        </VStack>

        {/* 태그 */}
        <VStack align="stretch" gap={2}>
          <Text fontWeight="medium">태그</Text>
          <Textarea
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            placeholder="태그는 띄어쓰기로 구분해 입력하세요. (한글/영문/숫자/밑줄)"
            minH="6rem"
            bg="gray.100"
            borderColor="gray.200"
          />
        </VStack>

        {/* 공개/비공개 */}
        <VStack align="stretch" gap={2}>
          <Text fontWeight="medium">공개/비공개</Text>
          <HStack gap={4}>
            <Button
              variant={visibility === 'public' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setVisibility('public')}
            >
              공개
            </Button>
            <Button
              variant={visibility === 'private' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setVisibility('private')}
            >
              비공개
            </Button>
            {visibility === 'private' && (
              <HStack gap={2} flex={1}>
                <Icon as={Lock} color="gray.500" />
                <Box flex={1} bg="gray.100" rounded="full" px={3} py={1}>
                  <Input
                    value={password}
                    onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                    placeholder="비밀번호 입력란"
                  />
                </Box>
              </HStack>
            )}
          </HStack>
        </VStack>

        {/* 성인 콘텐츠 표시 */}
        <VStack align="stretch" gap={1}>
          <HStack justify="space-between">
            <Text fontWeight="medium">성인 콘텐츠 표시</Text>
            <Switch.Root checked={adultOnly} onCheckedChange={(e) => setAdultOnly(!!e.checked)}>
              <Switch.HiddenInput />
              <Switch.Control />
            </Switch.Root>
          </HStack>
          <Text fontSize="sm" color="gray.500">
            본인 인증을 통해 성인(대한민국 국민은 한국 나이 20세 이상에 해당)인 것이 확인되면 성인
            포스트를 발행하거나 열람 가능
          </Text>
        </VStack>

        <HStack justify="flex-end" gap={3} pt={2}>
          <Button variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handlePublish}>
            발행
          </Button>
        </HStack>
      </VStack>
    </Modal>
  );
}
