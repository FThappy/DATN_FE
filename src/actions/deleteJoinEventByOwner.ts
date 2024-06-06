"use server";

import { userRequest } from "@/utils/requestMethod";
import { cookies } from "next/headers";

export const deleteJoinEventByOwner = async (userId: string, eventId: string , ownerId : string) => {
  const cookie = cookies().get("Authorization");
  try {
    const res = await userRequest.delete("/api/event/join-owner", {
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authorization=${cookie?.value}`,
      },
      params: {
        userId: userId,
        eventId: eventId,
        ownerId: ownerId,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
