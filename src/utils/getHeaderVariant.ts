// 경로와 사용자 상태에 따른 헤더 변형 결정
export function determineHeaderVariant({
  pathname,
  isLoggedIn,
  role,
}: {
  pathname: string;
  isLoggedIn: boolean;
  role?: 'user' | 'admin';
}) {
  if (pathname.startsWith('/auth') || pathname.startsWith('/pubble')) return 'minimal';
  if (!isLoggedIn) return 'guest';
  if (role === 'admin') return 'admin';
  return 'user';
}
