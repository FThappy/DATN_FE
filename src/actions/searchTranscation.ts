import { userRequest } from '@/utils/requestMethod';

export const searchTranscation = async (qSearch: string | null, qDate: string | null, page: number) => {
  try {
    const res = await userRequest.get(`api/transcation/search`, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        qSearch: qSearch,
        qDate: qDate,
        page: page
      }
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
