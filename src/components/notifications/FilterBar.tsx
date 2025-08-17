'use client';

import { Box, Tabs } from '@chakra-ui/react';
import { NotificationsFilter } from './types';

interface FilterBarProps {
  value: NotificationsFilter;
  onChange: (f: NotificationsFilter) => void;
}

export default function FilterBar({ value, onChange }: FilterBarProps) {
  const items: NotificationsFilter[] = ['전체', '읽지 않음', '퍼블릿 공식'];

  return (
    <Tabs.Root
      value={value}
      onValueChange={(e) => onChange(e.value as NotificationsFilter)}
      variant="line"
      w="100%"
    >
      <Tabs.List justifyContent="center" gap={8}>
        {items.map((label) => (
          <Tabs.Trigger
            key={label}
            value={label}
            color={value === label ? 'gray.900' : 'gray.600'}
            fontWeight={value === label ? 'bold' : 'normal'}
            pb={3}
          >
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {/* Full-width bottom line */}
      <Box
        w="100vw"
        left="50%"
        transform="translateX(-50%)"
        borderBottom="1px solid"
        borderColor="gray.200"
        position="relative"
      />
      {/* <Tabs.Indicator mt="-1.5px" height="2px" bg="gray.800" borderRadius="full" zIndex={1} /> */}
    </Tabs.Root>
  );
}
