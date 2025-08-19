'use client';

import { usePathname } from 'next/navigation';
import { determineHeaderVariant } from '@/utils/getHeaderVariant';
import Header from '@/components/layout/Header';

interface Props {
  isLoggedIn: boolean;
  role?: 'user' | 'admin';
}

export default function HeaderShell({ isLoggedIn, role }: Props) {
  const pathname = usePathname();
  const variant = determineHeaderVariant({
    pathname,
    isLoggedIn,
    ...(role ? { role } : {}),
  });

  console.log('현재 pathname:', pathname);

  return <Header variant={variant} />;
}
