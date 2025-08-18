import { userRequest } from '@/utils/requestMethod';

export const updateMail = async (newEmail: string, otp: string, type: string) => {
  try {
    const res = await userRequest.put(
      '/api/user/mail',
      {
        email: newEmail,
        otp: otp,
        type: type
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
