'use server';

import { userRequest } from '@/utils/requestMethod';

export const getProject = async (page: number) => {
  try {
    const res = await userRequest.get('/api/project', {
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
