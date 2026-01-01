'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCurrentUser, signOut, isAdmin } from '@/lib/auth';
import { User } from 'firebase/auth';

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      if (currentUser) {
        const adminStatus = await isAdmin();
        setAdmin(adminStatus);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    setAdmin(false);
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Christian Tech Jobs
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === '/'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Jobs
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!loading && (
              <>
                {user && admin && (
                  <Link
                    href="/admin"
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      pathname === '/admin'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Admin Dashboard
                  </Link>
                )}
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/admin/login"
                    className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Admin Login
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

