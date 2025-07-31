import React from 'react';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'comment',
      message: '사용자가 귀하의 게시글에 댓글을 남겼습니다.',
      time: '5분 전',
      read: false,
    },
    {
      id: 2,
      type: 'like',
      message: '사용자가 귀하의 게시글을 좋아합니다.',
      time: '1시간 전',
      read: true,
    },
    {
      id: 3,
      type: 'follow',
      message: '새로운 사용자가 귀하를 팔로우했습니다.',
      time: '2시간 전',
      read: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">알림</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b last:border-b-0 ${!notification.read ? 'bg-blue-50' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-900">{notification.message}</p>
                <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
              </div>
              {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full ml-4"></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
