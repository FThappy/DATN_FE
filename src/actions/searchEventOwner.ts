import { userRequest } from '@/utils/requestMethod';

export const searchEventOwner = async (dataSend: Record<string, any>) => {
  try {
    const res = await userRequest.post(`api/event/owner/search`, dataSend, {
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
