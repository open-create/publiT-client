'use client';

import React from 'react';
import Link from 'next/link';
import { Box, HStack, Text, Table } from '@chakra-ui/react';
import Button from '@/components/ui/Button';

type CellPrimitive = React.ReactNode | string | number | boolean | null | undefined;

interface Column<T extends RowBase> {
  key: keyof T & string; // 컬럼 키는 실제 row의 키
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode; // 선택: 커스텀 렌더
}

interface Action<T extends RowBase> {
  label: string;
  href?: (id: T['id']) => string;
  action?: 'delete' | 'custom';
  onClick?: (row: T) => void;
}

interface RowBase {
  id: number | string; // 테이블 키로 쓸 고유 id
  [key: string]: CellPrimitive; // 셀 값은 렌더 가능한 값
}

interface DataTableProps<T extends RowBase> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
}

export default function DataTable<T extends RowBase>({
  data,
  columns,
  actions = [],
}: DataTableProps<T>) {
  return (
    <Box bg="white" shadow="md" borderRadius="lg" overflow="hidden">
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeader key={column.key}>{column.label}</Table.ColumnHeader>
            ))}
            {actions.length > 0 && <Table.ColumnHeader>작업</Table.ColumnHeader>}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((row) => (
            <Table.Row key={String(row.id)}>
              {' '}
              {/* ✅ 안정적인 key */}
              {columns.map((column) => {
                const raw = row[column.key];
                const cell =
                  typeof column.render === 'function'
                    ? column.render(raw, row)
                    : (raw as React.ReactNode);

                return <Table.Cell key={column.key}>{cell ?? '-'}</Table.Cell>;
              })}
              {actions.length > 0 && (
                <Table.Cell>
                  <HStack gap={2}>
                    {actions.map((action) => {
                      const key = `${action.label}-${row.id}`;
                      if (action.href) {
                        return (
                          <Box key={key}>
                            <Link href={action.href(row.id)}>
                              <Text
                                color="blue.600"
                                _hover={{ color: 'blue.900' }}
                                cursor="pointer"
                              >
                                {action.label}
                              </Text>
                            </Link>
                          </Box>
                        );
                      }

                      return (
                        <Box key={key}>
                          <Button
                            variant="ghost"
                            size="sm"
                            color="red.600"
                            _hover={{ color: 'red.900' }}
                            onClick={() => {
                              if (action.action === 'delete') {
                                // ❗️경고 줄이고 싶으면 실제 모달로 교체하거나 한 줄 무시 주석 사용
                                // eslint-disable-next-line no-alert
                                if (window.confirm('정말 삭제하시겠습니까?')) {
                                  action.onClick?.(row);
                                }
                              } else {
                                action.onClick?.(row);
                              }
                            }}
                          >
                            {action.label}
                          </Button>
                        </Box>
                      );
                    })}
                  </HStack>
                </Table.Cell>
              )}
              ;
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
