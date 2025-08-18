'use server';

import { userRequest } from '@/utils/requestMethod';
import { cookies } from 'next/headers';

export const getEventById = async (eventId: string) => {
  try {
    const res = await userRequest.get(`/api/event/${eventId}`, {
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
