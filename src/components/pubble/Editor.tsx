'use client';

import React from 'react';
import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
// Tiptap 확장 기능
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Underline from '@tiptap/extension-underline';
// 컴포넌트
import ToolBar from './ToolBar';
import PubbleHeader from './PubbleHeader';

export default function Editor() {
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [smartQualityCheck, setSmartQualityCheck] = useState(false); // 스마트 품질 검사 실행 여부

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
    ],
    content: `
    <p>여기에 초기 콘텐츠를 넣을 수 있어요.</p>
    <h1>제목 1</h1>
    <h2>제목 2</h2>
    <h3>제목 3</h3>
    `,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setCharCount(editor.storage.characterCount.characters());
      setWordCount(editor.storage.characterCount.words());
    },
  });

  console.log('editor', editor);

  return (
    <div>
      {/* 1) 퍼블 헤더 */}
      <PubbleHeader
        charCount={charCount}
        wordCount={wordCount}
        smartQualityCheck={smartQualityCheck}
        onBack={() => history.back()}
        onTempSave={() => console.log('임시 저장')}
        onSmartReview={() => console.log('스마트 리뷰')}
        onQualityCheck={() => {
          console.log('스마트 품질 검사');
          setSmartQualityCheck(true);
        }}
      />
      {/* 2) 툴바에 editor 전달 */}
      <ToolBar editor={editor} />

      {/* 3) 실제 에디터 영역 */}
      <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '4px' }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
