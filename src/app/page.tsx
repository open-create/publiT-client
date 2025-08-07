import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Publit</h1>
            </div>
            <nav className="flex space-x-8">
              <Link href="/feed" className="text-gray-700 hover:text-gray-900">
                피드
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-gray-900">
                검색
              </Link>
              <Link href="/auth" className="text-gray-700 hover:text-gray-900">
                로그인
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            당신의 생각을
            <span className="text-blue-600"> 세상에</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Publit은 개발자들을 위한 지식 공유 플랫폼입니다. 기술 블로그, 튜토리얼, 프로젝트 경험을
            공유하고 다른 개발자들과 함께 성장하세요.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/pubble"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              글쓰기 시작하기
            </Link>
            <Link
              href="/feed"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              피드 둘러보기
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✍️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">쉬운 글쓰기</h3>
            <p className="text-gray-600">마크다운 에디터로 깔끔하고 읽기 쉬운 글을 작성하세요.</p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">지식 공유</h3>
            <p className="text-gray-600">다른 개발자들과 경험과 지식을 나누고 함께 성장하세요.</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">빠른 성장</h3>
            <p className="text-gray-600">
              다양한 기술과 경험을 통해 개발 실력을 빠르게 향상시키세요.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-32 bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1,234</div>
              <div className="text-gray-600">활성 사용자</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">5,678</div>
              <div className="text-gray-600">총 게시글</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">12,345</div>
              <div className="text-gray-600">총 댓글</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">89,012</div>
              <div className="text-gray-600">총 좋아요</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">지금 바로 시작하세요</h2>
          <p className="text-lg text-gray-600 mb-8">
            Publit과 함께 개발자 커뮤니티에 참여하고 지식을 나누어보세요.
          </p>
          <Link
            href="/auth"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            무료로 가입하기
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Publit</h3>
              <p className="text-gray-400">개발자들을 위한 지식 공유 플랫폼</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">서비스</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/feed" className="hover:text-white">
                    피드
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="hover:text-white">
                    검색
                  </Link>
                </li>
                <li>
                  <Link href="/publit" className="hover:text-white">
                    글쓰기
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">지원</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    도움말
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    문의
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">법적 고지</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/terms" className="hover:text-white">
                    이용약관
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    개인정보처리방침
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Publit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
