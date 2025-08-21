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
  if (pathname.startsWith('/auth')) return 'minimal';
  // /pubble 페이지만 minimal, /pubble/[id] 등은 기본 헤더
  if (pathname === '/pubble' || pathname === '/pubble/') return 'minimal';
  if (!isLoggedIn) return 'guest';
  if (role === 'admin') return 'admin';
  return 'user';
}
