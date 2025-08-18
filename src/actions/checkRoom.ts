import { userRequest } from '@/utils/requestMethod';

export const checkRoom = async (userId: string) => {
  try {
    const res = await userRequest.get('/api/message/check', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        userId: userId
      }
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
