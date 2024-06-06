"use server"
import { userRequest } from "@/utils/requestMethod";
import { cookies } from "next/headers";

export const logout = async () => {
    const cookie = cookies().get("Authorization");

    console.log(cookie)
  try {
    const res = await userRequest.delete(`api/auth/logout`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authorization=${cookie?.value}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};