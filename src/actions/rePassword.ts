'use server';
import { userRequest } from '@/utils/requestMethod';

export const rePasswordAction = async (email: string, tokenRePassword: string, _password: string) => {
  try {
    const res = await userRequest.post(
      '/api/auth/re-password',
      { password: _password },
      {
        headers: {
          'Content-Type': 'application/json',
          email: email,
          tokenRePassword: tokenRePassword
        }
      }
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
