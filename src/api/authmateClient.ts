import {
  RegisterPayload,
  LoginPayload,
  TokenResponse,
  MagicLinkRequestPayload,
  AcceptInvitePayload,
  ErrorResponse
} from '../types/index';
import { handleError } from '../utils/errorHandler';
import { tokenStorage } from '../storage/tokenStorage';

const BASE_URL = 'http://127.0.0.1:8000/api';
const HEADERS = {
  'Content-Type': 'application/json'
};

type APIResponse<T> =
  | { success: true; data: T }
  | { success: false; error: ErrorResponse };

export const AuthMateClient = {
  async register(apiKey: string, payload: RegisterPayload): Promise<APIResponse<string>> {
    const res = await fetch(`${BASE_URL}/external/register/`, {
      method: 'POST',
      headers: { ...HEADERS, 'X-API-Key': apiKey },
      body: JSON.stringify(payload)
    });

    if (!res.ok) return { success: false, error: await handleError(res) };

    const data = await res.json();
    return { success: true, data: data.user_id };
  },

  async loginWithJWT(
    apiKey: string,
    payload: LoginPayload,
    signal?: AbortSignal
  ): Promise<APIResponse<TokenResponse>> {
    const res = await fetch(`${BASE_URL}/auth/jwt-login/`, {
      method: 'POST',
      headers: { ...HEADERS, 'X-API-Key': apiKey },
      body: JSON.stringify(payload),
      signal
    });

    if (!res.ok) return { success: false, error: await handleError(res) };

    const data: TokenResponse = await res.json();
    tokenStorage.set(data.access, data.refresh);
    return { success: true, data };
  },

  async refreshToken(): Promise<APIResponse<TokenResponse>> {
    const refresh = tokenStorage.getRefresh();
    if (!refresh) {
      return {
        success: false,
        error: {
          error: 'No refresh token available.',
          status_code: 401
        }
      };
    }

    const res = await fetch(`${BASE_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ refresh })
    });

    if (!res.ok) {
      tokenStorage.clear();
      return { success: false, error: await handleError(res) };
    }

    const data: TokenResponse = await res.json();
    tokenStorage.set(data.access, data.refresh);
    return { success: true, data };
  },

  async magicLinkRequest(
    apiKey: string,
    payload: MagicLinkRequestPayload
  ): Promise<APIResponse<string>> {
    const res = await fetch(`${BASE_URL}/magic-link/request/`, {
      method: 'POST',
      headers: { ...HEADERS, 'X-API-Key': apiKey },
      body: JSON.stringify(payload)
    });

    if (!res.ok) return { success: false, error: await handleError(res) };

    const data = await res.json();
    return { success: true, data: data.message };
  },

  async acceptInvite(
    apiKey: string,
    payload: AcceptInvitePayload
  ): Promise<APIResponse<string>> {
    const res = await fetch(`${BASE_URL}/invitations/accept/`, {
      method: 'POST',
      headers: { ...HEADERS, 'X-API-Key': apiKey },
      body: JSON.stringify(payload)
    });

    if (!res.ok) return { success: false, error: await handleError(res) };

    const data = await res.json();
    return { success: true, data: data.message };
  },

  logout() {
    tokenStorage.clear();
  },

  isAuthenticated() {
    return tokenStorage.isAuthenticated();
  },

  getAccessToken() {
    return tokenStorage.getAccess();
  },

  getRefreshToken() {
    return tokenStorage.getRefresh();
  }
};
