"use server";

import { userRequest } from "@/utils/requestMethod";

export const getUser = async (userId: string) => {
  try {
    const res = await userRequest.get(`/api/user/${userId}`, {
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
