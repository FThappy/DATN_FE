import { userRequest } from '@/utils/requestMethod';

export const unLike = async (itemId: string) => {
  try {
    const res = await userRequest.delete('/api/like', {
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
