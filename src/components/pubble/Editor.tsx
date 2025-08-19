'use client';

import React from 'react';
import { useState } from 'react';
import './editor.css';
import { Box, VStack, Container } from '@chakra-ui/react';
import { Input } from '@/components/ui';
import { useEditor, EditorContent } from '@tiptap/react';
// Tiptap 확장 기능
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Underline from '@tiptap/extension-underline';
// 컴포넌트
import ToolBar from './ToolBar';
import PubbleHeader from './PubbleHeader';
import PubbleSettingsModal from './PubbleSettingsModal';
import SmartReviewModal from './SmartReviewModal';
import { useCreatePubble } from '@/apis';

export default function Editor() {
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [smartQualityCheck, setSmartQualityCheck] = useState(false); // 스마트 품질 검사 실행 여부
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSmartReviewModalOpen, setIsSmartReviewModalOpen] = useState(false);

  // 퍼블 생성 API 훅
  const createPubble = useCreatePubble();

  // 1) useEditor로 에디터 인스턴스 생성
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image,
      Underline,
      HorizontalRule,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CharacterCount.configure({}),
      Placeholder.configure({
        placeholder:
          '퍼블릿은 누구나 쉽게 창작할 수 있는 공간입니다.\n아이디어를 적고, 문장을 다듬고, 독자와 공유해 보세요.',
      }),
    ],
    content: ``,
    // <p class="hint" style="color: #a59e9e">퍼블릿은 누구나 쉽게 창작할 수 있는 공간입니다.<br/>
    // 아이디어를 적고, 문장을 다듬고, 독자와 공유해 보세요.</p>
    // `,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setCharCount(editor.storage.characterCount.characters());
      setWordCount(editor.storage.characterCount.words());
    },
  });

  // console.log('editor', editor);

  return (
    <Box>
      <VStack align="stretch" w="100%" gap={0}>
        {/* 1) 퍼블 헤더 */}
        <PubbleHeader
          charCount={charCount}
          wordCount={wordCount}
          smartQualityCheck={smartQualityCheck}
          onBack={() => history.back()}
          onTempSave={() => console.log('임시 저장')}
          onSmartReview={() => setIsSmartReviewModalOpen(true)}
          onQualityCheck={() => {
            console.log('스마트 품질 검사');
            setSmartQualityCheck(true);
            setIsSmartReviewModalOpen(true);
          }}
          onPublish={() => setIsSettingsModalOpen(true)}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
        />
        {/* 2) 툴바에 editor 전달 (박스에 담아 구분) */}
        <Box border="1px solid" borderColor="gray.200" rounded="md" bg="white" m={0}>
          <ToolBar editor={editor} />
        </Box>

        <Container maxW="1024px" p={10}>
          {/* 3) 제목/부제목 영역 (입력 가이드 스타일) */}
          <VStack align="stretch" gap={3}>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요."
              fontSize="3xl"
              fontWeight="bold"
              px={0}
              border="none"
              _focus={{ border: 'none', boxShadow: 'none' }}
              _placeholder={{ color: 'gray.500' }}
              bg="transparent"
            />
            <Input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="부제목을 입력하세요."
              fontSize="sm"
              px={0}
              border="none"
              _focus={{ boxShadow: 'none' }}
              _placeholder={{ color: 'gray.500' }}
              color="gray.600"
              bg="transparent"
            />
            <Box w="100%" h="1px" bg="gray.200" />
          </VStack>

          {/* 4) 본문 영역 */}
          <Box bg="white" p={2}>
            <EditorContent editor={editor} className="tiptap" />
          </Box>
        </Container>
      </VStack>

      {/* 발행 설정 모달 */}
      <PubbleSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onPublish={(settings) => {
          const uuidRe =
            /^(?:[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;

          // 카테고리 ID 유효성 체크
          const categoryId = settings.categoryId?.trim();
          if (!categoryId || !uuidRe.test(categoryId)) {
            alert('카테고리 ID가 필요합니다. 유효한 UUID를 입력해주세요.');
            return;
          }

          // 태그는 UUID 형태만 전송 (그 외는 무시)
          const tags = (settings.tags || [])
            .map((raw) => raw.trim())
            .filter((t) => uuidRe.test(t))
            .map((id) => ({ id }));

          const payload = {
            title: title || '제목 없는 글',
            content: editor?.getHTML() || '',
            pubbleCategory: { id: categoryId },
            pubblesTags: tags,
          };

          console.log('[pubbles] create payload', payload);

          createPubble.mutate(payload as any, {
            onSuccess: (res) => {
              console.log('[pubbles] create success', res);
              if (typeof window !== 'undefined') {
                alert('발행이 완료되었습니다.');
              }
              setIsSettingsModalOpen(false);
            },
            onError: (err) => {
              console.error('[pubbles] create error', err);
              const msg =
                (err as any)?.data?.message ?? (err as any)?.message ?? '발행에 실패했습니다.';
              if (typeof window !== 'undefined') {
                alert(`발행 실패: ${msg}`);
              }
            },
          });
        }}
      />

      {/* 스마트 리뷰 모달 */}
      <SmartReviewModal
        isOpen={isSmartReviewModalOpen}
        onClose={() => setIsSmartReviewModalOpen(false)}
        onApplyReview={(evaluations) => {
          console.log('스마트 리뷰 결과:', evaluations);
          // TODO: 리뷰 결과를 에디터에 적용하는 로직 구현
          setIsSmartReviewModalOpen(false);
        }}
      />
    </Box>
  );
}
