'use server';
import { userRequest } from '@/utils/requestMethod';

export const browserOTP = async (email: string, formData: FormData, type: string) => {
  const data = {
    email: email,
    otp: formData.get('otp'),
    type: type
  };
  try {
    const res = await userRequest.post('/api/auth/browser-otp', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
