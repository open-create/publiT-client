import React from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-2xl text-gray-600">👤</span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">사용자명</h1>
            <p className="text-gray-600">user@example.com</p>
            <p className="text-gray-500 mt-2">안녕하세요! 개발자입니다.</p>
          </div>
          <Link
            href="/profile/edit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            프로필 수정
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-900">게시글</h3>
          <p className="text-3xl font-bold text-blue-600">42</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-900">팔로워</h3>
          <p className="text-3xl font-bold text-green-600">128</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-900">팔로잉</h3>
          <p className="text-3xl font-bold text-purple-600">64</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">최근 게시글</h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="font-semibold text-gray-900">React와 Next.js로 만든 프로젝트</h3>
            <p className="text-gray-600 text-sm">2일 전</p>
          </div>
          <div className="border-b pb-4">
            <h3 className="font-semibold text-gray-900">TypeScript 팁과 트릭</h3>
            <p className="text-gray-600 text-sm">1주일 전</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">웹 개발 시작하기</h3>
            <p className="text-gray-600 text-sm">2주일 전</p>
          </div>
        </div>
      </div>
    </div>
  );
}
