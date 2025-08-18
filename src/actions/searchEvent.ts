import { userRequest } from '@/utils/requestMethod';

type DataSearch = {
  qSearch: string | undefined;
  qDate: Date | undefined;
  qSort: string | undefined;
  qCity: string | undefined;
  page: number;
};

export const searchEvent = async (dataSend: DataSearch) => {
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
