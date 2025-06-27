// src/types/index.ts

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface MagicLinkRequestPayload {
  email: string;
}

export interface AcceptInvitePayload {
  invite_token: string;
  password: string;
}

export interface ErrorResponse {
  error: string;
  [key: string]: any; // Allows additional fields like status_code, etc.
}
