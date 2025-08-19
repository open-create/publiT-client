// DataTable Props
export interface DataTableProps<T = Record<string, unknown>> {
  data: T[];
  columns: Array<{
    key: string;
    label: string;
    render?: (value: unknown, row: T) => React.ReactNode;
  }>;
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
}

// NoticeForm Props
export interface NoticeFormProps {
  initialData?: {
    id?: string;
    title: string;
    content: string;
    isPublished: boolean;
  };
  onSubmit: (data: { title: string; content: string; isPublished: boolean }) => void;
  isLoading?: boolean;
}

// Sidebar Props
export interface SidebarProps {
  currentPath: string;
}
