"use server";

import { userRequest } from "@/utils/requestMethod";

export const getPostByEventId = async (page: number, organizationId :string) => {
  try {
    const res = await userRequest.get("/api/post/event", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        page: page,
        organizationId: organizationId,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
