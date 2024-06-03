"use server";
import { cookies } from "next/headers";
import { userRequest } from "@/utils/requestMethod";

export const getEventUserJoin = async (page: number) => {
  const cookie = cookies().get("Authorization");
  try {
    const res = await userRequest.get("/api/event/user-event", {
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authorization=${cookie?.value}`,
      },
      params: {
        page: page,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
