'use client';

import { apiFetch } from '@/lib/api-client';
import type { AuthUser } from './types';

export async function register(email: string, name: string, password: string): Promise<AuthUser> {
  const { user } = await apiFetch<{ user: AuthUser }>('/auth/register', {
    method: 'POST',
    body: { email, name, password },
  });
  return user;
}

export async function login(email: string, password: string): Promise<AuthUser> {
  const { user } = await apiFetch<{ user: AuthUser }>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  return user;
}

export async function verifyEmail(token: string): Promise<AuthUser> {
  const { user } = await apiFetch<{ user: AuthUser }>('/auth/verify-email', {
    method: 'POST',
    body: { token },
  });
  return user;
}

export async function resendVerification(email: string): Promise<void> {
  await apiFetch('/auth/resend-verification', { method: 'POST', body: { email } });
}

export async function forgotPassword(email: string): Promise<void> {
  await apiFetch('/auth/forgot-password', { method: 'POST', body: { email } });
}

export async function resetPassword(token: string, password: string): Promise<void> {
  await apiFetch('/auth/reset-password', { method: 'POST', body: { token, password } });
}
