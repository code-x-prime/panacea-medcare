// src/components/LocaleProvider.js
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function LocaleProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const locale = pathname?.split('/')[1] === 'ar' ? 'ar' : 'en';
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    const fontClass = locale === 'ar' ? 'font-rtl' : 'font-ltr';

    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.body.className = fontClass;
  }, [pathname]);

  return <>{children}</>;
}

