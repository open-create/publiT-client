'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { determineHeaderVariant } from '@/utils/getHeaderVariant';
import Header from '@/components/layout/Header';

interface Props {
  isLoggedIn: boolean;
  role?: 'user' | 'admin';
}

export default function HeaderShell({ isLoggedIn, role }: Props) {
  const pathname = usePathname();
  const [hasToken, setHasToken] = useState<boolean>(() => {
    if (typeof window === 'undefined') return Boolean(isLoggedIn);
    try {
      return Boolean(localStorage.getItem('accessToken'));
    } catch {
      return Boolean(isLoggedIn);
    }
  });

  useEffect(() => {
    const sync = () => {
      try {
        setHasToken(Boolean(localStorage.getItem('accessToken')));
      } catch {
        setHasToken(Boolean(isLoggedIn));
      }
    };
    sync();
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, [isLoggedIn]);

  const variant = useMemo(
    () =>
      determineHeaderVariant({
        pathname,
        isLoggedIn: hasToken || isLoggedIn,
        ...(role ? { role } : {}),
      }),
    [pathname, hasToken, isLoggedIn, role]
  );

  return <Header variant={variant} />;
}
