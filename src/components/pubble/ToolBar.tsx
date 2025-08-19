'use client';

import type { Editor } from '@tiptap/react';
import { HStack } from '@chakra-ui/react';
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Underline,
  Undo,
  Redo,
  Quote,
  Code,
  Minus,
  Link as LinkIcon,
  // Image,
  // Table,
} from 'lucide-react';
import Button from '@/components/ui/Button';

type ToolBarProps = {
  editor: Editor | null;
};

type ToolItem = {
  icon: React.ComponentType<Record<string, unknown>>;
  action: string;
  activeMark: string | null;
  args?: Record<string, unknown>;
  log: string;
};

const TOOL_ITEMS: ToolItem[] = [
  { icon: Bold, action: 'toggleBold', activeMark: 'bold', log: 'bold' },
  { icon: Italic, action: 'toggleItalic', activeMark: 'italic', log: 'italic' },
  { icon: Strikethrough, action: 'toggleStrike', activeMark: 'strike', log: 'strike' },
  { icon: List, action: 'toggleBulletList', activeMark: 'bulletList', log: 'bullet list' },
  {
    icon: ListOrdered,
    action: 'toggleOrderedList',
    activeMark: 'orderedList',
    log: 'ordered list',
  },
  {
    icon: Heading1,
    action: 'toggleHeading',
    activeMark: 'heading',
    args: { level: 1 },
    log: 'heading 1',
  },
  {
    icon: Heading2,
    action: 'toggleHeading',
    activeMark: 'heading',
    args: { level: 2 },
    log: 'heading 2',
  },
  {
    icon: Heading3,
    action: 'toggleHeading',
    activeMark: 'heading',
    args: { level: 3 },
    log: 'heading 3',
  },
  { icon: Underline, action: 'toggleUnderline', activeMark: 'underline', log: 'underline' },
  { icon: Undo, action: 'undo', activeMark: null, log: 'undo' },
  { icon: Redo, action: 'redo', activeMark: null, log: 'redo' },
  {
    icon: Quote,
    action: 'toggleBlockquote',
    activeMark: 'blockquote',
    log: 'blockquote',
  },
  {
    icon: Code,
    action: 'toggleCode',
    activeMark: 'codeBlock',
    log: 'code block',
  },
  {
    icon: Minus,
    action: 'setHorizontalRule',
    activeMark: null,
    log: 'horizontal rule',
  },
  {
    icon: LinkIcon,
    action: 'setLink',
    activeMark: 'link',
    args: { href: 'https://example.com' },
    log: 'add link',
  },
  // 아래 기능은 추후 추가 예정 (지금은 에러 발생)
  // {
  //   icon: Image,
  //   action: 'setImage',
  //   activeMark: 'image',
  //   args: { src: 'https://example.com/image.png' },
  //   log: 'insert image',
  // },
  // {
  //   icon: TableIcon,
  //   action: 'insertTable',
  //   activeMark: null,
  //   args: { rows: 3, cols: 3, withHeaderRow: true },
  //   log: 'insert table',
  // },
];

export default function ToolBar({ editor }: ToolBarProps) {
  // 임시로 사용하지 않는 import들 사용 (나중에 실제 기능으로 교체)
  console.log('Box component available for future use');
  console.log('Image component available for future use');
  console.log('Table component available for future use');
  if (!editor) return null;

  return (
    <HStack w="100%" justify="center" py={2}>
      {TOOL_ITEMS.map(({ icon: Icon, action, activeMark, args, log }) => {
        // 현재 활성 상태
        const isActive = activeMark ? editor.isActive(activeMark, args) : false;

        // 실행 가능 여부
        const canRun =
          typeof (editor.can() as Record<string, unknown>)[action] === 'function'
            ? ((editor.can() as Record<string, unknown>)[action] as (args?: unknown) => boolean)(
                args
              )
            : true;

        return (
          <Button
            key={action + (args ? JSON.stringify(args) : '')}
            type="button"
            variant={isActive ? 'primary' : 'outline'}
            colorPalette={isActive ? 'blue' : 'gray'}
            disabled={!canRun}
            onClick={() => {
              try {
                console.log('Action:', action);
                console.log('Args:', args);
                console.log('Can run:', canRun);
                console.log('Before HTML:', editor.getHTML());

                const chain = editor.chain().focus() as Record<string, unknown>;
                if (args !== undefined) {
                  (chain[action] as (args: unknown) => unknown)(args); // args가 있으면 전달
                } else {
                  (chain[action] as () => unknown)(); // args가 없으면 호출만
                }
                (chain.run as () => unknown)();

                console.log('After HTML:', editor.getHTML());
                console.log('✅ Success:', log);
              } catch (error) {
                console.error('❌ Error:', action, error);
              }
            }}
          >
            <Icon />
          </Button>
        );
      })}
    </HStack>
  );
}
