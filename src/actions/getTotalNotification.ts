import { userRequest } from '@/utils/requestMethod';

export const getTotalNotifications = async () => {
  try {
    const res = await userRequest.get('/api/notification/total', {
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
