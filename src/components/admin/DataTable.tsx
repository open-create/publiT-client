'use client';

import React from 'react';
import Link from 'next/link';
import { Box, HStack, Text, Table } from '@chakra-ui/react';
import Button from '@/components/ui/Button';

interface Column {
  key: string;
  label: string;
}

interface Action {
  label: string;
  href?: (id: number) => string;
  action?: string;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  actions?: Action[];
}

export default function DataTable({ data, columns, actions }: DataTableProps) {
  return (
    <Box bg="white" shadow="md" borderRadius="lg" overflow="hidden">
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeader key={column.key}>{column.label}</Table.ColumnHeader>
            ))}
            {actions && actions.length > 0 && <Table.ColumnHeader>작업</Table.ColumnHeader>}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row, index) => (
            <Table.Row key={index}>
              {columns.map((column) => (
                <Table.Cell key={column.key}>{row[column.key]}</Table.Cell>
              ))}
              {actions && actions.length > 0 && (
                <Table.Cell>
                  <HStack gap={2}>
                    {actions.map((action, actionIndex) => (
                      <Box key={actionIndex}>
                        {action.href ? (
                          <Link href={action.href(row.id)}>
                            <Text color="blue.600" _hover={{ color: 'blue.900' }} cursor="pointer">
                              {action.label}
                            </Text>
                          </Link>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            color="red.600"
                            _hover={{ color: 'red.900' }}
                            onClick={() => {
                              if (action.action === 'delete') {
                                if (confirm('정말 삭제하시겠습니까?')) {
                                  // 삭제 로직
                                  console.log('Delete:', row.id);
                                }
                              }
                            }}
                          >
                            {action.label}
                          </Button>
                        )}
                      </Box>
                    ))}
                  </HStack>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
