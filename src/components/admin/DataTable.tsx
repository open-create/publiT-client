import React from 'react';
import Link from 'next/link';

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
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row[column.key]}
                </td>
              ))}
              {actions && actions.length > 0 && (
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {actions.map((action, actionIndex) => (
                      <div key={actionIndex}>
                        {action.href ? (
                          <Link
                            href={action.href(row.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            {action.label}
                          </Link>
                        ) : (
                          <button
                            onClick={() => {
                              if (action.action === 'delete') {
                                if (confirm('정말 삭제하시겠습니까?')) {
                                  // 삭제 로직
                                  console.log('Delete:', row.id);
                                }
                              }
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            {action.label}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
