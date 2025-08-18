import { userRequest } from '@/utils/requestMethod';

export const getTotalLike = async (itemId: string) => {
  try {
    const res = await userRequest.get('/api/like/total', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        itemId: itemId
      }
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
