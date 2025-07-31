import { tokenStorage } from '../storage/tokenStorage';

interface ProtectedRouteConfig {
  fallback?: any;
  checkTokenExpiry?: boolean;
}

export function createProtectedRoute(config: ProtectedRouteConfig = {}) {
  const { fallback = null, checkTokenExpiry = true } = config;
  
  return function ProtectedRoute({ children }: { children: any }) {
    // Check authentication
    if (checkTokenExpiry) {
      tokenStorage.checkTokenExpiryAndRedirect();
    } else {
      tokenStorage.checkAuthAndRedirect();
    }

    // If not authenticated, return fallback
    if (!tokenStorage.isAuthenticated()) {
      return fallback;
    }

    // If authenticated, return children
    return children;
  };
}

// Simple auth guard function for non-React usage
export function requireAuth(checkTokenExpiry: boolean = true): boolean {
  if (checkTokenExpiry) {
    return tokenStorage.checkTokenExpiryAndRedirect();
  } else {
    return tokenStorage.checkAuthAndRedirect();
  }
}

// Export a default ProtectedRoute for direct use
export const ProtectedRoute = createProtectedRoute();
