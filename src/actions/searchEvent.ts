import { userRequest } from '@/utils/requestMethod';

export const searchEvent = async (dataSend: Record<string, any>) => {
  try {
    const res = await userRequest.post(`api/event/search`, dataSend, {
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
