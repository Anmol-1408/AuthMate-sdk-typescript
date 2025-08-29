'use client';

import { useEffect, ReactNode, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

interface LoggedInProps {
  children: ReactNode;
  protectedRoutes?: string[];
  authRoutes?: string[];
  loadingComponent?: ReactNode;
  redirectingComponent?: ReactNode;
}

export default function LoggedIn({
  children,
  protectedRoutes,
  authRoutes,
  loadingComponent,
  redirectingComponent,
}: LoggedInProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // Only initialize useAuth on client side
  const authHook = isClient ? useAuth() : { isAuthenticated: null, checkAuthentication: () => {} };
  const { isAuthenticated, checkAuthentication } = authHook;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      checkAuthentication();
    }
  }, [isClient, checkAuthentication, pathname]);

  useEffect(() => {
    if (
      isClient &&
      isAuthenticated !== null &&
      Array.isArray(protectedRoutes) &&
      Array.isArray(authRoutes)
    ) {
      if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
        router.push('/login');
        return;
      }
      if (authRoutes.includes(pathname) && isAuthenticated) {
        router.push('/profile');
        return;
      }
    }
  }, [isClient, isAuthenticated, pathname, router, protectedRoutes, authRoutes]);

  if (
    !isClient ||
    (isAuthenticated === null && Array.isArray(protectedRoutes) && protectedRoutes.some(route => pathname.startsWith(route)))
  ) {
    return (
      loadingComponent || (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
        </div>
      )
    );
  }

  if (Array.isArray(protectedRoutes) && protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    return (
      redirectingComponent || (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Redirecting to login...</p>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}
