export function getHeaderVariant({
  pathname,
  isLoggedIn,
  role,
}: {
  pathname: string;
  isLoggedIn: boolean;
  role?: 'user' | 'admin';
}) {
  if (pathname.startsWith('/auth')) return 'minimal';
  if (!isLoggedIn) return 'guest';
  if (role === 'admin') return 'admin';
  return 'user';
}
