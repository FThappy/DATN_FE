"use server";

import { userRequest } from "@/utils/requestMethod";

export const getTotalPageEvent = async () => {
  try {
    const res = await userRequest.get("/api/event/total", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
