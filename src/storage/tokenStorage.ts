const ACCESS_KEY = 'authmate_access_token';
const REFRESH_KEY = 'authmate_refresh_token';

interface RedirectConfig {
  redirectTo?: string;
  onUnauthenticated?: (redirectTo?: string) => void;
}

let redirectConfig: RedirectConfig = {};

export const tokenStorage = {
  // Configure redirect behavior
  configureRedirect: (config: RedirectConfig) => {
    redirectConfig = config;
  },

  set: (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  },
  
  getAccess: () => localStorage.getItem(ACCESS_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  
  clear: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
  
  isAuthenticated: () => !!localStorage.getItem(ACCESS_KEY),

  // Check authentication and redirect if needed
  checkAuthAndRedirect: () => {
    const isAuth = !!localStorage.getItem(ACCESS_KEY);
    if (!isAuth && redirectConfig.onUnauthenticated) {
      redirectConfig.onUnauthenticated(redirectConfig.redirectTo);
    }
    return isAuth;
  },

  // Check token expiry and redirect if expired
  checkTokenExpiryAndRedirect: () => {
    const token = localStorage.getItem(ACCESS_KEY);
    if (!token) {
      if (redirectConfig.onUnauthenticated) {
        redirectConfig.onUnauthenticated(redirectConfig.redirectTo);
      }
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      const isExpired = payload.exp < currentTime;
      
      if (isExpired) {
        localStorage.removeItem(ACCESS_KEY);
        localStorage.removeItem(REFRESH_KEY);
        if (redirectConfig.onUnauthenticated) {
          redirectConfig.onUnauthenticated(redirectConfig.redirectTo);
        }
        return false;
      }
      return true;
    } catch {
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
      if (redirectConfig.onUnauthenticated) {
        redirectConfig.onUnauthenticated(redirectConfig.redirectTo);
      }
      return false;
    }
  }
};
