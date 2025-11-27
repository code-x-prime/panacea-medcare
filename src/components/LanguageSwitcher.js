// src/components/LanguageSwitcher.js
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher({ currentLocale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale) => {
    startTransition(() => {
      const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
      router.push(newPath);
      document.cookie = `lang=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => switchLocale('en')}
        className={`px-3 py-1 rounded text-sm transition ${
          currentLocale === 'en'
            ? 'bg-panacea-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        disabled={isPending}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('ar')}
        className={`px-3 py-1 rounded text-sm transition ${
          currentLocale === 'ar'
            ? 'bg-panacea-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        disabled={isPending}
      >
        AR
      </button>
    </div>
  );
}

