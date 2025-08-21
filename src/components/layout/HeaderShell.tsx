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
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
        isLoggedIn: mounted ? hasToken : isLoggedIn,
        ...(role ? { role } : {}),
      }),
    [pathname, hasToken, isLoggedIn, role, mounted]
  );

  return <Header variant={variant} />;
}
