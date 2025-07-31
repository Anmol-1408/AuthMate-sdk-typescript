import { tokenStorage } from '../storage/tokenStorage';

interface UseAuthOptions {
  checkTokenExpiry?: boolean;
  redirectOnFailure?: boolean;
}

export function useAuth(options: UseAuthOptions = {}) {
  const { checkTokenExpiry = true, redirectOnFailure = true } = options;

  const checkAuthentication = () => {
    if (redirectOnFailure) {
      if (checkTokenExpiry) {
        return tokenStorage.checkTokenExpiryAndRedirect();
      } else {
        return tokenStorage.checkAuthAndRedirect();
      }
    } else {
      if (checkTokenExpiry) {
        // Check expiry without redirect
        const token = tokenStorage.getAccess();
        if (!token) return false;
        
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const currentTime = Date.now() / 1000;
          return payload.exp >= currentTime;
        } catch {
          return false;
        }
      } else {
        return tokenStorage.isAuthenticated();
      }
    }
  };

  return {
    isAuthenticated: tokenStorage.isAuthenticated(),
    checkAuthentication,
    clearTokens: tokenStorage.clear,
    getAccessToken: tokenStorage.getAccess,
    getRefreshToken: tokenStorage.getRefresh,
    setTokens: tokenStorage.set
  };
}
