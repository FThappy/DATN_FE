"use server";

import { cookies } from "next/headers";
import { userRequest } from '@/utils/requestMethod';

export const getProjectById = async (projectId: string) => {
  try {
    const res = await userRequest.get(`/api/project/${projectId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
