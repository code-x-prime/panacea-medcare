// src/components/admin/LogoutButton.js
'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/n-admin/auth');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full px-4 py-2.5 text-sm font-medium text-white/90 bg-white/10 hover:bg-red-500/90 rounded-xl transition-colors border border-white/10 hover:border-red-400/50"
    >
      Logout
    </button>
  );
}








