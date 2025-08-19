export type NotificationsFilter = '전체' | '읽지 않음' | '퍼블릿 공식';

export interface NotificationItem {
  id: number;
  message: string;
  time: string;
  read: boolean;
  official?: boolean;
}

// NotificationModal Props
export interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Array<{
    id: string;
    type: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
  }>;
}

// NotificationList Props
export interface NotificationListProps {
  notifications: Array<{
    id: string;
    type: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
  }>;
  onNotificationClick: (notification: Record<string, unknown>) => void;
  isLoading?: boolean;
}

// NotificationRow Props
export interface NotificationRowProps {
  notification: {
    id: string;
    type: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
  };
  onClick: (notification: Record<string, unknown>) => void;
}

// FilterBar Props
export interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  filters: Array<{
    key: string;
    label: string;
    count?: number;
  }>;
}
