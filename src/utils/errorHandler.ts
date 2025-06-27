// src/utils/errorHandler.ts

import type { ErrorResponse } from '../types';

/**
 * Normalize any non-OK HTTP response into an ErrorResponse.
 *  - Tries to parse JSON first, if that fails falls back to text.
 *  - Clones the Response internally to avoid body consumption errors.
 *  - Always returns an object with an `error` string and possible extra fields.
 */
export async function handleError(res: Response): Promise<ErrorResponse> {
  const status = res.status;

  // Clone response to safely consume body multiple times
  const resClone = res.clone();

  try {
    const parsed = await resClone.json();

    if (parsed.error && typeof parsed.error === 'string') {
      return {
        error: parsed.error,
        status_code: parsed.status_code ?? status,
        ...parsed
      };
    }

    if (parsed.message && typeof parsed.message === 'string') {
      return {
        error: parsed.message,
        status_code: parsed.status_code ?? status,
        ...parsed
      };
    }

    return {
      error: `HTTP ${status}`,
      status_code: status,
      ...parsed
    };
  } catch {
    // JSON parse failed, fallback to raw text
    const text = await res.text();

    return {
      error: `HTTP ${status}: ${text}`,
      status_code: status
    };
  }
}
