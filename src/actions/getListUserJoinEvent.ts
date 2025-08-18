'use server';

import { userRequest } from '@/utils/requestMethod';

export const getListUserJoinEvent = async (page: number, eventId: string) => {
  try {
    const res = await userRequest.get(`/api/event/list-users`, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        page: page,
        eventId: eventId
      }
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
