// DataTable Props
export interface DataTableProps<T = any> {
  data: T[];
  columns: Array<{
    key: string;
    label: string;
    render?: (value: any, row: T) => React.ReactNode;
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
