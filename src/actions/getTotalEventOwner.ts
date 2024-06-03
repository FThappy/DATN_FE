"use server";
import { userRequest } from "@/utils/requestMethod";
import { cookies } from "next/headers";

export const getTotalPageEventOwner = async () => {
  const cookie = cookies().get("Authorization");

  try {
    const res = await userRequest.get("/api/event/owner/total-page", {
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authorization=${cookie?.value}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
