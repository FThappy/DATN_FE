"use server";

import { userRequest } from "@/utils/requestMethod";
import { cookies } from "next/headers";

export const checkJoin = async (userId : string , eventId : string) => {
  const cookie = cookies().get("Authorization");
  try {
    const res = await userRequest.get("/api/event/join", {
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authorization=${cookie?.value}`,
      },
      params: {
        userId: userId,
        eventId: eventId,
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
