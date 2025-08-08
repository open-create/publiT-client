'use client';

import { HStack, Box } from '@chakra-ui/react';
import Button from '@/components/ui/Button';
import { useCallback } from 'react';

type Filter = 'smart' | 'popular' | 'subscribed';

interface Props {
  value: Filter;
  onChange: (next: Filter) => void;
}

const OPTIONS: { key: Filter; label: string }[] = [
  { key: 'smart', label: '스마트 추천' },
  { key: 'popular', label: '인기' },
  { key: 'subscribed', label: '구독' },
];

export default function FeedFilter({ value, onChange }: Props) {
  const handleKey = useCallback(
    (e: React.KeyboardEvent<HTMLElement>, idx: number) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      const nextIdx =
        e.key === 'ArrowRight'
          ? (idx + 1) % OPTIONS.length
          : (idx - 1 + OPTIONS.length) % OPTIONS.length;
      onChange(OPTIONS[nextIdx].key);
    },
    [onChange]
  );

  return (
    <HStack gap="6" align="center">
      {OPTIONS.map((opt, i) => (
        <HStack key={opt.key} gap="6">
          <Button
            onClick={() => onChange(opt.key)}
            onKeyDown={(e) => handleKey(e, i)}
            aria-pressed={value === opt.key}
            variant="ghost"
            p={0}
            bg="transparent"
            _hover={{ bg: 'transparent' }}
            fontWeight={value === opt.key ? 'extrabold' : 'normal'}
            fontSize="sm"
            position="relative"
            pb="1"
            _after={{
              fontWeight: 'extrabold',
              // content: '""',
              // position: 'absolute',
              // left: 0,
              // right: 0,
              // bottom: 0,
              // height: '3px',
              // bg: value === opt.key ? 'blue.500' : 'transparent',
              // transition: 'background-color 120ms',
            }}
          >
            {opt.label}
          </Button>

          {i < OPTIONS.length - 1 && <Box w="1px" h="22px" bg="gray.400" aria-hidden />}
        </HStack>
      ))}
    </HStack>
  );
}
