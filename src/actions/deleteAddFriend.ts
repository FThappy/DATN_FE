import { userRequest } from '@/utils/requestMethod';

export const deleteAddFriend = async (userId: string) => {
  try {
    const res = await userRequest.delete('/api/reqAddFriend/reject', {
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
