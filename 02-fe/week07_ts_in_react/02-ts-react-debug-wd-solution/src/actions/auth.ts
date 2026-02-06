import type { AuthActionResult } from '@/types';
import z from 'zod/v4';

const API_URL = import.meta.env.VITE_EVENTS_API_URL;

export const loginAction = async (
  _: AuthActionResult,
  formData: FormData
): Promise<AuthActionResult> => {
  try {
    const email = formData.get('email');
    const password = formData.get('password');
    const loginSchema = z.object({
      email: z.email('Invalid email address'),
      password: z.string().min(8, 'Password must be at least 6 characters long')
    });
    const { data, error, success } = loginSchema.safeParse({
      email,
      password
    });
    if (!success) throw new Error(z.prettifyError(error));
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    const { user, token } = await response.json();
    return {
      success: true,
      user,
      token
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message
      };
    }
    return {
      error: 'Something went very wrong!'
    };
  }
};

export const registerAction = async (
  _: AuthActionResult,
  formData: FormData
): Promise<AuthActionResult> => {
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const newUserSchema = z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.email('Invalid email address'),
      password: z.string().min(8, 'Password must be at least 6 characters long')
    });
    const { data, error, success } = newUserSchema.safeParse({
      name,
      email,
      password
    });
    if (!success) throw new Error(z.prettifyError(error));
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }
    return {
      success: true
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message
      };
    }
    return {
      error: 'Something went very wrong!'
    };
  }
};
