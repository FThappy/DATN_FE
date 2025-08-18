import { userRequest } from '@/utils/requestMethod';

export const getMessageCard = async () => {
  try {
    const res = await userRequest.get('/api/message/user', {
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
