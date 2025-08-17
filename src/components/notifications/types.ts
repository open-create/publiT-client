export type NotificationsFilter = '전체' | '읽지 않음' | '퍼블릿 공식';

export interface NotificationItem {
  id: number;
  message: string;
  time: string;
  read: boolean;
  official?: boolean;
}
