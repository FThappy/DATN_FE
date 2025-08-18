import { userRequest } from '@/utils/requestMethod';

export const getTranscation = async (page: number) => {
  try {
    const res = await userRequest.get('/api/transcation/user', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        page: page
      }
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
