import React from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">공지사항</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
          <Link href="/admin/notices" className="text-blue-500 hover:text-blue-700">
            관리하기 →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">문의</h3>
          <p className="text-3xl font-bold text-yellow-600">8</p>
          <Link href="/admin/inquiries" className="text-blue-500 hover:text-blue-700">
            관리하기 →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">신고</h3>
          <p className="text-3xl font-bold text-red-600">3</p>
          <Link href="/admin/reports" className="text-blue-500 hover:text-blue-700">
            관리하기 →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">통계</h3>
          <p className="text-3xl font-bold text-green-600">1.2K</p>
          <Link href="/admin/stats" className="text-blue-500 hover:text-blue-700">
            보기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
