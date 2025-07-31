# AuthMate SDK - Protected Routes Usage Examples

## Basic Setup

```jsx
import { tokenStorage } from 'authmate';
import { useNavigate } from 'react-router-dom';

// Configure in your main App component
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // One-time configuration
    tokenStorage.configureRedirect({
      redirectTo: '/login',
      onUnauthenticated: (redirectTo) => {
        if (redirectTo) {
          navigate(redirectTo);
        }
      }
    });
  }, [navigate]);

  return (
    // Your app routes here
  );
}
```

## Method 1: Using ProtectedRoute Component

```jsx
import { ProtectedRoute } from 'authmate';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
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
  );
}
```

## Method 2: Using useAuth Hook

```jsx
import { useAuth } from 'authmate';

function ProtectedPage() {
  const { isAuthenticated, checkAuthentication } = useAuth();

  useEffect(() => {
    checkAuthentication();
  }, []);

  if (!isAuthenticated) {
    return <div>Redirecting...</div>;
  }

  return <div>Protected Content</div>;
}
```

## Method 3: Using requireAuth Function

```jsx
import { requireAuth } from 'authmate';

function ProtectedComponent() {
  useEffect(() => {
    // Check auth with token expiry
    requireAuth(true);
  }, []);

  return <div>Protected Content</div>;
}
```

## Next.js Usage

```typescript
// In your _app.tsx or layout
import { tokenStorage } from 'authmate';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
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

  return <Component {...pageProps} />;
}
```

```typescript
// In your protected pages
import { requireAuth } from 'authmate';

export default function Dashboard() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      requireAuth(true);
    }
  }, []);

  return <div>Protected Dashboard</div>;
}
```

## API Reference

### tokenStorage.configureRedirect(config)
- `redirectTo`: Route to redirect to when unauthenticated
- `onUnauthenticated`: Callback function for handling redirects

### ProtectedRoute Component
- `fallback`: Component to show while redirecting
- `checkTokenExpiry`: Whether to check token expiration (default: true)

### useAuth Hook
- `isAuthenticated`: Current authentication status
- `checkAuthentication()`: Function to check auth and redirect if needed
- `clearTokens()`: Function to clear stored tokens
- `getAccessToken()`: Get current access token
- `getRefreshToken()`: Get current refresh token
- `setTokens(access, refresh)`: Set new tokens

### requireAuth Function
- `checkTokenExpiry`: Whether to check token expiration (default: true)
- Returns: boolean indicating if user is authenticated
