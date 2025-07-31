import React from 'react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">설정</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">계정 설정</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">이메일</label>
            <input
              type="email"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
              defaultValue="user@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">닉네임</label>
            <input
              type="text"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
              defaultValue="사용자"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            저장
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">알림 설정</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">댓글 알림</span>
            <input type="checkbox" className="rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">좋아요 알림</span>
            <input type="checkbox" className="rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">팔로우 알림</span>
            <input type="checkbox" className="rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
