import React from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-semibold text-gray-900">
              Publit
            </Link>
            <nav className="flex space-x-4">
              <Link href="/feed" className="text-gray-700 hover:text-gray-900">
                피드
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-gray-900">
                검색
              </Link>
              <Link href="/notifications" className="text-gray-700 hover:text-gray-900">
                알림
              </Link>
              <Link href="/profile" className="text-gray-700 hover:text-gray-900">
                프로필
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 Publit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
