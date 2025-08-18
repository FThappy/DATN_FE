import { userRequest } from '@/utils/requestMethod';

export const getUserAuth = async () => {
  try {
    const res = await userRequest.get(`/api/auth/info`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
