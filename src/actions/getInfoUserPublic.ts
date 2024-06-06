"use server";

import { userRequest } from "@/utils/requestMethod";

export const getUserPublic = async (userId: string) => {
  try {
    const res = await userRequest.get("/api/user", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        userId: userId,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};