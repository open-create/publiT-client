import React from 'react';

export default function EditProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">프로필 수정</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">프로필 이미지</label>
            <div className="mt-2 flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xl text-gray-600">👤</span>
              </div>
              <button
                type="button"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                이미지 변경
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">닉네임</label>
            <input
              type="text"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="사용자명"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">이메일</label>
            <input
              type="email"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="user@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">소개</label>
            <textarea
              rows={4}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="안녕하세요! 개발자입니다."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">웹사이트</label>
            <input
              type="url"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
            >
              취소
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
