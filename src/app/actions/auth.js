'use server';

import { AuthError } from 'next-auth';
import { signIn as logIn } from '@/server/auth';

export const signIn = async (state, form) => {
  try {
    await logIn('credentials', form);
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        ...state,
        status: 'error',
        message: 'Incorrect email or password',
      };
    }

    throw error;
  }
};
