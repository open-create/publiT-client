'use client';

import { useMemo, useState } from 'react';
import { Container, VStack } from '@chakra-ui/react';
import FilterBar from '@/components/notifications/FilterBar';
import NotificationList from '@/components/notifications/NotificationList';
import { NotificationsFilter, NotificationItem } from '@/components/notifications/types';

export default function NotificationsPage() {
  const [filter, setFilter] = useState<NotificationsFilter>('전체');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // 더미 데이터 (40개)
  const all: NotificationItem[] = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i + 1,
        message: `알림 메시지 ${i + 1}`,
        time: `${i + 1}분 전`,
        read: i % 3 === 0 ? false : true,
        official: i % 5 === 0,
      })),
    []
  );

  const filtered = useMemo(() => {
    switch (filter) {
      case '읽지 않음':
        return all.filter((n) => !n.read);
      case '퍼블릿 공식':
        return all.filter((n) => n.official);
      default:
        return all;
    }
  }, [all, filter]);

  return (
    <Container maxW="900px" py={8}>
      <VStack align="stretch" gap={6}>
        {/* 필터: 중앙 정렬 */}
        <FilterBar
          value={filter}
          onChange={(f) => {
            setFilter(f);
            setPage(1);
          }}
        />

        {/* 알림 리스트 */}
        <NotificationList items={filtered} page={page} pageSize={pageSize} onPageChange={setPage} />
      </VStack>
    </Container>
  );
}
