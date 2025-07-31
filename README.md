# AuthMate SDK for TypeScript

[![npm version](https://badge.fury.io/js/authmate.svg)](https://badge.fury.io/js/authmate)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

**AuthMate SDK** is a comprehensive TypeScript/JavaScript SDK that provides seamless authentication integration for your web applications. It offers easy-to-use APIs for user management, token handling, and protected route management with support for both React and Next.js applications.

## 🚀 Features

- **Complete Authentication Flow** - Login, logout, registration, and user management
- **Token Management** - Automatic token storage, refresh, and expiry handling
- **Protected Routes** - Easy-to-implement route protection with multiple patterns
- **Universal Support** - Works with React, Next.js, and vanilla JavaScript
- **TypeScript First** - Full TypeScript support with type definitions
- **Flexible Storage** - Configurable storage adapters (localStorage, cookies, etc.)
- **Automatic Redirects** - Smart redirect handling for authentication flows

## 📦 Installation

```bash
npm install authmate
```

```bash
yarn add authmate
```

```bash
pnpm add authmate
```

## 🛠️ Quick Start

### 1. Basic Setup

```typescript
import { tokenStorage, AuthMateClient } from 'authmate';

// Configure authentication redirection (one-time setup)
const setupAuth = (navigate: (path: string) => void) => {
  tokenStorage.configureRedirect({
    redirectTo: '/login',
    onUnauthenticated: (redirectTo) => {
      if (redirectTo) {
        navigate(redirectTo);
      }
    }
  });
};

// Initialize the AuthMate client
const authClient = new AuthMateClient({
  baseURL: 'https://your-authmate-api.com',
  // other configuration options
});
```

### 2. Authentication Methods

```typescript
import { AuthMate } from 'authmate';

const authmate = new AuthMate({
  baseURL: 'https://your-authmate-api.com'
});

// Login
const loginUser = async () => {
  try {
    const response = await authmate.login({
      email: 'user@example.com',
      password: 'password123'
    });
    console.log('Login successful:', response);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Register
const registerUser = async () => {
  try {
    const response = await authmate.register({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    });
    console.log('Registration successful:', response);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

// Logout
const logoutUser = async () => {
  try {
    await authmate.logout();
    console.log('Logout successful');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
```

## 🛡️ Protected Routes

### Method 1: ProtectedRoute Component (Recommended)

```jsx
import { ProtectedRoute, tokenStorage } from 'authmate';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // One-time configuration
    tokenStorage.configureRedirect({
      redirectTo: '/login',
      onUnauthenticated: (redirectTo) => navigate(redirectTo)
    });
  }, [navigate]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes - Wrap multiple routes */}
        <Route path="/*" element={
          <ProtectedRoute fallback={<div>Redirecting...</div>}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}
```

### Method 2: useAuth Hook

```jsx
import { useAuth } from 'authmate';

function ProtectedPage() {
  const { isAuthenticated, checkAuthentication, clearTokens } = useAuth();

  useEffect(() => {
    checkAuthentication();
  }, []);

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  const handleLogout = () => {
    clearTokens();
  };

  return (
    <div>
      <h1>Protected Content</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

### Method 3: requireAuth Function

```jsx
import { requireAuth } from 'authmate';

function ProtectedComponent() {
  useEffect(() => {
    // Check auth with token expiry validation
    const isAuthenticated = requireAuth(true);
    if (!isAuthenticated) {
      // User will be redirected automatically
      return;
    }
  }, []);

  return <div>Protected Content</div>;
}
```

## 🌐 Next.js Integration

### App Router (app/layout.tsx)

```typescript
'use client';
import { tokenStorage } from 'authmate';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      tokenStorage.configureRedirect({
        redirectTo: '/login',
        onUnauthenticated: (redirectTo) => {
          if (redirectTo) {
            router.push(redirectTo);
          }
        }
      });
    }
  }, [router]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Protected Page Example

```typescript
'use client';
import { requireAuth } from 'authmate';
import { useEffect } from 'react';

export default function Dashboard() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      requireAuth(true);
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is a protected page</p>
    </div>
  );
}
```

## 🔧 API Reference

### AuthMate Class

```typescript
import { AuthMate } from 'authmate';

const authmate = new AuthMate({
  baseURL: string;           // Your AuthMate API base URL
  timeout?: number;          // Request timeout (default: 10000ms)
  retries?: number;          // Number of retries (default: 3)
});
```

#### Methods

- `login(credentials)` - Authenticate user and store tokens
- `register(userData)` - Register new user
- `logout()` - Logout user and clear tokens
- `getProfile()` - Get current user profile
- `updateProfile(data)` - Update user profile
- `changePassword(data)` - Change user password
- `refreshToken()` - Refresh access token
- `verifyEmail(token)` - Verify email address
- `resetPassword(email)` - Request password reset
- `confirmPasswordReset(data)` - Confirm password reset

### tokenStorage

```typescript
import { tokenStorage } from 'authmate';

// Configuration
tokenStorage.configureRedirect({
  redirectTo: '/login',
  onUnauthenticated: (redirectTo) => { /* handle redirect */ }
});

// Token management
tokenStorage.set(accessToken, refreshToken);
tokenStorage.getAccess();
tokenStorage.getRefresh();
tokenStorage.clear();
tokenStorage.isAuthenticated();

// Authentication checking with redirect
tokenStorage.checkAuthAndRedirect();
tokenStorage.checkTokenExpiryAndRedirect();
```

### useAuth Hook

```typescript
import { useAuth } from 'authmate';

const {
  isAuthenticated,          // Current auth status
  checkAuthentication,      // Function to check and redirect
  clearTokens,             // Clear stored tokens
  getAccessToken,          // Get current access token
  getRefreshToken,         // Get current refresh token
  setTokens               // Set new tokens
} = useAuth({
  checkTokenExpiry?: boolean;     // Check token expiration (default: true)
  redirectOnFailure?: boolean;    // Auto-redirect on failure (default: true)
});
```

### ProtectedRoute Component

```typescript
import { ProtectedRoute } from 'authmate';

<ProtectedRoute 
  fallback={<LoadingSpinner />}    // Component to show while redirecting
  checkTokenExpiry={true}          // Check token expiration (default: true)
>
  {/* Your protected content */}
</ProtectedRoute>
```

## 🔧 Advanced Configuration

### Custom Storage Adapter

```typescript
import { tokenStorage, type StorageAdapter } from 'authmate';

// Custom cookie storage
const cookieStorage: StorageAdapter = {
  getItem: (key: string) => getCookie(key) || null,
  setItem: (key: string, value: string) => setCookie(key, value),
  removeItem: (key: string) => deleteCookie(key)
};

// Use custom storage
tokenStorage.configure(cookieStorage);
```

### Error Handling

```typescript
import { AuthMate, AuthMateError } from 'authmate';

try {
  await authmate.login(credentials);
} catch (error) {
  if (error instanceof AuthMateError) {
    console.error('Auth error:', error.message);
    console.error('Status code:', error.statusCode);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## 📚 Examples

Check out the [`PROTECTED_ROUTES_USAGE.md`](./PROTECTED_ROUTES_USAGE.md) file for more detailed examples and usage patterns.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details on how to get started.

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/Anmol-1408/AuthMate-sdk-typescript/issues)
- **Documentation**: [API Documentation](https://docs.authmate.xyz)
- **Email**: support@authmate.xyz

## 🔄 Changelog

### v1.0.1
- Added protected route components and hooks
- Improved token management with automatic refresh
- Added Next.js support
- Enhanced TypeScript definitions

### v1.0.0
- Initial release with core authentication features


