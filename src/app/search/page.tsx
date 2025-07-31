import React from 'react';

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">검색</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-2">최근 검색어</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Next.js</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">TypeScript</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">인기 검색어</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                JavaScript
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Python
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Node.js
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
