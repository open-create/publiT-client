'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Underline from '@tiptap/extension-underline';
import ToolBar from './ToolBar';

export default function Editor() {
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
    ],
    content: `
    <p>여기에 초기 콘텐츠를 넣을 수 있어요.</p>
    <h1>제목 1</h1>
    <h2>제목 2</h2>
    <h3>제목 3</h3>
    `,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  console.log('editor', editor);

  return (
    <div>
      {/* 2) 툴바에 editor 전달 */}
      <ToolBar editor={editor} />

      {/* 3) 실제 에디터 영역 */}
      <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '4px' }}>
        {/* <ToolBar editor={editor} content={content} /> */}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
