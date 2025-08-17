'use client';

import { VStack } from '@chakra-ui/react';
import { NotificationItem } from './types';
import NotificationRow from './NotificationRow';
import { Pagination } from '@/components/ui';

interface NotificationListProps {
  items: NotificationItem[];
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function NotificationList({ items, page, pageSize, onPageChange }: NotificationListProps) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const visible = items.slice(start, end);

  return (
    <VStack align="stretch" gap={3}>
      {visible.map((n) => (
        <NotificationRow key={n.id} item={n} />
      ))}
      <Pagination currentPage={currentPage} totalPages={totalPages} onChange={onPageChange} />
    </VStack>
  );
}


