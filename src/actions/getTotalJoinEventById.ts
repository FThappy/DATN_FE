'use server';

import { userRequest } from '@/utils/requestMethod';

export const getTotalJoinEventById = async (eventId: string) => {
  try {
    const res = await userRequest.get(`/api/event/total-join`, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        eventId: eventId
      }
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
