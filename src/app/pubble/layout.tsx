import React from 'react';

export default function PublitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Publit</h1>
            <nav className="flex space-x-4">
              <a href="/publit" className="text-gray-700 hover:text-gray-900">
                작성
              </a>
              <a href="/feed" className="text-gray-700 hover:text-gray-900">
                피드
              </a>
              <a href="/publit/settings" className="text-gray-700 hover:text-gray-900">
                설정
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
